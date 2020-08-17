import { Component, OnInit } from '@angular/core';

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
  constructor() {
  }

  ngOnInit(): void {

  }

  opcConsarConciliacion(){
    this.dependencia = 'CONSAR';
    this.opcMenu = 'Conciliación de cifras';
    this.opcMenuShort = 'Balance';
    console.log('entra');

  }
  opcConsarBitacora(){
    this.dependencia = 'CONSAR';
    this.opcMenu = 'Bitácora de Archivos';
    this.opcMenuShort = 'Bitácora';
  }
}
