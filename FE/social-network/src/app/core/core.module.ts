import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { SharedModule } from "../shared/shared.module";
import { Router, RouterModule } from '@angular/router';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    GlobalLoaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
],
  exports: [
    HeaderComponent,
    FooterComponent,
    GlobalLoaderComponent
  ]
})
export class CoreModule { }
