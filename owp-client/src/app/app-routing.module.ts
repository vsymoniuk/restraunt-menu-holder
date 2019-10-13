import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { TempUserComponent } from './temp-user/temp-user.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { TablesComponent } from './tables/tables.component';
import { CategoryPageComponent } from './category-page/category-page.component';


const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent, children: [
      {path: 'users', component: TempUserComponent},
      {path: 'tables', component: TablesComponent},
      {path: 'categories', component: CategoryPageComponent}
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
