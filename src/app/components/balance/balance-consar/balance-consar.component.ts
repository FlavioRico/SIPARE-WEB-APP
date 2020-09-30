import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SharedComponent } from 'src/app/shared/shared/shared.component';
import { BalanceServiceService } from 'src/app/services/balance/balance-service.service';
import { BalanceConsar } from '../../models/models-balance/balance-consar';
import { Summary } from 'src/app/components/models/models-balance/summary';
import { Comparsion } from 'src/app/components/models/models-balance/comparison';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResourceBalance } from '../util/resource-balance';

@Component({
  selector: 'app-balance-consar',
  templateUrl: './balance-consar.component.html',
  styleUrls: ['./balance-consar.component.scss']
})

export class BalanceConsarComponent implements OnInit {

  /*Elementos del DOM a renderizar con Renderer2*/
  @ViewChild('msjValidacion') messageValidacion: ElementRef;
  @ViewChild('buttonValidacion') btnAutorizar: ElementRef;
  @ViewChild('iconVerifyACV') iconCompACV: ElementRef;
  @ViewChild('iconVerifyRCV') iconCompRCV: ElementRef;
  @ViewChild('iconVerifyTotal') iconCompTotal: ElementRef;
  // @ViewChild('fileName') nameFile: ElementRef;
  // iconos = [this.iconCompACV, this.iconCompRCV, this.iconCompTotal];

  /*Others*/
  shared = new SharedComponent();
  balance: BalanceConsar;
  fechaCompleta = this.shared.getDateFormated();
  public loadComplete: boolean = false;
  resourceBalance: ResourceBalance = new ResourceBalance(this.render);
  flagFilesNotFound: boolean = true;
  // fileName: String;

  /*Valores de la tabla SIN formato para PROCESAR*/
  valueRCV: number;
  valueIMSSACV: number;
  totalArchivo: number;
  valueT2RCV: number;
  valueT1RCV: number;
  totalAuxiliares: number;
  
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

  constructor(
    private render: Renderer2,
    private serviceBalance: BalanceServiceService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.serviceBalance.retrieveBalanceCONSAR().subscribe(
      data => {
        if(data === null){
          this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'none');
          alert('Sin archivos del día actual.');
          this.spinner.hide();  
        }else{
          this.balance = data;
          this.setT24Amounts(this.balance.t24_amounts);
          this.setFileAmounts(this.balance.file_amounts);
          this.format();
          let saldosEmpity = this.setMessageValidacion(
            this.balance.balanced,
            this.balance.t24_amounts,
            this.balance.status
          );
          if (!saldosEmpity){
            this.resourceBalance.validationChangeIcons(
              this.balance.comparison,
              this.iconCompACV, 
              this.iconCompRCV,
              this.iconCompTotal
            );
          }
        }
        this.spinner.hide();  
      }, error => {
        alert(`Error inesperado en los servicios. ${error.message}`);
        this.spinner.hide();  
      }
    );
  }

  /*Posibles a quedarse debido a la naturaleza de los componentes en Angular */
  setMessageValidacion (balanced: boolean, t24Amounts: Summary, status: number) {
    
    let saldosToday = t24Amounts.total;
    
    if (saldosToday === 0) {
      this.createMessage('alert-warning', 'Advertencia. No hay archivos de T-24 del día actual.');
      this.render.removeClass(this.btnAutorizar.nativeElement, 'btn-outline-success');
      this.render.addClass(this.btnAutorizar.nativeElement, 'btn-outline-dark');
      this.setIconsWarning();
      return 1;
    }
    
    if (!balanced || status === 201) {
      this.createMessage('alert-danger', 'Error. Inconsistencia en los saldos.');
      this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'none');
      return 0;
    }

    if (status === 203){
      this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'none');
      this.createMessage('alert-success', 'Autorización realizada.');
      return 0;
    }

    if (status != 200) {
      this.render.setStyle(this.btnAutorizar.nativeElement, 'display', 'none');
      return 0;
    }

    if (balanced && status === 200) {
      this.createMessage('alert-success', 'Los saldos cuadran correctamente.');
      return 0;
    }
  }

  createMessage (classMessage: string, textMessage: string) {
    this.render.addClass(
      this.messageValidacion.nativeElement,
      classMessage
    );
    const div = this.render.createElement('div');
    const textValid = this.render.createText(
      textMessage
    );
    this.render.appendChild(div, textValid);
    this.render.appendChild(
      this.messageValidacion.nativeElement, div
    );
  }

  setT24Amounts(t24Amounts: Summary) {
    this.valueT2RCV = t24Amounts.rcv;
    this.valueT1RCV = t24Amounts.vivienda_acv_imss;
    this.totalAuxiliares = t24Amounts.total;
  }

  setFileAmounts (fileAmounts: Summary) {
    this.valueRCV = fileAmounts.rcv;
    this.valueIMSSACV = fileAmounts.vivienda_acv_imss;
    this.totalArchivo = fileAmounts.total;
  }

  format() {
    this.RCVformated = this.shared.formatTable(this.valueRCV);
    this.T2RCVformated = this.shared.formatTable(this.valueT2RCV);
    this.IMSSACVformated = this.shared.formatTable(this.valueIMSSACV);
    this.T1ACVformated = this.shared.formatTable(this.valueT1RCV);
    this.totalArchivoformated = this.shared.formatTable(this.totalArchivo);
    this.totalAuxiliaresformated = this.shared.formatTable(this.totalAuxiliares);
  }
  
  setIconsWarning () {
    const iconos = [this.iconCompACV, this.iconCompRCV, this.iconCompTotal];
    const newIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-exclamation-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/> </svg>';
    for (let i = 0; i < iconos.length; i++) {
      this.render.removeClass(iconos[i].nativeElement, 'icon-verify-ok');
      this.render.removeClass(iconos[i].nativeElement, 'icon-verify-error');
      this.render.addClass(iconos[i].nativeElement, 'icon-verify-warning');
      this.render.setProperty(iconos[i].nativeElement, 'innerHTML', newIcon);
    }
  }  
  
}