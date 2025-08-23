import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  emailDomains: string[] = EMAIL_DOMAINS;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService) { }
    
  ngOnInit(): void {
    if(this.cookieService.check(AUTH_COOKIE_KEY)){
      this.router.navigate(['/newsfeed']);
    }
  }

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
          this.errorMessage = err.error?.error || 'Login failed. Please try again.';
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
