import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details/post-details.component';
import { SharedModule } from "../shared/shared.module";
import { PostCreateComponent } from './post-create/post-create.component';
import { PostRoutingModule } from './post-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [
    PostDetailsComponent,
    PostCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostRoutingModule,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule
  ]
})
export class PostModule { }
