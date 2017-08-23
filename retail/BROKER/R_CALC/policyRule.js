// JavaScript Document

data.RES_DEC_REAS_CODE_TABLE = new Array();
var stateO = new Array('O','L','R','A','D');
var NoPosKI = new Array('NEGATIVE','HDNEGATIVE','MEDIUM');
var blcl_control = new Array('ZPD','ZPDO','ZPDO2');
var crimea = new Array('UA1','UA2','UA47','UA43','UA55','UA96','UA48','UA11','UA74','UA42');
var corpG = new Array('171','255','205','165','232','243','158','79','150','257','238','250', '265', '266', '268');

//----------------------------------- CASH_BLACK_PAN ---
var CASH_BLACK_PAN;
if (data.RES_DEBCARD_Z_SRED>= 1000 || data.RES_DEBCARD_P_SRED>= 1000 || data.LOCAL_DEPOSIT_AMOUNT>= 10000 || data.DATA_OB_ALL >= 1000 ||
    (data.BCH_CRED_HIST_YBCH!= undefined && data.BCH_CRED_HIST_YBCH.substring(0,1) =='P' && NoPosKI.indexOf(data.BCH_CRED_HIST_YBCH)==-1 && NoPosKI.indexOf(data.BCH_CRED_HIST_DATA)==-1 )) {
    CASH_BLACK_PAN='TRUE';
}
else {
    CASH_BLACK_PAN='FALSE';
}

//---------------------------------LIMIT_OLD_EXC---------------------------

if (data.LOCAL_LIMIT_OLD_CHECK == 'Y' && data.RES_CRED_HIST_YBCH != 'NEGATIVE' && data.RES_CRED_HIST_YBCH != 'HDNEGATIVE') {
  LIMIT_OLD_EXC = 'True';
}
else {
  LIMIT_OLD_EXC = 'False';
}

//---------------------NO_FRAUD_SCORE-------------------------------------

if (
    (data.RES_LIMIT_ITOG_TYPE == 'ZP' || data.RES_LIMIT_ITOG_TYPE == 'PENS' || data.RES_LIMIT_ITOG_TYPE == 'DEPOS' || data.RES_LIMIT_ITOG_TYPE == 'HYSTORY') ||
    (data.RES_LIMIT_ITOG_TYPE == 'SCOR' && data.RES_FINAL_KRED_SUM >= data.PROD_CHAR_LOANAMOUNT)
   ) {
    NO_FRAUD_SCORE = 'True';
   }
   else {
      NO_FRAUD_SCORE = 'False';
   }
   
//-----------------------DONBASS-------------------------
const BAD_SCORE_DECIL = 251;
if ((data.RES_SCCARD_SCORE_1 > BAD_SCORE_DECIL && (data.LOCAL_DONBASS_EXCLUDES == 'Y' ||  data.LOCAL_CRED_HIST_VOSTOK == 'Y')) ||
    (data.RES_SCCARD_SCORE_1 <= BAD_SCORE_DECIL && data.RES_SCCARD_SCORE_1>data.LOCAL_SCORE_BAL_OTS && data.LOCAL_DONBASS_EXCLUDES == 'Y')) {
    Donbass = 'True';
}
else {
    Donbass = 'False';
}


//-------------------------------Low Score-----------------------------------

if (data.LOCAL_SCORE_DECLINE == 'Y') {
  data.RES_DEC_REAS_CODE_TABLE.push('D001');
}

//------------------------------------AGE------------------------------------

if (data.RES_AGE < 18 ||
   (data.LOCAL_TYPE_PURPOSE == 'MOB' && data.RES_AGE<20) ||
   (data.LOCAL_COUNT_OF_SMARTPHONES>0 && data.RES_AGE<20) ||
   (data.LOCAL_TYPE_PURPOSE == 'NOUTE' && data.RES_AGE<20) ||
   data.RES_AGE>=70
   ) {
      data.RES_DEC_REAS_CODE_TABLE.push('D008');
   }

//-----------------------------RAmount of bounds------------------------------

if (
    data.PROD_CHAR_LOANAMOUNT > data.RES_TERMS_MAX_LOAN_AMOUNT ||
    data.PROD_CHAR_LOANAMOUNT < data.RES_TERMS_MIN_LOAN_AMOUNT ||
    (data.eqlComfy != 'Y' && data.RES_OFFER1_LOAN_AMNT>50000)
   )
  {
    data.RES_DEC_REAS_CODE_TABLE.push('D009');
  }

//-----------------------------Lost passport----------------------------------

if (data.DATA_LOSTPASS_ISBADPASS == 'Y') {
  data.RES_DEC_REAS_CODE_TABLE.push('D010');
}

//-----------------------------In Black List--------------------------------

if (data.DATA_ECB_NOT_WORK !='Y' && (data.LOCAL_BLCL_COLOR =='R' || 
                                      (data.LOCAL_BLCL_COLOR =='Y' && blcl_control.indexOf(data.LOCAL_BLCL_CONTROL_CL) != -1 && CASH_BLACK_PAN=='FALSE' && 
                                       data.RES_LIMIT_ITOG_TYPE != 'SCOR' && data.RES_LIMIT_ITOG_TYPE != 'HYSTORY' && data.RES_CRED_HIST_YBCH != 'POSITIVE' && LIMIT_OLD_EXC == 'False'
                                      )
                                    )
  )
  {
    data.RES_DEC_REAS_CODE_TABLE.push('D011');
  }
  
//-------------------------------Black OKPO-----------------------------------

if (data.LOCAL_BLOKPO =='Y' && data.RES_DEBCARD_ZP !='Y' && data.RES_DEBCARD_PENS !='Y') {
    data.RES_DEC_REAS_CODE_TABLE.push('D012');
}  

/*-----------------------------------Phone number in Black List-----------------------*/
if (data.LOCAL_BLPHONE =='Y' ) {
    data.RES_DEC_REAS_CODE_TABLE.push('D013');
}

//-----------------------------------------Current Delinquency-----------------

if ((data.LOCAL_HAS_DELINQUENCY == 'Y' || ((data.LOCAL_BODY_DELINQUENCY + data.LOCAL_PRC_DELINQUENCY)>200)) && data.LOCAL_RESTRUCT != 'Y') {
  data.RES_DEC_REAS_CODE_TABLE.push('D015');
}

//----------------------------4 Active credits------------------------------

if (data.BCH_CRED_COUNT_ACT>=4)
{
  data.RES_DEC_REAS_CODE_TABLE.push('D016');
}

//--------------------------2 month active credit---------------------------

if (data.LOCAL_COUNT_2_MONTH_CRED>0 || data.LOCAL_CRED_RASSR == 2) {
    data.RES_DEC_REAS_CODE_TABLE.push('D017');
}

if (data.LOCAL_CRED_RASSR == 1) {
    data.RES_DEC_REAS_CODE_TABLE.push('D050');
}
//-------------------------First payment no in bounds----------------------

if (data.RES_TERMS_MIN_1ST_PAYM > data.LOCAL_FIRST_PAYM) {
  data.RES_DEC_REAS_CODE_TABLE.push('D018');
}

//----------------------Count of mobile phones---------------------------

if (data.LOCAL_COUNT_OF_PHONES>2 || data.LOCAL_COUNT_OF_SMARTPHONES>2) {
  data.RES_DEC_REAS_CODE_TABLE.push('D019');
}

//-------------------------Insuarance--------------------------------------

if (
    (data.PROD_SCHEME_INSHURANCE_PRIVATE_EXIST == 'N' || data.PROD_SCHEME_INSHURANCE_PRIVATE_EXIST == 'DECL') &&
    (
     (data.RES_TYPE_CUST == 'EXTERN' && data.PROD_SCHEME_INSUARANCE_EXT == 'Y') ||
     (data.RES_TYPE_CUST == 'INTERN' && data.PROD_SCHEME_INSUARANCE_INT == 'Y')
    )
  ) {
    data.RES_DEC_REAS_CODE_TABLE.push('D020');
  }

//-----------------------Not mobile partner------------------------

if (data.PROD_CHAR_CORPORATION == '0' && data.LOCAL_COUNT_OF_PHONES>0 && data.PROD_SCHEME_GOODSTYPE_POS != 12 && data.PROD_SCHEME_GOODSTYPE_POS != 8) {
  data.RES_DEC_REAS_CODE_TABLE.push('D021');
}

//-------------------RIP decline-----------------------------

if (data.APP_VISUAL_ESTIMATION != 'Y' && data.APP_VISUAL_ESTIMATION != '') {
  data.RES_DEC_REAS_CODE_TABLE.push('D022');
}

//----------------Low income---------------------------------

if (data.LOCAL_CLIENT_MONTH_PAY<=0 && data.LOCAL_CRED_MAX_MEDIUM_PAYMENT<=0 && data.LOCAL_DEPOSIT_AMOUNT<=0){
  data.RES_DEC_REAS_CODE_TABLE.push('D027');
}

//---------------High term----------------------------------

if (
    (
     ((data.RES_TYPE_CUST == 'INTERN' && data.LOCAL_CRED_MAX_MEDIUM_PAYMENT*data.LOCAL_UDK < data.PROD_SCHEME_MIN_AMOUNT_INT) ||
     (data.RES_TYPE_CUST == 'EXTERN' && data.LOCAL_CRED_MAX_MEDIUM_PAYMENT*data.LOCAL_UDK < data.PROD_SCHEME_MIN_AMOUNT_EXT))
     &&
     ((data.RES_TYPE_CUST == 'INTERN' && data.RES_LIMIT_PLAT < data.PROD_SCHEME_MIN_AMOUNT_INT) ||
     (data.RES_TYPE_CUST == 'EXTERN' && data.RES_LIMIT_PLAT < data.PROD_SCHEME_MIN_AMOUNT_EXT))
     &&
     data.RES_DEPOZIT_TOTAL < data.PROD_CHAR_LOANAMOUNT
    ) ||
    (data.LOCAL_SCOR_FLAG == 'Y' && data.RES_FINAL_KRED_SUM < data.PROD_SCHEME_MIN_AMOUNT_INT) || (data.RES_OFFER1_FIRST_PAYM>=60 && data.RES_TERMS_MIN_1ST_PAYM > data.LOCAL_FIRST_PAYM) 
  ) {
    data.RES_DEC_REAS_CODE_TABLE.push('D028');
   }
   
//-----------------Negative BCH----------------------------------

if (data.RES_CRED_HIST_YBCH == 'NEGATIVE' && data.RES_DEBCARD_Z_SRED< 1000 && data.RES_DEBCARD_P_SRED<1000 && data.LOCAL_RESTRUCT != 'Y' && data.UbkiHistoryAmnisty != 'Y')
{
  data.RES_DEC_REAS_CODE_TABLE.push('D029');
}

/*----------------------In hard black list--------------------------------*/

if (data.LOCAL_BLCL_COLOR =='BORDO')  {
    data.RES_DEC_REAS_CODE_TABLE.push('D044');
}

//------------------------No resident---------------------------------

if (data.APP_SOCSTATUS_RESIDENT !='UA' || data.LOCAL_DOC_IDENT_COUNTRY != 'UA')
{
  data.RES_DEC_REAS_CODE_TABLE.push('D046');
}


//------------------------HDnegative BCH--------------------------------

if (data.BCH_CRED_HIST_YBCH != undefined && data.BCH_CRED_HIST_YBCH.substring(0,1)=='H' && data.BCH_CRED_OWN_PROS_YBCH !='Y')
{
  data.RES_DEC_REAS_CODE_TABLE.push('D047');
}

//--------------------------Fraud scor deviation----------------------

if (
    (data.LOCAL_FIRST_SCOR != 0 && (data.RES_SCCARD_SCORE_1 - data.LOCAL_FIRST_SCOR)/data.LOCAL_FIRST_SCOR > 0.25 && NO_FRAUD_SCORE == 'False') ||
    data.LOCAL_MOBILIZATION == 'Y' ||
    crimea.indexOf(data.APP_ACT_ADDRESS.ID_REGION) != -1 ||
    crimea.indexOf(data.APP_REG_ADDRESS.ID_REGION) != -1 
)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D049');
}

data.vostokKC = 'N';
if (data.RES_DEC_REAS_CODE_TABLE != undefined && data.RES_DEC_REAS_CODE_TABLE.indexOf('D049') == -1 && (data.LOCAL_DONBASS == 'Y' && Donbass == 'False')){
/*
    data.RES_DEC_REAS_CODE_TABLE.push('D049');
*/    
    data.vostokKC = 'Y';
}