import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import { msjscode } from '../../../environments/msjsAndCodes';
import * as $ from 'jquery';

@Component({
  selector: 'app-valid-file',
  templateUrl: './valid-file.component.html',
  styleUrls: ['./valid-file.component.scss']
})
export class ValidFileComponent implements OnInit {

  	public isError : boolean;
	public isLogin : boolean;
	public fileValid = [];
	public errorCode : string;
	public errorMsj : string;
	public isSuccess : boolean;
	public isInfo : boolean;
	public infoMsj : string;
	public fileNameNg : string;
	public txtAreaNG : string;
	public txtArea : string;
	public isEditForm : boolean;
	public isContentTable : boolean;
	public successCode : string;
	public successrMsj : string;

	constructor(public processFile : ProcessFileService, public authServ : AuthenticationService, private router : Router) { }

  	ngOnInit() {
		this.isError = false;
		this.isContentTable = false;
		this.isEditForm = false;
		this.isSuccess = false;
		this.isInfo = true;
  		this.infoMsj = 'Obteniendo los archivos que fueron validados';
		if(localStorage.getItem('username') == '' || localStorage.getItem('username') == null){
			this.router.navigate(['/']);
		}else{
			this.authServ.getUserByUserName(localStorage.getItem('username')).subscribe(
				result => {
					if(result.resultCode == 0){
						if(result.logged == 0){
							this.router.navigate(['/']);
						}else{
							this.isLogin = true;
							this.processFile.searchFilesToValidService().subscribe(
								response => {  
									this.isContentTable = true;     
									this.isInfo = false;
  									this.infoMsj = '';    
					        		if(response.resultCode == 0){
										this.fileValid = response.listFiles;
										console.log("DEBUG->", this.fileValid);
										
							        }else{
										console.log("DEBUG->", response);
							        	this.isContentTable = false;   
							        	this.isInfo = true;
  										this.infoMsj = 'No hay archivos para validar';  
							        }
							    },error => {
								    this.isError = true;
							    	this.errorCode = error.resultCode;
							    	this.errorMsj = error.resultDescription;
							    }
							);
						}
					}
				}
			);
		}
  	}

  	sendFileToConnectDirect(fileName){
  		this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
			result => {
				if(result.resultCode == 0){
					if(result.logged == 0)
						this.router.navigate(['/']);
					else{
						this.isSuccess = false;
				  		this.successCode = '';
				  		this.successrMsj = '';
				  		this.isInfo = true;
				  		this.infoMsj = 'Se esta enviando el Archivo: ' + fileName;
				  		this.processFile.sendFileToConnectDirectValidattedFile(fileName).subscribe(
							result => {           
				        		if(result.resultCode == msjscode.resultCodeOk){
				        			this.successCode = 'SUCCESS';
									this.successrMsj = 'Archivo envido con exito';
						        	this.processFile.searchFilesToValidService().subscribe(
												response => {           
									        		if(response.resultCode == 0){
														this.fileValid = response.listFiles;
														this.isSuccess = true;
											        	this.isError = false;
											        	this.isInfo = false;
											        	this.successCode = 'SUCCESS';
											        	this.successrMsj = 'Listado de Archivos por validar';
											        }else if(response.resultCode == 2){
														this.fileValid = response.listFiles;
														this.isSuccess = true;
											        	this.isError = false;
											        	this.isInfo = true;
											        	this.infoMsj = 'No hay archivos por validar';
											        }
											    },error => {
												    this.isError = true;
												    this.isInfo = false;
											    	this.errorCode = error.resultCode;
											    	this.errorMsj = error.resultDescription;
											    }
											);
						        }else if(result.resultCode == 'PF-MS-ERR0003'){
						        	this.isError = true;
						        	this.isInfo = false;
						       		this.errorCode = result.resultCode;
						        	this.errorMsj = result.resultDescription;
						        	this.processFile.searchFilesToValidService().subscribe(
												response => {           
									        		if(response.resultCode == 0){
														this.fileValid = response.listFiles;
											        }
											    },error => {
												    this.isError = true;
												    this.isInfo = false;
											    	this.errorCode = error.resultCode;
											    	this.errorMsj = error.resultDescription;
											    }
											);
						        }
						    },error => {
							    this.isError = true;
							    this.isInfo = false;
						       	this.errorCode = error.resultCode;
						        this.errorMsj = error.resultDescription;
						    }
						);
					}
				}
			});
  	}

  	sendFileToEdit(fileName){
  		this.isSuccess = false;
  		this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
			result => {
				if(result.resultCode == 0){
					if(result.logged == 0)
						this.router.navigate(['/']);
					else{
						this.processFile.getContentFileEdit(fileName).subscribe(
						result => {           
			        		if(result.resultCode == msjscode.resultCodeOk){
								this.isContentTable = false;
						  		this.isEditForm = true;
						  		this.txtArea = result.byteContent;
						  		this.fileNameNg = result.fileName;
					        }else if(result.resultCode == '1'){
					        	this.isContentTable = true;
						  		this.isEditForm = false;
					        	this.isError = true;
					        	this.isInfo = false;
					       		this.errorCode = result.resultCode;
					        	this.errorMsj = result.resultDescription;
					        }
					    },error => {
						    this.isError = true;
						    this.isInfo = false;
					       	this.errorCode = error.resultCode;
					        this.errorMsj = error.resultDescription;
					    }
					);
					}
				}
			});
  	}

  	back(){
  		this.isContentTable = true;
		this.isEditForm = false;
  	}

  	edit(contentData, name){
  		this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
			result => {
				if(result.resultCode == 0){
					if(result.logged == 0)
						this.router.navigate(['/']);
					else{
						this.processFile.editFile(contentData, name).subscribe(
							result => {           
				        		if(result.resultCode == msjscode.resultCodeOk){
									this.isContentTable = true;
									this.isEditForm = false;
									this.isSuccess = true;
						        	this.isError = false;
						        	this.isInfo = false;
						        	this.successCode = 'SUCCESS';
						        	this.successrMsj = 'Archivo editado con exito';
						        	this.processFile.searchFilesToValidService().subscribe(
										response => {           
							        		if(response.resultCode == 0){
												this.fileValid = response.listFiles;
									        }
									    },error => {
										    this.isError = true;
									    	this.errorCode = error.resultCode;
									    	this.errorMsj = error.resultDescription;
									    }
									);
						        }else if(result.resultCode == '1'){
						        	this.isContentTable = true;
							  		this.isEditForm = false;
						        	this.isError = true;
						        	this.isInfo = false;
						        	this.isSuccess = false;
						       		this.errorCode = result.resultCode;
						        	this.errorMsj = result.resultDescription;
						        }
						    },error => {
							    this.isError = true;
							    this.isInfo = false;
						       	this.errorCode = error.resultCode;
						        this.errorMsj = error.resultDescription;
						    }
						);
					}
				}
			});
  	}

  	sendFileToValid(name){
  		this.authServ.getUserByUserNameWithSessionId(localStorage.getItem('username'),localStorage.getItem('sessionId')).subscribe(
			result => {
				if(result.resultCode == 0){
					if(result.logged == 0)
						this.router.navigate(['/']);
					else{
						this.processFile.validFile(name).subscribe(
							result => {           
				        		if(result.resultCode == msjscode.resultCodeOk){
									this.isContentTable = true;
									this.isEditForm = false;
									this.isSuccess = true;
						        	this.isError = false;
						        	this.isInfo = false;
						        	this.successCode = 'SUCCESS';
						        	this.successrMsj = 'Archivo validado con exito';
						        	this.processFile.searchFilesToValidService().subscribe(
										response => {           
							        		if(response.resultCode == 0){
												this.fileValid = response.listFiles;
									        }
									    },error => {
										    this.isError = true;
									    	this.errorCode = error.resultCode;
									    	this.errorMsj = error.resultDescription;
									    }
									);
						        }else if(result.resultCode == '1'){
						        	this.isContentTable = true;
							  		this.isEditForm = false;
						        	this.isError = true;
						        	this.isInfo = false;
						        	this.isSuccess = false;
						       		this.errorCode = result.resultCode;
						        	this.errorMsj = result.resultDescription;
						        }
						    },error => {
							    this.isError = true;
							    this.isInfo = false;
						       	this.errorCode = error.resultCode;
						        this.errorMsj = error.resultDescription;
						    }
						);
					}
				}
			});
  	}

}
