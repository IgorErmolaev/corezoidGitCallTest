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


data.cred_branch_list = new Array();
var product = new Array('UNI','UNI_M','RS_N','RS_V','SOB','CASH','METR','GOLD','FACH');
var active = new Array('O','A','R','D','L');

if ( data["N2_Credit"] != null) {
    var len = data.DATA_CRED.length;
    for (var i = 0; i < data["N2_Credit"].length; i++) {
        if (data["N2_Credit"][i]['credit_Num'] != '') {

            data['DATA_CRED'][len] = {};
            var to_Curr;
            if (data["N2_Credit"][i]['to_Curr'] != null) {
                to_Curr = data["N2_Credit"][i]['to_Curr'];
            } else {
                to_Curr=1;
            }
            data['DATA_CRED'][len]['REFERENC'] = data["N2_Credit"][i]['credit_Num'].trim();

            data['DATA_CRED'][len]['BAL'] = data["N2_Credit"][i]['bal_Kred'] * to_Curr;
            data['DATA_CRED'][len]['LIMIT'] = data["N2_Credit"][i]['limit_Balance'] * to_Curr;
            data['DATA_CRED'][len]['PRODUCT'] = data["N2_Credit"][i]['product'].trim();
            data['DATA_CRED'][len]['TYPE'] = data["N2_Credit"][i]['contractype'].trim();
            data['DATA_CRED'][len]['STATE'] = data["N2_Credit"][i]['contrstate'].trim();
            data['DATA_CRED'][len]['1_30_DAYS_CRED'] = data["N2_Credit"][i]['b1_30_Days_Cred'];
            data['DATA_CRED'][len]['1_30_DAYS_PRC'] = data["N2_Credit"][i]['b1_30_Days_Prc'];
            data['DATA_CRED'][len]['30_60_DAYS_CRED'] = data["N2_Credit"][i]['b30_60_Days_Cred'];
            data['DATA_CRED'][len]['30_60_DAYS_PRC'] = data["N2_Credit"][i]['b30_60_Days_Prc'];
            data['DATA_CRED'][len]['60_90_DAYS_CRED'] = data["N2_Credit"][i]['b60_90_Days_Cred'];
            data['DATA_CRED'][len]['60_90_DAYS_PRC'] = data["N2_Credit"][i]['b60_90_Days_Prc'];
            data['DATA_CRED'][len]['90_DAYS_CRED'] = data["N2_Credit"][i]['b90_Days_Cred'];
            data['DATA_CRED'][len]['90_DAYS_PRC'] = data["N2_Credit"][i]['b90_Days_Prc'];
            data['DATA_CRED'][len]['ADDSTATE_P48'] = data["N2_Credit"][i]['addstate_P48'].trim();
            data['DATA_CRED'][len]['BAL_CRED'] = data["N2_Credit"][i]['bal_Kred'] * to_Curr;
            data['DATA_CRED'][len]['BAL_PRC'] = data["N2_Credit"][i]['bal_Prc'] * to_Curr;
            data['DATA_CRED'][len]['CCY'] = data["N2_Credit"][i]['currency'].trim();
            data['DATA_CRED'][len]['CR_PAY'] = data["N2_Credit"][i]['cr_Pay'] * to_Curr;
            data['DATA_CRED'][len]['DAYS_CRED'] = data["N2_Credit"][i]['days_Cred'];
            data['DATA_CRED'][len]['DAYS_PRC'] = data["N2_Credit"][i]['days_Prc'];
            data['DATA_CRED'][len]['KOD'] = data["N2_Credit"][i]['basis_Kod'].trim();
            data['DATA_CRED'][len]['LIMIT_PREVIOUS'] = data["N2_Credit"][i]['limit_Old'] * to_Curr;
            data['DATA_CRED'][len]['LOCK_CARD'] = data["N2_Credit"][i]['lock_card'];
            data['DATA_CRED'][len]['MAX_DAYS_CRED'] = data["N2_Credit"][i]['max_Days_Cred'] * to_Curr;
            data['DATA_CRED'][len]['MAX_DAYS_PRC'] = data["N2_Credit"][i]['max_Days_Prc'] * to_Curr;
            data['DATA_CRED'][len]['MAX_PRS_CRED'] = Math.abs(data["N2_Credit"][i]['max_Prs_Cred'] * to_Curr);
            data['DATA_CRED'][len]['MAX_PRS_PRC'] = Math.abs(data["N2_Credit"][i]['max_Prs_Pr'] * to_Curr);
            data['DATA_CRED'][len]['PLAT_MIN'] = data["N2_Credit"][i]['plat_Min'] * to_Curr;
            data['DATA_CRED'][len]['PROS_CRED'] = data["N2_Credit"][i]['pros_Cred'] * to_Curr;
            data['DATA_CRED'][len]['PROS_PRC'] = data["N2_Credit"][i]['pros_Prc'] * to_Curr;
            data['DATA_CRED'][len]['START_SUMM'] = data["N2_Credit"][i]['start_Summ'] * to_Curr;
            data['DATA_CRED'][len]['TR_PAY'] = data["N2_Credit"][i]['tr_Pay'];
            data['DATA_CRED'][len]['DLP'] = data["N2_Credit"][i]['dlp'].trim();
            data['DATA_CRED'][len]['RASTR'] = data["N2_Credit"][i]['rastr_State'].trim();
            data['DATA_CRED'][len]['BRANCH'] = data["N2_Credit"][i]['branch'].trim();
            if (data.cred_branch_list.indexOf(data['DATA_CRED'][len]['BRANCH']) > -1) data.cred_branch_list.push(data['DATA_CRED'][len]['BRANCH']);

            if (data["N2_Credit"][i]['bank'] == undefined) {
                data['DATA_CRED'][len]['BANK'] = "PB";
            } else {
                data['DATA_CRED'][len]['BANK'] = data["N2_Credit"][i]['bank'].trim();
            }
            data['DATA_CRED'][len]['DATE_FIRSTPAY'] = safedate(data["N2_Credit"][i]['date_Act']);
            data['DATA_CRED'][len]['DATE_GIVEN'] = safedate(data["N2_Credit"][i]['date_Given']);
            data['DATA_CRED'][len]['DATE_START'] = safedate(data["N2_Credit"][i]['date_Start']);
            data['DATA_CRED'][len]['DATECLOS_C'] = safedate(data["N2_Credit"][i]['dateclos_C']);
            data['DATA_CRED'][len]['DATECLOS_F'] = safedate(data["N2_Credit"][i]['dateclos_F']);

            data['DATA_CRED'][len]['SPIS'] = data["N2_Credit"][i]['spis'];

            data['DATA_CRED'][len]['GR_NAME'] = N2CR_GROUPS[data['DATA_CRED'][len]['PRODUCT']];

            if (active.indexOf(data['DATA_CRED'][len]['STATE']) != -1){
                data['RES_CRED_ACTIVE'] = 'Y';
            }

            data['DATA_CRED'][len]['TO_CURR'] = to_Curr;

            len++;

        }
    }

    //delete data["N2_Credit"];
}



/******************************N2DebCard***************************************/

if (data["N2_DebCard"] != null) {

    var debPan = [];
    for (var i=0; i<data.DATA_DEBCARD.length;i++){
        debPan.push(data.DATA_DEBCARD[i].PAN);
    }

    var lenDeb = data.DATA_DEBCARD.length;

    for (var i = 0; i < data['N2_DebCard'].length; i++) {
        if (debPan.indexOf(String(data["N2_DebCard"][i]['num_Card']).trim()) ==-1) {
            var to_Curr;
            if (data["N2_DebCard"][i]['to_Curr'] != null) {
                to_Curr = data["N2_DebCard"][i]['to_Curr'];
            } else {
                to_Curr = 1;
            }
            data['DATA_DEBCARD'][lenDeb] = {};
            data['DATA_DEBCARD'][lenDeb]['BANK'] = data["N2_DebCard"][i]['bank'].trim();
            data['DATA_DEBCARD'][lenDeb]['PAN'] = String(data["N2_DebCard"][i]['num_Card']).trim();
            data['DATA_DEBCARD'][lenDeb]['CCY'] = data["N2_DebCard"][i]['currency'].trim();
            data['DATA_DEBCARD'][lenDeb]['TYPE_CARD'] = data["N2_DebCard"][i]['type_Card'].trim();
            data['DATA_DEBCARD'][lenDeb]['OKPO_ZP'] = data["N2_DebCard"][i]['okpo_Zp'].trim();
            data['DATA_DEBCARD'][lenDeb]['DATE_START'] = safedate(data["N2_DebCard"][i]['date_Open']);
            data['DATA_DEBCARD'][lenDeb]['ACTIVE'] = data["N2_DebCard"][i]['active'].trim();
            data['DATA_DEBCARD'][lenDeb]['Z01'] = data["N2_DebCard"][i]['z01'] * to_Curr;
            data['DATA_DEBCARD'][lenDeb]['Z02'] = data["N2_DebCard"][i]['z02'] * to_Curr;
            data['DATA_DEBCARD'][lenDeb]['Z03'] = data["N2_DebCard"][i]['z03'] * to_Curr;
            data['DATA_DEBCARD'][lenDeb]['Z04'] = data["N2_DebCard"][i]['z04'] * to_Curr;
            data['DATA_DEBCARD'][lenDeb]['C01'] = data["N2_DebCard"][i]['c01'] * to_Curr;
            data['DATA_DEBCARD'][lenDeb]['C02'] = data["N2_DebCard"][i]['c02'] * to_Curr;
            data['DATA_DEBCARD'][lenDeb]['C03'] = data["N2_DebCard"][i]['c03'] * to_Curr;
            data['DATA_DEBCARD'][lenDeb]['C04'] = data["N2_DebCard"][i]['c04'] * to_Curr;

            data['DATA_DEBCARD'][lenDeb]['BAL'] = data["N2_DebCard"][i]['bal'] * to_Curr;
            data['DATA_DEBCARD'][lenDeb]['DATE_FINISH'] = data["N2_DebCard"][i]['date_Finish'];

            data['DATA_DEBCARD'][lenDeb]['TO_CURR'] = to_Curr;
            lenDeb++;
        }

    }
    //delete data["N2_DebCard"];
}

/****************************N2Deposit***************************************/


if (data["N2_Deposit"] != null) {

    var depRef = [];
    for (var i=0; i<data.DATA_DEPOSIT.length;i++){
        depRef.push(data.DATA_DEPOSIT[i].REFERENC);
    }

    var lenDep = data.DATA_DEPOSIT.length;

    for (var i = 0; i < data["N2_Deposit"].length; i++) {
        if (depRef.indexOf(data["N2_Deposit"][i]['dep_Contr'].trim()) == -1) {
            var to_Curr;
            if (data["N2_Deposit"][i]['to_Curr'] != null) {
                to_Curr = data["N2_Deposit"][i]['to_Curr'];
            } else {
                to_Curr = 1;
            }
            data['DATA_DEPOSIT'][lenDep] = {};
            data['DATA_DEPOSIT'][lenDep]['REFERENC'] = data["N2_Deposit"][i]['dep_Contr'].trim();
            data['DATA_DEPOSIT'][lenDep]['NUM'] = data["N2_Deposit"][i]['dep_Numb'].trim();
            data['DATA_DEPOSIT'][lenDep]['BAL'] = data["N2_Deposit"][i]['summ'] * to_Curr;
            data['DATA_DEPOSIT'][lenDep]['CCY'] = data["N2_Deposit"][i]['currency'].trim();
            data['DATA_DEPOSIT'][lenDep]['DATE_START'] = safedate(data["N2_Deposit"][i]['date_Open']);
            data['DATA_DEPOSIT'][lenDep]['MONTH'] = data["N2_Deposit"][i]['termMonth'];
            data['DATA_DEPOSIT'][lenDep]['TYPE'] = data["N2_Deposit"][i]['contractType'];
            data['DATA_DEPOSIT'][lenDep]['BANK'] = data["N2_Deposit"][i]['bank'];
            data['DATA_DEPOSIT'][lenDep]['STARTSUM'] = data["N2_Deposit"][i]['start_Summ'] * to_Curr;

            data['DATA_DEPOSIT'][lenDep]['TO_CURR'] = to_Curr;
            lenDep++;
        }
    }
    //delete data["N2_Deposit"];
}




delete data.N2_DebCard;
delete data.N2_Deposit;
delete data.N2_Credit;

var props = Object.getOwnPropertyNames(data);
var resp = new Object();
for (var i=0;i<props.length; i++) {
    resp[props[i]] = data[props[i]];
}
data.resp=resp ;