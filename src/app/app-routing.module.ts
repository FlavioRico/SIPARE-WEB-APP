import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { BalanceConsarComponent } from './components/balance/balance-consar/balance-consar.component';
import { BalanceProcesarComponent } from './components/balance/balance-procesar/balance-procesar.component';
import { BitacoraComponent } from './components/bitacora/bitacora.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ValidFileComponent } from './components/valid-file/valid-file.component';
import { PrivadoPageComponent } from './components/privado-page/privado-page.component';
import { CollectionReportComponent } from './components/collection-report/collection-report.component';
import { SendFileToConnectDirectComponent } from './components/send-file-to-connect-direct/send-file-to-connect-direct.component';
import { FileCdComponent } from './components/file-cd/file-cd.component';
import { ProcesarRespValidationComponent } from './components/procesar-resp-validation/procesar-resp-validation.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { PreavisoComponent } from './components/preaviso/preaviso.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ConciliationReportComponent } from './components/conciliation-report/conciliation-report.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'bitacora', component: BitacoraComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'balanceConsar', component: BalanceConsarComponent
  },
  {
    path: 'balanceProcesar', component: BalanceProcesarComponent
  },
  {
    path: 'fileMonthlyProcesar', component: PrivadoPageComponent
  },
	{ 
    path: 'collectionReport', component: CollectionReportComponent 
  },
	{ 
    path: 'sendFileProcesar',  component : SendFileToConnectDirectComponent 
  },
	{ 
    path: 'sendFileCD', component : FileCdComponent 
  },
	{ 
    path: 'respProcesar' , component : ProcesarRespValidationComponent
  },
	{ 
    path: 'validFile' , component : ValidFileComponent
  },
	{ 
    path: 'parameters' , component : ParametersComponent
  },
	{ 
    path: 'back-office' , component : BackOfficeComponent
  },	
	{ 
    path: 'preaviso' , component : PreavisoComponent
  },
	{ 
    path: 'transaction' , component : TransactionComponent
  },
	{ 
    path: 'conciliation-report', component: ConciliationReportComponent
  },
	{ 
    path: '**', component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }