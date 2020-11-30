import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-icons-menu',
  templateUrl: './icons-menu.component.html',
  styleUrls: ['./icons-menu.component.scss']
})
export class IconsMenuComponent implements OnInit {
  
  public isLogin : boolean;
  nameUser: string = '';
  constructor(public authServ : AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    this.nameUser = localStorage.getItem('username');
  }

  onClickLogout(){
    this.authServ.logoutService(localStorage.getItem('username')).subscribe(
        result => {           
          if(result.resultCode == 0){
            this.isLogin=false;
            this.router.navigate(['/']);
            localStorage.clear();
          }
        },error => {
          alert('Ups... algo salió mal, por favor intente más tarde (LogOut).');
        }
      );
  }

}
