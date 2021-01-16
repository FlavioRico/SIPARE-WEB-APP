import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FileStatus } from '../../components/models/models-bitacora/fileStatus';
import { FileWorklog } from '../../components/models/models-bitacora/fileWorklog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitacoraServiceService {

  constructor(private http:HttpClient) { }

  teststatus = 'http://localhost:9092/status'
  testworklog = 'http://localhost:9097/worklogs'
  fileStatus(){    
    return this.http.get<FileStatus[]>(
      environment.urlFileStatus
    );
  }

  fileWorklog(){
    return this.http.get<FileWorklog>(
      environment.urlFileWorklog
    );
  }
}
