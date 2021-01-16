import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalanceProcesarComponent } from '../app/components/PROCESAR/balance/balance-procesar/balance-procesar.component';
import { ValidFileComponent } from './components/PROCESAR/valid-file/valid-file.component';
import { PrivadoPageComponent } from './components/PROCESAR/privado-page/privado-page.component';
import { CollectionReportComponent } from './components/PROCESAR/collection-report/collection-report.component';
import { SendFileToConnectDirectComponent } from './components//PROCESAR/send-file-to-connect-direct/send-file-to-connect-direct.component';
import { FileCdComponent } from './components//PROCESAR/file-cd/file-cd.component';
import { ProcesarRespValidationComponent } from './components//PROCESAR/procesar-resp-validation/procesar-resp-validation.component';
import { ParametersComponent } from './components//PROCESAR/parameters/parameters.component';
import { BackOfficeComponent } from './components//PROCESAR/back-office/back-office.component';
import { PreavisoComponent } from './components//PROCESAR/preaviso/preaviso.component';
import { ConciliationReportComponent } from './components//PROCESAR/conciliation-report/conciliation-report.component';

import { BalanceConsarComponent } from '../app/components/CONSAR/balance-consar/balance-consar.component';
import { BitacoraComponent } from './components/CONSAR/bitacora/bitacora.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AcusesComponent } from './components/CONSAR/acuses/acuses.component';
import { MonthlyKeysComponent } from './components/CONSAR/monthly-keys/monthly-keys.component';

import { LoginComponent } from './components/login/login.component';

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
    path: 'conciliation-report', component: ConciliationReportComponent
  },
  {
    path: 'acuses', component: AcusesComponent
  },
  {
    path: 'keys', component: MonthlyKeysComponent
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