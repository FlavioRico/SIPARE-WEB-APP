import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BalanceConsarComponent } from './balance/balance-consar/balance-consar.component';
import { BalanceProcesarComponent } from './balance/balance-procesar/balance-procesar.component';
import { BitacoraComponent } from './bitacora/bitacora.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'bitacora',
    component: BitacoraComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'balanceConsar',
    component: BalanceConsarComponent
  },
  {
    path: 'balanceProcesar',
    component: BalanceProcesarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
