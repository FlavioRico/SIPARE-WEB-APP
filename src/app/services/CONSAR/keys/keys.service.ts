import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Key } from '../../../components/models/models-keys/Keys'

@Injectable({
  providedIn: 'root'
})
export class KeysService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllKeys(){

    return this.http.get<Key[]>(

      environment.getMonthlyKeys,
      { observe : 'response'}

    );

  }

}
