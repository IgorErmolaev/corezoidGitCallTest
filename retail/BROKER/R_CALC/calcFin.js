// JavaScript Document

var NoPosKI = new Array('NEGATIVE','HDNEGATIVE','MEDIUM');
data.RES_COMMENT_NO_AUTO = '';

data.RES_PROD_TYPE = data.PROD_CHAR_TYPE;

//---------------FRAUD_EXCLUDES-------------------------

if (data.RES_DEBCARD_P_SRED>1000 || data.RES_DEBCARD_Z_SRED>1000 || data.RES_DEPOZIT_TOTAL>5000) {
    FRAUD_EXCLUDES = 'True';
}
else {
    FRAUD_EXCLUDES = 'False';
}

//----------------------------------- BLACK_PAN ---
var CASH_BLACK_PAN;
if (data.RES_DEBCARD_Z_SRED>= 1000 || data.RES_DEBCARD_P_SRED>= 1000 || data.LOCAL_DEPOSIT_AMOUNT>= 10000 || data.DATA_OB_ALL >= 1000 ||
    (data.BCH_CRED_HIST_YBCH!= undefined && data.BCH_CRED_HIST_YBCH.substring(0,1) =='P' && NoPosKI.indexOf(data.BCH_CRED_HIST_YBCH)==-1 && NoPosKI.indexOf(data.BCH_CRED_HIST_DATA)==-1 )) {
    BLACK_PAN='True';
}
else {
    BLACK_PAN='False';
}

//---------------------------------LIMIT_OLD_EXC---------------------------

if (data.LOCAL_LIMIT_OLD_CHECK == 'Y' && data.RES_CRED_HIST_YBCH != 'NEGATIVE' && data.RES_CRED_HIST_YBCH != 'HDNEGATIVE') {
    LIMIT_OLD_EXC = 'True';
}
else {
    LIMIT_OLD_EXC = 'False';
}

//--------------------------------Final Flow----------------------------------

data.LOCAL_CUST_IMPORTANT = 'N';

if (data.RES_DEC_CATEGORY != 'ACCEPT') {
    if (data.APP_CUST_IMPORTANT == 'Y' && data.APP_CUST_IMPORTANT_COM != '') {
        data.RES_DEC_CATEGORY = 'ACCEPT';
        data.RES_DEC_FINAL_FLOW = 'ACCEPT';
        data.LOCAL_CUST_IMPORTANT = 'Y';
        data.RES_COMMENT_NO_AUTO = 'Особый клиент(' + data.APP_CUST_IMPORTANT_COM + ');';
    }
    else {
        data.RES_DEC_FINAL_FLOW = 'DECLINE';
    }
}
else {
    data.RES_DEC_FINAL_FLOW = 'ACCEPT';
}


//--------------------------------Fraud flag------------------------

if (data.FRAUD_DEC_FINAL_FLOW == 'REFER' && FRAUD_EXCLUDES == 'True') {
    data.FRAUD_DEC_FINAL_FLOW = 'ACCEPT';
    data.FRAUD_FRAUD_SUSPICTION = 'N';
}

if (data.FRAUD_DEC_FINAL_FLOW == 'DECLINE' && data.RES_TYPE_CUST == 'INTERN') {
    data.FRAUD_DEC_FINAL_FLOW = 'REFER';
}

data.RES_CLIENT_ISID_FRAUD = 'N';

if (data.RES_CUST_ISID_FRAUD == 'Y') {
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
    data.RES_COMMENT_NO_AUTO = 'Результаты валидации;' + ' ' + data.RES_COMMENT_NO_AUTO;
}

if (data.RES_DEBCARD_P_SRED !=0 || data.RES_DEBCARD_Z_SRED !=0) {
    if ((data.APP_INCOME_MONTHSALARY - (data.RES_DEBCARD_P_SRED + data.RES_DEBCARD_Z_SRED))/(data.RES_DEBCARD_P_SRED + data.RES_DEBCARD_Z_SRED)>30) {
        data.RES_CLIENT_ISID_FRAUD = 'Y';
        data.RES_COMMENT_NO_AUTO = 'Дебетные поступления отличаются от заявленных в анкете;' + ' ' + data.RES_COMMENT_NO_AUTO;
    }
}

if (data.LOCAL_FIRST_SCOR !=0 && (data.RES_SCCARD_SCORE_1-data.LOCAL_FIRST_SCOR)/data.LOCAL_FIRST_SCOR > 0.15 && (data.RES_SCCARD_SCORE_1-data.LOCAL_FIRST_SCOR)/data.LOCAL_FIRST_SCOR<=0.25) {
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
    data.RES_COMMENT_NO_AUTO = ' Изменение заявочных данных;' + ' ' + data.RES_COMMENT_NO_AUTO;
}

if (data.RES_DEC_REAS_CODE_TABLE != undefined && data.RES_DEC_REAS_CODE_TABLE.indexOf('D013')!= -1 &&  data.RES_DEC_REAS_CODE_TABLE.length == 1) {
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
    data.RES_DEC_AUTO = 'N';
    data.RES_DEC_CATEGORY = 'ACCEPT';
    data.RES_DEC_FINAL_FLOW = 'ACCEPT';
    data.RES_COMMENT_NO_AUTO = ' Негативный телефон;' + ' ' + data.RES_COMMENT_NO_AUTO;
}


data.FRAUD_DEC_REAS_CODE_TABLE = new Array();
if (data.FRAUD_DEC_REAS_CODE != undefined) {
    data.FRAUD_DEC_REAS_CODE_TABLE = data.FRAUD_DEC_REAS_CODE.split(';');
    data.FRAUD_DEC_REAS_CODE_TABLE.splice(data.FRAUD_DEC_REAS_CODE_TABLE.length-1,1);
}

if (data.FRAUD_DEC_FINAL_FLOW == 'REFER' || (data.FRAUD_DEC_FINAL_FLOW == 'DECLINE' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D050') ==-1)) {
    data.RES_DEC_AUTO = 'N';
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
    if (data.FRAUD_DEC_REAS_CODE_TABLE != undefined){
        for (i = 0; i < data.FRAUD_DEC_REAS_CODE_TABLE.length; i++) {
            if (data.FRAUD_DEC_REAS_CODE_TABLE[i] != '') {
                data.RES_COMMENT_NO_AUTO += 'k' + data.FRAUD_DEC_REAS_CODE_TABLE[i] + ';';
            }
        }
    }
}

if (data.LOCAL_BLCL_CONTROL_CL == 'ZPDO2') {
    if (BLACK_PAN == 'False' && data.RES_LIMIT_ITOG_TYPE != 'SCOR' && data.RES_LIMIT_ITOG_TYPE != 'HYSTORY' && LIMIT_OLD_EXC =='False' && data.LOCAL_CRED_HISTORY != 'POSITIVE') {
        data.RES_DEC_AUTO = 'N';
        data.RES_COMMENT_NO_AUTO = ' Проверьте кредитную историю за 5 лет;' + ' ' + data.RES_COMMENT_NO_AUTO;
    }
    if (data.LOCAL_CRED_HISTORY != 'NEGATIVE' && data.LOCAL_CRED_HISTORY != 'HDNEGATIVE' || data.BCH_YBCH_NOT_WORK == 'Y') {
        data.RES_DEC_AUTO = 'N';
        data.RES_COMMENT_NO_AUTO = ' ЧС 1.21, проверьте кредитную историю;' + ' ' + data.RES_COMMENT_NO_AUTO;
    }
}

if (data.LOCAL_SCHEME_VALUE_OTHER > (data.LOCAL_SCHEME_VALUE_TOTAL - data.LOCAL_SCHEME_VALUE_OTHER)*0.2) {
    data.RES_DEC_AUTO = 'N';
    data.RES_COMMENT_NO_AUTO = ' Тип товара Прочее;' + ' ' + data.RES_COMMENT_NO_AUTO;
}

if (data.LOCAL_BLCL_CONTROL != undefined) {
    if (data.LOCAL_BLCL_CONTROL.indexOf('DEAD') != -1) {
        data.RES_DEC_AUTO = 'N';
        data.RES_COMMENT_NO_AUTO = ' В ЧС как умерший;' + ' ' + data.RES_COMMENT_NO_AUTO;
    }
}

if (data.DATA_ECB_NOT_WORK == 'Y') {
    data.RES_DEC_AUTO = 'N';
    data.RES_COMMENT_NO_AUTO = ' Ручная проверка ЧС;' + ' ' + data.RES_COMMENT_NO_AUTO;
}

if (data.BCH_YBCH_NOT_WORK == 'Y') {
    data.RES_DEC_AUTO = 'N';
    data.RES_COMMENT_NO_AUTO = ' Не сработал запрос в УБКИ;' + ' ' + data.RES_COMMENT_NO_AUTO;
}

if (data.RES_CRED_HIST_YBCH == 'NEGATIVE' && (data.RES_DEBCARD_Z_SRED>=1000 || data.RES_DEBCARD_P_SRED>=1000)) {
    data.RES_DEC_AUTO = 'N';
    data.RES_COMMENT_NO_AUTO = ' Отсутствие текущей просрочки (негативная кредитная история при наличии дебетных поступлений);' + ' ' + data.RES_COMMENT_NO_AUTO;
}

if (data.PROD_SCHEME_OTCNUMBER == '1966' || data.PROD_SCHEME_OTCNUMBER == '2493') {
    data.RES_DEC_AUTO = 'N';
    data.RES_COMMENT_NO_AUTO = ' КШ. Наличие юниоркарты;' + ' ' + data.RES_COMMENT_NO_AUTO;
}

if (data.LOCAL_TYPE_PURPOSE  == 'MOTO') { /*data.PROD_SCHEME_OTCNUMBER == '2222'*/
    data.RES_DEC_AUTO = 'N';
    data.RES_COMMENT_NO_AUTO = ' Мини-трактора;' + ' ' + data.RES_COMMENT_NO_AUTO;
}

if (data.PROD_SCHEME_OTCNUMBER == '2493' && data.PROD_RIP_TYPE != '4') {
    data.RES_DEC_AUTO = 'N';
    data.RES_COMMENT_NO_AUTO = ' Не РИП отделение;' + ' ' + data.RES_COMMENT_NO_AUTO;
}

if (data.LOCAL_RESTRUCT == 'Y') {
    data.RES_DEC_AUTO = 'N';
    data.RES_COMMENT_NO_AUTO = ' Была реструктуризация;' + ' ' + data.RES_COMMENT_NO_AUTO;
}


if (data.RES_DEC_REAS_CODE_TABLE != undefined && (data.RES_DEC_REAS_CODE_TABLE.indexOf('D015')!= -1 || data.RES_DEC_REAS_CODE_TABLE.indexOf('D016')!= -1 || data.RES_DEC_REAS_CODE_TABLE.indexOf('D017')!= -1
    || (data.RES_DEC_REAS_CODE_TABLE.indexOf('D049')!= -1 && data.vostokKC == 'Y'))) { /*||
 (data.RES_DEC_REAS_CODE_TABLE.indexOf('D049')!= -1 && data.vostokKC == 'Y') || data.RES_DEC_REAS_CODE_TABLE.indexOf('D029')!= -1 || (data.RES_DEC_REAS_CODE_TABLE.indexOf('D011')!= -1 && data.LOCAL_BLCL_COLOR !='R') ||
 data.RES_DEC_REAS_CODE_TABLE.indexOf('D009')!= -1|| data.RES_DEC_REAS_CODE_TABLE.indexOf('D018')!= -1*/
    var flagNeg = 'N';
    for (var i=0; i<data.RES_DEC_REAS_CODE_TABLE.length; i++){
        if (['A101','D015','D016','D017','D049'].indexOf(data.RES_DEC_REAS_CODE_TABLE[i]) ==-1){//,'D049','D029','D011','D009','D018'
            flagNeg = 'Y';
            break;
        }
    }
    if (flagNeg == 'N'){
        data.RES_DEC_AUTO = 'N';
        data.RES_DEC_CATEGORY = 'ACCEPT';
        data.RES_DEC_FINAL_FLOW = 'ACCEPT';
        if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D015')!= -1){
            data.RES_COMMENT_NO_AUTO = ' Текущая просрочка;' + ' ' + data.RES_COMMENT_NO_AUTO;
        }
        if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D016')!= -1){
            data.RES_COMMENT_NO_AUTO = ' >=4 активных кредита;' + ' ' + data.RES_COMMENT_NO_AUTO;
        }
        if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D017')!= -1){
            data.RES_COMMENT_NO_AUTO = ' Кредит взят<2-х месяцев;' + ' ' + data.RES_COMMENT_NO_AUTO;
        }
        if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D049')!= -1){
            data.RES_COMMENT_NO_AUTO = ' Восток. Проверьте условия амнистии;' + ' ' + data.RES_COMMENT_NO_AUTO;
        }
        /*
        if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D029')!= -1){
            data.RES_COMMENT_NO_AUTO = ' D029;Экспертное решение. Проверить амнистию НКИ;' + ' ' + data.RES_COMMENT_NO_AUTO;
        }
        if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D011')!= -1 ){
            data.RES_COMMENT_NO_AUTO = ' D011;Экспертное решение. Проверить амнистию СО;' + ' ' + data.RES_COMMENT_NO_AUTO;
        }
        if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D009')!= -1){
            data.RES_COMMENT_NO_AUTO = ' D009;Экпертное решение. Сумма/Аванс;' + ' ' + data.RES_COMMENT_NO_AUTO;
        }
        if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D018')!= -1){
            data.RES_COMMENT_NO_AUTO = ' D018;Экпертное решение. Сумма/Аванс;' + ' ' + data.RES_COMMENT_NO_AUTO;
        }*/
    }
}





if (data.eqlComfy == 'Y' && data.RES_OFFER1_LOAN_AMNT>50000) {
    data.RES_DEC_AUTO = 'N';
    data.RES_COMMENT_NO_AUTO = ' Кредит >50тыс, проверить отношение рисковых товаров;' + ' ' + data.RES_COMMENT_NO_AUTO;
}

//-------------------------------------------------------------------------------

if (data.RES_DEC_AUTO == 'Y' || data.RES_DEC_FINAL_FLOW == 'DECLINE') {
    data.RES_COMMENT_NO_AUTO = '';
}

if (data.RES_COMMENT_NO_AUTO != '') {
    data.RES_COMMENT_NO_AUTO = 'Проверьте клиента:' + ' ' + data.RES_COMMENT_NO_AUTO;
}

//----------------------------------------------A101 clean up-----------------

/*
 if (data.RES_DEC_FINAL_FLOW != 'ACCEPT') {
 for (var i=0; i<data.RES_DEC_REAS_CODE_TABLE.length; i++){
 if (data.RES_DEC_REAS_CODE_TABLE[i] != 'A101') {
 delete data.RES_DEC_REAS_CODE_TABLE[i];
 }
 }
 }
 */
//------------------------------------Offer comment------------

if (data.RES_LIMIT_ITOG_TYPE == 'DEPOS') {
    LOCAL_FINAL_KRED_SUM = data.RES_FINAL_KRED_SUM;
}
else {
    LOCAL_FINAL_KRED_SUM = data.RES_FINAL_KRED_SUM/data.LOCAL_SYSTEM_DTI;
}

data.RES_OFFER_TEXT = '';

if (data.RES_DEC_CATEGORY == 'DECLINE_OVVERIDE' || data.RES_DEC_REAS_CODE_TABLE[0] == 'D011') {
    if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D018')!= -1) {
        data.RES_OFFER_TEXT = 'Аванс ' + data.RES_OFFER1_FIRST_PAYM + '%';
    }
    if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D009')!= -1) {
        if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D018')!= -1) {
            if (Math.round(data.RES_OFFER1_LOAN_AMNT/10) * 10 < (data.LOCAL_SCHEME_VALUE_TOTAL - data.LOCAL_SCHEME_VALUE_TOTAL * data.RES_OFFER1_FIRST_PAYM/100)) {
                data.RES_OFFER_TEXT = 'Cумма кредита: ' + Math.round(Math.min(data.RES_OFFER1_LOAN_AMNT,50000)/10) * 10 + 'UAH';
            }
        }
        else {
            data.RES_OFFER_TEXT = 'Cумма кредита: ' + Math.round(Math.min(data.RES_OFFER1_LOAN_AMNT,50000)/10) * 10 + 'UAH';
        }
    }
}

if (data.RES_TYPE_CUST == 'INTERN' && (data.RES_OFFER1_LOAN_AMNT < data.PROD_SCHEME_MIN_AMOUNT_INT)) {
    data.RES_OFFER_TEXT = '';
}
else {
    if (data.RES_OFFER1_LOAN_AMNT<data.PROD_SCHEME_MIN_AMOUNT_EXT) {
        data.RES_OFFER_TEXT = '';
    }
}



// ------------------------------------------final comment----------------------------------

if (data.RES_OFFER_TEXT != '') {
    data.RES_DEC_FINAL_CODE_COMMENT = data.RES_DEC_FINAL_CODE_COMMENT + ' Кредитна пропозиція: ' + data.RES_OFFER_TEXT;
}

if (data.LOCAL_CONTACT_PHONE_MOB != undefined) {
    data.RES_CALL_MOB_NUMBER = data.LOCAL_CONTACT_PHONE_MOB;
}

if (data.LOCAL_CONTACT_PHONE_HOME != undefined) {
    data.RES_CALL_HOME_NUMBER= data.LOCAL_CONTACT_PHONE_HOME;
}

if (data.LOCAL_CONTACT_PHONE_WORK != undefined) {
    data.RES_CALL_WORK_NUMBER = data.LOCAL_CONTACT_PHONE_WORK;
}


