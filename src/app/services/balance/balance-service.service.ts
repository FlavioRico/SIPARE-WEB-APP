import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Balance } from 'src/app/models/models-balance/balance';

@Injectable({
  providedIn: 'root'
})
export class BalanceServiceService {

  constructor(private hhtp:HttpClient) { }

  //urlBalanceCONSAR = 'http://localhost:8765/sipare-retrieve-consar-balance/balances?type=CONSAR';
  urlBalanceCONSAR = 'http://localhost:8765/sipare-retrieve-consar-balance/balances?date=2020-09-01&type=CONSAR';
  urlBalancePROCESAR = 'http://localhost:8083/balances?type=PROCESAR';

  retrieveBalanceCONSAR(){
    return this.hhtp.get<Balance>(this.urlBalanceCONSAR);
  }

  retrieveBalancePROCESAR(){
    return this.hhtp.get<Balance>(this.urlBalancePROCESAR);
  }

}