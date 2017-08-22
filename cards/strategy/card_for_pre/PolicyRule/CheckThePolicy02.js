var NoPosKI = new Array('NEGATIVE','HDNEGATIVE','MEDIUM');
var typeRestr = new Array('RS06','RS12','RS24','RS36','RS60','RR06', 'RR12', 'RR24', 'RR36', 'RP03', 'RP06', 'RP12', 'RL03', 'RL06', 'SB03');
var typeUp = new Array('UPLIMIT','UPLIMNKK');

var UPGRADE_LIMIT_EXCLUDES;

if (data.DATA_CARD_UPGRADE_REFCONTRAC == null && data.PROD_TRANSUT  == 'U'){
    UPGRADE_LIMIT_EXCLUDES = 'TRUE';
}
else {
    UPGRADE_LIMIT_EXCLUDES = 'FALSE';
}

var restr = 'N';
for (var i=0; i<data.DATA_CRED.length; i++){
    if (typeRestr.indexOf(data.DATA_CRED[i].TYPE) != -1 ){
        restr = 'Y';
    }
}

var max_sum=0;
if (data.LOCAL_DEPOSIT_SCORING.length >0){
    for(var i=1; i<data.LOCAL_DEPOSIT_SCORING.length; i++){
        if (max_sum < data.LOCAL_DEPOSIT_SCORING[i]){
            max_sum = data.LOCAL_DEPOSIT_SCORING[i];
        }
        max_sum = data.LOCAL_DEPOSIT_SCORING[i];
    }
}

if ((data.RES_DEBCARD_POGASHENIE != null && data.RES_DEBCARD_POGASHENIE != '' && data.LOCAL_PAN_FLAG == 'Y')
    ||
    ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && (max_sum >= 10000 || data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('ACC_INCOME')] >=2000))
    ||
    (data.LOCAL_BLCL_CONTROL!= undefined && data.LOCAL_BLCL_CONTROL.indexOf('KHS') != -1 && (data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && (data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('LIMIT_OLD')] > 0 || data.LOCAL_SCORE_GOOD == 'Y' || data.RES_LIMIT_CRED_HIST > 500 ||
    (data.BCH_CRED_HIST_YBCH!= undefined && data.BCH_CRED_HIST_YBCH.substring(0,1) == 'P' && NoPosKI.indexOf(data.BCH_CRED_HIST_YBCH)==-1 && NoPosKI.indexOf(data.BCH_CRED_HIST_DATA)==-1)))){
    data.BLACK_PAN = 'TRUE';
}
else {
    data.BLACK_PAN = 'FALSE';
}

if (data.RES_TYPE_CUST == 'INTERN' || data.RES_TYPE_CUST == 'NEW_INTERN' || data.RES_LIMIT_TYPE.indexOf('IMPORTANT') !=-1){
    data.SCORE_EXLUDES = 'TRUE';
}
else {
    data.SCORE_EXLUDES = 'FALSE';
}

/*Карта заблокирована*/
if (data.LOCAL_LOCK_CARD == 'Y' && data.RES_LIMIT_TYPE.indexOf('ZP') == -1 &&  data.RES_LIMIT_TYPE.indexOf('PENS') == -1 && data.RES_LIMIT_TYPE.indexOf('DEPOS') == -1 && (data.RES_LIMIT_CRED_HIST == 0 || data.LOCAL_CRED_HISTORY != 'P')){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D124');
}

/*ЧС*/
if (data.DATA_ECB_NOT_WORK != 'Y' && (data.LOCAL_BLCL_COLOR == 'R' || (data.LOCAL_BLCL_COLOR == 'Y' && data.LOCAL_BLCL_CONTROL!= undefined && /*typeUp.indexOf(data.PROD_CHAR_TYPE) ==-1 && */
    ( data.LOCAL_BLCL_CONTROL.indexOf('ZPD') !=-1 || data.LOCAL_BLCL_CONTROL.indexOf('ZPDO') !=-1  || data.LOCAL_BLCL_CONTROL.indexOf('ZPDO2') !=-1 ) && data.BLACK_PAN == 'FALSE'))){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L106');
}

/*Отказ по скорингу*/
if (   data.LOCAL_SCORE_CUTOFF == 'ZERO' && data.PROD_CHAR_BANK != 'PB' && (data.RES_ONLINEANKETA_LIMIT == undefined || data.RES_ONLINEANKETA_LIMIT == 0)){/*data.LOCAL_POSITIVE_HISTORY != 'Y' &&*/
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L121');
}

/*Жесткая КИ*/
if ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && ((data.BCH_CRED_HIST_YBCH!= undefined && data.BCH_CRED_HIST_YBCH.substring(0,1) == 'H')||(data.BCH_CRED_HIST_DATA!= undefined && data.BCH_CRED_HIST_DATA.substring(0,1) == 'H') ||
    (data.STRATEGY_ID == 'CredCardPolygon' && data.LIMIT_CLIENT_F_NCLIENT == 'D205') )){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L116');
}

/*Негативная КИ УБКИ*/
if(data.LOCAL_SALARY_AMOUNT<2000
    && data.LOCAL_PENS_AMOUNT<2000
    && data.RES_LIMIT_TYPE.indexOf('DEPOS') == -1
    && restr == 'N'
    && (
        (data.BCH_CRED_HIST_YBCH!= undefined && data.BCH_CRED_HIST_YBCH.substring(0,1) == 'N') ||
        (data.STRATEGY_ID == 'CredCardPolygon' && data.LIMIT_CLIENT_F_NCLIENT == 'D004')
    )){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('M103');
}
/*Негативная КИ витрины*/
if(data.LOCAL_SALARY_AMOUNT<2000 && data.LOCAL_PENS_AMOUNT<2000 && data.RES_LIMIT_TYPE.indexOf('DEPOS') == -1  && restr == 'N' && data.BCH_CRED_HIST_DATA!= undefined && data.BCH_CRED_HIST_DATA.substring(0,1) == 'N' ){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L132');
}

/*4 и более активных кредитов*/
if (data.BCH_CRED_COUNT_ACT >= 4 && (data.LOCAL_RESTRUCTURING <100 || (data.LOCAL_RESTRUCTURING >=100 && data.BCH_CRED_COUNT_ACT > 4)) && data.RES_LIMIT_TYPE.indexOf('UPGRADE') ==-1){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('M115');
}

/*Жесткая КИ по супругу/супруге*/
if(((data.BCH_CRED_HIST_YBCH_MAR!= undefined && data.BCH_CRED_HIST_YBCH_MAR.substring(0,1) == 'H') || (data.STRATEGY_ID == 'CredCardPolygon' && data.LIMIT_CLIENT_F_NCLIENT == 'D215')) &&
    data.LOCAL_SALARY_AMOUNT<2000 && data.LOCAL_PENS_AMOUNT<2000 && data.RES_LIMIT_TYPE.indexOf('DEPOS') == -1){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L127');
}

/*Негативная КИ по супругу/супруге*/
if (((data.BCH_CRED_HIST_YBCH_MAR != undefined && data.BCH_CRED_HIST_YBCH_MAR.substring(0, 1) == 'N') || (data.STRATEGY_ID == 'CredCardPolygon' && data.LIMIT_CLIENT_F_NCLIENT == 'D290')) &&
    data.LOCAL_SALARY_AMOUNT < 2000 && data.LOCAL_PENS_AMOUNT < 2000 && data.RES_LIMIT_TYPE.indexOf('DEPOS') == -1) {
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L128');
}


/*Блок карты*/
if (data.PROD_LDAP_BLOCK == 'Y' && (data.RES_ONLINEANKETA_LIMIT == undefined || data.RES_ONLINEANKETA_LIMIT == 0)){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D134');
}

/*Блок по клиенту на 30 дней*/
if (data.PROD_CLIENT_BLOCK == 'Y' && (data.PROD_CHAR_TYPE != 'UPLIMNKK' ||
    (data.PROD_CHAR_TYPE == 'UPLIMNKK' && data.LOCAL_TICKET_FLAG != 'Y' && data.LOCAL_TICKET_FLAG_EXTRACT != 'Y' && data.LOCAL_TICKET_FLAG_TEHPASSP!= 'Y' && data.LOCAL_TICKET_FLAG_FORPASSP != 'Y' && data.RES_CLIENT_INSURANCE != 'Y'))&&
    (data.RES_PROD_TYPE != 'VIP' && data.APP_CUST_IMPORTANT_PRODUCT != 'VP')){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D135');
}

/*Отказ по поведенческому скорингу из предрасчета*/
if (data.LIMIT_CLIENT_F_NCLIENT == 'D015' && data.PROD_CHAR_BANK == 'AB'){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D112');
}

/*Минимальный лимит по скору по РИПам*/
if (data.PROD_CHAR_BANK == 'AB' && data.THE_RIP == 'Y' && data.LOCAL_SCORE_CUTOFF == 'MIN' && (data.RES_PROD_TYPE != 'VIP' && data.APP_CUST_IMPORTANT_PRODUCT != 'VP') && (data.RES_ONLINEANKETA_LIMIT == undefined || data.RES_ONLINEANKETA_LIMIT == 0)){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('M104');
}

/*Отказ по Крыму*/
if (['UA1','UA40733'].indexOf(data.APP_ACT_ADDRESS.ID_REGION)!= -1 || ['UA1','UA40733'].indexOf(data.APP_REG_ADDRESS.ID_REGION)!= -1){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('X101');
}

/*************************************/
if (data.LOCAL_DEC_REAS_CODE_TABLE_1 != undefined) {
    if (data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('D112') != -1 || data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('D134') != -1 || data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('D135') != -1) {
        if (typeUp.indexOf(data.PROD_CHAR_TYPE) != -1) {
            data.LOCAL_DEC_CATEGORY_1.push('DECLINE');
            data.LOCAL_DEC_TEXT_1.push('DECLINE - Decline application');
        }
        else {
            data.LOCAL_DEC_CATEGORY_1.push('ZERO_LIMIT');
            data.LOCAL_DEC_TEXT_1.push('ZERO_LIMIT - Set zero limit to customer');
        }
    }

    if (data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('M115') != -1 || data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L106') != -1 || data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L121') != -1 ||
        data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L116') != -1 || data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('M103') != -1 || data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L126') != -1 ||
        data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L127') != -1 || data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L128') != -1 || data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('D124') != -1 ||
        data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('X101') != -1 || data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L132') != -1 || data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('D112') != -1) {
        data.LOCAL_DEC_CATEGORY_1.push('ZERO_LIMIT');
        data.LOCAL_DEC_TEXT_1.push('ZERO_LIMIT - Set zero limit to customer');
    }

    if (data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('M104') != -1) {
        data.LOCAL_DEC_CATEGORY_1.push('MINIMUM_LIMIT');
        data.LOCAL_DEC_TEXT_1.push('MINIMUM_LIMIT');
    }
}

data.nodeName = 'CheckThePolicy02';
