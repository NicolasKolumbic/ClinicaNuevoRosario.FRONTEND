import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedUser } from '../../models/logged-user';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'cnr-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [],
      password: []
    })
  }

  ngOnInit(): void {
  }

  login() {
    const user = this.loginForm.value;
    this.accountService.login(user).subscribe((response: LoggedUser) => {
      this.router.navigate(['/']);
    })
  }

  recoverPassword() {
    this.router.navigate(['/acceso/recuperar-contraseña']);
  }

}
