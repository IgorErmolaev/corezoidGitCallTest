/**
 * Created by user on 04.01.2017.
 */
// JavaScript Document

if (data.RES_FINAL_KRED_SUM < data.PROD_CHAR_LOANAMOUNT_EXT) {
    if (data.LOCAL_CAR_VALUE_EXT !=0) {
        data.RES_TERMS_MIN_1ST_PAYM = Math.min(20,(data.LOCAL_CAR_VALUE_EXT - data.RES_FINAL_KRED_SUM)/data.LOCAL_CAR_VALUE_EXT*100);
        data.RES_STRATEGY_1ST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
    }
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,data.LOCAL_FIRST_PAYM,15);
    data.RES_STRATEGY_1ST_PAYM  = Math.max(data.RES_TERMS_MIN_1ST_PAYM,15);
}
else {
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.LOCAL_FIRST_PAYM,15);
    data.RES_STRATEGY_1ST_PAYM = 15;
}

data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);