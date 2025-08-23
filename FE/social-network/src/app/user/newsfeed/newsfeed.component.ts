import { DatePipe } from '@angular/common';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
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
export class NewsfeedComponent implements OnInit, OnDestroy {
  currentPage: number = 1;
  pageSize: number = 5;
  hasMorePosts: boolean = true;
  showEmojiPicker = false;

  posts: Post[] = [];

  form = this.fb.group({
    //controls
    content: ['', [Validators.required, Validators.minLength(6)]],
  });

  images: File[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private globalLoaderService: GlobalLoaderService,
    public userService: UserService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.fetchPosts();
    window.addEventListener('scroll', this.onWindowScroll, true);
  }


  ngOnDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll, true);
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    console.log('showEmojiPicker:', this.showEmojiPicker);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Assuming the emoji picker has tag 'emoji-mart' and the smile icon label has a class or id
    if (
      this.showEmojiPicker &&
      !target.closest('emoji-mart') &&
      !target.closest('.emoji-icon')
    ) {
      this.showEmojiPicker = false;
    }
  }

  addEmoji(event: any) {
    const emoji = event.emoji.native;
    const currentContent = this.form.get('content')?.value || '';
    this.form.get('content')?.setValue(currentContent + emoji);
  }

  onLoadMore() {
    if (!this.hasMorePosts) {
      return;
    }

    this.currentPage++;

    this.fetchPosts();
  }

  onWindowScroll = () => {
    const threshold = 150; // px from bottom
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;
    if (height - position < threshold) {
      this.onLoadMore();
    }
  };

  onPostDeleted(postId: string) {
    // Remove the deleted post from the posts array in the parent component
    this.posts = this.posts.filter(post => post.postId !== postId);
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

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      for (const file of Array.from(target.files)) {
        this.images.push(file);
      }
    }
  }


  fetchPosts() {
    if (!this.hasMorePosts) {
      return; // No more posts to load
    }

    const skip = (this.currentPage - 1) * this.pageSize;
    const take = this.pageSize;
    this.globalLoaderService.showLoader();

    setTimeout(() => {
      this.postService.loadNewsfeed(skip, take).subscribe({
        next: (newPosts) => {
          this.posts = [...this.posts, ...newPosts];
          if (newPosts.length < this.pageSize) {
            this.hasMorePosts = false; // No more posts to load
          }
          this.globalLoaderService.hideLoader();
        },
        error: (err) => {
          this.globalLoaderService.hideLoader();
          console.log('Error: ', err);
        }
      });
    }, 1000);
  }
}
