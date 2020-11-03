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

  public messageAuth: string;
  public messageLiquidation: string;
  public messagePreNotice: string;

  constructor() { }

  ngOnInit(): void {
    console.log('recibo', this.processAuth, this.processLiquidation, this.processPreNotice);
    
    this.verifyProcess();
  }

  verifyProcess(): void {

    this.messageAuth = (this.processAuth === true) ? 'Autorización realizada con éxito.' : 'No se pudo realizar la autorización, intenta de nuevo o contacta a soporte.';
    this.messageLiquidation = (this.processLiquidation === true) ? 'Liquidación realizada con éxito.' : 'No se pudo realizar la liquidación, intenta de nuevo o contacta a soporte.';
    this.messagePreNotice = (this.processPreNotice === true) ? 'Pre aviso realizado con éxito.' : 'No se pudo realizar el pre aviso, intenta de nuevo o contacta a soporte.';

  }

}
