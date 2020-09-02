import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FileStatus } from '../../models/fileStatus';
import { FileWorklog } from '../../models/fileWorklog';

@Injectable({
  providedIn: 'root'
})
export class BitacoraServiceService {

  constructor(private http:HttpClient) { }

  urlFileStatus = 'http://localhost:8765/sipare-consar-file-status/status';
  //urlFileWorklog = 'http://localhost:8765/sipare-consar-file-worklog/worklogs/';
  urlFileWorklog = 'http://localhost:8765/sipare-consar-file-worklog/worklogs/2020-08-10';

  fileStatus(){    
    return this.http.get<FileStatus[]>(this.urlFileStatus);
  }

  fileWorklog(){
    return this.http.get<FileWorklog>(this.urlFileWorklog);
  }
}
