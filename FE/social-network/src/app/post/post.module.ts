import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details/post-details.component';



@NgModule({
  declarations: [
    PostDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PostDetailsComponent
  ]
})
export class PostModule { }
