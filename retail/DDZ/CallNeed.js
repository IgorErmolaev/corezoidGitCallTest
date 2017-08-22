// JavaScript Document

data.RES_CALL_DIALOGE_TYPE = 'DDZ';

data.RES_CALL_NEED = new Array();

data.RES_CALL_HOME_PHONE = 'N';
data.RES_CALL_MOB_PHONE = 'N';
data.RES_CALL_WORK_PHONE = 'N';

var CALL_NEED;

for (var i = 0; i < data.APP_PHONE.length; i++){
    if (data.APP_PHONE[i].NUMBER_CALL!= undefined && data.APP_PHONE[i].NUMBER_CALL != '') {
        CALL_NEED = 'N';
        if (data.APP_PHONE[i].TYPE_CALL == 'MOB') {
            data.RES_CALL_MOB_PHONE = 'Y';
            CALL_NEED = 'Y';
        }
    }
    data.RES_CALL_NEED.push(CALL_NEED);
}