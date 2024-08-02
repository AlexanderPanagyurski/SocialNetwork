import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersPopupComponent } from './users-popup/users-popup.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CoreModule } from '../core/core.module';
import { AppRoutingModule } from '../app-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    UsersListComponent,
    UsersPopupComponent,
    UserDetailsComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AppRoutingModule
  ],
  exports:[
    UsersListComponent,
    UsersPopupComponent,
    UserDetailsComponent
  ]
})
export class UserModule { }
