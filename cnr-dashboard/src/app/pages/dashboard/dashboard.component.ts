import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/user-data';

@Component({
  selector: 'cnr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isAdministrative: boolean = false;
  isAdministrator: boolean = false;
  isDoctor: boolean = false;
  isBasic: boolean = false;
  isContable: boolean = false;

constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ user }) => {
      const role = (user as UserData).roles[0];
      this.isAdministrative = role === 'Administrativo';
      this.isAdministrator = role === 'Administrador';
      this.isBasic = role === 'Básico';
      this.isDoctor = role === 'Medico';
      this.isContable = role === 'Contable';
    })
  }
}
