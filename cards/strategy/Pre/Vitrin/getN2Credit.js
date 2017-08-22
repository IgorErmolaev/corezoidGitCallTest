function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

data['DATA_CRED'] = new Array();
data['LOCAL_CRED_HIST_DATA_IDX'] = new Array();
var product = new Array('UNI','UNI_M','RS_N','RS_V','SOB','CASH','METR','GOLD','FACH');
var active = new Array('O','A','R','D','L');

data['RES_CRED_ACTIVE'] = 'N';

if (data["N2_Credit"] != null) {
    localObj = data["N2_Credit"];
    var arrKey = Object.keys(localObj);

    for (var i = 0; i < arrKey.length; i++) {
        if (data["N2_Credit"][i]['credit_Num'] != '') {
            data['DATA_CRED'][i] = {};
            data['DATA_CRED'][i]['REFERENC'] = data["N2_Credit"][i]['credit_Num'];
            data['DATA_CRED'][i]['BAL'] = data["N2_Credit"][i]['bal_Kred'];
            data['DATA_CRED'][i]['LIMIT'] = data["N2_Credit"][i]['limit_Balance'];
            data['DATA_CRED'][i]['PRODUCT'] = data["N2_Credit"][i]['product'];
            data['DATA_CRED'][i]['TYPE'] = data["N2_Credit"][i]['contractype'];
            data['DATA_CRED'][i]['STATE'] = data["N2_Credit"][i]['contrstate'];
            data['DATA_CRED'][i]['1_30_DAYS_CRED'] = data["N2_Credit"][i]['b1_30_Days_Cred'];
            data['DATA_CRED'][i]['1_30_DAYS_PRC'] = data["N2_Credit"][i]['b1_30_Days_Prc'];
            data['DATA_CRED'][i]['30_60_DAYS_CRED'] = data["N2_Credit"][i]['b30_60_Days_Cred'];
            data['DATA_CRED'][i]['30_60_DAYS_PRC'] = data["N2_Credit"][i]['b30_60_Days_Prc'];
            data['DATA_CRED'][i]['60_90_DAYS_CRED'] = data["N2_Credit"][i]['b60_90_Days_Cred'];
            data['DATA_CRED'][i]['60_90_DAYS_PRC'] = data["N2_Credit"][i]['b60_90_Days_Prc'];
            data['DATA_CRED'][i]['90_DAYS_CRED'] = data["N2_Credit"][i]['b90_Days_Cred'];
            data['DATA_CRED'][i]['90_DAYS_PRC'] = data["N2_Credit"][i]['b90_Days_Prc'];
            data['DATA_CRED'][i]['ADDSTATE_P48'] = data["N2_Credit"][i]['addstate_P48'];
            data['DATA_CRED'][i]['BAL_CRED'] = data["N2_Credit"][i]['bal_Kred'];
            data['DATA_CRED'][i]['BAL_PRC'] = data["N2_Credit"][i]['bal_Prc'];
            data['DATA_CRED'][i]['CCY'] = data["N2_Credit"][i]['currency'];
            data['DATA_CRED'][i]['CR_PAY'] = data["N2_Credit"][i]['cr_Pay'];
            data['DATA_CRED'][i]['DAYS_CRED'] = data["N2_Credit"][i]['days_Cred'];
            data['DATA_CRED'][i]['DAYS_PRC'] = data["N2_Credit"][i]['days_Prc'];
            data['DATA_CRED'][i]['KOD'] = data["N2_Credit"][i]['basis_Kod'];
            data['DATA_CRED'][i]['LIMIT_PREVIOUS'] = data["N2_Credit"][i]['limit_Old'];
            data['DATA_CRED'][i]['LOCK_CARD'] = data["N2_Credit"][i]['lock_card'];
            data['DATA_CRED'][i]['MAX_DAYS_CRED'] = data["N2_Credit"][i]['max_Days_Cred'];
            data['DATA_CRED'][i]['MAX_DAYS_PRC'] = data["N2_Credit"][i]['max_Days_Prc'];
            data['DATA_CRED'][i]['MAX_PRS_CRED'] = data["N2_Credit"][i]['max_Prs_Cred'];
            data['DATA_CRED'][i]['MAX_PRS_PRC'] = data["N2_Credit"][i]['max_Prs_Pr'];
            data['DATA_CRED'][i]['PLAT_MIN'] = data["N2_Credit"][i]['plat_Min'];
            data['DATA_CRED'][i]['PROS_CRED'] = data["N2_Credit"][i]['pros_Cred'];
            data['DATA_CRED'][i]['PROS_PRC'] = data["N2_Credit"][i]['pros_Prc'];
            data['DATA_CRED'][i]['START_SUMM'] = data["N2_Credit"][i]['start_Summ'];
            data['DATA_CRED'][i]['TR_PAY'] = data["N2_Credit"][i]['tr_Pay'];
            data['DATA_CRED'][i]['DLP'] = data["N2_Credit"][i]['dlp'];
            data['DATA_CRED'][i]['RASTR'] = data["N2_Credit"][i]['rastr_State'];


            data['DATA_CRED'][i]['DATE_FIRSTPAY'] = new Date(data["N2_Credit"][i]['date_Act']['time'] - data["N2_Credit"][i]['date_Act']['timezoneOffset']*60*1000);
            data['DATA_CRED'][i]['DATE_GIVEN'] = new Date(data["N2_Credit"][i]['date_Given']['time'] - data["N2_Credit"][i]['date_Given']['timezoneOffset']*60*1000);
            data['DATA_CRED'][i]['DATE_START'] = new Date(data["N2_Credit"][i]['date_Start']['time'] - data["N2_Credit"][i]['date_Start']['timezoneOffset']*60*1000);
            data['DATA_CRED'][i]['DATECLOS_C'] = new Date(data["N2_Credit"][i]['dateclos_C']['time'] - data["N2_Credit"][i]['dateclos_C']['timezoneOffset']*60*1000);
            data['DATA_CRED'][i]['DATECLOS_F'] = new Date(data["N2_Credit"][i]['dateclos_F']['time'] - data["N2_Credit"][i]['dateclos_F']['timezoneOffset']*60*1000);


            data['LOCAL_CRED_HIST_DATA_IDX'].push('');

            if (Math.abs(data['DATA_CRED'][i]['PROS_CRED'] + data['DATA_CRED'][i]['PROS_PRC']) < 50 && Math.abs(data['DATA_CRED'][i]['DAYS_CRED']) <= 0) {
                var DATA_CRED_DATE_FIRSTPAY = Datediff(data['DATA_CRED'][i]['DATE_FIRSTPAY']);
                var DATA_CRED_DATECLOS_F = Datediff(data['DATA_CRED'][i]['DATECLOS_F']);
                if (data['DATA_CRED'][i]['STATE'] == 'O' && data['DATA_CRED'][i]['30_60_DAYS_CRED'] <= 0 && data['DATA_CRED'][i]['30_60_DAYS_PRC'] <= 0 && data['DATA_CRED'][i]['60_90_DAYS_CRED'] <= 0 &&
                    data['DATA_CRED'][i]['60_90_DAYS_PRC'] <= 0 && data['DATA_CRED'][i]['90_DAYS_CRED'] <= 0 && data['DATA_CRED'][i]['90_DAYS_PRC'] <= 0 &&
                    DATA_CRED_DATE_FIRSTPAY / 30 >= 6) { /*не ставила проверку на значение по умолчанию на дату*/
                    if (product.indexOf(data['DATA_CRED'][i]['PRODUCT']) != -1) {
                        if (data['DATA_CRED'][i]['BAL'] <= (data['DATA_CRED'][i]['LIMIT'] * 0.8)) {
                            data['LOCAL_CRED_HIST_DATA_IDX'][i] = 'P';
                        }

                    }
                    else {
                        if (data['DATA_CRED'][i]['PRODUCT'] != '' && Math.abs(data['DATA_CRED'][i]['PLAT_MIN']) * 3 <= Math.abs(data['DATA_CRED'][i]['START_SUMM']) - Math.abs(data['DATA_CRED'][i]['BAL'])) {
                            data['LOCAL_CRED_HIST_DATA_IDX'][i] = 'P';
                        }
                    }

                }
                if ((data['DATA_CRED'][i]['STATE'] == 'C' || data['DATA_CRED'][i]['STATE'] == 'K') && data['DATA_CRED'][i]['30_60_DAYS_CRED'] <= 0 && data['DATA_CRED'][i]['30_60_DAYS_PRC'] <= 0 &&
                    data['DATA_CRED'][i]['60_90_DAYS_CRED'] <= 0 && data['DATA_CRED'][i]['60_90_DAYS_PRC'] <= 0 && data['DATA_CRED'][i]['90_DAYS_CRED'] <= 0 && data['DATA_CRED'][i]['90_DAYS_PRC'] <= 0 &&
                    DATA_CRED_DATECLOS_F / 30 < 24 && data['DATA_CRED'][i]['TR_PAY'] > 3) { /*не ставила проверку на значение по умолчанию на дату*/
                    data['LOCAL_CRED_HIST_DATA_IDX'][i] = 'P';
                }

            }
            if (active.indexOf(data['DATA_CRED'][i]['STATE']) != -1){
                data['RES_CRED_ACTIVE'] = 'Y';
            }

        }
    }
    delete data["N2_Credit"];
}