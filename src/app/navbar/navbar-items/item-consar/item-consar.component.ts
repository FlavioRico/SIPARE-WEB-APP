import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-consar',
  templateUrl: './item-consar.component.html',
  styleUrls: ['../item-procesar/item-procesar.component.scss']
})
export class ItemCONSARComponent implements OnInit {

  dependencia: string;
  opcMenu: string;
  opcMenuShort: string;
  @Output() dependenciaClicked: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  opcConsarConciliacionCONSAR(){
    this.dependencia = 'CONSAR';
    this.opcMenu = 'Conciliación de cifras';
    this.opcMenuShort = 'Balance';
    console.log('balance consar');
    this.dependenciaClicked.emit(this.dependencia);
  }
  opcConsarBitacoraCONSAR(){
    this.dependencia = 'CONSAR';
    this.opcMenu = 'Bitácora de Archivos';
    this.opcMenuShort = 'Bitácora';
    console.log('bitacora consar');
  }

}
