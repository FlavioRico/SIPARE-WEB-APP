import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BalanceConsar } from 'src/app/components/models/models-balance/balance-consar';
import { BalanceProcesar } from 'src/app/components/models/models-balance/balance-procesar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceServiceService {

  constructor(private http:HttpClient) { }

  // urlBalancePROCESAR = 'http://10.160.14.213:8081/sipare-retrieve-consar-balance/balances?type=CONSAR';
  // urlBalanceCONSAR = 'http://10.160.14.213:8081/sipare-retrieve-consar-balance/balances?type=CONSAR';
  // urlAproveBalancePROCESAR = 'http://10.160.14.213:8081/sipare-approve-balance/balances';
  
  urlBalanceCONSAR = 'http://localhost:8765/sipare-retrieve-consar-balance/balances?type=CONSAR';
  
  urlBalancePROCESAR = 'http://10.160.188.123:8765/sipare-retrieve-balance/balances/findByTypeAndDate?type=PROCESAR';
  urlAproveBalancePROCESAR = 'http://10.160.188.123:8765/sipare-approve-balance/balances';


  retrieveBalanceCONSAR(){
    return this.http.get<BalanceConsar>(this.urlBalanceCONSAR);
  }

  retrieveBalancePROCESAR(){
    return this.http.get<BalanceProcesar>(this.urlBalancePROCESAR);
  }

  configUrl = 'assets/config.json';
  getConfigResponse(): Observable<HttpResponse<any>> {
    return this.http.get(
      this.configUrl, { observe: 'response' });
  }

  aproveBalancePROCESAR(balance: BalanceProcesar){
    balance.status = 203;
    balance.approved_by = localStorage.getItem('username');
    console.log(balance);
    return this.http.put<BalanceProcesar>(this.urlAproveBalancePROCESAR, balance);
  }

}