var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\..\\test\\internalClient.json').toString();
var data = JSON.parse(json).data;


//*******************************************************************************************************************************************

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

var credType = new Array("PC","PK","PL","PNET","PP","PPF1","PPF2","PPFT","PPH0","PPH1","PPH2","PR","PRS1","PRS2","PRS5",
    "PRSL","PS","PV01","PV02","PV03","PV04","PV05","PV06","PV07","PV08","PV09","PV10","PV11","PV12","PV13","PV14","PV15","PV16","PV17","PV18","PZ");
var stateO = new Array('A','L','O','D');


data.LOCAL_CLIENT_SUM_CREDIT = 0;
data.RES_TYPE_CUST_CARD = data.RES_TYPE_CUST;


//---------------------DTI-------------------------------------------

data.LOCAL_SYSTEM_DTI = 1;
if (data.PROD_CHAR_CORPORATION != '0'/* && data.RES_CHAR_ADVANCE_PRC>=10*/) {
    data.LOCAL_SYSTEM_DTI = 1 + data.RES_CHAR_ADVANCE_PRC / (100 - data.RES_CHAR_ADVANCE_PRC);
   /* data.LOCAL_SYSTEM_DTI = 1.1;
   if ( data.RES_CHAR_ADVANCE_PRC>=20) {
        data.LOCAL_SYSTEM_DTI = 1.2;
    }
    if ( data.RES_CHAR_ADVANCE_PRC>=30) {
        data.LOCAL_SYSTEM_DTI = 1.3;
    }
    if ( data.RES_CHAR_ADVANCE_PRC>=40) {
        data.LOCAL_SYSTEM_DTI = 1.4;
    }*/
}

//-------------------------------------UDK--------------------------------

if (data.PROD_CHAR_LOANAMOUNT !=0) {
    data.LOCAL_UDK = ((data.PROD_CHAR_PAYMONTH * data.PROD_SCHEME_TERM) - data.PROD_CHAR_LOANAMOUNT)/data.PROD_CHAR_LOANAMOUNT
}

/*----------------------------------CREDIT_HISTORY------------------------------------------*/

var DaysS;
var DaysC;
var DaysF;
var param;
var param1;

if (data.DATA_CRED!= undefined) {
    for (var i = 0; i < data.DATA_CRED.length; i++) {
        if (data.DATA_CRED[i].TYPE !='' && data.DATA_CRED[i].TYPE!= undefined && (data.DATA_CRED[i].TYPE.substr(0,1) != 'P' || credType.indexOf(data.DATA_CRED[i].TYPE) != -1)) {
            data.LOCAL_CRED_MEDIUM_TERM.push(0);
            data.LOCAL_CRED_MEDIUM_PAYMENT.push(0);
            if (data.DATA_CRED[i].DLP!= undefined && data.DATA_CRED[i].DLP != '') {
                DaysS=Datediff(data.DATA_CRED[i].DATE_START);
                DaysF=Datediff(data.DATA_CRED[i].DATECLOS_F);
                DaysC=Datediff(data.DATA_CRED[i].DATECLOS_C);
                if ((data.DATA_CRED[i].STATE == 'C' || data.DATA_CRED[i].STATE == 'Z' || data.DATA_CRED[i].STATE == 'K') && Math.abs( DaysF/30)<=24 &&
                    DaysF>DaysS) {
                    param = Math.abs(DaysS - DaysF)/30;
                    data.LOCAL_CRED_MEDIUM_TERM[i] = param;
                    if (data.LOCAL_CRED_MEDIUM_TERM[i]>=4) {
                        param1=data.DATA_CRED[i].START_SUMM/data.LOCAL_CRED_MEDIUM_TERM[i];
                        data.LOCAL_CRED_MEDIUM_PAYMENT[i]= param1;
                    }
                }
                else {
                    if (stateO.indexOf(data.DATA_CRED[i].STATE) != -1 && Math.abs( DaysS/30)>=120 && DaysC>DaysS) {
                        param = Math.abs(DaysS - DaysC)/30;
                        data.LOCAL_CRED_MEDIUM_TERM[i] = param;
                        if (data.LOCAL_CRED_MEDIUM_TERM[i]>=4) {
                            param1=data.DATA_CRED[i].START_SUMM/data.LOCAL_CRED_MEDIUM_TERM[i];
                            data.LOCAL_CRED_MEDIUM_PAYMENT[i]= param1;
                        }
                        else {
                            data.LOCAL_CRED_MEDIUM_PAYMENT[i] = 0;
                        }
                    }
                }
            }
            else {
                if (data.DATA_CRED[i].STATE!='' && data.DATA_CRED[i].PRODUCT != 'CASS' && data.DATA_CRED[i].PRODUCT != 'NOTR') {
                    data.LOCAL_CRED_MEDIUM_TERM[i] = Math.abs(data.DATA_CRED[i].TR_PAY);
                    if (data.LOCAL_CRED_MEDIUM_TERM[i]>=3 && data.DATA_CRED[i].LIMIT>=300) {
                        param = data.DATA_CRED[i].CR_PAY/data.LOCAL_CRED_MEDIUM_TERM[i];
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

if ((1+data.LOCAL_UDK)!=0) {
    data.LOCAL_CLIENT_SUM_CREDIT = (3/2*data.RES_COEFF_ELIG*(data.LOCAL_CRED_MAX_MEDIUM_PAYMENT/0.3 - data.RES_EXP_MONTH_TOTAL)*data.PROD_SCHEME_TERM)/(1+data.LOCAL_UDK);
}
data.LOCAL_CLIENT_SUM_CREDIT = Math.max(data.LOCAL_CLIENT_SUM_CREDIT,0);
data.RES_LIMIT_CRED_HIST = data.LOCAL_CLIENT_SUM_CREDIT;

if (data.BCH_CRED_HIST_DATA != undefined && (data.BCH_CRED_HIST_DATA.substr(0,1) == 'H' ||  data.BCH_CRED_HIST_DATA.substr(0,1) == 'N')) {
    data.LOCAL_CLIENT_SUM_CREDIT = 0;
}

/*------------------------------------------MONTH PAY----------------------------------------------------------------------*/

data.LOCAL_CLIENT_MONTH_PAY = data.RES_COEFF_ELIG * data.RES_INC_DISP;
data.LOCAL_CLIENT_MONTH_PAY = Math.max(data.LOCAL_CLIENT_MONTH_PAY,0);
data.LOCAL_CLIENT_MONTH_PAY = Math.max(data.LOCAL_CLIENT_MONTH_PAY,((data.RES_MAX_MID_PAY/0.3 - data.RES_EXP_MONTH_TOTAL)*data.RES_COEFF_ELIG*3/2));
data.LOCAL_CLIENT_MONTH_PAY = Math.max(data.LOCAL_CLIENT_MONTH_PAY,0);


/*---------------------------------------DEPOSIT-------------------------------------------------------------------*/

data.LOCAL_DEPOSIT_AMOUNT = 0;
data.LOCAL_CLIENT_DEPOSIT_AMOUNT =0;

if (data.DATA_DEPOSIT != undefined) {
    for (i = 0; i < data.DATA_DEPOSIT.length; i++) {
        DaysS= Datediff(data.DATA_DEPOSIT[i].DATE_START);
        if ((Math.abs(DaysS)/30) >= 3) {
            data.LOCAL_DEPOSIT_AMOUNT += data.DATA_DEPOSIT[i].BAL;
            data.LOCAL_CLIENT_DEPOSIT_AMOUNT += data.DATA_DEPOSIT[i].BAL*0.8;
        }
        else {
            if ((Math.abs(DaysS)/30) >= 1 && (Math.abs(DaysS)/30) < 3) {
                if (data.DATA_DEPOSIT[i].BAL>=10000) {
                    data.LOCAL_DEPOSIT_AMOUNT += data.DATA_DEPOSIT[i].BAL;
                    data.LOCAL_CLIENT_DEPOSIT_AMOUNT += data.DATA_DEPOSIT[i].BAL*0.2;
                }
            }
        }
    }
}

data.LOCAL_CLIENT_SUM_DEPOSIT= (data.RES_COEFF_ELIG*(data.LOCAL_CLIENT_DEPOSIT_AMOUNT - data.RES_EXP_MONTH_TOTAL)*data.LOCAL_SYSTEM_DTI*data.PROD_SCHEME_TERM/(1+data.LOCAL_UDK));
data.LOCAL_CLIENT_SUM_DEPOSIT = Math.max(data.LOCAL_CLIENT_SUM_DEPOSIT,0);

/*----------------------------------------LIMIT PLAT--------------------------------------------------*/

data.RES_LIMIT_PLAT = 0;

if ((1+data.LOCAL_UDK)!=0) {
    data.RES_LIMIT_PLAT = data.LOCAL_CLIENT_MONTH_PAY*data.PROD_SCHEME_TERM*data.LOCAL_SYSTEM_DTI/(1+data.LOCAL_UDK);
}
data.RES_LIMIT_PLAT = Math.max(data.RES_LIMIT_PLAT,0);

/*---------------------------------------ZP summ----------------------------------------------------------*/

data.LOCAL_CLIENT_SUM_SALARY = 0;

if ((1+data.LOCAL_UDK)!=0) {
    data.LOCAL_CLIENT_SUM_SALARY = (data.RES_COEFF_ELIG*(data.RES_DEBCARD_Z_SRED + data.LOCAL_STUD_SRED - data.RES_EXP_MONTH_TOTAL)*data.PROD_SCHEME_TERM*data.LOCAL_SYSTEM_DTI)/(1+data.LOCAL_UDK);
}
data.LOCAL_CLIENT_SUM_SALARY = Math.max(data.LOCAL_CLIENT_SUM_SALARY,0);
/*-------------------------------------Pens summ---------------------------------------------------------------------------*/

data.LOCAL_CLIENT_SUM_PENS = 0;

if ((1+data.LOCAL_UDK)!=0) {
    data.LOCAL_CLIENT_SUM_PENS = (data.RES_COEFF_ELIG*(data.RES_DEBCARD_P_SRED - data.RES_EXP_MONTH_TOTAL)*data.LOCAL_SYSTEM_DTI*data.PROD_SCHEME_TERM)/(1+data.LOCAL_UDK);
}
data.LOCAL_CLIENT_SUM_PENS = Math.max(data.LOCAL_CLIENT_SUM_PENS,0);

// ----------------------------------------OB summ----------------------------------------//

data.LOCAL_CLIENT_SUM_OB = 0;

if ((1+data.LOCAL_UDK)!=0) {
    if (data.DATA_OB_ALL != undefined && data.DATA_OB_ALL >0) {
        data.LOCAL_CLIENT_SUM_OB = Math.max(data.RES_COEFF_ELIG *(0.2*data.DATA_OB_ALL - data.RES_EXP_MONTH_TOTAL)*data.LOCAL_SYSTEM_DTI * data.PROD_SCHEME_TERM/(1+data.LOCAL_UDK),0);
        data.LOCAL_CLIENT_SUM_OB = data.LOCAL_CLIENT_SUM_OB.toFixed(2);
    }
}


/*----------------------------------CLIENT_TYPE------------------------------------------------------------*/

data.RES_FINAL_KRED_SUM = Math.max(data.LOCAL_CLIENT_SUM_CREDIT, data.LOCAL_CLIENT_SUM_DEPOSIT,data.LOCAL_CLIENT_SUM_SALARY,data.LOCAL_CLIENT_SUM_PENS,data.LOCAL_CLIENT_SUM_OB, data.LOCAL_LIMIT_OLD,0);

if (data.PROD_CHAR_LOANAMOUNT<data.RES_FINAL_KRED_SUM) {
    data.RES_TYPE_CUST = 'INTERN';
}
else {
    data.RES_TYPE_CUST = 'EXTERN';
    data.RES_LIMIT_ITOG_TYPE = 'VNESH';
}

/*-------------------------------Type of limit-----------------------------------------------------------------*/

if (data.RES_TYPE_CUST == 'INTERN') {
    if (data.LOCAL_LIMIT_OLD = Math.max(data.LOCAL_CLIENT_SUM_CREDIT, data.LOCAL_CLIENT_SUM_DEPOSIT,data.LOCAL_CLIENT_SUM_SALARY,data.LOCAL_CLIENT_SUM_PENS,data.LOCAL_CLIENT_SUM_OB, data.LOCAL_LIMIT_OLD)) {
        data.RES_LIMIT_ITOG_TYPE = 'LIMIT_OLD';
    }
    else {
        if (data.LOCAL_CLIENT_SUM_DEPOSIT == Math.max(data.LOCAL_CLIENT_SUM_CREDIT, data.LOCAL_CLIENT_SUM_DEPOSIT,data.LOCAL_CLIENT_SUM_SALARY,data.LOCAL_CLIENT_SUM_PENS,data.LOCAL_CLIENT_SUM_OB)) {
            data.RES_LIMIT_ITOG_TYPE = 'DEPOS';
        }
        else {
            if (data.LOCAL_CLIENT_SUM_OB == Math.max(data.LOCAL_CLIENT_SUM_CREDIT,data.LOCAL_CLIENT_SUM_SALARY,data.LOCAL_CLIENT_SUM_PENS,data.LOCAL_CLIENT_SUM_OB)) {
                data.RES_LIMIT_ITOG_TYPE = 'OB';
            }
            else {
                if (data.LOCAL_CLIENT_SUM_CREDIT == Math.max(data.LOCAL_CLIENT_SUM_CREDIT,data.LOCAL_CLIENT_SUM_SALARY,data.LOCAL_CLIENT_SUM_PENS)) {
                    data.RES_LIMIT_ITOG_TYPE = 'HYSTORY';
                }
                else {
                    if (data.LOCAL_CLIENT_SUM_SALARY>data.LOCAL_CLIENT_SUM_PENS) {
                        if(data.RES_DEBCARD_Z_SRED > data.LOCAL_STUD_SRED) {
                            data.RES_LIMIT_ITOG_TYPE = 'ZP';
                        }
                        else {
                            data.RES_LIMIT_ITOG_TYPE = 'STUD';
                        }
                    }
                    else {
                        if (data.LOCAL_CLIENT_SUM_PENS>data.PROD_CHAR_LOANAMOUNT) {
                            data.RES_LIMIT_ITOG_TYPE = 'PENS';
                        }
                    }
                }
            }
        }
    }
}

// -------------------------------SCORE_AMOUNT-----------------------------//

if (data.PROD_CHAR_BANK == 'PB') {
    if (data.RES_SCCARD_SCORE_1>370 && data.RES_LIMIT_PLAT>=data.PROD_CHAR_LOANAMOUNT) {
        data.LOCAL_CLIENT_SUM_SCORE = 0;
        data.RES_LIMIT_ITOG_TYPE = 'SCOR';
        data.RES_TYPE_CUST = 'INTERN';
    }
}
else {
    if (data.PROD_CHAR_BANK == 'AB') {
        if (data.RES_SCCARD_SCORE_1>310 || (data.RES_SCCARD_SCORE_1>300 && data.PROD_CHAR_CORPORATION == '237') && data.RES_LIMIT_PLAT>=data.PROD_CHAR_LOANAMOUNT) {
            data.LOCAL_CLIENT_SUM_SCORE = 0;
            data.RES_LIMIT_ITOG_TYPE = 'SCOR';
            data.RES_TYPE_CUST = 'INTERN';
        }
    }
}

if (data.RES_TYPE_CUST == 'EXTERN') {
    if (data.RES_DEBCARD_ZP == 'Y' || data.RES_DEBCARD_PENS == 'Y' || data.LOCAL_STUD_ACTIVE == 'Y' || data.RES_CRED_HIST_DATA == 'POSITIVE' ||
        data.RES_CRED_HIST_DATA == 'MEDIUM' || (data.RES_DEPOZIT_ACTIVE == 'Y' && data.RES_DEPOZIT_TOTAL>0)
    ) {
        data.RES_LIMIT_ITOG_TYPE = 'VNESH';
    }
    else {
        data.RES_LIMIT_ITOG_TYPE = 'NEW';
    }
}



//************************************************************************************************************


console.log(data.RES_LIMIT_PLAT);