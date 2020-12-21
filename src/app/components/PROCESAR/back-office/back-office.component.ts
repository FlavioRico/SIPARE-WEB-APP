import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { msjscode } from '../../../../environments/msjsAndCodes';
import { Liquidation } from '../../models/models-backOffice/liquidation';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedComponent } from 'src/app/shared/shared/shared.component';
import { Programmed } from '../../models/models-backOffice/Programmed';

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
	public ngIMSS : any;
	public ngViv : any;
	public ngAcv : any;
	public ngTotal : any;
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
	public message: string = '';
	public liquidation_flag: boolean = false;
	public message_liquidation: string = '';
	public balaceApproved: boolean = false;
	public message_liquidation_err: string = '';
	public liquidationErr: boolean = false;
	public messageErrService: string = '';
	public errService: boolean = false;

	shared = new SharedComponent();
	programmed = new Programmed();

	constructor(public processFile : ProcessFileService, public authServ : AuthenticationService,
	private router : Router, private spinner: NgxSpinnerService) { }

  	ngOnInit() {
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

							this.processFile.getLiquidation().subscribe(
								data => {
									
									this.balaceApproved = false;
									this.liquidationErr = false;
									this.errService = false;
									let headers;
									const keys = data.headers.keys();
										headers = keys.map(key =>
											`${key}: ${data.headers.get(key)}`
									);
									if (data.status == 200){
										this.loadDataLiquidation (data.body);
									}
									this.spinner.hide();

								},error =>{
									this.balaceApproved = false;
									this.liquidationErr = true;
									if (error.status == 424)
										this.message = 'Fallo en servicios del proveedor.';
									else if (error.status == 428)
										this.message = 'La conciliación de cifras PROCESAR no ha sido autorizada.';
									else if (error.status == 500)
										// this.message = 'Fallo insesperado en BD';
										this.message = 'La conciliación de cifras PROCESAR no ha sido autorizada.';
									else 
										this.errService = true;
										this.messageErrService = 'Error en el servicio getLiquidation().';
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
	/*agregado*/

	loadDataLiquidation (result: Liquidation){
		this.isError= false;
		
		if (result.transaction_flag == 'S'){

			this.message_liquidation = 'La transacción ya fue realizada.';
			this.liquidation_flag = true;
			$(document).ready(function(){
				$("#btnAuthorized").prop('disabled', true); 
				$("#btnAuthorized").hide();
			});
			
		}else {

			this.message_liquidation = 'La transacción aún no ha sido autorizada.';
			this.liquidation_flag = false;
			$(document).ready(function(){
				$("#btnAuthorized").prop('disabled', false); 
			});
			this.ngDateRep = result.receiving_date;

			this.ngIMSS = this.shared.formatTable(result.imss.toString());
			this.ngViv = this.shared.formatTable(result.viv.toString());
			this.ngAcv = this.shared.formatTable(result.acv.toString());
			this.ngTotal = this.shared.formatTable(result.total.toString());
			
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

		}		
	}

	serviceProveedor (parameter, activateServiceProveedor) {
		
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
		this.spinner.show();

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

					this.balaceApproved = true;
					this.liquidationErr = false;

			        this.successrMsj = 'Transacción T+1 realizada con exito';
					this.successCode = 'SUCCESS';
					this.isInfo = false;
  					this.infoCode  = '';
					this.infoMsj  = '';
					this.message_liquidation = 'La transacción ya fue realizada.';
					this.liquidation_flag = false;
					this.clearInputs();
					$(document).ready(function(){
						$("#btnAuthorized").prop('disabled', true); 
						$("#btnAuthorized").hide();
					});

					this.updateProgrammed();

					this.spinner.hide();
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
					this.spinner.hide();
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
					$("#btnAuthorized").hide();
				});
			    this.errorCode = 'NOT-SRV';
				this.errorMsj = 'Servicio no disponible';
				this.spinner.hide();
		    }
		);
	}
	  
	updateProgrammed() {

		this.programmed.date = null;
		this.processFile.updateProgrammed('DEFAULT', this.programmed).subscribe(
			data=>{
				let headers;
				const keys = data.headers.keys();
				headers = keys.map(key =>
					`${key}: ${data.headers.get(key)}`
				);
				if (data.status !== 200) {
					this.errorCode = 'Atención - ';
					this.errorMsj = 'No se pudo actualizar el programmed del día actual. (DEFAULT).';
					// alert("No se pudo actualizar el programmed del día actual. (random)");
				}else{
					alert("Se actualizó el campo Programmed del día actual.");
				}
			},error=>{
				this.errorCode = 'Error inesperado - ';
				this.errorMsj = 'Ups.. Contacte a soporte por favor (updateProgrammed).';
				// console.log(error);
				// alert("Ups.. Error inesperado, contacte a soporte por favor (updateProgrammed).");
			}
		);
	
	}
}
