import { Component } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  form = this.fb.group({
    //controls
    title: ['', [Validators.required, Validators.minLength(6)]],
    content: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private postService: PostService) { }

  controlTouched(controlName: string): boolean {
    return !!this.form.get(controlName)?.touched;
  }

  controlHasAnyErrors(controlName: string) {
    return !!this.form.get(controlName)?.errors;
  }

  controlHasErrors(controlName: string, errorType: string) {
    return this.form.get(controlName)?.errors?.[errorType];
  }

  addformErrorBorder(touched: boolean, errors: boolean): string {
    if (errors && touched) {
      return 'form-error';
    }
    return '';
  }

  create() {
    if (this.form.invalid) {
      return;
    }

    const { title, content } = this.form.value;

    this.postService.create(title!, content!).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['posts', res.postId]);
      },
      error: (err) => {
        console.log("Error: ", err);
      }
    });
  }
}
