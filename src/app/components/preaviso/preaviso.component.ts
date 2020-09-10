import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import { msjscode } from '../../../environments/msjsAndCodes';
import * as $ from 'jquery';

@Component({
  selector: 'app-preaviso',
  templateUrl: './preaviso.component.html',
  styleUrls: ['./preaviso.component.scss']
})
export class PreavisoComponent implements OnInit {

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
	public ngRcv : string;
	public errorMsj : string;
	public errorCode : string;
	public successrMsj : string;
	public successCode : string;
	public isError : boolean;
	public isSuccess : boolean;
	public parameters : any;

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
							this.isError = false;
							this.isSuccess= false;
							this.processFile.getDataTransactionT2().subscribe(
								result => {           
					        		if(result.resultCode == msjscode.resultCodeOk){
										this.isError= false;
										this.parameters = result;
										this.ngTypeOperation = result.resp.typeOperation;
										this.ngPlace = result.resp.place;
										this.ngFolio = result.resp.folio;
										this.ngDateRegistry = result.resp.dateRegistrty;
										this.ngCodeBank = result.resp.bankCode;
										this.ngBankName = result.resp.orderingInstitution;
										this.ngAccount = result.resp.account;
										this.ngKeyEntity = result.resp.receivingEntity;
										this.ngBankNameRecep = result.resp.receivingInstitution;
										this.ngDateRep = result.resp.receivingDate;
										this.ngRcv = result.resp.rcv;
										this.ngTxt = result.resp.text;
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
								    this.isError= true;
								    this.errorCode = 'NOT-SRV';
									this.errorMsj = 'Servicio no disponible';
									$(document).ready(function(){
					        			$("#btnAuthorized").prop('disabled', true); 
									});
							    }
							);
						}
					}
				}
			);
		}
	}

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
		this.ngRcv = '';
		this.ngTxt = '';
	}

	paymentTransaction(){
        this.isSuccess= true;
        this.successrMsj = 'Transacción T+2 programada con exito';
		this.successCode = 'SUCCESS';
		this.clearInputs();   
  	}

}
