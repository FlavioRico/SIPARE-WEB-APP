import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SharedComponent } from 'src/app/shared/shared/shared.component';

@Component({
  selector: 'app-balance-procesar',
  templateUrl: './balance-procesar.component.html',
  styleUrls: ['../balance-consar/balance-consar.component.scss']
})
export class BalanceProcesarComponent implements OnInit {

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
    this.RCVformated = this.formatTable(this.valueRCV);
    this.T2RCVformated = this.formatTable(this.valueT2RCV);
    this.IMSSACVformated = this.formatTable(this.valueIMSSACV);
    this.T1ACVformated = this.formatTable(this.valueT1RCV);
    this.totalArchivoformated = this.formatTable(this.totalArchivo);
    this.totalAuxiliaresformated = this.formatTable(this.totalAuxiliares);
  }

  authSucess(element: ElementRef) {
    this.render.setStyle(element.nativeElement, 'display', 'none');
    this.render.setProperty(this.messageValidacion.nativeElement, 'innerHTML',
    'Autorización realizada');
  }
  formatTable(valTable){
    return ('$' + new Intl.NumberFormat('en-US').format(valTable));
  }
  validaSaldos(){

  }

  ngOnInit(): void {
  }

}
