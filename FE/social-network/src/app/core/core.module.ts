import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from "../shared/shared.module";
import { Router, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule
],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
