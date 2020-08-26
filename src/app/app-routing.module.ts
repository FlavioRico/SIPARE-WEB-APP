import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalanceComponent } from './balance/balance.component';
import { BalanceConsarComponent } from './balance/balance-consar/balance-consar.component';
import { BalanceProcesarComponent } from './balance/balance-procesar/balance-procesar.component';
import { BitacoraComponent } from './bitacora/bitacora.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/balanceProcesar',
    pathMatch: 'full'
  },
  {
    path: 'balance',
    component: BalanceComponent
  },
  {
    path: 'bitacora',
    component: BitacoraComponent
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
