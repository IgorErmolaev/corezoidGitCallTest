/*
var data = new Object();
data['LOCAL_CODE'] = {};
var contact_type_mob = new Array();
contact_type_mob[0] = {};
contact_type_mob[1] = {};
contact_type_mob[2] = {};
contact_type_mob[0]['NBSM_QUESTION'] = 'Q069';
contact_type_mob[0]['NBSM_ANSWER'] = 'GENERAL_Y';
contact_type_mob[0]['NBSM_BAL'] = '0';
contact_type_mob[1]['NBSM_QUESTION'] = 'Q055';
contact_type_mob[1]['NBSM_ANSWER'] = 'GENERAL_N';
contact_type_mob[1]['NBSM_BAL'] = '2';
contact_type_mob[2]['NBSM_QUESTION'] = 'Q068';
contact_type_mob[2]['NBSM_ANSWER'] = 'GENERAL_M';
contact_type_mob[2]['NBSM_BAL'] = '4';
data['LOCAL_CODE']['MOB'] = contact_type_mob;

var contact_type_work = new Array();
contact_type_work[0] = {};
contact_type_work[0]['NBSM_QUESTION'] = 'Q066';
contact_type_work[0]['NBSM_ANSWER'] = 'CALL_NO_TELEFON_NUMBER';
contact_type_work[0]['NBSM_BAL'] = '0';
data['LOCAL_CODE']['WORK'] = contact_type_work;

data['RES_CALL_WORK_PHONE']='Y';*/

//-----------------------------------------------
data.FIN_REAS_CODE_TABLE = new Array();
var rule_count = 0;
data.RES_CUST_ISID_FRAUD_CNEG = 'N';

function AddCode(code){
    if (data.FIN_REAS_CODE_TABLE.indexOf(code) == -1) {
        if (data.RES_CUST_ISID_FRAUD != 'Y'){
            data.FIN_REAS_CODE_TABLE.push(code);
            rule_count++;
        }
        else{
            data.RES_CUST_ISID_FRAUD_CNEG = 'Y';
        }
    }
}


if (data.RES_DEC_REAS_CODE_TABLE!= undefined) {
    for (var i = 0; i < data.RES_DEC_REAS_CODE_TABLE.length; i++) {
        data.FIN_REAS_CODE_TABLE.push(data.RES_DEC_REAS_CODE_TABLE[i]);
    }
}
if (data.LOCAL_CODE != undefined) {
    localCodeObj = data.LOCAL_CODE;
    var arrKey = Object.keys(localCodeObj);
}

if (arrKey!= undefined) {
    for (i = 0; i < arrKey.length; i++) {
        var key = arrKey[i];
        var questanswersArray = localCodeObj[key];
        for (var j = 0; j < questanswersArray.length; j++) {
            if ((data.RES_CALL_TOTAL == 'C_NEG' && (data.RES_CALL_HOME_PHONE == 'Y' || data.RES_CALL_WORK_PHONE == 'Y' || data.RES_CALL_MOB_PHONE == 'Y')) || questanswersArray[j].NBSM_ANSWER == 'CLIENT_NOT_RECEIVED_CARD' ||
                (questanswersArray[j].NBSM_QUESTION == 'Q055' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_N') || (questanswersArray[j].NBSM_QUESTION == 'Q091' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_N')) {
                AddCode('M101');
            }

            if (data.RES_CALL_WORK_PHONE == 'Y' && arrKey[i] == 'WORK' && questanswersArray[j].NBSM_QUESTION == 'Q066' && (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_TELEFON_NUMBER' || questanswersArray[j].NBSM_ANSWER == 'CALL_NO_CONNECTION')) {
                AddCode('M106');
            }

            if (data.RES_CALL_HOME_PHONE == 'Y' && arrKey[i] == 'HOME' && questanswersArray[j].NBSM_QUESTION == 'Q066' && (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_TELEFON_NUMBER' || questanswersArray[j].NBSM_ANSWER == 'CALL_NO_CONNECTION')) {
                AddCode('M107');
            }

            if (data.RES_CALL_MOB_PHONE == 'Y' && arrKey[i] == 'MOB' && questanswersArray[j].NBSM_QUESTION == 'Q066' && (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_TELEFON_NUMBER' || questanswersArray[j].NBSM_ANSWER == 'CALL_NO_CONNECTION')) {
                AddCode('M108');
            }

            if ((data.RES_CALL_HOME_PHONE == 'Y' || data.RES_CALL_WORK_PHONE == 'Y' || data.RES_CALL_MOB_PHONE == 'Y') &&
                ((arrKey[i] == 'WORK' && questanswersArray[j].NBSM_QUESTION == 'Q039' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_N') ||
                (arrKey[i] == 'WORK' && questanswersArray[j].NBSM_QUESTION == 'Q093' && (questanswersArray[j].NBSM_ANSWER == 'GENERAL_N' || questanswersArray[j].NBSM_ANSWER == 'FALSE_NAME_ENDEPR')) ||
                (arrKey[i] == 'HOME' && questanswersArray[j].NBSM_QUESTION == 'Q093' && (questanswersArray[j].NBSM_ANSWER == 'GENERAL_N' || questanswersArray[j].NBSM_ANSWER == 'FALSE_NAME_ENDEPR')))) {
                AddCode('M109');
            }

            if (data.RES_CALL_WORK_PHONE == 'Y' && arrKey[i] == 'WORK' && questanswersArray[j].NBSM_QUESTION == 'Q008' && (questanswersArray[j].NBSM_ANSWER == 'GENERAL_N')) {
                AddCode('M110');
            }

            if (data.RES_CALL_HOME_PHONE == 'Y' && arrKey[i] == 'HOME' && questanswersArray[j].NBSM_QUESTION == 'Q047' && (questanswersArray[j].NBSM_ANSWER == 'GENERAL_N')) {
                AddCode('M111');
            }

            if (data.RES_CALL_MOB_PHONE == 'Y' && arrKey[i] == 'MOB' && questanswersArray[j].NBSM_QUESTION == 'Q008' && (questanswersArray[j].NBSM_ANSWER == 'GENERAL_N')) {
                AddCode('M112');
            }

            if ((data.RES_CALL_WORK_PHONE == 'Y' || data.RES_CALL_HOME_PHONE == 'Y' || data.RES_CALL_MOB_PHONE == 'Y') && (data.APP_EMPL_SOCIALSTATUS != 'STUDENT' && data.APP_EMPL_SOCIALSTATUS != 'UNEMP' && data.APP_EMPL_SOCIALSTATUS != 'DECREE') &&
                ((arrKey[i] == 'WORK' && (questanswersArray[j].NBSM_QUESTION == 'Q054' || questanswersArray[j].NBSM_QUESTION == 'Q062') && (questanswersArray[j].NBSM_ANSWER == 'SOCIALSTATUS_STUDENT' || questanswersArray[j].NBSM_ANSWER == 'SOCIALSTATUS_UNEMP' ||questanswersArray[j].NBSM_ANSWER == 'SOCIALSTATUS_DECREE')) ||
                (arrKey[i] == 'HOME' && (questanswersArray[j].NBSM_QUESTION == 'Q054' || questanswersArray[j].NBSM_QUESTION == 'Q062') && (questanswersArray[j].NBSM_ANSWER == 'SOCIALSTATUS_STUDENT' || questanswersArray[j].NBSM_ANSWER == 'SOCIALSTATUS_UNEMP' || questanswersArray[j].NBSM_ANSWER == 'SOCIALSTATUS_DECREE')) ||
                (arrKey[i] == 'MOB' && (questanswersArray[j].NBSM_QUESTION == 'Q054' || questanswersArray[j].NBSM_QUESTION == 'Q062') && (questanswersArray[j].NBSM_ANSWER == 'SOCIALSTATUS_STUDENT' || questanswersArray[j].NBSM_ANSWER == 'SOCIALSTATUS_UNEMP' || questanswersArray[j].NBSM_ANSWER == 'SOCIALSTATUS_DECREE'))
                )) {
                AddCode('M113');
            }

            if (data.RES_CALL_WORK_PHONE == 'Y' && arrKey[i] == 'WORK' && ((questanswersArray[j].NBSM_QUESTION == 'Q067' && questanswersArray[j].NBSM_ANSWER != 'WORKPHONE') ||
                (questanswersArray[j].NBSM_QUESTION == 'Q092' && (questanswersArray[j].NBSM_ANSWER != 'WORKPHONE' && questanswersArray[j].NBSM_ANSWER != 'PERSON_MOBIL')))) {
                AddCode('M114');
            }

            if (data.RES_CALL_MOB_PHONE == 'Y' && arrKey[i] == 'MOB' && questanswersArray[j].NBSM_QUESTION == 'Q046' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_N') {
                AddCode('M117');
            }

            if (data.RES_CALL_LAST_WORK == 'C_NEG' && data.RES_CALL_WORK_PHONE == 'Y' && data.RES_CALL_TOTAL == 'C_NULL' && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP' &&
                questanswersArray[j].NBSM_QUESTION == 'Q066' && (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_CONNECTION' || questanswersArray[j].NBSM_ANSWER == 'CALL_RELIEVING')) {
                AddCode('M118');
            }

            if (data.RES_CALL_LAST_HOME == 'C_NEG' && data.RES_CALL_HOME_PHONE == 'Y' && data.RES_CALL_TOTAL == 'C_NULL' && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP' &&
                questanswersArray[j].NBSM_QUESTION == 'Q066' && (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_CONNECTION' || questanswersArray[j].NBSM_ANSWER == 'CALL_RELIEVING')) {
                AddCode('M119');
            }

            if (data.RES_CALL_LAST_MOB == 'C_NEG' && data.RES_CALL_MOB_PHONE == 'Y' && data.RES_CALL_TOTAL == 'C_NULL' && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP' &&
                questanswersArray[j].NBSM_QUESTION == 'Q066' && (questanswersArray[j].NBSM_ANSWER == 'CALL_NO_CONNECTION' || questanswersArray[j].NBSM_ANSWER == 'CALL_RELIEVING')) {
                AddCode('M120');
            }

            if (questanswersArray[j].NBSM_ANSWER == 'NEGATIVE_RECOMMENDATION') {
                AddCode('L120');
            }

            if (questanswersArray[j].NBSM_ANSWER == 'REFUSED_CARD') {
                AddCode('L113');
            }

        }
    }
}

if (rule_count > 0)
{
    data.RES_DEC_FINAL_FLOW = 'ZERO_LIMIT';
}
if (data.RES_DEC_FINAL_FLOW != 'ZERO_LIMIT' && data.RES_DEC_FINAL_FLOW != 'DECLINE')
{
    data.RES_DEC_FINAL_FLOW = 'ACCEPT';
}