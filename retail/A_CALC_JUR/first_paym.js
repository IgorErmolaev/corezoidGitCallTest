var new_car = new Array ('A+','A-');
var by_car = new Array('A!','A@');

if (data.DATA_TRELCLIENTS_LIM_60_GOOD_CL>0) {
    if (data.DATA_TRELCLIENTS_LIM_60_GOOD_CL>data.PROD_CHAR_LOANAMOUNT_EXT) {
        data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.LOCAL_FIRST_PAYM,0);
        data.RES_STRATEGY_1ST_PAYM = 0;
    }
    else {
        if (new_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1) {
            data.RES_TERMS_MIN_1ST_PAYM = Math.min(30,((data.LOCAL_CAR_VALUE_EXT - data.DATA_TRELCLIENTS_LIM_60_GOOD_CL)/data.LOCAL_CAR_VALUE_EXT)*100);
            data.RES_STRATEGY_1ST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
        }
        else {
            data.RES_TERMS_MIN_1ST_PAYM = Math.min(40,((data.LOCAL_CAR_VALUE_EXT - data.DATA_TRELCLIENTS_LIM_60_GOOD_CL)/data.LOCAL_CAR_VALUE_EXT)*100);
            data.RES_STRATEGY_1ST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
        }
    }
}
else {
    if (Math.max(data.LimL2f,data.LimGlp)/3>data.PROD_CHAR_PAYMONTH) {
        data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.LOCAL_FIRST_PAYM,0);
        data.RES_STRATEGY_1ST_PAYM = 0;
    }
    else {
        if (new_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1) {
            data.RES_TERMS_MIN_1ST_PAYM = Math.min(30,((data.PROD_CHAR_PAYMONTH - Math.max(data.LimL2f,data.LimGlp)/3)/data.PROD_CHAR_PAYMONTH)*100);
            data.RES_STRATEGY_1ST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
        }
        else {
            data.RES_TERMS_MIN_1ST_PAYM = Math.min(40,((data.PROD_CHAR_PAYMONTH - Math.max(data.LimL2f,data.LimGlp)/3)/data.PROD_CHAR_PAYMONTH)*100);
            data.RES_STRATEGY_1ST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
        }
    }
}

data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);

if (data.BCH_CRED != undefined){
    for (var i=0; i<data.BCH_CRED.length; i++){
        if (data.BCH_CRED[i].CUST_ID != data.APP_CUST_ID_JUR && data.BCH_CRED[i].N_AMNISTY == 'Y'){
            data.RES_TERMS_MIN_1ST_PAYM = Math.max(25,data.RES_TERMS_MIN_1ST_PAYM);
            data.RES_STRATEGY_1ST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
            data.RES_OFFER1_FIRST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
        }
    }
}

if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D521')!= -1 || data.RES_DEC_REAS_CODE_TABLE.indexOf('D522')!= -1 || data.RES_DEC_REAS_CODE_TABLE.indexOf('D530')!= -1 ||
    data.RES_DEC_REAS_CODE_TABLE.indexOf('D531')!= -1 || data.RES_DEC_REAS_CODE_TABLE.indexOf('D532')!= -1) {
    if (new_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1) {
        data.RES_TERMS_MIN_1ST_PAYM = 30;
        data.RES_STRATEGY_1ST_PAYM = 30;
        data.RES_OFFER1_FIRST_PAYM = 30;
    }
    else {
        data.RES_TERMS_MIN_1ST_PAYM = 40;
        data.RES_STRATEGY_1ST_PAYM = 40;
        data.RES_OFFER1_FIRST_PAYM = 40;
    }
}

if (data.LOCAL_DONBASS == 'Y'){
    if (data.DATA_TRELCLIENTS_LIM_60_GOOD_CL > 0 ){
        data.RES_TERMS_MIN_1ST_PAYM = Math.max(40,data.RES_TERMS_MIN_1ST_PAYM);
        data.RES_STRATEGY_1ST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
        data.RES_OFFER1_FIRST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
    }
    else {
        data.RES_TERMS_MIN_1ST_PAYM = Math.max(50,data.RES_TERMS_MIN_1ST_PAYM);
        data.RES_STRATEGY_1ST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
        data.RES_OFFER1_FIRST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
    }
}