import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institucion-ordenante',
  templateUrl: './institucion-ordenante.component.html',
  styleUrls: ['./institucion-ordenante.component.scss']
})
export class InstitucionOrdenanteComponent implements OnInit {

  public tamMax: number;
  cuenta: number;
  constructor() { }

  ngOnInit(): void {
  }

  longitud(){
    let longCuenta = this.cuenta.toString().length;
    if (longCuenta > 16){
      alert('Limite de caracteres excedido');
    }else {
      console.log(longCuenta);
    }
  }

}