import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Roles } from 'src/abstraction/roles';
import { UserData } from 'src/app/models/user-data';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'cnr-administrator-board',
  templateUrl: './administrator-board.component.html',
  styleUrls: ['./administrator-board.component.scss']
})
export class AdministratorBoardComponent implements OnInit {

  roles: Roles[] = [
    {
      id: '304ec0ad-f5dd-442f-ae18-ed26ef5feb27',
      name: 'Medico'
    },
    {
      id: '30a33a14-23a6-447d-ae41-fbcbb7815f61',
      name: 'Contable'
    },
    {
      id: '6f8b16d7-b2e4-420c-8c96-3ab021b11b78',
      name: 'Administrativo'
    },
    {
      id: 'd2c01424-3245-4dff-abb4-51086fb6f897',
      name: 'Administrador'
    }
  ];
  selectedRole!: Roles;
  user!: UserData;
  response?: string;
  public addUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService,
    private userService: UserService
  ) { 

    this.addUserForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      email: [''],
      userName: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
    var user = this.authorizationService.getUserData()
    if(user) {
      this.user = user;
    }
  }

  selectRole(role: any) {
    if(role) {
     this.selectedRole = role;
    }
  }

  save(event: Event) {
    this.userService.updateUserRole(this.user.email, this.selectedRole.name).subscribe((data) => {
        this.response= 'Se actualizado el role correctamente, cierre sesión y vuelva a iniciar';
    })
  }

  addUser() {
      this.userService.addUser(this.addUserForm.value).subscribe((user) => console.log(user));
  }
}
