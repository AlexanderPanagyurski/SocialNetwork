import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostComment } from 'src/app/types/post-comment';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-comments-popup',
  templateUrl: './post-comments-popup.component.html',
  styleUrls: ['./post-comments-popup.component.css']
})
export class PostCommentsPopupComponent {
  @Input() postComments: PostComment[] = [] as PostComment[];
  @Input() postId: string | undefined;
  @ViewChild('postCommentsModalClose') postCommentsModalClose: any;

  constructor(private postService: PostService) { }

  cleanPostCommentsCollections() {
    this.postComments = [];
  }

  addComment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { content } = form.value;

    this.postService.addPostComment(this.postId!, undefined!, content).subscribe({
      next: (response) => {
        this.postComments.push(response);
        let commentsCount = document.getElementById(`post-comments-${this.postId}`);
        if (commentsCount) {
          commentsCount.innerHTML = this.postComments.length.toString();
        }
      },
      error: (err) => {
        console.log('Error: ', err);
      }
    });
  }
}
