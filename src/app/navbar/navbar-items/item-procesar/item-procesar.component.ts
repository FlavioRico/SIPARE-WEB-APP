import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-procesar',
  templateUrl: './item-procesar.component.html',
  styleUrls: ['./item-procesar.component.scss']
})
export class ItemPROCESARComponent implements OnInit {

  dependencia: string;
  opcMenu: string;
  opcMenuShort: string;
  @Output() dependenciaClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
