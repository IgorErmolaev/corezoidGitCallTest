function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}


/*****************************N2_CREDIT*****************************/
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



            if (Math.abs(data['DATA_CRED'][i]['PROS_CRED'] + data['DATA_CRED'][i]['PROS_PRC']) < 50 && Math.abs(data['DATA_CRED'][i]['DAYS_CRED']) <= 0) {
                var DATA_CRED_DATE_FIRSTPAY = Datediff(data['DATA_CRED'][i]['DATE_FIRSTPAY']);
                var DATA_CRED_DATECLOS_F = Datediff(data['DATA_CRED'][i]['DATECLOS_F']);
                if (data['DATA_CRED'][i]['STATE'] == 'O' && data['DATA_CRED'][i]['30_60_DAYS_CRED'] <= 0 && data['DATA_CRED'][i]['30_60_DAYS_PRC'] <= 0 && data['DATA_CRED'][i]['60_90_DAYS_CRED'] <= 0 &&
                    data['DATA_CRED'][i]['60_90_DAYS_PRC'] <= 0 && data['DATA_CRED'][i]['90_DAYS_CRED'] <= 0 && data['DATA_CRED'][i]['90_DAYS_PRC'] <= 0 &&
                    DATA_CRED_DATE_FIRSTPAY / 30 >= 6) { /*не ставила проверку на значение по умолчанию на дату*/
                    if (product.indexOf(data['DATA_CRED'][i]['PRODUCT']) != -1) {
                        if (data['DATA_CRED'][i]['BAL'] <= (data['DATA_CRED'][i]['LIMIT'] * 0.8)) {
                            data['LOCAL_CRED_HIST_DATA_IDX'].push('P');
                        }

                    }
                    else {
                        if (data['DATA_CRED'][i]['PRODUCT'] != '' && Math.abs(data['DATA_CRED'][i]['PLAT_MIN']) * 3 <= Math.abs(data['DATA_CRED'][i]['START_SUMM']) - Math.abs(data['DATA_CRED'][i]['BAL'])) {
                            data['LOCAL_CRED_HIST_DATA_IDX'].push('P');
                        }
                    }

                }
                if ((data['DATA_CRED'][i]['STATE'] == 'C' || data['DATA_CRED'][i]['STATE'] == 'K') && data['DATA_CRED'][i]['30_60_DAYS_CRED'] <= 0 && data['DATA_CRED'][i]['30_60_DAYS_PRC'] <= 0 &&
                    data['DATA_CRED'][i]['60_90_DAYS_CRED'] <= 0 && data['DATA_CRED'][i]['60_90_DAYS_PRC'] <= 0 && data['DATA_CRED'][i]['90_DAYS_CRED'] <= 0 && data['DATA_CRED'][i]['90_DAYS_PRC'] <= 0 &&
                    DATA_CRED_DATECLOS_F / 30 < 24 && data['DATA_CRED'][i]['TR_PAY'] > 3) { /*не ставила проверку на значение по умолчанию на дату*/
                    data['LOCAL_CRED_HIST_DATA_IDX'].push('P');
                }

            }
            if (active.indexOf(data['DATA_CRED'][i]['STATE']) != -1){
                data['RES_CRED_ACTIVE'] = 'Y';
            }

        }
    }
    delete data["N2_Credit"];
}

/*********************************N2ClientInfo***********************************/
data['PROD_APP_EMPLOYEE'] = 'N';
data['RES_CUST_IS_VIP'] = 'N';
data['RES_CUST_IS_JUNIOR'] = 'N';
data['RES_CUST_IS_EXJUNIOR'] = 'N';


if (data['N2_ClientInfo'] != null) {
    if (data['N2_ClientInfo']['isagent'] == 'Y') {
        data['PROD_APP_EMPLOYEE'] = 'Y';
    }
    if (data['N2_ClientInfo']['vip'] == 'Y') {
        data['RES_CUST_IS_VIP'] = 'Y';
    }
    if (data['N2_ClientInfo']['junior'] == 'Y') {
        data['RES_CUST_IS_JUNIOR'] = 'Y';
    }
    if (data['N2_ClientInfo']['ex_Junior'] == 'EX_A') {
        data['RES_CUST_IS_EXJUNIOR'] = 'Y';
    }
    data['DATA_OPER_IS_VIP_MANAGER'] = data['N2_ClientInfo']['personalManager'];
}
delete data['N2_ClientInfo'];


/******************************N2DebCard***************************************/

data['DATA_DEBCARD'] = new Array();

if (data["N2_DebCard"] != null) {
    localObj = data["N2_DebCard"];
    var arrKey = Object.keys(localObj);

    for (var i = 0; i < arrKey.length; i++) {
        data['DATA_DEBCARD'][i] = {};
        data['DATA_DEBCARD'][i]['BANK'] = data["N2_DebCard"][i]['bank'];
        data['DATA_DEBCARD'][i]['PAN'] = data["N2_DebCard"][i]['num_Card'];
        data['DATA_DEBCARD'][i]['CCY'] = data["N2_DebCard"][i]['currency'];
        data['DATA_DEBCARD'][i]['TYPE_CARD'] = data["N2_DebCard"][i]['type_Card'];
        data['DATA_DEBCARD'][i]['OKPO_ZP'] = data["N2_DebCard"][i]['okpo_Zp'];
        data['DATA_DEBCARD'][i]['DATE_START'] = new Date(data["N2_DebCard"][i]['date_Open']['time'] - data["N2_DebCard"][i]['date_Open']['timezoneOffset']*60*1000);
        data['DATA_DEBCARD'][i]['ACTIVE'] = data["N2_DebCard"][i]['active'];
        data['DATA_DEBCARD'][i]['Z01'] = data["N2_DebCard"][i]['z01'];
        data['DATA_DEBCARD'][i]['Z02'] = data["N2_DebCard"][i]['z02'];
        data['DATA_DEBCARD'][i]['Z03'] = data["N2_DebCard"][i]['z03'];
        data['DATA_DEBCARD'][i]['Z04'] = data["N2_DebCard"][i]['z04'];
        data['DATA_DEBCARD'][i]['C01'] = data["N2_DebCard"][i]['c01'];
        data['DATA_DEBCARD'][i]['C02'] = data["N2_DebCard"][i]['c02'];
        data['DATA_DEBCARD'][i]['C03'] = data["N2_DebCard"][i]['c03'];
        data['DATA_DEBCARD'][i]['C04'] = data["N2_DebCard"][i]['c04'];
    }
    delete data["N2_DebCard"];
}

/****************************N2Deposit***************************************/

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

/***************************N2ExecutiveInfo**********************************/
if (data['N2_ExecutiveInfo'] != null) {
    data['DATA_EMPL_BELON_BIS_EXECUTIVE'] = data['N2_ExecutiveInfo']['belon_Bis_Executive'];
    data['DATA_EMPL_POST_CODE_EXECUTIVE'] = data['N2_ExecutiveInfo']['post_Code_Executive'];
}
delete data['N2_ExecutiveInfo'];


/***************************N2SotrLinks**************************************/
data['DATA_LINK'] = new Array();

if (data["N2_SotrLinks"] != null) {
    localObj = data["N2_SotrLinks"];
    var arrKey = Object.keys(localObj);

    for (var i = 0; i < arrKey.length; i++) {
        data['DATA_LINK'][i] = {};
        data['DATA_LINK'][i]['TYPE'] = data["N2_SotrLinks"][i]['linkType'];
        data['DATA_LINK'][i]['CUST_ID'] = data["N2_SotrLinks"][i]['clientIDKin'];
        data['DATA_LINK'][i]['SOTR_WORK'] = data["N2_SotrLinks"][i]['isWorking'];
        data['DATA_LINK'][i]['CUST_SOTR_ID'] = data["N2_SotrLinks"][i]['clientIDSotr'];
        data['DATA_LINK'][i]['BANK'] = data["N2_SotrLinks"][i]['bank'];
    }
    delete data["N2_SotrLinks"];
}

/*****************************TAccIncome*************************************/

if (data["tAccIncome"] != null) {
    data['DATA_OB_ALL'] = data["tAccIncome"]['obAll'];
    data['DATA_OB_BALL_ITOG'] = data["tAccIncome"]['ballItog'];
    data['DATA_OB_CNTCONTR']= data["tAccIncome"]['cntContr'];
    delete data["tAccIncome"];
}


/******************************DataClientAction******************************/
if (data['dataClientAction'] != null) {
    data['DATA_CLIENT_ACTION'] = data['dataClientAction'];
}
delete data['dataClientAction'];

/******************************TCalcLimit******************************/
if (data['tCalcLimit'] != null) {
    data['DATA_CASHPAYMENTS_LIMIT'] = data['tCalcLimit']['limit'];
    data['DATA_CASHPAYMENTS_TYPE'] = data['tCalcLimit']['rep_Type'];
}
delete data['tCalcLimit'];

/******************************TCatalogChangeLim******************************/
data['DATA_LIMIT_DOWN_CATALOGE_DATE'] = new Array();
data['DATA_LIMIT_DOWN_CATALOGE_REF'] = new Array();
data['DATA_LIMIT_DOWN_CATALOGE'] = new Array();
var CATALOGE_DATE;

if (data["tCatalogChangeLim"] != null) {
    localObj = data["tCatalogChangeLim"];
    var arrKey = Object.keys(localObj);

    for (var i = 0; i < arrKey.length; i++) {

        CATALOGE_DATE = new Date(data["tCatalogChangeLim"][i]['datechange'].substring(0,10));
        data['DATA_LIMIT_DOWN_CATALOGE_DATE'].push(CATALOGE_DATE);
        data['DATA_LIMIT_DOWN_CATALOGE_REF'].push(data["tCatalogChangeLim"][i]['refContract']);
        data['DATA_LIMIT_DOWN_CATALOGE_REF'][i] = data['DATA_LIMIT_DOWN_CATALOGE_REF'][i].trim();
        data['DATA_LIMIT_DOWN_CATALOGE'].push(data["tCatalogChangeLim"][i]['changeLimitType']);
        data['DATA_LIMIT_DOWN_CATALOGE'][i] = data['DATA_LIMIT_DOWN_CATALOGE'][i].trim();
    }
    delete data["tCatalogChangeLim"];
}


/******************************TCrossSelling_TRefSource_RS_MCPB******************************/
data['DATA_ATTRACT_CHANNEL'] = new Array();
data['DATA_ATTRACT_DATE'] = new Array();
data['DATA_ATTRACT_PHONE_MODEL'] = new Array();
data['DATA_ATTRACT_PHONE_OS'] = new Array();
data['DATA_ATTRACT_SHELF'] = new Array();


if (data["tRefSource_RS_MCPB"] != null){
    localObjS = data["tRefSource_RS_MCPB"];
    var arrKeyS = Object.keys(localObjS);

    for (var i=0; i< arrKeyS.length; i++) {
        if (data["tRefSource_RS_MCPB"][i]['source']!= ''){
            data['DATA_ATTRACT_DATE'].push(new Date(data["tRefSource_RS_MCPB"][i]['dateOdb']['time'] - data["tRefSource_RS_MCPB"][i]['dateOdb']['timezoneOffset']*60*1000));
            data['DATA_ATTRACT_CHANNEL'].push(data["tRefSource_RS_MCPB"][i]['source']);
            data['DATA_ATTRACT_SHELF'].push('');
        }
    }
    delete data["tRefSource_RS_MCPB"];
}

if (data["tCrossSelling"] != null) {
    localObj = data["tCrossSelling"];
    var arrKey = Object.keys(localObj);

    for (var i = 0; i < arrKey.length; i++) {
        data['DATA_ATTRACT_DATE'].push(new Date(data["tCrossSelling"][i]['date_Request']['time'] - data["tCrossSelling"][i]['date_Request']['timezoneOffset']*60*1000));
        data['DATA_ATTRACT_SHELF'].push(data['tCrossSelling'][i]['sours_Code']);
        data['DATA_ATTRACT_CHANNEL'].push('CROSS');
        if (data['tCrossSelling'][i]['phone_Model'] != '') {
            data['DATA_ATTRACT_PHONE_MODEL'].push(data['tCrossSelling'][i]['phone_Model']);
        }
        if (data['tCrossSelling'][i]['phone_Os'] != '') {
            data['DATA_ATTRACT_PHONE_OS'].push(data['tCrossSelling'][i]['phone_Os']);
        }
        if (data['tCrossSelling'][i]['cust_Inn_Agent'] != '0') {
            data['DATA_EMPL_PROB_LDAP_MANAGER'] = data['tCrossSelling'][i]['cust_Inn_Agent'];
        }
    }
    delete data["tCrossSelling"];
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

data['DATA_DEFAULT_COUNT_D1'] = new Array();
data['DATA_DEFAULT_COUNT_D2'] = new Array();
data['DATA_DEFAULT_COUNT_D3'] = new Array();
data['DATA_DEFAULT_SHARE_D1'] = new Array();
data['DATA_DEFAULT_SHARE_D2'] = new Array();
data['DATA_DEFAULT_SHARE_D3'] = new Array();

if (data['tDefaultDataRP'] != null) {
    data['DATA_DEFAULT_COUNT_D1'] = data['tDefaultDataRP']['count_D1'];
    data['DATA_DEFAULT_COUNT_D2'] = data['tDefaultDataRP']['count_D2'];
    data['DATA_DEFAULT_COUNT_D3'] = data['tDefaultDataRP']['count_D3'];

    data['DATA_DEFAULT_SHARE_D1'] = data['tDefaultDataRP']['share_D1'];
    data['DATA_DEFAULT_SHARE_D2'] = data['tDefaultDataRP']['share_D2'];
    data['DATA_DEFAULT_SHARE_D3'] = data['tDefaultDataRP']['share_D3'];
}
delete data['tDefaultDataRP'];


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
delete data['tOkpoSalaryAVG'];

/******************************TProblFlBr******************************/
if (data['tProblFlBr'] != null) {
    data['DATA_BRANCH_PROB_AVG'] = data['tProblFlBr']['problbranchavg'];
    data['DATA_BRANCH_PROB_TOTAL'] = data['tProblFlBr']['problbranch'];
}
delete data['tProblFlBr'];

/******************************TProblSotrDate******************************/
if (data['tProblSotrDate'] != null){
    data['DATA_EMPL_PROB_LDAP_EXECUTIVE'] = data['tProblSotrDate']['problExpert'];
    data['DATA_EMPL_PROB_LDAP_MANAGER'] = data['tProblSotrDate']['problManager'];
}
delete data['tProblSotrDate'];

/******************************tRelClients******************************/
if (data['limFach24'] != null) {
    data['DATA_TRELCLIENTS_FACH_LIM24'] = data['limFach24'];
}
delete data['limFach24'];

/******************************TTop1000Okpo******************************/

data['DATA_WORK_TOP1000'] = 'N';
if (data['tTop1000Okpo'] != null) {
    data['DATA_WORK_TOP1000_PHONE'] = data['tTop1000Okpo']['phone'];
    data['DATA_WORK_TOP1000_TYPE'] = data['tTop1000Okpo']['typePR'];
    data['DATA_WORK_TOP1000MAX'] = data['tTop1000Okpo']['maxlim'];
    data['DATA_WORK_TOP1000MIN'] = data['tTop1000Okpo']['minlim'];
    data['DATA_WORK_TOP1000'] = 'Y';
}
delete data['tTop1000Okpo'];