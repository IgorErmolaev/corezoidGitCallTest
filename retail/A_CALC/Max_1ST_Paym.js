var fs = require('fs');
var json = fs.readFileSync(__dirname+'//Max_1ST_Paym.json').toString();
var data = JSON.parse(json).data;

/*****************************START*********************************/


// JavaScript Document

var new_car = new Array ('A+','A-');
var by_car = new Array('A!','A@');
var blcl_control = new Array('ZPD','ZPDO','ZPDO2');
var NoPosKI = new Array('NEGATIVE','HDNEGATIVE','MEDIUM');

//----------------------------------- CASH_BLACK_PAN ---
var CASH_BLACK_PAN;
if (data.RES_DEBCARD_Z_SRED>= 1000 || data.RES_DEBCARD_P_SRED>= 1000 || data.LOCAL_DEPOSIT_AMOUNT>= 10000 || data.DATA_OB_ALL >= 1000 ||
    (data.BCH_CRED_HIST_YBCH!= undefined && data.BCH_CRED_HIST_YBCH.substring(0,1) =='P' && NoPosKI.indexOf(data.BCH_CRED_HIST_YBCH)==-1 && NoPosKI.indexOf(data.BCH_CRED_HIST_DATA)==-1 )) {
    CASH_BLACK_PAN='TRUE';
}
else {
    CASH_BLACK_PAN='FALSE';
}
//-------------------------------------------MAX FOR B/U-------------------
if(data.PROD_CHAR_LOANAMOUNT_EXT>200000 && by_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1) {
    if (data.LOCAL_CAR_VALUE_EXT !=0) {
        var paym = Math.round(Math.min(30,(data.LOCAL_CAR_VALUE_EXT - 200000)/data.LOCAL_CAR_VALUE_EXT*100));
        data.RES_STRATEGY_1ST_PAYM  = Math.max(data.RES_STRATEGY_1ST_PAYM,paym);
        data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,paym);
        data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);
    }
}
//----------stopy--------------
if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D516')!= -1 || data.RES_DEC_REAS_CODE_TABLE.indexOf('D518')!= -1 || data.RES_DEC_REAS_CODE_TABLE.indexOf('D535')!= -1) {
    if (data.RES_TERMS_MIN_1ST_PAYM < 20) {
        data.RES_STRATEGY_1ST_PAYM  = 20;
        data.RES_TERMS_MIN_1ST_PAYM = 20;
        data.RES_OFFER1_FIRST_PAYM = 20;
    }
}
if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D511')!= -1 || data.RES_DEC_REAS_CODE_TABLE.indexOf('D514')!= -1 || data.RES_DEC_REAS_CODE_TABLE.indexOf('D519')!= -1 ||
    data.RES_DEC_REAS_CODE_TABLE.indexOf('D520')!= -1 || data.RES_DEC_REAS_CODE_TABLE.indexOf('D504')!= -1 || data.RES_DEC_REAS_CODE_TABLE.indexOf('D534')!= -1 ) {
    if (new_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1) {
        data.RES_STRATEGY_1ST_PAYM  = Math.max(data.RES_STRATEGY_1ST_PAYM,30);
        data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,30);
        data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);
    }
    else {
        data.RES_STRATEGY_1ST_PAYM  = Math.max(data.RES_STRATEGY_1ST_PAYM,40);
        data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,40);
        data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);
    }
}
if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D512')!= -1) {
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
    data.RES_COMMENT_NO_AUTO = 'Негативный телефон;' + data.RES_COMMENT_NO_AUTO;
}
//-------------------MAX FOR SCORE AND BLACK LIST-------
if(data.RES_SCCARD_SCORE_1<=118.66 ||
    (data.LOCAL_BLCL_COLOR =='Y' && blcl_control.indexOf(data.LOCAL_BLCL_CONTROL_CL) != -1 && data.RES_SCCARD_SCORE_1>139.39 && CASH_BLACK_PAN=='FALSE')
) {
    if (new_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1) {
        data.RES_STRATEGY_1ST_PAYM  = Math.max(data.RES_STRATEGY_1ST_PAYM,30);
        data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,30);
        data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);
    }
    else {
        data.RES_STRATEGY_1ST_PAYM  = Math.max(data.RES_STRATEGY_1ST_PAYM,40);
        data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,40);
        data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);
    }
}

//-------------------------- PTI ----------------------
var perc =0;
if (data.PROD_CHAR_BANK == 'PB'){
    perc = 0.28;
}
else {
    if (new_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1){
        perc = 0.35;
    }
    else {
        perc = 0.28;
    }
}

data.RES_OFFER1_FIRST_PAYM_PTI50PRC = Math.round(((data.LOCAL_CAR_VALUE_EXT - (0.5 * data.RES_INC_DISP - data.RES_EXP_MONTH_TOTAL)/(perc/12+((perc/12)/((Math.pow(1+perc/12,data.RES_SCHEME_TERM))-1))) + 500)/(data.LOCAL_CAR_VALUE_EXT))*100);

if (data.RES_PTI_PRC >50){
    if (new_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1) {
        data.RES_STRATEGY_1ST_PAYM  = Math.min(Math.abs(data.RES_OFFER1_FIRST_PAYM_PTI50PRC),30);
        data.RES_TERMS_MIN_1ST_PAYM = Math.min(Math.abs(data.RES_OFFER1_FIRST_PAYM_PTI50PRC),30);
        data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);
    }
    else {
        data.RES_STRATEGY_1ST_PAYM  = Math.min(Math.abs(data.RES_OFFER1_FIRST_PAYM_PTI50PRC),40);
        data.RES_TERMS_MIN_1ST_PAYM = Math.min(Math.abs(data.RES_OFFER1_FIRST_PAYM_PTI50PRC),40);
        data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);
    }
}

//---------------------Vostok Advance------

if (data.LOCAL_DONBASS == 'Y') {
    if (data.LOCAL_DONBASS_EXCLUDES == 'Y') {
        data.RES_STRATEGY_1ST_PAYM  = Math.max(data.RES_STRATEGY_1ST_PAYM,40);
        data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,40);
        data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);
    }
    else {
        data.RES_STRATEGY_1ST_PAYM  = Math.max(data.RES_STRATEGY_1ST_PAYM,50);
        data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,50);
        data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);
    }
}

/***********************END**********************/

console.log('RES_OFFER1_FIRST_PAYM_PTI50PRC: '+data.RES_OFFER1_FIRST_PAYM_PTI50PRC);