import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  @ViewChild('iconVerify1') iconComp1: ElementRef;
  @ViewChild('iconVerify2') iconComp2: ElementRef;
  @ViewChild('iconVerify3') iconComp3: ElementRef;
  @ViewChild('buttonValidacion') btnAutorizar: ElementRef;
  @ViewChild('msjValidacion') messageValidacion: ElementRef;

  /*Variables necesarias para la fecha*/
  fecha = new Date();
  day: any;
  month: any;
  year: number;
  fechaCompleta: any;

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

  /*Para condicionar el color*/
  flagBalance = true;

  constructor(private render: Renderer2) {

    this.day = this.fecha.getDate();
    this.month  = this.fecha.getMonth() + 1;
    this.year  = this.fecha.getFullYear();

    this.month = this.format(this.month);
    this.day = this.format(this.day);

    this.fechaCompleta = this.year + '/' + this.month + '/' + this.day;
    this.RCVformated = this.formatTable(this.textRCV, this.valueRCV);
    this.T2RCVformated = this.formatTable(this.textT2RCV, this.valueT2RCV);
    this.IMSSACVformated = this.formatTable(this.textIMSSACV, this.valueIMSSACV);
    this.T1ACVformated = this.formatTable(this.textT1ACV, this.valueT1RCV);
    this.totalArchivoformated = this.formatTable(this.textTotal, this.totalArchivo);
    this.totalAuxiliaresformated = this.formatTable(this.textTotal, this.totalAuxiliares);
    this.addClassVerify(this.flagBalance);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.validaSaldos();
  }

  format(val){
    if (val < 10) {
      val = '0' + val;
    }
    return val;
  }

  formatTable(textBefore, valTable){
    return textBefore + valTable;
  }

  addClassVerify(flagVerify){
    if(flagVerify){
      // this.render.addClass(this.iconMod.nativeElement, "icon-verify-ok");
    }else{
      console.log('false');
    }
  }

  validaSaldos(){

    if (this.totalArchivo !== this.totalAuxiliares){

      this.render.removeClass(this.messageValidacion.nativeElement, 'alert-success');
      this.render.addClass(this.messageValidacion.nativeElement, 'alert-danger');
      this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'none');

      let iconos = [this.iconComp1, this.iconComp2, this.iconComp3];
      // tslint:disable-next-line: prefer-for-of
      // for (let i = 0; i < iconos.length; i ++){
      //   this.render.removeClass(iconos[i].nativeElement, 'icon-verify-ok');
      //   this.render.addClass(iconos[i].nativeElement, 'icon-verify-error');
      // }

      const parent = this.messageValidacion.nativeElement;
      const child1 = this.iconComp1.nativeElement;
      const child2 = this.iconComp2.nativeElement;
      const child3 = this.iconComp3.nativeElement;
      let arrElements = [child1, child2, child3];

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < arrElements.length; i++){
        this.render.appendChild(parent, arrElements[i]);
        this.render.removeChild(parent, arrElements[i]);
      }
    }
  }

}
