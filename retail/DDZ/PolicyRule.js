// JavaScript Document
data.RES_DEC_REAS_CODE_TABLE = new Array();

var stateO = new Array('O','L','R','A','D');
var NoPosKI = new Array('NEGATIVE','HDNEGATIVE','MEDIUM');
var blcl_control = new Array('ZPD','ZPDO','ZPDO2');
var crimea = new Array('UA1','UA2','UA47','UA43','UA55','UA96','UA48','UA11','UA74','UA42');

//----------------------------------- CASH_BLACK_PAN ---
var CASH_BLACK_PAN;
if (data.RES_DEBCARD_Z_SRED>= 1000 || data.RES_DEBCARD_P_SRED>= 1000 || data.LOCAL_DEPOSIT_AMOUNT>= 10000 || data.DATA_OB_ALL >= 1000 ||
    (data.BCH_CRED_HIST_YBCH!= undefined && data.BCH_CRED_HIST_YBCH.substring(0,1) =='P' && NoPosKI.indexOf(data.BCH_CRED_HIST_YBCH)==-1 && NoPosKI.indexOf(data.BCH_CRED_HIST_DATA)==-1 )) {
    CASH_BLACK_PAN='TRUE';
}
else {
    CASH_BLACK_PAN='FALSE';
}

//------------Age-------------------

if (data.RES_AGE<18 || data.RES_AGE>=70)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D701');
}

//--------------------------Lost passport-------------

if (data.DATA_LOSTPASS_ISBADPASS == 'Y')
{
    data.RES_DEC_REAS_CODE_TABLE.push('D702');
}

//---------In Black list-------------

if (data.DATA_ECB_NOT_WORK !='Y' && (data.LOCAL_BLCL_COLOR =='R' ||
    (data.LOCAL_BLCL_COLOR =='Y' && blcl_control.indexOf(data.LOCAL_BLCL_CONTROL_CL) != -1 && CASH_BLACK_PAN=='FALSE')
    )
)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D703');
}

//--------------------------Black OKPO----

if (data.LOCAL_BLOKPO =='Y' && data.RES_DEBCARD_ZP !='Y' && data.RES_DEBCARD_PENS !='Y') {
    data.RES_DEC_REAS_CODE_TABLE.push('D704');
}

//--------------------------Phone number in Black List-------
if (data.LOCAL_BLPHONE =='Y' ) {
    data.RES_DEC_REAS_CODE_TABLE.push('D705');
}

//------------------------Negative credit history--------

if ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') &&
    (data.BCH_CRED_HIST_YBCH != undefined && data.BCH_CRED_HIST_YBCH.substring(0,1)=='N' &&
    data.RES_DEBCARD_Z_SRED < 1000 && data.RES_DEBCARD_P_SRED< 1000
    ) ||
    (data.BCH_CRED_HIST_YBCH != undefined && data.BCH_CRED_HIST_YBCH.substring(0,1)=='H'))
{
    data.RES_DEC_REAS_CODE_TABLE.push('D706');
}

//---------------------Negative internal credit history------------------

if  (data.BCH_CRED_HIST_DATA != undefined && data.BCH_CRED_HIST_DATA.substring(0,1)=='H') {
    data.RES_DEC_REAS_CODE_TABLE.push('D707');
}

//--------------No Limit--------

if (
    (data.DATA_TRELCLIENTS_MAXPAY>0 && data.DATA_TRELCLIENTS_MAXPAY<300) ||
    (data.DATA_TRELCLIENTS_MAXPAY>=300 && data.DATA_TRELCLIENTS_NEGAT =='Y') ||
    (data.DATA_TRELCLIENTS_MAXPAY ==0 && data.RES_FINAL_KRED_SUM<300)
) {
    data.RES_DEC_REAS_CODE_TABLE.push('D709');
}

//----------------Vostok------

if (
    (data.LOCAL_DONBASS == 'Y' && data.LOCAL_DONBASS_EXCLUDES == 'N') ||
    data.LOCAL_MOBILIZATION == 'Y' ||
    crimea.indexOf(data.APP_ACT_ADDRESS.ID_REGION) != -1 || crimea.indexOf(data.APP_REG_ADDRESS.ID_REGION) != -1
)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D710');
}

//---------------------Mobile phone number is abcent------/

if ( data.LOCAL_CONTACT_PHONE_MOB == undefined || data.LOCAL_CONTACT_PHONE_MOB.trim()=='' ){
    data.RES_DEC_REAS_CODE_TABLE.push('D711');
}

//--------Current Deliquency

if ((data.LOCAL_BODY_DELINQUENCY + data.LOCAL_PRC_DELINQUENCY)>500 || data.LOCAL_RESTRUCT =='Y')
{
    data.RES_DEC_REAS_CODE_TABLE.push('D712');
}

//---------------Open peach

if (data.LOCAL_OPEN_PEACH == 'Y') {
    data.RES_DEC_REAS_CODE_TABLE.push('D713');
}

//-----------Loanamount--------------
if (data.PROD_CHAR_LIMITREQUESTED<300 || data.PROD_CHAR_LIMITREQUESTED>3000) {
    data.RES_DEC_REAS_CODE_TABLE.push('D725');
}