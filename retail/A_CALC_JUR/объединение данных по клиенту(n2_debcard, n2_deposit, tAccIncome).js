// JavaScript Document

function Datediff(days_diff ){
    var dateOpen = days_diff; // дата на входе
    var today = Date.now();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

var card_type = new Array ('W','W_F','W_T');

//---------------------------ZP SRED-----------

data.LOCAL_DEBCARD_Z_SRED = 0;
data.LOCAL_DEBCARD_P_SRED = 0;
data.RES_DEBCARD_ZP_PAN = '';
data.RES_DEBCARD_ZP = 'N';
data.RES_DEBCARD_Z_SRED = 0;
data.RES_DEBCARD_PENS_PAN = '';
data.RES_DEBCARD_PENS = 'N';
data.RES_DEBCARD_P_SRED = 0;
data.LOCAL_PERSONAL_SRED = 0;
data.LOCAL_PERSONAL_ACTIVE = 'N';
data.LOCAL_STUD_SRED = 0;
data.LOCAL_STUD_ACTIVE = 'N';


for (var i=0; i<data.DATA_DEBCARD.length; i++) {
    if (card_type.indexOf(data.DATA_DEBCARD[i].TYPE_CARD) != -1 && data.DATA_DEBCARD[i].ACTIVE =='Y') {
        if (Datediff(data.DATA_DEBCARD[i].DATE_START)>90) {
            data.LOCAL_DEBCARD_Z_SRED = (data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02+data.DATA_DEBCARD[i].Z03)/3;
        }
        else {
            data.LOCAL_DEBCARD_Z_SRED = Math.max(data.DATA_DEBCARD[i].Z01,data.DATA_DEBCARD[i].Z02);
        }
        if (data.DATA_DEBCARD[i].BANK =='AB' && data.LOCAL_DEBCARD_Z_SRED>5000) {
            data.RES_DEBCARD_Z_SRED += 5000;
        }
        else {
            data.RES_DEBCARD_Z_SRED += data.LOCAL_DEBCARD_Z_SRED;
        }
        data.RES_DEBCARD_ZP = 'Y';
        data.RES_DEBCARD_ZP_PAN = data.DATA_DEBCARD[i].PAN + ';'+ data.RES_DEBCARD_ZP_PAN;
    }

    if (data.DATA_DEBCARD[i].TYPE_CARD =='L' && data.DATA_DEBCARD[i].ACTIVE =='Y') {
        switch (true)
        {
            case (Datediff(data.DATA_DEBCARD[i].DATE_START)>=120): data.LOCAL_DEBCARD_P_SRED = (data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02+data.DATA_DEBCARD[i].Z03)/3; break;
            case (Datediff(data.DATA_DEBCARD[i].DATE_START)>=90):  data.LOCAL_DEBCARD_P_SRED = (data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02+data.DATA_DEBCARD[i].Z03/3)/3; break;
            case (Datediff(data.DATA_DEBCARD[i].DATE_START)>=60):  data.LOCAL_DEBCARD_P_SRED = (data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02/3)/2; break;
            case (Datediff(data.DATA_DEBCARD[i].DATE_START)>=30):  data.LOCAL_DEBCARD_P_SRED = (data.DATA_DEBCARD[i].Z01)/3; break;
        }
        if (data.DATA_DEBCARD[i].BANK =='AB' && data.LOCAL_DEBCARD_P_SRED>5000) {
            data.RES_DEBCARD_P_SRED += 5000;
        }
        else {
            data.RES_DEBCARD_P_SRED += data.LOCAL_DEBCARD_P_SRED;
        }
        data.RES_DEBCARD_PENS = 'Y';
        data.RES_DEBCARD_PENS_PAN = data.DATA_DEBCARD[i].PAN + ';'+ data.RES_DEBCARD_PENS_PAN;
    }

    if (data.DATA_DEBCARD[i].TYPE_CARD =='P' && data.DATA_DEBCARD[i].ACTIVE =='Y') {
        data.LOCAL_PERSONAL_SRED = Math.min(data.DATA_DEBCARD[i].Z01,(data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02)/2,(data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02+data.DATA_DEBCARD[i].Z03)/3);
        data.LOCAL_PERSONAL_ACTIVE = 'Y';
    }

    if (data.DATA_DEBCARD[i].TYPE_CARD =='S' && data.DATA_DEBCARD[i].ACTIVE =='Y') {
        data.LOCAL_STUD_SRED = Math.min(data.DATA_DEBCARD[i].Z01,(data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02)/2,(data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02+data.DATA_DEBCARD[i].Z03)/3);
        data.LOCAL_STUD_ACTIVE = 'Y';
    }
}

if (data.RES_DEBCARD == undefined){
    data.RES_DEBCARD = [];
}

var lnDeb = data.RES_DEBCARD.length;

data.RES_DEBCARD[lnDeb] = {};
data.RES_DEBCARD[lnDeb].CUST_ID = data.custID;
data.RES_DEBCARD[lnDeb].Z_SRED = data.RES_DEBCARD_Z_SRED;
data.RES_DEBCARD[lnDeb].Z_ACTIVE = data.RES_DEBCARD_ZP;
data.RES_DEBCARD[lnDeb].P_SRED = data.RES_DEBCARD_P_SRED;
data.RES_DEBCARD[lnDeb].P_ACTIVE = data.RES_DEBCARD_PENS;
data.RES_DEBCARD[lnDeb].S_SRED = data.LOCAL_STUD_SRED;
data.RES_DEBCARD[lnDeb].S_ACTIVE = data.LOCAL_STUD_ACTIVE;

delete data.DATA_DEBCARD;

//---------------------------Deposit-----------

data.RES_DEPOZIT_ACTIVE = 'N';
data.RES_DEPOZIT_TOTAL = 0;

for (var i=0; i< data.DATA_DEPOSIT.length; i++) {
    if (data.DATA_DEPOSIT[i].REFERENC!= undefined) {
        data.RES_DEPOZIT_ACTIVE = 'Y'
    }
    data.RES_DEPOZIT_TOTAL += data.DATA_DEPOSIT[i].BAL
}


if (data.RES_DEPOSIT == undefined){
    data.RES_DEPOSIT = [];
}

var lnDep = data.RES_DEPOSIT.length;

data.RES_DEPOSIT[lnDep] = {};
data.RES_DEPOSIT[lnDep].CUST_ID = data.custID;
data.RES_DEPOSIT[lnDep].ACTIVE = data.RES_DEPOZIT_ACTIVE;
data.RES_DEPOSIT[lnDep].TOTAL = data.RES_DEPOZIT_TOTAL;

delete data.DATA_DEPOSIT;

//---------------------------Ob-----------

if (data.DATA_OB == undefined){
    data.DATA_OB = [];
}

var lnOb = data.DATA_OB.length;

data.DATA_OB[lnOb] = {};
data.DATA_OB[lnOb].CUST_ID = data.custID;
data.DATA_OB[lnOb].OB_ALL = data.DATA_OB_ALL;
data.DATA_OB[lnOb].OB_BALL_ITOG = data.DATA_OB_BALL_ITOG;
data.DATA_OB[lnOb].OB_CNTCONTR = data.DATA_OB_CNTCONTR;


delete data.DATA_OB_ALL;
delete data.DATA_OB_BALL_ITOG;
delete data.DATA_OB_CNTCONTR;