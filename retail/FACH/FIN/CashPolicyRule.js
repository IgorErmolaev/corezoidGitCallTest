data.FIN_REAS_CODE_TABLE = new Array();
var res_call_last_work, res_call_last_home, res_call_last_mob, rule_count;

function AddCode(code){
    if (data.FIN_REAS_CODE_TABLE.indexOf(code) == -1) {
        data.FIN_REAS_CODE_TABLE.push(code);
    }
}

for (var i=0; i < data.APP_PHONE.length; i++){
    if (data.APP_PHONE[i].TYPE_CALL == 'WORK'){
        res_call_last_work = data.APP_PHONE[i].TOTAL_HIST;
    }
    if (data.APP_PHONE[i].TYPE_CALL == 'HOME'){
        res_call_last_home = data.APP_PHONE[i].TOTAL_HIST;
    }
    if (data.APP_PHONE[i].TYPE_CALL == 'MOB'){
        res_call_last_mob = data.APP_PHONE[i].TOTAL_HIST;
    }
}

data.RES_DEC_CATEGORY = 'UNKNOWN';
rule_count = 0;

if (data.PRE_REAS_CODE_TABLE!= undefined) {
    for (var i = 0; i < data.PRE_REAS_CODE_TABLE.length; i++) {
        data.FIN_REAS_CODE_TABLE.push(data.PRE_REAS_CODE_TABLE[i]);
    }
}

if (data.LOCAL_CODE != undefined) {
    localCodeObj = data.LOCAL_CODE;
    var arrKey = Object.keys(localCodeObj);
}

data.RES_DECISION = 'UNKNOWN';
data.LOCAL_CALL_COMMENT = 'N';

if (arrKey!= undefined) {
    for (i = 0; i < arrKey.length; i++) {
        var key = arrKey[i];
        var questanswersArray = localCodeObj[key];
        for (var j = 0; j < questanswersArray.length; j++) {
            if (questanswersArray[j].NBSM_QUESTION == 'Q066' && data.RES_CALL_WORK_PHONE == 'Y' && (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_TELEFON_NUMBER' || questanswersArray[j].NBSM_ANSWER == 'CALL_NO_CONNECTION' || questanswersArray[j].NBSM_ANSWER == 'CALL_NOT_BELONG_CLIENT' || questanswersArray[j].NBSM_ANSWER == 'CALL_NO_ANSWER')) {
                AddCode('D612');
                rule_count++;
            }
            if (questanswersArray[j].NBSM_QUESTION == 'Q066' && data.RES_CALL_HOME_PHONE == 'Y' && (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_TELEFON_NUMBER' || questanswersArray[j].NBSM_ANSWER == 'CALL_NO_CONNECTION' || questanswersArray[j].NBSM_ANSWER == 'CALL_NOT_BELONG_CLIENT' || questanswersArray[j].NBSM_ANSWER == 'CALL_NO_ANSWER')) {
                AddCode('D613');
                rule_count++;
            }
            if (questanswersArray[j].NBSM_QUESTION == 'Q066' && data.RES_CALL_MOB_PHONE == 'Y' && (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_TELEFON_NUMBER' || questanswersArray[j].NBSM_ANSWER == 'CALL_NO_CONNECTION' || questanswersArray[j].NBSM_ANSWER == 'CALL_NOT_BELONG_CLIENT' || questanswersArray[j].NBSM_ANSWER == 'CALL_NO_ANSWER')) {
                AddCode('D614');
                rule_count++;
            }
            if (questanswersArray[j].NBSM_QUESTION == 'Q008' && data.RES_CALL_WORK_PHONE == 'Y' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_N') {
                AddCode('D615');
                rule_count++;
            }
            if (questanswersArray[j].NBSM_QUESTION == 'Q047' && data.RES_CALL_HOME_PHONE == 'Y' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_N') {
                AddCode('D616');
                rule_count++;
            }
            if (questanswersArray[j].NBSM_QUESTION == 'Q008' && data.RES_CALL_MOB_PHONE == 'Y' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_N') {
                AddCode('D617');
                rule_count++;
            }
            if (questanswersArray[j].NBSM_QUESTION == 'Q002' && data.RES_CALL_WORK_PHONE == 'Y' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_N') {
                AddCode('D618');
                rule_count++;
            }
            if (questanswersArray[j].NBSM_QUESTION == 'Q046' && data.RES_CALL_MOB_PHONE == 'Y' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_N') {
                AddCode('D619');
                rule_count++;
            }
            if (data.RES_CALL_TOTAL == 'C_NULL' && res_call_last_work == 'C_NEG' && data.RES_CALL_WORK_PHONE == 'Y' && questanswersArray[j].NBSM_QUESTION == 'Q066' && (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_ANSWER' || questanswersArray[j].NBSM_ANSWER == 'CALL_RELIEVING' )) {
                AddCode('D620');
                rule_count++;
            }
            if (data.RES_CALL_TOTAL == 'C_NULL' && res_call_last_home == 'C_NEG' && data.RES_CALL_HOME_PHONE == 'Y' && questanswersArray[j].NBSM_QUESTION == 'Q066' && (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_ANSWER' || questanswersArray[j].NBSM_ANSWER == 'CALL_RELIEVING' )) {
                AddCode('D621');
                rule_count++;
            }
            if (data.RES_CALL_TOTAL == 'C_NULL' && res_call_last_mob == 'C_NEG' && data.RES_CALL_MOB_PHONE == 'Y' && questanswersArray[j].NBSM_QUESTION == 'Q066' && (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_ANSWER' || questanswersArray[j].NBSM_ANSWER == 'CALL_RELIEVING' )) {
                AddCode('D622');
                rule_count++;
            }
            if (questanswersArray[j].NBSM_ANSWER == 'NEGATIVE_RECOMMENDATION' && ( data.RES_CALL_WORK_PHONE == 'Y' || data.RES_CALL_HOME_PHONE == 'Y' || data.RES_CALL_MOB_PHONE == 'Y') && (questanswersArray[j].NBSM_ANSWER == 'GENERAL_N' && (questanswersArray[j].NBSM_QUESTION == 'Q005' || questanswersArray[j].NBSM_QUESTION == 'Q016'))) {
                AddCode('D623');
                rule_count++;
            }
            if (questanswersArray[j].NBSM_QUESTION == 'Q999' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_Y') {
                data.LOCAL_CALL_COMMENT = 'Y';
            }
        }
    }
}

if (data.RES_CALL_TOTAL == 'C_NEG' && (data.RES_CALL_WORK_PHONE == 'Y' ||  data.RES_CALL_HOME_PHONE == 'Y' ||  data.RES_CALL_MOB_PHONE == 'Y')){
    AddCode('D624');
    rule_count ++;
}

if (rule_count > 0){
    data.RES_DEC_CATEGORY = 'DECLINE';
}
if (data.RES_DEC_CATEGORY == 'UNKNOWN'){
    data.RES_DEC_CATEGORY = 'ACCEPT';
}

if (data.LOCAL_CALL_COMMENT == 'Y'){
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
}
