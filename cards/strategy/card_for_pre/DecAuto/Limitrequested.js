if (data.PROD_CHAR_LIMITREQUESTED == 0 && data.RES_LIMIT_ITOG == 0 && (data.APP_CUST_IMPORTANT_COM == undefined || data.APP_CUST_IMPORTANT_COM == '')){
    data.DecAuto = 'Y';
}

data.nodeName = 'LimitRequested';