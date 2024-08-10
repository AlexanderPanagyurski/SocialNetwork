import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CoreModule } from "./core/core.module";
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "./shared/shared.module";
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { appInterceptorProvider } from './app.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticateComponent } from './authenticate/authenticate.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthenticateComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    UserModule,
    PostModule,
    AppRoutingModule,
  ],
  providers: [appInterceptorProvider, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
