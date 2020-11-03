import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
// import { DatepickerOptions } from 'ng2-datepicker';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public envName = environment.name;
  // nameUser: string;
  // password: string;
  // route: string;

  public userName : string;
	public password : string;
  public errorCode : string;
  public isError : boolean;
  public errorMsj : string;
  public dateRange : any;

  // options: DatepickerOptions = {
  //   minYear: 2010,
  //   maxYear: 2030,
  //   displayFormat: 'MMM D[,] YYYY',
  //   barTitleFormat: 'MMMM YYYY',
  //   dayNamesFormat: 'dd',
  //   firstCalendarDay: 0, // 0 - Sunday, 1 - Monday

  //   minDate: new Date(Date.now()), // Minimal selectable date
  //   maxDate: new Date(Date.now()),  // Maximal selectable date
  //   barTitleIfEmpty: '',
  //   placeholder: '', // HTML input placeholder attribute (default: '')
  //   addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
  //   addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
  //   fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
  //   useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  // };

  constructor(public authServ : AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  onSubmitLogin(){
    this.isError= false;
	  this.authServ.loginService(this.userName, this.password).subscribe(
      result => {     
        console.log('this', result);
        
        if(result.resultCode == 0){
          localStorage.setItem('user', result.nameUser);
          localStorage.setItem('pass', this.password);
          localStorage.setItem('username', this.userName);
          localStorage.setItem('sessionId', result.sessionId);
          this.router.navigate(['/menu']);
          this.router.navigate(['/balanceProcesar']);
        }else if(result.resultCode == 'USER-NOT-FOUND'){
          this.isError= true;
          this.errorCode = result.resultCode;
          this.errorMsj = result.resultDescription;
          this.userName = '';
          this.password = '';
        }
      },error => {
          this.router.navigate(['/']);
          this.userName = '';
          this.password = '';
          this.isError= true;
          this.errorCode = 'ERR-SRV';
          this.errorMsj = 'Servicio no se encuentra disponible por el momento.';
      }
    );
    console.log('deb', this.userName, this.password);    
	}

}
