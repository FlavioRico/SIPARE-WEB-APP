import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  nameUser: string = 'Flavio';
  dependencia: string;
  opcMenu: string;
  opcMenuShort: string;

  @Output() dependenciaClicked: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

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
  opcConsarConciliacionPROCESAR(){
    this.dependencia = 'PROCESAR';
    this.opcMenu = 'Conciliación de cifras';
    this.opcMenuShort = 'Balance';
    console.log('balance procesar');
    this.dependenciaClicked.emit(this.dependencia);
  }
}
