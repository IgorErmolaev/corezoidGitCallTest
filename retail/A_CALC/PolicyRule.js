// JavaScript Document
data.RES_DEC_REAS_CODE_TABLE = new Array();
var stateO = new Array('O','L','R','A','D');
var NoPosKI = new Array('NEGATIVE','HDNEGATIVE','MEDIUM');
var blcl_control = new Array('ZPD','ZPDO','ZPDO2');
var soc = new Array('UNEMP','STUDENT','DECREE','SAILOR');
var new_car = new Array ('A+','A-');
var by_car = new Array('A!','A@');
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

//-----------------------------------EXPERIANCE_EXC-------------

var EXPERIANCE_EXC;

if (data.RES_AGE>=55 &&
    (data.APP_EMPL_SOCIALSTATUS == 'PENSION' || data.APP_EMPL_SOCIALSTATUS=='WORKPENS')
)
{
    EXPERIANCE_EXC = 'TRUE';
}
else {
    EXPERIANCE_EXC = 'FALSE';
}


//---------In Black list-------------

if (data.DATA_ECB_NOT_WORK !='Y' && (data.LOCAL_BLCL_COLOR =='R' ||
    (data.LOCAL_BLCL_COLOR =='Y' && blcl_control.indexOf(data.LOCAL_BLCL_CONTROL_CL) != -1 && data.RES_SCCARD_SCORE_1<=139.39 && CASH_BLACK_PAN=='FALSE')
    )
)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D502');
}

//------------Age-------------------

if (((data.RES_AGE<21 || data.RES_AGE>=60) && data.PROD_CHAR_BANK  == 'PB')        ||    ((data.RES_AGE<18 || data.RES_AGE>=70) && data.PROD_CHAR_BANK  == 'AB'))
{
    data.RES_DEC_REAS_CODE_TABLE.push('D503');
}

//-----------Negative history--------------

if  (data.BCH_CRED_HIST_YBCH != undefined && data.BCH_CRED_HIST_YBCH.substring(0,1)=='N')
{
    data.RES_DEC_REAS_CODE_TABLE.push('D504');
}

//--------------------------Lost passport-------------

if (data.DATA_LOSTPASS_ISBADPASS == 'Y')
{
    data.RES_DEC_REAS_CODE_TABLE.push('D505');
}

//------------No resident-----------------

if (data.APP_SOCSTATUS_RESIDENT !='UA')
{
    data.RES_DEC_REAS_CODE_TABLE.push('D506');
}

//--------Current Deliquency

if ((data.LOCAL_BODY_DELINQUENCY + data.LOCAL_PRC_DELINQUENCY)>500 || data.LOCAL_RESTRUCT =='Y')
{
    data.RES_DEC_REAS_CODE_TABLE.push('D507');
}

//----------------3 moth active credit-----

if (data.LOCAL_COUNT_2_MONTH_CRED>0)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D508');
}

//----------2 active credit---

if (data.LOCAL_COUNT_ACTIVE_CREDITS>1)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D509');
}

//-----------Com car-------------

if (data.APP_PROPERTY_CAR_TYPE_EXT =='com' &&
    (data.APP_PROPERTY_ID_CAR_MODEL_EXT == 'bus' || data.APP_PROPERTY_ID_CAR_MODEL_EXT=='truck')
    && data.PROD_SCHEME_LOANPURPOSE !='A!'
)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D510');
}

//-------Hgnegative history-------------

if (data.BCH_CRED_HIST_YBCH != undefined && data.BCH_CRED_HIST_YBCH.substring(0,1)=='H' && data.BCH_CRED_OWN_PROS_YBCH !='Y')
{
    data.RES_DEC_REAS_CODE_TABLE.push('D511');
}

//--------Phone in Black list-----------

if (data.LOCAL_BLPHONE =='Y' )
{
    data.RES_DEC_REAS_CODE_TABLE.push('D512');
}

//-----------Low income--------------

if (0.5*data.RES_INC_DISP<=0 && data.LOCAL_DEPOSIT_AMOUNT<=0 && data.RES_MAX_MID_PAY<=0)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D514');
}

//------------Partwork-----------------  

if (data.APP_EMPL_SOCIALSTATUS == 'PARTWORK')
{
    data.RES_DEC_REAS_CODE_TABLE.push('D516');
}

//--------Experiance<6-------------

if(data.LOCAL_EXP<=6 && EXPERIANCE_EXC == 'FALSE')
{
    data.RES_DEC_REAS_CODE_TABLE.push('D517');
}

//---------Neg Age---------------

if (
    (data.RES_AGE>=18 && data.RES_AGE<=23) || (data.RES_AGE>=60 && data.RES_AGE<70)
)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D518');
}

//--------Social status-------------

if (soc.indexOf(data.APP_EMPL_SOCIALSTATUS) != -1)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D519');
}

//---------Experiance<1---------

if(data.LOCAL_EXP<=1)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D520');
}

//-------Ybch_Not_Work-------------

if (data.BCH_YBCH_NOT_WORK != 'N')
{
    data.RES_DEC_REAS_CODE_TABLE.push('D534');
}

//------Cred_1Def_Ybch------------

if (data.BCH_CRED_1DEF_YBCH != undefined && data.BCH_CRED_1DEF_YBCH.indexOf('Y') != -1)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D535');
}

//----------Car_Value-----------------
if (
    (new_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1 && data.APP_PROPERTY_CAR_VALUE_EXT>800000 && data.PROD_CHAR_BANK == 'AB') ||
    (by_car.indexOf(data.PROD_SCHEME_LOANPURPOSE) != -1 && data.APP_PROPERTY_CAR_VALUE_EXT>600000 && data.PROD_CHAR_BANK == 'AB') ||
    data.PROD_CHAR_LOANAMOUNT_EXT<1000
)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D536');
}

//-----------Zero income--------------

if (soc.indexOf(data.APP_EMPL_SOCIALSTATUS) != -1 && data.LOCAL_INCOME_MONTHSALARY<500 && data.LOCAL_INCOME_OTHERSOURCE<500)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D537');
}

//----------------Fraud scor deviation---------

if (crimea.indexOf(data.APP_ACT_ADDRESS.ID_REGION) != -1 || crimea.indexOf(data.APP_REG_ADDRESS.ID_REGION) != -1 ||
    data.LOCAL_MOBILIZATION =='Y' || data.SPVostok_ATOVostokRegion == 'Y'
)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D549');
}


//----------------Fraud scor deviation---------
/*
if (['A+','A-'].indexOf(data.PROD_SCHEME_LOANPURPOSE)!= -1)
{
    data.RES_DEC_REAS_CODE_TABLE.push('D555');
}
    */