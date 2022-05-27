import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./features/home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  //LAZY LOADING OF ADMIN MODULE
  { path: 'admin', loadChildren: () => import('./core/components/admin/admin.module').then( module => module.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
