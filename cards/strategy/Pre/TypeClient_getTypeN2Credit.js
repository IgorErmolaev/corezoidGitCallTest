function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

function Datediff_2(days_start, days_close ){
    var dateOpen = new Date(days_start); // дата start
    var dateClose = new Date(days_close);// дата close
    var diff = Math.abs(dateClose - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days_ = Math.round(diff / one_day);
    return days_;
}

var date_s, date_c,date_d;

if (data['PROD_CHAR_BANK'] == 'AB' || data['PROD_CHAR_BANK'] == 'PB'){
    var dataCredPayMin = 100;
}

for (var i=0; i< data['DATA_CRED'].length; i++){
    if (data['DATA_CRED'][i]['REFERENC'] != null && data['DATA_CRED'][i]['CR_PAY'] >= dataCredPayMin && data['DATA_CRED'][i]['TR_PAY'] >= 3){
        date_s = Datediff(data['DATA_CRED'][i]['DATE_START']);
        date_c = Datediff(data['DATA_CRED'][i]['DATECLOS_F']);
        date_d = Datediff_2(data['DATA_CRED'][i]['DATE_START'],data['DATA_CRED'][i]['DATECLOS_F']);
        if (data['DATA_CRED'][i]['STATE'] == 'O' && date_s >= 90){
            data['RES_TYPE_CUST'] = 'INTERN';
            break;
        }
        else {
            if ((data['DATA_CRED'][i]['STATE'] == 'C' || data['DATA_CRED'][i]['STATE'] == 'K') && date_s > 0 && date_c>0 && date_d >= 90 && date_c <=180){
                data['RES_TYPE_CUST'] = 'INTERN';
                break;
            }
        }
    }
}

data.nodeName = 'TypeClient_getTypeN2Credit';