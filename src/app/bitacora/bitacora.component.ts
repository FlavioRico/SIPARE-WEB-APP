import { Component, OnInit } from '@angular/core';
import { SharedComponent } from '../shared/shared/shared.component';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss','../balance/balance-consar/balance-consar.component.scss']
})
export class BitacoraComponent implements OnInit {
  shared = new SharedComponent();

  fechaCompleta = this.shared.getDateFormated();
  text1 = 'Generando contenido';
  text2 = 'Aprobación de contenido';
  text3 = 'Generando archivo';
  text4 = 'Archivo enviado';

  steps = [this.text1, this.text2, this.text3, this.text4];
  constructor() { }

  ngOnInit(): void {
  }

}

