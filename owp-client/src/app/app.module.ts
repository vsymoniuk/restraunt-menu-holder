import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TokenInterceptor } from './token.interceptor'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component'
import { CategoryPageComponent } from './category-page/category-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { CategoryPositionsPageComponent } from './category-page/category-positions-page/category-positions-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';


@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    AuthLayoutComponent,
    CategoryPageComponent,
    TablePageComponent,
    CategoryPositionsPageComponent,
    RegisterPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,//для використання форм
    ReactiveFormsModule,//для використання форм
    HttpClientModule,//для роутиншу

  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
