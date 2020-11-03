import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import { msjscode } from '../../../environments/msjsAndCodes';
import * as $ from 'jquery';

import { LiquidationPreAviso } from '../models/models-preaviso/liquidationPreAviso';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedComponent } from 'src/app/shared/shared/shared.component';
import { Programmed } from '../models/models-backOffice/Programmed';

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
	public ngRcv : any;
	public errorMsj : string;
	public errorCode : string;
	public successrMsj : string;
	public successCode : string;
	public isError : boolean;
	public isSuccess : boolean;
	public parameters : any;

	/*agregado */
	public message: string = '';
	public liquidation_flag: boolean = false;
	public message_liquidation: string = '';
	public balaceApproved: boolean = false;
	public message_liquidation_err: string = '';
	public liquidationErr: boolean = false;
	public verifyBtn: boolean = true;

	public messageErrService: string = '';
	public errService: boolean = false;

	shared = new SharedComponent();
	programmed = new Programmed();

	constructor(public processFile : ProcessFileService, public authServ : AuthenticationService,
		private router : Router, private spinner: NgxSpinnerService) { }

	ngOnInit() {
	this.isSuccess = false;
	this.spinner.show();
  	if(localStorage.getItem('username') == '' || localStorage.getItem('username') == null){
		this.spinner.hide();
		this.router.navigate(['/']);
		}else{
			this.authServ.getUserByUserName(localStorage.getItem('username')).subscribe(
				result => {
					if(result.resultCode == 0){
						if(result.logged == 0){
							this.spinner.hide();
							this.router.navigate(['/']);
						}else{
							
							this.processFile.getPreNotice().subscribe(
								data => {
									this.errServices(false, '');
									this.balaceApproved = false;
									this.liquidationErr = false;
									let headers;
									const keys = data.headers.keys();
										headers = keys.map(key =>
											`${key}: ${data.headers.get(key)}`
									);
									if (data.status == 200){
										this.loadDataPreNotice (data.body);
									}

									// this.verifyTransactionToday();

									this.spinner.hide();

								}, error => {
									this.balaceApproved = false;
									this.liquidationErr = true;
									if (error.status == 424)
										this.message = 'Fallo en servicios del proveedor.';
									else if (error.status == 428)
										this.message = 'La conciliación de cifras PROCESAR no ha sido autorizada.';
									else if (error.status == 500)
										this.message = 'Fallo insesperado en BD';
									else 
										this.errServices(true, 'Fallo en servicio getPreNotice.');
									this.message_liquidation_err = this.message;
									this.spinner.hide();
								}
							);

						}
					}
				}
			);
		}
	}

	errServices(valueBolean: boolean, message: string) {

		this.errService = valueBolean;
		this.messageErrService = message;
		
	}

	loadDataPreNotice (result: LiquidationPreAviso){

		this.isError= false;

		this.ngDateRep = result.receiving_date;
		this.ngRcv = this.shared.formatTable(result.rcv.toString()); //ACV
		this.ngDateRegistry = result.registry_date;

		this.ngTxt =  result.description;
		this.ngTypeOperation = result.operation_type;
		this.ngPlace = result.office;
		this.ngFolio = result.sheet_number;
		this.ngCodeBank = result.issuing_bank_key;
		this.ngBankName = result.issuing_bank_name;
		this.ngAccount = result.account_number;
		this.ngKeyEntity = result.receiving_bank_key;
		this.ngBankNameRecep =  result.receiving_bank_name;
		
		if (result.transaction_flag == 'S'){
			this.message_liquidation = 'La transacción ya fue realizada.';
			this.liquidation_flag = true;
			$(document).ready(function(){
				$("#btnAuthorized").prop('disabled', true); 
			});
		}else {
			this.message_liquidation = 'La transacción aún no ha sido autorizada.';
			this.liquidation_flag = false;
			$(document).ready(function(){
				$("#btnAuthorized").prop('disabled', false); 
			});
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
		// this.updateProgrammed();

        this.isSuccess= true;
        this.successrMsj = 'Transacción T+2 programada con exito';
		this.successCode = 'SUCCESS';
		this.clearInputs();   
	}

	paymentTransaction2(){
		this.updateProgrammed();
	}

	updateProgrammed() {

		this.programmed.date = "2020-09-29";
		this.processFile.updateProgrammed('CRON', this.programmed).subscribe(
			data=>{
				let headers;
				const keys = data.headers.keys();
				headers = keys.map(key =>
					`${key}: ${data.headers.get(key)}`
				);
				if (data.status !== 200) {
					this.errorCode = 'Atención - ';
					this.errorMsj = 'No se pudo actualizar el programmed del día actual. (DEFAULT).';
					// alert("No se pudo actualizar el programmed del día actual. (CRON)");
				}else{
					console.log("Se actualizó el Programmed del día actual.");
				}
			},error=>{
				this.errorCode = 'Error inesperado - ';
				this.errorMsj = 'Ups.. Contacte a soporte por favor (updateProgrammed).';
				// alert("Ups.. Error inesperado, contacte a soporte por favor (updateProgrammed).");
			}
		);
	
	}
	
	updateHour(){
		this.processFile.updateHourTransaction(this.timeTransactionProgrammed.hour.toString()).subscribe(
			data=>{
				let headers;
				const keys = data.headers.keys();
				headers = keys.map(key =>
					`${key}: ${data.headers.get(key)}`
				);
				if (data.status !== 200) {
					alert("No se pudo actualizar la hora programada.");
				}else{
					this.successrMsj = 'Transacción T+2 programada con exito (con cambio en hora).';
				}
			},error=>{
				alert("Ups.. Error inesperado, contacte a soporte por favor (updateHour).");
			}
		);
	}

	verifyTransactionToday(){

		this.processFile.verifyTransactionToday().subscribe(
			data=>{
				let headers;
				const keys = data.headers.keys();
				headers = keys.map(key =>
					`${key}: ${data.headers.get(key)}`
				);
				if(data.status == 204){
					console.log('Se puede visualizar el botón');
					this.verifyBtn = false;
				}else if(data.status == 200){
					this.verifyBtn = true;
					console.log('No visualizar el botón porque ya se cambió a 100.');
				}
			},error=>{
				alert("Ups.. Error inesperado, contacte a soporte por favor (verifyTransactionToday).");
			}
		);
	}
	  
	timeTransactionProgrammed = {hour: 9, minute: 0};
	meridian = true;
	flagHab: boolean = false;
	txtForProgrammed: string = 'Habilitar edición de hora';
	minuteStep = 60;
	changeAvalible() {
		this.flagHab = (this.flagHab ? false : true);
		this.txtForProgrammed = ( !this.flagHab ? 'Habilitar edición de hora' : 'Deshabilitar edición de hora');
		console.log(this.timeTransactionProgrammed.hour.toString());
		
	}
}