var visual = new Array('N_HOMELESS','N_ALCOHOL','N_ROMA','N_LIE','N_NUT','N_FRAUD');
data.FRAUD_DEC_REAS_CODE_TABLE = new Array();

if (data.FRAUD_DEC_REAS_CODE != undefined) {
    data.FRAUD_DEC_REAS_CODE_TABLE = data.FRAUD_DEC_REAS_CODE.split(';');
    data.FRAUD_DEC_REAS_CODE_TABLE.splice(data.FRAUD_DEC_REAS_CODE_TABLE.length-1,1);
}

var id_test = data.APP_CUST_ID;
id_test = String(id_test);
id_test = id_test.slice(-3);
id_test = +id_test;

if (visual.indexOf(data.APP_VISUAL_ESTIMATION) != -1 && data.PROD_CHAR_BANK== 'PB' && data.STRATEGY_ID != 'KVIT'){
    data.MON_POL_RULES_TEST_GROUP_SET_NAME = 'VISUAL_ESTIMATION';
    if (id_test >= 800){
        data.MON_POL_RULES_TEST_GROUP_NAME = 'Challenger1';
    }
    else {
        data.MON_POL_RULES_TEST_GROUP_NAME = 'Champion';

    }
}

if (data.MON_POL_RULES_TEST_GROUP_NAME == 'Challenger1' && data.MON_POL_RULES_TEST_GROUP_SET_NAME == 'VISUAL_ESTIMATION' && data.RES_PROD_TYPE != 'VIP'){
    data.APP_VISUAL_ESTIMATION = 'Y';
    if (data.FRAUD_DEC_REAS_CODE_TABLE.indexOf('F051') != -1){
        data.FRAUD_DEC_REAS_CODE_TABLE.splice(data.FRAUD_DEC_REAS_CODE_TABLE.indexOf('F051'),1);
        data.FRAUD_DEC_FINAL_FLOW = 'ACCEPT';
    }
}

data.nodeName = 'PolicyTestVisual';