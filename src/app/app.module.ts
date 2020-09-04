import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { LoginComponent } from './login/login.component';
import { IconsMenuComponent } from './Navbar/icons-menu/icons-menu.component';
import { ItemPROCESARComponent } from './Navbar/navbar-items/item-procesar/item-procesar.component';
import { ItemCONSARComponent } from './Navbar/navbar-items/item-consar/item-consar.component';
import { BalanceProcesarComponent } from './balance/balance-procesar/balance-procesar.component';
import { BalanceConsarComponent } from './balance/balance-consar/balance-consar.component';
import { ModalAuthComponent } from './balance/modals/modal-auth/modal-auth.component';
import { SharedComponent } from './shared/shared/shared.component';
import { HttpClientModule } from '@angular/common/http';
import { BitacoraServiceService } from './services/bitacora/bitacora-service.service';
import { BalanceServiceService } from './services/balance/balance-service.service';
import { PreloaderComponent } from './preloader/preloader.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BitacoraComponent,
    LoginComponent,
    IconsMenuComponent,
    ItemPROCESARComponent,
    ItemCONSARComponent,
    BalanceProcesarComponent,
    BalanceConsarComponent,
    ModalAuthComponent,
    SharedComponent,
    PreloaderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    BitacoraServiceService,
    BalanceServiceService
  ],
  bootstrap: [AppComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
