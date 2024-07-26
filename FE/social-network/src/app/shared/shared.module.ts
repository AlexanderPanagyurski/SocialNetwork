import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ScrollToTopComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    ScrollToTopComponent
  ]
})
export class SharedModule { }
