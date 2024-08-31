import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { UserService } from '../user.service';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { passwordValidator } from 'src/app/shared/utils/password-validator';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  emailDomains: string[] = EMAIL_DOMAINS;
  userId: string | undefined;
  user: User | undefined;
  image: any;

  form = this.fb.group(
    {
      //controls
      username: ['', [Validators.required, Validators.minLength(4)]],
      // passGroup: this.fb.group({
      //   password: ['', [Validators.required, passwordValidator()]],
      //   confirmPassword: ['', [Validators.required, passwordValidator()]]
      // },
      //   {
      //     validators: [matchPasswordsValidator('password', 'confirmPassword')]
      //   })
    });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId') || '';
      this.fetchUser(this.userId);
      this.setFormInputFields();
    });
  }

  controlTouched(controlName: string): boolean {
    return this.form.get(controlName)?.touched || false;
  }

  controlHasAnyErrors(controlName: string) {
    return this.form.get(controlName)?.errors || undefined;
  }

  controlHasErrors(controlName: string, errorType: string) {
    return this.form.get(controlName)?.errors?.[errorType];
  }

  edit(): void {
    if (this.form.invalid) {
      return;
    }
    const {
      username,
      // passGroup: { password, confirmPassword } = {}
    } = this.form.value;


    const formData = new FormData();
    formData.append('username', username!);
    formData.append('image', this.image, this.image.name);

    this.userService.edit(formData, this.userId!).subscribe(
      {
        next: (res) => {
          this.router.navigate(['users', res.userId]);
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

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.image = file;
      }
    }
  }

  private fetchUser(userId: string) {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.log('Error: ', err);
        this.router.navigate(['not-found']);
      }
    });
  }

  private setFormInputFields() {
    this.form.get('username')?.setValue(this.user?.userUserName!);
  }
}
