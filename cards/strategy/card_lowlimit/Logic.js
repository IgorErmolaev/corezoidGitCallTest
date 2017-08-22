
data.RES_DEC_REAS_CODE_TABLE = new Array();

function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

var difdays = 0;

for (var i=0; i<data.DATA_CRED.length;i++) {
    if (data.DATA_CRED[i].REFERENC == data.PROD_CHAR_REFERENCE) {
        data.RES_CRED_LIM = parseFloat(data.DATA_CRED[i].LIMIT);
        data.RES_CRED_BAL = parseFloat(data.DATA_CRED[i].BAL);

        /*difdays = Datediff(data.DATA_CRED[i].DATE_START);
        if (difdays < 5){
            data.RES_DEC_AUTO = 'N';
            data.RES_COMMENT_NO_AUTO = 'Проверьте баланс;';
        }*/

    }
}

data.RES_DEC_FINAL_COMMENT = '';
data.RES_COMMENT_NO_AUTO = '';

if (data.RES_CRED_BAL <0 && data.PROD_CHAR_LIMITREQUESTED <Math.abs(data.RES_CRED_BAL)){
    data.RES_DEC_REAS_CODE_TABLE.push('D128');
    data.RES_DEC_FINAL_COMMENT = data.RES_DEC_FINAL_COMMENT +  'kD128';
}
if (data.PROD_CHAR_LIMITREQUESTED >= data.RES_CRED_LIM){
    data.RES_DEC_REAS_CODE_TABLE.push('D127');
    data.RES_DEC_FINAL_COMMENT = data.RES_DEC_FINAL_COMMENT +  'kD127';
}

data.RES_LIMIT_ITOG = data.PROD_CHAR_LIMITREQUESTED;
data.RES_LIMIT_P48 = data.RES_LIMIT_ITOG;

if (data.PROD_REASON_DOWN == 'CL_DESIRE'){
    data.RES_DEC_AUTO = 'Y';
}
else {
    data.RES_DEC_AUTO = 'N';
    data.RES_COMMENT_NO_AUTO += 'Проверьте причину снижения;';
}


if (data.RES_DEC_REAS_CODE_TABLE.length != 0){
    data.RES_DEC_CATEGORY = 'DECLINE';
    data.DEC_FINAL_FLOW = 'DECLINE';
    data.RES_DEC_AUTO = 'Y';
    data.RES_COMMENT_NO_AUTO = '';
    data.RES_DEC_REAS_FINAL_CODE = data.RES_DEC_REAS_CODE_TABLE[0];
}
else {
    data.RES_DEC_CATEGORY = 'ACCEPT';
    data.DEC_FINAL_FLOW = 'ACCEPT';
    data.RES_DEC_REAS_FINAL_CODE = 'kA101';
}

data.RES_CASH_BLOCK_CANCEL = 'N';

data.RES_BI = 'N';
if (data.DEC_FINAL_FLOW == 'DECLINE'){
    data.RES_BI = 'D';
}
if (data.RES_DEC_AUTO == 'N' && data.DEC_FINAL_FLOW == 'ACCEPT'){
    data.RES_BI = 'KC';
}

data.RES_TYPE_SMS = 'Y';

data.refuseCodes = data.RES_DEC_REAS_FINAL_CODE;

if (data.PROD_CHAR_BANK == 'CM'){
    data.RES_TYPE_SMS = '';
}

data.APP_ACT_ADDRESS = {};
data.APP_REG_ADDRESS = {};