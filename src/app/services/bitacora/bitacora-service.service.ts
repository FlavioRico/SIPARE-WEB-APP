import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FileStatus } from '../../models/models-bitacora/fileStatus';
import { FileWorklog } from '../../models/models-bitacora/fileWorklog';

@Injectable({
  providedIn: 'root'
})
export class BitacoraServiceService {

  constructor(private http:HttpClient) { }

  urlFileStatus = 'http://localhost:8765/sipare-consar-file-status/status';
  // urlFileWorklog = 'http://localhost:8765/sipare-consar-file-worklog/worklogs/';
  urlFileWorklog = 'http://localhost:8765/sipare-consar-file-worklog/worklogs/2020-10-08';
  // urlFileWorklog = 'http://localhost:8765/sipare-consar-file-worklog/worklogs/2020-09-01';

  fileStatus(){    
    return this.http.get<FileStatus[]>(this.urlFileStatus);
  }

  fileWorklog(){
    return this.http.get<FileWorklog>(this.urlFileWorklog);
  }
}
