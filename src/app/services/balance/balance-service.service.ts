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

  // urlBalancePROCESAR = 'http://10.160.14.213:8081/sipare-retrieve-consar-balance/balances?type=CONSAR';
  // urlBalanceCONSAR = 'http://10.160.14.213:8081/sipare-retrieve-consar-balance/balances?type=CONSAR';
  // urlAproveBalancePROCESAR = 'http://10.160.14.213:8081/sipare-approve-balance/balances';
  
  // urlBalanceCONSAR = 'http://localhost:8765/sipare-retrieve-consar-balance/balances?type=CONSAR';
  
  // urlBalancePROCESAR = 'http://10.160.188.123:8765/sipare-retrieve-balance/balances/findByTypeAndDate?type=PROCESAR';
  // urlAproveBalancePROCESAR = 'http://10.160.188.123:8765/sipare-approve-balance/balances';


  retrieveBalanceCONSAR(){

    return this.http.get<BalanceConsar>(environment.urlBalanceCONSAR);

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

    // let url_Liquidation = 'http://10.160.188.123:8765/sipare-procesar-liquidations/liquidations';

    return this.http.post<any>(environment.url_Liquidation, 
      { observe: 'response' }
    );
  
  }

  createPreNotice () {

    // let url_PreNotice = 'http://10.160.188.123:8765/sipare-procesar-pre-notice/preaviso';

    return this.http.post<any>(environment.url_PreNotice, 
      { observe: 'response' }
    );
  
  }

}