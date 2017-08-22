
data['DATA_DEPOSIT'] = new Array();
data['RES_DEPOSIT_TOTAL'] = 0;

if (data["N2_Deposit"] != null) {
    localObj = data["N2_Deposit"];
    var arrKey = Object.keys(localObj);

    for (var i = 0; i < arrKey.length; i++) {
        data['DATA_DEPOSIT'][i] = {};
        data['DATA_DEPOSIT'][i]['REFERENC'] = data["N2_Deposit"][i]['dep_Contr'];
        data['DATA_DEPOSIT'][i]['BAL'] = data["N2_Deposit"][i]['summ'];
        data['DATA_DEPOSIT'][i]['CCY'] = data["N2_Deposit"][i]['currency'];
        data['DATA_DEPOSIT'][i]['DATE_START'] = new Date(data["N2_Deposit"][i]['date_Open']['time'] -data["N2_Deposit"][i]['date_Open']['timezoneOffset']*60*1000);
        data['DATA_DEPOSIT'][i]['MONTH'] = data["N2_Deposit"][i]['termMonth'];
        data['RES_DEPOSIT_TOTAL'] += data['DATA_DEPOSIT'][i]['BAL'];
    }
    delete data["N2_Deposit"];
}