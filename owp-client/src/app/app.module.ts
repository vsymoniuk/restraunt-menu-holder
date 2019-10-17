import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { TempUserComponent } from './temp-user/temp-user.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { CategoryPositionsPageComponent } from './category-page/category-positions-page/category-positions-page.component';


@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    AuthLayoutComponent,
    TempUserComponent,
    CategoryPageComponent,
    TablePageComponent,
    CategoryPositionsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
