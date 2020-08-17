import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {

  text1 = 'Generando contenido';
  text2 = 'Aprobación de contenido';
  text3 = 'Generando archivo';
  text4 = 'Archivo enviado';
  constructor() { }

  ngOnInit(): void {
  }

}

