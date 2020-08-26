import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BalanceComponent } from './balance/balance.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { IconsMenuComponent } from './Navbar/icons-menu/icons-menu.component';
import { ItemPROCESARComponent } from './Navbar/navbar-items/item-procesar/item-procesar.component';
import { ItemCONSARComponent } from './Navbar/navbar-items/item-consar/item-consar.component';
import { BalanceProcesarComponent } from './balance/balance-procesar/balance-procesar.component';
import { BalanceConsarComponent } from './balance/balance-consar/balance-consar.component';
import { ModalAuthComponent } from './balance/modals/modal-auth/modal-auth.component';
import { SharedComponent } from './shared/shared/shared.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BalanceComponent,
    BitacoraComponent,
    IconsMenuComponent,
    ItemPROCESARComponent,
    ItemCONSARComponent,
    BalanceProcesarComponent,
    BalanceConsarComponent,
    ModalAuthComponent,
    SharedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
