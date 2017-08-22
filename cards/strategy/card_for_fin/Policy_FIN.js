
if (data.LOCAL_CODE != undefined) {
    localCodeObj = data.LOCAL_CODE;
    var arrKey = Object.keys(localCodeObj);
}


var UPLIM_TYPE = new Array ('CHLIMIT','UPLIMIT','UPLIMNKK');
var START_TYPE = new Array ('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','ONLINEANKETA','UNIPACKSAS');

function AddCode(code){
    if (data.FIN_REAS_CODE_TABLE.indexOf(code) == -1) {
        data.FIN_REAS_CODE_TABLE.push(code);
    }
}

var the_zagran = 'N';
var LOCAL_CALL_COMMENT = 'N';
var RES_CALL_ISID_FRAUD_local = 'N';

RES_DEC_FINAL_FLOW_FIN = 'UNKNOWN';

if (data.RES_CUST_ISID == 'N' && data.RES_CUST_ISID != 'VIP'){
    data.FIN_REAS_CODE_TABLE.push('L112');
}

var isRef = 'N';
if (data.DATA_CRED != undefined){
    for (var i=0; i<data.DATA_CRED.length;i++){
        if (data.DATA_CRED[i].REFERENC == data.PROD_CHAR_REFERENCE){
            isRef = 'Y';
            break;
        }
    }
}

if (UPLIM_TYPE.indexOf(data.PROD_CHAR_TYPE) != -1 && data.RES_CRED_LIM >= data.RES_LIMIT_ITOG
    && isRef =='Y' && data.APP_CUST_SPECIALPROJECT != 'DEPOZ_OL' && data.APP_CUST_SPECIALPROJECT != 'POSSIBIL' && data.APP_CUST_SPECIALPROJECT != 'ZAGRAN'
    && data.LOCAL_TICKET_FLAG_TEHPASSP != 'Y' && data.LOCAL_TICKET_FLAG_FORPASSP != 'Y' && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP' ){
    data.FIN_REAS_CODE_TABLE.push('D111');
}

if (arrKey!= undefined) {
    for (var i = 0; i < arrKey.length; i++) {
        var key = arrKey[i];
        var questanswersArray = localCodeObj[key];
        for (var j = 0; j < questanswersArray.length; j++) {
            if (data.RES_CALL_WORK_PHONE == 'Y' && data.RES_CALL_TOTAL == 'C_NULL' && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP' && questanswersArray[j].NBSM_QUESTION == 'Q066' &&
                (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_CONNECTION' || questanswersArray[j].NBSM_ANSWER  == 'CALL_RELIEVING') && (data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB' )) {
                AddCode('A102');
            }
            if (data.RES_CALL_HOME_PHONE == 'Y' && data.RES_CALL_TOTAL == 'C_NULL' && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP' && questanswersArray[j].NBSM_QUESTION  == 'Q066' &&
                (questanswersArray[j].NBSM_ANSWER  == 'CALL_NO_CONNECTION' || questanswersArray[j].NBSM_ANSWER  == 'CALL_RELIEVING') && (data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB')) {
                AddCode('A103');
            }
            if (data.RES_CALL_MOB_PHONE == 'Y' && data.RES_CALL_TOTAL == 'C_NULL' && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP' && questanswersArray[j].NBSM_QUESTION  == 'Q066' &&
                (questanswersArray[j].NBSM_ANSWER  == 'CALL_NO_CONNECTION' || questanswersArray[j].NBSM_ANSWER  == 'CALL_RELIEVING') && (data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB')) {
                AddCode('A104');
            }
            if ((questanswersArray[j].NBSM_ANSWER  == 'NO_VISA' || questanswersArray[j].NBSM_ANSWER  == 'VISA_ON_ARRIVAL' || questanswersArray[j].NBSM_ANSWER  == 'TIPICAL_VISA' || questanswersArray[j].NBSM_ANSWER  == 'SCHENGEN_VISA') &&
                questanswersArray[j].NBSM_QUESTION  == 'Q081') {
                data.THE_ZAGRAN = 'Y';
            }
            if (questanswersArray[j].NBSM_ANSWER  == 'GENERAL_Y' && questanswersArray[j].NBSM_QUESTION  == 'Q999') {
                data.LOCAL_CALL_COMMENT = 'Y';
            }
            if (questanswersArray[j].NBSM_ANSWER == 'CLIENT_NOT_RECEIVED_CARD' || (questanswersArray[j].NBSM_QUESTION  == 'Q055' && questanswersArray[j].NBSM_ANSWER  == 'GENERAL_N') ||
                (questanswersArray[j].NBSM_QUESTION == 'Q091' && questanswersArray[j].NBSM_ANSWER  == 'GENERAL_N')) {
                RES_CALL_ISID_FRAUD_local = 'Y';
            }
        }
    }
}

data.RES_CALL_ISID_FRAUD = 'N';
if (data.LOCAL_CALL_COMMENT == 'Y'){
    data.RES_CALL_ISID_FRAUD = 'Y';
}
if (data.RES_CALL_ISID_FRAUD == 'Y'){
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
}
if (RES_CALL_ISID_FRAUD_local == 'Y'){
    data.RES_CALL_ISID_FRAUD = 'Y';
}

if (UPLIM_TYPE.indexOf(data.PROD_CHAR_TYPE) != -1 && (data.FIN_REAS_CODE_TABLE.indexOf('L112') != -1 || data.FIN_REAS_CODE_TABLE.indexOf('D111') != -1)){
    RES_DEC_FINAL_FLOW_FIN = 'DECLINE';
}
else {
    if (START_TYPE.indexOf(data.PROD_CHAR_TYPE) != -1  && data.FIN_REAS_CODE_TABLE.indexOf('L112') != -1){
        RES_DEC_FINAL_FLOW_FIN = 'ZERO_LIMIT';
    }
    else {
        RES_DEC_FINAL_FLOW_FIN = 'ACCEPT';
    }
}
if (data.RES_DEC_FINAL_FLOW == 'DECLINE' || RES_DEC_FINAL_FLOW_FIN == 'DECLINE' || data.RES_DEC_CATEGORY == 'DECLINE'){
    data.RES_DEC_FINAL_FLOW = 'DECLINE';
}
else {
    if (data.RES_DEC_FINAL_FLOW == 'ZERO_LIMIT' || RES_DEC_FINAL_FLOW_FIN == 'ZERO_LIMIT' || data.RES_DEC_CATEGORY == 'ZERO_LIMIT') {
        data.RES_DEC_FINAL_FLOW = 'ZERO_LIMIT';
    }
    else {
        data.RES_DEC_FINAL_FLOW = 'ACCEPT';
    }
}
