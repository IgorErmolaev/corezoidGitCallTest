// JavaScript Document

var new_car = new Array ('A+','A-');
var by_car = new Array('A!','A@');

data.RES_TERMS_MIN_LOAN_AMOUNT = 1000;

var maxLim = 0;
if (new_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1){
    switch (data.PROD_CHAR_BANK) {
        case 'AB':
            maxLim = 450000;
            break;
        case 'PB':
            maxLim = 800000;
            break;
        default :
            maxLim =0;
    }
}
else{
    switch (data.PROD_CHAR_BANK) {
        case 'AB':
            maxLim = 350000;
            break;
        case 'PB':
            maxLim = 600000;
            break;
        default :
            maxLim =0;
    }
}

if (data.PROD_CHAR_LOANAMOUNT_EXT > data.RES_TERMS_MIN_LOAN_AMOUNT) {
    if (data.APP_CUST_ISVIP_ECB =='Y') {
        data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.PROD_CHAR_LOANAMOUNT_EXT, 500000);
    }
    else {
        data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.PROD_CHAR_LOANAMOUNT_EXT, maxLim);
    }
}
else {
    data.RES_TERMS_MAX_LOAN_AMOUNT = data.RES_TERMS_MIN_LOAN_AMOUNT;
}

//---------------------------Credit offer-

if (data.PROD_CHAR_LOANAMOUNT_EXT > data.RES_TERMS_MIN_LOAN_AMOUNT) {
    data.RES_OFFER1_LOAN_AMNT = Math.min(data.PROD_CHAR_LOANAMOUNT_EXT, data.RES_TERMS_MAX_LOAN_AMOUNT);
}
else {
    data.RES_OFFER1_LOAN_AMNT = data.RES_TERMS_MIN_LOAN_AMOUNT;
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



if ((data.LOCAL_CAR_VALUE_EXT-data.RES_OFFER1_FIRST_PAYM) > maxLim) {
    data.RES_OFFER1_FIRST_PAYM = data.LOCAL_CAR_VALUE_EXT - maxLim;
    data.RES_TERMS_MIN_1ST_PAYM = data.RES_OFFER1_FIRST_PAYM*100/data.LOCAL_CAR_VALUE_EXT;
    data.RES_STRATEGY_1ST_PAYM = data.RES_TERMS_MIN_1ST_PAYM;
}


