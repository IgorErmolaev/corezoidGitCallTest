var LOCAL_TEST_SCORE, LOCAL_TEST_SCORE_L121;

for (var i=0; i <data.RES_DEC_REAS_CODE_TABLE.length;i++){
    if (data.RES_DEC_REAS_CODE_TABLE[i].substring(0,1) == 'M' ){
        LOCAL_TEST_SCORE = 'MIN';
    }
    if ((data.RES_DEC_REAS_CODE_TABLE[i].substring(0,1) == 'L' || data.RES_DEC_REAS_CODE_TABLE[i].substring(0,1) == 'D') && data.RES_DEC_REAS_CODE_TABLE[i] != 'L121'){
        LOCAL_TEST_SCORE = 'BAD';
    }
    if (data.RES_DEC_REAS_CODE_TABLE[i] == 'L121'){
        LOCAL_TEST_SCORE_L121 = 'SCORE';
    }
}


var id_score = data.APP_CUST_ID;
id_score = String(id_score);
id_score = id_score.slice(-3);
id_score = +id_score;

if (LOCAL_TEST_SCORE != 'BAD' && LOCAL_TEST_SCORE != 'MIN' && LOCAL_TEST_SCORE_L121 == 'SCORE' && data.PROD_CHAR_LIMITREQUESTED > 0 ){ /*&& data.RES_LIMIT_ITOG_TYPE == 'NEW'*/
    data.MON_SCORE_TEST_SET = 'SCORE';
    if (id_score >= 900){
        data.MON_SCORE_TEST = 'Challenger1';
    }
    else {
        data.MON_SCORE_TEST = 'Champion';
    }

    if (data.MON_SCORE_TEST == 'Champion' && data.APP_EMPL_SOCIALSTATUS != 'DECREE' && data.APP_EMPL_SOCIALSTATUS != 'STUDENT' && data.APP_EMPL_SOCIALSTATUS != 'UNEMP' && data.RES_SCORE_GREY_ZONE == 'SCORE_NEG' &&
        data.RES_MATRIX_DOHODN_COEFF != 1  && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP'){ /*data.RES_LIMIT_ITOG >= 1000 &&*/
        data.MON_SCORE_TEST_SET = 'SCORE_NEG';
        if (id_score >= 450){
            data.MON_SCORE_TEST = 'KC';
        }
        else {
            data.MON_SCORE_TEST = 'AUTO';
        }
    }
}
else {
    if (LOCAL_TEST_SCORE != 'BAD' && LOCAL_TEST_SCORE != 'MIN'  && data.PROD_CHAR_LIMITREQUESTED > 0 && data.RES_MATRIX_DOHODN_COEFF != 1  && /*data.RES_LIMIT_ITOG_TYPE == 'NEW' && && LOCAL_TEST_SCORE_L121 == 'SCORE'*/
        data.APP_EMPL_SOCIALSTATUS != 'DECREE' && data.APP_EMPL_SOCIALSTATUS != 'STUDENT' && data.APP_EMPL_SOCIALSTATUS != 'UNEMP' && data.RES_SCORE_GREY_ZONE == 'SCORE_POS' &&
        data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP') { /*data.RES_LIMIT_ITOG >= 1000 &&*/
        data.MON_SCORE_TEST_SET = 'SCORE_POS';
        if (id_score >= 500){
            data.MON_SCORE_TEST = 'KC';
        }
        else {
            data.MON_SCORE_TEST = 'AUTO';
        }
    }
}


if ((data.MON_SCORE_TEST_SET == 'SCORE' && data.MON_SCORE_TEST == 'Challenger1') ||(data.MON_SCORE_TEST_SET == 'SCORE_NEG' && data.MON_SCORE_TEST == 'KC')){
    data.LOCAL_DEC_REAS_CODE_TABLE_1.splice(data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L121'),1);
    data.RES_DEC_REAS_CODE_TABLE.splice(data.RES_DEC_REAS_CODE_TABLE.indexOf('L121'),1);
    data.LOCAL_DEC_CATEGORY_1.length = 0;
    data.LOCAL_DEC_CATEGORY_1.push('ACCEPT');
    data.LOCAL_DEC_TEXT_1.length = 0;
    data.LOCAL_DEC_TEXT_1.push('Accept application');
    data.RES_DEC_CATEGORY = 'ACCEPT';
    data.RES_DEC_TEXT = 'Accept application';
    if (data.RES_DEC_REAS_CODE_TABLE.indexOf('A101') == -1){
        data.RES_DEC_REAS_CODE_TABLE.push('A101');
    }
}

data.nodeName = 'TestGroup';