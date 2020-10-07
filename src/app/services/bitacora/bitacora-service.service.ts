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

  // urlFileStatus = 'http://10.160.14.213:8081/sipare-consar-file-status/status';
  // urlFileWorklog = 'http://10.160.14.213:8081/sipare-consar-file-worklog/worklogs/';
  
  // urlFileStatus = 'http://localhost:8765/sipare-consar-file-status/status';
  // urlFileWorklog = 'http://localhost:8765/sipare-consar-file-worklog/worklogs/';

  fileStatus(){    
    return this.http.get<FileStatus[]>(environment.urlFileStatus);
  }

  fileWorklog(){
    return this.http.get<FileWorklog>(environment.urlFileWorklog);
  }
}
