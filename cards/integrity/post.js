// JavaScript Document
const MAX_LIMIT={"PB":{
    "UNI":25000,
    "GOLD":40000,
    "VIP":100000,
    "VIPE":200000,
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
if (data.RES_PROD_TYPE == null || data.RES_PROD_TYPE == "") {
    resProdType = "UNI";
} else if (data.RES_PROD_TYPE == "FACH") {
    resProdType = "CASH";
} else if (data.PROD_CHAR_TYPE_CARD == 'VIPE'){
    resProdType = "VIPE";
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
    if (data.PROD_SCHEME_TERM == 6) {
        post.RES_CHAR_PLAT_MIN = post.RES_LIMIT_P48 * 0.203283;
    }
    if (data.PROD_SCHEME_TERM == 12) {
        post.RES_CHAR_PLAT_MIN = post.RES_LIMIT_P48 * 0.119195;
    }
    data.POST_RES_CHAR_PLAT_MIN = post.RES_CHAR_PLAT_MIN;
    data.RES_CHAR_PLAT_MIN = data.POST_RES_CHAR_PLAT_MIN.toFixed(2);
} else if (data.APP_CUST_IMPORTANT_PRODUCT == 'VP' || data.RES_PROD_TYPE == 'VIP'){
    var sumLimitCred = data.LOCAL_VIP_SUM_LIMIT_FOR_IMPORTANT - data.RES_CRED_LIM + post.RES_LIMIT_P48;
    if (sumLimitCred > post.MAX_LIMIT){
        post.RES_LIMIT_P48 = post.RES_LIMIT_P48 - (sumLimitCred - post.MAX_LIMIT);
    }
}
else {
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
    data.new_lg_state='REFUSE';
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


//доп параметр для карпенок
if (data.STRATEGY_ID=="UpLimitOld") {
    if (data.RES_LIMIT_P48 == 0) {
        data.PROD_ACT_STATUS="DL";
        data.new_lg_state = "REFUSE";
        data.NKK_RES_BI="D";
    } else {
        data.PROD_ACT_STATUS="AN";
        data.new_lg_state = "FINISH";
        data.NKK_RES_BI="L";
    }
}

/****************END*******************/