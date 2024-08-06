import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { ErrorComponent } from './error/error.component';
import { EmailDirective } from './validators/email.directive';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { PasswordDirective } from './validators/password.directive';

@NgModule({
  declarations: [
    SpinnerComponent,
    ScrollToTopComponent,
    ErrorComponent,
    EmailDirective,
    GlobalLoaderComponent,
    PasswordDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    GlobalLoaderComponent,
    ScrollToTopComponent,
    ErrorComponent,
    EmailDirective,
    PasswordDirective
  ]
})
export class SharedModule { }
