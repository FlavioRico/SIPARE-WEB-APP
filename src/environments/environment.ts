// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  name: 'oldDev',
  production: false,
  contentType : 'Content-Type',
  appJson : 'application/json', //8083 UAT - 8085 DEV
  sipare_ms_processFile_url :                'http://10.160.14.213:808/sipareMSProcessFileApp/multiva/sipare/',
  sipare_generate_processFile :              'http://10.160.14.213:8084/multiva/sipare/generateFileToPROCESAR',
  sipare_ms_authenticate_url : 'http://10.160.14.213:8081/sipareMSAuthenticationApp/multiva/sipare/', //este no cambia en ninguno
  sipare_ms_parameters_by_type_transaction : 'http://10.160.14.213:8083/sipareMSProcessFileApp/multiva/sipare/getParameterByTypeTransaction',
  sipare_ms_updateParameter_url : 'http://10.160.188.123:8765/sipare-backoffice-parameters/parameters',
  sipare_api : 'http://127.0.0.1:8765/api/v1/sipare/',
  //add
  addParameter: 'http://10.160.188.123:8765/sipare-procesar-parameters/parameters',
  addParameterT2: 'http://10.160.188.123:8765/sipare-procesar-pre-notice/preaviso',
  genetateListAllFilesUrl : 'genetateListAllFiles',
  genetateListAllFilesByDateRangeUrl : 'generateListAllFilesByDateRange',
  genetateListXlsUrl : 'genetateListXls',
  genetateListAllFilesToT24Url : 'genetateListAllFilesToT24',
  genetateListAllFilesToT2ByDateRange4Url : 'generateListAllFilesToT24ToRangeDate',
  getContentByFileT24Url : 'getContentByFileT24',
  getBalanceT24Url : 'getAccountBalanceT24',
  loginUrl : 'login',
  logoutUrl : 'logout',
  searchUserUrl : 'searchUser',
  sendFileToConnectDirectUrl : 'generateFileToPROCESAR',
  getListFilesToSendConnectDirectUrl : 'getContentByFileToSendProcesar',
  getContentFileToSendConnectDirectUrl : 'getContentFileToSendProcesar',
  searchFileToSendCdUrl : 'searchFileToSendCd',
  filesToSendCdUrl : 'filesToSendCd',
  getRespProcesarUrl : 'getContentDataFileT24WithRespProcesar',
  getLastFileRespToProcesarUrl : 'getLastFileRespToProcesar',
  getDataByLineCaptureByRespProcesarUrl : 'getDataByLineCaptureByRespProcesar',
  updateRegistryRespUrl : 'updateRegistryResp',
  genetateListXLSConciliationUrl : 'generateXLSConciliation',
  searchFileToValidUrl : 'searchFileToValid',
  sendValidatedFileToPROCESAR : 'sendValidatedFile',
  getContentFileEditUrl : 'getContentFile',
  editFiletUrl : 'editFile',
  validTwoFileUrl : 'validatedEditFile',
  addParameterBackOfficeUrl : 'addParametersBackOffice',
  getBankByCodeUrl : 'getBankByCode',
  getParameterByTypeTransactionURL : 'getParameterByTypeTransaction',
  paymentTransactionAndSendNotificationURL : 'paymentTransactionAndSendNotification',
  listTrxsFailedURL : 'getListTrxsFailed',
  trxReProcessUrl : 'paymentTransactionAndSendNotificationReProcess',
  trxReProcessProgrammedUrl : 'getUpdateDateProgrammedTrxsFailed',
  
  /* SIPARE REST API*/
  generateSummaryReportByDate : 'conciliation/daily/summaries',
  generateSummaryReportByMonth : 'conciliation/monthly/summaries',

  /*ADDs */
  //8766 DEV 8765 UAT EN LO DE NOSOTROS 
  urlBalanceCONSAR : 'http://localhost:8765/sipare-retrieve-consar-balance/balances?type=CONSAR',
  // urlBalancePROCESAR : 'http://10.160.188.123:8765/sipare-retrieve-balance/balances/findByTypeAndDate?type=PROCESAR',
  urlBalancePROCESAR : 'http://10.160.188.123:8765/sipare-retrieve-procesar-balance/balances/findByTypeAndDate?type=PROCESAR',
  urlAproveBalancePROCESAR : 'http://10.160.188.123:8765/sipare-approve-balance/balances',
  url_Liquidation : 'http://10.160.188.123:8765/sipare-procesar-liquidations/liquidations',
  url_PreNotice : 'http://10.160.188.123:8765/sipare-procesar-pre-notice/prenotices',
  urlFileStatus : 'http://localhost:8765/sipare-consar-file-status/status',
  urlFileWorklog : 'http://localhost:8765/sipare-consar-file-worklog/worklogs/',
  urlParameter1: 'http://10.160.188.123:8765/sipare-procesar-parameters/parameters/116027',
  urlParameter2: 'http://10.160.188.123:8765/sipare-procesar-parameters/parameters/116018',
  url_Get_Liquidation : 'http://10.160.188.123:8765/sipare-procesar-liquidations/liquidations/findByCurrentDate',
  url_Get_PreNotice : 'http://10.160.188.123:8765/sipare-procesar-pre-notice/prenotices/findByCurrentDate',
  url_Data_Complementary : 'http://localhost:9027/multiva/sipare/responseTypeCaptureLine',
  updateProgrammedDefault:        'http://localhost:9098/transactions?type=DEFAULT',
  updateProgrammedCron:           'http://localhost:9098/transactions?type=CRON',
  updateHourTansaction:           'http://10.160.188.123:8765/sipare-procesar-transactions/transactions?type=HOUR',
  verifyButtonTransaction: 'http://10.160.188.123:8765/sipare-procesar-transactions/transactions',
  transactionNotifications: 'http://10.160.14.213:8083/sipareMSProcessFileApp/multiva/sipare/transactionNotifications',
  datesCollectionReport : 'http://10.160.188.123:8765/sipare-procesar-retrieve-dates/dates/'
};
