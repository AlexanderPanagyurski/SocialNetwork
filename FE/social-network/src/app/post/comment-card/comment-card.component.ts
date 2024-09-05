import { Component, Input } from '@angular/core';
import { PostComment } from 'src/app/types/post-comment';
import { DatePipe } from '@angular/common';
import { DEFAULT_USER_IMAGE_URL } from 'src/app/constants';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  loadReplyCommentTextArea: boolean = false;
  replyOnId: string | undefined;
  @Input() postId: string | undefined;
  @Input() postComments: PostComment[] = [] as PostComment[];

  constructor(private postService: PostService) { }

  checkIfEdited(postComment: PostComment): string {
    const datePipe: DatePipe = new DatePipe('en-US');
    let date = postComment.createdOn;
    let isEdited = false;

    if (postComment.modifiedOn) {
      date = postComment.modifiedOn;
      isEdited = true;
    }
    return `${datePipe.transform(date, 'short')} ${isEdited ? '(edited)' : ''}`;
  }

  setProfileImage(comment: PostComment) {
    if (comment.userProfileImage) {
      return `data:image/JPEG;base64,${comment.userProfileImage}`;
    }
    return DEFAULT_USER_IMAGE_URL;
  }

  loadReply(postCommentId: string) {
    console.log(postCommentId);
    this.loadReplyCommentTextArea = true;
    this.replyOnId = postCommentId;
  }

  addComment(form: NgForm, postComment: PostComment) {
    if (form.invalid) {
      return;
    }
    console.log('Replying on: ', postComment.id);

    const { content } = form.value;
    debugger;
    this.postService.addPostComment(this.postId!, postComment.id, content).subscribe({
      next: (response) => {
        postComment.children.push(response);
        let commentsCount = document.getElementById(`post-comments-${this.postId}`);
        if (commentsCount) {
          let count = Number(commentsCount.innerHTML)
          commentsCount.innerHTML = (++count).toString();
        }
      },
      error: (error) => {
        console.log('Error: ', error);
      }
    })
  }
}
