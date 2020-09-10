import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { msjscode } from '../../../environments/msjsAndCodes';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-conciliation',
  templateUrl: './conciliation.component.html',
  styleUrls: ['./conciliation.component.scss']
})
export class ConciliationComponent implements OnInit {

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

	constructor(public processFile : ProcessFileService, 
				public authServ : AuthenticationService, 
				private router : Router) { }

	ngOnInit() {
		this.isProgressBar = true;
		this.isError = false;
		this.isSuccess = false;
		if(localStorage.getItem('username') == '' || localStorage.getItem('username') == null){
			this.router.navigate(['/']);
		}else{
			this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
				result => {
					if(result.resultCode == 0){
						if(result.logged == 0)
							this.router.navigate(['/']);
						else{
							this.isLogin = true;
							this.processFile.getBalanceT24().subscribe(
								result => {  
									if(result.resultCode == msjscode.resultCodeOk && result.resultDescription == msjscode.resultDescriptionOk){
										this.buttonBoolean = true;
							        	this.dateConciliation = result.date;
							        	this.ngBalanceImssT24 = this.format2(result.balanceT24Imss, '$');
							        	this.ngBalanceRcvT24 = this.format2(result.balanceT24RCV, '$');
							        	this.ngBalanceVivT24 = this.format2(result.balanceT24Viv, '$');
							        	this.ngCollectionIMSS = this.format2(result.collectionImssRcv, '$');
							        	this.ngCollectionInfonavit = this.format2(result.collectionAcvViv, '$');
							        	this.infoCode = 'ERR-BALANCE';
							        	if (result.balanceT24Imss < result.collectionImssRcv || result.balanceT24Imss > result.collectionImssRcv &&
							        		result.balanceT24RCV < result.collectionAcvViv || result.balanceT24RCV > result.collectionAcvViv) {
							        		if(result.balanceT24Imss < result.collectionImssRcv && result.balanceT24RCV < result.collectionAcvViv){
								        		this.isInfo = true;
									        	this.ngMsjCalculation = 'Diferencia de la recaudación IMSS-INFONAVIT es de: '.
									        			concat(this.format2((result.collectionImssRcv - result.balanceT24Imss ), '$')).
									        			concat(' y Diferencia de la recaudación IMSS-RCV es de:').
									        			concat(this.format2((result.collectionAcvViv - result.balanceT24RCV ), '$'));
								        		this.infoMsj = this.ngMsjCalculation;
								        		$(document).ready(function(){
								        			$("#btnAuthorized").prop('disabled', true); 
												});
							        		}else if(result.balanceT24Imss > result.collectionImssRcv && result.balanceT24RCV < result.collectionAcvViv){
								        		this.isInfo = true;
									        	this.ngMsjCalculation = 'Diferencia de la recaudación IMSS-INFONAVIT es de: '.
									        			concat(this.format2((result.balanceT24Imss  - result.collectionImssRcv ), '$')).
									        			concat(' y Diferencia de la recaudación IMSS-RCV es de:').
									        			concat(this.format2((result.collectionAcvViv - result.balanceT24RCV ), '$'));
								        		this.infoMsj = this.ngMsjCalculation;
								        		$(document).ready(function(){
								        			$("#btnAuthorized").prop('disabled', true); 
												});
							        		}else if(result.balanceT24Imss < result.collectionImssRcv && result.balanceT24RCV > result.collectionAcvViv){
								        		this.isInfo = true;
									        	this.ngMsjCalculation = 'Diferencia de la recaudación IMSS-INFONAVIT es de: '.
									        			concat(this.format2((result.balanceT24Imss  - result.collectionImssRcv ), '$')).
									        			concat(' y Diferencia de la recaudación IMSS-RCV es de:').
									        			concat(this.format2((result.balanceT24RCV  - result.collectionAcvViv ), '$'));
								        		this.infoMsj = this.ngMsjCalculation;
								        		$(document).ready(function(){
								        			$("#btnAuthorized").prop('disabled', true); 
												});
							        		}else if(result.balanceT24Imss > result.collectionImssRcv && result.balanceT24RCV > result.collectionAcvViv){
								        		this.isInfo = true;
									        	this.ngMsjCalculation = 'Diferencia de la recaudación IMSS-INFONAVIT es de: '.
									        			concat(this.format2((result.balanceT24Imss - result.collectionImssRcv ), '$')).
									        			concat(' y Diferencia de la recaudación IMSS-RCV es de:').
									        			concat(this.format2((result.balanceT24RCV  - result.collectionAcvViv ), '$'));
								        		this.infoMsj = this.ngMsjCalculation;
								        		$(document).ready(function(){
								        			$("#btnAuthorized").prop('disabled', true); 
												});
							        		}else if(result.balanceT24Imss < result.collectionImssRcv && result.balanceT24RCV == result.collectionAcvViv){
								        		this.isInfo = true;
									        	this.ngMsjCalculation = 'Diferencia de la recaudación IMSS-INFONAVIT es de: '.
									        			concat(this.format2((result.balanceT24Imss  - result.collectionImssRcv ), '$'));
								        		this.infoMsj = this.ngMsjCalculation;
												$(document).ready(function(){
								        			$("#btnAuthorized").prop('disabled', true); 
												});
							        		}else if(result.balanceT24Imss == result.collectionImssRcv && result.balanceT24RCV < result.collectionAcvViv){
								        		this.isInfo = true;
									        	this.ngMsjCalculation = 'Diferencia de la recaudación IMSS-RCV es de: '.
									        			concat(this.format2((result.balanceT24RCV  - result.collectionAcvViv ), '$'));
								        		this.infoMsj = this.ngMsjCalculation;
								        		$(document).ready(function(){
								        			$("#btnAuthorized").prop('disabled', true); 
												});
							        		}
							        	}else if (result.balanceT24Imss == result.collectionImssRcv && result.balanceT24RCV < result.collectionAcvViv){
							        		this.isInfo = true;
							        		this.ngMsjCalculation = 'Diferencia de la recaudación IMSS-RCV es de: '.
							        			concat(this.format2((result.collectionAcvViv - result.balanceT24RCV ), '$'));
							        		this.infoMsj = this.ngMsjCalculation;
							        		$(document).ready(function(){
								        			$("#btnAuthorized").prop('disabled', true); 
												});
										}else if (result.balanceT24RCV == result.collectionAcvViv  || result.balanceT24Imss < result.collectionImssRcv){
							        		this.isInfo = true;
							        		this.ngMsjCalculation = 'Diferencia de la recaudación IMSS-INFONAVIT es de: '.
							        			concat(this.format2((result.balanceT24Imss - result.collectionImssRcv ), '$'));
							        		this.infoMsj = this.ngMsjCalculation;
							        		$(document).ready(function(){
								        			$("#btnAuthorized").prop('disabled', true); 
												});
							        	}
										if (result.balanceT24RCV == result.collectionAcvViv  && result.balanceT24Imss == result.collectionImssRcv){
							        		this.isInfo = true;
											this.infoCode = 'INFO-BALANCE';
							        		this.infoMsj = 'Los saldos cuadran correctamente';
											$(document).ready(function(){
								        			$("#btnAuthorized").prop('disabled', false); 
												});
							        	}
										if (result.balanceT24RCV > result.collectionAcvViv  && result.balanceT24Imss == result.collectionImssRcv){
							        		this.isInfo = true;
											this.infoCode = 'INFO-BALANCE';
							        		this.infoMsj = 'Los saldos cuadran correctamente';
											$(document).ready(function(){
								        			$("#btnAuthorized").prop('disabled', true); 
												});
							        	}
										if (result.balanceT24RCV < result.collectionAcvViv  && result.balanceT24Imss == result.collectionImssRcv){
							        		this.isInfo = true;
											this.infoCode = 'INFO-BALANCE';
							        		this.infoMsj = 'Los saldos cuadran correctamente';
											$(document).ready(function(){
								        			$("#btnAuthorized").prop('disabled', true); 
												});
							        	}
							        	if(result.collectionImssRcv === 0 && result.collectionAcvViv === 0 ){
							        		this.isError = true;
							        		this.isInfo = false;
								       		this.errorCode = 'ERR-CONCILIATION';
								       		this.errorMsj = 'No hay Archivos de T-24 del día actual';
											$(document).ready(function(){
								        			$("#btnAuthorized").prop('disabled', true); 
												});
							        	}
							        	this.isProgressBar=false;
							        }else{
							        	this.isError = true;
							       		this.errorCode = result.resultCode;
							       		this.errorMsj = result.resultDescription === null ? 
							       		'Sin Archivo para poder realizar la conciliación de cifras.' : result.resultDescription;
							        }
							    },error => {
								    this.isError = true;
							       	this.errorCode = error.resultCode;
							        this.ngMsjCalculation = error.resultDescription;
							    }
							);
						}
					}
				}
			);
		}
  	}

  	exportXLSConciliation(){
  		this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
			result => {
				if(result.resultCode == 0){
					if(result.logged == 0)
						this.router.navigate(['/']);
					else{
						this.processFile.exportDataConciliationXLS().subscribe(
				  			result => {           
				        		if(result == null){
						        	this.isError= true;
								    this.errorCode = 'ERR-EXPORT';
								    this.errorMsj = 'No se genero el reporte de conciliación de cifras el servicio no esta disponible';
						        }else{

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
						        }
						    },error => {
							    this.isError= true;
							    this.errorCode = 'ERR-SERVICE';
								this.errorMsj = 'No se genero el reporte de conciliación de cifras el servicio no esta disponible';
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

	format2(n, currency) {
		return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	}

}