// JavaScript Document
if (data.LOCAL_TRELCLIENTS_MAX_LIM_GOOD_CL>data.PROD_CHAR_LOANAMOUNT_EXT) {
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.LOCAL_FIRST_PAYM,0);
    data.RES_STRATEGY_1ST_PAYM = 0;
}
else {
    if (data.LOCAL_CAR_VALUE_EXT !=0) {
        data.RES_TERMS_MIN_1ST_PAYM = Math.min(15,((data.LOCAL_CAR_VALUE_EXT - data.LOCAL_TRELCLIENTS_MAX_LIM_GOOD_CL)/data.LOCAL_CAR_VALUE_EXT)*100);
        data.RES_STRATEGY_1ST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
    }
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.LOCAL_FIRST_PAYM,data.RES_TERMS_MIN_1ST_PAYM);
}

data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);