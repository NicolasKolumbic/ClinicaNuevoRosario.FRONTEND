import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'cnr-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {

  public recoverPasswordForm!: FormGroup;
  public baseUrl: string = '';

  #tokenRecovery: string = '';

  get token() {
    return this.#tokenRecovery;
  }

  get email() {
    return this.recoverPasswordForm.get('email')?.value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {
    this.recoverPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    })
  }

  send() {
      this.accountService
          .recoverPassword(this.recoverPasswordForm.value.email)
          .subscribe((data: any) => {
            this.#tokenRecovery = data.token
          });
  }
}
