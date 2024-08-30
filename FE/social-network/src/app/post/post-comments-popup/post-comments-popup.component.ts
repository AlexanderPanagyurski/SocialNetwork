import { Component, Input, ViewChild } from '@angular/core';
import { PostComment } from 'src/app/types/post-comment';

@Component({
  selector: 'app-post-comments-popup',
  templateUrl: './post-comments-popup.component.html',
  styleUrls: ['./post-comments-popup.component.css']
})
export class PostCommentsPopupComponent {
  @Input() postComments: PostComment[] = [] as PostComment[];
  @Input() postId: string | undefined;
  @ViewChild('postCommentsModalClose') postCommentsModalClose: any;

  cleanPostCommentsCollections() {
    this.postComments = [];
  }
}
