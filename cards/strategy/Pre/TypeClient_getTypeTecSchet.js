if (data['PROD_CHAR_BANK'] == 'AB' || data['PROD_CHAR_BANK'] == 'PB'){
    var dataObInMin = 10000;
    var dataObAllMin=1000;
}

if (data['DATA_OB_IN'] >= dataObInMin){
    data['RES_TYPE_CUST'] = 'INTERN';
}
else {
    if (data['DATA_OB_ALL'] >= dataObAllMin){
        data['RES_TYPE_CUST'] = 'NEW_INTERN';
    }
}

data.nodeName = 'TypeClient_getTypeTecSchet';