import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FileStatus } from '../models/models-bitacora/fileStatus';
import { FileWorklog } from '../models/models-bitacora/fileWorklog';
import { BitacoraServiceService } from '../../services/bitacora/bitacora-service.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss','../balance/balance-consar/balance-consar.component.scss']
})
export class BitacoraComponent implements OnInit, AfterViewInit {

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

  ngAfterViewInit(): void{
    // this.spinner.hide();
  }

  generateBaseSteps(listFileStatusEmpity: FileStatus[]) {
    
    listFileStatusEmpity = this.fileStatus.filter(step => 
      (step.type) === ('EXITO') || (step.type) === ('NEUTRAL')
    );
    return listFileStatusEmpity;
    
  }

  verifyFinalStep(data: FileWorklog, base: FileStatus[]){
    
    //Ruta completa
    if (data.status === 400) this.createSteps(0, base.length, base, "active");
    else {
      
      //estatus erroneo
      if(data.status % 100 === 1) {
        
        // let stop = Math.floor((data.status) / 100);
        let stop = this.findIndex(data.status) - 1;
        this.createSteps(0, stop, base, "active");
        this.createSteps(stop, base.length, base, "error");
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
        this.createSteps(stop + 1, base.length, base, "warning");

      }
      if(data.status % 2 === 0){

        let stop = this.findIndex(data.status);
        
        this.createSteps(0, stop, base, "active");
        this.createSteps(stop, base.length, base, "warning");

      }
    }
  }

  createSteps(startIndex: number, endIndex: number, base: FileStatus[], classStep: string) {
    
    for(let i = startIndex; i < endIndex; i++){
      
      console.log(startIndex, endIndex);
      
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

  findIndex(status: number): number {

    let i = 0;
    let index = 0;
    console.log('data =>',
    status,
    );
    for (index; index < this.baseFileStatus.length; index++) {
      console.log(this.baseFileStatus[index],
        status);
      
      if(status < this.baseFileStatus[index].id){
        console.log('entra condición');
        
        break;
      }
    }

    return index;

  }

}
