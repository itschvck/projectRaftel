import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "../../guards/auth.guard";
import { LoginGuard } from "../../guards/login.guard";

const routes : Routes = [
  { path : '',      component : AdminComponent, canActivate : [AuthGuard] },
  { path : 'login', component : LoginComponent, canActivate : [LoginGuard] }
];

@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class AdminRoutingModule { }
