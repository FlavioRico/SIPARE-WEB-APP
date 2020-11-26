import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { SharedComponent } from '../../shared/shared/shared.component';
import { FileStatus } from '../models/models-bitacora/fileStatus';
import { FileWorklog } from '../models/models-bitacora/fileWorklog';
import { BitacoraServiceService } from '../../services/bitacora/bitacora-service.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss','../balance/balance-consar/balance-consar.component.scss']
})
export class BitacoraComponent implements OnInit {

  fechaCompleta :   string = '';
  fileName:         string = '';
  statusFile:       number;
  fileStatus:       FileStatus[];
  fileWorklog:      FileWorklog;
  baseFileStatus:   FileStatus[];
  flagErr:          boolean = false;
  messageError:     string;
  allSteps:         FileStatus[];

  @ViewChild("stepLists") stepLi: ElementRef;
  
  constructor(
    private serviceFileStatus: BitacoraServiceService,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService
    ) 
  {}
  
  ngOnInit(): void {

    this.spinner.show();

    this.serviceFileStatus.fileWorklog().subscribe(

      data => {
        if(data === null){

          this.fileName = 'Sin archivo del día actual.';
          this.spinner.hide(); 
          return;

        }else{

          this.fechaCompleta = data.dispatch_date;
          this.serviceFileStatus.fileStatus().subscribe(data => {

            this.allSteps =   data;
            this.fileStatus = data;
            this.baseFileStatus = this.generateBaseSteps(this.baseFileStatus);
            if (this.baseFileStatus.length != 0) this.verifyFinalStep(this.fileWorklog, this.baseFileStatus);

          });
          this.fileWorklog =  data;
          this.fileName =     this.fileWorklog.file_name;
          this.statusFile =   this.fileWorklog.status;
        }
        this.spinner.hide();  
      },error => {

        alert(`Error inesperado en los servicios. ${error.message}`);
        this.spinner.hide();  

      }
    );
  }

  generateBaseSteps(listFileStatusEmpity: FileStatus[]) {
    
    listFileStatusEmpity = this.fileStatus.filter(step => 
      (step.type) === ('EXITO') || (step.type) === ('NEUTRAL')
    );
    return listFileStatusEmpity;
    
  }

  verifyFinalStep(data: FileWorklog, base: FileStatus[]){
    
    //Ruta completa
    if (data.status === 400) {

      this.createSteps(0, base.length, base, "active");
      return;

    }
    else {
      console.log('else', data.status);
      
      //estatus erroneo
      if(data.status % 100 === 1) {
        
        let stop = (data.status) / 100;
        this.createSteps(0, stop, base, "active");
        // this.createSteps(stop, base.length - stop, base, "noActive");
        this.flagErr = true;
        let statusErr = this.allSteps.filter(step => 
          (step.id == data.status)
        );        
        this.messageError = statusErr[0].description;

      }
      if(data.status % 100 === 3){

        let stop = Math.floor(data.status/100);        
        this.createSteps(0, stop, base, "active");
        this.createSteps(0, 1, base.filter(newNodo => (newNodo.id == data.status)), "active");

      }
      if(data.status % 2 === 0){

        let stop = (data.status/100) + 1;
        this.createSteps(0, stop, base, "active");
        this.createSteps(stop, base.length, base, "noActive");

      }
    }
  }

  createSteps(startIndex: number, endIndex: number, base: FileStatus[], classStep: string) {
    
    for(let i = startIndex; i < endIndex; i++){
      
      const li = this.renderer.createElement('li'); 
      const div = this.renderer.createElement('div'); 
      const divText = this.renderer.createText(base[i].description);
      this.renderer.appendChild(div, divText);
      this.renderer.appendChild(li, div);
      this.renderer.appendChild(this.stepLi.nativeElement, li);
      this.renderer.addClass(li, classStep);
      this.renderer.addClass(this.stepLi.nativeElement, "text");
      
    }

  }

}