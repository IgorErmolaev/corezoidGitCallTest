// JavaScript Document

if (data.RES_CALL_LAST_WORK_TOTAL == 'C_POS' || data.RES_CALL_LAST_HOME_TOTAL == 'C_POS' || data.RES_CALL_LAST_MOB_TOTAL == 'C_POS') {
    data.RES_CALL_HOME_PHONE = 'N';
    data.RES_CALL_MOB_PHONE = 'N';
    data.RES_CALL_WORK_PHONE = 'N';
}

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
                return  needNum ='Y';
                break;
            }
        }
    } while (i <= phoneNumLength - 5);
}

/*------------- -----------------------------BAD PHONE NUMBER  -------------------------------------------------------*/

LOCAL_CALL_HOME_PHONE = 'N';
LOCAL_CALL_MOB_PHONE = 'N';
LOCAL_CALL_WORK_PHONE = 'N';

var phoneNumLength = 13;

if (data.LOCAL_CONTACT_PHONE_HOME != null) {
    LOCAL_CALL_HOME_PHONE = BadPhone(data.LOCAL_CONTACT_PHONE_HOME,phoneNumLength);
}
if (data.LOCAL_CONTACT_PHONE_MOB != null) {
    LOCAL_CALL_MOB_PHONE = BadPhone(data.LOCAL_CONTACT_PHONE_MOB,phoneNumLength);
}
if (data.LOCAL_CONTACT_PHONE_WORK != null) {
    LOCAL_CALL_WORK_PHONE = BadPhone(data.LOCAL_CONTACT_PHONE_WORK,phoneNumLength);
}

if (LOCAL_CALL_HOME_PHONE == 'Y') {
    data.RES_CALL_HOME_PHONE = 'Y';
}
if (LOCAL_CALL_MOB_PHONE == 'Y') {
    data.RES_CALL_MOB_PHONE = 'Y';
}

if (LOCAL_CALL_WORK_PHONE == 'Y') {
    data.RES_CALL_WORK_PHONE = 'Y';
}

/*---------Black List--	----------*/
if (data.DATA_PERSLINK!= undefined) {
    for (i = 0; i < data.DATA_PERSLINK.length; i++) {
        if (data.DATA_PERSLINK[i].CUST_ID == data.APP_CUST_ID) {
            if (data.DATA_PERSLINK[i].CALL == 'Y') {
                data.RES_CALL_HOME_PHONE = 'Y';
                data.RES_CALL_WORK_PHONE = 'Y';
            }
        }
    }
}

data.RES_CUST_NEED_CALL = 'N';
data.RES_CALL_DIALOGE_TYPE = '';

if (data.RES_CALL_HOME_PHONE == 'Y' || data.RES_CALL_WORK_PHONE == 'Y' || data.RES_CALL_MOB_PHONE == 'Y') {
    data.RES_CUST_NEED_CALL = 'Y';
    data.RES_CALL_DIALOGE_TYPE = 'RASSRO';
}

