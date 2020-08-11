import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalanceComponent } from './balance/balance.component';

const routes: Routes = [
  {
    path: 'balance',
    component: BalanceComponent
  },
  {
    path: '',
    redirectTo: '/balance',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
