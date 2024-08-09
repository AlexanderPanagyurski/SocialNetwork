import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm, ValidationErrors } from '@angular/forms';
import { AUTH_COOKIE_KEY, EMAIL_DOMAINS } from 'src/app/constants';
import { CookieService } from 'ngx-cookie-service';
import { UserForAuth } from 'src/app/types/userForAuth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailDomains: string[] = EMAIL_DOMAINS;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService) { }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe(
      {
        next: (response: UserForAuth) => {
          const daysToExpire: number = 2;
          this.cookieService.set(AUTH_COOKIE_KEY, response.token, daysToExpire);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log('Error: ', err);
        }
      });
  }

  addformErrorBorder(touched: boolean, errors?: ValidationErrors): string {
    if (errors && touched) {
      return 'form-error';
    }
    return '';
  }
}
