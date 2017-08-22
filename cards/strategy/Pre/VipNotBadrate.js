function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

var date_d;

data['LOCAL_VIP_NOT_BADRATE'] = 'N';

if ((data['PROD_CHAR_BANK'] == 'PB' || data['PROD_CHAR_BANK'] == 'AB') && ((data['APP_CUST_IMPORTANT']!= undefined && data['APP_CUST_IMPORTANT_PRODUCT'] == 'VP' && data['APP_CUST_IMPORTANT_LIMIT']>0) || data['RES_PROD_TYPE'] == 'VIP')){
    if (data['RES_DEPOSIT_TOTAL'] >= 10000){
        for (var i=0; i< data['DATA_DEPOSIT'].length; i++){
            date_d = Datediff(data['DATA_DEPOSIT'][i]['DATE_START']);
            if (data['DATA_DEPOSIT'][i]['BAL'] >= 100 && (date_d >= 90 || data['DATA_DEPOSIT'][i]['MONTH'] >= 3)){
                data['LOCAL_VIP_NOT_BADRATE'] = 'Y';
            }
        }
        if (data['LOCAL_SALARY_AMOUNT'] >= 1000 || data['LOCAL_PENS_AMOUNT'] >= 1000){
            data['LOCAL_VIP_NOT_BADRATE'] = 'Y';
        }
    }
}

data.nodeName = 'VipNotBadrate';