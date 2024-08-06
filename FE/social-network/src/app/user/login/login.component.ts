import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm, ValidationErrors } from '@angular/forms';
import { EMAIL_DOMAINS } from 'src/app/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailDomains: string[] = EMAIL_DOMAINS;

  constructor(
    private router: Router,
    private userService: UserService) { }

  login(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }

    this.userService.login();
    this.router.navigate(['/']);
  }

  addformErrorBorder(touched: boolean, errors?: ValidationErrors): string {
    if (errors && touched) {
      return 'form-error';
    }
    return '';
  }
}
