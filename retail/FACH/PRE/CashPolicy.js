
data.RES_DEC_REAS_CODE_TABLE = new Array();
var stateO = new Array('O','L','R','A','D');
var NoPosKI = new Array('NEGATIVE','HDNEGATIVE','MEDIUM');

var amnistActTerm = 'N';
if (data.PROD_SCHEME_TERM>=6 && data.PROD_SCHEME_TERM<12 && (data.RES_FINAL_KRED_SUM_6>=1000 || data.RES_FINAL_KRED_SUM>=1000)){
    amnistActTerm = 'Y';
}


/*----------------------------------- CASH_BLACK_PAN definition------------------------------------------------------*/
var CASH_BLACK_PAN;
if (data.RES_DEBCARD_Z_SRED>= 1000 || data.RES_DEBCARD_P_SRED>= 1000 || data.LOCAL_DEPOSIT_AMOUNT>= 10000 || data.DATA_OB_ALL > 1000 ||
    (data.BCH_CRED_HIST_YBCH!= undefined && data.BCH_CRED_HIST_YBCH.substring(0,1) =='P' && NoPosKI.indexOf(data.BCH_CRED_HIST_YBCH)==-1 && NoPosKI.indexOf(data.BCH_CRED_HIST_DATA)==-1 )) {
    CASH_BLACK_PAN='TRUE';
}
else {
    CASH_BLACK_PAN='FALSE';
}

/*-------------------------------Block client--------------------------------------------------------*/
if (data.PROD_CLIENT_BLOCK == 'Y'){
    data.RES_DEC_REAS_CODE_TABLE.push('D135');
}

if (data.PROD_CLIENT_BLOCK == 'Y' && data.PROD_StatusFach == 'N' && data.KC_LIMIT_P48>0) {
    data.RES_DEC_REAS_CODE_TABLE.pop('D135');
}

/*-------------------------------Clients age between 17 and 70--------------------------------------------------------*/

if (data.RES_AGE<18 || data.RES_AGE>=70 ){
    data.RES_DEC_REAS_CODE_TABLE.push('D601');
}


/*-----------------------------Client in the list of listed passports-------------------------------------------------*/
if (data.DATA_LOSTPASS_ISBADPASS == 'Y') {
    data.RES_DEC_REAS_CODE_TABLE.push('D602');
}
/*-----------------------------Refuse fy restriction list-------------------------------------------------------------*/

if ( (data.PROD_CHAR_BANK == 'PB'|| data.PROD_CHAR_BANK == 'AB') && data.DATA_ECB_NOT_WORK !='Y' &&
    (data.LOCAL_BLCL_COLOR == 'R' ||
    (data.LOCAL_BLCL_COLOR =='Y' && (data.LOCAL_BLCL_CONTROL_CL == 'ZPD' || data.LOCAL_BLCL_CONTROL_CL =='ZPDO') && CASH_BLACK_PAN=='FALSE')
    )
) {
    data.RES_DEC_REAS_CODE_TABLE.push('D603');
}


/*--------------------------Client's enterprise okpo in Black List---------------------------------------------------*/
if (data.LOCAL_BLOKPO =='Y' && data.RES_DEBCARD_ZP !='Y' && data.RES_DEBCARD_PENS !='Y') {
    data.RES_DEC_REAS_CODE_TABLE.push('D604');
}

/*-----------------------------------Phone number in Black List------------------------------------------------------*/
if (data.LOCAL_BLPHONE =='Y' ) {
    data.RES_DEC_REAS_CODE_TABLE.push('D605');
}

/*----------------------------------------Negative credit history-----------------------------------------------------*/
/*
 if ((data.PROD_CHAR_BANK =='PB' || data.PROD_CHAR_BANK =='AB') &&
 (data.BCH_CRED_HIST_YBCH != undefined && data.BCH_CRED_HIST_YBCH.substring(0,1)=='N' &&
 ((data.RES_DEBCARD_Z_SRED < 1000 && data.RES_DEBCARD_P_SRED< 1000 && data.PROD_CHAR_LIMITREQUESTED<5000) ||
 data.PROD_CHAR_LIMITREQUESTED>5000)
 ) ||
 (data.BCH_CRED_HIST_YBCH != undefined && data.BCH_CRED_HIST_YBCH.substring(0,1)=='H'))
 {
 data.RES_DEC_REAS_CODE_TABLE.push('D606');
 }
 */

/*---------------------Negative internal credit history--------------------------------------------------------------*/

if  (data.BCH_CRED_HIST_DATA != undefined && data.BCH_CRED_HIST_DATA.substring(0,1)=='H') {
    data.RES_DEC_REAS_CODE_TABLE.push('D607');
}
/*----------------------Hard refuse by BlackList----------------------------------------------------------------------*/

if (data.LOCAL_BLCL_COLOR =='BORDO')  {
    data.RES_DEC_REAS_CODE_TABLE.push('D608');
}
/*------------------No limit---------------------------------------------------------------*/

if (
    (data.RES_FINAL_KRED_SUM<5000 && data.DATA_TRELCLIENTS_FACH_LIM24<5000 && data.cash_amnisty != 'Y' && amnistActTerm != 'Y') ||
    data.RES_TYPE_CUST == 'EXTERN'
) {
    data.RES_DEC_REAS_CODE_TABLE.push('D609');
}

/*------------------LimitsGet Negative------------------------------------------------------*/

if (data.DATA_TRELCLIENTS_NEGAT =='Y' && data.DATA_TRELCLIENTS_CODE != 'A101' && data.DATA_TRELCLIENTS_CODE != 'D304') {
    data.RES_DEC_REAS_CODE_TABLE.push(data.DATA_TRELCLIENTS_CODE);
}

/*-------------------------------Cash_Vostok-------------------------------------------------------------------------*/

if ((
    (data.PROD_CHAR_BANK == 'AB' || data.PROD_CHAR_BANK =='PB')  && data.SPVostok_BadBranch =='Y'
    )
    ||
    data.LOCAL_MOBILIZATION =='Y'
    ||
    (data.SPVostok_VostokRegion=='Y')  && (data.LOCAL_DONBASS_EXCLUDES!='Y' || data.RES_TYPE_CUST !='INTERN')
    || (data.FRAUD_DEC_FINAL_FLOW=='DECLINE' && data.RES_TYPE_CUST !='INTERN'))
{
    data.RES_DEC_REAS_CODE_TABLE.push('D610');
}

/*---------------------Mobile phone number is abcent-----------------------------------------------------------------*/

if ( data.LOCAL_CONTACT_PHONE_MOB == undefined || data.LOCAL_CONTACT_PHONE_MOB.trim()=='' ){
    data.RES_DEC_REAS_CODE_TABLE.push('D611');
}

//-----------------------Cash_Loanamount-------------------------------

if ((data.PROD_SCHEME_TERM> 6 && ((data.PROD_CHAR_LIMITREQUESTED<5000 && amnistActTerm != 'Y') || data.PROD_CHAR_LIMITREQUESTED > 50000)) || (data.PROD_SCHEME_TERM== 6 && data.PROD_CHAR_LIMITREQUESTED<1000)) {
    data.RES_DEC_REAS_CODE_TABLE.push('D625');
}

//-----------------------Cash_LightStopAction-------------------------------

if (data.PROD_SCHEME_TERM>= 12 && amnistActTerm == 'Y' && ((data.RES_FINAL_KRED_SUM<5000 && data.DATA_TRELCLIENTS_FACH_LIM24<5000)||data.PROD_CHAR_LIMITREQUESTED<5000)) {
    data.RES_DEC_REAS_CODE_TABLE.push('D627');
}


//--------------------Open_Fach_DDZ------------------------------------------

/*
 var cash = 'N';

 for (var i=0; i< data.DATA_CRED.length; i++){
 if (stateO.indexOf(data.DATA_CRED[i].STATE) != -1) {
 if (data.DATA_CRED[i].PRODUCT == 'FACH' || data.DATA_CRED[i].TYPE == 'CRB1') {
 if (Math.abs(data.DATA_CRED[i].BAL) > (data.DATA_CRED[i].LIMIT - data.DATA_CRED[i].LIMIT*0.9) && Math.abs(data.DATA_CRED[i].BAL)>0) {
 cash = 'Y';
 }
 }
 if (data.DATA_CRED[i].DLP == 'LFZ' && data.DATA_CRED[i].TYPE == 'CT') {
 if (data.DATA_CRED[i].START_SUMM !== 0){
 if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100 > 10){
 cash = 'Y';
 }
 }
 }
 if (data.DATA_CRED[i].DLP == 'LFZ' && data.DATA_CRED[i].TYPE == 'CE' && Math.abs(data.DATA_CRED[i].BAL)>0) {
 cash = 'Y';
 }
 }
 }

 if (cash == 'Y') {
 data.RES_DEC_REAS_CODE_TABLE.push('D626');
 }
 */
/*
if (data.RES_DEC_REAS_CODE_TABLE.length==0 && data.APP_CUST_ID != 51391734){
    data.RES_DEC_REAS_CODE_TABLE.push('D607');
}
*/


//-------------------------------------Амнистия по решению КЦ (сутки)----------------------

if (data.PROD_StatusFach == 'N' && data.KC_LIMIT_P48>0) {
    if (data.PROD_SCHEME_TERM == data.KC_SCHEME_TERM && data.KC_LIMIT_P48 == data.PROD_CHAR_LIMITREQUESTED) {
        data.RES_DEC_REAS_CODE_TABLE = [];
    }
}


if (data.RES_DEC_REAS_CODE_TABLE.length>0){
    data.RES_DEC_CATEGORY = 'DECLINE';
    data.RES_DEC_TEXT ='DECLINE';
}



if (data.RES_DEC_REAS_CODE_TABLE.length==0) {
    data.RES_DEC_REAS_CODE_TABLE.push('A101');
    data.RES_DEC_CATEGORY='ACCEPT';
    data.RES_DEC_CATEGORY='ACCEPT';
}

