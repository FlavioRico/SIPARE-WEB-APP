export const environment = {
    production: false,
    name: 'UAT',
    // baseUrl: 'http://10.160.14.213:8083/sipareMSProcessFileApp/',

    //8083 UAT <-> 8085 DEV
    contentType :   'Content-Type',
    appJson :       'application/json',

    //YAXCHE
    sipare_ms_processFile_url :                'http://10.160.14.213:8083/sipareMSProcessFileApp/multiva/sipare/',
    //Servicio de Angel
    sipare_generate_processFile :              'http://10.160.14.213:8084/multiva/sipare/generateFileToPROCESAR',
    // sipare_generate_processFile :              'http://10.160.14.213:8085/sipareMSProcessFileApp/multiva/sipare/generateFileToPROCESAR',
    sipare_ms_parameters_by_type_transaction : 'http://10.160.14.213:8083/sipareMSProcessFileApp/multiva/sipare/getParameterByTypeTransaction',
    //Este no cambia
    sipare_ms_authenticate_url :               'http://10.160.14.213:8081/sipareMSAuthenticationApp/multiva/sipare/',

    genetateListAllFilesUrl :                   'genetateListAllFiles',
    genetateListAllFilesByDateRangeUrl :        'generateListAllFilesByDateRange',
    genetateListXlsUrl :                        'genetateListXls',
    genetateListAllFilesToT24Url :              'genetateListAllFilesToT24',
    genetateListAllFilesToT2ByDateRange4Url :   'generateListAllFilesToT24ToRangeDate',
    getContentByFileT24Url :                    'getContentByFileT24',
    getBalanceT24Url :                          'getAccountBalanceT24',
    loginUrl :                                  'login',
    logoutUrl :                                 'logout',
    searchUserUrl :                             'searchUser',
    sendFileToConnectDirectUrl :                'generateFileToPROCESAR',
    getListFilesToSendConnectDirectUrl :        'getContentByFileToSendProcesar',
    getContentFileToSendConnectDirectUrl :      'getContentFileToSendProcesar',
    searchFileToSendCdUrl :                     'searchFileToSendCd',
    filesToSendCdUrl :                          'filesToSendCd',
    getRespProcesarUrl :                        'getContentDataFileT24WithRespProcesar',
    getLastFileRespToProcesarUrl :              'getLastFileRespToProcesar',
    getDataByLineCaptureByRespProcesarUrl :     'getDataByLineCaptureByRespProcesar',
    updateRegistryRespUrl :                     'updateRegistryResp',
    genetateListXLSConciliationUrl :            'generateXLSConciliation',
    searchFileToValidUrl :                      'searchFileToValid',
    sendValidatedFileToPROCESAR :               'sendValidatedFile',
    getContentFileEditUrl :                     'getContentFile',
    editFiletUrl :                              'editFile',
    validTwoFileUrl :                           'validatedEditFile',
    addParameterBackOfficeUrl :                 'addParametersBackOffice',
    getBankByCodeUrl :                          'getBankByCode',
    getParameterByTypeTransactionURL :          'getParameterByTypeTransaction',
    paymentTransactionAndSendNotificationURL :  'paymentTransactionAndSendNotification',
    listTrxsFailedURL :                         'getListTrxsFailed',
    trxReProcessUrl :                           'paymentTransactionAndSendNotificationReProcess',
    trxReProcessProgrammedUrl :                 'getUpdateDateProgrammedTrxsFailed',
    
    /* SIPARE REST API*/
    generateSummaryReportByDate :   'conciliation/daily/summaries',
    generateSummaryReportByMonth :  'conciliation/monthly/summaries',
    
    /*
        FYG
        http://10.160.188.123:X
    */
    //X = 8766 DEV; X = 8765 UAT
    addParameter:                   'http://10.160.188.123:8765/sipare-procesar-parameters/parameters',
    addParameterT2:                 'http://10.160.188.123:8765/sipare-procesar-pre-notice/preaviso',
    sipare_ms_updateParameter_url : 'http://10.160.188.123:8765/sipare-backoffice-parameters/parameters',
    // urlBalancePROCESAR :            'http://10.160.188.123:8765/sipare-retrieve-balance/balances/findByTypeAndDate?type=PROCESAR',
    urlBalancePROCESAR :            'http://10.160.188.123:8765/sipare-retrieve-procesar-balance/balances/findByTypeAndDate?type=PROCESAR',
    urlAproveBalancePROCESAR :      'http://10.160.188.123:8765/sipare-approve-balance/balances',
    url_Liquidation :               'http://10.160.188.123:8765/sipare-procesar-liquidations/liquidations',
    url_PreNotice :                 'http://10.160.188.123:8765/sipare-procesar-pre-notice/prenotices',
    urlParameter1:                  'http://10.160.188.123:8765/sipare-procesar-parameters/parameters/116027',
    urlParameter2:                  'http://10.160.188.123:8765/sipare-procesar-parameters/parameters/116018',
    url_Get_Liquidation :           'http://10.160.188.123:8765/sipare-procesar-liquidations/liquidations/findByCurrentDate',
    url_Get_PreNotice :             'http://10.160.188.123:8765/sipare-procesar-pre-notice/prenotices/findByCurrentDate',
    
    sipare_api :                    'http://10.160.188.123:8082/api/v1/sipare/',
    urlFileStatus :                 'http://localhost:8765/sipare-consar-file-status/status',
    urlFileWorklog :                'http://localhost:8765/sipare-consar-file-worklog/worklogs/',
    urlBalanceCONSAR :              'http://localhost:8765/sipare-retrieve-consar-balance/balances?type=CONSAR',
    url_Data_Complementary :        'http://10.160.188.123:8765/sipare-response-type-patch/multiva/sipare/responseTypeCaptureLine'
};