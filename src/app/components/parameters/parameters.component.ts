import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import { msjscode } from '../../../environments/msjsAndCodes';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

	public ngTypeOperation : string;
	public ngPlace : string;
	public ngFolio : string;
	public ngDateRegistry : string;
	public ngCodeBank : string;
	public ngBankName : string;
	public ngAccount : string;
	public ngKeyEntity : string;
	public ngBankNameRecep : string;
	public ngTxt : string;
	public errorMsj : string;
	public errorCode : string;
	public successrMsj : string;
	public successCode : string;
	public errorType : boolean;
	public isError : boolean;
	public isSuccess : boolean;
	public errorTypeMsj : string;
	public errorPlace : boolean;
	public errorPlaceMsj : string;
	public errorFolio : boolean;
	public errorFolioMsj : string;
	public errorCodeBank : boolean;
	public errorCodeBankMsj : string;
	public errorAccount : boolean;
	public errorAccountMsj : string;
	public errorKeyEntity : boolean;
	public errorKeyEntityMsj : string;

	constructor(public processFile : ProcessFileService, public authServ : AuthenticationService, private router : Router) { }

	ngOnInit() {
		this.errorType = false;
		this.errorPlace = false;
		this.errorFolio = false;
		this.errorAccount = false;
		this.errorCodeBank = false;
		this.errorKeyEntity = false;
		this.isError = false;
		this.isSuccess = false;
	}

	clear(){
		this.ngTypeOperation = '';
		this.ngPlace = '';
		this.ngFolio = '';
		this.ngCodeBank = '';
		this.ngBankName = '';
		this.ngAccount = '';
		this.ngKeyEntity = '';
		this.ngBankNameRecep = '';
		this.ngTxt = '';
		this.errorType = false;
		this.errorPlace = false;
		this.errorFolio = false;
		this.errorAccount = false;
		this.errorCodeBank = false;
		this.errorKeyEntity = false;
		this.errorKeyEntityMsj = '';
		this.errorFolioMsj = '';
		this.errorAccountMsj = '';
		this.errorCodeBankMsj = '';
		this.errorTypeMsj = '';
		this.errorPlaceMsj = '';
		this.isError = false;
		this.errorCode = '';
		this.errorMsj = '';
		$(document).ready(function(){
			$("#category").val('Seleccione');
		});
	}

	createParameter(){
		this.valdiateInputTypeOperation();
		this.valdiateInputPlace();
		this.valdiateInputFolio();
		this.valdiateInputCodeBank();
		this.valdiateInputAccount();
		this.valdiateInputKeyEntity();
		if(!this.errorPlace && !this.errorType && !this.errorFolio && !this.errorCodeBank && !this.errorKeyEntity && !this.errorAccount){
			this.processFile.addParameter(this.ngTypeOperation,this.ngPlace,this.ngFolio,this.ngCodeBank,
				this.ngAccount,this.ngKeyEntity,this.ngTxt).subscribe(
				result => {           
	        		if(result.resultCode == msjscode.resultCodeOk){
			        	this.isSuccess = true;
			        	this.isError = false;
			        	this.successCode = 'SUCCESS';
			        	this.successrMsj = 'Datos agregados con exito'
			        	this.clear();
			        }else if(result.resultCode == '1'){
			        	if(result.resultDescription.includes('Could not commit Hibernate transaction')){
			        		this.clear();
			        		this.isError = true;
			       			this.errorCode = result.resultCode;
			        		this.errorMsj = 'No se pudo confirmar la transacción de Hibernate, el servicio no esta dispoible';
			        	} else {
			        		this.clear();
				        	this.isError = true;
				       		this.errorCode = result.resultCode;
				        	this.errorMsj = result.resultDescription;
			        	}
			        }
			    },error => {
				    this.isError = true;
			       	this.errorCode = error.resultCode;
			        this.errorMsj = error.resultDescription.includes('Could not commit Hibernate transaction') ? 'No se pudo confirmar la transacción de Hibernate, el servicio no esta dispoible' : error.resultDescription;
			    }
			);
		}
	}

	valdiateInputPlace(){
		if(undefined === this.ngPlace || this.ngPlace === ''){
			this.errorPlace = true;
			this.errorPlaceMsj = 'es obligatorio';
		}else if(this.ngPlace.includes('$') || this.ngPlace.includes('"') || this.ngPlace.includes('_') || this.ngPlace.includes('-') || this.ngPlace.includes('¿') || 
			this.ngPlace.includes('?') || this.ngPlace.includes('=') || this.ngPlace.includes(')') || this.ngPlace.includes('(') || this.ngPlace.includes('/') || 
			this.ngPlace.includes('&') || this.ngPlace.includes('%') || this.ngPlace.includes('.') || this.ngPlace.includes(',') || this.ngPlace.includes(':') || 
			this.ngPlace.includes(';') || this.ngPlace.includes('Ç') || this.ngPlace.includes('*') || this.ngPlace.includes('[') || this.ngPlace.includes(']') || 
			this.ngPlace.includes('}') || this.ngPlace.includes('{')){
			this.errorPlace = true;
			this.errorPlaceMsj = 'no se permiten caracteres especiales';
		}else if(this.ngPlace.length > 3){
			this.errorPlace = true;
			this.errorPlaceMsj = 'solo permite 3 caracteres';
		}else if(undefined !== this.ngPlace || this.ngPlace !== ''){
			this.errorPlace = false;
			this.errorPlaceMsj = '';
		}
	}

	valdiateInputAccount(){
		if(undefined === this.ngAccount || this.ngAccount === ''){
			this.errorAccount = true;
			this.errorAccountMsj = 'es obligatorio';
		}else if(!this.ngAccount.match(/^[0-9]+$/)){
			this.errorAccount = true;
			this.errorAccountMsj = 'solo permite valores númericos';
		}else if(this.ngAccount.length > 11){
			this.errorAccount = true;
			this.errorAccountMsj = 'solo permite 11 caracteres';
		}else if(undefined !== this.ngAccount || this.ngAccount !== ''){
			this.errorAccount = false;
			this.errorAccountMsj = '';
		}
	}

	valdiateInputKeyEntity(){
		if(undefined === this.ngKeyEntity || this.ngKeyEntity === ''){
			this.errorKeyEntity = true;
			this.errorKeyEntityMsj = 'es obligatorio';
		}else if(!this.ngKeyEntity.match(/^[0-9]+$/)){
			this.errorKeyEntity = true;
			this.errorKeyEntityMsj = 'solo permite valores númericos';
		}else if(this.ngKeyEntity.length > 5){
			this.errorKeyEntity = true;
			this.errorKeyEntityMsj = 'solo permite 5 caracteres';
		}else if(this.ngKeyEntity === '072'){
			this.errorKeyEntity = false;
			this.errorKeyEntityMsj = '';
			this.ngBankNameRecep = 'BANORTE / IXE';
		}else if(undefined !== this.ngKeyEntity || this.ngKeyEntity !== ''){
			this.errorKeyEntity = false;
			this.errorKeyEntityMsj = '';
		}
	}

	valdiateInputCodeBank(){
		if(undefined === this.ngCodeBank || this.ngCodeBank === ''){
			this.errorCodeBank = true;
			this.errorCodeBankMsj = 'es obligatorio';
		}else if(!this.ngCodeBank.match(/^[0-9]+$/)){
			this.errorCodeBank = true;
			this.errorCodeBankMsj = 'solo permite valores númericos';
		}else if(this.ngCodeBank.length > 5){
			this.errorCodeBank = true;
			this.errorCodeBankMsj = 'solo permite 5 caracteres';
		}else if(this.ngCodeBank === '40132'){
			this.errorCodeBank = false;
			this.errorCodeBankMsj = '';
			this.ngBankName = 'BANCO MULTIVA S.A. INSTITUCIÓN DE BANCA MÚLTIPLE GRUPO FINANCIERO';
		}else if(undefined !== this.ngCodeBank || this.ngCodeBank !== ''){
			this.errorCodeBank = false;
			this.errorCodeBankMsj = '';
		}
	}

	valdiateInputFolio(){
		if(undefined === this.ngFolio || this.ngFolio === ''){
			this.errorFolio = true;
			this.errorFolioMsj = 'es obligatorio';
		}else if(!this.ngFolio.match(/^[0-9]+$/)){
			this.errorFolio = true;
			this.errorFolioMsj = 'solo permite valores númericos';
		}else if(this.ngFolio.length > 8){
			this.errorFolio = true;
			this.errorFolioMsj = 'solo permite 8 caracteres';
		}else if(undefined !== this.ngFolio || this.ngFolio !== ''){
			this.errorFolio = false;
			this.errorFolioMsj = '';
		}
	}

	valdiateInputTypeOperation(){
		if(undefined === this.ngTypeOperation || this.ngTypeOperation === ''){
			this.errorType = true;
			this.errorTypeMsj = 'es obligatorio';
		}
	}

	selectChangeHandler(event: any){
		this.isSuccess = false;
		this.ngTypeOperation = event.target.value;
	}

	searchBankOrder(){
		this.isError = false;
		this.errorCode = '';
		this.errorMsj = '';
		if (this.ngCodeBank === '' || this.ngCodeBank == null){
			this.isError = true;
       		this.errorCode = 'CODE-BANK-EMPTY';
        	this.errorMsj = 'No hay código para realizar la búsqueda del banco ordenante';
		} else {
			this.processFile.searchBankReceptorByCode(this.ngCodeBank).subscribe(
			result => {           
        		if(result.resultCode == msjscode.resultCodeOk){
		        	this.ngBankName = result.bank;
		        }else if(result.resultCode != msjscode.resultCodeOk){
		        	this.isError = true;
		        	this.ngBankName = '';
		       		this.errorCode = result.resultCode;
		        	this.errorMsj = result.resultDescription;
		        }
		    },error => {
			    this.isError = true;
			    this.ngBankName = '';
		       	this.errorCode = error.resultCode;
		        this.errorMsj = error.resultDescription;
		    }
		);
		}
	}

	searchBankReceptor(){
		this.isError = false;
		this.errorCode = '';
		this.errorMsj = '';
		if (this.ngKeyEntity === '' || this.ngKeyEntity == null){
			this.isError = true;
       		this.errorCode = 'CODE-BANK-EMPTY';
        	this.errorMsj = 'No hay código para realizar la búsqueda del banco receptor';
		} else {
			this.processFile.searchBankReceptorByCode(this.ngKeyEntity).subscribe(
			result => {           
        		if(result.resultCode == msjscode.resultCodeOk){
		        	this.ngBankNameRecep = result.bank;
		        }else if(result.resultCode != msjscode.resultCodeOk){
		        	this.isError = true;
		        	this.ngBankNameRecep = '';
		       		this.errorCode = result.resultCode;
		        	this.errorMsj = result.resultDescription;
		        }
		    },error => {
			    this.isError = true;
			    this.ngBankNameRecep = '';
		       	this.errorCode = error.resultCode;
		        this.errorMsj = error.resultDescription;
		    }
		);
		}
	}

}
