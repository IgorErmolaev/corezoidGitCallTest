// JavaScript Document

if (data.RES_DEC_CATEGORY == 'ACCEPT') {
  if (data.DATA_TRELCLIENTS_FACH_LIM24>5000) {
    if (data.PROD_CHAR_LIMITREQUESTED > data.DATA_TRELCLIENTS_FACH_LIM24) {
      data.RES_LIMIT_ITOG = data.DATA_TRELCLIENTS_FACH_LIM24;
    }
    else {
      data.RES_LIMIT_ITOG = data.PROD_CHAR_LIMITREQUESTED;
    }
  }
  else {
    if (data.DATA_TRELCLIENTS_FACH_LIM24>0 && data.DATA_TRELCLIENTS_FACH_LIM24<5000) {
      data.RES_FINAL_KRED_SUM = Math.max(data.RES_FINAL_KRED_SUM,data.DATA_TRELCLIENTS_FACH_LIM24);
      data.RES_FINAL_KRED_SUM = Math.min(data.RES_FINAL_KRED_SUM,10000);
          if (data.PROD_CHAR_LIMITREQUESTED > data.RES_FINAL_KRED_SUM) {
      data.RES_LIMIT_ITOG = data.RES_FINAL_KRED_SUM;
    }
    else {
      data.RES_LIMIT_ITOG = data.PROD_CHAR_LIMITREQUESTED;
    }
  }
  else {
    if (data.PROD_CHAR_LIMITREQUESTED > data.RES_FINAL_KRED_SUM) {
      data.RES_LIMIT_ITOG = data.RES_FINAL_KRED_SUM;
    }
    else {
      data.RES_LIMIT_ITOG = data.PROD_CHAR_LIMITREQUESTED;
    }
  }
 }
 if (data.cash_amnisty == 'Y') {
    data.RES_LIMIT_ITOG = Math.max(data.RES_FINAL_KRED_SUM,data.DATA_TRELCLIENTS_FACH_LIM24,data.cash_amnisty_lim,5000);
     if (data.PROD_CHAR_LIMITREQUESTED > data.RES_LIMIT_ITOG) {
        data.RES_LIMIT_ITOG = data.RES_LIMIT_ITOG;
     }
     else {
      data.RES_LIMIT_ITOG = data.PROD_CHAR_LIMITREQUESTED;
     }
 }
}
else {
  data.RES_LIMIT_ITOG = 0;
}

if (data.RES_TYPE_CUST == 'EXTERN') {
  data.RES_LIMIT_ITOG = Math.min (data.RES_LIMIT_ITOG, 15000);
}


if (data.RES_LIMIT_ITOG>100000) {
  data.RES_LIMIT_ITOG = 100000;
}

data.RES_CHAR_PLAT_MIN = 0;

/*--------------------------------------Fraud flag----------------------------------------------------------*/

if ((data.FRAUD_DEC_FINAL_FLOW == 'REFER' ) &&
    ((data.PROD_CHAR_BANK == 'PB'|| data.PROD_CHAR_BANK=='AB') && (data.RES_DEBCARD_P_SRED > 1000 || data.RES_DEBCARD_Z_SRED > 1000 || data.RES_DEPOSIT_TOTAL > 5000))) {
    data.FRAUD_DEC_FINAL_FLOW = 'ACCEPT';

}
if (data.FRAUD_DEC_FINAL_FLOW == 'DECLINE' && data.RES_TYPE_CUST == 'INTERN') {
    data.FRAUD_DEC_FINAL_FLOW = 'REFER';
}