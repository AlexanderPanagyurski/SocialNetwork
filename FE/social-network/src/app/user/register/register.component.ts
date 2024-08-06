import { Component } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { passwordValidator } from 'src/app/shared/utils/password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form = this.fb.group({
    //controls
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', [Validators.required, passwordValidator()]]
    },
      {
        validators: [matchPasswordsValidator('password', 'confirmPassword')]
      })
  });

  constructor(private fb: FormBuilder) { }

  controlTouched(controlName: string): boolean {
    return this.form.get(controlName)?.touched || false;
  }

  controlHasAnyErrors(controlName: string) {
    return this.form.get(controlName)?.errors || undefined;
  }

  controlHasErrors(controlName: string, errorType: string) {
    return this.form.get(controlName)?.errors?.[errorType];
  }

  register(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }

  addformErrorBorder(touched: boolean, errors?: ValidationErrors): string {
    if (errors && touched) {
      return 'form-error';
    }
    return '';
  }
}
