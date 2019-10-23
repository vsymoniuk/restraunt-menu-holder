import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './components/layouts/site-layout/site-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { TablePageComponent } from './components/table-page/table-page.component';
import { CategoryPositionsPageComponent } from './components/category-page/category-positions-page/category-positions-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthGuard } from './guards/auth.guard'
import { AdminGuard } from './guards/admin.guard';
import { WaiterGuard } from './guards/waiter.guard';
import { CustomerGuard } from './guards/customer.guard';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { StaffRegisterPageComponent } from './components/staff-register-page/staff-register-page.component';
import { OrderGuard } from './guards/order.guard';

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
      {path: 'categories', canActivate: [AdminGuard] , component: CategoryPageComponent},
      {path: 'categories/:id', canActivate: [AdminGuard], component: CategoryPositionsPageComponent},
      {path: 'staff-register', canActivate: [AdminGuard], component: StaffRegisterPageComponent},
      {path: 'history',  component: HistoryPageComponent},
      {path: 'order', canActivate: [OrderGuard], component: OrderPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
