import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TokenInterceptor } from './token.interceptor'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './components/layouts/site-layout/site-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component'
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { TablePageComponent } from './components/table-page/table-page.component';
import { CategoryPositionsPageComponent } from './components/category-page/category-positions-page/category-positions-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { StaffRegisterPageComponent } from './components/users-page/staff-register-page.component';
import { UsersPageComponent } from './components/users-page/users-page/users-page.component';
import { ApiComponent } from './components/api/api.component';
import { EmptyPageComponent } from './components/empty-page/empty-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';


@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    AuthLayoutComponent,
    CategoryPageComponent,
    TablePageComponent,
    CategoryPositionsPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    OrderPageComponent,
    HistoryPageComponent,
    StaffRegisterPageComponent,
    UsersPageComponent,
    ApiComponent,
    EmptyPageComponent,
    NotFoundComponent,
    ProfilePageComponent,
    HomePageComponent
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
