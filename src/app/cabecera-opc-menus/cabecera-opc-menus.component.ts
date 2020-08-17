import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cabecera-opc-menus',
  templateUrl: './cabecera-opc-menus.component.html',
  styleUrls: ['./cabecera-opc-menus.component.scss']
})
export class CabeceraOpcMenusComponent implements OnInit {

  /*Variables necesarias para la fecha*/
  fecha = new Date();
  day: any;
  month: any;
  year: number;
  fechaCompleta: any;

  /*Variables para los datos variables de la cabecera*/
  @Input() dependencia: string;
  @Input() opcMenu: string;
  @Input() opcMenuShort: string;

  constructor() { }

  ngOnInit(): void {
    this.day = this.fecha.getDate();
    this.month  = this.fecha.getMonth() + 1;
    this.year  = this.fecha.getFullYear();
    this.month = this.formatDate(this.month);
    this.day = this.formatDate(this.day);
    this.fechaCompleta = this.year + '/' + this.month + '/' + this.day;
    this.defaultValues();
  }

  formatDate(val){
    if (val < 10) {
      val = '0' + val;
    }
    return val;
  }

  defaultValues(){
    this.dependencia = 'CONSAR';
    this.opcMenu = 'Conciliación de cifras';
    this.opcMenuShort = 'Balance';
  }

}
