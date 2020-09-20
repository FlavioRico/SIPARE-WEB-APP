import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination'; 


//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { BitacoraComponent } from './components/bitacora/bitacora.component';
import { LoginComponent } from './components/login/login.component';
import { IconsMenuComponent } from './components/navbar/icons-menu/icons-menu.component';
import { ItemPROCESARComponent } from './components/navbar/navbar-items/item-procesar/item-procesar.component';
import { ItemCONSARComponent } from './components/navbar/navbar-items/item-consar/item-consar.component';
import { BalanceProcesarComponent } from './components/balance/balance-procesar/balance-procesar.component';
import { BalanceConsarComponent } from './components/balance/balance-consar/balance-consar.component';
import { ModalAuthComponent } from './components/balance/modals/modal-auth/modal-auth.component';
import { SharedComponent } from './shared/shared/shared.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ValidFileComponent } from './components/valid-file/valid-file.component';

//Services
import { BitacoraServiceService } from './services/bitacora/bitacora-service.service';
import { BalanceServiceService } from './services/balance/balance-service.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ProcessFileService } from  './services/process-file/process-file.service';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { PreavisoComponent } from './components/preaviso/preaviso.component';
import { CollectionReportComponent } from './components/collection-report/collection-report.component';
import { ConciliationComponent } from './components/conciliation/conciliation.component';
import { FileCdComponent } from './components/file-cd/file-cd.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { PrivadoPageComponent } from './components/privado-page/privado-page.component';
import { ProcesarRespValidationComponent } from './components/procesar-resp-validation/procesar-resp-validation.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { SendFileToConnectDirectComponent } from './components/send-file-to-connect-direct/send-file-to-connect-direct.component';
import { ModalFilesNotFoundComponent } from './components/balance/modals/modal-files-not-found/modal-files-not-found.component';

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
    PreloaderComponent,
    ValidFileComponent,
    TransactionComponent,
    ParametersComponent,
    BackOfficeComponent,
    PreavisoComponent,
    CollectionReportComponent,
    ConciliationComponent,
    FileCdComponent,
    NotFoundPageComponent,
    PrivadoPageComponent,
    ProcesarRespValidationComponent,
    RegisterPageComponent,
    SendFileToConnectDirectComponent,
    ModalFilesNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [
    BitacoraServiceService,
    BalanceServiceService,
    AuthenticationService,
    ProcessFileService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
