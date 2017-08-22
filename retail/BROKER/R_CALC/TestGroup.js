var LOCAL_TEST_SCORE, LOCAL_TEST_SCORE_L121;

for (var i=0; i <data.RES_DEC_REAS_CODE_TABLE.length;i++){
    if (data.RES_DEC_REAS_CODE_TABLE[i]!= 'D001' && data.RES_DEC_REAS_CODE_TABLE[i]!= 'A101'){
        LOCAL_TEST_SCORE = 'BAD';
    }
    if (data.RES_DEC_REAS_CODE_TABLE[i] == 'D001'){
        LOCAL_TEST_SCORE_L121 = 'SCORE';
    }
}


var id_score = data.APP_CUST_ID;
id_score = String(id_score);
id_score = id_score.slice(-3);
id_score = +id_score;

if (LOCAL_TEST_SCORE != 'BAD'  && LOCAL_TEST_SCORE_L121 == 'SCORE'  ){
        data.MON_SCORE_TEST_SET = 'SCORE';
        if (id_score >= 900){
        data.MON_SCORE_TEST = 'Challenger1';
    }
    else {
        data.MON_SCORE_TEST = 'Champion';
    }

}


if (data.MON_SCORE_TEST_SET == 'SCORE' && data.MON_SCORE_TEST == 'Challenger1'){
    data.RES_DEC_REAS_CODE_TABLE.splice(data.RES_DEC_REAS_CODE_TABLE.indexOf('D001'),1);
}
