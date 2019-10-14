import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { TempUserComponent } from './temp-user/temp-user.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { CategoryPositionsPageComponent } from './category-page/category-positions-page/category-positions-page.component';


const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent, children: [
      {path: 'users', component: TempUserComponent},
      {path: 'tables', component: TablePageComponent},
      {path: 'categories', component: CategoryPageComponent},
      {path: 'categories/:id', component: CategoryPositionsPageComponent}
    ]
  },
  {
    path: '', component: AuthLayoutComponent, children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
