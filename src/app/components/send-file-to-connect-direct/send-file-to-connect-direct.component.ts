import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

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

	/*this agregado */
	public p: number;

	constructor(public processFile : ProcessFileService, public authServ : AuthenticationService, private router : Router) { }

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
							this.isLogin = true;
							this.processFile.getFilesToSendToConnectDirect().subscribe(
					  			result => {           
					        		if(result.resultCode == 0){
										this.files = result.listContentFile;
							        }
							    },error => {
								    console.log('Error: ' + error.resultDescription);
							    }
					  		);
						}
					}
				}
			);
		}
  	}

  	detailFileConnectDirectService(oid, name){
  		console.log('ID: ' + oid)
  		this.processFile.getContentFileToSendConnectDirect(oid).subscribe(
  			response => {           
        		if(response.resultCode == 0){
        			console.log('Resp Code: ' + response.resultCode)
        			this.fileContentName = name;
					this.listContent = response.listContent;
					this.isContentTable = false;
					this.isModalTable = true;
		        }
		    },error => {
			    console.log('Error: ' + error.resultDescription);
		    }
  		);
  	}

  	hideContentFileToConnectDirect(){
  		this.isContentTable = true;
		this.isModalTable = false;
  	}

  	exportXLSWO(){
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
		    },error => {
			    this.isError= true;
			    this.errorCode = 'ERR-SERVICE';
				this.errorMsj = 'No se pudo realizar la exportaci&oacute;n de listado de Archivos, el servicio no esta disponible';
		    }
  		);
  	}

}
