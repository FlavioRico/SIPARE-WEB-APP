import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { SharedComponent } from '../shared/shared/shared.component';
import { FileStatus } from '../models/models-bitacora/fileStatus';
import { FileWorklog } from '../models/models-bitacora/fileWorklog';
import { BitacoraServiceService } from '../services/bitacora/bitacora-service.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss','../balance/balance-consar/balance-consar.component.scss']
})
export class BitacoraComponent implements OnInit {

  /*others*/
  shared = new SharedComponent();
  fechaCompleta = this.shared.getDateFormated();
  public loadComplete: boolean = false;

  fileName: String;
  statusFile: number;
  fileStatus: FileStatus[];
  fileWorklog: FileWorklog;
  baseFileStatus: FileStatus[];

  @ViewChild("stepLists") stepLi: ElementRef;
  
  constructor(
    private serviceFileStatus: BitacoraServiceService,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService) 
  {}
  
  ngOnInit(): void {
    this.spinner.show();
    this.serviceFileStatus.fileWorklog().subscribe(data => {
      if(data === null){
        this.fileName = 'Sin archivo del día actual.';
        this.spinner.hide(); 
        return;
      }else{
        this.serviceFileStatus.fileStatus().subscribe(data => {
          this.fileStatus = data;
          this.baseFileStatus = this.generateBaseSteps(this.baseFileStatus);
          this.verifyFinalStep(this.fileWorklog, this.baseFileStatus);
        });
        this.fileWorklog = data;
        
        this.fileName = this.fileWorklog.file_name;
        this.statusFile = this.fileWorklog.status;
      }
      this.spinner.hide();  
    });
  }

  generateBaseSteps(listFileStatusEmpity: FileStatus[]) {
    listFileStatusEmpity = this.fileStatus.filter(step => 
      (step.type) === ('SUCCESS')
  );

    return listFileStatusEmpity;
  }

  verifyFinalStep(data: FileWorklog, base: FileStatus[]){
    
    //Ruta completa
    if (data.status === 400) {
      this.createSteps(0, base.length, base, "active");
      return;
    }
    //Estatus no erroneo
    if (data.status%2 == 0) {
      let stop = data.status/100;
      this.createSteps(0, stop, base, "active");
      this.createSteps(stop, base.length, base, "noActive");
      return;
    }
    //Estatus erroneo
    if (data.status%2 != 0) {
      let stop = Math.floor(data.status/100);
      this.createSteps(0, stop - 1, base, "active");
      this.createSteps(stop, stop + 1, base, "noActive");
      return;
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