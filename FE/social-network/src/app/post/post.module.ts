import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details/post-details.component';
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
],
  exports: [
    PostDetailsComponent
  ]
})
export class PostModule { }
