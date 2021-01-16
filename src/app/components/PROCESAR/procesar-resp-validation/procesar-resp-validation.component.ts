import { Component, ElementRef, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ProcessFileService } from  '../../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { LineCap } from '../../models/models-procesarRespValidation/lineCap';
import { DataCaptureLineUpdate } from '../../models/models-procesarRespValidation/dataCaptureLineUpdate';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataComplementary } from '../../models/models-procesarRespValidation/dataComplementary';
import { SharedComponent } from 'src/app/shared/shared/shared.component';

@Component({
  selector: 'app-procesar-resp-validation',
  templateUrl: './procesar-resp-validation.component.html',
  styleUrls: ['./procesar-resp-validation.component.scss']
})
export class ProcesarRespValidationComponent implements OnInit {

	public errorCode : string;
	public isError : boolean;
	public errorMsj : string;
	public files: any;
	public dataRowT24 : any;
	public tableStatusProcesar : boolean;
	public tableListRegisterByCode : boolean;
	public rows : any;
	public patronRegistryInput : string;
	public oidRequest : number;
	public statusRequest : string;
	public filesContent : any;
	public totalItems : any;
	public isInfo : boolean;
	public infoCode : string;
	public infoMsj : string;
	public isContentTable : boolean;
	public inputAccountFlag : boolean;
	public isContentTableFull : boolean;
	public isLogin : boolean;
	public dateRange : any;
	public dateFrom : boolean;
	public dateTo : boolean;
	public lineCap : string;
	public ngBalanceImss : any;
	public ngBalanceRcv : any;
	public ngBalanceViv : any;
	public ngBalanceAcv : any;
	public ngBalanceTotal : any;
	
	/*this agregado para funcionamiento*/
	public p: number;
	public globalResp: string;
	public responseType: number;
	public notAutorized: boolean;
	public dataCaptureLine: DataCaptureLineUpdate = new DataCaptureLineUpdate();
	public capLine: LineCap = new LineCap();
	public messageErrService: string = '';
	public errService: boolean = false;
	public respuestas: DataComplementary = new DataComplementary();
	public flagCorrect: boolean = false;
	public respProcesar: string;
	public fechaStart;
	public fechaDefault;
	public changeTableStatusProcesar: boolean = false;
	public ngLastEditBy : any;
	public ngLastEditTimestamp : any;
	public globalDate : any;



	shared = new SharedComponent();
	@ViewChild('dateAnHourReception') dateAnHourReception: ElementRef;
	@ViewChild('sucursal') sucursal: ElementRef;
	@ViewChild('user') user: ElementRef;
	@ViewChild('linecap') linecap: ElementRef;
	@ViewChild('folioT24') folioT24: ElementRef;
	@ViewChild('userT24') userT24: ElementRef;

	@ViewChild('nameClient') nameClient: ElementRef;
	@ViewChild('nameOrRfc') nameOrRfc: ElementRef;
	@ViewChild('tel') tel: ElementRef;
	@ViewChild('nameContact') nameContact: ElementRef;
	@ViewChild('email') email: ElementRef;
	@ViewChild('importIMSS') importIMSS: ElementRef;
	@ViewChild('importRCV') importRCV: ElementRef;
	@ViewChild('importVIV') importVIV: ElementRef;
	@ViewChild('importACV') importACV: ElementRef;
	@ViewChild('total') total: ElementRef;
	@ViewChild('patronRegistry') patronRegistry: ElementRef;
	@ViewChild('bankNameRecep') bankNameRecep: ElementRef;
	@ViewChild('clientOrUserDetail') clientOrUserDetail: ElementRef;
	@ViewChild('respValidateProcesar') respValidateProcesar: ElementRef;
	@ViewChild('diagnostic1') diagnostic1: ElementRef;
	@ViewChild('diagnostic2') diagnostic2: ElementRef;
	@ViewChild('diagnostic3') diagnostic3: ElementRef;

	/*termina*/

  constructor(public authServ : AuthenticationService, public processFile : ProcessFileService,
	  private router : Router,
	  private spinner: NgxSpinnerService,
	  private render: Renderer2) { }

  ngOnInit() {

	this.globalResp = '1';
	this.notAutorized = true;

  	this.isContentTableFull = false;
  	this.isContentTable = false;
	this.tableListRegisterByCode = false;

	this.fechaDefault = this.shared.getDateFormated2();
	this.fechaStart = this.fechaDefault;

	  
  	if(localStorage.getItem('username') === '' || localStorage.getItem('username') == null){
		this.router.navigate(['/']);
	}else{
		this.spinner.show();
		this.authServ.getUserByUserName(localStorage.getItem('username')).subscribe(
			result => {
				if(result.resultCode == 0){
					if(result.logged == 0){
						this.spinner.hide();
						this.router.navigate(['/']);
					}else{
						this.isLogin = true;
						this.processFile.getLastFileToResponseProcesarService().subscribe(
							data => {
								
								let headers;
								const keys = data.headers.keys();
								headers = keys.map(key =>
									`${key}: ${data.headers.get(key)}`
								);
				        		if(data.status === 200){

									this.tableStatusProcesar = true;
									this.rows = data.body.listContent;
									this.spinner.hide();

								}
								if (data.status == 204){

									this.isError= true;
									this.tableStatusProcesar = false;
									this.errorCode = 'Emp-001';
									this.errorMsj = 'Sin registros por el momento';
									this.spinner.hide();

								}
						    },error => {
							    this.isError= true;
							    this.errorCode = '';
								this.errorMsj = 'Ocurrió un error en los servicios, intente más tarde por favor. (getLastFileToResponseProcesarService)';
								this.spinner.hide();
						    }
						);
					}
				}
			}
		);
	}

	this.fechaStart = this.globalDate;
  }
		
	errServices(valueBolean: boolean, message: string) {

		this.errService = valueBolean;
		this.messageErrService = message;
		
	}

  	listRegisterByCodeAndFileResponseProcesar(procesarFileDate, procesarResponse){

		this.fechaStart = this.globalDate;

  		this.processFile.searchFilesToFileT24RespProcesarService(procesarFileDate, procesarResponse).subscribe(
  			result => {   
				
				let headers;
				const keys = result.headers.keys();
				headers = keys.map(key =>
					`${key}: ${result.headers.get(key)}`
				);
        		if(result.status === 204){

					this.isError= true;
					this.isContentTableFull = false;
					this.errorCode = 'Emp-001';
					this.errorMsj = 'Sin registros por el momento';
					this.changeTableStatusProcesar = true;

				}
				if (result.status === 200){
						
					this.isError = false;
					this.tableListRegisterByCode = true;
					this.tableStatusProcesar = false;
					this.isContentTableFull = true;
					this.filesContent = result.body.listContent;
					this.totalItems = result.body.listSize;
					this.changeTableStatusProcesar = true;

				}
		    },error => {

			    this.isError= true;
			    this.errorCode = '';
				this.errorMsj = 'Ups... algo salió mal, intentalo más tarde (searchFilesToFileT24RespProcesarService).';
				
		    }
    	);
  	}

  	backPagePrincipal(){
  		this.tableStatusProcesar = true;
		this.tableListRegisterByCode = false;
		this.changeTableStatusProcesar = false;
		this.fechaStart = this.globalDate;
  	}

 	updateRegistry(line, oid, code: any, flagEditable){
		
		this.lineCap = line;
		this.capLine.capture_line = line; 
 		this.processFile.getContentDataT24ByResponseProcesar(oid).subscribe(
  			result => {  
				this.spinner.show();         
        		if(result.resultCode == 0){
					this.dataRowT24 = result;
					
	        		// this.ngBalanceImss = this.format2(result.imss, '$');
	        		this.ngBalanceImss = this.shared.formatRespProcesar(result.importImss);
	        		this.ngBalanceAcv = this.shared.formatRespProcesar(result.importAcv);
	        		this.ngBalanceRcv = this.shared.formatRespProcesar(result.importRcv );
	        		this.ngBalanceTotal = this.shared.formatRespProcesar(result.importTotal );
					this.ngBalanceViv = this.shared.formatRespProcesar(result.importAp );
					this.respProcesar = result.respProcesar;

	        		this.tableListRegisterByCode = false;
 					this.isContentTable = true;
 					if(result.accountNumber == 'EFECTIVO')
 						this.inputAccountFlag = false;
 					else
						this.inputAccountFlag = true;
					this.processFile.getDataComplementary(this.capLine).subscribe(
						data => {

							this.respuestas = data.body;
							this.errServices(false, '');
							let headers;
							const keys = data.headers.keys();
							headers = keys.map(key =>
								`${key}: ${data.headers.get(key)}`);
							this.globalResp = data.body.responseType.toString();
							if( flagEditable == true){
								this.renderForm(false);
								this.flagCorrect = false;
								this.notAutorized = true;

							}else{
								this.renderForm(true);
								this.flagCorrect = true;
								this.notAutorized = false;

							}
							this.dataCaptureLine.response_type = data.body.responseType;
							// if (!this.notAutorized) this.renderForm(true);
							this.spinner.hide();
						}, error => {
							this.spinner.hide();
							this.errServices(true, `Ocurrió un error en el servicio getDataComplementary ${error}`);
						}

					);

		        }
		    },error => {
			    this.isError= true;
			    this.errorCode = error.resultCode;
				this.errorMsj = error.resultDescription;
		    }
    	);
 	}

 	format2(n, currency) {
		return currency.concat(' ').concat(n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
	}

 	hideContentFileT24Resp(){
	 	this.tableListRegisterByCode = true;
 		this.isContentTable = false;
 	}

 	updateConfirmRegistry(row, imss, rcv, viv, acv, total) {
		//this agregar el nuevo campo
    	this.dataRowT24 = row;
    	this.dataRowT24.patronRegistry = this.patronRegistryInput;
    	this.dataRowT24.imss = imss;
    	this.dataRowT24.acv = acv;
    	this.dataRowT24.rcv = rcv;
    	this.dataRowT24.viv = viv;
    	this.dataRowT24.total = total;
    	this.processFile.updateRegistryResp(this.dataRowT24).subscribe(
  			result => {           
        		if(result.resultCode == 0){

					this.updateTwo(this.dataRowT24.usuarioIngresoT24, this.dataRowT24.idTransaccionT24);

		        }
		    },error => {
			    this.isError= true;
			    this.errorCode = error.resultCode;
				this.errorMsj = error.resultDescription;
		    }
    	);
	}
	  
		/*this Agregado */
	seleccion(operationType: number){
		
		this.globalResp = operationType.toString();
		this.responseType = operationType;
	}

	updateTwo (usuarioIngresoT24: string, idTransaccionT24: string) {

		this.dataCaptureLine.response_type = this.responseType;
		this.dataCaptureLine.capture_line = this.lineCap;
		this.dataCaptureLine.user = localStorage.getItem('username');
		this.dataCaptureLine.user_T24 = usuarioIngresoT24;
		this.dataCaptureLine.id_transaction_t24	 = idTransaccionT24;
		
		this.processFile.updateCaptureLine(this.dataCaptureLine).subscribe(
			dta => {
				
				if (dta.body.response == 0){

					this.tableListRegisterByCode = false;
					this.isContentTable = false;
					this.tableStatusProcesar = true;
					this.changeTableStatusProcesar = false;

					this.processFile.getLastFileToResponseProcesarServiceByDate(this.globalDate).subscribe(
						data=>{
			
							let headers;
							const keys = data.headers.keys();
							headers = keys.map(key =>
								`${key}: ${data.headers.get(key)}`
							);
							if(data.status === 200){
			
								this.tableStatusProcesar = true;
								this.rows = data.body.listContent;
								this.isError = false;
			
							}
							if (data.status == 204){
			
								this.isError= true;
								this.tableStatusProcesar = false;
								this.errorCode = 'Emp-001';
								this.errorMsj = 'Sin registros por el momento.';
			
							}
			
							this.spinner.hide();
							
						},error=>{
							this.isError= true;
							this.errorCode = '';
							this.errorMsj = 'Ocurrió un error en los servicios, intente más tarde por favor. (getLastFileToResponseProcesarService)';
							this.spinner.hide();
						}
					);
					
					alert('Actualización realizada con exito');

				}
				
			}, err => {
				alert(`Error en servicio de actualización updateCaptureLine`);
			}
		);
	}

	renderForm (value: boolean){
		this.render.setProperty(this.nameClient.nativeElement, 'disabled', value);
		this.render.setProperty(this.nameOrRfc.nativeElement, 'disabled', value);
		this.render.setProperty(this.tel.nativeElement, 'disabled', value);
		this.render.setProperty(this.nameContact.nativeElement, 'disabled', value);
		this.render.setProperty(this.email.nativeElement, 'disabled', value);
		this.render.setProperty(this.importIMSS.nativeElement, 'disabled', value);
		this.render.setProperty(this.importRCV.nativeElement, 'disabled', value);
		this.render.setProperty(this.importVIV.nativeElement, 'disabled', value);
		this.render.setProperty(this.importACV.nativeElement, 'disabled', value);
		this.render.setProperty(this.total.nativeElement, 'disabled', value);

		this.render.setProperty(this.dateAnHourReception.nativeElement, 'disabled', value);
		this.render.setProperty(this.sucursal.nativeElement, 'disabled', value);
		this.render.setProperty(this.user.nativeElement, 'disabled', value);
		this.render.setProperty(this.linecap.nativeElement, 'disabled', value);
		this.render.setProperty(this.folioT24.nativeElement, 'disabled', value);
		this.render.setProperty(this.userT24.nativeElement, 'disabled', value);
		this.render.setProperty(this.patronRegistry.nativeElement, 'disabled', value);
		this.render.setProperty(this.bankNameRecep.nativeElement, 'disabled', value);
		this.render.setProperty(this.clientOrUserDetail.nativeElement, 'disabled', value);
		this.render.setProperty(this.respValidateProcesar.nativeElement, 'disabled', value);
		this.render.setProperty(this.diagnostic1.nativeElement, 'disabled', value);
		this.render.setProperty(this.diagnostic2.nativeElement, 'disabled', value);
		this.render.setProperty(this.diagnostic3.nativeElement, 'disabled', value);
	}

	searchByDate(){

		this.spinner.show();
		var dateControlStart: any = document.getElementById('fechaStart');		
		this.globalDate = dateControlStart.value;
		// console.log(dateControlStart.value);
		
		if(dateControlStart.value === null || dateControlStart.value === ''){
			this.isError= true;
			this.tableStatusProcesar = false;
			this.errorCode = 'Atención.';
			this.errorMsj = 'Se requiere seleccionar una fecha para realizar la busqueda';
			this.spinner.hide();
		}else{
			this.processFile.getLastFileToResponseProcesarServiceByDate(dateControlStart.value).subscribe(
				data=>{
	
					let headers;
					const keys = data.headers.keys();
					headers = keys.map(key =>
						`${key}: ${data.headers.get(key)}`
					);
					if(data.status === 200){
	
						this.tableStatusProcesar = true;
						this.rows = data.body.listContent;
						this.isError = false;
	
					}
					if (data.status == 204){
	
						this.isError= true;
						this.tableStatusProcesar = false;
						this.errorCode = 'Emp-001';
						this.errorMsj = 'Sin registros por el momento';
	
					}
	
					this.spinner.hide();
					
				},error=>{
					this.isError= true;
					this.errorCode = '';
					this.errorMsj = 'Ocurrió un error en los servicios, intente más tarde por favor. (getLastFileToResponseProcesarService)';
					this.spinner.hide();
				}
			);
		}

	}

}