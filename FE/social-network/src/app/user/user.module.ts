import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersPopupComponent } from './users-popup/users-popup.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersPopupComponent,
    UserDetailsComponent,
    RegisterComponent,
    LoginComponent,
    NewsfeedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule
  ],
  exports: [
    UsersListComponent,
    UsersPopupComponent,
    UserDetailsComponent
  ]
})
export class UserModule { }
