import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import { msjscode } from '../../../environments/msjsAndCodes';
import * as $ from 'jquery';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

	public isError : boolean;
	public isLogin : boolean;
	public tableTrx : boolean;
	public errorCode : string;
	public listTrxs = [];
	public errorMsj : string;
	public isSuccess : boolean;
	public isInfo : boolean;
	public infoMsj : string;
	public fileNameNg : string;
	public txtAreaNG : string;
	public txtArea : string;
	public isContentTable : boolean;
	public successCode : string;
	public successrMsj : string;


	constructor(public processFile : ProcessFileService, public authServ : AuthenticationService, private router : Router) { }

	ngOnInit() {
		this.isError = false;
		this.tableTrx = false;
		this.isSuccess = false;
		this.isInfo = true;
  		this.infoMsj = 'Obteniendo el listado de transacciones';
		if(localStorage.getItem('username') == '' || localStorage.getItem('username') == null){
			this.router.navigate(['/']);
		}else{
			this.authServ.getUserByUserName(localStorage.getItem('username')).subscribe(
				result => {
					if(result.resultCode == 0){
						if(result.logged == 0){
							this.router.navigate(['/']);
						}else{
							this.isLogin = true;
							this.processFile.getListTrxsFailedService().subscribe(
								response => {  
									this.tableTrx = true;     
									this.isInfo = false;
  									this.infoMsj = '';    
					        		if(response.resultCode == 0){
					        			if(response.count > 0)
											this.listTrxs = response.listTrxs;
										else {
											this.tableTrx = false;  
											this.isInfo = true;
  											this.infoMsj = 'No hay transacciones rechazadas';  
										}
							        }else{
							        	this.tableTrx = false;   
							        	this.isInfo = true;
  										this.infoMsj = 'No hay transacciones rechazadas';  
							        }
							    },error => {
								    this.isError = true;
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

  	tomorrow(idTrx){
  		this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
			result => {
				if(result.resultCode == 0){
					if(result.logged == 0)
						this.router.navigate(['/']);
					else{
						this.isInfo = true;
						this.isError = false;
  						this.infoMsj = 'Realizando el envio de la transacci�n';  
						this.processFile.trxReprocessTomorrow(idTrx).subscribe(
								response => {     
									this.isInfo = true;
  									this.infoMsj = response.resultDescription;    
					        		if(response.resultCode == 0){
										this.processFile.getListTrxsFailedService().subscribe(
											response => {  
												this.isContentTable = true;     
												this.isInfo = false;
												this.isError = false;
			  									this.infoMsj = '';    
								        		if(response.resultCode == 0){
													this.listTrxs = response.listTrxs;
										        }else{
										        	this.isContentTable = false;   
										        	this.isInfo = true;
			  										this.infoMsj = 'No hay transacciones rechazadas';  
										        }
										    },error => {
											    this.isError = true;
										    	this.errorCode = error.resultCode;
										    	this.errorMsj = error.resultDescription;
										    }
										);
							        }else{
							        	this.isInfo = false;
							        	this.isError = true;
  										this.errorCode = response.resultCode;
  										this.errorMsj = response.resultDescription;
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

  	reprocess(idTrx){
  		this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
			result => {
				if(result.resultCode == 0){
					if(result.logged == 0)
						this.router.navigate(['/']);
					else{
						this.isInfo = true;
						this.isError = false;
  						this.infoMsj = 'Realizando el envio de la transacci�n';  
						this.processFile.trxReprocess(idTrx).subscribe(
								response => {     
									this.isInfo = true;
  									this.infoMsj = response.resultDescription;    
					        		if(response.resultCode == 0){
										this.processFile.getListTrxsFailedService().subscribe(
											response => {  
												this.isContentTable = true;     
												this.isInfo = false;
												this.isError = false;
			  									this.infoMsj = '';    
								        		if(response.resultCode == 0){
													this.listTrxs = response.listTrxs;
										        }else{
										        	this.isContentTable = false;   
										        	this.isInfo = true;
			  										this.infoMsj = 'No hay transacciones rechazadas';  
										        }
										    },error => {
											    this.isError = true;
										    	this.errorCode = error.resultCode;
										    	this.errorMsj = error.resultDescription;
										    }
										);
							        }else{
							        	this.isInfo = false;
							        	this.isError = true;
  										this.errorCode = response.resultCode;
  										this.errorMsj = response.resultDescription;
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