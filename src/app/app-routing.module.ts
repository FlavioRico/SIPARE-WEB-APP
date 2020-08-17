import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalanceComponent } from './balance/balance.component';
import { BitacoraComponent } from './bitacora/bitacora.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/balance',
    pathMatch: 'full'
  },
  {
    path: 'balance',
    component: BalanceComponent
  },
  {
    path: 'bitacora',
    component: BitacoraComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
