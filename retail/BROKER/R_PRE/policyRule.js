// JavaScript Document

var stateO = new Array('A','O','R','D');
var cardU = new Array('UNI','UN_M','GOLD','VIP');

data.RES_BI = 'N';

var credCard = 'N';

if (data.DATA_CRED_P48 != undefined) {
    for(var i=0; i<data.DATA_CRED_P48.length; i++) {
        if (cardU.indexOf(data.DATA_CRED_P48[i].PRODUCT) != -1 && stateO.indexOf(data.DATA_CRED_P48[i].STATE) != -1 && data.DATA_CRED_P48[i].CCY == 'UAH') {
            if (data.DATA_CRED_P48[i].LIMIT > 50) {
                credCard = 'Y';
            }
        }
    }
}

//---------------No credit card--------------------------------

if (credCard == 'N' && data.PROD_CHAR_TYPE != 'RASSR') {
    data.RES_DEC_REAS_FINAL_CODE = 'M001';
    data.RES_DEC_CATEGORY = 'DECLINE';
    data.RES_BI = 'D';
    data.RES_OFFER1_FIRST_PAYM = 0;
    data.RES_OFFER1_LOAN_AMNT = 0;
    data.RES_OFFER_TEXT = 'Оформление кредита без карты универсальной с лимитом НЕВОЗМОЖНО!';
}

if (data.PROD_CLIENT_BLOCK == 'Y') {
    data.RES_DEC_REAS_FINAL_CODE = 'M002';
    data.RES_DEC_CATEGORY = 'DECLINE';
    data.RES_BI = 'D';
    data.RES_OFFER1_FIRST_PAYM = 0;
    data.RES_OFFER1_LOAN_AMNT = 0;
    data.RES_OFFER_TEXT = 'По клиенту уже была подана заявка за последний месяц, повторная подача нецелесообразна';
}