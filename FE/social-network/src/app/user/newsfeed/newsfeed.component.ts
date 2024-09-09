import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post/post.service';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { Post } from 'src/app/types/post';
import { UserService } from '../user.service';
import { PostComment } from 'src/app/types/post-comment';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  posts: Post[] = [];

  form = this.fb.group({
    //controls
    content: ['', [Validators.required, Validators.minLength(6)]],
  });

  images: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private globalLoaderService: GlobalLoaderService,
    public userService: UserService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  navigateTo(path: string, post: Post) {
    this.router.navigate([path, post.userId]);
  }

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
    debugger;
    if (this.form.invalid) {
      return;
    }

    const { content } = this.form.value;

    const formData = new FormData();
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
  
  private fetchPosts() {
    this.globalLoaderService.showLoader();

    this.postService.loadNewsfeed().subscribe({
      next: (posts) => {
        this.posts = posts;
        console.log(this.posts);
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        this.globalLoaderService.hideLoader();
        console.log('Error: ', err);
      }
    });
  }
}
