import { Component, OnInit } from '@angular/core';
import { SharedComponent } from '../shared/shared/shared.component';
import { FileStatus } from '../models/fileStatus';
import { FileWorklog } from '../models/fileWorklog';
import { BitacoraServiceService } from '../services/bitacora/bitacora-service.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss','../balance/balance-consar/balance-consar.component.scss']
})
export class BitacoraComponent implements OnInit {
  shared = new SharedComponent();
  fechaCompleta = this.shared.getDateFormated();

  fileName: String;
  fileStatus: FileStatus[];
  fileWorklog: FileWorklog;
  baseFileStatus: FileStatus[];
  constructor(private serviceFileStatus: BitacoraServiceService) {}
  ngOnInit(): void {
    this.serviceFileStatus.fileStatus().subscribe(data => {
      this.fileStatus = data;
      this.generateBase();
    });

    this.serviceFileStatus.fileWorklog().subscribe(data => {
      if(data === null){
        this.fileName = 'Sin archivo del día actual.';
        console.log(this.fileName);
      }else{
        this.fileWorklog = data;
        this.fileName = this.fileWorklog.file_name;
        console.log('Debug', data);
      }
    });
  }

  generateBase() {
    this.baseFileStatus = this.fileStatus.filter(step => 
      (step.id%2) === (0)
    );
  }

}

