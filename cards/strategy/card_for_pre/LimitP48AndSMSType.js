var typeUp = new Array('CHLIMIT','UPLIMIT','UPLIMNKK');
var typeSt = new Array('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','UNIPACKSAS','ONLINEANKETA');
var typeRestr = new Array('RS06','RS12','RS24','RS36','RS60','RR06', 'RR12', 'RR24', 'RR36', 'RP03', 'RP06', 'RP12', 'RL03', 'RL06', 'SB03');
var declGroup = new Array('DECLINE', 'ZERO_LIMIT', 'VIP');
var localTypeSMS = new Array();


function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}


data.RES_HISTORY_REAS_CODE = '';
if (data.RES_DEC_REAS_CODE_TABLE != undefined){
    for (var i=0; i<data.RES_DEC_REAS_CODE_TABLE.length; i++){
        data.RES_HISTORY_REAS_CODE += data.RES_DEC_REAS_CODE_TABLE[i] + ';';
    }
}
if (data.FRAUD_DEC_REAS_CODE_TABLE != undefined){
    for (var i=0; i<data.FRAUD_DEC_REAS_CODE_TABLE.length; i++){
        data.RES_HISTORY_REAS_CODE += data.FRAUD_DEC_REAS_CODE_TABLE[i] + ';';
    }
}

if (declGroup.indexOf(data.RES_DEC_CATEGORY) != -1 || declGroup.indexOf(data.FRAUD_DEC_FINAL_FLOW) != -1 ||
    data.LOCAL_DEC_CATEGORY_1.indexOf('DECLINE') != -1 || data.LOCAL_DEC_CATEGORY_1.indexOf('ZERO_LIMIT') != -1){
    data.DECLINE_GROUP = 'TRUE'
}
else {
    data.DECLINE_GROUP = 'FALSE'
}

data.RES_LIMIT_P48 = 300;
if (data.PROD_CHAR_BANK == 'AB'){
    data.RES_LIMIT_P48 = 500;
}

/*Source*/
if (data.THE_RIP == 'Y'){
    data.PROD_APP_SOURCE = 'RIP';
    data.PROD_EMPL_LDAP_MANADGER = data.PROD_EMPL_LDAP_EXECUTIVE;
}
if (data.PROD_APP_GIVENPAN != undefined && (data.PROD_APP_GIVENPAN.substring(0,8) == '55772130' || data.PROD_APP_GIVENPAN.substring(0,10) == '5211537030') ){
    data.PROD_APP_SOURCE = 'SHOPUA';
    data.PROD_EMPL_LDAP_MANADGER = 'shopua';
}

data.RES_TO_KC = 'N';
var dateImportant;
dateImportant = Datediff(data.APP_CUST_IMPORTANT_DATE);
if (data.APP_CUST_IMPORTANT_COM != null && data.APP_CUST_IMPORTANT_LIMIT >0 && (dateImportant<=30 && data.RES_PROD_TYPE != 'VIP') && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && (typeSt.indexOf(data.PROD_CHAR_TYPE) !=-1 ||
    (typeUp.indexOf(data.PROD_CHAR_TYPE) !=-1 && data.APP_CUST_IMPORTANT_LIMIT > data.RES_CRED_LIM))){
    data.RES_TO_KC = 'Y';
}
if (data.LOCAL_OLD_CONTR_TYPE == 'Y' || (data.LOCAL_BLCL_CONTROL != undefined && data.LOCAL_BLCL_CONTROL.indexOf('DEAD') != -1 )){
    data.RES_TO_KC = 'Y';
}

/*Final flow*/
if (data.FRAUD_DEC_FINAL_FLOW == 'DECLINE' && data.RES_DEC_CATEGORY!= 'DECLINE'){
    data.RES_DEC_CATEGORY = 'ZERO_LIMIT';
}
if ((data.RES_DEC_CATEGORY == 'DECLINE' || data.RES_DEC_CATEGORY == 'VIP') && data.RES_TO_KC != 'Y'){
    data.RES_DEC_FINAL_FLOW = 'DECLINE';
}
else {
    data.RES_DEC_FINAL_FLOW = 'ACCEPT';
}
if (data.RES_DEC_CATEGORY == 'ZERO_LIMIT' &&  data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.LOCAL_OLD_CONTR_TYPE != 'Y' && (data.LOCAL_BLCL_CONTROL == undefined ||
    data.LOCAL_BLCL_CONTROL.indexOf('DEAD') ==-1) && typeUp.indexOf(data.PROD_CHAR_TYPE)!=-1){
    data.RES_DEC_FINAL_FLOW = 'DECLINE';
}

/*CRIMEA*/
if (data.RES_DEC_REAS_CODE_TABLE.indexOf('X101') !=-1 && data.DATA_CARD_UPGRADE_LIMIT >0){
    data.RES_DEC_FINAL_FLOW = 'DECLINE';
}

/*set 0 limit*/
if (data.DECLINE_GROUP == 'TRUE' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')){
    data.RES_LIMIT_ITOG = 0;
    data.RES_LIMIT_P48 = 0;
    data.RES_LIMIT_ITOG_TYPE = '';
}

/*other CCY*/
if (data.PROD_SCHEME_CCY_LOAN != 'UAH' ){
    data.RES_LIMIT_ITOG = 0;
    data.RES_LIMIT_P48 = 0;
    data.RES_LIMIT_ITOG_TYPE = '';
}

/*limitrequested = 0*/
if (data.PROD_CHAR_LIMITREQUESTED == 0){
    data.RES_LIMIT_P48 = 0;
}

/*no gen limit for fraud*/
if (typeSt.indexOf(data.PROD_CHAR_TYPE)!=-1 && data.FRAUD_FRAUD_SUSPICTION == 'Y'){
    data.RES_LIMIT_P48 = 0;
}

/*has restr/pros*/
if (data.LOCAL_HAS_DELINQUENCY == 'Y' || data.BCH_CRED_OWN_PROS_YBCH =='Y' || (data.BCH_CRED_HIST_YBCH != undefined && data.BCH_CRED_HIST_YBCH.substring(0,1) == 'H')){
    data.RES_LIMIT_P48 = 0;
}
if (data.RES_LIMIT_P48 != 0) {
    for (var i=0; i<data.DATA_CRED.length;i++) {
        if (typeRestr.indexOf(data.DATA_CRED[i].TYPE) !=-1){
            data.RES_LIMIT_P48 = 0;
        }
    }
}

/*fraud validation*/
if (data.RES_CUST_ISID == undefined || data.RES_CUST_ISID == 'N' || data.RES_CUST_ISID_FRAUD == 'Y'){
    data.RES_LIMIT_P48 = 0;
}

/*dead client*/
if (data.LOCAL_BLCL_CONTROL != undefined && data.LOCAL_BLCL_CONTROL.indexOf('DEAD') != -1){
    data.RES_LIMIT_P48 = 0;
}

/*age >=70*/
if (data.RES_AGE >= 70){
    data.RES_LIMIT_P48 = 0;
}

/*without INN*/
if (data.APP_CUST_INN == null || data.APP_CUST_INN == ''){
    data.RES_LIMIT_P48 = 0;
}

/*upgrade limit*/
if (data.DATA_CARD_UPGRADE_LIMIT >0 && data.RES_DEC_FINAL_FLOW != 'DECLINE'){
    data.RES_LIMIT_P48 = Math.max(data.DATA_CARD_UPGRADE_LIMIT,data.RES_LIMIT_P48);
    if (data.DATA_CARD_UPGRADE_LIMIT > data.RES_LIMIT_ITOG){
        data.RES_LIMIT_ITOG = data.DATA_CARD_UPGRADE_LIMIT;
        data.RES_LIMIT_ITOG_TYPE = 'UPGRADE';
        data.RES_DEC_FINAL_FLOW = 'ACCEPT';
    }
}

/*type matrix*/
data.RES_TYPE_MATRIX = data.RES_LIMIT_TYPE_MATRIX;

/*Type SMS*/
data.RES_TYPE_SMS = 'Y';
var typeSMS;

for (var i=0; i<data.RES_DEC_REAS_CODE_TABLE.length;i++) {
    if (data.RES_DEC_REAS_CODE_TABLE[i].substring(0,1) == 'D' || data.RES_DEC_REAS_CODE_TABLE[i].substring(0,1) == 'L') {
        typeSMS = 'O';
    }
    if (data.RES_DEC_REAS_CODE_TABLE[i].substring(0,1) == 'M' ) {
        typeSMS = 'M';
    }
    if (typeUp.indexOf(data.PROD_CHAR_TYPE)!=-1 && data.RES_DEC_REAS_CODE_TABLE[i] == 'D111' && data.RES_LIMIT_PLAT > data.RES_CRED_LIM) {
        typeSMS = '';
    }
    if (data.RES_DEC_REAS_CODE_TABLE[i] == 'L106' && data.LOCAL_BLCL_TYPE_SMS == 'Y'){
        typeSMS = 'BLACK_LIST';
    }
    if (data.RES_DEC_REAS_CODE_TABLE[i] == 'M103' || data.RES_DEC_REAS_CODE_TABLE[i] == 'L132'){
        typeSMS = 'HISTORY';
    }
    localTypeSMS.push(typeSMS);
}

/*Type SMS --- BLACK_LIST*/
if (localTypeSMS.indexOf('O')==-1 && localTypeSMS.indexOf('M')==-1 && localTypeSMS.indexOf('BLACK_LIST')!=-1 ){
    data.RES_TYPE_SMS = 'BLACK_LIST';
}
if (data.RES_TYPE_SMS == 'BLACK_LIST' && data.LOCAL_BLCL_COLOR == 'Y' && data.LOCAL_SCORE_BAD == 'Y'){
    data.RES_TYPE_SMS = 'Y';
}
if ((data.BCH_CRED_HIST_YBCH!= undefined && (data.BCH_CRED_HIST_YBCH.substring(0,1) == 'N' || data.BCH_CRED_HIST_YBCH.substring(0,1) == 'H')) || (data.BCH_CRED_HIST_DATA!= undefined && (data.BCH_CRED_HIST_DATA.substring(0,1) == 'N' || data.BCH_CRED_HIST_DATA.substring(0,1) == 'H'))|| data.LOCAL_HAS_DELINQUENCY == 'Y'){
    data.RES_TYPE_SMS = 'Y';
}

/*Type SMS --- NEW_GOLD*/
if (typeUp.indexOf(data.PROD_CHAR_TYPE) != -1 && (data.PROD_PACK_TYPE=='UNI' || data.PROD_PACK_TYPE =='UN_M') && data.RES_DEC_REAS_CODE_TABLE.indexOf('D111')!= -1 && localTypeSMS.indexOf('BLACK_LIST') ==-1 &&
    (data.RES_HIST_RESTRICTION == '' || data.RES_HIST_RESTRICTION == null || data.RES_HIST_RESTRICTION =='up+500;' || data.RES_HIST_RESTRICTION == 'up+1000;') && data.LOCAL_LIMIT_FOR_GOLD_ITOG > 15000 && data.RES_CRED_LIM == 15000){
    data.RES_TYPE_SMS = 'NEW_GOLD';
    data.RES_ACTION_LIMIT = data.LOCAL_LIMIT_FOR_GOLD_ITOG;
    for (var i=0; i<data.RES_DEC_REAS_CODE_TABLE.length;i++) {
        if (data.RES_DEC_REAS_CODE_TABLE[i] != 'A101' && data.RES_DEC_REAS_CODE_TABLE[i] != 'D111') {
            data.RES_TYPE_SMS = 'Y';
            break;
        }
    }
}

/*Type SMS --- INCOME_REF*/
if (localTypeSMS.indexOf('BLACK_LIST')==-1 && data.PROD_CHAR_LIMITREQUESTED > 0 && (data.LOCAL_TICKET_FLAG== 'Y' || data.LOCAL_TICKET_FLAG_EXTRACT =='Y') && (((data.PROD_PACK_TYPE=='UNI' || data.PROD_PACK_TYPE =='UN_M') && data.RES_LIMIT_ITOG<15000) ||
    (data.PROD_PACK_TYPE=='GOLD' && data.RES_LIMIT_ITOG<25000)) && data.PROD_CHAR_LIMITREQUESTED*0.9 > data.RES_LIMIT_ITOG){
    if ((typeSt.indexOf(data.PROD_CHAR_TYPE) != -1 && data.RES_LIMIT_ITOG > 0) || typeUp.indexOf(data.PROD_CHAR_TYPE) !=-1){
        data.RES_TYPE_SMS = 'INCOME_REF';
        for (var i=0; i<data.RES_DEC_REAS_CODE_TABLE.length;i++) {
            if (data.RES_DEC_REAS_CODE_TABLE[i] != 'A101' && data.RES_DEC_REAS_CODE_TABLE[i] != 'D111') {
                data.RES_TYPE_SMS = 'Y';
                break;
            }
        }
    }
}

/*Type SMS --- HISTORY*/
if (localTypeSMS.indexOf('HISTORY')!=-1 && data.PROD_CHAR_BANK == 'PB' && data.RES_PROD_TYPE != 'VIP' ) {
    data.RES_TYPE_SMS = 'HISTORY';
    for (var i = 0; i < data.RES_DEC_REAS_CODE_TABLE.length; i++) {
        if (data.RES_DEC_REAS_CODE_TABLE[i] == 'M103'){
            data.RES_TYPE_SMS = 'HIST_UBKI'
        }
        if (data.RES_DEC_REAS_CODE_TABLE[i] == 'L132'){
            data.RES_TYPE_SMS = 'HIST_VITR'
        }
        if (data.RES_DEC_REAS_CODE_TABLE[i] != 'A101' && data.RES_DEC_REAS_CODE_TABLE[i] != 'D111' && data.RES_DEC_REAS_CODE_TABLE[i] != 'M103' && data.RES_DEC_REAS_CODE_TABLE[i] != 'L132' && data.RES_DEC_REAS_CODE_TABLE[i] != 'D135') {
            data.RES_TYPE_SMS = 'Y';
            break;

        }
    }
}


/*type generation*/
data.RES_TYPE_GENERATION = '';
if (typeSt.indexOf(data.PROD_CHAR_TYPE) != -1 && data.RES_DEC_FINAL_FLOW == 'ACCEPT'){
    data.RES_TYPE_GENERATION = 'STANDART';
    if (data.PROD_SCHEME_CCY_LOAN == 'UAH' && data.DATA_CARD_UPGRADE_REFCONTRAC != null && data.PROD_CHAR_LIMITREQUESTED >0){
        if (data.RES_LIMIT_ITOG >0){
            data.RES_TYPE_GENERATION = 'UPGRADE';
        }
    }
}

/*call need transfer*/
data.RES_CALL_NEED_TRANSFER='Y';
if (data.THE_RIP == 'Y'){
    data.RES_CALL_NEED_TRANSFER='N';
}
if ((data.RES_SCORE_REGION == 'BAD' && data.RES_SCCARD_TOTAL_SCORE >880) ||
    (data.RES_SCORE_REGION == 'PREBAD' && data.RES_SCCARD_TOTAL_SCORE >806)||
    (data.RES_SCORE_REGION == 'OTHER' && data.RES_SCCARD_TOTAL_SCORE >798)){
    data.RES_CALL_NEED_TRANSFER='N';
}

/*Vostok*/
if (data.SPVostok_AllBranch == 'Y' && (data.RES_TYPE_SMS == 'NEW_GOLD' || data.RES_TYPE_SMS == 'ACTION')){
    data.RES_TYPE_SMS = 'Y';
}

/*Crimea*/
if (data.PROD_CHAR_BANK == null || data.PROD_CHAR_BANK == 'CM'){
    data.RES_TYPE_SMS = '';
}

data.nodeName = 'LimitP48AndSMSType';