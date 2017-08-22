// JavaScript Document
/*data.PROD_CHAR_CORPORATION = '255';
data.RES_TYPE_CUST = 'EXTERN';
data.declNum = 4;
data.PROD_CHAR_LOANAMOUNT = 7258;
data.PROD_SCHEME_MIN_AMOUNT_INT = 1800.0;
data.PROD_SCHEME_MAX_AMOUNT_INT =100000.0;
data.RES_FINAL_KRED_SUM = 3000;
data.RES_LIMIT_PLAT=10313.617424680322;
data.PROD_SCHEME_MAX_AMOUNT_EXT = 100000.0;
data.LOCAL_CLIENT_SUM_DEPOSIT =0;
data.LOCAL_CLIENT_SUM_SALARY=0;
data.LOCAL_CLIENT_SUM_PENS=0;
data.LOCAL_DONBASS = 'Y';
data.LOCAL_DONBASS_EXCLUDES = 'Y';
*/
//************************************

data.eqlComfy = 'N';
if (data.PROD_CHAR_CORPORATION == '255' && data.RES_TYPE_CUST == 'INTERN' && data.declNum <=11){
    data.eqlComfy = 'Y';
}

//------------------------------------------------------Current deal----------

if (data.RES_TYPE_CUST == 'INTERN') {
    data.RES_TERMS_MIN_LOAN_AMOUNT = Math.max(data.PROD_CHAR_LOANAMOUNT,data.PROD_SCHEME_MIN_AMOUNT_INT);
    data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.PROD_CHAR_LOANAMOUNT,data.PROD_SCHEME_MAX_AMOUNT_INT);
}
else {
    if (data.LOCAL_SCOR_FLAG == 'Y') {
        data.RES_TERMS_MIN_LOAN_AMOUNT = Math.max(data.RES_FINAL_KRED_SUM,data.PROD_SCHEME_MIN_AMOUNT_INT);
        data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.RES_FINAL_KRED_SUM,data.RES_LIMIT_PLAT);
        data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.RES_TERMS_MAX_LOAN_AMOUNT,data.PROD_SCHEME_MAX_AMOUNT_INT);
    }
    else {
        data.RES_TERMS_MIN_LOAN_AMOUNT = Math.max(data.PROD_CHAR_LOANAMOUNT,data.PROD_SCHEME_MIN_AMOUNT_EXT);
        data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.PROD_CHAR_LOANAMOUNT,data.RES_LIMIT_PLAT);
        data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.RES_TERMS_MAX_LOAN_AMOUNT,data.PROD_SCHEME_MAX_AMOUNT_EXT);
    }
}

data.LOCAL_CLIENT_VOSTOK_MAX_INCOME = Math.max(data.LOCAL_CLIENT_SUM_DEPOSIT,data.LOCAL_CLIENT_SUM_SALARY,data.LOCAL_CLIENT_SUM_PENS);
/*
if(data.LOCAL_DONBASS == 'Y') {
    if (data.PROD_CHAR_LOANAMOUNT>data.LOCAL_CLIENT_VOSTOK_MAX_INCOME ) {
     data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.RES_TERMS_MAX_LOAN_AMOUNT ,10000);
     data.RES_TERMS_MAX_LOAN_AMOUNT = Math.max(data.RES_TERMS_MAX_LOAN_AMOUNT ,data.LOCAL_CLIENT_VOSTOK_MAX_INCOME);
     }
}*/

if(data.LOCAL_DONBASS == 'Y') {
    if (data.LOCAL_DONBASS_EXCLUDES == 'Y'){
        data.RES_TERMS_MAX_LOAN_AMOUNT = Math.max(data.RES_TERMS_MAX_LOAN_AMOUNT ,data.LOCAL_CLIENT_VOSTOK_MAX_INCOME);
        data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.RES_TERMS_MAX_LOAN_AMOUNT ,data.PROD_CHAR_LOANAMOUNT);
        data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.RES_TERMS_MAX_LOAN_AMOUNT,data.PROD_SCHEME_MAX_AMOUNT_INT);
    }
    else{
        data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.RES_TERMS_MAX_LOAN_AMOUNT ,10000);
    }
}

if (data.LOCAL_RISK_LOGINS == 'Y') {
    data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.RES_TERMS_MAX_LOAN_AMOUNT ,4000);
}

//----------------------------------------------Credit offer-------------------

if (data.RES_TYPE_CUST == 'INTERN') {
    data.RES_OFFER1_LOAN_AMNT = Math.max(data.PROD_CHAR_LOANAMOUNT,data.PROD_SCHEME_MIN_AMOUNT_INT);
    data.RES_OFFER1_LOAN_AMNT = Math.min(data.RES_OFFER1_LOAN_AMNT,data.PROD_SCHEME_MAX_AMOUNT_INT);
}
else {
    if (data.LOCAL_SCOR_FLAG == 'Y') {
        data.RES_OFFER1_LOAN_AMNT = Math.min(data.PROD_CHAR_LOANAMOUNT,data.RES_FINAL_KRED_SUM);
        data.RES_OFFER1_LOAN_AMNT = Math.max(data.RES_OFFER1_LOAN_AMNT,data.PROD_SCHEME_MIN_AMOUNT_INT);
    }
    else {
        if (data.RES_FINAL_KRED_SUM<=data.PROD_SCHEME_MAX_AMOUNT_EXT) {
            data.RES_OFFER1_LOAN_AMNT = Math.max(data.PROD_CHAR_LOANAMOUNT,data.PROD_SCHEME_MIN_AMOUNT_EXT);
            data.RES_OFFER1_LOAN_AMNT = Math.min(data.RES_OFFER1_LOAN_AMNT,data.RES_LIMIT_PLAT);
            data.RES_OFFER1_LOAN_AMNT = Math.min(data.RES_OFFER1_LOAN_AMNT,data.PROD_SCHEME_MAX_AMOUNT_EXT);
        }
        else {
            data.RES_OFFER1_LOAN_AMNT = Math.max(data.RES_FINAL_KRED_SUM,data.PROD_SCHEME_MIN_AMOUNT_INT);
            data.RES_OFFER1_LOAN_AMNT = Math.min(data.RES_OFFER1_LOAN_AMNT,data.PROD_SCHEME_MAX_AMOUNT_INT);
        }
    }
}

/*
if(data.LOCAL_DONBASS == 'Y') {
    if (data.PROD_CHAR_LOANAMOUNT>data.LOCAL_CLIENT_VOSTOK_MAX_INCOME ) {
        data.RES_OFFER1_LOAN_AMNT = Math.min(data.RES_OFFER1_LOAN_AMNT,10000);
        data.RES_OFFER1_LOAN_AMNT = Math.max(data.RES_OFFER1_LOAN_AMNT,data.LOCAL_CLIENT_VOSTOK_MAX_INCOME);
    }
}*/

if(data.LOCAL_DONBASS == 'Y') {
    if (data.LOCAL_DONBASS_EXCLUDES == 'Y'){
        data.RES_OFFER1_LOAN_AMNT = Math.max(data.RES_OFFER1_LOAN_AMNT ,data.LOCAL_CLIENT_VOSTOK_MAX_INCOME);
        data.RES_OFFER1_LOAN_AMNT = Math.min(data.RES_OFFER1_LOAN_AMNT ,data.PROD_CHAR_LOANAMOUNT);
        data.RES_OFFER1_LOAN_AMNT = Math.min(data.RES_OFFER1_LOAN_AMNT,data.PROD_SCHEME_MAX_AMOUNT_INT);
    }
    else{
        data.RES_OFFER1_LOAN_AMNT = Math.min(data.RES_OFFER1_LOAN_AMNT ,10000);
    }
}

if (data.LOCAL_RISK_LOGINS == 'Y') {
    data.RES_OFFER1_LOAN_AMNT = Math.min(data.RES_OFFER1_LOAN_AMNT,4000);
}

if (data.eqlComfy == 'Y' && data.RES_OFFER1_LOAN_AMNT>50000){
    data.RES_OFFER1_FIRST_PAYM = Math.max(data.RES_OFFER1_FIRST_PAYM,10);
}