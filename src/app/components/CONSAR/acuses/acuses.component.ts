import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProcessFileService } from 'src/app/services/process-file/process-file.service';
import { Acuse } from './../../models/models-acuses/Acuse'

@Component({
  selector: 'app-acuses',
  templateUrl: './acuses.component.html',
  styleUrls: ['./acuses.component.scss']
})
export class AcusesComponent implements OnInit {

  acuses: Acuse[];
  acusesExists: boolean = true;
  
  constructor(
    public processFileService: ProcessFileService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.processFileService.getAcuses().subscribe(
      data=>{
        let headers;
        const keys = data.headers.keys();
          headers = keys.map(key =>
            `${key}: ${data.headers.get(key)}`
        );
        this.acuses = data.body;
        if(data.status == 204){
          this.acusesExists = false;
        }else{
          this.acusesExists = true;
        }
        this.spinner.hide();
      },err=>{
        this.spinner.hide();
        alert("Error inesperado en servicios (getAcuses).");
      }
    );
  }

  downloadContent(idArchivo: string, nameFile: string){
    this.spinner.show();

    const fileName = nameFile + '.txt';

    this.processFileService.downloadContent(idArchivo).subscribe(
      response=>{
        this.generateFileDownload(response, fileName);
        this.spinner.hide();
      },error=>{
        this.spinner.hide();
      }
    );
  }

  generateFileDownload(response: any, fileName: string){
    const dataType = 'application/txt';
    const binaryData = [];
    binaryData.push(response);

    const filePath = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
