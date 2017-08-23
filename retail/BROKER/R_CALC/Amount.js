// JavaScript Document

var stockCorp = new Array('255','265','266','260');

data.eqlComfy = 'N';
if (stockCorp.indexOf(data.PROD_CHAR_CORPORATION)!=-1  && data.RES_TYPE_CUST == 'INTERN' && data.RES_SCCARD_SCORE_1 > 251){
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

if(data.LOCAL_DONBASS == 'Y') {
  if (data.PROD_CHAR_LOANAMOUNT>data.LOCAL_CLIENT_VOSTOK_MAX_INCOME ) {
      data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.RES_TERMS_MAX_LOAN_AMOUNT ,20000);
      data.RES_TERMS_MAX_LOAN_AMOUNT = Math.max(data.RES_TERMS_MAX_LOAN_AMOUNT ,data.LOCAL_CLIENT_VOSTOK_MAX_INCOME);
  }
}

if (data.LOCAL_RISK_LOGINS == 'Y') {
   data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.RES_TERMS_MAX_LOAN_AMOUNT ,4000);
}

if (data.UbkiHistoryAmnisty == 'Y') {
  data.RES_TERMS_MAX_LOAN_AMOUNT = Math.min(data.RES_TERMS_MAX_LOAN_AMOUNT ,10000);
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

if(data.LOCAL_DONBASS == 'Y') {
  if (data.PROD_CHAR_LOANAMOUNT>data.LOCAL_CLIENT_VOSTOK_MAX_INCOME ) {
      data.RES_OFFER1_LOAN_AMNT = Math.min(data.RES_OFFER1_LOAN_AMNT,20000);
      data.RES_OFFER1_LOAN_AMNT = Math.max(data.RES_OFFER1_LOAN_AMNT,data.LOCAL_CLIENT_VOSTOK_MAX_INCOME);
  }
}

if (data.LOCAL_RISK_LOGINS == 'Y') {
   data.RES_OFFER1_LOAN_AMNT = Math.min(data.RES_OFFER1_LOAN_AMNT,4000);
}

if (data.eqlComfy == 'Y' && data.RES_OFFER1_LOAN_AMNT>50000){
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,10);
    data.RES_OFFER1_FIRST_PAYM = Math.max(data.RES_OFFER1_FIRST_PAYM,10);
}

if (data.UbkiHistoryAmnisty == 'Y') {
  data.RES_OFFER1_LOAN_AMNT = Math.min(data.RES_OFFER1_LOAN_AMNT ,10000);
}

/*
// Режем выдачу по авансу

var  maxAmount;
var  adv;

       switch(true) {
        case (data.RES_SCCARD_SCORE_1<=193):                                  maxAmount = 8000; break;
        case (data.RES_SCCARD_SCORE_1>=194 && data.RES_SCCARD_SCORE_1<=241):  maxAmount = 9200; break;
        case (data.RES_SCCARD_SCORE_1>=242 && data.RES_SCCARD_SCORE_1<=283):  maxAmount = 10500; break;
        case (data.RES_SCCARD_SCORE_1>=284 ):                                 maxAmount = 11000; break;
        default: maxAmount = 8000; break;
      }

 adv = (data.LOCAL_SCHEME_VALUE_TOTAL - maxAmount)/data.LOCAL_SCHEME_VALUE_TOTAL *100;
 adv = Math.max(adv.toFixed(2),0);

if (data.PROD_CHAR_CORPORATION != '255' && data.PROD_CHAR_CORPORATION != '265'//&& data.PROD_CHAR_POS != '13045' 
   ) { 
  data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,adv);
  data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);
}
*/