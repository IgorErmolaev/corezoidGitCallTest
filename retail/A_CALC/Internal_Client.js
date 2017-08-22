// JavaScript Document

data.LOCAL_SYSTEM_DTI = 1;
var coef_elig = 0.5;


data.LOCAL_CRED_MEDIUM_TERM = [];
data.LOCAL_CRED_MEDIUM_PAYMENT = [];

function Datediff(days_diff ){
    var dateOpen = days_diff; // дата на входе
    var today = Date.now();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24 * 30.5;
    var days = Math.round(diff / one_day);
    return days;
}

var stateC = new Array ('C','K','Z');

switch (true)
{
    case (data.RES_CHAR_ADVANCE_PRC>=40): data.LOCAL_SYSTEM_DTI = 1.4; break;
    case (data.RES_CHAR_ADVANCE_PRC>=30): data.LOCAL_SYSTEM_DTI = 1.3; break;
    case (data.RES_CHAR_ADVANCE_PRC>=20): data.LOCAL_SYSTEM_DTI = 1.2; break;
    case (data.RES_CHAR_ADVANCE_PRC>=10): data.LOCAL_SYSTEM_DTI = 1.1; break;
    default : data.LOCAL_SYSTEM_DT=1; break;
}

// --------------------------------------------UDK----

if (data.PROD_CHAR_LOANAMOUNT_EXT != undefined && data.PROD_CHAR_LOANAMOUNT_EXT != 0) {
    data.LOCAL_UDK = ((data.PROD_CHAR_PAYMONTH * data.PROD_SCHEME_TERM) - data.PROD_CHAR_LOANAMOUNT_EXT)/data.PROD_CHAR_LOANAMOUNT_EXT
}

// ----------------------------------------CREDIT_HISTORY-----

var one_mnth = 1000 * 60 * 60 * 24 * 30.5;

for (var i=0; i<data.DATA_CRED.length;i++) {

    data.LOCAL_CRED_MEDIUM_TERM.push(0);
    data.LOCAL_CRED_MEDIUM_PAYMENT.push(0);

    if (data.DATA_CRED[i].DLP != undefined) {
        if (stateC.indexOf(data.DATA_CRED[i].STATE)!=-1 && Datediff(data.DATA_CRED[i].DATE_START)<=24 && data.DATA_CRED[i].START_SUMM>=3500) {
            data.LOCAL_CRED_MEDIUM_TERM[i] = (Math.round(Math.abs(data.DATA_CRED[i].DATECLOS_C - data.DATA_CRED[i].DATE_START)/one_mnth));
            if (data.LOCAL_CRED_MEDIUM_TERM[i]>9) {
                data.LOCAL_CRED_MEDIUM_PAYMENT[i] = data.DATA_CRED[i].START_SUMM/data.LOCAL_CRED_MEDIUM_TERM[i];
            }
            else {
                data.LOCAL_CRED_MEDIUM_PAYMENT[i] = 0;
            }
        }
    }
    else {
        if (data.DATA_CRED[i].STATE != undefined) {
            if (data.DATA_CRED[i].TR_PAY>9 && data.DATA_CRED[i].CR_PAY>3500) {
                data.LOCAL_CRED_MEDIUM_TERM[i] = data.DATA_CRED[i].TR_PAY;
                data.LOCAL_CRED_MEDIUM_PAYMENT[i] = data.DATA_CRED[i].CR_PAY/data.DATA_CRED[i].TR_PAY;
            }
        }
    }
}

data.RES_MAX_MID_PAY = Math.max.apply(Math,data.LOCAL_CRED_MEDIUM_PAYMENT);

data.LOCAL_CRED_MAX_MEDIUM_TERM = data.LOCAL_CRED_MEDIUM_TERM[data.LOCAL_CRED_MEDIUM_PAYMENT.indexOf(data.RES_MAX_MID_PAY)];

if (data.LOCAL_UDK !=0) {
    data.RES_LIMIT_CRED_HIST = Math.max(coef_elig *(data.RES_MAX_MID_PAY/0.3 - data.RES_EXP_MONTH_TOTAL)*data.LOCAL_SYSTEM_DTI * data.PROD_SCHEME_TERM/(1+data.LOCAL_UDK),0);
    data.RES_LIMIT_CRED_HIST = data.RES_LIMIT_CRED_HIST.toFixed(2);
}

if (data.RES_CRED_HIST_DATA == 'NEGATIVE') {
    data.RES_LIMIT_CRED_HIST = 0;
}

// ------------------------------------------MONTH PAY--------

data.LOCAL_CLIENT_MONTH_PAY = Math.max(coef_elig * data.RES_INC_DISP,0);

data.LOCAL_CLIENT_MONTH_PAY = Math.max(data.LOCAL_CLIENT_MONTH_PAY,(data.RES_MAX_MID_PAY/0.3 - data.RES_EXP_MONTH_TOTAL)*coef_elig);

//---------------------------------------------DEPOSIT---

data.LOCAL_DEPOSIT_AMOUNT = 0;

for (var i=0; i<data.DATA_DEPOSIT.length; i++) {
    if (data.DATA_DEPOSIT[i].DATE_START != undefined && Datediff(data.DATA_DEPOSIT[i].DATE_START)>=6) {
        data.LOCAL_DEPOSIT_AMOUNT += data.DATA_DEPOSIT[i].BAL;
    }
}

if ((1+data.LOCAL_UDK)!=0) {
    data.LOCAL_CLIENT_SUM_DEPOSIT = Math.max(coef_elig *(0.4*data.LOCAL_DEPOSIT_AMOUNT - data.RES_EXP_MONTH_TOTAL)*data.LOCAL_SYSTEM_DTI * data.PROD_SCHEME_TERM/(1+data.LOCAL_UDK),0);
    data.LOCAL_CLIENT_SUM_DEPOSIT = data.LOCAL_CLIENT_SUM_DEPOSIT.toFixed(2);
}

// -------------------------------------------LIMIT PLAT---- 

data.RES_LIMIT_PLAT = 0;

if ((1+data.LOCAL_UDK)!=0) {
    data.RES_LIMIT_PLAT = Math.max(data.LOCAL_CLIENT_MONTH_PAY * data.LOCAL_SYSTEM_DTI * data.PROD_SCHEME_TERM/(1+data.LOCAL_UDK),0);
    data.RES_LIMIT_PLAT = data.RES_LIMIT_PLAT.toFixed(2);
}

// --------------------------------------------ZP summ---

data.LOCAL_CLIENT_SUM_SALARY = 0;

if ((1+data.LOCAL_UDK)!=0) {
    data.LOCAL_CLIENT_SUM_SALARY = Math.max(coef_elig *(data.RES_DEBCARD_Z_SRED + data.LOCAL_STUD_SRED - data.RES_EXP_MONTH_TOTAL)*data.LOCAL_SYSTEM_DTI * data.PROD_SCHEME_TERM/(1+data.LOCAL_UDK),0);
    data.LOCAL_CLIENT_SUM_SALARY = data.LOCAL_CLIENT_SUM_SALARY.toFixed(2);
}

// ------------------------------------------Pens summ-----
data.LOCAL_CLIENT_SUM_PENS = 0;

if ((1+data.LOCAL_UDK)!=0) {
    data.LOCAL_CLIENT_SUM_PENS = Math.max(coef_elig *(data.RES_DEBCARD_P_SRED - data.RES_EXP_MONTH_TOTAL)*data.LOCAL_SYSTEM_DTI * data.PROD_SCHEME_TERM/(1+data.LOCAL_UDK),0);
    data.LOCAL_CLIENT_SUM_PENS = data.LOCAL_CLIENT_SUM_PENS.toFixed(2);
}

// -------------------------------------------OB summ-------
data.LOCAL_CLIENT_SUM_OB = 0;

if ((1+data.LOCAL_UDK)!=0) {
    data.LOCAL_CLIENT_SUM_OB = Math.max(coef_elig *(0.2*data.DATA_OB_ALL - data.RES_EXP_MONTH_TOTAL)*data.LOCAL_SYSTEM_DTI * data.PROD_SCHEME_TERM/(1+data.LOCAL_UDK),0);
    data.LOCAL_CLIENT_SUM_OB = data.LOCAL_CLIENT_SUM_OB.toFixed(2);
}

// ----------------------------------------CLIENT_TYPE-----------------

data.RES_FINAL_KRED_SUM = 0;

data.RES_FINAL_KRED_SUM = Math.max(data.LOCAL_TRELCLIENTS_MAX_LIM_GOOD_CL,data.RES_LIMIT_CRED_HIST,data.LOCAL_CLIENT_SUM_DEPOSIT,data.LOCAL_CLIENT_SUM_SALARY,data.LOCAL_CLIENT_SUM_PENS,data.LOCAL_CLIENT_SUM_OB,data.RES_LIMIT_PLAT);

if (data.LOCAL_TRELCLIENTS_MAX_LIM_GOOD_CL>15000 || data.LOCAL_CLIENT_SUM_SALARY>=1500 || data.LOCAL_CLIENT_SUM_PENS>=1500 || data.RES_LIMIT_CRED_HIST>=5000 || data.LOCAL_CLIENT_SUM_DEPOSIT>=5000 || data.LOCAL_CLIENT_SUM_OB>=10000) {
    data.RES_TYPE_CUST = 'INTERN';
}
else {
    data.RES_TYPE_CUST = 'EXTERN';
}

// -------------------------------Type of limit--------------------

if (data.RES_TYPE_CUST == 'INTERN') {
    if (data.LOCAL_TRELCLIENTS_MAX_LIM_GOOD_CL>15000) {
        data.RES_LIMIT_ITOG_TYPE = 'REL';
    }
    else {
        if (data.LOCAL_CLIENT_SUM_DEPOSIT == Math.max(data.RES_LIMIT_CRED_HIST, data.LOCAL_CLIENT_SUM_DEPOSIT,data.LOCAL_CLIENT_SUM_SALARY,data.LOCAL_CLIENT_SUM_PENS)) {
            data.RES_LIMIT_ITOG_TYPE = 'DEPOS';
        }
        else {
            if (data.LOCAL_CLIENT_SUM_SALARY == Math.max(data.RES_LIMIT_CRED_HIST, data.LOCAL_CLIENT_SUM_SALARY,data.LOCAL_CLIENT_SUM_PENS)) {
                data.RES_LIMIT_ITOG_TYPE = 'ZP';
            }
            else {
                if (data.LOCAL_CLIENT_SUM_PENS == Math.max(data.RES_LIMIT_CRED_HIST,data.LOCAL_CLIENT_SUM_PENS)) {
                    data.RES_LIMIT_ITOG_TYPE = 'PENS';
                }
                else {
                    data.RES_LIMIT_ITOG_TYPE = 'HYSTORY';
                }
            }
        }
    }
}
else {
    if (data.RES_DEBCARD_ZP =='Y' || data.RES_DEBCARD_PENS =='Y' || data.LOCAL_STUD_ACTIVE =='Y' || data.LOCAL_CRED_HISTORY =='POSITIVE' || (data.RES_DEPOZIT_ACTIVE =='Y' && data.RES_DEPOZIT_TOTAL>0)) {
        data.RES_LIMIT_ITOG_TYPE = 'VNESH';
    }
    else {
        data.RES_LIMIT_ITOG_TYPE = 'NEW';
    }
}