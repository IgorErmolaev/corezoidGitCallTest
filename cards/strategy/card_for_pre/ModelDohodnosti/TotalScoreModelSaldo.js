data.RES_MATRIX_DOHODN = data.crossTableData.bal_scope;
data.RES_MATRIX_DOHODN_COEFF = data.crossTableData.coeff;

var SCORE_EXLUDES;
if ((data.RES_TYPE_CUST == 'INTERN' || data.RES_TYPE_CUST == 'NEW_INTERN' ) || data.RES_LIMIT_TYPE.indexOf('IMPORTANT') != -1) {
    SCORE_EXLUDES = 'Y';
}
else {
    SCORE_EXLUDES = 'N';
}


if (SCORE_EXLUDES == 'N' && data.DATA_ATTRACT_PHONE_OS != 'IOS' && data.LOCAL_POSITIVE_HISTORY != 'Y' && data.RES_MATRIX_DOHODN_COEFF == 1 && (data.RES_ONLINEANKETA_LIMIT == undefined || data.RES_ONLINEANKETA_LIMIT == 0)) {
    data.RES_DEC_REAS_CODE_TABLE.push('L121');
}
/*else {
    if (!(data.APP_CUST_IMPORTANT_PRODUCT == 'VP' || data.RES_PROD_TYPE == 'VIP') && data.PROD_CHAR_BANK == 'PB'){
        if ((data.RES_TYPE_CUST == 'INTERN' || data.RES_TYPE_CUST == 'NEW_INTERN' ) && data.RES_SCCARD_SCORE_SALDO >= 599 && data.RES_LIMIT_TYPE.indexOf('ZP') == -1 &&
            data.RES_LIMIT_TYPE.indexOf('SOTR') == -1 && data.RES_LIMIT_TYPE.indexOf('DEPOS') == -1 && data.RES_LIMIT_TYPE.indexOf('PENS') == -1 && data.RES_LIMIT_TYPE.indexOf('UPGRADE') == -1 && (data.RES_ONLINEANKETA_LIMIT == undefined || data.RES_ONLINEANKETA_LIMIT == 0)) {
            data.RES_DEC_REAS_CODE_TABLE.push('L121');
        }
    }

}*/
if ((data.RES_DEVIATION_FRAUD_SCOR_SALDO > 0.05 ) && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP' && (data.RES_ONLINEANKETA_LIMIT == undefined || data.RES_ONLINEANKETA_LIMIT == 0)) {
    data.RES_DEC_REAS_CODE_TABLE.push('L124');
}
if (data.RES_DEC_CATEGORY != 'DECLINE' && (data.RES_DEC_REAS_CODE_TABLE.indexOf('L121') != -1 || data.RES_DEC_REAS_CODE_TABLE.indexOf('L124') != -1)) {
    data.RES_DEC_CATEGORY = 'ZERO_LIMIT';
    data.RES_DEC_TEXT = 'ZERO_LIMIT';
}

data.nodeName = 'TotalScoreModelSaldo';