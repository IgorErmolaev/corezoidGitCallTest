// JavaScript Document

//--------------------------Fraud flag----

if (data.FRAUD_DEC_FINAL_FLOW == 'REFER' &&
    (data.DATA_TRELCLIENTS_MAXPAY>300 || data.RES_DEBCARD_P_SRED>1000 || data.RES_DEBCARD_Z_SRED>1000  || data.RES_DEPOZIT_TOTAL> 5000)
) {
    data.FRAUD_DEC_FINAL_FLOW = 'ACCEPT';
}

if (data.FRAUD_DEC_FINAL_FLOW == 'DECLINE' &&  (data.RES_TYPE_CUST == 'INTERN' || data.DATA_TRELCLIENTS_MAXPAY>300)) {
    data.FRAUD_DEC_FINAL_FLOW = 'REFER';
}

//----------------------------------------------------------------

if (data.APP_CUST_INN == undefined || data.APP_CUST_INN == '') {
    data.RES_COMMENT_NO_AUTO = 'У клиента нет ИНН, проведите проверку; ';
    data.RES_DEC_AUTO = 'N';
}

if (data.DATA_ECB_NOT_WORK == 'Y') {
    data.RES_COMMENT_NO_AUTO = 'Ручная проверка ЧС;';
    data.RES_DEC_AUTO = 'N';
}

if (data.BCH_YBCH_NOT_WORK == 'Y') {
    data.RES_COMMENT_NO_AUTO = 'Не сработал запрос в УБКИ - ручная проверка;';
    data.RES_DEC_AUTO = 'N';
}

if (data.LOCAL_CRED_CARD_NO_PAYM == 'Y') {
    data.RES_COMMENT_NO_AUTO = 'Еж. платеж по кредитке;';
    data.RES_DEC_AUTO = 'N';
}

if (data.BCH_CRED_OWN_PROS_YBCH =='Y' ||
    ((data.LOCAL_BODY_DELINQUENCY + data.LOCAL_PRC_DELINQUENCY)>0 && (data.LOCAL_BODY_DELINQUENCY + data.LOCAL_PRC_DELINQUENCY)<500)
) {
    data.RES_COMMENT_NO_AUTO = 'Текущая просрочка;';
    data.RES_DEC_AUTO = 'N';
}

if (data.FRAUD_DEC_FINAL_FLOW == 'REFER') {
    data.RES_DEC_AUTO = 'N';
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
    for (i = 0; i < data.FRAUD_DEC_REAS_CODE_TABLE.length; i++) {
        if (data.FRAUD_DEC_REAS_CODE_TABLE[i] != '') {
            data.RES_COMMENT_NO_AUTO += 'k' + data.FRAUD_DEC_REAS_CODE_TABLE[i] + ';';
        }
    }
}

if (data.RES_COMMENT_NO_AUTO != '') {
    data.RES_COMMENT_NO_AUTO = 'Проверьте клиента:' + data.RES_COMMENT_NO_AUTO;
}

if (data.FRAUD_DEC_REAS_CODE_TABLE != undefined) {
    for (i=0; i<data.FRAUD_DEC_REAS_CODE_TABLE.length; i++) {
        if (data.FRAUD_DEC_REAS_CODE_TABLE[i] != '') {
            data.RES_HISTORY_REAS_CODE = data.RES_HISTORY_REAS_CODE + ';' + data.FRAUD_DEC_REAS_CODE_TABLE[i];
        }
    }
}
//-------------------------------------CALL------------

data.RES_CUST_NEED_CALL = 'N';

if (data.RES_CALL_HOME_PHONE =='Y' || data.RES_CALL_MOB_PHONE =='Y' || data.RES_CALL_WORK_PHONE =='Y') {
    data.RES_CUST_NEED_CALL = 'Y';
}

if (data.RES_CUST_NEED_CALL =='N') {
    data.RES_CALL_DIALOGE_TYPE = '';
}

//---------------------------------Next step to-------------

data.RES_BI = 'N';

if (data.RES_DEC_CATEGORY == 'DECLINE') {
    data.RES_BI = 'D';
}
else {
    if (data.RES_CUST_NEED_CALL == 'Y') {
        data.RES_BI = 'O';
    }
}

if (data.RES_DEC_FINAL_FLOW == 'ACCEPT' && data.RES_CUST_NEED_CALL != 'N' && data.RES_DEC_AUTO != 'N') {
    data.RES_BI = 'GD';
}

if (data.RES_CUST_NEED_CALL == 'N' && data.RES_BI == 'N' && data.RES_DEC_AUTO =='N') {
    data.RES_BI = 'KC';
}

//--------------------SMS---

data.RES_TYPE_SMS = 'Y';