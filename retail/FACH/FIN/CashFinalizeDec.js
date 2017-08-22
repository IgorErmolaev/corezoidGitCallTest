// JavaScript Document

data.RES_LIMIT_P48 = data.RES_LIMIT_ITOG;
data.RES_CHAR_PLAT_MIN = data.RES_LIMIT_P48/data.PROD_SCHEME_TERM  + data.RES_LIMIT_P48 * 0.0599;
data.RES_CHAR_PLAT_MIN = data.RES_CHAR_PLAT_MIN.toFixed(2);
data.RES_TYPE_SMS = 'Y';

if (data.RES_DEC_CATEGORY == 'DECLINE'){
    data.RES_DEC_FINAL_FLOW = 'DECLINE';
}
else {
    data.RES_DEC_FINAL_FLOW = 'ACCEPT';
}

if (data.RES_DEC_FINAL_FLOW != 'ACCEPT'){
    for (var i=0;i< data.FIN_REAS_CODE_TABLE.length;i++){
        if (data.FIN_REAS_CODE_TABLE[i] == 'A101'){
            data.FIN_REAS_CODE_TABLE[i] = '';
        }
    }
}

/*
 for ( i=0; i< data.FIN_REAS_CODE_TABLE.length;i++) {
 if (data.FIN_REAS_CODE_TABLE[i] != ''){
 if (data.FIN_REAS_CODE_TABLE[i] != 'A102' && data.FIN_REAS_CODE_TABLE[i]  != 'A103' && data.FIN_REAS_CODE_TABLE[i]  != 'A104'){
 if (data.RES_DEC_FINAL_COMMENT.indexOf(data.FIN_REAS_CODE_TABLE[i]) == -1){
 data.RES_DEC_FINAL_COMMENT = data.RES_DEC_FINAL_COMMENT + 'k'+ data.FIN_REAS_CODE_TABLE[i] + ';';
 }
 }
 }
 }
 */

if (data.LOCAL_CODE != undefined) {
    localCodeObj = data.LOCAL_CODE;
    var arrKey = Object.keys(localCodeObj);
}

if (arrKey!= undefined) {
    for (i = 0; i < arrKey.length; i++) {
        var key = arrKey[i];
        var questanswersArray = localCodeObj[key];
        for (var j = 0; j < questanswersArray.length; j++) {
            if (questanswersArray[j].NBSM_QUESTION == 'Q030' && data.RES_CALL_WORK_PHONE == 'Y' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_NO_OVERLAP') {
                data.RES_COMMENT_NO_AUTO +=  'Произведите звонок клиенту;';
            }
            if (questanswersArray[j].NBSM_QUESTION == 'Q081' && data.RES_CALL_MOB_PHONE == 'Y' && questanswersArray[j].NBSM_ANSWER == 'LIMIT_0') {
                data.RES_COMMENT_NO_AUTO +=  'Клиент не согласен с платежом;';
                data.RES_DEC_AUTO = 'N';
            }
            if (questanswersArray[j].NBSM_QUESTION == 'Q999' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_Y') {
                data.RES_COMMENT_NO_AUTO +=  'Комментарий при обзвоне;';
            }
        }
    }
}

for (i=0; i< data.FIN_REAS_CODE_TABLE.length;i++){
    if (data.FIN_REAS_CODE_TABLE[i] !=''){
        data.RES_HISTORY_REAS_CODE +=  data.FIN_REAS_CODE_TABLE[i] + ';';
    }
}

/*RES_BI*/
data.RES_BI = 'L';

if (data.RES_DEC_AUTO == 'N'){
    data.RES_BI = 'KC';
}
if (data.FRAUD_FRAUD_SUSPICTION == 'Y'){
    data.RES_BI = 'F';
}
if (data.RES_DEC_FINAL_FLOW == 'DECLINE'){
    data.RES_BI = 'D';
    data.RES_LIMIT_P48 = 0;
    data.RES_CHAR_PLAT_MIN = 0;
    data.RES_LIMIT_ITOG = 0;
    data.RES_COMMENT_NO_AUTO = '';
}
if (data.RES_BI == 'KC'){
    data.RES_LIMIT_P48 = 0;
    data.RES_CHAR_PLAT_MIN = 0;
}
