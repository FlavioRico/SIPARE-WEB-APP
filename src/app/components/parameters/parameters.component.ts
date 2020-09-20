import { Component, ElementRef, OnInit, Renderer2, ViewChild, NgZone } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import { msjscode } from '../../../environments/msjsAndCodes';
import * as $ from 'jquery';
import { TypeTransaction } from '../models/models-parameters/typeTransaction';
import { DataTypeOperation } from '../models/models-parameters/dataTypeOperation';

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

	/*this ->agregado */
	public operation1: string;
	public operation2: string;
	public globalOperation: string;
	typeOperationForService: TypeTransaction = new TypeTransaction();
	public flagObservaciones: boolean;
	public btnActualizarVisible: boolean;
	public btnEditVisible: boolean;
	public searchSucces : boolean;
	/*Elementos del DOM a renderizar con Renderer2*/
	@ViewChild('oficina') oficina: ElementRef;
	@ViewChild('folio') folio: ElementRef;
	@ViewChild('clave') clave: ElementRef;
	@ViewChild('cuenta') cuenta: ElementRef;
	@ViewChild('claveReceptora') claveReceptora: ElementRef;
	@ViewChild('texto') texto: ElementRef;
	// @ViewChild('buttEdit') buttEdit: ElementRef;
	// @ViewChild('buttActualizar') buttActualizar: ElementRef;
	/* */

	constructor(public processFile : ProcessFileService,
				public authServ : AuthenticationService,
				private router : Router, 
				private render: Renderer2,
				private zone: NgZone) { } /*public processFile : ProcessFileService, public authServ : AuthenticationService, private router : Router*/

	ngOnInit() {
		this.errorType = false;
		this.errorPlace = false;
		this.errorFolio = false;
		this.errorAccount = false;
		this.errorCodeBank = false;
		this.errorKeyEntity = false;
		this.isError = false;
		this.isSuccess = false;
		/*this -> agregado */
		this.searchSucces = false;
		this.operation1 = '116027'; //t+1
		this.operation2 = '116018'; //t+2
		this.globalOperation = '116027';
		this.ngTypeOperation = '116027';
		console.log('Inicializamos ngTypeOperation con => ', this.ngTypeOperation);
		this.btnActualizarVisible = false;
		this.btnEditVisible = false;

		this.typeOperationForService.typeTransaction = this.operation1;
		// this.processFile.getDataForInitParameters(this.typeOperationForService).subscribe(data => {
		// 	if (data.resultCode !== '0'){
		// 		this.flagObservaciones = true; 	    //botón de AGREGAR mostrandose
		// 		this.btnEditVisible = false; 	   //botón de EDITAR FALSE
		// 		this.btnActualizarVisible = false; //botón de ACTUALIZAR FALSE
		// 	}else{
		// 		this.flagObservaciones = false;     //botón de AGREGAR FALSE
		// 		this.btnEditVisible = true;         //botón de EDITAR mostrandose
		// 		this.btnActualizarVisible = false;  //botón de ACTUALIZAR FALSE
		// 		this.renderForm(true); 			    //campos no editables
		// 		//llenamos los campos porque si hubo respuesta 
		// 		this.ngPlace = data.resp.place;
		// 		this.ngFolio = data.resp.folio;
		// 		this.ngCodeBank = data.resp.bankCode;
		// 		this.ngBankName = data.resp.orderingInstitution;
		// 		this.ngAccount = data.resp.account;
		// 		this.ngKeyEntity = data.resp.receivingEntity;
		// 		this.ngBankNameRecep = data.resp.receivingInstitution;
		// 		this.ngTxt = data.resp.text;
		// 	}
		// });
		this.seleccion(this.typeOperationForService.typeTransaction);
	}

	/*this-> agregado */
	seleccion(operationType: string){
		console.log('En método selección recibimos =>', operationType);
		
		this.typeOperationForService.typeTransaction = operationType;
		this.globalOperation = operationType;
		this.ngTypeOperation = operationType;
		console.log('Dejamos ngTypeOperation con =>', this.ngTypeOperation);

		this.processFile.getDataForInitParameters(this.typeOperationForService).subscribe(data =>{
			console.log(data);
			this.loadNewData(data);
		});
	}

	renderForm (value: boolean){
		console.log('entro', value);
		this.render.setProperty(this.oficina.nativeElement, 'disabled', value);
		this.render.setProperty(this.folio.nativeElement, 'disabled', value);
		this.render.setProperty(this.clave.nativeElement, 'disabled', value);
		this.render.setProperty(this.cuenta.nativeElement, 'disabled', value);
		this.render.setProperty(this.claveReceptora.nativeElement, 'disabled', value);
		this.render.setProperty(this.texto.nativeElement, 'disabled', value);
	}
	
	editTrue(){
		console.log('edición click');
		this.flagObservaciones = false; //botón de AGREGAR FALSE
		this.btnEditVisible = false;		//botón de EDITAR FALSE
		this.btnActualizarVisible = true; //botón de ACTUALIZAR mostrandose para hacer PUT
		// this.render.setStyle(this.buttEdit.nativeElement, 'display', 'none');
		// this.render.removeStyle(this.buttActualizar.nativeElement, 'display');
		// this.render.setStyle(this.buttActualizar.nativeElement, 'display', 'block');
	}

	loadNewData(data: DataTypeOperation) {
		if (data.resultCode !== '0'){
			this.flagObservaciones = true; 	   //botón de AGREGAR mostrandose
			this.btnEditVisible = false;       //botón de EDITAR FALSE
			this.btnActualizarVisible = false; //botón de ACTUALIZAR FALSE
			this.clear(); //limpiamos por si había algo
			this.renderForm(false); //dejamos editables los campos
			console.log(data);
			// this.render.removeStyle(this.buttActualizar.nativeElement, 'display');
			// this.render.setStyle(this.buttActualizar.nativeElement, 'display', 'none');
			// this.render.setStyle(this.buttEdit.nativeElement, 'display', 'block');
		}else{
			this.flagObservaciones = false;     //botón de AGREGAR FALSE
			this.btnEditVisible = true;		//botón de EDITAR mostrandose
			this.btnActualizarVisible = false; //botón de ACTUALIZAR FALSE
			this.renderForm(true);
			// this.render.removeStyle(this.buttActualizar.nativeElement, 'display');
			// this.render.setStyle(this.buttActualizar.nativeElement, 'display', 'none');
			// this.render.setStyle(this.buttEdit.nativeElement, 'display', 'block');
			this.ngPlace = data.resp.place;
			this.ngFolio = data.resp.folio;
			this.ngCodeBank = data.resp.bankCode;
			this.ngBankName = data.resp.orderingInstitution;
			this.ngAccount = data.resp.account;
			this.ngKeyEntity = data.resp.receivingEntity;
			this.ngBankNameRecep = data.resp.receivingInstitution;
			this.ngTxt = data.resp.text;
		}
	}

	validatedInputOnlyNumbers(evt){
		let keynum;
		if(window.Event) keynum = evt.keyCode;
		else keynum = evt.which;
		if((keynum > 47 && keynum <58) || keynum == 8 || keynum == 13) return true;
		else {
			alert('Sólo se admiten números');
			return false;
		}
	}

	refresh(){
		console.log('se hará refresh con este => ', this.typeOperationForService.typeTransaction);
		this.seleccion(this.typeOperationForService.typeTransaction);
		if (this.globalOperation == 'T+1' || this.globalOperation == '1') this.globalOperation = '116027';
		else this.globalOperation = '116018';
	}

	renderButtons (flagButtonAdd: boolean, flagButtonEdit: boolean, flagButtonActualizar: boolean) {
		this.flagObservaciones = flagButtonAdd; //botón de AGREGAR FALSE
		this.btnEditVisible = flagButtonEdit;		//botón de EDITAR FALSE
		this.btnActualizarVisible = flagButtonActualizar; //botón de ACTUALIZAR mostrandose para hacer PUT
	}
	/* */

	clear(){
		// this.ngTypeOperation = '';
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
		// $(document).ready(function(){
		// 	$("#category").val('Seleccione');
		// });
	}

	createParameter(){
		// this.valdiateInputTypeOperation();

		console.log('Traemos en ngTypeOperation esto = ', this.ngTypeOperation);
		this.ngTypeOperation = (this.ngTypeOperation == '116027') ? '1' : '2';
		console.log('Transformamos en esto = ', this.ngTypeOperation);
		
		this.valdiateInputPlace();
		this.valdiateInputFolio();
		this.valdiateInputCodeBank();
		this.valdiateInputAccount();
		this.valdiateInputKeyEntity();

		if(!this.errorPlace && !this.errorFolio && !this.errorCodeBank && !this.errorKeyEntity && !this.errorAccount){
			console.log('Enviaremos al servicio addParameter lo siguiente => ', 
			this.ngTypeOperation, this.ngPlace,this.ngFolio, this.ngCodeBank, this.ngAccount, this.ngKeyEntity, this.ngTxt);
			
			this.processFile.addParameter(this.ngTypeOperation, this.ngPlace,this.ngFolio, this.ngCodeBank,
				this.ngAccount, this.ngKeyEntity, this.ngTxt).subscribe(
				result => {           
	        		if(result.resultCode == msjscode.resultCodeOk){
			        	this.isSuccess = true;
			        	this.isError = false;
			        	this.successCode = 'SUCCESS';
			        	this.successrMsj = 'Datos agregados con exito';
						this.clear();
						this.renderButtons(false, true, false);
						console.log('Dejamos ngTypeOperation así después de agregar => ', this.ngTypeOperation);
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
						this.renderButtons(true, false, false);
			        }
			    }, error => {
				    this.isError = true;
			       	this.errorCode = error.resultCode;
			        this.errorMsj = error.resultDescription.includes('Could not commit Hibernate transaction') ? 'No se pudo confirmar la transacción de Hibernate, el servicio no esta dispoible' : error.resultDescription;
					this.renderButtons(true, false, false);
				}
			);
		} else {
			this.isError = true;
			this.errorCode = 'Error ';
			this.errorMsj = 'Existen campos vacios, por favor incluya toda la información solicitada';
		}
	}

	valdiateInputPlace(){
		if(undefined === this.ngPlace || this.ngPlace === ''){
			this.errorPlace = true;
			this.errorPlaceMsj = 'es obligatorio';
		}
		// }else if(this.ngPlace.includes('$') || this.ngPlace.includes('"') || this.ngPlace.includes('_') || this.ngPlace.includes('-') || this.ngPlace.includes('¿') || 
		// 	this.ngPlace.includes('?') || this.ngPlace.includes('=') || this.ngPlace.includes(')') || this.ngPlace.includes('(') || this.ngPlace.includes('/') || 
		// 	this.ngPlace.includes('&') || this.ngPlace.includes('%') || this.ngPlace.includes('.') || this.ngPlace.includes(',') || this.ngPlace.includes(':') || 
		// 	this.ngPlace.includes(';') || this.ngPlace.includes('Ç') || this.ngPlace.includes('*') || this.ngPlace.includes('[') || this.ngPlace.includes(']') || 
		// 	this.ngPlace.includes('}') || this.ngPlace.includes('{')){
		// 	this.errorPlace = true;
		// 	this.errorPlaceMsj = 'no se permiten caracteres especiales';
		// }else if(this.ngPlace.length > 3){
		// 	this.errorPlace = true;
		// 	this.errorPlaceMsj = 'solo permite 3 caracteres';
		// }else if(undefined !== this.ngPlace || this.ngPlace !== ''){
		// 	this.errorPlace = false;
		// 	this.errorPlaceMsj = '';
		// }
	}

	valdiateInputAccount(){
		if(undefined === this.ngAccount || this.ngAccount === ''){
			this.errorAccount = true;
			this.errorAccountMsj = 'es obligatorio';
		}
		// }else if(!this.ngAccount.match(/^[0-9]+$/)){
		// 	this.errorAccount = true;
		// 	this.errorAccountMsj = 'solo permite valores númericos';
		// }else if(this.ngAccount.length > 11){
		// 	this.errorAccount = true;
		// 	this.errorAccountMsj = 'solo permite 11 caracteres';
		// }else if(undefined !== this.ngAccount || this.ngAccount !== ''){
		// 	this.errorAccount = false;
		// 	this.errorAccountMsj = '';
		// }
	}

	valdiateInputKeyEntity(){
		if(undefined === this.ngKeyEntity || this.ngKeyEntity === ''){
			this.errorKeyEntity = true;
			this.errorKeyEntityMsj = 'es obligatorio';
		}
		// }else if(!this.ngKeyEntity.match(/^[0-9]+$/)){
		// 	this.errorKeyEntity = true;
		// 	this.errorKeyEntityMsj = 'solo permite valores númericos';
		// }else if(this.ngKeyEntity.length > 5){
		// 	this.errorKeyEntity = true;
		// 	this.errorKeyEntityMsj = 'solo permite 5 caracteres';
		// }else if(this.ngKeyEntity === '072'){
		// 	this.errorKeyEntity = false;
		// 	this.errorKeyEntityMsj = '';
		// 	this.ngBankNameRecep = 'BANORTE / IXE';
		// }else if(undefined !== this.ngKeyEntity || this.ngKeyEntity !== ''){
		// 	this.errorKeyEntity = false;
		// 	this.errorKeyEntityMsj = '';
		// }
	}

	valdiateInputCodeBank(){
		if(undefined === this.ngCodeBank || this.ngCodeBank === ''){
			this.errorCodeBank = true;
			this.errorCodeBankMsj = 'es obligatorio';
		}
		// }else if(!this.ngCodeBank.match(/^[0-9]+$/)){
		// 	this.errorCodeBank = true;
		// 	this.errorCodeBankMsj = 'solo permite valores númericos';
		// }else if(this.ngCodeBank.length > 5){
		// 	this.errorCodeBank = true;
		// 	this.errorCodeBankMsj = 'solo permite 5 caracteres';
		// }else if(this.ngCodeBank === '40132'){
		// 	this.errorCodeBank = false;
		// 	this.errorCodeBankMsj = '';
		// 	this.ngBankName = 'BANCO MULTIVA S.A. INSTITUCIÓN DE BANCA MÚLTIPLE GRUPO FINANCIERO';
		// }else if(undefined !== this.ngCodeBank || this.ngCodeBank !== ''){
		// 	this.errorCodeBank = false;
		// 	this.errorCodeBankMsj = '';
		// }
	}

	valdiateInputFolio(){
		if(undefined === this.ngFolio || this.ngFolio === ''){
			this.errorFolio = true;
			this.errorFolioMsj = 'es obligatorio';
		}
		// }else if(!this.ngFolio.match(/^[0-9]+$/)){
		// 	this.errorFolio = true;
		// 	this.errorFolioMsj = 'solo permite valores númericos';
		// }else if(this.ngFolio.length > 8){
		// 	this.errorFolio = true;
		// 	this.errorFolioMsj = 'solo permite 8 caracteres';
		// }else if(undefined !== this.ngFolio || this.ngFolio !== ''){
		// 	this.errorFolio = false;
		// 	this.errorFolioMsj = '';
		// }
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
					this.searchSucces = true;
					this.successCode = 'Código valido ';
					this.successrMsj = 'institución encontrada';
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
					this.searchSucces = true;
					this.successCode = 'Código valido ';
					this.successrMsj = 'institución encontrada';
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
