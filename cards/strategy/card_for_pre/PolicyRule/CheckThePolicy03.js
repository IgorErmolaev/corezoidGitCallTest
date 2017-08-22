var execute = new Array('DEPOZ_OL','POSSIBIL','ZAGRAN');
var startTypes = new Array('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','UNIPACKSAS','ONLINEANKETA');
var typeUp = new Array('CHLIMIT','UPLIMIT','UPLIMNKK');
data.RES_DEC_REAS_CODE_TABLE = new Array();

var isRef='N';
for (var i=0;i<data.DATA_CRED.length;i++){
    if (data.DATA_CRED[i].REFERENC == data.PROD_CHAR_REFERENCE){
        isRef='Y';
    }
}

if (data.FRAUD_DEC_FINAL_FLOW == 'DECLINE' && data.FRAUD_DEC_REAS_CODE_TABLE.length != 0){
    data.LOCAL_DEC_TEXT_1.push('ZERO_LIMIT');
    data.LOCAL_DEC_CATEGORY_1.push('ZERO_LIMIT');
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L131');
}

if ((data.PROD_CHAR_TYPE == 'UPLIMIT' || data.PROD_CHAR_TYPE == 'UPLIMNKK') &&
    data.RES_CRED_LIM >= data.RES_LIMIT_ITOG && isRef =='Y'  && execute.indexOf(data.APP_CUST_SPECIALPROJECT) == -1 &&
    data.LOCAL_TICKET_FLAG_TEHPASSP != 'Y' && data.LOCAL_TICKET_FLAG_FORPASSP != 'Y' && data.APP_CUST_IMPORTANT_PRODUCT!= 'VP' && data.RES_PROD_TYPE != 'VIP' && (data.RES_ONLINEANKETA_LIMIT== undefined || data.RES_ONLINEANKETA_LIMIT == 0)){
    data.LOCAL_DEC_TEXT_1.push('DECLINE');
    data.LOCAL_DEC_CATEGORY_1.push('DECLINE');
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D111');
}

if (data.LOCAL_DEC_CATEGORY_1.indexOf('DECLINE')==-1 && data.LOCAL_DEC_CATEGORY_1.indexOf('ZERO_LIMIT')==-1 && data.PROD_CHAR_LIMITREQUESTED>0 &&
    ((data.RES_LIMIT_ITOG == 0 &&  startTypes.indexOf(data.PROD_CHAR_TYPE) !=-1 && data.DATA_LIMIT_OTHERBANK > 0 ) ||
    ( data.RES_CRED_LIM >= data.RES_LIMIT_ITOG && typeUp.indexOf(data.PROD_CHAR_TYPE) !=-1 && data.RES_PROD_TYPE == 'VIP' && data.RES_VIP_NEED_SZ != 'Y' ))){
    data.LOCAL_DEC_TEXT_1.push('ZERO_LIMIT');
    data.LOCAL_DEC_CATEGORY_1.push('ZERO_LIMIT');
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L133');
}

if (data.LOCAL_DEC_CATEGORY_1.length == 0){
    data.LOCAL_DEC_CATEGORY_1.push('ACCEPT');
    data.LOCAL_DEC_TEXT_1.push('ACCEPT');
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('A101');
}

for (var i=0;i<data.LOCAL_DEC_REAS_CODE_TABLE_1.length;i++){
    data.RES_DEC_REAS_CODE_TABLE.push(data.LOCAL_DEC_REAS_CODE_TABLE_1[i]);
}

if (data.LOCAL_DEC_CATEGORY_1.indexOf('DECLINE') != -1){
    data.RES_DEC_CATEGORY='DECLINE';
    data.RES_DEC_TEXT='DECLINE';
}
else {
    if (data.LOCAL_DEC_CATEGORY_1.indexOf('ZERO_LIMIT') != -1){
        data.RES_DEC_CATEGORY='ZERO_LIMIT';
        data.RES_DEC_TEXT='ZERO_LIMIT';
    }
    else {
        if (data.LOCAL_DEC_CATEGORY_1.indexOf('MINIMUM_LIMIT') != -1){
            data.RES_DEC_CATEGORY='MINIMUM_LIMIT';
            data.RES_DEC_TEXT='MINIMUM_LIMIT';
        }
        else {
            data.RES_DEC_CATEGORY='ACCEPT';
            data.RES_DEC_TEXT='ACCEPT';
        }
    }
}

data.nodeName = 'CheckThePolicy03';