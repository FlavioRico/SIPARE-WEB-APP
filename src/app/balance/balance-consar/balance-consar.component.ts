import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SharedComponent } from 'src/app/shared/shared/shared.component';

@Component({
  selector: 'app-balance-consar',
  templateUrl: './balance-consar.component.html',
  styleUrls: ['./balance-consar.component.scss']
})
export class BalanceConsarComponent implements OnInit {

  @ViewChild('msjValidacion') messageValidacion: ElementRef;
  @ViewChild('buttonValidacion') btnAutorizar: ElementRef;
  shared = new SharedComponent();

  fechaCompleta = this.shared.getDateFormated();
  /*Valores de la tabla SIN formato para PROCESAR*/
  valueRCV: number;
  valueIMSSACV: number;
  valueT2RCV: number;
  valueT1RCV: number;
  totalAuxiliares: number;
  totalArchivo: number;
  /*Para el formato de tabla*/
  textRCV = 'RCV ';
  RCVformated: any;
  textT2RCV = 'T+2\nRCV ';
  T2RCVformated: any;
  textIMSSACV = 'IMSS\nACV ';
  IMSSACVformated: any;
  textT1ACV = 'T+1\nACV ';
  T1ACVformated: any;
  textTotal = 'TOTAL ';
  totalArchivoformated: any;
  totalAuxiliaresformated: any;

  constructor(private render: Renderer2) {
    this.RCVformated = this.shared.formatTable(this.valueRCV);
    this.T2RCVformated = this.shared.formatTable(this.valueT2RCV);
    this.IMSSACVformated = this.shared.formatTable(this.valueIMSSACV);
    this.T1ACVformated = this.shared.formatTable(this.valueT1RCV);
    this.totalArchivoformated = this.shared.formatTable(this.totalArchivo);
    this.totalAuxiliaresformated = this.shared.formatTable(this.totalAuxiliares);
  }

  ngOnInit(): void {
  }

  validaSaldos(){

  }

  authSucess() {
    this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'none');
    this.render.setProperty(this.messageValidacion.nativeElement, 'innerHTML',
    'Autorización realizada');
  }

}
