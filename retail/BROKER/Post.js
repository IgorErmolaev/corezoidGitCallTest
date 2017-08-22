delete data.SID;

const MAX_LIMIT={"PB":{
    "UNI":25000,
    "GOLD":40000,
    "VIP":80000,
    "CASH":50000
},
    "AB":{
        "UNI":25000,
        "GOLD":40000,
        "VIP":80000,
        "CASH":50000
    }
};

var post = {};
if (data.strategy == "fin") {
    post.RES_LIMIT_ITOG = data.FIN_RES_LIMIT_ITOG;
} else {
    post.RES_LIMIT_ITOG = data.RES_LIMIT_ITOG;
}
var resProdType;

if (data.RES_PROD_TYPE == undefined)
    data.RES_PROD_TYPE = data.PROD_CHAR_TYPE;

if (data.RES_PROD_TYPE == "FACH") {
    resProdType = "CASH";
} else resProdType=data.RES_PROD_TYPE;

post.MAX_LIMIT = MAX_LIMIT[data.PROD_CHAR_BANK][resProdType];
post.MIN_LIMIT = data.RES_LIMIT_P48;

if (resProdType != 'CASH' && data.DATA_CARD_UPGRADE_LIMIT != null && data.DATA_CARD_UPGRADE_LIMIT>0  && data.limit_final_kc< data.DATA_CARD_UPGRADE_LIMIT){
    post.RES_LIMIT_P48 = Math.min(data.DATA_CARD_UPGRADE_LIMIT, post.MAX_LIMIT);
}
else{
    post.RES_LIMIT_P48 = Math.min(data.limit_final_kc, post.MAX_LIMIT);
}

if (resProdType != 'CASH' && data.RES_RIP_APPLICATION == 'Y' && data.PROD_CHAR_BANK == 'AB'){
    if (data.PROD_CHAR_LIMITREQUESTED <= 2000 ){
        data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,2000);
    }
    else {
        data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,data.PROD_CHAR_LIMITREQUESTED);
    }
}



if (resProdType == "CASH") {
    post.RES_LIMIT_P48 = Math.min(post.RES_LIMIT_P48, data.PROD_CHAR_LIMITREQUESTED);
    post.RES_CHAR_PLAT_MIN = post.RES_LIMIT_P48/data.PROD_SCHEME_TERM + post.RES_LIMIT_P48 * 0.0599;
    data.POST_RES_CHAR_PLAT_MIN = post.RES_CHAR_PLAT_MIN;
    data.RES_CHAR_PLAT_MIN = data.POST_RES_CHAR_PLAT_MIN.toFixed(2);
} else {
    post.RES_LIMIT_P48 = Math.max(post.RES_LIMIT_P48, post.MIN_LIMIT);
}

data.POST_RES_LIMIT_P48 = post.RES_LIMIT_P48;
data.RES_LIMIT_P48 = post.RES_LIMIT_P48;

/*флаги для кредитной волны*/
if (data.act_status == "AN") {
    data.SAS_KC_ANSW = "Y";
    data.new_lg_state='FINISH';
} else {
    data.SAS_KC_ANSW = "N";
}

if (resProdType == "CASH" && data.SAS_KC_ANSW == 'N') {
    data.RES_DEC_CATEGORY = 'DECLINE';
    data.RES_DEC_FINAL_FLOW = 'DECLINE';
    data.RES_DEC_TEXT ='Decline application';
    data.RES_LIMIT_P48 = 0;
    data.RES_CHAR_PLAT_MIN = 0;
    data.RES_DEC_REAS_FINAL_CODE = data.code_comment_kc;
    data.RES_DEC_FINAL_CODE_COMMENT = 'Шановний клієнте, ця послуга Вам недоступна';
}

if ((resProdType == "CASH" || resProdType =="RASSR") && data.SAS_KC_ANSW == 'Y') {
    data.RES_DEC_CATEGORY = 'ACCEPT';
    data.RES_DEC_FINAL_FLOW = 'ACCEPT';
    data.RES_DEC_TEXT ='Accept application';
    data.RES_DEC_REAS_FINAL_CODE = data.code_comment_kc;
    data.RES_DEC_FINAL_CODE_COMMENT = 'Попередньо схвалено!';
}

if (resProdType == "RASSR" && data.SAS_KC_ANSW == 'N') {
    data.RES_DEC_CATEGORY = 'DECLINE';
    data.RES_DEC_FINAL_FLOW = 'DECLINE';
    data.RES_DEC_TEXT ='Decline application';
    data.RES_DEC_REAS_FINAL_CODE = data.code_comment_kc;
    if (['E100','E101','E103','E105','E106','E108','E109','E112','1010'].indexOf(data.code_comment_kc) != -1 ) {
        data.RES_DEC_FINAL_CODE_COMMENT = 'Шановний клієнте, ця послуга Вам недоступна: ' + data.comment_kc;
        data.RES_DEC_CATEGORY = 'DECLINE_OVVERIDE';
    }
    else {
        data.RES_DEC_FINAL_CODE_COMMENT = 'Шановний клієнте, ця послуга Вам недоступна';
    }
}

if (data.strategy != null || data.strategy == "fin") {
    data.wave_action = "KCWAIT";
} else {
    data.wave_action = "CALLKCWAIT";
}

data.PROD_ACT_STATUS = data.act_status;

if (data.act_status == 'DL'){
    data.stateBI = 'D';
}
else {
    data.stateBI = 'L';
}

if (data.code_comment_kc!= undefined && (data.code_comment_kc == 'A101' || data.code_comment_kc == 'D111')  && data.STRATEGY_ID == 'UpLimit' &&
    data.RES_LIMIT_P48 < data.PRECALC_LIMIT && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP') {

    data.RES_LIMIT_P48 = data.PRECALC_LIMIT;
    data.stateBI = 'L';
}