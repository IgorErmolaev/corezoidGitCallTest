var typeUp = new Array('CHLIMIT','UPLIMIT','UPLIMNKK');
var typeSt = new Array('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','UNIPACKSAS');
var badCode = new Array('D101','D130','D121','D125','L111','D119','D112','L106','L121','D134','D124','D106','D122','L114','L129','D126','X101','L133');
var typeRestr = new Array('RS06','RS12','RS24','RS36','RS60','RR06', 'RR12', 'RR24', 'RR36', 'RP03', 'RP06', 'RP12', 'RL03', 'RL06', 'SB03');


if (data.RES_CUST_NEED_CALL == 'N' && data.PROD_CHAR_LIMITREQUESTED == 0 && data.PROD_CHAR_TYPE != 'ONLINEANKETA'){
    data.RES_LIMIT_ITOG = 0;
}
data.RES_LIMIT_CALL = data.RES_LIMIT_ITOG;

data.RES_BI = 'N';

if (data.RES_DEC_AUTO == 'N' || data.RES_TO_KC == 'Y'){
    data.RES_BI = 'KC';
}

if (data.FRAUD_FRAUD_SUSPICTION == 'Y' && data.RES_LIMIT_ITOG >0){
    data.RES_BI = 'F';
}

if (data.RES_CUST_NEED_CALL == 'Y'){
    data.RES_BI = 'O';
    if (data.RES_CALL_DIALOGE_TYPE == 'ZERO_LIM' && data.RES_PROD_TYPE == 'GOLD'){
        data.RES_CALL_DIALOGE_TYPE = 'ZERO_LIM_GOLD'
    }
}

if (data.RES_DEC_FINAL_FLOW == 'DECLINE'){
    data.RES_BI = 'D';
    if (typeSt.indexOf(data.PROD_CHAR_TYPE) !=-1){
        data.RES_TYPE_SMS = '';
    }
}

if (data.RES_TO_KC == 'N' && data.RES_DEC_FINAL_FLOW == 'ACCEPT' && data.RES_DEC_CATEGORY == 'ZERO_LIMIT' && typeSt.indexOf(data.PROD_CHAR_TYPE) !=-1){
    data.RES_BI = 'GD';
}
if (data.RES_TO_KC == 'N' && data.RES_DEC_FINAL_FLOW == 'ACCEPT' && data.RES_CUST_NEED_CALL != 'Y' && typeSt.indexOf(data.PROD_CHAR_TYPE) !=-1 && data.PROD_CHAR_LIMITREQUESTED == 0){
    data.RES_BI = 'GD';
}
/*GENERATION with LIMIT>0*/
if (data.RES_DEC_FINAL_FLOW == 'ACCEPT' && data.RES_DEC_CATEGORY == 'ACCEPT' && data.RES_TO_KC == 'N' && data.RES_DEC_AUTO != 'N' &&
    data.RES_CUST_NEED_CALL != 'Y' && data.FRAUD_FRAUD_SUSPICTION != 'Y' && typeSt.indexOf(data.PROD_CHAR_TYPE) !=-1){
    data.RES_BI = 'GD';
    data.RES_LIMIT_P48 = data.RES_LIMIT_ITOG;
}
/*"GD" is upgrade*/
if (data.RES_BI != 'GD' && data.RES_DEC_FINAL_FLOW == 'ACCEPT' && data.RES_DEC_CATEGORY == 'ACCEPT' && data.RES_TO_KC == 'N' && data.FRAUD_FRAUD_SUSPICTION != 'Y' &&
    typeSt.indexOf(data.PROD_CHAR_TYPE) !=-1 && data.RES_LIMIT_P48 == data.RES_LIMIT_ITOG){
    data.RES_BI = 'GD';
}

if (data.RES_BI == 'N' && typeSt.indexOf(data.PROD_CHAR_TYPE) !=-1){
    data.RES_BI = 'GD';
}

if (data.RES_BI == 'N' && typeUp.indexOf(data.PROD_CHAR_TYPE) !=-1){
    data.RES_BI = 'L';
}

 if (data.RES_DEC_REAS_CODE_TABLE!= undefined && data.RES_DEC_REAS_CODE_TABLE.length > 0 && data.RES_BI == 'D' && data.STRATEGY_ID == 'UpLimit' && data.RES_LIMIT_P48 < data.PRECALC_LIMIT &&
     data.RES_CRED_LIM < data.PRECALC_LIMIT &&  data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP') {
     var preLimClient = 'Y';
     for (var i = 0; i < data.RES_DEC_REAS_CODE_TABLE.length; i++) {
         if (data.RES_DEC_REAS_CODE_TABLE[i] != 'D111' && data.RES_DEC_REAS_CODE_TABLE[i] != 'A101') {
             preLimClient = 'N';
             break;
         }
     }
     if (preLimClient == 'Y') {
         data.RES_LIMIT_P48 = data.PRECALC_LIMIT;
         data.RES_BI = 'L';
     }
 }

if ((data.RES_BI == 'KC' || data.RES_BI == 'F') && data.RES_CLIENT_INSURANCE == 'Y' && typeUp.indexOf(data.PROD_CHAR_TYPE)!=-1){
    data.RES_BI = 'L';
    data.RES_LIMIT_P48 = data.RES_LIMIT_ITOG;
}

if (data.RES_BI == 'GD'){
    data.RES_COMMENT_NO_AUTO = '';
    data.RES_DEC_AUTO = 'Y';
}

/*GOLD_ISFREE*/
data.RES_GOLD_ISFREE = 'N';
if (data.RES_LIMIT_ITOG >=10000 && typeSt.indexOf(data.PROD_CHAR_TYPE) !=-1 && (data.PROD_PACK_TYPE == 'GOLD' || data.PROD_PACK_TYPE == 'UNI' || data.PROD_PACK_TYPE == 'UN_M')){
    if (data.RES_BI == 'KC' || data.RES_BI == 'O' || data.RES_BI == 'GD'){
        data.RES_GOLD_ISFREE = 'Y';
    }
}
if (data.RES_GOLD_ISFREE == 'Y' &&
    ((data.APP_CUST_INN == null || data.APP_CUST_INN == '') ||
    (data.LOCAL_HAS_DELINQUENCY == 'Y' || (data.BCH_CRED_HIST_DATA!= undefined && data.BCH_CRED_HIST_DATA.substring(0,1) == 'H') || data.BCH_CRED_OWN_PROS_YBCH == 'Y') ||
    (data.LOCAL_BLCL_CONTROL != undefined && data.LOCAL_BLCL_CONTROL.indexOf('DEAD') != -1) ||
    data.DATA_ECB_NOT_WORK == 'Y' ||
    ((data.BCH_CRED_HIST_DATA!= undefined && data.BCH_CRED_HIST_DATA.substring(0,1) == 'N') && data.RES_LIMIT_TYPE.indexOf('ZP') == -1 && data.RES_LIMIT_TYPE.indexOf('SOTR') == -1 && data.RES_LIMIT_TYPE.indexOf('PENS') == -1) ||
    data.BCH_YBCH_NOT_WORK == 'Y' ||
    (data.LOCAL_BLCL_CONTROL != undefined && data.LOCAL_BLCL_CONTROL.indexOf('ZPDO2')!=-1 && data.BLACK_PAN == 'FALSE')    ||
    (data.RES_DEC_FINAL_FLOW == 'DECLINE' || data.RES_DEC_FINAL_FLOW == 'ZERO_LIMIT')
    )
){
    data.RES_GOLD_ISFREE = 'N';
}
if (data.RES_GOLD_ISFREE == 'Y'){
    for (var i = 0; i < data.DATA_CRED.length; i++) {
        if (typeRestr.indexOf(data.DATA_CRED[i].TYPE) != -1) {
            data.RES_GOLD_ISFREE = 'N';
            break;
        }
    }
}

/*INCOME_REF_ SMS*/
if ((data.RES_BI == 'KC' || data.RES_BI == 'O' || data.RES_BI == 'F' ) && data.RES_TYPE_SMS != 'INCOME_REF' && (data.RES_DEC_REAS_CODE_TABLE != undefined && data.RES_DEC_REAS_CODE_TABLE.indexOf('L106')==-1 && data.LOCAL_BLCL_TYPE_SMS != 'Y') &&
    data.PROD_CHAR_LIMITREQUESTED >0 && (data.LOCAL_TICKET_FLAG == 'Y' || data.LOCAL_TICKET_FLAG_EXTRACT == 'Y')){
    data.RES_TYPE_SMS = 'INCOME_REF';
    for (var i=0; i<data.RES_DEC_REAS_CODE_TABLE.length;i++) {
        if (data.RES_DEC_REAS_CODE_TABLE[i] != 'A101' && data.RES_DEC_REAS_CODE_TABLE[i] != 'D111') {
            data.RES_TYPE_SMS = 'Y';
            break;
        }
    }
}

/*------VIP-------*/
if ((data.APP_CUST_IMPORTANT_PRODUCT == 'VP' || data.RES_PROD_TYPE == 'VIP') && data.PROD_CHAR_LIMITREQUESTED ==0 && typeSt.indexOf(data.PROD_CHAR_TYPE)!=-1 ){
    data.RES_BI = 'GD';
    data.RES_LIMIT_ITOG = 0;
    data.RES_LIMIT_ITOG_TYPE = '';
    data.RES_LIMIT_P48 = 0;
    data.RES_COMMENT_NO_AUTO = '';
    data.RES_DEC_AUTO = 'Y';
    data.RES_TO_KC = 'N';
}

data.RES_VIP_SUM = 0;
if ((data.APP_CUST_IMPORTANT_PRODUCT == 'VP' || data.RES_PROD_TYPE == 'VIP') && typeUp.indexOf(data.PROD_CHAR_TYPE)!=-1){
    if (data.DECLINE_GROUP == 'TRUE' ){
        for (var i=0; i<data.RES_DEC_REAS_CODE_TABLE.length;i++){
            if (badCode.indexOf(data.RES_DEC_REAS_CODE_TABLE[i]) !=-1){
                data.RES_BI = 'D';
                data.RES_LIMIT_ITOG = 0;
                data.RES_LIMIT_ITOG_TYPE = '';
                data.RES_LIMIT_P48 = 0;
                data.RES_COMMENT_NO_AUTO = '';
                data.RES_VIP_NEED_SZ = 'N';
                data.RES_VIP_PERS_MANAGER = 'N';
                break;
            }
            else {
                data.RES_BI = 'KC';
                data.RES_DEC_AUTO = 'N';
                data.RES_TO_KC = 'Y';
                if (data.RES_DEC_REAS_CODE_TABLE[i] == 'M115'){
                    data.RES_COMMENT_NO_AUTO += 'У клиента 4 и более активных кредита;';
                }
                /*if (data.RES_DEC_REAS_CODE_TABLE[i] == 'L116'){
                    data.RES_COMMENT_NO_AUTO += 'Жесткая негативная кредитная история;';
                }*/
                if (data.RES_DEC_REAS_CODE_TABLE[i] == 'M103'){
                    data.RES_COMMENT_NO_AUTO += 'Негативная кредитная история;';
                }
                if (data.RES_DEC_REAS_CODE_TABLE[i] == 'L132'){
                    data.RES_COMMENT_NO_AUTO += 'Негативная кредитная история;';
                }
                /*if (data.RES_DEC_REAS_CODE_TABLE[i] == 'L127'){
                    data.RES_COMMENT_NO_AUTO += 'Жесткая негативная кредитная история по супругу/супруге;';
                }*/
                if (data.RES_DEC_REAS_CODE_TABLE[i] == 'L128'){
                    data.RES_COMMENT_NO_AUTO += 'Негативная кредитная история по супругу/супруге;';
                }

            }
        }
    }

    if ((data.RES_BI == 'F' || data.RES_BI == 'KC') && data.RES_LIMIT_ITOG ==0 && data.PROD_CHAR_LIMITREQUESTED>0){
        data.RES_BI = 'D';
        data.RES_COMMENT_NO_AUTO = '';
        data.RES_LIMIT_P48 = 0;
        if (data.DATA_OPER_IS_VIP_MANAGER != 'Y'){
            data.RES_VIP_NEED_SZ = 'N';
            data.RES_VIP_PERS_MANAGER = 'N';
        }
    }

    if ((data.RES_BI == 'F' || data.RES_BI == 'KC' || data.RES_BI == 'L') && data.RES_DEC_AUTO == 'Y' && data.RES_LIMIT_ITOG >0 && data.RES_DEC_FINAL_FLOW == 'ACCEPT' && (data.RES_DEC_CATEGORY == 'ACCEPT' || data.RES_DEC_CATEGORY == 'MINIMUM_LIMIT') &&
    data.RES_TO_KC == 'N' && data.FRAUD_FRAUD_SUSPICTION != 'Y'){
        data.RES_BI = 'L';
        data.RES_LIMIT_P48 = data.RES_LIMIT_ITOG;
    }

    if ((data.RES_BI == 'F' || data.RES_BI == 'KC') && data.RES_VIP_NEED_SZ == 'Y'){
        data.RES_VIP_NEED_SZ = 'N';
    }

    if (data.RES_VIP_NEED_SZ == 'Y'){
        data.RES_BI = 'L';
        data.RES_LIMIT_ITOG =0;
        data.RES_LIMIT_P48 = 0;
    }

    if (data.RES_COMMENT_NO_AUTO!= ''){
        var tmp = data.RES_COMMENT_NO_AUTO;
        data.RES_COMMENT_NO_AUTO = '';
        data.RES_COMMENT_NO_AUTO = 'VIP-клиент;';
        data.RES_COMMENT_NO_AUTO += tmp;
    }

    if (data.RES_COMMENT_NO_AUTO == '' && (data.RES_BI == 'F' || data.RES_BI == 'KC')){
        data.RES_COMMENT_NO_AUTO = 'VIP-клиент;';
    }

    if (data.RES_LIMIT_P48 > data.RES_CRED_LIM){
        data.RES_VIP_SUM = data.LOCAL_VIP_SUM_LIMIT_FOR_IMPORTANT + data.RES_LIMIT_P48 - data.RES_CRED_LIM;
    }
    else {
        data.RES_VIP_SUM = data.LOCAL_VIP_SUM_LIMIT_FOR_IMPORTANT + data.RES_LIMIT_P48;
    }

    data.RES_TYPE_SMS = '';
}
//--------------------------------------------------

if (data.RES_COMMENT_NO_AUTO == '' && data.PROD_CHAR_TYPE == 'UPLIMNKK' && (data.RES_BI == 'F' || data.RES_BI == 'KC' ||data.RES_BI == 'N' )){
    if (data.RES_BI == 'N'){
        data.RES_BI = 'KC'
    }
    data.RES_COMMENT_NO_AUTO = 'Экспертное решение;';
}


//***************************Эксперимент по обзвону*************************

var id_call = data.APP_CUST_ID;
id_call = String(id_call);
id_call = id_call.slice(-3);
id_call = parseInt(id_call);

if ( data.RES_BI == 'O' && data.RES_CALL_DIALOGE_TYPE == 'NORMAL' && data.DECLINE_GROUP!= 'TRUE' && data.RES_LIMIT_ITOG >0 && data.RES_COMMENT_NO_AUTO == '' && data.THE_RIP == 'N' && data.PROD_CHAR_LIMITREQUESTED>0){
    data.MON_POL_RULES_TEST_GROUP_SET_NAME = 'NO_CALL';
    data.MON_POL_RULES_TEST_GROUP_NAME = 'Champion';
    if (id_call<= 500){
        data.MON_POL_RULES_TEST_GROUP_NAME = 'Challenger1';
    }
    if (data.MON_POL_RULES_TEST_GROUP_NAME == 'Challenger1'){
        data.RES_BI = 'GD';
        data.RES_LIMIT_P48 =data.RES_LIMIT_ITOG;
        data.RES_CALL_NEED.length = 0;
        data.RES_CUST_NEED_CALL = 'N';
        data.RES_DEC_AUTO = 'Y';
        data.RES_TO_KC = 'N';
    }

}

//**************Дополнительная проверка автоматического решения (временно отключили)**************

/*var id_score = data.APP_CUST_ID;
var id_score1 = data.APP_CUST_ID;
id_score = String(id_score);
id_score1 = String(id_score1);
id_score = id_score.slice(-2);
id_score1 = id_score1.slice(-1);
id_score = +id_score;
id_score1 = +id_score1;



if ((id_score1 == 3 || id_score1 == 4) &&  data.RES_BI == 'GD' && data.DECLINE_GROUP!= 'TRUE' && data.RES_LIMIT_ITOG >0 && (data.DATA_CARD_UPGRADE_LIMIT==0 || data.DATA_CARD_UPGRADE_LIMIT== null)){
    data.RES_COMMENT_NO_AUTO += 'Дополнительная проверка автоматического решения;';
    data.RES_LIMIT_P48 =300;
    data.RES_DEC_AUTO = 'N';
    data.RES_TO_KC = 'Y';
    data.RES_BI = 'KC';
}
*/

/*============================*/
if (data.limit_prep != undefined && data.limit_prep >0 && data.PROD_CHAR_BANK == 'AB' && typeSt.indexOf(data.PROD_CHAR_TYPE)!=-1 && ['KC','O','F'].indexOf(data.RES_BI) != -1  && data.PROD_CHAR_LIMITREQUESTED >0) {
    data.RES_BI = 'GD';
    data.RES_LIMIT_P48 = data.RES_LIMIT_ITOG;
    data.RES_CALL_NEED.length = 0;
    data.RES_CUST_NEED_CALL = 'N';
    data.RES_DEC_AUTO = 'Y';
    data.RES_TO_KC = 'N';
}


//************************ONLINEANKETA**************************************

if (data.LOCAL_ONLINEANKETA_TYPE == 'Y' && data.PROD_CHAR_TYPE == 'UNIPACKSAS'){
    data.PROD_CHAR_TYPE = 'ANKETA';
    if (['O','KC','F'].indexOf(data.RES_BI) != -1 ){
        data.RES_BI = 'GD';
        data.RES_LIMIT_ITOG = 0;
        data.RES_LIMIT_ITOG_TYPE = '';
        data.RES_LIMIT_P48 = 0;
        data.RES_COMMENT_NO_AUTO = '';
        data.RES_DEC_AUTO = 'Y';
        data.RES_TO_KC = 'N';
    }
}

if (data.RES_ONLINEANKETA_LIMIT > 0 && typeSt.indexOf(data.PROD_CHAR_TYPE)!= -1){
    for(var i=0;i<data.RES_DEC_REAS_CODE_TABLE.length; i++){
        if (data.RES_DEC_REAS_CODE_TABLE[i] != 'A101'){
            data.RES_ONLINEANKETA_LIMIT = 0;
        }
    }
    data.RES_BI = 'GD';
    data.RES_COMMENT_NO_AUTO = '';
    data.RES_DEC_AUTO = 'Y';
    data.RES_TO_KC = 'N';
    if ( data.RES_ONLINEANKETA_LIMIT >0){
        data.RES_LIMIT_ITOG = data.RES_ONLINEANKETA_LIMIT;
        data.RES_LIMIT_ITOG_TYPE = 'ANKETA';
        data.RES_LIMIT_P48 = data.RES_ONLINEANKETA_LIMIT;
    }
    else {
        data.RES_LIMIT_ITOG = 0;
        data.RES_LIMIT_ITOG_TYPE = '';
        data.RES_LIMIT_P48 = 0;

    }
}
//**************************************************************************

if (data.RES_HIST_RESTRICTION.indexOf('insurance') != -1 && ['O','KC','F'].indexOf(data.RES_BI) != -1 && typeUp.indexOf(data.PROD_CHAR_TYPE) != -1){
    if (data.RES_LIMIT_ITOG > 0){
        data.RES_BI = 'L';
        data.RES_LIMIT_P48 = data.RES_LIMIT_ITOG;
    }
    else {
        data.RES_BI = 'D';
        data.RES_LIMIT_P48 = 0;
    }
    data.RES_CALL_NEED.length = 0;
    data.RES_CUST_NEED_CALL = 'N';
    data.RES_DEC_AUTO = 'Y';
    data.RES_TO_KC = 'N';
    data.RES_COMMENT_NO_AUTO = '';

}

//*************************************************************************

if (typeSt.indexOf(data.PROD_CHAR_TYPE) != -1){
    data.RES_LIMIT_START = data.RES_LIMIT_P48;
}
data.RES_RIP_APPLICATION = data.THE_RIP;

data.nodeName = 'TheDecision';