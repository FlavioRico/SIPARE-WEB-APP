import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shared',
  template: '',
})
export class SharedComponent implements OnInit {

  /*Variables necesarias para la fecha*/
  fecha = new Date();
  day: any;
  month: any;
  year: number;
  fechaCompleta: any;

  constructor() { }

  ngOnInit(): void {
  }

  formatDate(val){
    if (val < 10) {
      val = '0' + val;
    }
    return val;
  }

  getDateFormated(){
    this.day = this.fecha.getDate();
    this.month  = this.fecha.getMonth() + 1;
    this.year  = this.fecha.getFullYear();
    this.month = this.formatDate(this.month);
    this.day = this.formatDate(this.day);
    this.fechaCompleta = this.day + '/' + this.month + '/' + this.year;

    return this.fechaCompleta;
  }

  getDateFormated2(){
    this.day = this.fecha.getDate();
    this.month  = this.fecha.getMonth() + 1;
    this.year  = this.fecha.getFullYear();
    this.month = this.formatDate(this.month);
    this.day = this.formatDate(this.day);
    this.fechaCompleta = this.year + '-' + this.month + '-' + this.day;

    return this.fechaCompleta;
  }

  formatTable(valTable){
    return ('$' + new Intl.NumberFormat('en-US').format(valTable));
  }
  
}
