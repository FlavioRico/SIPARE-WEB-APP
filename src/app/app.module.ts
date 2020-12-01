import { BrowserModule } from                           '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from        '@angular/core';
import { FormsModule } from                             '@angular/forms';
import { HttpClientModule } from                        '@angular/common/http';
import { BrowserAnimationsModule } from                 '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from  '@angular/common';

import { NgxSpinnerModule } from                  "ngx-spinner";
import { NgxPaginationModule } from               'ngx-pagination'; 
import { AppRoutingModule } from                  './app-routing.module';


//GENERAL COMPONENTS
import { AppComponent } from                      './app.component';
import { NavbarComponent } from                   './components/navbar/navbar.component';
import { LoginComponent } from                    './components/login/login.component';
import { IconsMenuComponent } from                './components/navbar/icons-menu/icons-menu.component';
import { ItemCONSARComponent } from               './components/navbar/navbar-items/item-consar/item-consar.component';
import { SharedComponent } from                   './shared/shared/shared.component';
import { NotFoundPageComponent } from             './components/not-found-page/not-found-page.component';
import { ItemPROCESARComponent } from             './components/navbar/navbar-items/item-procesar/item-procesar.component';

//CONSAR COMPONENTS
import { BitacoraComponent } from                 './components/CONSAR/bitacora/bitacora.component';
import { BalanceConsarComponent } from            './components/CONSAR/balance-consar/balance-consar.component';
import { MonthlyKeysComponent } from              './components/CONSAR/monthly-keys/monthly-keys.component';
import { AcusesComponent } from                   './components/CONSAR/acuses/acuses.component';

//PROCESAR COMPONENTS
import { BalanceProcesarComponent } from          './components/PROCESAR/balance/balance-procesar/balance-procesar.component';
import { ModalAuthComponent } from                './components/PROCESAR/balance/modals/modal-auth/modal-auth.component';
import { ValidFileComponent } from                './components/PROCESAR/valid-file/valid-file.component';
import { ParametersComponent } from               './components/PROCESAR/parameters/parameters.component';
import { BackOfficeComponent } from               './components/PROCESAR/back-office/back-office.component';
import { PreavisoComponent } from                 './components/PROCESAR/preaviso/preaviso.component';
import { CollectionReportComponent } from         './components/PROCESAR/collection-report/collection-report.component';
import { FileCdComponent } from                   './components/PROCESAR/file-cd/file-cd.component';
import { PrivadoPageComponent } from              './components/PROCESAR/privado-page/privado-page.component';
import { ProcesarRespValidationComponent } from   './components/PROCESAR/procesar-resp-validation/procesar-resp-validation.component';
import { SendFileToConnectDirectComponent } from  './components/PROCESAR/send-file-to-connect-direct/send-file-to-connect-direct.component';
import { ModalFilesNotFoundComponent } from       './components/PROCESAR/balance/modals/modal-files-not-found/modal-files-not-found.component';
import { ConciliationReportComponent } from       './components/PROCESAR/conciliation-report/conciliation-report.component';

//SERVICES
import { BitacoraServiceService } from            './services/bitacora/bitacora-service.service';
import { BalanceServiceService } from             './services/balance/balance-service.service';
import { AuthenticationService } from             './services/authentication/authentication.service';
import { ProcessFileService } from                './services/process-file/process-file.service';
import { SipareApiService } from                  './services/conciliation-report/sipare-api.service';
import { KeysService } from                       './services/CONSAR/keys/keys.service';

//OTHERS
import { NgbModule } from                         '@ng-bootstrap/ng-bootstrap';


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
    ValidFileComponent,
    ParametersComponent,
    BackOfficeComponent,
    PreavisoComponent,
    CollectionReportComponent,
    FileCdComponent,
    NotFoundPageComponent,
    PrivadoPageComponent,
    ProcesarRespValidationComponent,
    SendFileToConnectDirectComponent,
    ModalFilesNotFoundComponent,
    ConciliationReportComponent,
    AcusesComponent,
    MonthlyKeysComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [
    BitacoraServiceService,
    BalanceServiceService,
    AuthenticationService,
    ProcessFileService,
    SipareApiService,
    KeysService,
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
