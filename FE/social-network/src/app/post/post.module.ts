import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details/post-details.component';
import { SharedModule } from "../shared/shared.module";
import { PostCreateComponent } from './post-create/post-create.component';
import { PostRoutingModule } from './post-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PostCardComponent } from './post-card/post-card.component';
import { PostCommentsPopupComponent } from './post-comments-popup/post-comments-popup.component';
import { CommentCardComponent } from './comment-card/comment-card.component';



@NgModule({
  declarations: [
    PostDetailsComponent,
    PostCreateComponent,
    PostCardComponent,
    PostCommentsPopupComponent,
    CommentCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostRoutingModule,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule
  ],
  exports:[
    PostCommentsPopupComponent,
    PostCardComponent
  ]
})
export class PostModule { }
