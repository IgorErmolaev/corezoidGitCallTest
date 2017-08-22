// JavaScript Document
const hdnegative = 1;
const negative = 2;
const medium = 3;
const positive =4;
const undefinite =4;


var histUbki = new Array();
var histN2Cred = new Array();
var histAll = new Array();
var refUBKI = new Array();
var credHD = new Array();
data.HDNegRefsUBKI = new Array(); //массив референсов с жестко-негативной историей для передачи в Calc_Fin

var stateOpenN2Cred = new Array('L', 'Z', 'O', 'A', 'R', 'D');
var stateOpenAll = new Array('L', 'O', 'A', 'R', 'D');

var productCC = new Array('CC', 'UNI', 'UN_M', 'GOLD', 'GL_L', 'VIP');

function getBKIFactor(grName) {
    switch (grName) {
        case ('P'):
            return 0;
        case ('C'):
            return 1;
        case ('A'):
            return 0.1;
        case ('M'):
            return 0.05;
        case ('N'):
            return 0;
        default :
            return 0;
    }
}

function pereconvHist(hhist) { //расшифровка КИ
    switch (hhist) {
        case (1):
            return 'HDNEGATIVE';
        case (2):
            return 'NEGATIVE';
        case (3):
            return 'MEDIUM';
        case (4):
            return 'POSITIVE';
        case (5):
            return 'UNDEFINITE';
        default :
            return '';
    }
}

function Datediff(days_diff) { //разница дат
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

function getPlatMin(credMass, ref) { //возвращает мин платеж из массива
    for (var k = 0; k < credMass.length; k++) {
        if (credMass[k].REFERENC == ref) {
            return credMass[k].PLAT_MIN;
        }
    }
}

function calcCreditHistory(tDlCred, tState, tMaxDlCred, tB30, tB60, tB90, tDlDays, tDateStart, tDateClose) {//расчет КИ
    if (tDlCred >= 50) {
        return 1;//'HDNEGATIVE';
    }
    else if ((tState == 'A' || tState == 'U') && tMaxDlCred >= 200 && (tB60 >= 3 || tB90 >= 1)) {
        return 2;//'NEGATIVE';
    }
    else if (((tState == 'A' || tState == 'U') && tMaxDlCred >= 200) && (tB30 >= 3 || (tB60 > 0 && tB60 < 3))) {
        return 3;//'MEDIUM';
    }
    else if (tDlCred == 0 && tDlDays == 0 && tB30 == 0 && tB60 == 0 && tB90 == 0 && ((tState == 'A' && tDateStart > 90) ||
        ( tState == 'U' && tDateClose < 720))) {
        return 4;//'POSITIVE';
    }
    else {
        return 5;//'UNDEFINITE';
    }
}

function minArray(arr) { //минимальное значение из массива
    if (arr != undefined && arr.length != 0) {
        var minI = 6;
        for (var i = 0; i < arr.length; i++) {
            if (minI > arr[i]) {
                minI = arr[i];
            }
        }
        return minI;
    }
    else {
        return 0;
    }
}

//------------------------------------------------

for (var i=0; i<data.DATA_CRED.length;i++) {
    if (data.DATA_CRED[i].BAL_CRED == undefined) {data.DATA_CRED[i].BAL_CRED = 0;}
    if (data.DATA_CRED[i].BAL_PRC == undefined) {data.DATA_CRED[i].BAL_PRC = 0;}
}


/*---------------calc history for UBKI-----------------*/

var daysStart, daysClose, dlCred, stateC, maxDlCred, b30, b60, b90, hist, maxDlCredAllNegative, dlDays;
maxDlCredAllNegative = 0;
var daysRefreshHD, tmpdaysRefreshHD;
daysRefreshHD = 0;
var z = 0;
data.BCH_CRED_OWN_PROS_YBCH = 'N';

if (data.UBKI_CRED != undefined && data.UBKI_CRED.length != 0) {
    for (var i = 0; i < data.UBKI_CRED.length; i++) {
        daysStart = Datediff(data.UBKI_CRED[i].DATE_START);
        daysClose = Datediff(data.UBKI_CRED[i].DATE_CLOSE);
        dlCred = data.UBKI_CRED[i].DL_CRED;
        stateC = data.UBKI_CRED[i].STATE;
        maxDlCred = data.UBKI_CRED[i].MAX_DL_CRED;
        b30 = data.UBKI_CRED[i].B30;
        b60 = data.UBKI_CRED[i].B60;
        b90 = data.UBKI_CRED[i].B90;
        dlDays = data.UBKI_CRED[i].DL_DAYS;
        /*calc cred hist (format 1-5)*/
        hist = calcCreditHistory(dlCred, stateC, maxDlCred, b30, b60, b90, dlDays, daysStart, daysClose);
        histUbki.push(hist);
        /*-----*/
        /*тек.просрочка по нашему кредиту?*/
        if (data.UBKI_CRED[i].DL_DAYS > 0 && data.UBKI_CRED[i].OUR_BANK == 'OWN' && ((data.UBKI_CRED[i].PLAT_CNT == 0 && dlCred > 0) || dlCred >= 50)) {
            data.BCH_CRED_OWN_PROS_YBCH = 'Y';
        }
        /*-----*/
        /*for negative amnisty*/
        if (hist == negative) {
            maxDlCredAllNegative += maxDlCred;
        }
        /*-----*/
        /*for HDnegative amnisty*/
        tmpdaysRefreshHD = Datediff(data.UBKI_CRED[i].DATE_REFRESH);
        if (tmpdaysRefreshHD / 30 > 6 && data.UBKI_CRED[i].OUR_BANK != 'OWN' && histUbki[i] == hdnegative) {
            credHD[z] = {};
            credHD[z].date = tmpdaysRefreshHD;
            credHD[z].MaxdlCred = maxDlCred;
            credHD[z].idx = i;
            z++;
        }
        /*-----*/
        /*формировка общего массива уникальных кредитов*/
        histAll[i] = {};
        histAll[i].ref = data.UBKI_CRED[i].CREDIT_NUM;
        histAll[i].dl_cred = dlCred;
        histAll[i].limit = data.UBKI_CRED[i].LIMIT;
        histAll[i].platMin = data.UBKI_CRED[i].PLAT_MIN;
        histAll[i].curDebt = parseFloat(data.UBKI_CRED[i].CUR_DEBT);
        histAll[i].product = data.UBKI_CRED[i].PRODUCT;
        histAll[i].grName = data.UBKI_CRED[i].GR_NAME;
        histAll[i].state_C = stateC;
        histAll[i].max_dl_cred = maxDlCred;
        histAll[i].hist = histUbki[i];
        histAll[i].sourceVitr = 'UBKI';
        histAll[i].source = data.UBKI_CRED[i].OUR_BANK;
        refUBKI.push(data.UBKI_CRED[i].CREDIT_NUM);
        /*-----*/

        //Формируем массив референсов с жестко-негативной историей для передачи в Calc_Fin
        if (histAll[i].hist == 1 && data.UBKI_CRED[i].OUR_BANK != 'OWN'){
            data.HDNegRefsUBKI.push(histAll[i].ref);
        }

    }
        }
data.BCH_CRED_HIST_YBCH = minArray(histUbki);
/*-----------------------------------------------------*/


/*------------calc history for N2_Credit---------------*/
if (data.DATA_CRED != undefined && data.DATA_CRED.length != 0) {
    var j = 0;
    for (var i = 0; i < data.DATA_CRED.length; i++) {
        daysStart = Datediff(data.DATA_CRED[i].DATE_START);
        daysClose = Datediff(data.DATA_CRED[i].DATECLOS_F);
        dlCred = (data.DATA_CRED[i].PROS_CRED + data.DATA_CRED[i].PROS_PRC);
        stateC = data.DATA_CRED[i].STATE;
        if (stateOpenN2Cred.indexOf(stateC) != -1) {
            stateC = 'A';
        }
        else {
            stateC = 'U';
        }
        maxDlCred = Math.max(data.DATA_CRED[i].MAX_PRS_CRED, data.DATA_CRED[i].MAX_PRS_PRC);
        b30 = Math.max(data.DATA_CRED[i]['30_60_DAYS_CRED'], data.DATA_CRED[i]['30_60_DAYS_PRC']);
        b60 = Math.max(data.DATA_CRED[i]['60_90_DAYS_CRED'], data.DATA_CRED[i]['60_90_DAYS_PRC']);
        b90 = Math.max(data.DATA_CRED[i]['90_DAYS_CRED'], data.DATA_CRED[i]['90_DAYS_PRC']);
        dlDays = (data.DATA_CRED[i].DAYS_CRED + data.DATA_CRED[i].DAYS_PRC);
        /*calc cred hist (format 1-5)*/
        hist = calcCreditHistory(dlCred, stateC, maxDlCred, b30, b60, b90, dlDays, daysStart, daysClose);
        histN2Cred.push(hist);
        /*-----*/
        /*формировка общего массива уникальных кредитов */
        /*(добавляем тех, которых нет в УБКИ)*/
        if (refUBKI.indexOf(data.DATA_CRED[i].REFERENC) == -1) {
            j = histAll.length;
            histAll[j] = {};
            histAll[j].ref = data.DATA_CRED[i].REFERENC;
            histAll[j].dl_cred = dlCred;
            histAll[j].limit = data.DATA_CRED[i].LIMIT;
            histAll[j].platMin = data.DATA_CRED[i].PLAT_MIN;
            histAll[j].curDebt = (data.DATA_CRED[i].BAL_CRED + data.DATA_CRED[i].BAL_PRC);
            histAll[j].product = data.DATA_CRED[i].PRODUCT;
            histAll[j].grName = data.DATA_CRED[i].GR_NAME;
            histAll[j].state_C = stateC;
            histAll[j].max_dl_cred = maxDlCred;
            histAll[j].hist = histUbki[i];
            histAll[j].sourceVitr = 'N2_Credit';
            histAll[j].source = 'OWN';
        }
        /*-----*/
    }
}
data.BCH_CRED_HIST_DATA = minArray(histN2Cred);
/*-----------------------------------------------------*/

/*-------------------------Amnisty----------------------*/

/*amnisty UBKI NEGATIVE*/
if (data.BCH_CRED_HIST_YBCH == negative) {
    var pros9mes1 = 'N';
    var pogash9mes2 = 'N';
    var pay9mes3 = 'N';
    var cntPay, platMin, everyMonthPay, summPogashOneCred, summPogash;
    summPogash = 0;
    summPogashOneCred = 0;
    everyMonthPay = 0;
    for (var i = 0; i < data.UBKI_CRED.length; i++) {
        platMin = getPlatMin(data.DATA_CRED, data.UBKI_CRED[i].CREDIT_NUM);
        cntPay = 0;
        for (var j = 0; j < data.UBKI_CRED[i].HIST.length; j++) {
            var dateCalc = new Date(parseInt(data.UBKI_CRED[i].HIST[j].DL_YEAR), parseInt(data.UBKI_CRED[i].HIST[j].DL_MONTH) - 1, 1);
            dateCalc = Datediff(dateCalc);
            if (dateCalc < 270) { //смотрим данные за последние 9мес
                /*Не было выходов на просрочку более 7 дней за последние 9 мес по всем кредитам.*/
                if (data.UBKI_CRED[i].HIST[j].DL_DAYS > 7) {
                    pros9mes1 = 'Y';
                    break;
                }
                /*Сумма погашения* за последние 9 мес по всем кредитам более суммы максимальных размеров просрочек по всем негативным кредитам за посл 3 года.*/
                if (platMin != undefined && platMin > 0) {
                    everyMonthPay = platMin;
                }
                else {
                    everyMonthPay = Math.abs(data.UBKI_CRED[i].HIST[j].PLAT_MIN);
                }
                /*Есть кредит, по которому было не менее 6 платежей за последние 9 мес.*/
                if (data.UBKI_CRED[i].HIST[j].PAY == '1') {
                    cntPay++;
                    if (cntPay >= 6) {
                        pay9mes3 = 'Y';
                    }
                }
            }
        }
        summPogashOneCred = 1.2 * everyMonthPay * cntPay;
        summPogash += summPogashOneCred;
        if (histUbki[i] == negative && summPogash > maxDlCredAllNegative) {
            pogash9mes2 = 'Y';
        }
    }
    if (pros9mes1 == 'N' && pogash9mes2 == 'Y' && pay9mes3 == 'Y') {
        data.BCH_CRED_HIST_YBCH = 3;
    }
}


/*amnisty UBKI HDNEGATIVE*/
/*
if (data.BCH_CRED_HIST_YBCH == hdnegative && credHD.length > 0) {
    var payHD = 'N';
    var pogashHD = 'N';
    var cntPay = 0;
    var summPogashHD = 0;
    var everyMonthPayHD, summPogashOneCredHD;
    platMinHD = 0;
    everyMonthPayHD = 0;
    summPogashOneCredHD = 0;
    for (var z = 0; z < credHD.length; z++) {
        cntPay = 0;
        summPogashHD = 0;
        for (var i = 0; i < data.UBKI_CRED.length; i++) {
            var platMinHD = getPlatMin(data.DATA_CRED, data.UBKI_CRED[i].CREDIT_NUM);
            if (data.UBKI_CRED[i].HIST != undefined && (histUbki[i] == medium || histUbki[i] == positive)) {
                for (var j = 0; j < data.UBKI_CRED[i].HIST.length; j++) {
                    var dateCalc = new Date(parseInt(data.UBKI_CRED[i].HIST[j].DL_YEAR), parseInt(data.UBKI_CRED[i].HIST[j].DL_MONTH) - 1, 1);
                    dateCalc = Datediff(dateCalc);
                    if (dateCalc <= credHD[z].date) {
                        if (data.UBKI_CRED[i].HIST[j].PAY == '1') {
                            cntPay++;
                            if (cntPay >= 6) {
                                payHD = 'Y';
                            }
                        }
                        if (platMinHD != undefined && platMinHD > 0) {
                            everyMonthPayHD = platMinHD;
                        }
                        else {
                            everyMonthPayHD = Math.abs(data.UBKI_CRED[i].HIST[j].PLAT_MIN);
                        }
                    }
                }
            }
            summPogashOneCredHD = 1.2 * everyMonthPayHD * cntPay;
            summPogashHD += summPogashOneCredHD;
            if (histUbki[i] == hdnegative && summPogashHD > credHD[z].MaxdlCred) {
                pogashHD = 'Y';
            }
        }
        if (payHD == 'Y' && pogashHD == 'Y') {
            histUbki[credHD[z].idx] = 3;
        }
    }
    data.BCH_CRED_HIST_YBCH = minArray(histUbki);
}
*/
/*-----------------------------------------------------*/

/*--------------------TOTAL HIST-----------------------*/
data.BCH_CRED_HIST_TOTAL = data.BCH_CRED_HIST_YBCH;
if (data.BCH_CRED_HIST_DATA == hdnegative && data.BCH_CRED_HIST_YBCH != hdnegative) {
    data.BCH_CRED_HIST_TOTAL = data.BCH_CRED_HIST_DATA;
}
if (data.BCH_CRED_HIST_YBCH == hdnegative && data.BCH_CRED_HIST_DATA != hdnegative) {
    data.BCH_CRED_HIST_TOTAL = data.BCH_CRED_HIST_DATA;
}
/*-----------------------------------------------------*/

/*--------------PARAM BCH_*** and RES_***--------------*/
data.RES_CRED_TOTAL_LIMIT = 0;
data.BCH_CRED_PLAT_MIN_TOTAL = 0;
data.BCH_CRED_COUNT_ACT = 0;
data.BCH_CRED_COUNT_ACT_FOREIGN = 0;
data.BCH_CRED_COUNT_ACT_CC = 0;
data.BCH_CRED_BAL_TOTAL = 0;
data.LOCAL_CRED_COUNT_FOREIGN = 0;

for (var i = 0; i < histAll.length; i++) {
    if (stateOpenAll.indexOf(histAll[i].state_C) != -1 && data.PROD_CHAR_REFERENCE != histAll[i].ref) {
        data.RES_CRED_TOTAL_LIMIT += histAll[i].limit;
        data.BCH_CRED_PLAT_MIN_TOTAL += histAll[i].platMin;
        data.BCH_CRED_BAL_TOTAL  += histAll[i].curDebt;
        if (histAll[i].dl_cred > 0 || histAll[i].curDebt > 0 || histAll[i].platMin > 0) {
            data.BCH_CRED_COUNT_ACT++;
            if (histAll[i].source != 'OWN') {
                data.BCH_CRED_COUNT_ACT_FOREIGN++;
                if (histAll[i].limit >20000) {
                    if (histAll[i].curDebt/histAll[i].limit*100>20) {
                        data.LOCAL_CRED_COUNT_FOREIGN ++;
                    }
                }
                if (productCC.indexOf(histAll[i].product) != -1) {
                    data.BCH_CRED_COUNT_ACT_CC++;
                }
            }
        }
    }
}
/*Лимит по истории*/
var limitAction, factore;
data.BCH_CRED_LIMIT_ACTION = 0;
if (data.BCH_CRED_HIST_DATA != hdnegative && data.BCH_CRED_HIST_DATA != negative && data.BCH_CRED_HIST_YBCH != hdnegative && data.BCH_CRED_HIST_YBCH != negative && data.BCH_CRED_COUNT_ACT < 4) {
    for (var i = 0; i < histAll.length; i++) {
        factore = getBKIFactor(histAll[i].grName);
        limitAction = histAll[i].limit * factore;
        data.BCH_CRED_LIMIT_ACTION = Math.max(data.BCH_CRED_LIMIT_ACTION, limitAction);
    }
}

/*-----------------------------------------------------*/

data.BCH_CRED_HIST_TOTAL = pereconvHist(data.BCH_CRED_HIST_TOTAL);
data.BCH_CRED_HIST_DATA = pereconvHist(data.BCH_CRED_HIST_DATA);
data.BCH_CRED_HIST_YBCH = pereconvHist(data.BCH_CRED_HIST_YBCH);

//-------------CRed_Stranegy-------------------------

var neg = new Array ('HDNEGATIVE','NEGATIVE','MEDIUM');

if (neg.indexOf(data.BCH_CRED_HIST_DATA) == -1 && data.BCH_CRED_HIST_YBCH == 'POSITIVE' && (data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK =='AB')) {
    data.LOCAL_CRED_HISTORY = 'POSITIVE';
}
else {
    if (data.BCH_CRED_HIST_YBCH == 'HDNEGATIVE' || data.BCH_CRED_HIST_DATA =='HDNEGATIVE') {
        data.LOCAL_CRED_HISTORY = 'HDNEGATIVE';
    }
    else {
        if (data.BCH_CRED_HIST_YBCH == 'NEGATIVE' || data.BCH_CRED_HIST_DATA =='NEGATIVE') {
            data.LOCAL_CRED_HISTORY = 'NEGATIVE';
        }
        else {
            if (data.BCH_CRED_HIST_YBCH == 'MEDIUM' || data.BCH_CRED_HIST_DATA =='MEDIUM') {
                data.LOCAL_CRED_HISTORY = 'MEDIUM';
            }
            else {
                data.LOCAL_CRED_HISTORY = 'UNDEF';
            }
        }
    }
}

data.RES_CRED_HIST_YBCH = data.LOCAL_CRED_HISTORY;