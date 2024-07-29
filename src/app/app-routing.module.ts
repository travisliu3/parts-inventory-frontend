import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from "./shared/auth/auth.guard";
import { LogInComponent } from './shared/components/log-in/log-in.component';
import { LogOutComponent } from './shared/components/log-out/log-out.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "parts-inventory"
  },
  {
    path: "parts-inventory",
    canActivate: [AuthGuard],
    loadChildren: () => import('./parts-inventory/parts-inventory.module').then(m => m.PartsInventoryModule)
  },
  {
    path: "logIn",
    component: LogInComponent
  },
  {
    path: "logOut",
    component: LogOutComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
