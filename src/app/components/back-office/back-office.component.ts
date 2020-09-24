import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { msjscode } from '../../../environments/msjsAndCodes';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})
export class BackOfficeComponent implements OnInit {

	public ngTypeOperation : string;
	public ngPlace : string;
	public ngFolio : string;
	public ngDateRegistry : string;
	public ngDateRep : string;
	public ngCodeBank : string;
	public ngBankName : string;
	public ngAccount : string;
	public ngKeyEntity : string;
	public ngBankNameRecep : string;
	public ngTxt : string;
	public ngIMSS : string;
	public ngViv : string;
	public ngAcv : string;
	public ngTotal : string;
	public errorMsj : string;
	public infoMsj : string;
	public errorCode : string;
	public infoCode : string;
	public successrMsj : string;
	public successCode : string;
	public isError : boolean;
	public buttonBoolean : boolean;
	public isInfo : boolean;
	public isSuccess : boolean;
	public parameters : any;

	/*agregado*/
	public activateServiceProveedor: boolean = true;

  	constructor(public processFile : ProcessFileService, public authServ : AuthenticationService, private router : Router) { }

  	ngOnInit() {
	  	if(localStorage.getItem('username') == '' || localStorage.getItem('username') == null){
				this.router.navigate(['/']);
		}else{
			this.authServ.getUserByUserName(localStorage.getItem('username')).subscribe(
				result => {
					if(result.resultCode == 0){
						if(result.logged == 0){
							this.router.navigate(['/']);
						}else{

							let operationType = "116027";
							this.processFile.getParameter(operationType).subscribe(
								data =>{
									let headers;
									const keys = data.headers.keys();
										headers = keys.map(key =>
											`${key}: ${data.headers.get(key)}`);
									this.activateServiceProveedor = (data.status == 200) ? true: false;
									this.serviceProveedor(data, this.activateServiceProveedor);
								},error =>{
									alert(`Error inesperado en los servicios ${error.resultCode}`);
								}
							);

						}
					}
				}
			);
		}
	}
	/*agregado*/
	serviceProveedor (parameter, activateServiceProveedor) {
		console.log('debug',parameter, activateServiceProveedor);
		
		if (activateServiceProveedor) { 
			this.isError = false;
			this.isSuccess = false;
	
			this.processFile.getDataTransactionT1().subscribe(
				result => {           
					if(result.resultCode == msjscode.resultCodeOk){
						this.isError= false;
						this.parameters = result;						
						this.ngDateRep = result.resp.receivingDate;
						this.ngIMSS = result.resp.imss;
						this.ngViv = result.resp.viv;
						this.ngAcv = result.resp.acv;
						this.ngDateRegistry = result.resp.dateRegistrty;
						this.ngTotal = result.resp.total;

						this.ngTxt =  parameter.body.description;
						this.ngTypeOperation = parameter.body.operation_type;
						this.ngPlace = parameter.body.office;
						this.ngFolio = parameter.body.sheet_number;
						this.ngCodeBank = parameter.body.issuing_bank_key;
						this.ngBankName = parameter.body.issuing_bank_name;
						this.ngAccount = parameter.body.account_number;
						this.ngKeyEntity = parameter.body.receiving_bank_key;
						this.ngBankNameRecep =  parameter.body.receiving_bank_name;
						
						this.isSuccess= false;
						$(document).ready(function(){
							$("#btnAuthorized").prop('disabled', false); 
						});
					} else {
						this.isError= true;
						this.errorMsj = result.resultDescription;
						this.errorCode = result.resultCode;
						$(document).ready(function(){
							$("#btnAuthorized").prop('disabled', true); 
						});
					}
				},error => {
					this.isSuccess= false;
					this.successrMsj = '';
					this.successCode = '';
					$(document).ready(function(){
						$("#btnAuthorized").prop('disabled', true); 
					});
					this.isError= true;
					this.errorCode = 'NOT-SRV';
					this.errorMsj = 'Servicio no disponible';
				}
			);
		}
	}
	/* */

	clearInputs(){
		this.ngTypeOperation = '';
		this.ngPlace = '';
		this.ngFolio = '';
		this.ngDateRegistry = '';
		this.ngCodeBank = '';
		this.ngBankName = '';
		this.ngAccount = '';
		this.ngKeyEntity = '';
		this.ngBankNameRecep = '';
		this.ngDateRep = '';
		this.ngIMSS = '';
		this.ngViv = '';
		this.ngAcv = '';
		this.ngTxt = '';
		this.ngTotal = '';
	}


  	paymentTransaction(){
  		this.isInfo = true;
  		this.infoCode  = 'INFO';
  		this.infoMsj  = 'Se esta realizando la petición';
  		$(document).ready(function(){
			$("#btnAuthorized").prop('disabled', true); 
		});
  		this.processFile.sendTransactionWS().subscribe(
			result => {           
        		if(result.resultCode == msjscode.resultCodeOk){
			        this.isSuccess= true;
			        this.successrMsj = 'Transacción T+1 realizada con exito';
					this.successCode = 'SUCCESS';
					this.isInfo = false;
  					this.infoCode  = '';
  					this.infoMsj  = '';
					this.clearInputs();
	        	} else {
	        		this.isError= true;
	        		this.errorMsj = result.resultDescription;
    				this.errorCode = result.resultCode; 
    				this.isInfo = false;
    				$(document).ready(function(){
						$("#btnAuthorized").prop('disabled', false); 
					});
  					this.infoCode  = '';
  					this.infoMsj  = '';
				}
		    },error => {
		    	this.isSuccess= false;
        		this.successrMsj = '';
				this.successCode = '';
				this.isInfo = false;
  				this.infoCode  = '';
  				this.infoMsj  = '';
			    this.isError= true;
			    $(document).ready(function(){
					$("#btnAuthorized").prop('disabled', false); 
				});
			    this.errorCode = 'NOT-SRV';
				this.errorMsj = 'Servicio no disponible';
		    }
		);
  	}

}
