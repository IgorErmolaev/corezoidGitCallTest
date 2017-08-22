function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

data.RES_DEVIATION_FRAUD_SCOR_SALDO = 0;

var dayd;
dayd = Datediff(data.LOCAL_SCORE_DATE_30_DAYS_SALDO);
if (data.LOCAL_SCORE_DATE_30_DAYS_SALDO != undefined &&  dayd<=30) {
    if (data.LOCAL_SCCARD_NAME_30_DAYS_SALDO == data.RES_SCCARD_NAME_SALDO && data.LOCAL_SCORE_30_DAYS_SALDO != 0) {
        data.RES_DEVIATION_FRAUD_SCOR_SALDO = (data.RES_SCCARD_SCORE_SALDO - data.LOCAL_SCORE_30_DAYS_SALDO) / data.LOCAL_SCORE_30_DAYS_SALDO;
    }
}
else {
    data.FRAUD_FIRST_SCORING_SALDO = data.RES_SCCARD_SCORE_SALDO;
    data.FRAUD_FIRST_SCORING_DATE_SALDO = new Date();
    data.FRAUD_FIRST_SCCARD_SCORE_SALDO = data.RES_SCCARD_NAME_SALDO;
    data.RES_DEVIATION_FRAUD_SCOR_SALDO = 0;
    data.MON_RISK_SCCARD_NAME_SALDO = data.FRAUD_FIRST_SCCARD_SCORE_SALDO;
}

data.nodeName = 'FraudScoringSaldo';