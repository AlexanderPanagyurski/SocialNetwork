import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ScrollToTopComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    ScrollToTopComponent,
    ErrorComponent
  ]
})
export class SharedModule { }
