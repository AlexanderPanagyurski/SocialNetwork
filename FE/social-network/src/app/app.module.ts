import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CoreModule } from "./core/core.module";
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "./shared/shared.module";
import { ErrorComponent } from './error/error/error.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UsersPopupComponent } from './user/users-popup/users-popup.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    UserModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
