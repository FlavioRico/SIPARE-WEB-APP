import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SharedComponent } from 'src/app/shared/shared/shared.component';
import { BalanceServiceService } from 'src/app/services/balance/balance-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Summary } from 'src/app/components/models/models-balance/summary';
import { BalanceProcesar } from 'src/app/components/models/models-balance/balance-procesar';
import { ResourceBalance } from '../util/resource-balance';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ProcessFileService } from 'src/app/services/process-file/process-file.service';

// agregado
import * as $ from 'jquery';
import { msjscode } from '../../../../environments/msjsAndCodes';


@Component({
  selector: 'app-balance-procesar',
  templateUrl: './balance-procesar.component.html',
  styleUrls: ['../balance-consar/balance-consar.component.scss']
})
export class BalanceProcesarComponent implements OnInit {

  /*Elementos del DOM a renderizar con Renderer2*/
  @ViewChild('msjValidacion') messageValidacion: ElementRef;
  @ViewChild('buttonValidacion') btnAutorizar: ElementRef;
  @ViewChild('iconVerifyACV') iconCompACV: ElementRef;
  @ViewChild('iconVerifyRCV') iconCompRCV: ElementRef;
  @ViewChild('iconVerifyTotal') iconCompTotal: ElementRef;
  @ViewChild('exportExcel') exportExcel: ElementRef;

  /*Others*/
  shared = new SharedComponent();
  balance: BalanceProcesar;
  fechaCompleta = this.shared.getDateFormated();
  public loadComplete: boolean = false;
  resourceBalance: ResourceBalance = new ResourceBalance(this.render);

  /*Valores de la tabla SIN formato para PROCESAR*/
  valueRCV: number;
  valueIMSSACV: number;
  valueT2RCV: number;
  valueT1RCV: number;
  totalAuxiliares: number;
  totalArchivo: number;
  
  /*Para el formato de tabla*/
  textRCV = 'RCV ';
  RCVformated: any;
  textT2RCV = 'T+2\nRCV ';
  T2RCVformated: any;
  textIMSSACV = 'IMSS\nACV ';
  IMSSACVformated: any;
  textT1ACV = 'T+1\nACV ';
  T1ACVformated: any;
  textTotal = 'TOTAL ';
  totalArchivoformated: any;
  totalAuxiliaresformated: any;

  /*Para comporbar Back Office*/
  parameterT1: boolean = true;
  parameterT2: boolean = true;
  backOfficeCompleted: boolean = true;
  err: boolean = false;

  constructor(
    private render: Renderer2,
    private serviceBalance: BalanceServiceService,
    private spinner: NgxSpinnerService,
    public processFile : ProcessFileService, 
		public authServ : AuthenticationService, 
		private router : Router
  ) {}

  ngOnInit(): void {

    this.spinner.show();
    this.processFile.getParameter('116027').subscribe(

      data => {
        let headers;
        const keys = data.headers.keys();
          headers = keys.map(key =>
            `${key}: ${data.headers.get(key)}`
        );
        this.parameterT1 = (data.status == 200) ? true : false;
        // console.log('El servicio me respondió y dejó parameterT1 = ', this.parameterT1);

        this.processFile.getParameter('116018').subscribe(
          data => {
            let headers;
            const keys = data.headers.keys();
              headers = keys.map(key =>
                `${key}: ${data.headers.get(key)}`
            );
            this.parameterT2 = (data.status == 200) ? true : false;
            this.backOfficeCompleted = (this.parameterT1 && this.parameterT2) ? true : false;
            // console.log('El servicio me respondió y dejó parameterT2 = ', this.parameterT2);

            this.sendRequestBalance(this.backOfficeCompleted);

          }, error => {
            this.parameterT1 = true;
            this.parameterT2 = true;
            this.backOfficeCompleted = false;
            this.err = true;
            this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'none');
            this.render.setStyle(this.exportExcel.nativeElement, 'display', 'none');
            alert(`Ocurrió un error en el servicio getParameter.`);
            this.spinner.hide();
          }
        );

      },error => {
        this.parameterT1 = true;
        this.parameterT2 = true;
        this.err = true;
        this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'none');
        this.render.setStyle(this.exportExcel.nativeElement, 'display', 'none');
        alert(`Ocurrió un error en el servicio getParameter.`);
        this.spinner.hide();
      }
    );
  }


  sendRequestBalance (backOfficeCompleted: boolean) {
    if (backOfficeCompleted){
      this.spinner.show();
      this.serviceBalance.retrieveBalancePROCESAR().subscribe(
        data => {
          if(data === null){
            this.spinner.hide();
            this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'none');
          }else{
            this.balance = data;
            this.setT24Amounts(this.balance.t24_amounts);
            this.setFileAmounts(this.balance.file_amounts);
            this.format();
            let saldosEmpity = this.setMessageValidacion(
              this.balance.balanced,
              this.balance.t24_amounts,
              this.balance.status
            );
            if (!saldosEmpity){
              this.resourceBalance.validationChangeIcons(
                this.balance.comparisons,
                this.iconCompACV, 
                this.iconCompRCV,
                this.iconCompTotal
              );
            }
          }
          this.spinner.hide();  
        }, error => {
          alert(`Error inesperado en los servicios. ${error.message}`);
          this.spinner.hide();  
        }
      );
    } else {
      this.spinner.hide();
    }
  }

  setMessageValidacion (balanced: boolean, t24Amounts: Summary, status: number) {
    
    let saldosToday = t24Amounts.total;
    
    if (saldosToday === 0) {
      if(status == 203){
        this.aprovedTrue(); 
      }else{
        
        this.createMessage('alert-warning', 'Advertencia. No hay archivos de T-24 del día actual.');
        this.render.removeClass(this.btnAutorizar.nativeElement, 'btn-outline-success');
        this.render.addClass(this.btnAutorizar.nativeElement, 'btn-outline-warning');
        this.setIconsWarning();
      }
      return 1;
    }
    
    if (!balanced || status === 201) {
      this.createMessage('alert-danger', 'Error. Inconsistencia en los saldos.');
      this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'none');
      return 0;
    }

    if (status === 203){
      this.aprovedTrue();
      return 0;
    }

    if (status != 200) {
      this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'none');
      return 0;
    }

    if (balanced && status === 200) {
      this.createMessage('alert-success', 'Los saldos cuadran correctamente.');
      return 0;
    }
  }

  aprovedTrue(){
    this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'none');
    this.createMessage('alert-success', `La autorización ya fue realizada por ${this.balance.approved_by}.`);
  }

  createMessage (classMessage: string, textMessage: string) {
    this.render.addClass(
      this.messageValidacion.nativeElement,
      classMessage
    );
    const div = this.render.createElement('div');
    const textValid = this.render.createText(
      textMessage
    );
    this.render.appendChild(div, textValid);
    this.render.appendChild(
      this.messageValidacion.nativeElement, div
    );
  }

  setT24Amounts(t24Amounts: Summary) {
    this.valueT2RCV = t24Amounts.rcv;
    this.valueT1RCV = t24Amounts.vivienda_acv_imss;
    this.totalAuxiliares = t24Amounts.total;
  }

  setFileAmounts (fileAmounts: Summary) {
    this.valueRCV = fileAmounts.rcv;
    this.valueIMSSACV = fileAmounts.vivienda_acv_imss;
    this.totalArchivo = fileAmounts.total;
  }

  format() {
    this.RCVformated = this.shared.formatTable(this.valueRCV);
    this.T2RCVformated = this.shared.formatTable(this.valueT2RCV);
    this.IMSSACVformated = this.shared.formatTable(this.valueIMSSACV);
    this.T1ACVformated = this.shared.formatTable(this.valueT1RCV);
    this.totalArchivoformated = this.shared.formatTable(this.totalArchivo);
    this.totalAuxiliaresformated = this.shared.formatTable(this.totalAuxiliares);
  }
  
  setIconsWarning () {
    const iconos = [this.iconCompACV, this.iconCompRCV, this.iconCompTotal];
    const newIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-exclamation-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/> </svg>';
    for (let i = 0; i < iconos.length; i++) {
      this.render.removeClass(iconos[i].nativeElement, 'icon-verify-ok');
      this.render.removeClass(iconos[i].nativeElement, 'icon-verify-error');
      this.render.addClass(iconos[i].nativeElement, 'icon-verify-warning');
      this.render.setProperty(iconos[i].nativeElement, 'innerHTML', newIcon);
    }
  }  

  aproveBalancePROCESAR(){

    let a: any;
    this.serviceBalance.aproveBalancePROCESAR(this.balance).subscribe(
      data => {
        this.generateLiquidation(); 
      }, error => {
        alert(`Error inesperado en servicio balance procesar al aprobar. ${error}`);
      }
    );

  }

  generateLiquidation() {

    this.serviceBalance.createLiquidation().subscribe(
      data2 => {
        // this.resourceBalance.authSucess(this.btnAutorizar, this.messageValidacion);
        this.generatePreNotice();
      },error =>{
        alert(`Error inesperado en los servicios ${error.resultCode}`);
      }
    );
    
  }

  generatePreNotice() {

    this.serviceBalance.createPreNotice().subscribe(
      data => {
        this.resourceBalance.authSucess(this.btnAutorizar, this.messageValidacion);
      },error =>{
        alert(`Error inesperado en los servicios ${error.resultCode}`);
      }
    );
    
  }

  /*Agregado proveedor*/
  public dateConciliation : string;
	public ngBalanceImssT24 : string;
	public ngBalanceRcvT24 : string;
	public ngBalanceVivT24 : string;
	public ngCollectionIMSS : string;
	public ngCollectionInfonavit : string;
	public ngMsjCalculation : string;
	public isError : boolean;
	public isSuccess : boolean;
	public isInfo : boolean;
	public infoMsj : string;
	public infoCode : string;
	public errorCode : string;
	public errorMsj : string;
	public buttonBoolean : boolean;
	public successCode : string;
	public successrMsj : string;
	public isProgressBar : boolean;
  public isLogin : boolean;
  
  exportXLSConciliation(){
    this.spinner.show();
    this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
    result => {
      if(result.resultCode == 0){
        if(result.logged == 0){
          this.spinner.hide();
          this.router.navigate(['/']);
        }
        else{
          this.processFile.exportDataConciliationXLS().subscribe(
              result => {           
                  if (result == null) {
                    this.isError= true;
                    this.errorCode = 'ERR-EXPORT';
                    this.errorMsj = 'No se genero el reporte de conciliación de cifras el servicio no esta disponible';
                    this.spinner.hide();
                  }
                  else {
                    var file = new Blob([ result ], {
                      type : 'application/csv'
                    });
                    var fileURL = URL.createObjectURL(file);
                    var a = document.createElement('a');
                    a.href = fileURL;
                    a.target = '_blank';
                    a.download = 'reporte_conciliacion_cifras.xls';
                    document.body.appendChild(a);
                    a.click();
                    this.spinner.hide();
                  }
              },error => {
                this.isError= true;
                this.errorCode = 'ERR-SERVICE';
                this.errorMsj = 'No se genero el reporte de conciliación de cifras el servicio no esta disponible';
                this.spinner.hide();
              }
            );
        }
      }
    });
  }

  sendFileToConnectDirect(){
		$(document).ready(function(){
			$("#btnAuthorized").prop('disabled', true); 
		});
		this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
			result => {
				if(result.resultCode == 0){
					if(result.logged == 0)
						this.router.navigate(['/']);
					else{
						$(document).ready(function(){
							$("#btnAuthorized").prop('disabled', true); 
						});
						this.isInfo = false;
						this.infoMsj = '';
						this.infoCode = '';
            this.isProgressBar = false;
            
						this.processFile.sendFileToConnectDirect(localStorage.getItem('username')).subscribe(
							result => {           
				        		if(result.resultCode == msjscode.resultCodeOk){
				        			if(result.descriptionOrReject != null ){  
										    this.isError = true;
										    this.isSuccess = false;
						        		this.errorCode = 'ERR-FILE';
						        		this.errorMsj = result.resultDescription;
				        			}else{
										    this.isSuccess = true;
							        	this.isError = false;
							        	this.successCode = 'SUCCESS';
                        this.successrMsj = result.resultDescription;
                        this.aproveBalancePROCESAR();                                                                       
				        			}
						        	this.successrMsj = result.resultDescription;
						        	this.isProgressBar = false;
						        }else if(result.resultCode == 'PF-MS-ERR0003'){
						        	this.isError = true;
						        	this.isProgressBar = false;
						       		this.errorCode = result.resultCode;
						        	this.errorMsj = result.resultDescription;
						        }
						    },error => {
							    this.isError = true;
                  this.errorCode = error.resultCode;
                  this.errorMsj = error.resultDescription;
                }
            );
            
					}
				}
			});
	}

}
