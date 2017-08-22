const HDNEGATIVE = 1;
const NEGATIVE = 2;
const MEDIUM = 3;
const POSITIVE = 4;
const UNDEFINITE = 4;

var histUbki = new Array();
var histAll = new Array();
var refUBKI = new Array();
var credHD = new Array();


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

function calcCreditHistory(tDlCred, tState, tMaxDlCred, tB30, tB60, tB90, tDlDays, tplatCnt2, tDateStart, tDateClose) {//расчет КИ
    if (Math.abs(tDlCred) >= 50) {
        return 1;//'HDNEGATIVE';
    }
    else if ((tState == 'A' || tState == 'U') && Math.abs(tMaxDlCred) >= 200 && (tB60 >= 3 || tB90 >= 1)) {
        return 2;//'NEGATIVE';
    }
    else if (((tState == 'A' || tState == 'U') && Math.abs(tMaxDlCred) >= 200) && (tB30 >= 3 || (tB60 > 0 && tB60 < 3))) {
        return 3;//'MEDIUM';
    }
    else if (tDlCred == 0 && tDlDays == 0 && tB30 == 0 && tB60 == 0 && tB90 == 0 && Math.abs(tMaxDlCred) < 200 && tplatCnt2>=3 && ((tState == 'A' && tDateStart > 90) ||
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


/*---------------calc history for UBKI-----------------*/

var daysStart, daysClose, dlCred, stateC, maxDlCred, b30, b60, b90, hist, maxDlCredAllNegative, dlDays,platCnt2;
maxDlCredAllNegative = 0;
var daysRefreshHD, tmpdaysRefreshHD;
daysRefreshHD = 0;
var z = 0;
data.BCH_CRED_OWN_PROS_YBCH_MAR = 'N';

if (data.UBKI_CRED_MAR != undefined && data.UBKI_CRED_MAR.length != 0) {
    for (var i = 0; i < data.UBKI_CRED_MAR.length; i++) {
        daysStart = Datediff(data.UBKI_CRED_MAR[i].DATE_START);
        daysClose = Datediff(data.UBKI_CRED_MAR[i].DATE_CLOSE);
        dlCred = data.UBKI_CRED_MAR[i].DL_CRED;
        stateC = data.UBKI_CRED_MAR[i].STATE;
        maxDlCred = data.UBKI_CRED_MAR[i].MAX_DL_CRED;
        b30 = data.UBKI_CRED_MAR[i].B30;
        b60 = data.UBKI_CRED_MAR[i].B60;
        b90 = data.UBKI_CRED_MAR[i].B90;
        dlDays = data.UBKI_CRED_MAR[i].DL_DAYS;
        platCnt2 = data.UBKI_CRED_MAR[i].PLAT_CNT_2Y;
        /*calc cred hist (format 1-5)*/
        hist = calcCreditHistory(dlCred, stateC, maxDlCred, b30, b60, b90, dlDays,platCnt2, daysStart, daysClose);
        histUbki.push(hist);
        /*-----*/
        /*тек.просрочка по нашему кредиту?*/
        if (data.UBKI_CRED_MAR[i].DL_DAYS > 0 && data.UBKI_CRED_MAR[i].OUR_BANK == 'OWN' && ((data.UBKI_CRED_MAR[i].PLAT_CNT == 0 && dlCred > 0) || dlCred >= 50)) {
            data.BCH_CRED_OWN_PROS_YBCH_MAR = 'Y';
        }
        /*-----*/
        /*for negative amnisty*/
        if (hist == NEGATIVE) {
            maxDlCredAllNegative += maxDlCred;
        }
        /*-----*/
        /*for HDnegative amnisty*/
        tmpdaysRefreshHD = Datediff(data.UBKI_CRED_MAR[i].DATE_REFRESH);
        if (tmpdaysRefreshHD / 30 > 6 && data.UBKI_CRED_MAR[i].OUR_BANK != 'OWN' && histUbki[i] == HDNEGATIVE) {
            credHD[z] = {};
            credHD[z].date = tmpdaysRefreshHD;
            credHD[z].MaxdlCred = maxDlCred;
            credHD[z].idx = i;
            z++;
        }
        /*-----*/
        /*формировка общего массива уникальных кредитов*/
        histAll[i] = {};
        histAll[i].ref = data.UBKI_CRED_MAR[i].CREDIT_NUM;
        histAll[i].dl_cred = dlCred;
        histAll[i].limit = data.UBKI_CRED_MAR[i].LIMIT;
        histAll[i].platMin = data.UBKI_CRED_MAR[i].PLAT_MIN;
        histAll[i].curDebt = parseFloat(data.UBKI_CRED_MAR[i].CUR_DEBT);
        histAll[i].product = data.UBKI_CRED_MAR[i].PRODUCT;
        histAll[i].grName = data.UBKI_CRED_MAR[i].GR_NAME;
        histAll[i].state_C = stateC;
        histAll[i].max_dl_cred = maxDlCred;
        histAll[i].hist = histUbki[i];
        histAll[i].sourceVitr = 'UBKI';
        histAll[i].source = data.UBKI_CRED_MAR[i].OUR_BANK;
        refUBKI.push(data.UBKI_CRED_MAR[i].CREDIT_NUM);
        /*-----*/
    }
}
data.BCH_CRED_HIST_YBCH_MAR = minArray(histUbki);
/*-----------------------------------------------------*/


/*-------------------------Amnisty----------------------*/

/*amnisty UBKI NEGATIVE*/
if (data.BCH_CRED_HIST_YBCH_MAR == NEGATIVE) {
    var pros9mes1 = 'N';
    var pogash9mes2 = 'N';
    var pay9mes3 = 'N';
    var cntPay, platMin, everyMonthPay, summPogashOneCred, summPogash;
    summPogash = 0;
    summPogashOneCred = 0;
    everyMonthPay = 0;
    for (var i = 0; i < data.UBKI_CRED_MAR.length; i++) {
        platMin = 0;
        cntPay = 0;
        for (var j = 0; j < data.UBKI_CRED_MAR[i].HIST.length; j++) {
            var dateCalc = new Date(parseInt(data.UBKI_CRED_MAR[i].HIST[j].DL_YEAR), parseInt(data.UBKI_CRED_MAR[i].HIST[j].DL_MONTH) - 1, 1);
            dateCalc = Datediff(dateCalc);
            if (dateCalc < 270) { //смотрим данные за последние 9мес
                /*Не было выходов на просрочку более 7 дней за последние 9 мес по всем кредитам.*/
                if (data.UBKI_CRED_MAR[i].HIST[j].DL_DAYS > 7) {
                    pros9mes1 = 'Y';
                    break;
                }
                /*Сумма погашения* за последние 9 мес по всем кредитам более суммы максимальных размеров просрочек по всем негативным кредитам за посл 3 года.*/
                if (platMin != undefined && platMin > 0) {
                    everyMonthPay = platMin;
                }
                else {
                    everyMonthPay = Math.abs(data.UBKI_CRED_MAR[i].HIST[j].PLAT_MIN);
                }
                /*Есть кредит, по которому было не менее 6 платежей за последние 9 мес.*/
                if (data.UBKI_CRED_MAR[i].HIST[j].PAY == '1') {
                    cntPay++;
                    if (cntPay >= 6) {
                        pay9mes3 = 'Y';
                    }
                }
            }
        }
        summPogashOneCred = 1.2 * everyMonthPay * cntPay;
        summPogash += summPogashOneCred;
        if (histUbki[i] == NEGATIVE && summPogash > maxDlCredAllNegative) {
            pogash9mes2 = 'Y';
        }
    }
    if (pros9mes1 == 'Y' && pogash9mes2 == 'Y' && pay9mes3 == 'Y') {
        data.BCH_CRED_HIST_YBCH_MAR = 3;
    }
}


/*amnisty UBKI HDNEGATIVE*/
if (data.BCH_CRED_HIST_YBCH_MAR == HDNEGATIVE && credHD.length > 0) {
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
        for (var i = 0; i < data.UBKI_CRED_MAR.length; i++) {
            var platMinHD = 0;
            if (histUbki[i] == MEDIUM || histUbki[i] == POSITIVE) {
                for (var j = 0; j < data.UBKI_CRED_MAR[i].HIST.length; j++) {
                    var dateCalc = new Date(parseInt(data.UBKI_CRED_MAR[i].HIST[j].DL_YEAR), parseInt(data.UBKI_CRED_MAR[i].HIST[j].DL_MONTH) - 1, 1);
                    dateCalc = Datediff(dateCalc);
                    if (dateCalc <= credHD[z].date) {
                        if (data.UBKI_CRED_MAR[i].HIST[j].PAY == '1') {
                            cntPay++;
                            if (cntPay >= 6) {
                                payHD = 'Y';
                            }
                        }
                        if (platMinHD != undefined && platMinHD > 0) {
                            everyMonthPayHD = platMinHD;
                        }
                        else {
                            everyMonthPayHD = Math.abs(data.UBKI_CRED_MAR[i].HIST[j].PLAT_MIN);
                        }
                    }
                }
            }
            summPogashOneCredHD = 1.2 * everyMonthPayHD * cntPay;
            summPogashHD += summPogashOneCredHD;
            if (histUbki[i] == HDNEGATIVE && summPogashHD > credHD[z].MaxdlCred) {
                pogashHD = 'Y';
            }
        }
        if (payHD == 'Y' && pogashHD == 'Y') {
            histUbki[credHD[z].idx] = 3;
        }
    }
    data.BCH_CRED_HIST_YBCH_MAR = minArray(histUbki);
}

/*-----------------------------------------------------*/

/*--------------------TOTAL HIST-----------------------*/
data.BCH_CRED_HIST_TOTAL_MAR = data.BCH_CRED_HIST_YBCH_MAR;

/*-----------------------------------------------------*/

/*-----------------------------------------------------*/

data.BCH_CRED_HIST_TOTAL_MAR = pereconvHist(data.BCH_CRED_HIST_TOTAL_MAR);
data.BCH_CRED_HIST_YBCH_MAR = pereconvHist(data.BCH_CRED_HIST_YBCH_MAR);

data.nodeName = 'CalcKIMar';