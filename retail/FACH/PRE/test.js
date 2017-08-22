

json ='{"data":{"RES_FINAL_KRED_SUM":4500}}';
var data = JSON.parse(json).data;

data.RES_COEFF_ELIG = 0.5;
data.LOCAL_CRED_MAX_MEDIUM_PAYMENT =0;
data.RES_EXP_MONTH_TOTAL = 0;
data.BCH_CRED_HIST_DATA = 'UNDEFINITE';
data.LOCAL_DEPOSIT_AMOUNT = 85.7;
data.LOCAL_CLIENT_MONTH_PAY =535;
data.RES_DEBCARD_Z_SRED = 0.30;
data.LOCAL_STUD_SRED = 0;
data.RES_DEBCARD_P_SRED =0;


data.PROD_SCHEME_TERM = 12;
data.PROD_CHAR_LIMITREQUESTED = 10000;


data.RES_FINAL_KRED_SUM = 2000;
data.RES_FINAL_KRED_SUM_6 = 2000;
var amnistActTerm = 'N';
if (data.PROD_SCHEME_TERM>=6 && data.PROD_SCHEME_TERM<12 && data.RES_FINAL_KRED_SUM_6>=1000){
    amnistActTerm = 'Y';
}

data.DATA_TRELCLIENTS_FACH_LIM24 = 2000;

//------------------------------------

if ((data.PROD_SCHEME_TERM> 6 && (data.PROD_CHAR_LIMITREQUESTED<5000 || data.PROD_CHAR_LIMITREQUESTED > 50000)) || (data.PROD_SCHEME_TERM== 6 && data.PROD_CHAR_LIMITREQUESTED<1000)) {
    console.log('fdlkjhdgfskhjgdfshjkgdf')
}

console.log(amnistActTerm);

if (
    (data.RES_FINAL_KRED_SUM<5000 && data.DATA_TRELCLIENTS_FACH_LIM24<5000 && data.cash_amnisty != 'Y' && amnistActTerm != 'Y')
) {
    console.log('eeeeeeeeee')
}