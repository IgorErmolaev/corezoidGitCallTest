var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\..\\resource\\collider_resp_example.json').toString();
var data = JSON.parse(json).data;
//console.log(json);
data.PROD_EMPL_LDAP_EXECUTIVE = "DN";
data.PROD_CHAR_BANK = "PB";
data.DATA_CRED = new Array();
data.DATA_CRED[0] = new Object();
data.DATA_CRED[0].BAL=0.63;
data.DATA_CRED[0].LIMIT=0;
data.DATA_CRED[0].PRODUCT="UN_M";
data.DATA_CRED[0].REFERENC="SAMDN50000062139257";
data.DATA_CRED[0].TYPE="CRPL";
data.DATA_CRED[0].STATE="O";
data.DATA_CRED[1] = new Object();
data.DATA_CRED[1].BAL=0.1;
data.DATA_CRED[1].LIMIT=1000;
data.DATA_CRED[1].PRODUCT="UN_M";
data.DATA_CRED[1].REFERENC="SAMUNIPB07000000335";
data.DATA_CRED[1].TYPE="CRPL";
data.DATA_CRED[1].STATE="O";


/****************START*******************/
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
    //delete data["N2_Credit"];
}

/*********************************N2ClientInfo***********************************/
data['PROD_APP_EMPLOYEE'] = 'N';
data['RES_CUST_IS_VIP'] = 'N';
data['RES_CUST_IS_JUNIOR'] = 'N';
data['RES_CUST_IS_EXJUNIOR'] = 'N';
if (data.DATA_OPER_IS_VIP_MANAGER == null) {
    data.DATA_OPER_IS_VIP_MANAGER="N";
}


if (data['N2_ClientInfo'] != null) {
    if (data['N2_ClientInfo']['isagent'] == 'Y') {
        data['PROD_APP_EMPLOYEE'] = 'Y';
    }
    if (data['N2_ClientInfo']['vip'] == 'Y') {
        data['RES_CUST_IS_VIP'] = 'Y';
    } else data['RES_CUST_IS_VIP'] = 'N';
    if (data['N2_ClientInfo']['junior'] == 'Y') {
        data['RES_CUST_IS_JUNIOR'] = 'Y';
    } else data['RES_CUST_IS_JUNIOR'] = 'N';
    if (data['N2_ClientInfo']['ex_Junior'] == 'EX_A') {
        data['RES_CUST_IS_EXJUNIOR'] = 'Y';
    } else data['RES_CUST_IS_EXJUNIOR'] = 'N';
    if ( data['DATA_OPER_IS_VIP_MANAGER'] == null && data.PROD_EMPL_LDAP_EXECUTIVE != null && data['N2_ClientInfo']['personalManager'] != null) {
        if (data['N2_ClientInfo']['personalManager'].trim().toUpperCase() == data.PROD_EMPL_LDAP_EXECUTIVE.toUpperCase()) {
            data['DATA_OPER_IS_VIP_MANAGER'] = "Y";
        } else {
            data['DATA_OPER_IS_VIP_MANAGER'] = "N";
        }
    }
}
//delete data['N2_ClientInfo'];


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
    //delete data["N2_DebCard"];
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
    delete data["N2_Deposit"];
}

/***************************N2ExecutiveInfo**********************************/
if (data['N2_ExecutiveInfo'] != null) {
    data['DATA_EMPL_BELON_BIS_EXECUTIVE'] = data['N2_ExecutiveInfo']['belon_Bis_Executive'].trim();
    data['DATA_EMPL_POST_CODE_EXECUTIVE'] = data['N2_ExecutiveInfo']['post_Code_Executive'].trim();
}
//delete data['N2_ExecutiveInfo'];


/***************************N2SotrLinks**************************************/

const sortlinks = ["FAT","SON","MOT","DAU","GUF","WAR","GUM","WAS",
    "STF","EPS","STM","PDA","HUS","WIF","BRO","SIS",
    "GRF","DSO","GRM","DDA","UNC","EPH","AUN","ECE",
    "FAI","LNL","MOI","HEF","GHT","HEM","CLR","FAR"];
data['DATA_LINK'] = new Array();

if (data["N2_SotrLinks"] != null) {

    for (var i = 0; i < data["N2_SotrLinks"].length; i++) {
        data['DATA_LINK'][i] = {};
        data['DATA_LINK'][i]['TYPE'] = data["N2_SotrLinks"][i]['linkType'].trim();
        data['DATA_LINK'][i]['CUST_ID'] = data["N2_SotrLinks"][i]['clientIDKin'];
        data['DATA_LINK'][i]['SOTR_WORK'] = data["N2_SotrLinks"][i]['isWorking'].trim();
        data['DATA_LINK'][i]['CUST_SOTR_ID'] = data["N2_SotrLinks"][i]['clientIDSotr'];
        data['DATA_LINK'][i]['BANK'] = data["N2_SotrLinks"][i]['bank'].trim();
        if (data['DATA_LINK'][i]['SOTR_WORK'] == "Y" && sortlinks.indexOf(data['DATA_LINK'][i]['TYPE']) > -1) {
            if (data.LOCAL_LINK_SOTR_ALL == null ) {
                data.LOCAL_LINK_SOTR_ALL = String(data['DATA_LINK'][i]['CUST_ID']);
            }  else {
                data.LOCAL_LINK_SOTR_ALL = data.LOCAL_LINK_SOTR_ALL+", "+String(data['DATA_LINK'][i]['CUST_ID']);
            }
        }
    }
    //delete data["N2_SotrLinks"];
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
    //delete data["tAccIncome"];
}

/******************************DataClientAction******************************/
if (data['dataClientAction'] != null) {
    data['DATA_CLIENT_ACTION'] = data['dataClientAction'];
}
delete data['dataClientAction'];

/******************************TCatalogChangeLim******************************/
data['DATA_LIMIT_DOWN_CATALOGE_DATE'] = new Array();
data['DATA_LIMIT_DOWN_CATALOGE_REF'] = new Array();
data['DATA_LIMIT_DOWN_CATALOGE'] = new Array();
var CATALOGE_DATE;

if (data["tCatalogChangeLim"] != null) {

    for (var i = 0; i < data["tCatalogChangeLim"].length; i++) {

        CATALOGE_DATE = new Date(data["tCatalogChangeLim"][i]['datechange'].substring(0,10));
        data['DATA_LIMIT_DOWN_CATALOGE_DATE'].push(CATALOGE_DATE);
        data['DATA_LIMIT_DOWN_CATALOGE_REF'].push(data["tCatalogChangeLim"][i]['refContract'].trim());
        data['DATA_LIMIT_DOWN_CATALOGE'].push(data["tCatalogChangeLim"][i]['changeLimitType'].trim());
    }
    //delete data["tCatalogChangeLim"];
}


/******************************TCrossSelling_TRefSource_RS_MCPB******************************/
data['DATA_ATTRACT_CHANNEL'] = new Array();
data['DATA_ATTRACT_DATE'] = new Array();
data['DATA_ATTRACT_PHONE_MODEL'] = new Array();
data['DATA_ATTRACT_PHONE_OS'] = new Array();
data['DATA_ATTRACT_SHELF'] = new Array();


if (data["tRefSource_RS_MCPB"] != null){

    for (var i=0; i< data["tRefSource_RS_MCPB"].length; i++) {
        if (data["tRefSource_RS_MCPB"][i]['source'].trim()!= ''){
            data['DATA_ATTRACT_DATE'].push(new Date(data["tRefSource_RS_MCPB"][i]['dateOdb'].substring(0,10)));
            data['DATA_ATTRACT_CHANNEL'].push(data["tRefSource_RS_MCPB"][i]['source'].trim());
            data['DATA_ATTRACT_SHELF'].push('');
        }
    }
    //delete data["tRefSource_RS_MCPB"];
}

if (data["tCrossSelling"] != null) {

    for (var i = 0; i < data["tCrossSelling"].length; i++) {
        data['DATA_ATTRACT_DATE'].push(new Date(data["tCrossSelling"][i]['date_Request'].substring(0,10)));
        data['DATA_ATTRACT_SHELF'].push(data['tCrossSelling'][i]['sours_Code'].trim());
        data['DATA_ATTRACT_CHANNEL'].push('CROSS');
        if (data['tCrossSelling'][i]['phone_Model'].trim() != '') {
            data['DATA_ATTRACT_PHONE_MODEL'].push(data['tCrossSelling'][i]['phone_Model'].trim());
        }
        if (data['tCrossSelling'][i]['phone_Os'] != '') {
            data['DATA_ATTRACT_PHONE_OS'].push(data['tCrossSelling'][i]['phone_Os'].trim());
        }
        if (data['tCrossSelling'][i]['cust_Inn_Agent'] != '0') {
            data['DATA_EMPL_PROB_LDAP_MANAGER'] = data['tCrossSelling'][i]['cust_Inn_Agent'].trim();
        }
    }
    //delete data["tCrossSelling"];
}



data['RES_CHANNEL'] = '';
data['RES_CHANNEL_SHELF'] = '';
data['RES_CHANNEL_SHELF_DATE'] = '';

if (data['DATA_ATTRACT_CHANNEL'].length != 0){
    if (data['DATA_ATTRACT_CHANNEL'].indexOf('CALL') != -1){
        data['RES_CHANNEL'] = 'CALL';
        data['RES_CHANNEL_SHELF'] = data['DATA_ATTRACT_SHELF'][data['DATA_ATTRACT_CHANNEL'].indexOf('CALL')];
        data['RES_CHANNEL_SHELF_DATE'] = data['DATA_ATTRACT_DATE'][data['DATA_ATTRACT_CHANNEL'].indexOf('CALL')];
    }
    else {
        if (data['DATA_ATTRACT_CHANNEL'].indexOf('CROSS') != -1){
            data['RES_CHANNEL'] = 'CALL';
            data['RES_CHANNEL_SHELF'] = data['DATA_ATTRACT_SHELF'][data['DATA_ATTRACT_CHANNEL'].indexOf('CROSS')];
            data['RES_CHANNEL_SHELF_DATE'] = data['DATA_ATTRACT_DATE'][data['DATA_ATTRACT_CHANNEL'].indexOf('CROSS')];
        }
        else {
            if (data['DATA_ATTRACT_CHANNEL'].indexOf('CARD') != -1){
                data['RES_CHANNEL'] = 'CARD';
                data['RES_CHANNEL_SHELF'] = data['DATA_ATTRACT_SHELF'][data['DATA_ATTRACT_CHANNEL'].indexOf('CARD')];
                data['RES_CHANNEL_SHELF_DATE'] = data['DATA_ATTRACT_DATE'][data['DATA_ATTRACT_CHANNEL'].indexOf('CARD')];
            }
        }
    }
}

/******************************TDefaultDataRP******************************/
if (data['tDefaultDataRP'] != null) {
    data['DATA_DEFAULT_COUNT_D1'] = data['tDefaultDataRP']['count_D1'];
    data['DATA_DEFAULT_COUNT_D2'] = data['tDefaultDataRP']['count_D2'];
    data['DATA_DEFAULT_COUNT_D3'] = data['tDefaultDataRP']['count_D3'];

    data['DATA_DEFAULT_SHARE_D1'] = data['tDefaultDataRP']['share_D1'];
    data['DATA_DEFAULT_SHARE_D2'] = data['tDefaultDataRP']['share_D2'];
    data['DATA_DEFAULT_SHARE_D3'] = data['tDefaultDataRP']['share_D3'];
}
//delete data['tDefaultDataRP'];


/******************************TOkpoSalaryAVG******************************/
data['DATA_WORK_TOP1000_INN'] = 'N';
if (data['tOkpoSalaryAVG'] != null) {
    var okpo = data['tOkpoSalaryAVG']['okpo'].trim();
    if (okpo == data['APP_EMPL_OKPO']) {
        data['DATA_WORK_TOP1000_ZP'] = data['tOkpoSalaryAVG']['z_avg'];
    }
    if (okpo != '') {
        data['DATA_WORK_TOP1000_INN'] = 'Y';
    }
}
//delete data['tOkpoSalaryAVG'];

/******************************TProblFlBr******************************/
if (data['tProblFlBr'] != null) {
    data['DATA_BRANCH_PROB_AVG'] = data['tProblFlBr']['problbranchavg'];
    data['DATA_BRANCH_PROB_TOTAL'] = data['tProblFlBr']['problbranch'];
}
if (data['DATA_BRANCH_PROB_TOTAL'] == 3) data.RES_SCORE_REGION="BAD";
else if (data['DATA_BRANCH_PROB_TOTAL'] == 2) data.RES_SCORE_REGION="PREBAD";
else if (data['DATA_BRANCH_PROB_TOTAL'] == 1) data.RES_SCORE_REGION="OTHERS";
else data.RES_SCORE_REGION="PREBAD";
//delete data['tProblFlBr'];

/******************************TProblSotrDate******************************/
if (data['tProblSotrDate'] != null){
    data['DATA_EMPL_PROB_LDAP_EXECUTIVE'] = data['tProblSotrDate']['problExpert'];
    data['DATA_EMPL_PROB_LDAP_MANAGER'] = data['tProblSotrDate']['problManager'];
}
//delete data['tProblSotrDate'];

/******************************tRelClients******************************/
if (data['limFach24'] != null) {
    data['DATA_TRELCLIENTS_FACH_LIM24'] = data['limFach24'];
}
//delete data['limFach24'];

/******************************TTop1000Okpo******************************/
data['DATA_WORK_TOP1000'] = 'N';
if (data['tTop1000Okpo'] != null) {
    data['DATA_WORK_TOP1000_PHONE'] = data['tTop1000Okpo']['phone'].trim();
    data['DATA_WORK_TOP1000_TYPE'] = data['tTop1000Okpo']['typePR'].trim();
    data['DATA_WORK_TOP1000MAX'] = data['tTop1000Okpo']['maxlim'];
    data['DATA_WORK_TOP1000MIN'] = data['tTop1000Okpo']['minlim'];
    data['DATA_WORK_TOP1000'] = 'Y';
}
//delete data['tTop1000Okpo'];

data.PROD_CHAR_BRANCH_FIL = data.prodCharBranchFil;

/****************END*******************/
console.log(data);