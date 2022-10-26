import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { UserRoles } from '../../helpers/enums/user-roles';
import { UserData } from 'src/app/models/user-data';

@Component({
  selector: 'cnr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAdministrative: boolean = false;
  isAdministrator: boolean = false;
  isDoctor: boolean = false;
  isBasic: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ user }) => {
      const role = (user as UserData).roles[0];
      this.isAdministrative = role === 'Administrativo';
      this.isAdministrator = role === 'Administrador';
      this.isBasic = role === 'Básico';
      this.isDoctor = role === 'Medico';
    })
  }

}
