var stateC = new Array ('C','K','Z');
var stateO =  new Array('O','L','R','A','D');
var cred_card = new Array ('UNI','UN_M','GOLD','VIP');

//-----------SCOR_INCOME---

data.LOCAL_SCOR_INCOME = data.APP_INCOME_MONTHSALARY_EXT + data.APP_INCOME_OTHERSOURCE_EXT;


//-----------SCOR_PROS---

data.LOCAL_SCOR_COUNT_PROS = 0;

for (var i=0; i<data.DATA_CRED.length;i++) {
    if (data.DATA_CRED[i].REFERENC!= undefined) {
        data.LOCAL_SCOR_COUNT_PROS += data.DATA_CRED[i]['1_30_DAYS_CRED']
    }
}

//--------SCOR_CLOSE_CRED---
data.LOCAL_SCOR_CLOSE_CRED = 'N';

for (var i=0; i<data.DATA_CRED.length;i++) {
    if (stateC.indexOf(data.DATA_CRED[i].STATE)!=-1) {
        if (data.DATA_CRED[i].PRODUCT == 'AVTO' || data.DATA_CRED[i].PRODUCT == 'GIL') {
            data.LOCAL_SCOR_CLOSE_CRED = 'Y';
        }
    }
}

//------SCOR ACTIVE CREDITS---

data.LOCAL_SCOR_ACTIVE_CREDITS = 0;

for (var i=0; i<data.DATA_CRED.length;i++) {
    if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1) {
        if (cred_card.indexOf(data.DATA_CRED[i].PRODUCT)!=-1) {
            if (Math.abs(data.DATA_CRED[i].LIMIT) != 0){
                if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].LIMIT)*100>20) {
                    data.LOCAL_SCOR_ACTIVE_CREDITS +=1;
                }
            }
        }
        else {
            if (Math.abs(data.DATA_CRED[i].START_SUMM) != 0) {
                if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100>20) {
                    data.LOCAL_SCOR_ACTIVE_CREDITS +=1;
                }
            }
        }
    }
}

//-------SCOR black list---

data.LOCAL_SCOR_BLCL = 'N';

if (data.DATA_PERSLINK != undefined) {
    for (var i = 0; i < data.DATA_PERSLINK.length; i++) {
        if (data.DATA_PERSLINK[i].CUST_ID == data.APP_CUST_ID) {
            data.LOCAL_SCOR_BLCL = 'Y';
            break;
        }
    }
}