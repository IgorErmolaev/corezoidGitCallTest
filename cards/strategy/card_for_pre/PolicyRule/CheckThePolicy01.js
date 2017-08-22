var addState = new Array('BA','BC','BI','BM','CL','FD','KD','KX','SC','SN','SO','SS','ST');
var badVisual = new Array('N_HOMELESS','N_ALCOHOL','N_ROMA','N_LIE','N_NUT','N_FRAUD');
var docIdent = new Array('PASSPORT','PERMRESID','MILITARY_ID');
var startTypes = new Array('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','UNIPACKSAS','ONLINEANKETA');

var flag = 0;

data.LOCAL_DEC_REAS_CODE_TABLE_1 = new Array();
data.LOCAL_DEC_CATEGORY_1 = new Array();
data.LOCAL_DEC_TEXT_1 = new Array();

/*Age <16*/
if (data.RES_AGE < 14 ||
    (data.RES_AGE < 16 && data.PROD_CHAR_BANK != 'PB' ) ||
    (data.RES_AGE < 16 && ((data.PROD_CHAR_TYPE != 'CARDSET' && data.PROD_CHAR_TYPE != 'REISSUE') || data.PROD_SETTING_PACKAGE != 'GRANT'))){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D101');
}

/*Terror*/
if (data.DATA_PERSLINK != undefined) {
    if (data.DATA_PERSLINK.length != 0) {
        for (var i = 0; i < data.DATA_PERSLINK.length; i++) {
            if (data.DATA_PERSLINK[i].CUST_ID == data.APP_CUST_ID && data.DATA_PERSLINK[i].BL_ZONE == 'R' && data.LOCAL_BLCL_CONTROL == 'TERROR' ) {
                data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D130');
                break;
            }
        }
    }
}

if (data.LOCAL_DEC_REAS_CODE_TABLE_1.length != 0){
    data.LOCAL_DEC_CATEGORY_1.push('DECLINE');
    data.LOCAL_DEC_TEXT_1.push('DECLINE - Decline application');
}

/****** START Only UPLIMIT|UPLIMNKK*********/
if (data.PROD_CHAR_TYPE =='UPLIMIT'  || data.PROD_CHAR_TYPE == 'UPLIMNKK'){
    /*LIMITREQUESTED < NOW_CRED*/
    if (data.PROD_CHAR_LIMITREQUESTED <= data.RES_CRED_LIM && (data.RES_ONLINEANKETA_LIMIT == undefined || data.RES_ONLINEANKETA_LIMIT == 0)){
        data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D121');
        flag++;
    }
    /**/
    if (data.DATA_CRED.length != 0) {
        for (var i = 0; i < data.DATA_CRED.length; i++) {
            if (data.DATA_CRED[i].REFERENC == data.PROD_CHAR_REFERENCE) {
                if (addState.indexOf(data.DATA_CRED[i].ADDSTATE_P48) != -1 && data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('D122') == -1){
                    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D122');
                    flag++;
                }
                if (data.DATA_CRED[i].SPIS == 1 && data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('D125') == -1){
                    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D125');
                    flag++;
                }
            }
        }
    }
    /*down limit*/
    /*
    if (data.LOCAL_CATALOGE_FLAG == 'Y'){
        data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D106');
        flag++;
    }*/
}
if (flag > 0){
    data.LOCAL_DEC_CATEGORY_1.push('DECLINE');
    data.LOCAL_DEC_TEXT_1.push('DECLINE - Decline application');
}
/****** END UPLIMIT|UPLIMNKK*********/

flag = 0;
/*VISUAL_ESTIMATION*/
if (badVisual.indexOf(data.APP_VISUAL_ESTIMATION) != -1){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L111');
    flag++;
}
/*age >= 70*/
if (data.RES_AGE>= 70){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L102');
    flag++;
}
/*age <18*/
if ((data.RES_AGE >= 16 && data.RES_AGE <20 && data.APP_EMPL_SOCIALSTATUS == 'STUDENT' && data.PROD_CHAR_BRANCH != undefined && data.PROD_CHAR_BRANCH.substr(0,2) == 'KI') ||
    (data.RES_AGE >= 16 && data.RES_AGE <18) ||
    (data.RES_AGE >= 14 && data.RES_AGE <16 && (data.PROD_CHAR_TYPE=='CARDSET' || data.PROD_CHAR_TYPE=='REISSUE') && data.PROD_SETTING_PACKAGE == 'GRANT')) {
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L114');
    flag++;
}
/*two cards with limit*/
if ((data.PROD_CHAR_SET_LIMIT == 'ZERO' || data.LOCAL_CRED_HAS_CARD_WITH_LIMIT == 'Y') && data.DATA_CARD_UPGRADE_LIMIT <=0 && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.PROD_PACK_TYPE != 'VIP' && data.APP_CUST_IS_VIP != 'Y'){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L115');
    flag++;
}

/*No resident*/
if ((data.APP_SOCSTATUS_RESIDENT != 'UA' && (data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB')) ||
    (data.LOCAL_DOC_IDENT_COUNTRY != undefined && data.LOCAL_DOC_IDENT_COUNTRY != 'UA' && (data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB'))){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D119');
    flag++;
}

/* Dev fraud score*/
if (data.RES_DEVIATION_FRAUD_SCOR > 0.05 && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP' && (data.RES_ONLINEANKETA_LIMIT == undefined || data.RES_ONLINEANKETA_LIMIT == 0)){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L124');
    flag++;
}

/*Doc ident*/
if ( docIdent.indexOf(data.LOCAL_DOC_IDENT_MAIN) == -1 ||
    ((data.PROD_CHAR_TYPE ==  'CARDSET' || data.PROD_CHAR_TYPE ==  'REISSUE') && data.PROD_SETTING_PACKAGE != 'GRANT' && data.LOCAL_DOC_IDENT_MAIN != 'BIRHTCERTIF' && (data.RES_AGE >14 && data.RES_AGE <= 16))){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D126');
    flag++;
}

/*Easter branches and Mobilization*/
if (data.SPVostok_BadBranch == 'Y' ||
    ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && data.LOCAL_MOBILIZATION == 'Y') ||
    ((data.PROD_CHAR_BANK== 'PB' || data.PROD_CHAR_BANK == 'AB') && startTypes.indexOf(data.PROD_CHAR_TYPE) != -1 && data.SPVostok_ATOVostokRegion == 'Y' && data.PROD_CHAR_BRANCH_FIL == 'ВОСТОЧНОЕ РУ')){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L117');
    flag++;
}

/*Bad adress*/
if ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && (data.APP_ACT_ADDRESS.ADDLINK_LAST == 'Y' || data.APP_REG_ADDRESS.ADDLINK_LAST == 'Y')){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('L129');
    flag++;
}

/*down limit 90days*/
if (data.LOCAL_CATALOGE_FLAG == 'Y' && startTypes.indexOf(data.PROD_CHAR_TYPE) != -1){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('D106');
    flag++;
}

/*if any condition is true than set zero limit and exit*/
if (flag >0 && data.LOCAL_DEC_CATEGORY_1.length == 0){
    data.LOCAL_DEC_CATEGORY_1.push('ZERO_LIMIT');
    data.LOCAL_DEC_TEXT_1.push('ZERO_LIMIT - Set zero limit to customer');
}

flag = 0;

/*Min lim without reg adr*/
if ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && data.APP_REG_ADDRESS.ID_REGION == undefined){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.push('M105');
    flag++;
}

/*if M105 then set minimum limit*/
if (flag >0 && data.LOCAL_DEC_CATEGORY_1.length == 0){
    data.LOCAL_DEC_CATEGORY_1.push('MINIMUM_LIMIT');
    data.LOCAL_DEC_TEXT_1.push('MINIMUM_LIMIT - Set minimum limit');
}

/*else accept = no rules fired previously */
/*
 if (data['LOCAL_DEC_CATEGORY_1'].length == 0){
 data['LOCAL_DEC_CATEGORY_1'].push('ACCEPT');
 data['LOCAL_DEC_TEXT_1'].push('ACCEPT - Accept application');
 }*/

data.nodeName = 'CheckThePolicy01';