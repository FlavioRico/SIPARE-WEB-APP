import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BalanceConsar } from 'src/app/components/models/models-balance/balance-consar';
import { BalanceProcesar } from 'src/app/components/models/models-balance/balance-procesar';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BalanceServiceService {

  constructor(private http:HttpClient) { }

  retrieveBalanceCONSAR(){

    return this.http.get<BalanceConsar>(
      environment.urlBalanceCONSAR,
      { observe : 'response'}
      );

  }

  retrieveBalancePROCESAR(){

    return this.http.get<BalanceProcesar>(environment.urlBalancePROCESAR);

  }

  configUrl = 'assets/config.json';
  getConfigResponse(): Observable<HttpResponse<any>> {

    return this.http.get(
      this.configUrl, { observe: 'response' }
    );

  }

  aproveBalancePROCESAR(balance: BalanceProcesar){

    balance.status = 203;
    balance.approved_by = localStorage.getItem('username');
    return this.http.put<BalanceProcesar>(environment.urlAproveBalancePROCESAR, balance);

  }

  createLiquidation () {

    return this.http.post<any>(environment.url_Liquidation, 
      { observe: 'response' }
    );
  
  }

  createPreNotice () {

    return this.http.post<any>(environment.url_PreNotice, 
      { observe: 'response' }
    );
  
  }

  sendTransactionNotifications(){
    return this.http.post<any>(
      environment.transactionNotifications,
      { observe: 'response'}
    );
  }

  validateWorkingDay() {
    return this.http.get<any>(
      environment.workingDate,
      { observe: 'response'}
    );
  }

  aproveBalanceCONSAR(balance: BalanceProcesar){

    balance.status = 203;
    balance.approved_by = localStorage.getItem('username');
    return this.http.put<BalanceProcesar>(environment.urlAproveBalanceCONSAR, balance);

  }

}