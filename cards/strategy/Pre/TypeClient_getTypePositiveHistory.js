
if (data['PROD_CHAR_BANK'] == 'AB' || data['PROD_CHAR_BANK'] == 'PB'){
    var dataCredPayMin = 100;
}



if (data['LOCAL_POSITIVE_HISTORY'] == 'Y' || data['LOCAL_MEDIUM_HISTORY'] == 'Y'){
    for (var i=0; i< data['DATA_CRED'].length; i++){
        if (data['DATA_CRED'][i]['REFERENC'] != null && data['DATA_CRED'][i]['TR_PAY'] >= 3 && data['DATA_CRED'][i]['CR_PAY'] >= dataCredPayMin){
            data['RES_TYPE_CUST'] = 'INTERN';
            break;
        }
    }
}

data.nodeName = 'TypeClient_getTypePositiveHistory';