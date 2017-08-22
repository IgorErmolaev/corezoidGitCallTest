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

const N2CR_GROUPS = {"BAD":"N","BLAN":"N","CASH":"N","CASS":"N","CEB":"N","GOLD":"C","DEB":"N","DEPO":"N","EKOM":"N","GD_M":"N","GIL":"M","GD_L":"C","JUNI":"N","KB":"N","KORP":"N","KRED":"N","LICH":"N","LIQP":"N","LOMB":"N","METR":"C","MICR":"N","OVER":"N","PAYP":"N","DNH4":"N","RAS":"P","PENS":"N","PERS":"P","REST":"N","RS_N":"P","RS_V":"P","SEA":"N","SHTN":"N","SHTR":"N","SMS":"N","SOB":"C","OBUC":"N","TEK":"N","UNI":"C","UN_M":"C","VIP":"C","ZP":"N","ZP_R":"N"};

/*****************************N2_CREDIT*****************************/

data['DATA_CRED'] = new Array();
data.cred_branch_list = new Array();
var product = new Array('UNI','UNI_M','RS_N','RS_V','SOB','CASH','METR','GOLD','FACH');
var active = new Array('O','A','R','D','L');

data['RES_CRED_ACTIVE'] = 'N';

if ( data["N2_Credit"] != null) {

    for (var i = 0; i < data["N2_Credit"].length; i++) {
        if (data["N2_Credit"][i]['credit_Num'] != '') {
            data['DATA_CRED'][i] = {};
            var to_Curr;
            if (data["N2_Credit"][i]['to_Curr'] != null) {
                to_Curr = data["N2_Credit"][i]['to_Curr'];
            } else {
                to_Curr=1;
            }
            data['DATA_CRED'][i]['REFERENC'] = data["N2_Credit"][i]['credit_Num'].trim();

            data['DATA_CRED'][i]['BAL'] = data["N2_Credit"][i]['bal_Kred'] * to_Curr;
            data['DATA_CRED'][i]['LIMIT'] = data["N2_Credit"][i]['limit_Balance'] * to_Curr;
            data['DATA_CRED'][i]['PRODUCT'] = data["N2_Credit"][i]['product'].trim();
            data['DATA_CRED'][i]['TYPE'] = data["N2_Credit"][i]['contractype'].trim();
            data['DATA_CRED'][i]['STATE'] = data["N2_Credit"][i]['contrstate'].trim();
            data['DATA_CRED'][i]['1_30_DAYS_CRED'] = data["N2_Credit"][i]['b1_30_Days_Cred'];
            data['DATA_CRED'][i]['1_30_DAYS_PRC'] = data["N2_Credit"][i]['b1_30_Days_Prc'];
            data['DATA_CRED'][i]['30_60_DAYS_CRED'] = data["N2_Credit"][i]['b30_60_Days_Cred'];
            data['DATA_CRED'][i]['30_60_DAYS_PRC'] = data["N2_Credit"][i]['b30_60_Days_Prc'];
            data['DATA_CRED'][i]['60_90_DAYS_CRED'] = data["N2_Credit"][i]['b60_90_Days_Cred'];
            data['DATA_CRED'][i]['60_90_DAYS_PRC'] = data["N2_Credit"][i]['b60_90_Days_Prc'];
            data['DATA_CRED'][i]['90_DAYS_CRED'] = data["N2_Credit"][i]['b90_Days_Cred'];
            data['DATA_CRED'][i]['90_DAYS_PRC'] = data["N2_Credit"][i]['b90_Days_Prc'];
            data['DATA_CRED'][i]['ADDSTATE_P48'] = data["N2_Credit"][i]['addstate_P48'].trim();
            data['DATA_CRED'][i]['BAL_CRED'] = data["N2_Credit"][i]['bal_Kred'] * to_Curr;
            data['DATA_CRED'][i]['BAL_PRC'] = data["N2_Credit"][i]['bal_Prc'] * to_Curr;
            data['DATA_CRED'][i]['CCY'] = data["N2_Credit"][i]['currency'].trim();
            data['DATA_CRED'][i]['CR_PAY'] = data["N2_Credit"][i]['cr_Pay'] * to_Curr;
            data['DATA_CRED'][i]['DAYS_CRED'] = data["N2_Credit"][i]['days_Cred'];
            data['DATA_CRED'][i]['DAYS_PRC'] = data["N2_Credit"][i]['days_Prc'];
            data['DATA_CRED'][i]['KOD'] = data["N2_Credit"][i]['basis_Kod'].trim();
            data['DATA_CRED'][i]['LIMIT_PREVIOUS'] = data["N2_Credit"][i]['limit_Old'] * to_Curr;
            data['DATA_CRED'][i]['LOCK_CARD'] = data["N2_Credit"][i]['lock_card'];
            data['DATA_CRED'][i]['MAX_DAYS_CRED'] = data["N2_Credit"][i]['max_Days_Cred'] * to_Curr;
            data['DATA_CRED'][i]['MAX_DAYS_PRC'] = data["N2_Credit"][i]['max_Days_Prc'] * to_Curr;
            data['DATA_CRED'][i]['MAX_PRS_CRED'] = Math.abs(data["N2_Credit"][i]['max_Prs_Cred'] * to_Curr);
            data['DATA_CRED'][i]['MAX_PRS_PRC'] = Math.abs(data["N2_Credit"][i]['max_Prs_Pr'] * to_Curr);
            data['DATA_CRED'][i]['PLAT_MIN'] = data["N2_Credit"][i]['plat_Min'] * to_Curr;
            data['DATA_CRED'][i]['PROS_CRED'] = data["N2_Credit"][i]['pros_Cred'] * to_Curr;
            data['DATA_CRED'][i]['PROS_PRC'] = data["N2_Credit"][i]['pros_Prc'] * to_Curr;
            data['DATA_CRED'][i]['START_SUMM'] = data["N2_Credit"][i]['start_Summ'] * to_Curr;
            data['DATA_CRED'][i]['TR_PAY'] = data["N2_Credit"][i]['tr_Pay'];
            data['DATA_CRED'][i]['DLP'] = data["N2_Credit"][i]['dlp'].trim();
            data['DATA_CRED'][i]['RASTR'] = data["N2_Credit"][i]['rastr_State'].trim();
            data['DATA_CRED'][i]['BRANCH'] = data["N2_Credit"][i]['branch'].trim();
            if (data.cred_branch_list.indexOf(data['DATA_CRED'][i]['BRANCH']) > -1) data.cred_branch_list.push(data['DATA_CRED'][i]['BRANCH']);

            if (data["N2_Credit"][i]['bank'] == undefined) {
                data['DATA_CRED'][i]['BANK'] = "PB";
            } else {
                data['DATA_CRED'][i]['BANK'] = data["N2_Credit"][i]['bank'].trim();
            }
            data['DATA_CRED'][i]['DATE_FIRSTPAY'] = safedate(data["N2_Credit"][i]['date_Act']);
            data['DATA_CRED'][i]['DATE_GIVEN'] = safedate(data["N2_Credit"][i]['date_Given']);
            data['DATA_CRED'][i]['DATE_START'] = safedate(data["N2_Credit"][i]['date_Start']);
            data['DATA_CRED'][i]['DATECLOS_C'] = safedate(data["N2_Credit"][i]['dateclos_C']);
            data['DATA_CRED'][i]['DATECLOS_F'] = safedate(data["N2_Credit"][i]['dateclos_F']);

            data['DATA_CRED'][i]['SPIS'] = data["N2_Credit"][i]['spis'];

            data['DATA_CRED'][i]['GR_NAME'] = N2CR_GROUPS[data['DATA_CRED'][i]['PRODUCT']];

            if (active.indexOf(data['DATA_CRED'][i]['STATE']) != -1){
                data['RES_CRED_ACTIVE'] = 'Y';
            }

            data['DATA_CRED'][i]['TO_CURR'] = to_Curr;
        }
    }
} 