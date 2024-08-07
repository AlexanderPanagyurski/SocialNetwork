import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm, ValidationErrors } from '@angular/forms';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { Token } from '@angular/compiler';

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
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe(
      {
        next: (response:any) => {
          console.log(response);
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
