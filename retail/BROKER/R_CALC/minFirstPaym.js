// JavaScript Document

//---------------------------LOW_INCOME-------------

var corpLowInc = new Array('255','259','260','261','265','266','273');

if (data.PROD_SCHEME_LOANPURPOSE == 'F4' && corpLowInc.indexOf(data.PROD_CHAR_CORPORATION) == -1) {
  SCHEME_LOWINCOME = 'True';
}
else {
  SCHEME_LOWINCOME = 'False';
}
//---------------------------STOCK-------------------
var dt = new Date;
day = dt.getDate();

if (data.PROD_SCHEME_OTCNUMBER == '3188' && day>=20 && data.PROD_SCHEME_LOANPURPOSE == 'RY' && data.PROD_CHAR_CORPORATION == '255') {
  STOCK = 'True';
}
else {
  STOCK = 'False';
}
//----------------Risk_Prod-------------

if (data.LOCAL_TYPE_PURPOSE == 'MOB' || data.LOCAL_TYPE_PURPOSE == 'SMARTPHN' || data.LOCAL_TYPE_PURPOSE == 'NOUTE' || data.LOCAL_TYPE_PURPOSE == 'WINDOW' || data.LOCAL_TYPE_PURPOSE == 'DORS') {
  riskProd = 'Y';
}
else {
  riskProd = 'N';
}


switch (data.typeFistPaym) {
  case '0-0':   paymInternal = 0;  paymExtern = 0; break;
  case '0-10':  paymInternal = 0;  paymExtern = 10; break;
  case '5-15':  paymInternal = 5;  paymExtern = 15; break;
  case '0-20':  paymInternal = 0;  paymExtern = 20; break;
  case '5-25':  paymInternal = 5;  paymExtern = 25; break;
  case '0-40':  paymInternal = 0;  paymExtern = 40; break;
  case '5-45':  paymInternal = 5;  paymExtern = 45; break;
  case '10-10': paymInternal = 10; paymExtern = 10; break;
  case '15-15': paymInternal = 15; paymExtern = 15; break;
  case '10-15': paymInternal = 10; paymExtern = 15; break;
  case '15-20': paymInternal = 15; paymExtern = 20; break;
  case '10-20': paymInternal = 10; paymExtern = 20; break;
  case '15-25': paymInternal = 15; paymExtern = 25; break;
  case '10-30': paymInternal = 10; paymExtern = 30; break;
  case '15-35': paymInternal = 15; paymExtern = 35; break;
  case '10-40': paymInternal = 10; paymExtern = 40; break;
  case '15-45': paymInternal = 15; paymExtern = 45; break;
  case '10-50': paymInternal = 10; paymExtern = 50; break;
  case '15-55': paymInternal = 15; paymExtern = 55; break;
  case '20-30': paymInternal = 20; paymExtern = 30; break;
  case '25-35': paymInternal = 25; paymExtern = 35; break;
  case '20-40': paymInternal = 20; paymExtern = 40; break;
  case '25-45': paymInternal = 25; paymExtern = 45; break;
  case '20-50': paymInternal = 20; paymExtern = 50; break;
  case '25-55': paymInternal = 25; paymExtern = 55; break;
  case '35-45': paymInternal = 35; paymExtern = 45; break;
  
}

if (data.RES_TYPE_CUST == 'INTERN') {
  data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.LOCAL_FIRST_PAYM,data.PROD_SCHEME_MIN_PAYM_INT);
}
else {
  if (data.LOCAL_SCOR_FLAG == 'Y') {
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.LOCAL_FIRST_PAYM,data.PROD_SCHEME_MIN_PAYM_INT);
  }
  else {
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.LOCAL_FIRST_PAYM,data.PROD_SCHEME_MIN_PAYM_EXT);
  }  
}
if (data.RES_TYPE_CUST == 'INTERN') {
  data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,paymInternal);
}
else {
  if (data.LOCAL_SCOR_FLAG == 'Y') {
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,paymInternal);
  }
  else {
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,paymExtern);
  }
}
if (SCHEME_LOWINCOME == 'True') {
  if (data.RES_TYPE_CUST == 'INTERN') {
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,paymInternal+10);
  }
  else {
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,paymExtern+10);
  }
}
/*
if (data.LOCAL_DONBASS == 'Y') {
  data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,20);
}
*/
if (data.UbkiHistoryAmnisty == 'Y') {
 data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.RES_TERMS_MIN_1ST_PAYM,20);
}
if (STOCK == 'True') {
  if (data.RES_TYPE_CUST == 'EXTERN' && data.RES_SCCARD_SCORE_1<193 && riskProd == 'Y') {
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.LOCAL_FIRST_PAYM,10);
  }
  else {
    data.RES_TERMS_MIN_1ST_PAYM = Math.max(data.LOCAL_FIRST_PAYM,0);
  }
}

data.RES_OFFER1_FIRST_PAYM = Math.round(data.RES_TERMS_MIN_1ST_PAYM);