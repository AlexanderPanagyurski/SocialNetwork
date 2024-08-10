import { Component } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
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

  images: any[] = [];

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

    const formData = new FormData();
    formData.append('title', title!);
    formData.append('content', content!);

    for (const photo of this.images) {
      console.log(photo);
      formData.append('image', photo, photo.name);
    }

    this.postService.create(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['posts', res.postId]);
      },
      error: (err) => {
        console.log("Error: ", err);
      }
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.images.push(file);
      }
    }
  }
}
