/*DECLINE group*/
if ((data.RES_DEC_FINAL_FLOW == 'DECLINE' || data.RES_DEC_FINAL_FLOW == 'ZERO_LIMIT' || data.RES_DEC_CATEGORY == 'DECLINE' || data.RES_DEC_CATEGORY == 'ZERO_LIMIT') ){
    if (data.DATA_CARD_UPGRADE_LIMIT > 0) {
        data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,data.DATA_CARD_UPGRADE_LIMIT);
    }
    else {
        data.RES_LIMIT_ITOG = 0;
        data.RES_LIMIT_ITOG_TYPE = '';
    }
}

/*DEC_CATEGORY*/
if ((data.RES_DEC_FINAL_FLOW == 'DECLINE' || data.RES_DEC_FINAL_FLOW == 'ZERO_LIMIT' || data.RES_DEC_CATEGORY == 'DECLINE' || data.RES_DEC_CATEGORY == 'ZERO_LIMIT') && data.RES_TO_KC != 'Y'){
    data.RES_DEC_CATEGORY = 'DECLINE';
}
else {
    data.RES_DEC_CATEGORY = 'ACCEPT';
}

/*DEAD*/
if (data.LOCAL_BLCL_CONTROL != null){
    if (data.LOCAL_BLCL_CONTROL.indexOf('DEAD') != -1) {
        data.RES_DEC_FINAL_FLOW = 'ACCEPT';
        data.RES_DEC_AUTO = 'N';
    }
}

/*FRAUD PHOTO*/
if (data.RES_CUST_ISID_FRAUD == 'Y' && data.RES_CUST_ISID_FRAUD_CNEG =='Y'){
    data.RES_DEC_AUTO = 'N';
}

/**/

if (data.FIN_REAS_CODE_TABLE != undefined && data.RES_DEC_FINAL_FLOW != 'ACCEPT' && data.RES_PROD_TYPE!= 'VIP' && data.FIN_REAS_CODE_TABLE.indexOf('A101')!= -1) {
    data.FIN_REAS_CODE_TABLE.splice(data.FIN_REAS_CODE_TABLE.indexOf('A101'),1);
}

if (data.RES_TYPE_SMS == 'POSSIBIL' && data.RES_LIMIT_ITOG == 0){
    data.RES_TYPE_SMS = 'Y';
}

if (data.RES_DEC_AUTO == 'N' && data.RES_DEC_FINAL_FLOW == 'ACCEPT' && data.RES_PROD_TYPE != 'VIP'){
    if (data.LOCAL_CALL_COMMENT == 'Y'){
        data.RES_COMMENT_NO_AUTO +=  'Комментарий при обзвоне;';
    }
    if (data.THE_ZAGRAN == 'Y'){
        data.RES_COMMENT_NO_AUTO += 'Загранпаспорт;';
    }
    if (data.RES_CUST_ISID_FRAUD_CNEG =='Y'){
        data.RES_COMMENT_NO_AUTO += 'Негативный прозвон(фрод-валидация);';
    }
}

if (data.RES_DEC_AUTO == 'Y' || data.RES_DEC_FINAL_FLOW == 'DECLINE'){
    data.RES_COMMENT_NO_AUTO = '';
}

/*final comment*/
data.RES_DEC_FINAL_COMMENT = '';
for (i=0; i< data.FIN_REAS_CODE_TABLE.length; i++){
    if (data.FIN_REAS_CODE_TABLE[i] != ''){
        if (data.FIN_REAS_CODE_TABLE[i]== 'A102' || data.FIN_REAS_CODE_TABLE[i]== 'A103'|| data.FIN_REAS_CODE_TABLE[i]=='A104'){
            data.RES_DEC_FINAL_COMMENT = data.RES_DEC_FINAL_COMMENT;
        }
        else {
            if (data.RES_DEC_FINAL_COMMENT.indexOf(data.FIN_REAS_CODE_TABLE[i]) == -1){
                data.RES_DEC_FINAL_COMMENT +=  'k' + data.FIN_REAS_CODE_TABLE[i] + ';';
            }
        }
    }
}

/*---------BI------------*/
data.RES_BI = 'L';

if ((data.RES_DEC_AUTO == 'N' || data.RES_TO_KC == 'Y') && data.RES_LIMIT_ITOG>0){
    data.RES_BI = 'KC';
}
if ((data.FRAUD_FRAUD_SUSPICTION == 'Y' && data.RES_LIMIT_ITOG>0) ||  data.RES_CUST_ISID_FRAUD_CNEG =='Y'){
    data.RES_BI = 'F';
}
if (data.RES_DEC_CATEGORY == 'DECLINE' && data.RES_PROD_TYPE != 'VIP'){
    data.RES_BI = 'D';
}
if (data.RES_BI == 'D' || (data.RES_BI == 'L' && data.RES_LIMIT_ITOG < data.RES_LIMIT_P48)){
    data.RES_LIMIT_P48 = data.RES_LIMIT_P48;
}
else {
    data.RES_LIMIT_P48 = data.RES_LIMIT_ITOG;
}

if (data.FIN_REAS_CODE_TABLE!= undefined && data.FIN_REAS_CODE_TABLE.length > 0 && data.RES_BI == 'D' && data.STRATEGY_ID == 'UpLimit' && data.RES_LIMIT_P48 < data.PRECALC_LIMIT &&
    data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP') {
    var preLimClient = 'Y';
    for (var i = 0; i < data.FIN_REAS_CODE_TABLE.length; i++) {
        if (data.FIN_REAS_CODE_TABLE[i] != 'D111 ' && data.FIN_REAS_CODE_TABLE[i] != 'A101' && data.FIN_REAS_CODE_TABLE[i] != 'A102' &&
            data.FIN_REAS_CODE_TABLE[i] != 'A103' && data.FIN_REAS_CODE_TABLE[i] != 'A104') {
            preLimClient = 'N';
            break;
        }
    }
    if (preLimClient == 'Y') {
        data.RES_LIMIT_P48 = data.PRECALC_LIMIT;
        data.RES_BI = 'L';
    }
}


/*INCOME_REF _SMS*/
if (data.RES_TYPE_SMS == 'INCOME_REF'){
    if (data.PROD_CHAR_LIMITREQUESTED*0.9 <= data.RES_LIMIT_ITOG || ((data.PROD_PACK_TYPE== 'UNI' || data.PROD_PACK_TYPE == 'UN_M') && data.RES_LIMIT_ITOG >= 15000) ||
        (data.PROD_PACK_TYPE == 'GOLD' && data.RES_LIMIT_ITOG >= 25000)){
        if (data.RES_BI == 'L' || (data.RES_BI == 'D' && data.RES_LIMIT_ITOG ==0)){
            data.RES_TYPE_SMS = 'Y';
        }
    }
}

/*HISTORY_CODE*/
for (i=0; i< data.FIN_REAS_CODE_TABLE.length; i++){
    if (data.FIN_REAS_CODE_TABLE[i] != ''){
        data.RES_HISTORY_REAS_CODE +=  data.FIN_REAS_CODE_TABLE[i] + ';';
    }
}

data.RES_DEC_TEXT = data.RES_DEC_CATEGORY;









