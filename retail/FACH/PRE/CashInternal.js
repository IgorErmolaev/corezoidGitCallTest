// JavaScript Document

function Datediff(days_diff) {
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

data.LOCAL_CRED_MEDIUM_TERM = new Array();
data.LOCAL_CRED_MEDIUM_PAYMENT = new Array();


data.LOCAL_CLIENT_SUM_CREDIT = 0;

data.RES_COEFF_ELIG = 0.7;

data.LOCAL_UDK = (1 + data.PROD_SCHEME_TERM * 0.0599);

data.RES_TYPE_CUST_CARD = data.RES_TYPE_CUST;
/*----------------------------------CREDIT_HISTORY------------------------------------------*/

var DaysS;
var DaysC;
var param;
var param1;

if (data.DATA_CRED!= undefined) {
    for (i = 0; i < data.DATA_CRED.length; i++) {
        if (data.PROD_APP_EMPLOYEE !='Y') {
            data.LOCAL_CRED_MEDIUM_TERM.push(0);
            data.LOCAL_CRED_MEDIUM_PAYMENT.push(0);
            if (data.DATA_CRED[i].DLP!= undefined && data.DATA_CRED[i].DLP != '') {
                DaysS=Datediff(data.DATA_CRED[i].DATE_START);
                DaysC=Datediff(data.DATA_CRED[i].DATECLOS_C);
                if ((data.DATA_CRED[i].STATE == 'C' || data.DATA_CRED[i].STATE == 'Z' || data.DATA_CRED[i].STATE == 'K') && Math.abs( DaysS/30)<=24 &&
                    Number(data.DATA_CRED[i].START_SUMM) >= 3000) {
                    param = Math.abs(DaysS - DaysC)/30;
                    data.LOCAL_CRED_MEDIUM_TERM[i] = param;
                    if (data.LOCAL_CRED_MEDIUM_TERM[i]>=6) {
                        param1=Number(data.DATA_CRED[i].START_SUMM)/data.LOCAL_CRED_MEDIUM_TERM[i];
                        data.LOCAL_CRED_MEDIUM_PAYMENT[i]= param1;
                    }
                }

            }
            else {
                if (data.DATA_CRED[i].STATE!='') {
                    if (data.DATA_CRED[i].TR_PAY>=6 && data.DATA_CRED[i].CR_PAY>=3000) {
                        data.LOCAL_CRED_MEDIUM_TERM[i] = data.DATA_CRED[i].TR_PAY;
                        param = data.DATA_CRED[i].CR_PAY/data.DATA_CRED[i].TR_PAY;
                        data.LOCAL_CRED_MEDIUM_PAYMENT[i] = param;
                    }
                }
            }
        }

    }
}



data.LOCAL_CRED_MAX_MEDIUM_PAYMENT = 0;
data.LOCAL_CRED_MAX_MEDIUM_TERM = 0;

if (data.LOCAL_CRED_MEDIUM_PAYMENT != null && data.LOCAL_CRED_MEDIUM_PAYMENT.length> 0) {
    for (i = 0; i < data.LOCAL_CRED_MEDIUM_PAYMENT.length; i++) {
        if (data.LOCAL_CRED_MAX_MEDIUM_PAYMENT < data.LOCAL_CRED_MEDIUM_PAYMENT[i] ){
            data.LOCAL_CRED_MAX_MEDIUM_PAYMENT = data.LOCAL_CRED_MEDIUM_PAYMENT[i];
            data.LOCAL_CRED_MAX_MEDIUM_TERM = data.LOCAL_CRED_MEDIUM_TERM[i];
        }
    }
}

data.RES_MAX_MID_PAY = data.LOCAL_CRED_MAX_MEDIUM_PAYMENT;

data.LOCAL_CLIENT_SUM_CREDIT = (data.RES_COEFF_ELIG*(data.LOCAL_CRED_MAX_MEDIUM_PAYMENT/0.25 - data.RES_EXP_MONTH_TOTAL)*data.PROD_SCHEME_TERM)/data.LOCAL_UDK;
data.LOCAL_CLIENT_SUM_CREDIT = Math.max(data.LOCAL_CLIENT_SUM_CREDIT,0);
data.RES_LIMIT_CRED_HIST = data.LOCAL_CLIENT_SUM_CREDIT;

if (data.BCH_CRED_HIST_DATA != undefined && (data.BCH_CRED_HIST_DATA.substr(0,1) == 'H' ||  data.BCH_CRED_HIST_DATA.substr(0,1) == 'N')) {
    data.LOCAL_CLIENT_SUM_CREDIT = 0;
}

/*------------------------------------------MONTH PAY----------------------------------------------------------------------*/

data.LOCAL_CLIENT_MONTH_PAY = data.RES_COEFF_ELIG/2 * data.RES_INC_DISP;
data.LOCAL_CLIENT_MONTH_PAY = Math.max(data.LOCAL_CLIENT_MONTH_PAY,0);
data.LOCAL_CLIENT_MONTH_PAY = Math.max(data.LOCAL_CLIENT_MONTH_PAY,((data.RES_MAX_MID_PAY/0.25 - data.RES_EXP_MONTH_TOTAL)*data.RES_COEFF_ELIG));
data.LOCAL_CLIENT_MONTH_PAY = Math.max(data.LOCAL_CLIENT_MONTH_PAY,0);

/*---------------------------------------DEPOSIT-------------------------------------------------------------------*/

data.LOCAL_DEPOSIT_AMOUNT = 0;
data.LOCAL_CLIENT_SUM_DEPOSIT =0;

if (data.DATA_DEPOSIT != undefined) {
    for (i = 0; i < data.DATA_DEPOSIT.length; i++) {
        DaysS= Datediff(data.DATA_DEPOSIT[i].DATE_START);
        if ((Math.abs(DaysS)/30) >= 6) {
            data.LOCAL_DEPOSIT_AMOUNT += data.DATA_DEPOSIT[i].BAL;
        }
    }
}

if (data.LOCAL_DEPOSIT_AMOUNT > 25000 ){
    data.LOCAL_CLIENT_SUM_DEPOSIT= (data.RES_COEFF_ELIG*(0.4*data.LOCAL_DEPOSIT_AMOUNT - data.RES_EXP_MONTH_TOTAL)*data.PROD_SCHEME_TERM/data.LOCAL_UDK);
    data.LOCAL_CLIENT_SUM_DEPOSIT = Math.max(data.LOCAL_CLIENT_SUM_DEPOSIT,0);
}

/*----------------------------------------LIMIT PLAT--------------------------------------------------*/

data.RES_LIMIT_PLAT = 0;
data.RES_LIMIT_PLAT = data.LOCAL_CLIENT_MONTH_PAY*data.PROD_SCHEME_TERM/data.LOCAL_UDK;
data.RES_LIMIT_PLAT = Math.max(data.RES_LIMIT_PLAT,0);

/*---------------------------------------ZP summ----------------------------------------------------------*/

data.LOCAL_CLIENT_SUM_SALARY = 0;
data.LOCAL_CLIENT_SUM_SALARY = (data.RES_COEFF_ELIG*(data.RES_DEBCARD_Z_SRED + data.LOCAL_STUD_SRED - data.RES_EXP_MONTH_TOTAL)*data.PROD_SCHEME_TERM)/data.LOCAL_UDK;
data.LOCAL_CLIENT_SUM_SALARY = Math.max(data.LOCAL_CLIENT_SUM_SALARY,0);
/*-------------------------------------Pens summ---------------------------------------------------------------------------*/

data.LOCAL_CLIENT_SUM_PENS = 0;
data.LOCAL_CLIENT_SUM_PENS = (data.RES_COEFF_ELIG*(data.RES_DEBCARD_P_SRED - data.RES_EXP_MONTH_TOTAL)*data.PROD_SCHEME_TERM)/data.LOCAL_UDK;
data.LOCAL_CLIENT_SUM_PENS = Math.max(data.LOCAL_CLIENT_SUM_PENS,0);

data.RES_FINAL_KRED_SUM = Math.max(data.LOCAL_CLIENT_SUM_CREDIT, data.LOCAL_CLIENT_SUM_DEPOSIT,data.LOCAL_CLIENT_SUM_SALARY,data.LOCAL_CLIENT_SUM_PENS,data.RES_LIMIT_PLAT);

/*----------------------------------CLIENT_TYPE------------------------------------------------------------*/

if (data.LOCAL_CLIENT_SUM_SALARY >= 1500 || data.LOCAL_CLIENT_SUM_PENS >= 1500 || data.LOCAL_CLIENT_SUM_CREDIT >= 5000 || data.LOCAL_CLIENT_SUM_DEPOSIT >= 3000 ) {
    data.RES_TYPE_CUST = 'INTERN';
}
else {
    if (data.RES_LIMIT_PLAT>=25000){
        data.RES_TYPE_CUST = 'NEW_INTERN';
    }
    else {
        data.RES_TYPE_CUST = 'EXTERN';
    }
    data.RES_LIMIT_ITOG_TYPE = 'VNESH';
}

/*-------------------------------Type of limit-----------------------------------------------------------------*/
if (data.RES_TYPE_CUST == 'INTERN') {
    if (data.LOCAL_CLIENT_SUM_DEPOSIT == Math.max(data.LOCAL_CLIENT_SUM_CREDIT, data.LOCAL_CLIENT_SUM_DEPOSIT,data.LOCAL_CLIENT_SUM_SALARY,data.LOCAL_CLIENT_SUM_PENS)) {
        data.RES_LIMIT_ITOG_TYPE = 'DEPOS';
    }
    else {
        if (data.LOCAL_CLIENT_SUM_SALARY == Math.max(data.LOCAL_CLIENT_SUM_CREDIT, data.LOCAL_CLIENT_SUM_SALARY,data.LOCAL_CLIENT_SUM_PENS)) {
            data.RES_LIMIT_ITOG_TYPE = 'ZP';
        }
        else {
            if (data.LOCAL_CLIENT_SUM_PENS == Math.max(data.LOCAL_CLIENT_SUM_CREDIT,data.LOCAL_CLIENT_SUM_PENS)) {
                data.RES_LIMIT_ITOG_TYPE = 'PENS';
            }
            else {
                data.RES_LIMIT_ITOG_TYPE = 'HYSTORY';
            }
        }
    }
}

if (data.RES_LIMIT_ITOG_TYPE == 'VNESH'){
    data.RES_FINAL_KRED_SUM = Math.min(data.RES_FINAL_KRED_SUM, 10000);
}

if (data.RES_LIMIT_ITOG_TYPE == 'HYSTORY'){
    data.RES_FINAL_KRED_SUM = Math.min(data.RES_FINAL_KRED_SUM, 5000);
}

if (data.RES_TYPE_CUST == 'EXTERN') {
    if (data.RES_TYPE_CUST_CARD == 'INTERN') {
        data.RES_TYPE_CUST = 'INTERN'
    }
    else {
        if (data.RES_TYPE_CUST_CARD == 'NEW_INTERN') {
            data.RES_TYPE_CUST = 'NEW_INTERN'
        }
    }
}

/*
//допил закручиваем выдачи по сумме
 if (data.DATA_TRELCLIENTS_FACH_LIM24>0) {
  data.DATA_TRELCLIENTS_FACH_LIM24 = data.DATA_TRELCLIENTS_FACH_LIM24 * 0.7;
  data.DATA_TRELCLIENTS_FACH_LIM24 = Math.round(data.DATA_TRELCLIENTS_FACH_LIM24/100)*100;
 }
 
 if (data.RES_FINAL_KRED_SUM>0) {
  data.RES_FINAL_KRED_SUM = data.RES_FINAL_KRED_SUM * 0.7;
  data.RES_FINAL_KRED_SUM = Math.round(data.RES_FINAL_KRED_SUM/100)*100; 
 }
*/ 


/*>=1000grn on 6month*/
if (data.RES_FINAL_KRED_SUM < 5000 && data.PROD_SCHEME_TERM>6){
    var term6 = 6;
    var LOCAL_UDK_6 = (1 + term6 * 0.0599);

    var LOCAL_CLIENT_SUM_CREDIT_6 = (data.RES_COEFF_ELIG*(data.LOCAL_CRED_MAX_MEDIUM_PAYMENT/0.3 - data.RES_EXP_MONTH_TOTAL)*term6)/LOCAL_UDK_6;
    LOCAL_CLIENT_SUM_CREDIT_6 = Math.max(LOCAL_CLIENT_SUM_CREDIT_6,0);

    if (data.BCH_CRED_HIST_DATA != undefined && (data.BCH_CRED_HIST_DATA.substr(0,1) == 'H' ||  data.BCH_CRED_HIST_DATA.substr(0,1) == 'N')) {
        LOCAL_CLIENT_SUM_CREDIT_6 = 0;
    }

    var LOCAL_CLIENT_SUM_DEPOSIT_6=0;
    if (data.LOCAL_DEPOSIT_AMOUNT > 25000 ){
        LOCAL_CLIENT_SUM_DEPOSIT_6= (data.RES_COEFF_ELIG*(0.4*data.LOCAL_DEPOSIT_AMOUNT - data.RES_EXP_MONTH_TOTAL)*term6/LOCAL_UDK_6);
        LOCAL_CLIENT_SUM_DEPOSIT_6 = Math.max(LOCAL_CLIENT_SUM_DEPOSIT_6,0);
    }

    var RES_LIMIT_PLAT_6 = 0;
    RES_LIMIT_PLAT_6 = data.LOCAL_CLIENT_MONTH_PAY*term6/LOCAL_UDK_6;
    RES_LIMIT_PLAT_6 = Math.max(RES_LIMIT_PLAT_6,0);


    var LOCAL_CLIENT_SUM_SALARY_6 = 0;
    LOCAL_CLIENT_SUM_SALARY_6 = (data.RES_COEFF_ELIG*(data.RES_DEBCARD_Z_SRED + data.LOCAL_STUD_SRED - data.RES_EXP_MONTH_TOTAL)*term6)/LOCAL_UDK_6;
    LOCAL_CLIENT_SUM_SALARY_6 = Math.max(LOCAL_CLIENT_SUM_SALARY_6,0);



    var LOCAL_CLIENT_SUM_PENS_6 = 0;
    LOCAL_CLIENT_SUM_PENS_6 = (data.RES_COEFF_ELIG*(data.RES_DEBCARD_P_SRED - data.RES_EXP_MONTH_TOTAL)*term6)/LOCAL_UDK_6;
    LOCAL_CLIENT_SUM_PENS_6 = Math.max(LOCAL_CLIENT_SUM_PENS_6,0);


    data.RES_FINAL_KRED_SUM_6 = Math.max(LOCAL_CLIENT_SUM_CREDIT_6, LOCAL_CLIENT_SUM_DEPOSIT_6,LOCAL_CLIENT_SUM_SALARY_6,LOCAL_CLIENT_SUM_PENS_6,RES_LIMIT_PLAT_6);
}
