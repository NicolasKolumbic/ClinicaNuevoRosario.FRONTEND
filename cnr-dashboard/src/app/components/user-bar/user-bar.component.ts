import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/models/user-data';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'cnr-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss']
})
export class UserBarComponent implements OnInit {

  user!: UserData;

  get fullName() {
    return  this.user.name + " " + this.user.lastName;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ user }) => {
      this.user = user;
    })
  }

  logout() {
    this.authorizationService.logout();
    this.router.navigate(['./acceso']);
  }

}
