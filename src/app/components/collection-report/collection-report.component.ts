import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { SharedComponent } from 'src/app/shared/shared/shared.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-collection-report',
  templateUrl: './collection-report.component.html',
  styleUrls: ['./collection-report.component.scss']
})
export class CollectionReportComponent implements OnInit {

	public errorCode : string;
	public isError : boolean;
	public errorMsj : string;
	public files: any;
	public p: number;
	public filesContent : any;
	public totalItems : any;
	public isInfo : boolean;
	public tableHidden : boolean;
	public infoCode : string;
	public infoMsj : string;
	public isContentTable : boolean;
	public isContentTableFull : boolean;
	public fileContentName : string;
	public totalItemsContent : any;
	public isLogin : boolean;
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

	/*For test*/
	dateStartTest: any = '2020-09-28'
	dateEndTest: any = '2020-09-29'


	constructor(
		public authServ : AuthenticationService, 
		public processFile : ProcessFileService, 
		private router : Router,
		private spinner: NgxSpinnerService
	) { }

	ngOnInit() {

		this.spinner.show();
		this.processFile.getDatesCollectionReport().subscribe(
			data=>{
				// console.log('data', data);
				this.fechaStart = data.body.previousBusinessDay;
				this.fechaEnd = data.body.currentDate;
				this.spinner.hide();
			},error=>{
				// console.log('Fechas por default, fallo en servicio');
				this.fechaDefault = this.shared.getDateFormated2();
				this.fechaStart = this.fechaDefault;
				this.fechaEnd = this.fechaDefault;
				this.spinner.hide();
			}
		);

		$(document).ready( function() {
			$("#buscadorModal").on("keyup", function() {
				var input, filter, table, tr, td, i, txtValue;
				input = document.getElementById("buscadorModal");
				filter = input.value.toUpperCase();
				table = document.getElementById("tablafullModal");
				tr = table.getElementsByTagName("tr");
				for (i = 0; i < tr.length; i++) {
				    td = tr[i].getElementsByTagName("td")[3];
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
		
		this.isContentTable = false;
		this.isContentTableFull = true;
		this.tableHidden = false;
		$(document).ready(function(){
  			$("#buscadosar").on("keyup", function() {
    			var input, filter, table, tr, td, i, txtValue;
			  	input = document.getElementById("buscadosar");
			  	filter = input.value.toUpperCase();
			  	table = document.getElementById("tablafull");
			  	tr = table.getElementsByTagName("tr");
			  	for (i = 0; i < tr.length; i++) {
			    	td = tr[i].getElementsByTagName("td")[1];
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

		if(localStorage.getItem('username') == '' || localStorage.getItem('username') == null){
			this.router.navigate(['/']);
		}else{
			this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'), localStorage.getItem('sessionId')).subscribe(
				result => {
					if(result.resultCode == 0){
						if(result.logged == 0){
							this.router.navigate(['/']);
						}else{
							this.isLogin = true;
							this.isInfo= true;
							this.tableHidden = true; 
					        this.infoCode = 'PROCESS';
					        this.infoMsj = 'Se esta ejecutando el listado de Reporte de Recaudación';
							this.processFile.getFilesRiceibingToT24().subscribe(
								result => {           
					        		if(result.resultCode == 0){
							        	if (result.listSize == 0){
											this.isError= false;
											this.tableHidden = true;
									        this.isInfo= true;
					        				this.infoCode = 'Emp-001';
					        				this.infoMsj = 'Sin registros por el momento del día hábil anterior.';
							        	} else {
							        		this.isInfo= false;
							        		this.infoCode = '';
					        				this.infoMsj = '';
							        		this.isError= false;
											this.tableHidden = false;
											this.files = result.listFiles;
											this.totalItems = result.listSize;
										}
							        }
							    },error => {
							    	this.isInfo= false;
					        		this.infoCode = '';
			        				this.infoMsj = '';
								    this.isError= true;
								    this.errorCode = error.resultCode;
									this.errorMsj = error.resultDescription;
							    }
							);
						}
					}
				},error => {
			    	this.isInfo= false;
	        		this.infoCode = '';
    				this.infoMsj = '';
    				this.tableHidden = true;
				    this.isError= true;
				    this.errorCode = error.resultCode;
					this.errorMsj = error.resultDescription;
			    }
			);
		}
  	}

  	detailFileT24Service(oid, name){
  		this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
			result => {
				if(result.resultCode == 0){
					if(result.logged == 0)
							this.router.navigate(['/']);
					else{
						this.processFile.detailFileT24(oid).subscribe(
				  			result => {           
				        		if(result.resultCode == 0){
						        	if (result.listSize == 0){
										this.isError= true;
								        this.errorCode = result.resultCode;
								        this.errorMsj = result.resultDescription;
						        	}else{
						        		this.filesContent = result.listContent;
						        		this.totalItemsContent = result.listSize;
						        		$(document).ready( function() {
										$("#buscadorModal").on("keyup", function() {
											var input, filter, table, tr, td, i, txtValue;
											input = document.getElementById("buscadorModal");
											filter = input.value.toUpperCase();
											table = document.getElementById("tablafullModalBody");
											tr = table.getElementsByTagName("tr");
											for (i = 0; i < tr.length; i++) {
											    td = tr[i].getElementsByTagName("td")[3];
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
						        	}
						        }
						    },error => {
							    this.isError= true;
							    this.errorCode = error.resultCode;
								this.errorMsj = error.resultDescription;
						    }
				  		);
				  		this.fileContentName = name;
				  		this.isContentTable=true;
				  		this.isContentTableFull=false;
					}
				}else
				this.router.navigate(['/']);
			});
  	}

  	exportXLSWO(){
  		this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
			result => {
				if(result.resultCode == 0){
					if(result.logged == 0)
						this.router.navigate(['/']);
					else{
						this.isInfo= true;
				        this.infoCode = 'EXPORT';
				        this.infoMsj = 'Se esta exportando los registros de Reporte de Recaudación al archivo XLS';
				        this.tableHidden = true;
				        this.isError= false;
				        this.errorCode = '';
						this.errorMsj = '';
				  		if(this.fechaStart === null || this.fechaEnd === null){
							this.processFile.exportDataInFileT24XlsDefault().subscribe(
					  			result => {           
					        		if(result.byteLength > 0){
					        			this.isInfo= false;
								        this.infoCode = '';
								        this.infoMsj = '';
								        this.tableHidden = false;
							        	var file = new Blob([ result ], {
											type : 'application/csv'
										});
										var fileURL = URL.createObjectURL(file);
										var a = document.createElement('a');
										a.href = fileURL;
										a.target = '_blank';
										a.download = 'listaArchivosRecibidosT24.xls';
										document.body.appendChild(a);
										a.click();
							        }else{
							        	this.isError= true;
							        	this.isInfo= false;
									    this.errorCode = 'ERR-EXPORT';
									    this.errorMsj = 'No se generó archivo XLS porque no hay archivos por mostrar';
									    this.isInfo= false;
								        this.infoCode = '';
								        this.infoMsj = '';
							        }
							    },error => {
							    	this.isInfo= false;
							        this.infoCode = '';
							        this.infoMsj = '';
								    this.isError= true;
								    this.errorCode = 'ERR-SERVICE';
									this.errorMsj = 'No se generó archivo XLS porque no hay archivos por mostrar';
							    }
					  		);
				  		}else{

							var dateControlStart: any = document.getElementById('fechaStart');
							var dateControlEnd: any = document.getElementById('fechaEnd');
							this.fechaStart = dateControlStart.value;
							this.fechaEnd = dateControlEnd.value;

				  			this.processFile.exportDataInFileT24Xls(this.fechaStart, this.fechaEnd).subscribe(
					  			result => {           
					        		if(result.byteLength > 0){this.isInfo= false;
								        this.infoCode = '';
								        this.infoMsj = '';
								        this.tableHidden = false;
							        	var file = new Blob([ result ], {
											type : 'application/csv'
										});
										var fileURL = URL.createObjectURL(file);
										var a = document.createElement('a');
										a.href = fileURL;
										a.target = '_blank';
										a.download = 'listaArchivosRecibidosT24.xls';
										document.body.appendChild(a);
										a.click();
							        }else{
							        	this.isError= true;
							        	this.isInfo= false;
								        this.infoCode = '';
								        this.infoMsj = '';	
									    this.errorCode = 'ERR-EXPORT';
									    this.errorMsj = 'No se generó archivo XLS porque no hay archivos por mostrar';
							        }
							    },error => {
								    this.isError= true;
								    this.isInfo= false;
							        this.infoCode = '';
							        this.infoMsj = '';
								    this.errorCode = 'ERR-SERVICE';
									this.errorMsj = 'No se genero Registro porque no hay archivos por mostrar';
							    }
					  		);
				  		}
					}
				}else
				this.router.navigate(['/']);
			});
  	}

  	searchByDate(){
  		this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
			result => {				
				if(result.resultCode == 0){
					if(result.logged == 0)
						this.router.navigate(['/']);
					else{
						var dateControlStart: any = document.getElementById('fechaStart');
						var dateControlEnd: any = document.getElementById('fechaEnd');
						this.fechaStart = dateControlStart.value;
						this.fechaEnd = dateControlEnd.value;
						// console.log('fechas => ', this.fechaStart, this.fechaEnd);
						
						// var endDate = new Date(this.fechaEnd); descomentar terminando pruebas
						var endDate = new Date(this.fechaEnd);
						// console.log(this.fechaStart, this.fechaEnd, endDate)

						let dateNow = new Date(this.fechaStart);
						// let dateNow = new Date(); descomentar terminando pruebas
				  		this.isInfo= true;
				        this.infoCode = 'PROCESS';
				        this.infoMsj = 'Se esta ejecutando el listado de Reporte de Recaudación por rango de fecha';

						if(endDate.getUTCFullYear() + (endDate.getUTCMonth() +1) + endDate.getUTCDate() >
				  		    		(dateNow.getUTCFullYear() + (dateNow.getUTCMonth() +1) + dateNow.getUTCDate()) + 1){

							// console.log('Fecha final:',
							// endDate.getUTCFullYear(), (endDate.getUTCMonth() +1), endDate.getUTCDate(),
							// 'Fecha actual: ',
				  		    // dateNow.getUTCFullYear(), (dateNow.getUTCMonth() +1), dateNow.getUTCDate()
							// );
							
							
				    		this.tableHidden = true;
				    		this.isInfo= false;
					        this.infoCode = '';
					        this.infoMsj = '';
				    		this.isError= true;
				    		this.isInfo = false;
						    this.errorCode = 'ERR-DR';
							this.errorMsj = 'Rango de búsqueda por fecha debe ser hasta un día hábil anterior al día actual';
						}
						else{
							this.processFile.getFilesRiceibingToT24ByDateRange(this.fechaStart, this.fechaEnd).subscribe(
				    		// this.processFile.getFilesRiceibingToT24ByDateRange(this.dateStartTest, this.dateEndTest).subscribe(
								result => {  
									// console.log('Fecha final:',
									// endDate.getUTCFullYear(), (endDate.getUTCMonth() +1), endDate.getUTCDate(),
									// 'Fecha actual: ',
									// dateNow.getUTCFullYear(), (dateNow.getUTCMonth() +1), dateNow.getUTCDate()
									// );
									// console.log(result);
									         
						    		if(result.resultCode == 0){
							        	if (result.listSize == 0){
							        		this.tableHidden = true;
							        		this.isError= false;
											this.isInfo= true;
									        this.infoCode = 'Emp-001';
									        this.infoMsj = 'Sin registros por el momento en el rango de fecha.';
							        	} else {
							        		this.tableHidden = false;
							        		this.isInfo= false;
									        this.infoCode = '';
									        this.infoMsj = '';
							        		this.isError= false;
							        		this.p = 1;
											this.files = result.listFiles;
											this.totalItems = result.listSize;
										}
							        }else{
							        	this.tableHidden = true;
						        		this.isError= true;
										this.isInfo= false;
								        this.errorCode = 'Atención ';
								        this.errorMsj = 'No hay archivos cargados desde T24.';
							        }
							    },error => {
							    	this.isInfo= false;
							        this.infoCode = '';
							        this.infoMsj = '';
								    this.isError= true;
								    this.errorCode = error.resultCode;
									this.errorMsj = error.resultDescription;
							    }
							);
				    	}
					}
				}
			});
  	}

  	hideContentFileT24(){
  		this.isContentTable=false;
  		this.isContentTableFull=true;	
  	}

  	sortTableNumber(n) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("tablafull");
		switching = true;
		dir = "asc";
		while (switching) {
		    switching = false;
		    rows = table.getElementsByTagName("TR");
		    for (i = 1; i < (rows.length - 1); i++) { 
				shouldSwitch = false;
		      	x = rows[i].getElementsByTagName("TD")[n];
		      	y = rows[i + 1].getElementsByTagName("TD")[n];
		      	var cmpX = isNaN(parseInt(x.innerHTML)) ? x.innerHTML.toLowerCase():parseInt(x.inner);
		      	var cmpY = isNaN(parseInt(y.innerHTML)) ? y.innerHTML.toLowerCase():parseInt(y.inner);
		      	// console.log(cmpX);
		      	// console.log(cmpY);
		      	cmpX = (cmpX == '-') ? 0 :  cmpX;
		      	cmpY = (cmpY == '-') ? 0 :  cmpY;
		      	if (dir == "asc") {
		        	if (cmpX > cmpY) {
		          		shouldSwitch= true;
		          		break;
		        	}
		      	} else if (dir == "desc") {
		        	if (cmpX < cmpY) {
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

  	sortTable(n) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("tablafull");
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
		          		shouldSwitch= true;
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

	sortTableMoney(n) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0, xText, yText;
		table = document.getElementById("tablafull");
		switching = true;

		dir = "asc";

		while (switching) {

			switching = false;
			rows = table.getElementsByTagName("TR");

			for (i = 1; i < (rows.length - 1); i++) {

			shouldSwitch = false;

			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];


			if (n == 0) {
				xText = x.innerHTML.toLowerCase();
				yText = y.innerHTML.toLowerCase();
			} else {
				xText = parseFloat(x.innerHTML.split('$')[1].replace(/,/g, ''));
				yText = parseFloat(y.innerHTML.split('$')[1].replace(/,/g, ''));
			}

			if (dir == "asc") {
				if (xText > yText) {
				shouldSwitch = true;
				break;
				}
			} else if (dir == "desc") {
				if (xText < yText) {
				shouldSwitch = true;
				break;
				}
			}
			}
			if (shouldSwitch) {

			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;

			switchcount++;
			} else {

			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
			}
		}
	}

sortTableMoneyModal(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0, xText, yText;
  table = document.getElementById("tablafullModal");
  switching = true;

  dir = "asc";

  while (switching) {

    switching = false;
    rows = table.getElementsByTagName("TR");

    for (i = 1; i < (rows.length - 1); i++) {

      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];


      if (n == 0) {
        xText = x.innerHTML.toLowerCase();
        yText = y.innerHTML.toLowerCase();
      } else {
        xText = parseFloat(x.innerHTML.split('$')[1].replace(/,/g, ''));
        yText = parseFloat(y.innerHTML.split('$')[1].replace(/,/g, ''));
      }

      if (dir == "asc") {
        if (xText > yText) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (xText < yText) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {

      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;

      switchcount++;
    } else {

      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

	sortTableModal(n) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("tablafullModal");
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
		          		shouldSwitch= true;
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

}
