import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Key } from './../../models/models-keys/Keys';
import { AcusesComponent } from './../../CONSAR/acuses/acuses.component';
import { ProcessFileService } from 'src/app/services/process-file/process-file.service';
import { KeysService } from 'src/app/services/CONSAR/keys/keys.service';

@Component({
  selector: 'app-monthly-keys',
  templateUrl: './monthly-keys.component.html',
  styleUrls: ['./monthly-keys.component.scss']
})
export class MonthlyKeysComponent extends AcusesComponent implements OnInit, AfterViewInit{

  keys: Key[];
  keysExists: boolean = false;

  constructor(
    public spinner: NgxSpinnerService,
    public processFileService: ProcessFileService,
    private keysService: KeysService){
      super(processFileService, spinner);
  }

  ngOnInit(): void {
    
    this.spinner.show();
    this.keysService.retrieveAllKeys().subscribe(

      data=>{
        let headers;
        const keys = data.headers.keys();
          headers = keys.map(key =>
            `${key}: ${data.headers.get(key)}`
        );
        
        if(data.status === 204){

          alert('No existe información para mostrar.');
          this.keysExists = false;
          this.spinner.hide();
        
        }else if(data.status === 200){

          this.keysExists = true;
          this.keys = data.body;

        }else {

          this.keysExists = false;
          alert('Ups... algo salió mal, por favor intente más tarde (retrieveAllKeys).');
          this.spinner.hide();

        }
        
      },error=>{

        this.keysExists = false;
        alert('Ups... algo salió mal, por favor intente más tarde (retrieveAllKeys).');
        this.spinner.hide();

      }

    );
  }

  ngAfterViewInit(): void{

    this.spinner.hide();

  }

}

