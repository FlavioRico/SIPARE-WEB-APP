import { Component, ElementRef, OnInit, Renderer2, ViewChild, NgZone } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { msjscode } from '../../../environments/msjsAndCodes';
import { TypeTransaction } from '../models/models-parameters/typeTransaction';
import { Parameter } from '../models/models-parameters/parameter';

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
	parameter: Parameter = new Parameter();
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
	/* */

	 /*Agregado*/
	 public messageErrService: string = '';
	 public errService: boolean = false;

	constructor(public processFile : ProcessFileService,
				public authServ : AuthenticationService,
				private render: Renderer2) { }

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
		this.btnActualizarVisible = false;
		this.btnEditVisible = false;

		this.typeOperationForService.typeTransaction = this.operation1;
		
		this.seleccion(this.typeOperationForService.typeTransaction);
	}

	/*this-> agregado */
	errServices(valueBolean: boolean, message: string) {
		this.errService = valueBolean;
        this.messageErrService = message;
	}

	seleccion(operationType: string){
		this.typeOperationForService.typeTransaction = operationType;
		this.globalOperation = operationType;
		this.ngTypeOperation = operationType;

		this.processFile.getParameter(operationType).subscribe(
			data =>{
				this.errServices(false, '');
				let headers;
				const keys = data.headers.keys();
				headers = keys.map(key =>
					`${key}: ${data.headers.get(key)}`);
				this.loadNewData(data);
			},error =>{
				this.errServices(true, `Fallo en servicio getParameter(${operationType})`);
			}
		);
	}

	renderForm (value: boolean){
		this.render.setProperty(this.oficina.nativeElement, 'disabled', value);
		this.render.setProperty(this.folio.nativeElement, 'disabled', value);
		this.render.setProperty(this.clave.nativeElement, 'disabled', value);
		this.render.setProperty(this.cuenta.nativeElement, 'disabled', value);
		this.render.setProperty(this.claveReceptora.nativeElement, 'disabled', value);
		this.render.setProperty(this.texto.nativeElement, 'disabled', value);
	}
	
	editTrue(){
		this.flagObservaciones = false;    //botón de AGREGAR FALSE
		this.btnEditVisible = false;	   //botón de EDITAR FALSE
		this.btnActualizarVisible = true;  //botón de ACTUALIZAR mostrandose para hacer PUT
	}

	loadNewData(data: any) {
		if (data.status === 204){
			this.renderButtons(true, false, false);
			this.clear(); 					   //limpiamos por si había algo
			this.renderForm(false);            //dejamos editables los campos
		}else if (data.status === 200){
			this.renderButtons(false, true, false);
			this.renderForm(true);
			
			this.ngPlace = data.body.office;
			this.ngFolio = data.body.sheet_number;
			this.ngCodeBank = data.body.issuing_bank_key;
			this.ngBankName = data.body.issuing_bank_name;
			this.ngAccount = data.body.account_number;
			this.ngKeyEntity = data.body.receiving_bank_key;
			this.ngBankNameRecep = data.body.receiving_bank_name;
			this.ngTxt = data.body.description;
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

	validatedInputNumbersAndStrings(evt){
		let keynum;
		if(window.Event) keynum = evt.keyCode;
		else keynum = evt.which;
		let conditionNumbers = (keynum > 47 && keynum <58);
		let conditionStringsUpper = (keynum > 64 && keynum < 91);
		let conditionStringsLower = (keynum > 96 && keynum < 123);
		if(conditionNumbers || conditionStringsUpper || conditionStringsLower || keynum == 8 || keynum == 13) return true;
		else {
			alert('Sólo se admiten números y letras.');
			return false;
		}
	}

	refresh(){
		this.seleccion(this.typeOperationForService.typeTransaction);
		
		if (this.globalOperation == 'T+1' || this.globalOperation == '1' || this.globalOperation == '116027') this.globalOperation = '116027';
		else this.globalOperation = '116018';
		this.isSuccess = false;
	}

	renderButtons (flagButtonAdd: boolean, flagButtonEdit: boolean, flagButtonActualizar: boolean) {
		this.flagObservaciones = flagButtonAdd; //botón de AGREGAR FALSE
		this.btnEditVisible = flagButtonEdit;		//botón de EDITAR FALSE
		this.btnActualizarVisible = flagButtonActualizar; //botón de ACTUALIZAR mostrandose para hacer PUT
	}

	updateParameter () {

		this.valdiateInputPlace();
		this.valdiateInputFolio();
		this.valdiateInputCodeBank();
		this.valdiateInputAccount();
		this.valdiateInputKeyEntity();

		if(!this.errorPlace && !this.errorFolio && !this.errorCodeBank && !this.errorKeyEntity && !this.errorAccount){
			let headers: any;
			let nameUser = localStorage.getItem('username');
			this.parameter.operation_type = this.ngTypeOperation;
			this.parameter.office = this.ngPlace;
			this.parameter.sheet_number = this.ngFolio;
			this.parameter.issuing_bank_key = this.ngCodeBank;
			this.parameter.account_number = this.ngAccount;
			this.parameter.receiving_bank_key = this.ngKeyEntity;
			this.parameter.description = this.ngTxt;
			this.parameter.created_by = nameUser;
			this.processFile.actualizarParametro(this.parameter).subscribe(
				resp => {
					this.errServices(false, ``);
					const keys = resp.headers.keys();
					headers = keys.map(key =>
						`${key}: ${resp.headers.get(key)}`);
					if (resp.status === 201) {
						this.isSuccess = true;
						this.isError = false;
						this.errorCode = 'SUCCESS';
						this.errorMsj = 'Datos actualizados con éxito.';
						this.clear();
						this.renderButtons(false, true, false);
						this.refresh();
					}else {
						// this.clear();
						this.isSuccess = false;
						this.isError = true;
						this.errorCode = 'ERROR';
						this.errorMsj = 'No se pudieron actualizar los datos';
						this.renderButtons(true, false, false);
					}
				}, error => {
					this.errServices(true, `Fallo en servicio actualizarParametro.`);
					this.isError = true;
					this.errorCode = error.resultCode;
					this.errorMsj = error.resultDescription.includes('Could not commit Hibernate transaction') ? 'No se pudo confirmar la transacción de Hibernate, el servicio no esta dispoible' : error.resultDescription;
					this.renderButtons(true, false, false);
				}
			)
		} else {
			this.isError = true;
			this.errorCode = 'Error ';
			this.errorMsj = 'Existen campos vacíos, por favor incluya toda la información solicitada';
		}
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
		
		this.valdiateInputPlace();
		this.valdiateInputFolio();
		this.valdiateInputCodeBank();
		this.valdiateInputAccount();
		this.valdiateInputKeyEntity();

		if(!this.errorPlace && !this.errorFolio && !this.errorCodeBank && !this.errorKeyEntity && !this.errorAccount){
			
			let headers: any;
			let nameUser = localStorage.getItem('username');
			this.parameter.operation_type = this.ngTypeOperation;
			this.parameter.office = this.ngPlace;
			this.parameter.sheet_number = this.ngFolio;
			this.parameter.issuing_bank_key = this.ngCodeBank;
			this.parameter.account_number = this.ngAccount;
			this.parameter.receiving_bank_key = this.ngKeyEntity;
			this.parameter.description = this.ngTxt;
			this.parameter.created_by = nameUser;

			this.processFile.createParameter(this.parameter).subscribe(
				resp => {
					this.errServices(false, '');
					const keys = resp.headers.keys();
					headers = keys.map(key =>
						`${key}: ${resp.headers.get(key)}`);
					if (resp.status === 201) {
						this.isSuccess = true;
						this.isError = false;
						this.successCode = 'SUCCESS';
						this.successrMsj = 'Datos agregados con exito';
						this.clear();
						this.renderButtons(false, true, false);
						// this.refresh();
					}else {
						this.clear();
						this.isError = true;
						this.errorCode = '';
						this.errorMsj = 'Error interno en servicio del componente parameters';
						this.renderButtons(true, false, false);
					}
				}, error => {
					this.errServices(true, 'Fallo en servicio createParameter.');
					this.isError = true;
					this.errorCode = error.resultCode;
					this.errorMsj = error.resultDescription.includes('Could not commit Hibernate transaction') ? 'No se pudo confirmar la transacción de Hibernate, el servicio no esta dispoible' : error.resultDescription;
					this.renderButtons(true, false, false);
				}
			);

		} else {
			this.isError = true;
			this.errorCode = 'Error ';
			this.errorMsj = 'Existen campos vacios, por favor incluya toda la información solicitada.';
		}
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
				this.errServices(false, '');       
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
				this.errServices(true, 'Fallo en servicio searchBankReceptorByCode.');       
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
				this.errServices(false, '');               
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
				this.errServices(true, 'Fallo en servicio searchBankReceptorByCode.');       
			    this.isError = true;
			    this.ngBankNameRecep = '';
		       	this.errorCode = error.resultCode;
		        this.errorMsj = error.resultDescription;
		    }
		);
		}
	}

	valdiateInputPlace(){
		if(undefined === this.ngPlace || this.ngPlace === ''){
			this.errorPlace = true;
			this.errorPlaceMsj = 'es obligatorio';
		}else if(undefined !== this.ngPlace || this.ngPlace !== ''){
			this.errorPlace = false;
			this.errorPlaceMsj = '';
		}
	}

	valdiateInputFolio(){
		if(undefined === this.ngFolio || this.ngFolio === ''){
			this.errorFolio = true;
			this.errorFolioMsj = 'es obligatorio';
		}else if(undefined !== this.ngFolio || this.ngFolio !== ''){
			this.errorFolio = false;
			this.errorFolioMsj = '';
		}
	}

	valdiateInputCodeBank(){
		if(undefined === this.ngCodeBank || this.ngCodeBank === ''){
			this.errorCodeBank = true;
			this.errorCodeBankMsj = 'es obligatorio';
		}else if(undefined !== this.ngCodeBank || this.ngCodeBank !== ''){
			this.errorCodeBank = false;
			this.errorCodeBankMsj = '';
		}
	}

	valdiateInputAccount(){
		if(undefined === this.ngAccount || this.ngAccount === ''){
			this.errorAccount = true;
			this.errorAccountMsj = 'es obligatorio';
		}else if(undefined !== this.ngAccount || this.ngAccount !== ''){
			this.errorAccount = false;
			this.errorAccountMsj = '';
		}
	}

	valdiateInputKeyEntity(){
		if(undefined === this.ngKeyEntity || this.ngKeyEntity === ''){
			this.errorKeyEntity = true;
			this.errorKeyEntityMsj = 'es obligatorio';
		}else if(this.ngKeyEntity === '072'){
			this.errorKeyEntity = false;
			this.errorKeyEntityMsj = '';
			this.ngBankNameRecep = 'BANORTE / IXE';
		}else if(undefined !== this.ngKeyEntity || this.ngKeyEntity !== ''){
			this.errorKeyEntity = false;
			this.errorKeyEntityMsj = '';
		}
	}
}