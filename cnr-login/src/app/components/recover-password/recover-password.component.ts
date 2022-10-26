import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'cnr-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  public recoverPasswordForm!: FormGroup;
  public tokenRecovery: string = '';
  public baseUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {
    this.recoverPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  send() {
      this.accountService
          .recoverPassword(this.recoverPasswordForm.value.email)
          .subscribe((token: string) => this.tokenRecovery = token);
  }

}
