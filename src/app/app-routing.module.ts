import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BalanceComponent } from './balance/balance.component';
import { BitacoraComponent } from './bitacora/bitacora.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'balance',
    component: BalanceComponent
  },
  {
    path: 'bitacora',
    component: BitacoraComponent
  },{
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
