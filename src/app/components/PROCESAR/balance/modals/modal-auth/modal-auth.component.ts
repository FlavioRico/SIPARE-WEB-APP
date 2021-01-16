import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.scss']
})
export class ModalAuthComponent implements OnInit {

  @Input() processAuth: boolean;
  @Input() processLiquidation: boolean;
  @Input() processPreNotice: boolean;
  @Input() dependency: string;

  public messageAuth: string;
  public messageLiquidation: string;
  public messagePreNotice: string;
  flagPROCESAR: boolean;
  flagCONSAR: boolean;

  constructor() { }

  ngOnInit(): void {
    
    this.verifyProcess();
  }

  verifyProcess(): void {
    
    // this.messageAuth = (this.processAuth === true) ? 'Autorización realizada con éxito.' : 'No se pudo realizar la autorización, intenta de nuevo o contacta a soporte.';
    // this.messageLiquidation = (this.processLiquidation === true) ? 'Liquidación realizada con éxito.' : 'No se pudo realizar la liquidación, intenta de nuevo o contacta a soporte.';
    // this.messagePreNotice = (this.processPreNotice === true) ? 'Pre aviso realizado con éxito.' : 'No se pudo realizar el pre aviso, intenta de nuevo o contacta a soporte.';
    if(this.dependency === 'PROCESAR'){
      this.flagPROCESAR = true;
    }else if(this.dependency === 'CONSAR'){
      this.flagCONSAR = true;
    }

  }

}
