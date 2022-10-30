import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CustomValidators } from 'src/app/helpers/validators/pattern-validator';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'cnr-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm!: FormGroup;

  #email?: string;
  #token?: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {

      this.resetPasswordForm = this.formBuilder.group({
        confirmPassword: ['', Validators.required],
        password: ['', Validators.compose([
          // 1. Password Field is Required
         Validators.required,
         // 2. check whether the entered password has a number
         CustomValidators.patternValidator(/\d/, { hasNumber: true }),
         // 3. check whether the entered password has upper case letter
         CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
         // 4. check whether the entered password has a lower-case letter
         CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
         // 5. check whether the entered password has a special character
         CustomValidators.patternValidator(/[*@!#%&()^~{}]+/, { hasSpecialCharacters: true }),
         // 6. Has a minimum length of 8 characters
         Validators.minLength(16)
        ])]
      },{
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      });

      this.activatedRoute.queryParams.subscribe((params: any) => {
        this.#email =params['email'];
        this.#token = params['token'];
      })
  }

  get passwordHasError() {
    return this.resetPasswordForm.get('password')?.touched &&
      this.resetPasswordForm.get('password')?.invalid;
  }

  get passwordControl() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPasswordHasError() {
    return this.resetPasswordForm.get('confirmPassword')?.touched &&
    this.resetPasswordForm.get('confirmPassword')?.invalid;
  }

  get confirmPasswordControl() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  get isInvalidForm() {
    return this.#email === null && this.#token === null && this.resetPasswordForm.invalid;
  }

  ngOnInit(): void {
  }

  send() {
    const data = this.resetPasswordForm.value;
    const resetPassword = {
      ...data,
      email: this.#email,
      token: this.#token
    }

    this.accountService.resetPassword(resetPassword).subscribe((res) => {
      this.router.navigate(['./acceso']);
    });
  }
}
