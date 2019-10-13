import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { TempUserComponent } from './temp-user/temp-user.component';
import { TablesComponent } from './tables/tables.component';
import { CategoryPageComponent } from './category-page/category-page.component';


@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    AuthLayoutComponent,
    TempUserComponent,
    TablesComponent,
    CategoryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
