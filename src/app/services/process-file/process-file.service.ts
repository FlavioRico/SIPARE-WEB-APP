import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataTypeOperation } from '../../components/models/models-parameters/dataTypeOperation';
import { TypeTransaction } from '../../components/models/models-parameters/typeTransaction';

@Injectable()
export class ProcessFileService {

  constructor(public http: HttpClient) { }

	getFilesRiceibingToProcesar() : Observable<any>{
    var pagedRequestDTO = {
      firstResult : 0,
      pageSize : 7
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.genetateListAllFilesUrl), JSON.stringify(pagedRequestDTO), 
        	{headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  editFile(content : string, name : string) : Observable<any>{
    var dto = {
      file : name,
      content : content
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.editFiletUrl), JSON.stringify(dto), 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  trxReprocess(oid: number) : Observable<any>{
    var DTO = {
      oidTransactionInfo : oid
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.trxReProcessUrl), JSON.stringify(DTO), 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

   trxReprocessTomorrow(oid: number) : Observable<any>{
    var DTO = {
      oid : oid
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.trxReProcessProgrammedUrl), JSON.stringify(DTO), 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  sendTransactionWS() : Observable<any>{
    var dto = {
      type : 'T+1'
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.paymentTransactionAndSendNotificationURL), JSON.stringify(dto), 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  searchBankReceptorByCode(codeBank : string) : Observable<any>{
    var dto = {
      code : codeBank
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.getBankByCodeUrl), JSON.stringify(dto), 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  } 

  validFile(name : string) : Observable<any>{
    var dto = {
      file : name
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.validTwoFileUrl), JSON.stringify(dto), 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  getDataTransactionT1() : Observable<any>{
    var dto = {
      typeTransaction : 'T+1'
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.getParameterByTypeTransactionURL), JSON.stringify(dto), 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  getDataTransactionT2() : Observable<any>{
    var dto = {
      typeTransaction : 'T+2'
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.getParameterByTypeTransactionURL), JSON.stringify(dto), 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  addParameter(ngTypeOperation : string, ngPlace : string, ngFolio : string, ngCodeBank : string,
        ngAccount : string,ngKeyEntity : string,ngTxt : string) : Observable<any>{

    console.log('se recibe esto en ngTypeOperation => ',ngTypeOperation);

    var dto = {
      trxType : ngTypeOperation == '1' ? 'T+1' : 'T+2',
      typeOperation : ngTypeOperation,
      place :ngPlace,
      folio : ngFolio,
      codeBank : ngCodeBank,
      account : ngAccount,
      codeBankRecep : ngKeyEntity,
      txt : ngTxt
    };
    
    console.log('Esto vamos a enviar al servicio POST =>' , dto);
    
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.addParameterBackOfficeUrl), JSON.stringify(dto), 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  updateRegistryResp(dataResp : any) : Observable<any>{
    var dto = {
      datePayment : dataResp.datePayment,
      placeOffice : dataResp.placeOffice,
      oid : dataResp.oid,
      cajero : dataResp.cajero,
      line : dataResp.line,
      patronRegistry : dataResp.patronRegistry,
      nameBussines : dataResp.nameBussines,
      formatPayment : dataResp.formatPayment,
      telephone : dataResp.telephone,
      clientOrUser : dataResp.clientOrUser,
      nameContact : dataResp.nameContact,
      lines : dataResp.lines,
      email : dataResp.email,
      accountNumber : dataResp.accountNumber,
      nameClient : dataResp.nameClient,
      importImss : dataResp.importImss,
      importAp : dataResp.importAp,
      importAcv : dataResp.importAcv,
      importTotal : dataResp.importTotal,
      importRcv : dataResp.importRcv,
      respProcesar : dataResp.respProcesar,
      resp1 : dataResp.resp1,
      resp2 : dataResp.resp2,
      resp3 : dataResp.resp3
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.updateRegistryRespUrl), JSON.stringify(dto), 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  getFilesRiceibingToProcesarByDateRange(startDate : Date, endDate : Date) : Observable<any>{
    var dto = {
      startDate : startDate,
      endDate : endDate
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.genetateListAllFilesByDateRangeUrl), JSON.stringify(dto), 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  exportDataInFileXls(startDate : Date, endDate : Date) : Observable<any>{
    var exportDto = {
      typeExport : 'EPFMP',
      startDate : startDate,
      endDate : endDate
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.genetateListXlsUrl), exportDto, 
          {responseType : 'arraybuffer'});
  }

  sendFileToConnectDirectValidattedFile(fileName : string) : Observable<any>{
    var fileDTO = {
      fileName : fileName,
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.sendValidatedFileToPROCESAR), fileDTO, 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  getContentFileEdit(fileName : string) : Observable<any>{
    var fileDTO = {
      fileName : fileName,
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.getContentFileEditUrl), fileDTO, 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  exportDataConciliationXLS() : Observable<any>{
    var exportDto = {
      typeExport : 'CNN'
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.genetateListXLSConciliationUrl), exportDto, 
          {responseType : 'arraybuffer'});
  }

  exportDataInFileXlsDefault() : Observable<any>{
    var exportDto = {
      typeExport : 'EPFMP'
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.genetateListXlsUrl), exportDto, 
          {responseType : 'arraybuffer'});
  }

   exportDataInFileT24XlsDefault() : Observable<any>{
    var exportDto = {
      typeExport : 'ECR'
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.genetateListXlsUrl), exportDto, 
          {responseType : 'arraybuffer'});
  }

  exportDataInFileT24Xls(startDate : Date, endDate : Date) : Observable<any>{
    var exportDto = {
      typeExport : 'ECR',
      startDate : startDate,
      endDate : endDate
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.genetateListXlsUrl), exportDto, 
          {responseType : 'arraybuffer'});
  }

  exportDataInFileProcesarXls() : Observable<any>{
    var exportDto = {
      typeExport : 'SENDF'
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.genetateListXlsUrl), exportDto, 
          {responseType : 'arraybuffer'});
  }

  getFilesRiceibingToT24() : Observable<any>{
    var pagedRequestDTO = {
      firstResult : 0,
      pageSize : 7
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.genetateListAllFilesToT24Url), 
      JSON.stringify(pagedRequestDTO), {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  getFilesRiceibingToT24ByDateRange(startDate : Date, endDate : Date) : Observable<any>{
    var dto = {
      startDate : startDate,
      endDate : endDate
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.genetateListAllFilesToT2ByDateRange4Url), JSON.stringify(dto), 
          {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  detailFileT24(oid: number) : Observable<any>{
    var DTO = {
      oid : oid,
      firstResult : 0,
      pageSize : 10
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.getContentByFileT24Url), JSON.stringify(DTO), 
       {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  getBalanceT24() : Observable<any>{
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.getBalanceT24Url), 
      {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  sendFileToConnectDirect(username : string) : Observable<any>{
    var request = {
      username : username
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.sendFileToConnectDirectUrl), 
      JSON.stringify(request), {headers: new HttpHeaders().set(environment.contentType,environment.appJson)})
  }

  getFilesToSendToConnectDirect() : Observable<any>{
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.getListFilesToSendConnectDirectUrl), 
      {headers: new HttpHeaders().set(environment.contentType,environment.appJson)})
  }

  getListTrxsFailedService() : Observable<any>{
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.listTrxsFailedURL), 
      {headers: new HttpHeaders().set(environment.contentType,environment.appJson)})
  }

  getContentFileToSendConnectDirect(oid : number) : Observable<any>{
    var oidDto = {
      oid : oid
    };
      return this.http.post(environment.sipare_ms_processFile_url.concat(environment.getContentFileToSendConnectDirectUrl), 
        JSON.stringify(oidDto), {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  sendFilesToPathCd(files : any) : Observable<any>{
    var dto = {
      listFiles : files
    };
      return this.http.post(environment.sipare_ms_processFile_url.concat(environment.filesToSendCdUrl), 
        JSON.stringify(dto), {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  searchFilesToSendCdService() : Observable <any> {
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.searchFileToSendCdUrl), 
      {headers: new HttpHeaders().set(environment.contentType,environment.appJson)})
  }

  searchFilesToValidService() : Observable <any> {
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.searchFileToValidUrl), 
      {headers: new HttpHeaders().set(environment.contentType,environment.appJson)})
  }

  searchFilesToFileT24RespProcesarService(oid : number, status : string) : Observable <any> {
    var dto = {
      code : status,
      oid : oid
    };
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.getRespProcesarUrl), 
      JSON.stringify(dto), {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  getLastFileToResponseProcesarService() : Observable <any> {
    return this.http.post(environment.sipare_ms_processFile_url.concat(environment.getLastFileRespToProcesarUrl), 
      {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }

  getContentDataT24ByResponseProcesar(oid : number) : Observable<any>{
    var oidDto = {
      oid : oid
    };
      return this.http.post(environment.sipare_ms_processFile_url.concat(environment.getDataByLineCaptureByRespProcesarUrl), 
        JSON.stringify(oidDto), {headers: new HttpHeaders().set(environment.contentType,environment.appJson)});
  }
  
  // this
  getDataForInitParameters(operationType: TypeTransaction){
    console.log('en get data me dieron => ', operationType.typeTransaction);
    
    if(operationType.typeTransaction === '116027' || operationType.typeTransaction === 'T+1'){
      operationType.typeTransaction = 'T+1';
    }else{
      operationType.typeTransaction = 'T+2';
    }
    console.log('Transformé en => ', operationType.typeTransaction);
    
    return this.http.post<DataTypeOperation>(environment.sipare_ms_parameters_by_type_transaction, operationType);
  }
}
