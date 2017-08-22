function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

data.RES_DEPOSIT_ACTIVE = 'N';
data.LOCAL_DEPOSIT_AMOUNT = 0;
data.LOCAL_DEPOSIT_SCORING = '';
data.LOCAL_DEPOSIT_SCORING_SUM = 0;

var ddayO = 0;
if (data.DATA_DEPOSIT != undefined) {
    for (var i=0; i<data.DATA_DEPOSIT.length;i++){
        /*Активный кредит\депозит;*/
        if (data.DATA_DEPOSIT[i].REFERENC){
            data.RES_DEPOSIT_ACTIVE = 'Y';
        }

        /*Сумма всех депозитов;*/
        data.LOCAL_DEPOSIT_AMOUNT += data.DATA_DEPOSIT[i].BAL;

        /*Текущий баланс на каждом депозите;*/
        ddayO = Datediff(data.DATA_DEPOSIT[i].DATE_OPEN);
        if (ddayO >= 3 && data.DATA_DEPOSIT[i].MONTH >=3 ){
            if (data.LOCAL_DEPOSIT_SCORING != '') {
                data.LOCAL_DEPOSIT_SCORING = data.LOCAL_DEPOSIT_SCORING + '|' + data.DATA_DEPOSIT[i].BAL;
            }
            else {
                data.LOCAL_DEPOSIT_SCORING = data.DATA_DEPOSIT[i].BAL;
            }
        }
        data.LOCAL_DEPOSIT_SCORING_SUM += data.DATA_DEPOSIT[i].BAL;
    }
}