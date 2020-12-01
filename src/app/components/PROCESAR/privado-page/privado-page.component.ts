import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { SharedComponent } from 'src/app/shared/shared/shared.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-privado-page',
  templateUrl: './privado-page.component.html',
  styleUrls: ['./privado-page.component.scss']
})
export class PrivadoPageComponent implements OnInit {

	public isLogin : boolean;
	public files: any;
	public totalItems : any;
	public currentPage : any;
	public p : number;
	public maxSize : any;
	public errorCode : string;
	public isError : boolean;
	public errorMsj : string;
	public isInfo : boolean;
	public tableHidden : boolean;
	public infoCode : string;
	public infoMsj : string;
	public fileUrl : any;
	public fileUrlr : any;
	public dateRange : any;
	public dateFrom : boolean;
  	public dateTo : boolean;

  	/*Agregado*/
	public fechaStart;
	public fechaEnd;
	public fechaDefault;
	shared = new SharedComponent();
	public dia;
	public mes;
	public año;
  
  	constructor(
		public authServ : AuthenticationService, 
		public processFile : ProcessFileService,
		private router : Router,
		private spinner: NgxSpinnerService,

	) { }

  	ngOnInit() {

		this.fechaDefault = this.shared.getDateFormated2();
		this.fechaStart = this.fechaDefault;
		this.fechaEnd = this.fechaDefault;

		$(document).ready(function(){
		$("#buscador").on("keyup", function() {
			var input, filter, table, tr, td, i, txtValue;
			input = document.getElementById("buscador");
			filter = input.value.toUpperCase();
			table = document.getElementById("tabla");
			tr = table.getElementsByTagName("tr");
			for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[0];
			if (td) {
				txtValue = td.textContent || td.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			}       
			}

		});
		});

		this.spinner.show();
		if(localStorage.getItem('username') === '' || localStorage.getItem('username') == null){
			this.spinner.hide();
			this.router.navigate(['/']);
		}else{
			this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'), localStorage.getItem('sessionId')).subscribe(
			result => {
				if(result.resultCode == 0){
				if(result.logged == 0){
					this.spinner.hide();
					this.router.navigate(['/']);
				}else{
					this.isLogin = true;
					this.isInfo= true;
					this.tableHidden = true; 
					this.infoCode = 'PROCESS';
					this.infoMsj = 'Por favor espere, se está ejecutando el listado de Archivos Mensuales PROCESAR...';
					this.processFile.getFilesRiceibingToProcesar().subscribe(
						result => {           
							if(result.resultCode == 0){
								if (result.listSize == 0){
									this.isError= false;
									this.isInfo= true;
									this.infoCode = 'Emp-001';
									this.infoMsj = 'Sin registros por el momento.';
									this.tableHidden = true; 
									this.errorCode = '';
									this.errorMsj = '';
								} else {
									this.isInfo= false;
									this.infoCode = '';
									this.infoMsj = '';
									this.isError= false;
									this.tableHidden = false;
									this.files = result.listFiles;
									this.totalItems = result.listSize;
									this.currentPage = 1;
									this.maxSize = 10;
								}
								this.spinner.hide();
                    	}
					},error => {
						this.infoCode = '';
						this.infoMsj = '';
						this.infoErrorService('Ups... algo salió mal, por favor intente más tarde (getFilesRiceibingToProcesar).');
						this.spinner.hide();
					}
              );
         	}
        }else 
          this.router.navigate(['/']);
      }
    );
  }
  }

  searchByDate(){
	  this.spinner.show();
    this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
    result => {
      if(result.resultCode == 0){
		if(result.logged == 0){
			this.spinner.hide();
          	this.router.navigate(['/']);
		}
        else{

			var dateControlStart: any = document.getElementById('fechaStart');
			var dateControlEnd: any = document.getElementById('fechaEnd');
			this.fechaStart = dateControlStart.value;
			this.fechaEnd = dateControlEnd.value;
			var endDate = new Date(this.fechaEnd);

          	let dateNow = new Date(this.fechaStart);
            this.isInfo = true;
			this.infoCode = 'PROCESS';
			this.infoMsj = 'Se esta ejecutando el listado de Archivos Mensuales PROCESAR por rango de fecha';
			this.isError = false;
			this.tableHidden = true;

			if(endDate.getUTCFullYear() + (endDate.getUTCMonth() +1) + endDate.getUTCDate() >
				dateNow.getUTCFullYear() + (dateNow.getUTCMonth() +1) + dateNow.getUTCDate()){
				this.tableHidden = true;
				this.isInfo= false;
				this.infoCode = '';
				this.infoMsj = '';
				this.isError= true;
				this.errorCode = 'ERR-DR';
				this.errorMsj = 'Rango de búsqueda por fecha debe ser hasta un día hábil anterior al día actual';
			}
			else{
              this.processFile.getFilesRiceibingToProcesarByDateRange(this.fechaStart, this.fechaEnd).subscribe(
              result => {           
                  if(result.resultCode == 0){
                      if (result.listSize == 0){
                        this.tableHidden = true;
                        this.isError= false;
                    	this.isInfo= true;
                        this.infoCode = 'Emp-001';
                        this.infoMsj = 'Sin registros por el momento.';
                      }else {
                        this.tableHidden = false;		
                        this.infoCode = '';
                        this.infoMsj = '';
                        this.isInfo= false;
                        this.isError= false;
						this.files = result.listFiles;
						this.totalItems = result.listSize;
						this.currentPage = 1;
						this.p = 1;
						this.maxSize = 10;
                 	}
                    }else{
                      	this.tableHidden = true;
						this.infoErrorService('Ups... algo salió mal, por favor intente más tarde. (getFilesRiceibingToProcesarByDateRange)');
					}
					this.spinner.hide();
                },error => {
					this.infoCode = '';
					this.infoMsj = '';
					this.isError= true;
					this.infoErrorService('Ups... algo salió mal, por favor intente más tarde. (getFilesRiceibingToProcesarByDateRange)');

                }
            );
            }
        }
      }
    },errorr=>{
		this.infoErrorService('Ups... algo salió mal, por favor intente más tarde. (getUserByUserNameWithSessionId)');
		this.spinner.hide();
	});
  }

  exportXLSWO(){
	this.spinner.show();
	this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
		result => {
			if(result.resultCode == 0){
				if(result.logged == 0){
					this.spinner.hide();
					this.router.navigate(['/']);
				}
				else{
					let dateNow = new Date();
					this.isInfo = true;
					this.infoCode = 'EXPORT';
					this.infoMsj = 'Se esta exportando los registros en un archivo XLS';
					this.tableHidden = true; 
					if(this.fechaStart === null || this.fechaEnd === null){
						this.processFile.exportDataInFileXlsDefault().subscribe(
							result => { 
								if(result.byteLength > 0){
									this.isInfo= false;
									this.infoCode = '';
									this.infoMsj = '';
									this.isError = false;
									this.tableHidden = false;
									var file = new Blob([ result ], {
										type : 'application/csv'
									});
									var fileURL = URL.createObjectURL(file);
									var a = document.createElement('a');
									a.href = fileURL;
									a.target = '_blank';
									a.download = 'listaArchivosRecibidosPROCESAR.xls';
									a.click();
								}else{
									this.tableHidden = true; 
									this.infoMsj = '';
									this.infoCode = '';
									this.infoErrorService('Ups... algo salió mal, por favor intente más tarde. (exportDataInFileXlsDefault)');
								}
								this.spinner.hide();
							},error => {
								this.infoCode = '';
								this.infoMsj = '';
								this.infoErrorService('Ups... algo salió mal, por favor intente más tarde. (exportDataInFileXlsDefault)');
								this.spinner.hide();
							}
						);
					}else{
						if(this.dateRange.to.getUTCFullYear() + (this.dateRange.to.getUTCMonth() +1) + this.dateRange.to.getUTCDate() ==
							dateNow.getUTCFullYear() + (dateNow.getUTCMonth() +1) + dateNow.getUTCDate() || 
							this.dateRange.to.getUTCFullYear() + (this.dateRange.to.getUTCMonth() +1) + this.dateRange.to.getUTCDate() >
							dateNow.getUTCFullYear() + (dateNow.getUTCMonth() +1) + dateNow.getUTCDate()){
							this.tableHidden = true;
							this.isInfo= false;
							this.infoCode = '';
							this.infoMsj = '';
							this.isError= true;
							this.errorCode = 'ERR-DR';
							this.errorMsj = 'Rango de búsqueda por fecha debe ser hasta un día hábil anterior al día actual, para poder realizar la exportación de datos';
						}else{
							this.isInfo= true;
							this.infoCode = 'EXPORT';
							this.infoMsj = 'Se esta exportando los registros al archivo XLS';
							this.tableHidden = true;
							if(this.fechaDefault === undefined || this.fechaDefault === null){
								this.processFile.exportDataInFileXlsDefault().subscribe(
									result => { 
										if(result.byteLength > 0){
										this.isInfo= false;
										this.infoCode = '';
										this.infoMsj = '';
										this.isError = false;
										this.tableHidden = false;
											var file = new Blob([ result ], {
												type : 'application/csv'
											});
											var fileURL = URL.createObjectURL(file);
											var a = document.createElement('a');
											a.href = fileURL;
											a.target = '_blank';
											a.download = 'listaArchivosRecibidosPROCESAR.xls';
											a.click();
										}else{
											this.errorCode = 'ERR-EXPORT';
											this.errorMsj = 'No se generó archivo XLS porque no hay archivos por mostrar';
											this.tableHidden = true; 
											this.isInfo= false;
											this.isError = true;
											this.infoCode = '';
											this.infoMsj = '';
										}
									},error => {
										this.isInfo= false;
										this.infoCode = '';
										this.infoMsj = '';
										this.isError = true;
										this.errorCode = 'ERR-SERVICE';
										this.errorMsj = 'No se generó registro porque no hay archivos por mostrar';
										this.spinner.hide();
									}
								);
							}else{
								this.processFile.exportDataInFileXls(this.fechaStart, this.fechaEnd).subscribe(
									result => { 
										if(result.byteLength > 0){
										this.isInfo= false;
										this.infoCode = '';
										this.infoMsj = '';
										this.isError = false;
										this.tableHidden = false;
											var file = new Blob([ result ], {
												type : 'application/csv'
											});
											var fileURL = URL.createObjectURL(file);
											var a = document.createElement('a');
											a.href = fileURL;
											a.target = '_blank';
											a.download = 'listaArchivosRecibidosPROCESAR.xls';
											a.click();
										}else{
											this.errorCode = 'ERR-EXPORT';
											this.errorMsj = 'No se generó archivo XLS porque no hay archivos por mostrar';
											this.isError = true;
											this.tableHidden = true; 
											this.isInfo= false;
											this.infoCode = '';
											this.infoMsj = '';
										}
									},error => {
										this.isInfo= false;
										this.infoCode = '';
										this.infoMsj = '';
										this.isError = true;
										this.errorCode = 'ERR-SERVICE';
										this.errorMsj = 'No se generó registro porque no hay archivos por mostrar';
										this.spinner.hide();
									}
								);
								this.spinner.hide();
							}
						}
					}
					this.spinner.hide();
				}
			}else{
				this.spinner.hide();
				this.router.navigate(['/']);
			}

		},errorrr=>{
			this.infoErrorService('Ups... algo salió mal, por favor intente más tarde. (getUserByUserNameWithSessionId)');
			this.spinner.hide();
		}
		);	
  }

  sortTable(n) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("tabla");
		switching = true;
		dir = "asc";
		while (switching) {
		    switching = false;
		    rows = table.getElementsByTagName("TR");
		    for (i = 1; i < (rows.length - 1); i++) { 
				shouldSwitch = false;
		      	x = rows[i].getElementsByTagName("TD")[n];
		      	y = rows[i + 1].getElementsByTagName("TD")[n];
		      	if (dir == "asc") {
		        	if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
		          		shouldSwitch = true;
		          		break;
		        	}
		      	} else if (dir == "desc") {
		        	if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
		          		shouldSwitch = true;
		          		break;
		        	}
		      	}
		    }
		    if (shouldSwitch) {
		      	rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		      	switching = true;
		      	switchcount ++;      
		    } else {
		      	if (switchcount == 0 && dir == "asc") {
		        	dir = "desc";
		        	switching = true;
		      	}
		    }
		 }
	}

	infoErrorService (messagge: string){
		this.isError = true;
		this.isInfo = false;
		this.errorCode = '';
		this.errorMsj = messagge;
	}
}
