import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {

  constructor(public http: HttpClient) { 
 
  }

  loginService(userName: string, password: string): Observable<any>{
  		let dto = {
  			username : userName,
  			password : password
  		};
        return this.http.post(environment.sipare_ms_authenticate_url.concat(environment.loginUrl), JSON.stringify(dto), 
        	{headers: new HttpHeaders().set('Content-Type','application/json')});
    }

    getUserByUserName(userName: string): Observable<any>{
      let dto = {
        username : userName
      };
      return this.http.post(environment.sipare_ms_authenticate_url.concat(environment.searchUserUrl), JSON.stringify(dto), 
          {headers: new HttpHeaders().set('Content-Type','application/json')});
    }

    getUserByUserNameWithSessionId(userName: string, id: string): Observable<any>{
      let dto = {
        username : userName,
        sessionId : id
      };
      return this.http.post(environment.sipare_ms_authenticate_url.concat(environment.searchUserUrl), JSON.stringify(dto), 
          {headers: new HttpHeaders().set('Content-Type','application/json')});
    }

    logoutService(userName: string): Observable<any>{
      let dto = {
        userName : userName
      };
        return this.http.post(environment.sipare_ms_authenticate_url.concat(environment.logoutUrl), JSON.stringify(dto), 
          {headers: new HttpHeaders().set('Content-Type','application/json')});
    }
    
}

