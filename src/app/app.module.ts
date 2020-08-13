import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BalanceComponent } from './balance/balance.component';
import { BitacoraComponent } from './bitacora/bitacora.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BalanceComponent,
    BitacoraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
