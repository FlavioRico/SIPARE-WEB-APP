import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BalanceConsar } from '../../models/models-balance/balance-consar';
import { BalanceProcesar } from 'src/app/models/models-balance/balance-procesar';

@Injectable({
  providedIn: 'root'
})
export class BalanceServiceService {

  constructor(private http:HttpClient) { }

  // urlBalancePROCESAR = 'http://10.160.14.213:8081/sipare-retrieve-consar-balance/balances?type=CONSAR';
  // urlBalanceCONSAR = 'http://10.160.14.213:8081/sipare-retrieve-consar-balance/balances?type=CONSAR';
  // urlAproveBalancePROCESAR = 'http://10.160.14.213:8081/sipare-approve-balance/balances';
  
  urlBalanceCONSAR = 'http://localhost:8765/sipare-retrieve-consar-balance/balances?type=CONSAR';
  urlBalancePROCESAR = 'http://localhost:8765/sipare-retrieve-balance/balances?type=PROCESAR';
  urlAproveBalancePROCESAR = 'http://localhost:8765/sipare-approve-balance/balances';


  retrieveBalanceCONSAR(){
    return this.http.get<BalanceConsar>(this.urlBalanceCONSAR);
  }

  retrieveBalancePROCESAR(){
    return this.http.get<BalanceProcesar>(this.urlBalancePROCESAR);
  }

  aproveBalancePROCESAR(balance: BalanceProcesar){
    balance.status = 203;
    console.log(balance);
    return this.http.put<BalanceProcesar>(this.urlAproveBalancePROCESAR, balance);
  }

}