// JavaScript Document
data.RES_CALL_NEED = new Array();

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


/*--------------------------------------Type of phone----------------------------------------------------------------------*/
for (var i=0; i<data.APP_PHONE.length;i++) {
    RES_CALL_BAL = data.APP_PHONE[i].CALL_BAL_HIST;
    PHONE_TYPE_CALL = data.APP_PHONE[i].TYPE_CALL;
    if (data.APP_PHONE[i].CALL_BAL_HIST == '' || data.APP_PHONE[i].CALL_BAL_HIST == undefined) {
        RES_CALL_BAL= 0;
    }
    if (PHONE_TYPE_CALL == 'WORK') {
        data.RES_CALL_WORK_BAL = RES_CALL_BAL;
    }
    else {
        if (PHONE_TYPE_CALL == 'HOME') {
            data.RES_CALL_HOME_BAL = RES_CALL_BAL;
        }
        else {
            if (PHONE_TYPE_CALL == 'MOB') {
                data.RES_CALL_MOB_BAL = RES_CALL_BAL;
            }
        }
    }
}

data.RES_CALL_DIALOGE_TYPE = 'FAST';


/*------------- -----------------------------BAD PHONE NUMBER  -------------------------------------------------------*/

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

/*---------Black List--	----------*/
if (data.DATA_PERSLINK!= undefined) {
    for (i = 0; i < data.DATA_PERSLINK.length; i++) {
        if (data.DATA_PERSLINK[i].CUST_ID == data.APP_CUST_ID) {
            if (data.DATA_PERSLINK[i].CALL == 'Y') {
                data.LOCAL_CALL_HOME_PHONE = 'Y';
                data.LOCAL_CALL_WORK_PHONE = 'Y';
            }
        }
    }
}


var  CALL_IS_NEEDED, CALL_NEED_MAS;

data.RES_CALL_HOME_PHONE = 'N';
data.RES_CALL_MOB_PHONE = 'N';
data.RES_CALL_WORK_PHONE = 'N';

if (data.RES_DEC_CATEGORY == 'DECLINE'){
    CALL_IS_NEEDED ='N';
}
else {
    CALL_IS_NEEDED = 'Y';
}

CALL_NEED_MAS = 'N';

if (CALL_IS_NEEDED = 'Y') {
    for (var i = 0; i < data.APP_PHONE.length; i++){
        if (data.APP_PHONE[i].NUMBER_CALL!= undefined && data.APP_PHONE[i].NUMBER_CALL != '') {
            CALL_NEED_MAS = 'N';

            if (data.APP_PHONE[i].TYPE_CALL == 'WORK') {
                if (data.LOCAL_CALL_WORK_PHONE == 'Y') {
                    CALL_NEED_MAS = 'Y';
                }
                if (data.APP_EMPL_SOCIALSTATUS == 'DECREE' || data.APP_EMPL_SOCIALSTATUS == 'UNEMP' || data.APP_EMPL_SOCIALSTATUS == 'PENSION' || data.APP_EMPL_SOCIALSTATUS == 'STUDENT') {
                    data.RES_CALL_WORK_PHONE = CALL_NEED_MAS;
                }
            }
            if (data.APP_PHONE[i].TYPE_CALL == 'HOME') {
                if (data.LOCAL_CALL_HOME_PHONE == 'Y') {
                    CALL_NEED_MAS = 'Y';
                    data.RES_CALL_HOME_PHONE = CALL_NEED_MAS;
                }
            }
            if (data.APP_PHONE[i].TYPE_CALL == 'MOB') {
                if (data.RES_CALL_MOB_BAL <= 0) {
                    CALL_NEED_MAS = 'Y';
                    data.RES_CALL_MOB_PHONE = CALL_NEED_MAS;
                }
                if (data.LOCAL_CALL_MOB_PHONE == 'Y') {
                    CALL_NEED_MAS = 'Y';
                    data.RES_CALL_MOB_PHONE = CALL_NEED_MAS;
                }
            }
        }
        data.RES_CALL_NEED.push(CALL_NEED_MAS);
    }
}


