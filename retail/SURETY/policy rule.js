data.RES_DEC_REAS_CODE_TABLE = new Array();
var stateO = new Array('A','O','R','D');
var cardU = new Array('UNI','UN_M','GOLD','VIP');

data.CODE = 'A101';
data.LOCAL_COUNT_ACTIVE_CREDITS = 0;

//-------------проверка открытой карты---------
var credCard = 'N';
var lim = [];

if (data.DATA_CRED_P48 != undefined) {
    for(var i=0; i<data.DATA_CRED_P48.length; i++) {
        if (cardU.indexOf(data.DATA_CRED_P48[i].PRODUCT) != -1 && stateO.indexOf(data.DATA_CRED_P48[i].STATE) != -1 && data.DATA_CRED_P48[i].CCY == 'UAH') {
            lim.push(Number(data.DATA_CRED_P48[i].LIMIT));
            credCard = 'Y';
        }
    }
}

if (data.DATA_CRED_P48.length == 0 ) {
    if (data.DATA_CRED != undefined) {
        for(var i=0; i<data.DATA_CRED.length; i++) {
            if (cardU.indexOf(data.DATA_CRED[i].PRODUCT) != -1 && stateO.indexOf(data.DATA_CRED[i].STATE) != -1 && data.DATA_CRED[i].CCY == 'UAH') {
                lim.push(Number(data.DATA_CRED[i].LIMIT));
                credCard = 'Y';
            }
        }
    }
}

/*------------------------------COUNT ACTIVE CREDITS-----------------------------------------------------*/

if (data.DATA_CRED != undefined) {
    for (var i=0; i< data.DATA_CRED.length; i++){
        if (data.DATA_CRED[i].STATE == 'O' || data.DATA_CRED[i].STATE == 'L' || data.DATA_CRED[i].STATE =='R' || data.DATA_CRED[i].STATE == 'A' || data.DATA_CRED[i].STATE == 'D'){
            if (data.DATA_CRED[i].DLP == '' && data.DATA_CRED[i].TYPE != 'CRCR' && data.DATA_CRED[i].TYPE != 'CRCP'){
                if (Math.abs(data.DATA_CRED[i].BAL) != 0){
                    data.LOCAL_COUNT_ACTIVE_CREDITS ++;
                }
            }
            else {
                if (data.DATA_CRED[i].START_SUMM !== 0){
                    if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100 > 20){
                        data.LOCAL_COUNT_ACTIVE_CREDITS ++;
                    }
                }
            }
        }
    }
}


//-------------------------------Fin Phone-----------------------------------

if (data.FinPhone == 'N') {
    data.RES_DEC_REAS_CODE_TABLE.push('D002');
}

//----------------------------Age--------------------------------

if (data.RES_AGE < 21) {
    data.RES_DEC_REAS_CODE_TABLE.push('D012');
}

//--------------Fiz stop------------------------------

if (data.f_nclient != 'A101' ) {
    fiz_neg = 'D001'+'_'+data.f_nclient;
    data.RES_DEC_REAS_CODE_TABLE.push(fiz_neg);
}

//---------------Credcard--------------
/*
 if (credCard == 'N') {
 data.RES_DEC_REAS_CODE_TABLE.push('D015');
 }
 */

//----------------Limit-----------------

if (data.LimTek<500 && data.LimNew<500) {
    data.RES_DEC_REAS_CODE_TABLE.push('D003');
}

//---------2 and more active credits

/*
 if (data.LOCAL_COUNT_ACTIVE_CREDITS>=2) {
 data.RES_DEC_REAS_CODE_TABLE.push('D320');
 }
 */

switch (true)
{
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D002')!= -1):  data.CODE = 'D002'; break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D012')!= -1):  data.CODE = 'D012'; break;
    case (data.f_nclient != 'A101'):                           data.CODE = fiz_neg; break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D015')!= -1):  data.CODE = 'D015'; break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D003')!= -1):  data.CODE = 'D003'; break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D320')!= -1):  data.CODE = 'D320'; break;
    default:   data.CODE = 'A101';
}

if (data.RES_DEC_REAS_CODE_TABLE.length>0){
    data.DEC_CATEGORY = 'DECLINE';
}
else {
    data.DEC_CATEGORY = 'ACCEPT';
}