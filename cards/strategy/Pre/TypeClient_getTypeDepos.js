function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

data['RES_TYPE_CUST'] = 'EXTERN';

if (data['PROD_CHAR_BANK'] == 'AB' || data['PROD_CHAR_BANK'] == 'PB'){
    var resDepositTotalMin=1000;
    var resDepositBalMin=100;
}


if (data['RES_DEPOSIT_TOTAL'] >= resDepositTotalMin){
    if (data['DATA_DEPOSIT'] != undefined && data['DATA_DEPOSIT'].length != 0) {
        for (var i = 0; i < data['DATA_DEPOSIT'].length; i++) {
            if (data['DATA_DEPOSIT'][i]['BAL'] >= resDepositBalMin) {
                var date_d = Datediff(data['DATA_DEPOSIT'][i]['DATE_START']);
                if (date_d >= 30) {
                    data['RES_TYPE_CUST'] = 'INTERN';
                }
                else {
                    data['RES_TYPE_CUST'] = 'NEW_INTERN';
                }
            }
            if (data['RES_TYPE_CUST'] == 'INTERN') {
                break;
            }
        }
    }
}

data.nodeName = 'TypeClient_getTypeDepos';
