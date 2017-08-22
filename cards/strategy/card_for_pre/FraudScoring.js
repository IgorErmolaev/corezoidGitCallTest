function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

data.RES_DEVIATION_FRAUD_SCOR = 0;

var dayd;
dayd = Datediff(data.LOCAL_SCORE_DATE_30_DAYS);
if (data.LOCAL_SCORE_DATE_30_DAYS != undefined &&  dayd<=30) {
    if (data.LOCAL_SCCARD_NAME_30_DAYS == data.RES_SCCARD_NAME_1 && data.LOCAL_SCORE_30_DAYS != 0) {
        data.RES_DEVIATION_FRAUD_SCOR = Math.abs(data.RES_SCCARD_SCORE_1 - data.LOCAL_SCORE_30_DAYS) / data.LOCAL_SCORE_30_DAYS;
        if (data.PROD_CHAR_BANK == 'AB'){
            data.RES_DEVIATION_FRAUD_SCOR =Math.abs(data.RES_SCCARD_SCORE_1 - data.LOCAL_SCORE_30_DAYS);
        }
    }
}
else {
    data.FRAUD_FIRST_SCOR = data.RES_SCCARD_SCORE_1;
    data.FRAUD_FIRST_SCOR_DATE = new Date();
    data.FRAUD_FIRST_SCCARD_NAME = data.RES_SCCARD_NAME_1;
    data.RES_DEVIATION_FRAUD_SCOR = 0;
}

data.nodeName = 'FraudScoring';