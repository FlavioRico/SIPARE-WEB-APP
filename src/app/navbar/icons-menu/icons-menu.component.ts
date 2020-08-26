import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons-menu',
  templateUrl: './icons-menu.component.html',
  styleUrls: ['./icons-menu.component.scss']
})
export class IconsMenuComponent implements OnInit {
  
  nameUser: string = 'Flavio';
  constructor() { }

  ngOnInit(): void {
  }

}
