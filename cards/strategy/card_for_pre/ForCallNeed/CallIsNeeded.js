data.RES_CALL_NEED = new Array();

var startType = new Array('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','UNIPACKSAS','ONLINEANKETA');
var typePogash = new Array('S','P','B','O','M');
var typeLimit = new Array('GOLD_UP', 'GOLD_NKK', 'CASHPAYM', 'DEPOS', 'PENS', 'ZP', 'SOTR','IMPORTANT', 'DISTRIBUT', 'UPGRADE');
var socStat = new Array ('DECREE','UNEMP','PENSION','STUDENT');

var callNeed = 'N';
var callHistNeg = 'N';
var CcyNative = 'UAH';
var typePhone;

function BadPhone (localContactPhone,phoneNumLength){
    var massBadTel = new Array('00000','11111','22222','33333','44444','55555','66666','77777','88888','99999','54321','12345');
    var i = 0;
    var needNum = 'N';
    do {
        if (needNum != 'Y'){
            if (massBadTel.indexOf(localContactPhone.substring(i,i+5)) == -1){
                i++;
            }
            else {
                needNum ='Y';
                return  needNum;
                break;
            }
        }
    } while (i <= phoneNumLength - 5);
    return needNum;
}

data.RES_CUST_NEED_CALL = 'N';
data.RES_CALL_MOB_PHONE = 'N';
data.RES_CALL_WORK_PHONE = 'N';
data.RES_CALL_HOME_PHONE = 'N';

if (data.APP_PHONE != undefined) {
    for (var i = 0; i < data.APP_PHONE.length; i++) {
        if (data.APP_PHONE[i].CALL_TOTAL_HIST != undefined && data.APP_PHONE[i].CALL_TOTAL_HIST != 'C_POS') {
            callHistNeg = 'Y';
        }
    }
}

/*DIALOGE_TYPE*/
data.RES_CALL_DIALOGE_TYPE = 'NORMAL';

if (startType.indexOf(data.PROD_CHAR_TYPE)){
    if (data.PROD_CHAR_LIMITREQUESTED == 0 && data.RES_LIMIT_ITOG >0 ){
        data.RES_CALL_DIALOGE_TYPE = 'ZERO_LIM';
        callNeed = 'Y';
    }
}

/*Type phone*/
var RES_CALL_WORK_BAL,RES_CALL_HOME_BAL,RES_CALL_MOB_BAL;
if (data.APP_PHONE != undefined) {
    for (var i = 0; i < data.APP_PHONE.length; i++) {
        if (data.APP_PHONE[i].CALL_BAL_HIST == undefined) {
            data.APP_PHONE[i].CALL_BAL_HIST = 0;
        }
        if (data.APP_PHONE[i].TYPE_CALL == 'WORK') {
            RES_CALL_WORK_BAL = data.APP_PHONE[i].CALL_BAL_HIST;
        }
        if (data.APP_PHONE[i].TYPE_CALL == 'HOME') {
            RES_CALL_HOME_BAL = data.APP_PHONE[i].CALL_BAL_HIST;
        }
        if (data.APP_PHONE[i].TYPE_CALL == 'MOB') {
            RES_CALL_MOB_BAL = data.APP_PHONE[i].CALL_BAL_HIST;
        }
    }
}

if (RES_CALL_HOME_BAL <= 0){
    typePhone = 'H';
}
if (RES_CALL_WORK_BAL <= 0){
    typePhone = 'W';
}
if (data.RES_CALL_DIALOGE_TYPE == 'ZERO_LIM'){
    typePhone = 'M';
}
if (RES_CALL_HOME_BAL <= 0 && RES_CALL_WORK_BAL <= 0){
    typePhone = 'HW';
}

/*BAD NUMBER PHONE*/
data.LOCAL_CALL_HOME_PHONE = 'N';
data.LOCAL_CALL_MOB_PHONE = 'N';
data.LOCAL_CALL_WORK_PHONE = 'N';

var phoneNumLength = 13;

if (data.LOCAL_CONTACT_PHONE_HOME != null) {
    data.LOCAL_CALL_HOME_PHONE = BadPhone(data.LOCAL_CONTACT_PHONE_HOME,phoneNumLength);
}
if (data.LOCAL_CONTACT_PHONE_MOB != null) {
    data.LOCAL_CALL_MOB_PHONE = BadPhone(data.LOCAL_CONTACT_PHONE_MOB,phoneNumLength);
}
if (data.LOCAL_CONTACT_PHONE_WORK != null) {
    data.LOCAL_CALL_WORK_PHONE = BadPhone(data.LOCAL_CONTACT_PHONE_WORK,phoneNumLength);
}

/*black list*/
if (data.DATA_PERSLINK != undefined) {
    for (var i = 0; i < data.DATA_PERSLINK.length; i++) {
        if (data.DATA_PERSLINK[i].CUST_ID == data.APP_CUST_ID) {
            if (data.DATA_PERSLINK[i].CALL == 'Y') {
                data.LOCAL_CALL_HOME_PHONE = 'Y';
                data.LOCAL_CALL_WORK_PHONE = 'Y';
            }
        }
    }
}

/*ticket extract*/
if (data.LOCAL_TICKET_FLAG_EXTRACT == 'Y'){
    data.LOCAL_CALL_WORK_PHONE = 'Y';
}


/*PHONE CHECK and LIMITREQUESTED*/
if (data.PROD_CHAR_LIMITREQUESTED >0 &&
    ( ( data.RES_LIMIT_ITOG >=1000 && (data.RES_DEBCARD_POGASHENIE == null || data.RES_DEBCARD_POGASHENIE == ''  || typePogash.indexOf(data.RES_DEBCARD_POGASH_TYPE) !=-1) && typeLimit.indexOf(data.RES_LIMIT_ITOG_TYPE) ==-1 ) || callHistNeg == 'Y')){
    callNeed = 'Y';
}
else {
    callNeed = 'N';
    if (data.PROD_CHAR_LIMITREQUESTED ==0 && data.RES_LIMIT_ITOG>0 && data.RES_MATRIX_DOHODN_COEFF != 1){
        callNeed = 'Y';
    }
}

/*Score_call*/
if (data.RES_CALL_DIALOGE_TYPE == 'ZERO_LIM'){
    if (data.PROD_CHAR_LIMITREQUESTED == 0 && data.RES_LIMIT_ITOG >0 && data.RES_SCCARD_CALL_BAL >= data.score_call_bal && data.RES_MATRIX_DOHODN_COEFF != 1){
        callNeed = 'Y';
    }
    else {
        callNeed = 'N';
    }
}

/*DECLINE GROUP and CALL EXCLUDES*/
if (data.RES_DEC_CATEGORY == 'DECLINE' || data.RES_DEC_CATEGORY == 'ZERO_LIMIT' ||
    (data.LOCAL_RESTRUCTURING >= 100 && data.PROD_CHAR_LIMITREQUESTED >0)||
    (data.APP_CUST_SPECIALPROJECT == 'ZP' && data.PROD_CHAR_LIMITREQUESTED >0) ||
    (data.APP_CUST_SPECIALPROJECT == 'FOOD' && data.PROD_CHAR_LIMITREQUESTED ==0) ||
    (data.DATA_CASHPAYMENTS_LIMIT >0 && data.PROD_CHAR_LIMITREQUESTED >0) ||
    (data.DATA_CARD_UPGRADE_LIMIT >0 && data.RES_LIMIT_ITOG <= data.DATA_CARD_UPGRADE_LIMIT) ||
    (data.DATA_CARD_UPGRADE_LIMIT >0 && data.PROD_CHAR_LIMITREQUESTED == 0) ||
    data.FRAUD_FRAUD_SUSPICTION == 'Y' || data.RES_PROD_TYPE == 'VIP'){
    callNeed = 'N';
}

if (data.RES_CALL_DIALOGE_TYPE != 'ZERO_LIM' && data.PROD_CHAR_LIMITREQUESTED ==0){
    callNeed = 'N';
}

/*SET PHONE CHECKS*/
var callNeedMas = 'N';
if (callNeed == 'Y'){
    for (i=0; i<data.APP_PHONE.length; i++){
        if (data.APP_PHONE[i].NUMBER_CALL != undefined){
            callNeedMas = 'N';
            if (data.APP_PHONE[i].TYPE_CALL == 'WORK' ){
                if (typePhone == 'HW' || typePhone == 'W'){
                    callNeedMas = 'Y';
                }
                if (data.LOCAL_CALL_WORK_PHONE == 'Y'){
                    callNeedMas = 'Y';
                }
                if (data.RES_CALL_DIALOGE_TYPE == 'ZERO_LIM' || socStat.indexOf(data.APP_EMPL_SOCIALSTATUS) != -1 ){
                    callNeedMas = 'N';
                }
                data.RES_CALL_WORK_PHONE = callNeedMas;
            }
            if (data.APP_PHONE[i].TYPE_CALL == 'HOME'){
                if (typePhone == 'HW' || typePhone == 'H'){
                    callNeedMas = 'Y';
                }
                if (data.LOCAL_CALL_HOME_PHONE == 'Y') {
                    callNeedMas = 'Y';
                }
                if (data.RES_CALL_DIALOGE_TYPE == 'ZERO_LIM'){
                    callNeedMas = 'N';
                }
                data.RES_CALL_HOME_PHONE = callNeedMas;
            }
            if (data.APP_PHONE[i].TYPE_CALL == 'MOB'){
                if (typePhone == 'M' ){
                    callNeedMas = 'Y';
                }
                if (data.LOCAL_CALL_MOB_PHONE == 'Y') {
                    callNeedMas = 'Y';
                }
                if (data.RES_CALL_DIALOGE_TYPE == 'ZERO_LIM'){
                    callNeedMas = 'Y';
                }
                data.RES_CALL_MOB_PHONE = callNeedMas;
            }
            if (data.DATA_WORK_TOP1000 == 'Y'){
                if (data.APP_PHONE[i].TYPE_CALL == 'TOP'){
                    callNeedMas = 'Y';
                    data.RES_CALL_WORK_PHONE = 'Y';
                }
            }
            if (data.RES_CALL_DIALOGE_TYPE == 'ZERO_LIM' && data.PROD_SCHEME_CCY_LOAN != CcyNative){
                callNeedMas = 'N';
            }

        }
        data.RES_CALL_NEED.push(callNeedMas);
    }
}

if (data.RES_CALL_NEED.length!=0 && data.RES_CALL_NEED.indexOf('Y')!=-1){
    data.RES_CUST_NEED_CALL = 'Y';
}
else {
    data.RES_CUST_NEED_CALL = 'N';
    data.RES_CALL_MOB_PHONE = 'N';
    data.RES_CALL_WORK_PHONE = 'N';
    data.RES_CALL_HOME_PHONE = 'N';
}

data.nodeName = 'CallsNeeded';