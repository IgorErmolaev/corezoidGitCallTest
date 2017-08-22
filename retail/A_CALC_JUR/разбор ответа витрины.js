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

/*сохраняем старый DATA_CRED, делаем из него ключ_реф-значение*/
var datacred = new Object();
if (data.DATA_CRED != null) {
    for (var i=0; i<data.DATA_CRED.length; i++){
        var credref = data.DATA_CRED[i].REFERENC;
        if (credref != null && credref.length>0) {
            var cred = new Object();
            cred.BAL = data.DATA_CRED[i].BAL;
            cred.LIMIT = data.DATA_CRED[i].LIMIT;
            cred.PRODUCT = data.DATA_CRED[i].PRODUCT;
            cred.TYPE = data.DATA_CRED[i].TYPE;
            cred.STATE = data.DATA_CRED[i].STATE;
            datacred[credref] = cred;
        }

    }
}

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

            //заполняем данными из кошелька (если они есть)
            var credref = data['DATA_CRED'][i]['REFERENC'];
            if (datacred[credref] != undefined) {
                data['DATA_CRED'][i]['BAL'] = datacred[credref].BAL;
                data['DATA_CRED'][i]['LIMIT'] = datacred[credref].LIMIT;
                data['DATA_CRED'][i]['PRODUCT'] = datacred[credref].PRODUCT;
                data['DATA_CRED'][i]['TYPE'] = datacred[credref].TYPE;
                data['DATA_CRED'][i]['STATE'] = datacred[credref].STATE;
                delete datacred[credref];
            }

        }
    }
    //дополняем остатками от старого датакреда
    var datacredkeys = Object.keys(datacred);
    var deltaindex = data['DATA_CRED'].length;
    for (var i=0; i<datacredkeys.length; i++) {
        var realindex = i + deltaindex;
        data['DATA_CRED'][realindex] = new Object();
        data['DATA_CRED'][realindex]['REFERENC'] = datacredkeys[i];
        data['DATA_CRED'][realindex]['BAL'] = datacred[datacredkeys[i]].BAL;
        data['DATA_CRED'][realindex]['LIMIT'] = datacred[datacredkeys[i]].LIMIT;
        data['DATA_CRED'][realindex]['PRODUCT'] = datacred[datacredkeys[i]].PRODUCT;
        data['DATA_CRED'][realindex]['TYPE'] = datacred[datacredkeys[i]].TYPE;
        data['DATA_CRED'][realindex]['STATE'] = datacred[datacredkeys[i]].STATE;
        data['DATA_CRED'][realindex]['BANK'] = datacred[datacredkeys[i]].BANK;

        //значения по умолчанию
        data['DATA_CRED'][realindex]['1_30_DAYS_CRED'] = 0;
        data['DATA_CRED'][realindex]['1_30_DAYS_PRC'] = 0;
        data['DATA_CRED'][realindex]['30_60_DAYS_CRED'] = 0;
        data['DATA_CRED'][realindex]['30_60_DAYS_PRC'] = 0;
        data['DATA_CRED'][realindex]['60_90_DAYS_CRED'] = 0;
        data['DATA_CRED'][realindex]['60_90_DAYS_PRC'] = 0;
        data['DATA_CRED'][realindex]['90_DAYS_CRED'] = 0;
        data['DATA_CRED'][realindex]['90_DAYS_PRC'] = 0;
        data['DATA_CRED'][realindex]['ADDSTATE_P48'] = "";
        data['DATA_CRED'][realindex]['BAL_CRED'] = 0;
        data['DATA_CRED'][realindex]['BAL_PRC'] = 0;
        data['DATA_CRED'][realindex]['CCY'] = "UAH";
        data['DATA_CRED'][realindex]['CR_PAY'] = 0;
        data['DATA_CRED'][realindex]['DAYS_CRED'] = 0;
        data['DATA_CRED'][realindex]['DAYS_PRC'] = 0;
        data['DATA_CRED'][realindex]['KOD'] = "";
        data['DATA_CRED'][realindex]['LIMIT_PREVIOUS'] = 0;
        data['DATA_CRED'][realindex]['LOCK_CARD'] = 0;
        data['DATA_CRED'][realindex]['MAX_DAYS_CRED'] = 0;
        data['DATA_CRED'][realindex]['MAX_DAYS_PRC'] = 0;
        data['DATA_CRED'][realindex]['MAX_PRS_CRED'] = 0;
        data['DATA_CRED'][realindex]['MAX_PRS_PRC'] = 0;
        data['DATA_CRED'][realindex]['PLAT_MIN'] = 0;
        data['DATA_CRED'][realindex]['PROS_CRED'] = 0;
        data['DATA_CRED'][realindex]['PROS_PRC'] = 0;
        data['DATA_CRED'][realindex]['START_SUMM'] = 0;
        data['DATA_CRED'][realindex]['TR_PAY'] = 0;
        data['DATA_CRED'][realindex]['DLP'] = "";
        data['DATA_CRED'][realindex]['RASTR'] = "";
        data['DATA_CRED'][realindex]['BRANCH'] = "";

        data['DATA_CRED'][realindex]['DATE_FIRSTPAY'] = new Date();
        data['DATA_CRED'][realindex]['DATE_GIVEN'] = new Date();
        data['DATA_CRED'][realindex]['DATE_START'] = new Date();
        var dateplusyear = new Date();
        dateplusyear.setFullYear(dateplusyear.getFullYear()+1);
        data['DATA_CRED'][realindex]['DATECLOS_C'] = dateplusyear;
        data['DATA_CRED'][realindex]['DATECLOS_F'] = dateplusyear;

        data['DATA_CRED'][realindex]['SPIS'] = 0;
        data['DATA_CRED'][realindex]['GR_NAME'] = "N";
        data['DATA_CRED'][realindex]['TO_CURR'] = 1;
    }

}

delete data.N2_Credit;

var typeRestr = new Array('RS06','RS12','RS24','RS36','RS60','RR06', 'RR12', 'RR24', 'RR36', 'RP03', 'RP06', 'RP12', 'RL03', 'RL06', 'SB03');
var stateO= new Array('O','A','R','D','L');

data.hasRestProduct = 'N';
data.LOCAL_COUNT_ACTIVE_CREDITS = 0;
data.LOCAL_SUM_ACTIVE_CREDITS = 0;
data.RES_MAX_MID_PAY = 0;

data.LOCAL_CRED_MEDIUM_TERM = [];
data.LOCAL_CRED_MEDIUM_PAYMENT = [];

if (data.DATA_CRED != undefined){
    for (var i=0; i<data.DATA_CRED.length;i++){
        if (typeRestr.indexOf(data.DATA_CRED[i].TYPE)!= -1 && stateO.indexOf(data.DATA_CRED[i].STATE) != -1){
            data.hasRestProduct = 'Y';
        }
        if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1) {
            if (['GIL','CASH','PERS','FACH'].indexOf(data.DATA_CRED[i].PRODUCT)!=-1 || (data.DATA_CRED[i].PRODUCT == 'AVTO' && data.DATA_CRED[i].BRANCH != 'AB1A')){
                if (Math.abs(data.DATA_CRED[i].START_SUMM) != 0){
                    if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100>20) {
                        data.LOCAL_COUNT_ACTIVE_CREDITS ++;
                    }
                }
            }
            else {
                if (data.DATA_CRED[i].PRODUCT == 'RAS'){
                    if (Math.abs(data.DATA_CRED[i].START_SUMM) != 0) {
                        if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100>20) {
                            data.LOCAL_SUM_ACTIVE_CREDITS += data.DATA_CRED[i].START_SUMM;
                        }
                    }
                }
            }
        }

        if (data.APP_CUST_ID_JUR == data.linkID){

            var one_mnth = 1000 * 60 * 60 * 24 * 30.5;

            data.LOCAL_CRED_MEDIUM_TERM.push(0);
            data.LOCAL_CRED_MEDIUM_PAYMENT.push(0);

            if (data.DATA_CRED[i].DLP != undefined) {
                if (stateC.indexOf(data.DATA_CRED[i].STATE)!=-1 && Datediff(data.DATA_CRED[i].DATE_START)<=24 && data.DATA_CRED[i].START_SUMM>=3500) {
                    data.LOCAL_CRED_MEDIUM_TERM[i] = (Math.round(Math.abs(data.DATA_CRED[i].DATECLOS_C - data.DATA_CRED[i].DATE_START)/one_mnth));
                    if (data.LOCAL_CRED_MEDIUM_TERM[i]>9) {
                        data.LOCAL_CRED_MEDIUM_PAYMENT[i] = data.DATA_CRED[i].START_SUMM/data.LOCAL_CRED_MEDIUM_TERM[i];
                    }
                    else {
                        data.LOCAL_CRED_MEDIUM_PAYMENT[i] = 0;
                    }
                }
            }
            else {
                if (data.DATA_CRED[i].STATE != undefined) {
                    if (data.DATA_CRED[i].TR_PAY>9 && data.DATA_CRED[i].CR_PAY>3500) {
                        data.LOCAL_CRED_MEDIUM_TERM[i] = data.DATA_CRED[i].TR_PAY;
                        data.LOCAL_CRED_MEDIUM_PAYMENT[i] = data.DATA_CRED[i].CR_PAY/data.DATA_CRED[i].TR_PAY;
                    }
                }
            }
        }

    }
}
if (data.LOCAL_SUM_ACTIVE_CREDITS>20000) {
    data.LOCAL_COUNT_ACTIVE_CREDITS += 1;
}

if (data.LOCAL_CRED_MEDIUM_PAYMENT != undefined){
    data.RES_MAX_MID_PAY = Math.max.apply(Math,data.LOCAL_CRED_MEDIUM_PAYMENT);
}


delete data.LOCAL_CRED_MEDIUM_TERM;
delete data.LOCAL_CRED_MEDIUM_PAYMENT;
delete  data.RES_MAX_MID_PAY;