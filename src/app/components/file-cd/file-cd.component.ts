import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProcessFileService } from  '../../services/process-file/process-file.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-file-cd',
  templateUrl: './file-cd.component.html',
  styleUrls: ['./file-cd.component.scss']
})
export class FileCdComponent implements OnInit {

	public files : any;
	public file : any;
	public fileAddFlag : any;
	public filesAddArray : any;
	public widgets: any;
	public fileSendCd = [];
	public fileRemoveCd = [];
	public isError : boolean;
	public isSuccess : boolean;
	public errorCode : string;
	public errorMsj : string;
	public successCode : string;
	public successrMsj : string;
	public isLogin : boolean;

	constructor(public processFile : ProcessFileService, public authServ : AuthenticationService, private router : Router) { }

	ngOnInit() {
		this.isError = false;
		this.isSuccess = false;
		$(document).ready( function() {
			$("#buscadorFile").on("keyup", function() {
				var value = $(this).val().toLowerCase();
				$("#table-File tr").filter(function() {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			});
			$("#buscadorCd").on("keyup", function() {
				var value = $(this).val().toLowerCase();
				$("#tableCd tr").filter(function() {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			});
		});
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
							this.processFile.searchFilesToSendCdService().subscribe(
								response => {           
					        		if(response.resultCode == 0){
										this.fileRemoveCd = response.listFiles;
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

  	onClickFileAdd(fileAdd){
  		this.isError = false;
		this.isSuccess = false;
  		var index = this.fileSendCd.indexOf(fileAdd);
		if(index > -1)
			this.fileSendCd.splice(index, 1);
		else{
			this.fileSendCd.push(fileAdd);
		}
		var index = this.fileRemoveCd.indexOf(fileAdd);
		if(index > -1)
			this.fileRemoveCd.splice(index, 1);
		else{
			this.fileRemoveCd.push(fileAdd);
		}
  	}

  	onClickSendFilesToCdPath(){
  		this.processFile.sendFilesToPathCd(this.fileSendCd).subscribe(
  			response => {           
        		if(response.resultCode === 'PF-MS-SUCCESS006'){
					this.isSuccess = true;
					this.successCode = response.resultCode;
					this.successrMsj = response.resultDescription;
					this.fileSendCd = [];
					this.processFile.searchFilesToSendCdService().subscribe(
						response => {           
			        		if(response.resultCode == 0){
								this.fileRemoveCd = response.listFiles;
					        }
					    },error => {
						    this.isError = true;
					    	this.errorCode = error.resultCode;
					    	this.errorMsj = error.resultDescription;
					    }
					);
		        }
		    },error => {
		    	this.isError = true;
		    	this.errorCode = error.resultCode;
		    	this.errorMsj = error.resultDescription;
		    }
  		);
  	}

  	onClickRemoveFile(fileAdd){
  		var index = this.fileRemoveCd.indexOf(fileAdd);
		if(index > -1)
			this.fileRemoveCd.splice(index, 1);
		else{
			this.fileRemoveCd.push(fileAdd);
		}
  		var index = this.fileSendCd.indexOf(fileAdd);
		if(index > -1)
			this.fileSendCd.splice(index, 1);
		else{
			this.fileSendCd.push(fileAdd);
		}
  	}

}
