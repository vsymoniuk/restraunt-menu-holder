import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { CategoryPositionsPageComponent } from './category-page/category-positions-page/category-positions-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './auth.guard'

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full' },
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard] ,children: [
      {path: 'tables', component: TablePageComponent},
      {path: 'categories', component: CategoryPageComponent},
      {path: 'categories/:id', component: CategoryPositionsPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
