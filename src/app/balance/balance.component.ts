import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';

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

  /*Para la selección de la dependencia en el menú*/
  @Input() dependencia: string;

  /*Valores de la tabla sin formato para PROCESAR*/
  valueRCV: number;
  valueIMSSACV: number;
  valueT2RCV: number;
  valueT1RCV: number;
  totalAuxiliares: number;
  totalArchivo: number;

  /*Bandera para detectar si no hay archivos T24 del día actual*/
  conditionSaldosEmpty: boolean;

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
    this.dependencia = 'CONSAR';
    this.selectDependencia(this.dependencia);
    console.log('BANDERA: ', this.conditionSaldosEmpty);
  }

  ngOnInit(): void {
    this.reloadDataTable(this.valueRCV, this.valueT2RCV, this.valueIMSSACV, this.valueT1RCV, this.totalArchivo, this.totalAuxiliares);
  }

  ngAfterViewInit(){
    // this.validaSaldos();
  }

  formatTable(valTable){
    return ('$' + new Intl.NumberFormat('en-US').format(valTable));
  }

  /*Dependiendo de la selección en el menú se van a tomar los valores de una u otra forma
  debido a esto se repite la asignación pero se ahorra el dupicado del componente.*/
  selectDependencia(dependencia: string){
    if (dependencia === 'CONSAR'){
      console.log('checamos' + dependencia);
      this.valueRCV = 12324.50;
      this.valueIMSSACV = 123246.75;
      this.valueT2RCV = 12324.50;
      this.valueT1RCV = 123246.75;
      this.totalArchivo = this.valueRCV + this.valueIMSSACV;
      this.totalAuxiliares = this.valueT2RCV + this.valueT1RCV;
      console.log('totales CONSAR', this.totalArchivo, this.totalAuxiliares);
      // this.reloadDataTable();
    }else if (dependencia === 'PROCESAR'){
      console.log('checamos' + dependencia);
      this.valueRCV = 505.17;
      this.valueIMSSACV = 4897.89;
      this.valueT2RCV = 505.17;
      this.valueT1RCV = 4897.89;
      // this.valueRCV = 0;
      // this.valueIMSSACV = 0;
      // this.valueT2RCV = 0;
      // this.valueT1RCV = 0;
      this.totalArchivo = this.valueRCV + this.valueIMSSACV;
      this.totalAuxiliares = this.valueT2RCV + this.valueT1RCV;
      console.log('totales PROCESAR', this.totalArchivo, this.totalAuxiliares);
    }
    // this.reloadDataTable();
  }

  validaSaldos(){
    console.log('recibo estos totales:', this.totalArchivo, this.totalAuxiliares);
    this.conditionSaldosEmpty = (this.valueT2RCV === 0 && this.valueT1RCV === 0 && this.totalAuxiliares === 0);
    if (this.totalArchivo !== this.totalAuxiliares){
      this.render.removeClass(this.messageValidacion.nativeElement, 'alert-success');
      this.render.addClass(this.messageValidacion.nativeElement, 'alert-danger');
      this.removeElement(this.btnAutorizar);
      let classIcon = 'icon-verify-error';
      let newIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/> <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/></svg>';

      let iconos = [this.iconComp1, this.iconComp2, this.iconComp3];
      this.changeIcons(iconos, classIcon, newIcon);

      this.render.setProperty(this.messageValidacion.nativeElement, 'innerHTML', 'Error. Inconsistencia en saldos del balance.');

    }else if (this.conditionSaldosEmpty){
      this.render.removeClass(this.messageValidacion.nativeElement, 'alert-success');
      this.render.addClass(this.messageValidacion.nativeElement, 'alert-warning');
      this.removeElement(this.btnAutorizar);

      let iconos = [this.iconComp1, this.iconComp2, this.iconComp3];
      let classIcon = 'icon-verify-warning';
      let newIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-exclamation-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/> </svg>';

      this.changeIcons(iconos, classIcon, newIcon);

      this.render.setProperty(this.messageValidacion.nativeElement, 'innerHTML', 'Advertencia. No hay archivos de T-24 del día actual.');

    }else if(this.totalArchivo === this.totalAuxiliares) {
      if (this.messageValidacion === undefined) { }
      else {
        this.render.removeClass(this.messageValidacion.nativeElement, 'alert-danger');
        this.render.removeClass(this.messageValidacion.nativeElement, 'alert-warning');
        this.render.addClass(this.messageValidacion.nativeElement, 'alert-success');
        let iconos = [this.iconComp1, this.iconComp2, this.iconComp3];
        let classIcon = 'icon-verify-ok';
        let newIcon = '<svg #iconVerify3 width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-check-circle icon-verify-ok" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/> </svg>';

        for (let i = 0; i < iconos.length; i++) {
          this.render.removeClass(iconos[i].nativeElement, 'icon-verify-warning');
          this.render.removeClass(iconos[i].nativeElement, 'icon-verify-error');
          this.render.addClass(iconos[i].nativeElement, classIcon);
          this.render.setProperty(iconos[i].nativeElement, 'innerHTML', newIcon);
        }
        this.render.setProperty(this.messageValidacion.nativeElement, 'innerHTML', 'Los saldos cuadran correctamente');
        console.log(this.btnAutorizar);
        this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'block');
        this.render.addClass(this.btnAutorizar.nativeElement, 'button-autorizar');
      }
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

  changeIcons(elements: ElementRef[], classIcon: string, newIcon: string){
    for (let i = 0; i < elements.length; i++) {
      this.render.removeClass(elements[i].nativeElement, 'icon-verify-ok');
      this.render.addClass(elements[i].nativeElement, classIcon);
      this.render.setProperty(elements[i].nativeElement, 'innerHTML', newIcon);
    }
  }

  reloadDataTable(valueRCV, valueT2RCV, valueIMSSACV, valueT1RCV, totalArchivo, totalAuxiliares){
      this.validaSaldos();
      console.log('valores: ', valueRCV, valueT2RCV, valueIMSSACV, valueT1RCV, totalArchivo, totalAuxiliares);

      this.RCVformated = this.formatTable(valueRCV);
      this.T2RCVformated = this.formatTable(valueT2RCV);
      this.IMSSACVformated = this.formatTable(valueIMSSACV);
      this.T1ACVformated = this.formatTable(valueT1RCV);
      this.totalArchivoformated = this.formatTable(totalArchivo);
      this.totalAuxiliaresformated = this.formatTable(totalAuxiliares);
  }
}
