var LOCAL_CODE_NBSM_QUEST_Q085, LOCAL_CODE_NBSM_QUEST_Q004,LOCAL_CODE_NBSM_QUEST_Q999;

var minL = 500;
var maxL = 5000;
var coeffL = 1;
var unempL = 300;
var timeemplL = 2000;
var restrL = 2000;
var roundL = 100;


if (data.LOCAL_CODE != undefined) {
    localCodeObj = data.LOCAL_CODE;
    var arrKey = Object.keys(localCodeObj);
}

LOCAL_CODE_NBSM_QUEST_Q085 = 'N';
LOCAL_CODE_NBSM_QUEST_Q004 = 'N';
LOCAL_CODE_NBSM_QUEST_Q999 = 'N';

if (data.RES_HIST_RESTRICTION == undefined || data.RES_HIST_RESTRICTION == null){
    data.RES_HIST_RESTRICTION = '';
}

if (arrKey!= undefined) {
    for (var i = 0; i < arrKey.length; i++) {
        var key = arrKey[i];
        var questanswersArray = localCodeObj[key];
        for (var j = 0; j < questanswersArray.length; j++) {

            if (questanswersArray[j].NBSM_QUESTION == 'Q085') {
                LOCAL_CODE_NBSM_QUEST_Q085 = 'Y'
            }
            if ((questanswersArray[j].NBSM_QUESTION == 'Q004' || questanswersArray[j].NBSM_QUESTION == 'Q026') && questanswersArray[j].NBSM_ANSWER == 'GENERAL_N') {
                LOCAL_CODE_NBSM_QUEST_Q004 = 'Y'
            }
            if (questanswersArray[j].NBSM_QUESTION == 'Q999' && questanswersArray[j].NBSM_ANSWER == 'GENERAL_N') {
                LOCAL_CODE_NBSM_QUEST_Q999 = 'Y'
            }
        }
    }

    if (data.RES_CALL_HOME_PHONE == 'Y' || data.RES_CALL_WORK_PHONE == 'Y' || data.RES_CALL_MOB_PHONE == 'Y') {
        if (data.RES_CALL_TOTAL == 'C_NULL' && data.RES_CALL_DIALOGE_TYPE != 'ZERO_LIM' && data.RES_CALL_DIALOGE_TYPE != 'ZERO_LIM_GOLD') {
            if (data.RES_LIMIT_ITOG > unempL) {
                if (data.RES_LIMIT_ITOG < minL) {
                    data.RES_LIMIT_ITOG = minL;
                }
                if (data.RES_LIMIT_ITOG > maxL) {
                    data.RES_LIMIT_ITOG = maxL;
                }
                data.RES_LIMIT_ITOG = Math.max(data.RES_LIMIT_ITOG, data.DATA_CARD_UPGRADE_LIMIT);
                data.RES_HIST_RESTRICTION += 'callNull;';
            }
        }
    }

    if (data.RES_CALL_DIALOGE_TYPE == 'ZERO_LIM' || data.RES_CALL_DIALOGE_TYPE == 'ZERO_LIM_GOLD') {
        if (data.RES_CALL_HOME_PHONE == 'Y' || data.RES_CALL_WORK_PHONE == 'Y' || data.RES_CALL_MOB_PHONE == 'Y') {
            if (LOCAL_CODE_NBSM_QUEST_Q085 != 'Y' ) {
                data.RES_LIMIT_ITOG = data.PROD_CHAR_LIMITREQUESTED;
                data.RES_HIST_RESTRICTION +=  'limitreq;';
                data.RES_COMMENT_NO_AUTO = '';
                data.RES_DEC_AUTO = 'Y';
                data.RES_TO_KC = 'N';
            }
            else {
                if (data.RES_CALL_LIMIT > 0) {
                    data.RES_LIMIT_ITOG = data.RES_CALL_LIMIT;
                    if (data.RES_LIMIT_CALL > 0 && data.RES_LIMIT_CALL < data.RES_LIMIT_ITOG) {
                        data.RES_LIMIT_ITOG = data.RES_LIMIT_CALL;
                    }
                    data.RES_HIST_RESTRICTION += 'CallLimitreq;';
                }
            }
        }
        else {
            data.RES_LIMIT_ITOG = data.PROD_CHAR_LIMITREQUESTED;
            data.RES_HIST_RESTRICTION +=  'limitreq;';
            data.RES_COMMENT_NO_AUTO = '';
            data.RES_DEC_AUTO = 'Y';
            data.RES_TO_KC = 'N';
        }
    }
}
/*Min category*/
if (data.RES_DEC_FINAL_FLOW == 'MINIMUM_LIMIT' && data.RES_LIMIT_ITOG > unempL) {
    if (data.DATA_CARD_UPGRADE_LIMIT > 0) {
        data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,data.DATA_CARD_UPGRADE_LIMIT);
    }
    else {
        data.RES_LIMIT_ITOG = minL;
    }
}

/*Restr category*/
if (data.RES_DEC_FINAL_FLOW == 'RESTRICTION_LIMIT' && data.RES_LIMIT_ITOG > restrL){
    if (data.DATA_CARD_UPGRADE_LIMIT > 0) {
        data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,data.DATA_CARD_UPGRADE_LIMIT);
    }
    else {
        data.RES_LIMIT_ITOG = restrL;
    }
}

/*Decline group*/
/*
if (data.RES_DEC_FINAL_FLOW == 'DECLINE' || data.RES_DEC_FINAL_FLOW == 'ZERO_LIMIT') {
    if (data.DATA_CARD_UPGRADE_LIMIT > 0) {
        data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,data.DATA_CARD_UPGRADE_LIMIT);
    }
    else {
        data.RES_LIMIT_ITOG = 0;
        data.RES_LIMIT_ITOG_TYPE = '';
    }
}
*/

/*Timeempl*/
if (data.RES_CALL_HOME_PHONE =='Y' || data.RES_CALL_WORK_PHONE =='Y' || data.RES_CALL_MOB_PHONE =='Y') {
    if (LOCAL_CODE_NBSM_QUEST_Q004 == 'Y' && data.APP_EMPL_TIMEEMPL >= 12 && data.RES_LIMIT_ITOG >  timeemplL){
        if (data.RES_LIMIT_ITOG_TYPE != 'HYSTORY' && (data.DATA_WORK_TOP1000 != 'Y' || data.DATA_WORK_TOP1000_TYPE != 'WHITEWORK')){
            if (data.DATA_CARD_UPGRADE_LIMIT > 0) {
                data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,data.DATA_CARD_UPGRADE_LIMIT);
            }
            else {
                data.RES_LIMIT_ITOG = timeemplL;
            }
        }
    }
}

if (data.RES_RIP_APPLICATION == 'Y' && data.PROD_CHAR_BANK == 'AB'){
    if (data.PROD_CHAR_LIMITREQUESTED <= 2000 ){
        data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,2000);
    }
    else {
        data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,data.PROD_CHAR_LIMITREQUESTED);
    }
}


/*Round*/
var the_limit, min_limit, round_to;
the_limit = data.RES_LIMIT_ITOG;
if (data.DATA_CARD_UPGRADE_LIMIT > data.RES_LIMIT_ITOG) {
    data.RES_LIMIT_ITOG_TYPE = 'UPGRADE';
    the_limit = data.DATA_CARD_UPGRADE_LIMIT;
}
if (data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB'){
    min_limit = 300;
    round_to = 100;
}

if (data.RES_LIMIT_ITOG > 0 || data.DATA_CARD_UPGRADE_LIMIT > data.RES_LIMIT_ITOG){
    the_limit = the_limit / round_to;
    data.RES_LIMIT_ITOG = Math.round(the_limit) * round_to;
}