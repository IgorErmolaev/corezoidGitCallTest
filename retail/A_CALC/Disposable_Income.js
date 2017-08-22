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

//----------------------------Searching Income Tickets-----

data.LOCAL_TICKET_FLAG = 'N';

for (var i=0; i<data.DOC_IDENT.length; i++) {
    if (data.DOC_IDENT[i].CUST_ID == data.APP_CUST_ID && data.DOC_IDENT[i].TICKET != undefined && Datediff(data.DOC_IDENT[i].TICKETDATE)<=5)
    {
        data.LOCAL_TICKET_FLAG = 'Y';
    }
}

data.RES_HAS_INC_CONF = data.LOCAL_TICKET_FLAG;


//---------------------------ZP SRED-----------

data.LOCAL_DEBCARD_Z_SRED = 0;
data.LOCAL_DEBCARD_P_SRED = 0;
data.RES_DEBCARD_ZP_PAN = '';
data.RES_DEBCARD_ZP = 'N';
data.RES_DEBCARD_Z_SRED = 0;
data.RES_DEBCARD_PENS_PAN = '';
data.RES_DEBCARD_PENS = 'N'
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

//---------------------------------OKPO----------

data.LOCAL_DEBCARD_CHECK_OKPO = 'N';
data.LOCAL_TICKET_SALLARY = data.APP_INCOME_MONTHSALARY_EXT;

for (var i=0; i<data.DATA_DEBCARD.length; i++) {
    if (card_type.indexOf(data.DATA_DEBCARD[i].TYPE_CARD) != -1 && data.DATA_DEBCARD[i].ACTIVE =='Y' && data.DATA_DEBCARD[i].OKPO_ZP != undefined) {
        if (data.APP_EMPL_OKPO ==data.DATA_DEBCARD[i].OKPO_ZP && data.RES_HAS_INC_CONF == 'Y') {
            data.LOCAL_DEBCARD_CHECK_OKPO = 'Y';
        }
    }
}

//-------------------------------INCOME----

if ((data.RES_DEBCARD_PENS == 'Y' && data.RES_DEBCARD_P_SRED !=0) || (data.RES_DEBCARD_ZP == 'Y' && data.RES_DEBCARD_Z_SRED !=0)) {
    if (data.RES_DEBCARD_PENS == 'Y') {
        data.LOCAL_INCOME_MONTHSALARY = data.RES_DEBCARD_P_SRED + data.DATA_OB_ALL;
        if (data.APP_EMPL_SOCIALSTATUS == 'WORKPENS' && data.RES_HAS_INC_CONF =='Y') {
            data.LOCAL_INCOME_MONTHSALARY = data.LOCAL_TICKET_SALLARY + data.DATA_OB_ALL;
        }
    }
    if (data.RES_DEBCARD_ZP == 'Y') {
        data.LOCAL_INCOME_MONTHSALARY = data.RES_DEBCARD_Z_SRED + data.DATA_OB_ALL;
        if (data.RES_DEBCARD_PENS == 'Y') {
            data.LOCAL_INCOME_MONTHSALARY += data.RES_DEBCARD_P_SRED;
        }
        if (data.LOCAL_DEBCARD_CHECK_OKPO == 'N' && data.RES_HAS_INC_CONF =='Y') {
            data.LOCAL_INCOME_MONTHSALARY += data.LOCAL_TICKET_SALLARY;
        }
    }
}
else {
    if (data.DATA_WORK_TOP1000 =='Y') {
        if (data.RES_HAS_INC_CONF =='Y') {
            data.LOCAL_INCOME_MONTHSALARY = data.LOCAL_TICKET_SALLARY + data.DATA_OB_ALL;
        }
        else {
            if (data.DATA_WORK_TOP1000_INN =='Y') {
                data.LOCAL_INCOME_MONTHSALARY = data.DATA_WORK_TOP1000_ZP*0.82 + data.DATA_OB_ALL;
            }
            else {
                data.LOCAL_INCOME_OTHERSOURCE += data.LOCAL_INCOME_MONTHSALARY;
                data.LOCAL_INCOME_MONTHSALARY = data.DATA_OB_ALL;
            }
        }
    }
    else {
        if (data.LOCAL_STUD_ACTIVE =='Y' && data.LOCAL_STUD_SRED>0) {
            data.LOCAL_INCOME_MONTHSALARY = data.LOCAL_STUD_SRED + data.DATA_OB_ALL;
        }
        else {
            if (data.RES_HAS_INC_CONF !='Y') {
                data.LOCAL_INCOME_OTHERSOURCE += data.LOCAL_INCOME_MONTHSALARY;
                data.LOCAL_INCOME_MONTHSALARY = data.DATA_OB_ALL;
            }
        }
    }
}

data.RES_INC_NOT_CONF = data.LOCAL_INCOME_OTHERSOURCE;

data.RES_INC_DISP = Math.max(data.LOCAL_INCOME_MONTHSALARY + data.RES_INC_NOT_CONF - data.RES_EXP_MONTH_TOTAL,0);


//-------------------------PTI--------------

var pti = data.APP_INCOME_MONTHSALARY_EXT + data.APP_INCOME_OTHERSOURCE_EXT;

if (pti != 0) {
    data.RES_PTI_PRC = (data.PROD_CHAR_PAYMONTH/pti*100).toFixed(2);
}
else {
    data.RES_PTI_PRC = 0;
}

if (data.RES_PTI_PRC>100) {data.RES_PTI_PRC =100;}