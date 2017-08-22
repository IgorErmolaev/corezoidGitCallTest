var new_car = new Array ('A+','A-');
var by_car = new Array('A!','A@');

data.RES_TERMS_MIN_LOAN_AMOUNT = 10000;

if (data.PROD_CHAR_LOANAMOUNT_EXT > data.RES_TERMS_MIN_LOAN_AMOUNT) {
    if (data.DATA_TRELCLIENTS_LIM_60_GOOD_CL>0) {
        data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.PROD_CHAR_LOANAMOUNT_EXT, 500000);
    }
    else {
        if (new_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1) {
            data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.PROD_CHAR_LOANAMOUNT_EXT, 450000);
        }
        else {
            data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.PROD_CHAR_LOANAMOUNT_EXT, 350000);
        }
    }
}
else {
    data.RES_TERMS_MAX_LOAN_AMOUNT = data.RES_TERMS_MIN_LOAN_AMOUNT;
}

//---------------------------Credit offer-
if (data.PROD_CHAR_LOANAMOUNT_EXT != undefined) {
    data.RES_OFFER1_LOAN_AMNT = Math.max(data.PROD_CHAR_LOANAMOUNT_EXT, data.RES_TERMS_MAX_LOAN_AMOUNT);
}
else {
    data.RES_OFFER1_LOAN_AMNT = data.RES_TERMS_MAX_LOAN_AMOUNT;
}

//--------------------------amount advance--

if (data.RES_TERMS_MIN_1ST_PAYM == data.LOCAL_FIRST_PAYM) {
    data.RES_OFFER1_FIRST_PAYM = data.PROD_CHAR_ADVANCEAMOUNT_EXT;
}
else {
    data.RES_OFFER1_FIRST_PAYM = data.LOCAL_CAR_VALUE_EXT * data.RES_TERMS_MIN_1ST_PAYM/100
}

data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_OFFER1_FIRST_PAYM/ 10) * 10;

//-------------------------max 350000(450 000 for new car)----------

if (new_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1) {
    if ((data.LOCAL_CAR_VALUE_EXT-data.RES_OFFER1_FIRST_PAYM) > 450000) {
        data.RES_OFFER1_FIRST_PAYM = data.LOCAL_CAR_VALUE_EXT - 450000;
        data.RES_TERMS_MIN_1ST_PAYM = data.RES_OFFER1_FIRST_PAYM*100/data.LOCAL_CAR_VALUE_EXT;
        data.RES_STRATEGY_1ST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
    }
}
else {
    if ((data.LOCAL_CAR_VALUE_EXT-data.RES_OFFER1_FIRST_PAYM) > 350000) {
        data.RES_OFFER1_FIRST_PAYM = data.LOCAL_CAR_VALUE_EXT - 350000;
        data.RES_TERMS_MIN_1ST_PAYM = data.RES_OFFER1_FIRST_PAYM*100/data.LOCAL_CAR_VALUE_EXT;
        data.RES_STRATEGY_1ST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
    }
}