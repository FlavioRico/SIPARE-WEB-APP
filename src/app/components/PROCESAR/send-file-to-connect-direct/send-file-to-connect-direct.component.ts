import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-send-file-to-connect-direct',
  templateUrl: './send-file-to-connect-direct.component.html',
  styleUrls: ['./send-file-to-connect-direct.component.scss']
})
export class SendFileToConnectDirectComponent implements OnInit {

	public files: any;
	public listContent : any;
	public isContentTable : boolean;
	public isModalTable : boolean;
	public fileContentName : string;
	public isError : boolean;
	public errorCode : string;
	public errorMsj : string;
	public isLogin : boolean;
	public errorInicial : boolean = false;

	/*this agregado */
	public p: number;

	constructor(public processFile : ProcessFileService, public authServ : AuthenticationService, private router : Router,
		private spinner: NgxSpinnerService) { }

	ngOnInit() {
		this.isContentTable = true;
		this.isModalTable = false;
		$(document).ready( function() {
			$("#buscador").on("keyup", function() {
				var value = $(this).val().toLowerCase();
				$("#tablafullModal tr").filter(function() {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			});
		});
		$(document).ready( function() {
			$("#buscadorModal").on("keyup", function() {
				var value = $(this).val().toLowerCase();
				$("#tablafullModalContent tr").filter(function() {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			});
		});
		if(localStorage.getItem('username') === '' || localStorage.getItem('username') == null){
			this.router.navigate(['/']);
		}else{
			this.authServ.getUserByUserName(localStorage.getItem('username')).subscribe(
				result => {
					if(result.resultCode == 0){
						if(result.logged == 0){
							this.router.navigate(['/']);
						}else{
							this.spinner.show();
							this.isLogin = true;
							this.processFile.getFilesToSendToConnectDirect().subscribe(
					  			result => {           
					        		if(result.resultCode == 0){
										this.files = result.listContentFile;
									}
									this.spinner.hide()
							    },error => {
									this.spinner.hide()
									this.isError= true;
									this.errorInicial = true;
				    				this.errorCode = 'ERR-EXPORT';
				    				this.errorMsj = 'No se pudo realizar la exportaci&oacute;n del listado de Archivos, error al exportar';
							    }
					  		);
						}
					}
				}
			);
		}
  	}

  	detailFileConnectDirectService(oid, name){
  		this.processFile.getContentFileToSendConnectDirect(oid).subscribe(
  			response => {           
        		if(response.resultCode == 0){
        			this.fileContentName = name;
					this.listContent = response.listContent;
					this.isContentTable = false;
					this.isModalTable = true;
		        }
		    },error => {
				alert('Ups... Algo salio mal, por favor intente más tarde (detailFileConnectDirectService).');
		    }
  		);
  	}

  	hideContentFileToConnectDirect(){
  		this.isContentTable = true;
		this.isModalTable = false;
  	}

  	exportXLSWO(){
		this.spinner.show();
  		this.processFile.exportDataInFileProcesarXls().subscribe(
  			result => {           
        		if(result == null){
		        	this.isError= true;
				    this.errorCode = 'ERR-EXPORT';
				    this.errorMsj = 'No se pudo realizar la exportaci&oacute;n del listado de Archivos, error al exportar';
		        }else{

		        	var file = new Blob([ result ], {
						type : 'application/csv'
					});
					var fileURL = URL.createObjectURL(file);
					var a = document.createElement('a');
					a.href = fileURL;
					a.target = '_blank';
					a.download = 'listaArchivosEnviadosPROCESAR.xls';
					document.body.appendChild(a);
					a.click();
				}
				this.spinner.hide()
		    },error => {
			    this.isError= true;
			    this.errorCode = 'ERR-SERVICE';
				this.errorMsj = 'No se pudo realizar la exportaci&oacute;n de listado de Archivos, el servicio no esta disponible';
				this.spinner.hide();
		    }
  		);
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
