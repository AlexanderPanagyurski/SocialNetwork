import { Component, Input } from '@angular/core';
import { PostComment } from 'src/app/types/post-comment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  @Input() postComments: PostComment[] = [] as PostComment[];

  checkIfEdited(postComment: PostComment): string {
    const datePipe: DatePipe = new DatePipe('en-US');
    let date = postComment.createdOn;
    let isEdited = false;

    if (postComment.modifiedOn) {
      date = postComment.modifiedOn;
      isEdited = true;
    }
    return `${datePipe.transform(date, 'fullDate')} ${isEdited ? '(edited)' : ''}`;
  }

  setProfileImage(comment: PostComment) {
    if (comment.userProfileImage) {
      return `data:image/JPEG;base64,${comment.userProfileImage}`;
    }
    return '../../../assets/images/default-profile-image.png';
  }
}
