import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  /*Elementos del DOM a renderizar con Renderer2*/
  @ViewChild('iconVerify1') iconComp1: ElementRef;
  @ViewChild('iconVerify2') iconComp2: ElementRef;
  @ViewChild('iconVerify3') iconComp3: ElementRef;
  @ViewChild('buttonValidacion') btnAutorizar: ElementRef;
  @ViewChild('msjValidacion') messageValidacion: ElementRef;

  /*Valores de la tabla sin formato*/
  valueRCV = 12324.50;
  valueIMSSACV = 123246.75;
  valueT2RCV = 12324.50;
  valueT1RCV = 123246.75;
  totalArchivo = this.valueRCV + this.valueIMSSACV;
  totalAuxiliares = this.valueT2RCV + this.valueT1RCV;

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

  constructor(private render: Renderer2) {}

  ngOnInit(): void {
    this.RCVformated = this.formatTable(this.valueRCV);
    this.T2RCVformated = this.formatTable(this.valueT2RCV);
    this.IMSSACVformated = this.formatTable(this.valueIMSSACV);
    this.T1ACVformated = this.formatTable(this.valueT1RCV);
    this.totalArchivoformated = this.formatTable(this.totalArchivo);
    this.totalAuxiliaresformated = this.formatTable(this.totalAuxiliares);
  }

  ngAfterViewInit(){
    this.validaSaldos();
  }

  formatTable(valTable){
    return ('$' + new Intl.NumberFormat("en-US").format(valTable));
  }

  validaSaldos(){
    if (this.totalArchivo !== this.totalAuxiliares){
      this.render.removeClass(this.messageValidacion.nativeElement, 'alert-success');
      this.render.addClass(this.messageValidacion.nativeElement, 'alert-danger');
      this.removeElement(this.btnAutorizar);

      let iconos = [this.iconComp1, this.iconComp2, this.iconComp3];
      this.changeIcons(iconos);

      this.render.setProperty(this.messageValidacion.nativeElement, 'innerHTML', 'Error. Inconsistencia en saldos del balance.');
    }
  }

  removeElement(element: ElementRef){
    this.render.setStyle(element.nativeElement, 'display', 'none');
  }

  authSucess(element: ElementRef) {
    this.render.setStyle(element.nativeElement, 'display', 'none');
    this.render.setProperty(this.messageValidacion.nativeElement, 'innerHTML',
    'Autorización realizada');
  }

  changeIcons(elements: ElementRef[]){
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {
      this.render.removeClass(elements[i].nativeElement, 'icon-verify-ok');
      this.render.addClass(elements[i].nativeElement, 'icon-verify-error');
      this.render.setProperty(elements[i].nativeElement, 'innerHTML',
      '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/> <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/></svg>'
      );
    }
  }

}
