var upTypes = new Array('CHLIMIT','UPLIMIT','UPLIMNKK');
var LOCAL_DEC_CAT3_MIN = 'N';
var LOCAL_DEC_CAT3_DEC = 'N';

for (var i=0; i<data.LOCAL_DEC_CATEGORY_1.length;i++){
    if (data.LOCAL_DEC_CATEGORY_1.indexOf('MINIMUM_LIMIT') != -1){
        LOCAL_DEC_CAT3_MIN = 'Y';
    }
    if ((data.LOCAL_DEC_CATEGORY_1.indexOf('DECLINE')!=-1 || data.LOCAL_DEC_CATEGORY_1.indexOf('ZERO_LIMIT')!=-1) && data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L121') ==-1){
        LOCAL_DEC_CAT3_DEC = 'Y';
    }
}

if (LOCAL_DEC_CAT3_MIN == 'Y' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')){
    data.RES_LIMIT_ITOG = 500;
}

if (data.DATA_WORK_TOP1000 == 'Y'){
    data.RES_LIMIT_ITOG = data.LOCAL_WORK_TOP1000_MIN;
}

if (LOCAL_DEC_CAT3_DEC == 'Y' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP') && upTypes.indexOf(data.PROD_CHAR_TYPE) != -1){
    data.RES_LIMIT_ITOG = 0;
    data.RES_LIMIT_ITOG_TYPE = '';
    data.RES_LIMIT_P48 =0;
}

data.nodeName = 'PolicyRulesApply';