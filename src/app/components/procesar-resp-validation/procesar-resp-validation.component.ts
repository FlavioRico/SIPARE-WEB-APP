import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import * as $ from 'jquery';

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
	public ngBalanceImss : string;
	public ngBalanceRcv : string;
	public ngBalanceViv : string;
	public ngBalanceAcv : string;
	public ngBalanceTotal : string;
	/*this agregado para funcionamiento*/
	public p: number;
	public globalResp: string;
	public notAutorized: boolean;
	/*termina*/

  constructor(public authServ : AuthenticationService, public processFile : ProcessFileService,
  	private router : Router) { }

  ngOnInit() {
	this.globalResp = '1 Corrección ER.';
	this.notAutorized = true;

  	this.isContentTableFull = false;
  	this.isContentTable = false;
  	this.tableListRegisterByCode = false;
  	if(localStorage.getItem('username') === '' || localStorage.getItem('username') == null){
			this.router.navigate(['/']);
	}else{
		this.authServ.getUserByUserName(localStorage.getItem('username')).subscribe(
			result => {
				if(result.resultCode == 0){
					if(result.logged == 0){
						this.router.navigate(['/']);
					}else{
						this.isLogin = true;
						this.processFile.getLastFileToResponseProcesarService().subscribe(
							result => {           
				        		if(result.resultCode == 0){
						        	if (result.listSize == 0){
						        		this.tableStatusProcesar = false;
								        this.errorCode = 'Emp-001';
								        this.errorMsj = 'Sin registros por el momento.';
						        	} else {
						        		this.tableStatusProcesar = true;
										this.rows = result.listContent;
									}
						        }
						    },error => {
							    this.isError= true;
							    this.errorCode = error.resultCode;
								this.errorMsj = error.resultDescription;
						    }
						);
					}
				}
			}
		);
	}
  }

  	listRegisterByCodeAndFileResponseProcesar(oid, status){
  		this.oidRequest = oid;
  		this.statusRequest = status;
  		this.processFile.searchFilesToFileT24RespProcesarService(oid, status).subscribe(
  			result => {           
        		if(result.resultCode == 0){
		        	if (result.listSize == 0){
						this.isError= true;
						this.isContentTableFull = false;
				        this.errorCode = 'Emp-001';
				        this.errorMsj = 'Sin registros por el momento.';
		        	} else {
		        		this.isError = false;
		        		this.tableListRegisterByCode = true;
		        		this.tableStatusProcesar = false;
						this.isContentTableFull = true;
						this.filesContent = result.listContent;
						this.totalItems = result.listSize;
					}
		        }
		    },error => {
			    this.isError= true;
			    this.errorCode = error.resultCode;
				this.errorMsj = error.resultDescription;
		    }
    	);
  	}

  	backPagePrincipal(){
  		this.tableStatusProcesar = true;
  		this.tableListRegisterByCode = false;
  	}

 	updateRegistry(line, oid, code: any){
		console.log('debug function = ', code);
		
		this.notAutorized = (code == '01') ? false : true;

 		this.lineCap = line;
 		this.processFile.getContentDataT24ByResponseProcesar(oid).subscribe(
  			result => {           
        		if(result.resultCode == 0){
	        		this.dataRowT24 = result;
	        		this.ngBalanceImss = this.format2(result.imss, '$');
	        		this.ngBalanceAcv = this.format2(result.acv, '$');
	        		this.ngBalanceRcv = this.format2(result.rcv, '$');
	        		this.ngBalanceTotal = this.format2(result.total, '$');
	        		this.ngBalanceViv = this.format2(result.ap, '$');
	        		this.tableListRegisterByCode = false;
 					this.isContentTable = true;
 					if(result.accountNumber == 'EFECTIVO')
 						this.inputAccountFlag = false;
 					else
						 this.inputAccountFlag = true;
					console.log('debug', result);
					
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
    	console.log('RCV:', rcv);
    	this.dataRowT24.patronRegistry = this.patronRegistryInput;
    	this.dataRowT24.imss = imss;
    	this.dataRowT24.acv = acv;
    	this.dataRowT24.rcv = rcv;
    	this.dataRowT24.viv = viv;
    	this.dataRowT24.total = total;
    	this.processFile.updateRegistryResp(this.dataRowT24).subscribe(
  			result => {           
        		if(result.resultCode == 0){
	        		this.tableListRegisterByCode = false;
 					this.isContentTable = false;
 					this.tableStatusProcesar = true;
		        }
		    },error => {
			    this.isError= true;
			    this.errorCode = error.resultCode;
				this.errorMsj = error.resultDescription;
		    }
    	);
  	}

}
