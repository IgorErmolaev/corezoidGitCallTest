if ((data.PROD_CHAR_BANK == 'AB' || data.PROD_CHAR_BANK == 'PB') && data.THE_RIP == 'Y'){
    if (data.RES_INC_NOT_CONF*1.5 > data.LOCAL_INCOME_OTHERSOURCE){
        data.RES_INC_NOT_CONF = data.LOCAL_INCOME_OTHERSOURCE;
    }
}
else {
    if (data.RES_INC_NOT_CONF*1.3 > data.LOCAL_INCOME_OTHERSOURCE){
        data.RES_INC_NOT_CONF = data.LOCAL_INCOME_OTHERSOURCE;
    }
}

if (data.RES_INC_NOT_CONF!= undefined) {
    data.RES_INC_NOT_CONF = data.RES_INC_NOT_CONF.toFixed(2);
    data.RES_INC_NOT_CONF = parseFloat(data.RES_INC_NOT_CONF);
}

data.nodeName = 'ReconUnconfirm';
