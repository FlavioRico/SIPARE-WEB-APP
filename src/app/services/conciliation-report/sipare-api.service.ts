import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SipareApiService {

  constructor(public httpClient: HttpClient) { }

  retrieveSummaryReportByDate(
    startDate : string,
    endDate : string, 
    concept : string ) : Observable<any> {

      var searchByDate = {
        
        start_date : startDate,
        end_date : endDate,
        date_type : concept

      };

      return this.httpClient.post(
        environment.sipare_api.concat(environment.generateSummaryReportByDate),
        JSON.stringify(searchByDate),
        {headers: new HttpHeaders().set(environment.contentType,environment.appJson)}
      );
  }

  retrieveSummaryReportByMonth(
    month : number,
    concept : string ) : Observable<any> {  

    var searchByMonth = {
      
      month : month,
      date_type : concept

    };

    return this.httpClient.post(
      environment.sipare_api.concat(environment.generateSummaryReportByMonth),
      JSON.stringify(searchByMonth),
      {headers: new HttpHeaders().set(environment.contentType,environment.appJson)}
    );
  }  
}
