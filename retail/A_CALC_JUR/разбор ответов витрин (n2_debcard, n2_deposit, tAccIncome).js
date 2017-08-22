function datediff(date_start, date_end){
    var date_s = new Date(date_start);
    var diff = Math.abs(date_end - date_s);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / one_day);
    return days;
}

function safedate(date_str) {
    if (date_str != null) {
        return new Date(date_str.substr(0,10))
    }
    else {
        return new Date("1900-01-01");
    }
}


/******************************N2DebCard***************************************/

data['DATA_DEBCARD'] = new Array();

if (data["N2_DebCard"] != null) {

    for (var i = 0; i < data['N2_DebCard'].length; i++) {
        var to_Curr;
        if (data["N2_DebCard"][i]['to_Curr'] != null) {
            to_Curr = data["N2_DebCard"][i]['to_Curr'];
        } else {
            to_Curr=1;
        }
        data['DATA_DEBCARD'][i] = {};
        data['DATA_DEBCARD'][i]['BANK'] = data["N2_DebCard"][i]['bank'].trim();
        data['DATA_DEBCARD'][i]['PAN'] = String(data["N2_DebCard"][i]['num_Card']).trim();
        data['DATA_DEBCARD'][i]['CCY'] = data["N2_DebCard"][i]['currency'].trim();
        data['DATA_DEBCARD'][i]['TYPE_CARD'] = data["N2_DebCard"][i]['type_Card'].trim();
        data['DATA_DEBCARD'][i]['OKPO_ZP'] = data["N2_DebCard"][i]['okpo_Zp'].trim();
        data['DATA_DEBCARD'][i]['DATE_START'] = safedate(data["N2_DebCard"][i]['date_Open']);
        data['DATA_DEBCARD'][i]['ACTIVE'] = data["N2_DebCard"][i]['active'].trim();
        data['DATA_DEBCARD'][i]['Z01'] = data["N2_DebCard"][i]['z01'] * to_Curr;
        data['DATA_DEBCARD'][i]['Z02'] = data["N2_DebCard"][i]['z02'] * to_Curr;
        data['DATA_DEBCARD'][i]['Z03'] = data["N2_DebCard"][i]['z03'] * to_Curr;
        data['DATA_DEBCARD'][i]['Z04'] = data["N2_DebCard"][i]['z04'] * to_Curr;
        data['DATA_DEBCARD'][i]['C01'] = data["N2_DebCard"][i]['c01'] * to_Curr;
        data['DATA_DEBCARD'][i]['C02'] = data["N2_DebCard"][i]['c02'] * to_Curr;
        data['DATA_DEBCARD'][i]['C03'] = data["N2_DebCard"][i]['c03'] * to_Curr;
        data['DATA_DEBCARD'][i]['C04'] = data["N2_DebCard"][i]['c04'] * to_Curr;

        data['DATA_DEBCARD'][i]['BAL'] = data["N2_DebCard"][i]['bal'] * to_Curr;
        data['DATA_DEBCARD'][i]['DATE_FINISH'] = data["N2_DebCard"][i]['date_Finish'];

        data['DATA_DEBCARD'][i]['TO_CURR'] = to_Curr;

    }

}

/****************************N2Deposit***************************************/

data['DATA_DEPOSIT'] = new Array();

if (data["N2_Deposit"] != null) {

    for (var i = 0; i < data["N2_Deposit"].length; i++) {
        var to_Curr;
        if (data["N2_Deposit"][i]['to_Curr'] != null) {
            to_Curr = data["N2_Deposit"][i]['to_Curr'];
        } else {
            to_Curr=1;
        }
        data['DATA_DEPOSIT'][i] = {};
        data['DATA_DEPOSIT'][i]['REFERENC'] = data["N2_Deposit"][i]['dep_Contr'].trim();
        data['DATA_DEPOSIT'][i]['NUM'] = data["N2_Deposit"][i]['dep_Numb'].trim();
        data['DATA_DEPOSIT'][i]['BAL'] = data["N2_Deposit"][i]['summ'] * to_Curr;
        data['DATA_DEPOSIT'][i]['CCY'] = data["N2_Deposit"][i]['currency'].trim();
        data['DATA_DEPOSIT'][i]['DATE_START'] = safedate(data["N2_Deposit"][i]['date_Open']);
        data['DATA_DEPOSIT'][i]['MONTH'] = data["N2_Deposit"][i]['termMonth'];
        data['DATA_DEPOSIT'][i]['TYPE'] = data["N2_Deposit"][i]['contractType'];
        data['DATA_DEPOSIT'][i]['BANK'] = data["N2_Deposit"][i]['bank'];
        data['DATA_DEPOSIT'][i]['STARTSUM'] = data["N2_Deposit"][i]['start_Summ'] * to_Curr;

        data['DATA_DEPOSIT'][i]['TO_CURR'] = to_Curr;
    }

}



/*****************************TAccIncome*************************************/
if (data["tAccIncome"] != null) {
    var to_Curr;
    if (data["tAccIncome"]['to_Curr'] != null) {
        to_Curr = data["tAccIncome"]['to_Curr'];
    } else {
        to_Curr=1;
    }
    data['DATA_OB_ALL'] = data["tAccIncome"]['obAll'] * to_Curr;
    data['DATA_OB_BALL_ITOG'] = data["tAccIncome"]['ballItog'];
    data['DATA_OB_CNTCONTR']= data["tAccIncome"]['cntContr'];
}



delete data.N2_DebCard;
delete data.N2_Deposit;
delete data.tAccIncome;