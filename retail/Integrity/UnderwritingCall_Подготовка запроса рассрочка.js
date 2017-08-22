var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\..\\Integrity\\under_test.json').toString();
var data = JSON.parse(json).data;

//**********************************************************************




function simplePush(objArr, name, value) {
    var obj = {};
    obj["@name"] = name;
    obj["#value"] = value;
    objArr.push(obj);
}

function arrprsPush (arrprs, name, elarray) {
    var obj = {};
    obj["@name"] = name;
    obj["el"] = elarray;
    arrprs.push(obj);
}

function elprsCreate() {
    var el = {};
    el.string = [];
    el.date = [];
    el.long = [];
    el.double = [];
    el.xml = [];
    return el;
}

function addTToDate(date) {
    return date.substr(0,10) + "T"+date.substr(11,8);
}

function getyyyymmddstr(date) {
    if ( typeof date == "object" && date instanceof Date) {
        var month = date.getMonth()+1;
        var day = date.getDate()
        var monthstr;
        var daystr;
        if (month<10) {
            monthstr = "0"+String(month);
        } else {
            monthstr = String(month);
        }
        if (day<10) {
            daystr = "0"+String(day);
        } else {
            daystr = String(day);
        }
        return String(date.getFullYear())+"-"+ monthstr + "-"+daystr;
    }
    else if (typeof date == "string"){
        return date.substr(0,10);
    }
    else return null;
}

mqdoc = {};

data.APPLIC_ID = data.ref;

mqdoc["@rtdm"] = "Y";
mqdoc["@proc_type"] = data.PROD_CHAR_TYPE;
if (data.RES_BI == "KC") {
    mqdoc["@action"] = "RMKC"
} else {
    mqdoc["@action"] = "RMKCFR"
}
mqdoc["@ref"] = data.APPLIC_ID;

mqdoc["@conv_id"] = data.conv_id;


var date = [];
var string = [];
var long = [];
var double = [];
var arrprs = [];
var xml = [];

if (data.APP_CUST_DB != undefined) {
    simplePush(date, "APP.CUST_BIRTHDAY", getyyyymmddstr(data.APP_CUST_DB) + "T00:00:00");
}




simplePush(string, "APP.CUST_GENDER", data.APP_CUST_GENDER);
simplePush(long, "APP.CUST_ID", data.APP_CUST_ID);
simplePush(string, "APP.CUST_INN", data.APP_CUST_INN);
simplePush(string, "APP.CUST_NAME", data.APP_CUST_NAME);
simplePush(string, "APP.CUST_PATRONYMIC", data.APP_CUST_PATRONYMIC);
simplePush(string, "APP.CUST_SURNAME", data.APP_CUST_SURNAME);
simplePush(string, "APP.SOCSTATUS_RESIDENT", data.APP_SOCSTATUS_RESIDENT);
simplePush(string, "APP.EMPL_OKPO", data.APP_EMPL_OKPO);
simplePush(string, "APP.CUST_ID_FOTO", data.APP_CUST_ID_FOTO);
simplePush(string, "APP.VISUAL_ESTIMATION", data.APP_VISUAL_ESTIMATION);

simplePush(string, "PROD.CHAR_BANK", data.PROD_CHAR_BANK);
simplePush(string, "PROD.CHAR_BRANCH", data.PROD_CHAR_BRANCH);
simplePush(string, "PROD.CHAR_CORPORATION", data.PROD_CHAR_CORPORATION);
simplePush(string, "PROD.CHAR_REFERENCE", data.PROD_CHAR_REFERENCE);
simplePush(string, "PROD.CHAR_TYPE", data.PROD_CHAR_TYPE);
simplePush(double, "PROD.CHAR_LOANAMOUNT", data.PROD_CHAR_LOANAMOUNT);
simplePush(double, "PROD.CHAR_PAYMONTH", data.PROD_CHAR_PAYMONTH);
simplePush(double, "PROD.SCHEME_TERM", data.PROD_SCHEME_TERM);
simplePush(string, "PROD.SCHEME_OTCNUMBER", data.PROD_SCHEME_OTCNUMBER);
simplePush(string, "PROD.CHAR_UNIT", data.PROD_CHAR_UNIT);
simplePush(string, "PROD.CHAR_POS", data.PROD_CHAR_POS);
simplePush(double, "PROD.SCHEME_VALUE_OLL", data.PROD_SCHEME_VALUE_ALL);
simplePush(double, "PROD.CHAR_ADVANCEAMOUNT", data.PROD_CHAR_ADVANCEAMOUNT);
simplePush(double, "UTIL.PAYMONTH_NO_COM", data.UTIL_PAYMONTH_NO_COM);
simplePush(string, "PROD.SCHEME_INSHURANCE_PRIVATE_EXIST", data.PROD_SCHEME_INSHURANCE_PRIVATE_EXIST);
simplePush(string, "PROD.SCHEME_LOANPURPOSE", data.PROD_SCHEME_LOANPURPOSE);
simplePush(string, "PROD.SCHEME_INVOICE_TYPE", data.PROD_SCHEME_INVOICE_TYPE);
simplePush(string, "PROD.SCHEME_INVOICE_NUMBER", data.PROD_SCHEME_INVOICE_NUMBER);
simplePush(date, "PROD.SCHEME_INVOICE_DATE", data.PROD_SCHEME_INVOICE_DATE);

simplePush(string, "PROD.EMPL_LDAP_EXECUTIVE", data.PROD_EMPL_LDAP_EXECUTIVE);
simplePush(string, "PROD.SCHEME_CCY_LOAN", data.PROD_SCHEME_CCY_LOAN);
simplePush(string, "RES.CUST_ISID", data.RES_CUST_ISID);
simplePush(string, "UTIL.VALIDATION_REF", data.UTIL_VALIDATION_REF);
simplePush(string, "APP.CUST_SPECIALPROJECT", data.APP_CUST_SPECIALPROJECT);
simplePush(string, "RES.DEC_CATEGORY", data.RES_DEC_CATEGORY);
simplePush(double, "RES.DEVIATION_FRAUD_SCOR", data.RES_DEVIATION_FRAUD_SCOR);
if (data.RES_EXP_MONTH_TOTAL != undefined) {
    simplePush(double, "RES.EXP_MONTH_TOTAL", Number(data.RES_EXP_MONTH_TOTAL).toFixed(2));
}
if (data.RES_INC_NOT_CONF != undefined) {
    simplePush(double, "RES.INC_NOT_CONF", Number(data.RES_INC_NOT_CONF).toFixed(2));
}
if (data.RES_LIMIT_PLAT != undefined) {
    simplePush(double, "RES.LIMIT_PLAT", Number(data.RES_LIMIT_PLAT).toFixed(2));
}
if (data.RES_FINAL_KRED_SUM != undefined) {
    simplePush(double, "RES.FINAL_KRED_SUM", Number(data.RES_FINAL_KRED_SUM).toFixed(2));
}
if (data.RES_CRED_LIM != undefined) {
    simplePush(double, "RES.CRED_LIM", Number(data.RES_CRED_LIM).toFixed(2));
}
if (data.LOCAL_CRED_CARD_LIM_ONLINE != undefined) {
    simplePush(double, "LOCAL.CRED_CARD_LIM_ONLINE", Number(data.LOCAL_CRED_CARD_LIM_ONLINE).toFixed(2));
}
simplePush(string, "RES.RIP_APPLICATION", data.RES_RIP_APPLICATION);
if (data.RES_INC_DISP != undefined) {
    simplePush(string, "RES.INC_DISP", Number(data.RES_INC_DISP).toFixed(2));
}
if (data.RES_SCCARD_TOTAL_SCORE != undefined) {
    simplePush(string, "RES.SCCARD_TOTAL_SCORE", Number(data.RES_SCCARD_TOTAL_SCORE).toFixed(2));
}
simplePush(string, "DATA.WORK_TOP1000", data.DATA_WORK_TOP1000);
simplePush(string, "DATA.WORK_TOP1000COM", data.DATA_WORK_TOP1000COM);
simplePush(double, "DATA.WORK_TOP1000MAX", data.DATA_WORK_TOP1000MAX);
simplePush(double, "DATA.WORK_TOP1000MIN", data.DATA_WORK_TOP1000MIN);
if (data.MARITAL_ID>0) {
    simplePush(long, "APP.MARITAL_ID", data.APP_MARITAL_ID);
    simplePush(string, "APP.MARITAL_CONSNAME", data.APP_MARITAL_SURNAME);
    simplePush(string, "APP.MARITAL_NAME", data.APP_MARITAL_NAME);
    simplePush(string, "APP.MARITAL_PATRONYMIC", data.APP_MARITAL_PATRONYMIC);
    if (data.APP_MARITAL_DB != undefined) {
        simplePush(date, "APP.MARITAL_CONSBIRTH", getyyyymmddstr(data.APP_MARITAL_DB) + "T00:00:00");
    }
    simplePush(string, "APP.MARITAL_MOBILEPHONE", data.APP_MARITAL_MOBILEPHONE);
}
simplePush(string, "APP.MARITAL_MARITALCOND", data.APP_MARITAL_MARITALCOND);
simplePush(string, "APP.MARITAL_CONSSOCSTAT", data.APP_MARITAL_CONSSOCSTAT);
if (data.APP_EMPL_TIMEEMPL_DATE != undefined) {
    simplePush(date, "APP.EMPL_TIMEEMPL_DATE", getyyyymmddstr(data.APP_EMPL_TIMEEMPL_DATE) + "T00:00:00");
}
/*изменяемые параметры в пре и фине*/
simplePush(double, "RES.LIMIT_ITOG", data.RES_LIMIT_ITOG);
simplePush(string, "RES.LIMIT_ITOG_TYPE", data.RES_LIMIT_ITOG_TYPE);
simplePush(string, "RES.COMMENT_NO_AUTO", data.RES_COMMENT_NO_AUTO);
/**/
simplePush(double, "APP.INCOME_OTHERSOURCE", data.APP_INCOME_OTHERSOURCE);
simplePush(double, "APP.INCOME_MONTHSALARY", data.APP_INCOME_MONTHSALARY);
simplePush(long, "APP.SOCSTATUS_CHILDNUMBER", data.APP_SOCSTATUS_CHILDNUMBER);
simplePush(string, "APP.EMPL_ACTIVITY", data.APP_EMPL_ACTIVITY);
simplePush(string, "APP.INCOME_MONTHSALARY_CURRENCY", data.APP_INCOME_MONTHSALARY_CURRENCY);
simplePush(string, "APP.INCOME_OTHERSOURCE_CURRENCY", data.APP_INCOME_OTHERSOURCE_CURRENCY);
simplePush(string, "APP.PROPERTY_CAR_HAS", data.APP_PROPERTY_CAR_HAS);
simplePush(string, "APP.EMPL_WORKPLACE", data.APP_EMPL_WORKPLACE);
simplePush(string, "APP.EMPL_RANK", data.APP_EMPL_RANK);
simplePush(string, "APP.EMPL_SOCIALSTATUS", data.APP_EMPL_SOCIALSTATUS);
simplePush(string, "APP.EMPL_ORGTYPE", data.APP_EMPL_ORGTYPE);
simplePush(string, "APP.ACT_ADDRESS_ESTATETYPE", data.APP_ACT_ADDRESS_ESTATETYPE);
simplePush(string, "APP.EMPL_POSITION", data.APP_EMPL_POSITION);
simplePush(string, "APP.SOCSTATUS_EDUCATION", data.APP_SOCSTATUS_EDUCATION);
simplePush(string, "APP.MARITAL_MARITALCOND", data.APP_MARITAL_MARITALCOND);

/*APP.CONTACTS*/
if (data.APP_PHONE != undefined ) {
    var elarr = [];
    for (var i = 0; i<data.APP_PHONE.length;i++) {
        var el = elprsCreate();
        simplePush(el.string, "CVALUE", data.APP_PHONE[i].NUMBER_CALL);
        simplePush(el.string, "CTYPE", data.APP_PHONE[i].TYPE_CALL);
        simplePush(el.long, "CUST_ID", data.APP_PHONE[i].CUST_ID_CALL);
        simplePush(el.date, "DATE_MOD", addTToDate(data.APP_PHONE[i].DTM));
        simplePush(el.long, "LIGHT", data.APP_PHONE[i].LIGHT);
        simplePush(el.string, "CALL_QA", data.APP_PHONE[i].CALL_QA);
        simplePush(el.string, "MAIN", data.APP_PHONE[i].MAIN);
        if (data.APP_PHONE[i].TYPE_CALL == "MOB") {
            simplePush(el.string, "CALL_NEED", data.RES_CALL_MOB_PHONE);
            simplePush(el.string, "CFIN", data.APP_PHONE[i].MAIN);
        }
        else if (data.APP_PHONE[i].TYPE_CALL == "HOME") {
            simplePush(el.string, "CALL_NEED", data.RES_CALL_HOME_PHONE);
            simplePush(el.string, "CFIN", "N");
        }
        else if (data.APP_PHONE[i].TYPE_CALL == "WORK") {
            simplePush(el.string, "CALL_NEED", data.RES_CALL_WORK_PHONE);
            simplePush(el.string, "CFIN", "N");
        }
        elarr.push(el);
    }
    arrprsPush(arrprs,"APP.CONTACTS",elarr);
}

/*PROD.SCHEME*/
if (data.PROD_SCHEME != undefined ) {
    var elarr = [];
    for (var i = 0; i<data.PROD_SCHEME.length;i++) {
        var el = elprsCreate();
        simplePush(el.string, "GOODSTYPE", data.PROD_SCHEME[i].GOODSTYPE);
        simplePush(el.string, "GOODSNAME", data.PROD_SCHEME[i].GOODSNAME);
        simplePush(el.long, "QUANTITY",  data.PROD_SCHEME[i].QUANTITY);
        simplePush(el.long, "VALUE", data.PROD_SCHEME[i].VALUE);
        elarr.push(el);
    }
    arrprsPush(arrprs,"PROD.SCHEME",elarr);
}

//адреса
if (data.APP_ACT_ADDRESS.addrxml != null) {
    xml.push(data.APP_ACT_ADDRESS.addrxml);
}
if (data.APP_REG_ADDRESS.addrxml != null) {
    xml.push(data.APP_REG_ADDRESS.addrxml);
}


if (data.DOC_IDENT != undefined ) {
    var elarr = [];
    for (var i = 0; i<data.DOC_IDENT.length;i++) {
        var el = elprsCreate();
        simplePush(el.long, "CUST_ID", data.APP_CUST_ID);
        simplePush(el.string, "MAIN", data.DOC_IDENT[i].MAIN);
        simplePush(el.string, "ACTUAL", data.DOC_IDENT[i].ACTUAL);
        simplePush(el.string, "DOC_ID", data.DOC_IDENT[i].ID);
        simplePush(el.string, "COUNTRY", data.DOC_IDENT[i].COUNTRY);
        simplePush(el.string, "SERIES", data.DOC_IDENT[i].SER);
        simplePush(el.string, "NUMBER", data.DOC_IDENT[i].NUM);
        if (data.DOC_IDENT[i].DATESTART != undefined) {
            simplePush(el.date, "DATESTART", getyyyymmddstr(data.DOC_IDENT[i].DATESTART) + "T00:00:00");
        }
        if (data.DOC_IDENT[i].DATEMOD != undefined) {
            simplePush(el.date, "DATE_MOD", getyyyymmddstr(data.DOC_IDENT[i].DATEMOD) + "T00:00:00");
        }
        simplePush(el.string, "GIVEN", data.DOC_IDENT[i].GIVEN);
        simplePush(el.string, "COUNTRY_ACTION", data.DOC_IDENT[i].COUNTRY);
        simplePush(el.string, "DTYPE", data.DOC_IDENT[i].TYPE);
        elarr.push(el);
    }
    arrprsPush(arrprs,"DOC.IDENT",elarr);
}

var cashshowcase = [];
var cashshowcaseEl = elprsCreate();
simplePush(cashshowcaseEl.long, "CUST_ID", data.APP_CUST_ID);
/*n2_credit*/
if (data.DATA_CRED != undefined ) {
    var dataCredit = {};
    dataCredit["@name"] = "CREDIT";
    dataCredit.ListN2Credit = {};
    dataCredit.ListN2Credit.N2credit = [];
    for (var i = 0; i<data.DATA_CRED.length; i++) {
        var credit = {};
        credit["@b130DAYSCRED"] = data.DATA_CRED[i]["1_30_DAYS_CRED"];
        credit["@b130DAYSPRC"] = data.DATA_CRED[i]["1_30_DAYS_PRC"];
        credit["@b3060DAYSCRED"] = data.DATA_CRED[i]["30_60_DAYS_CRED"];
        credit["@b3060DAYSPRC"] = data.DATA_CRED[i]["30_60_DAYS_PRC"];
        credit["@b6090DAYSCRED"] = data.DATA_CRED[i]["60_90_DAYS_CRED"];
        credit["@b6090DAYSPRC"] = data.DATA_CRED[i]["60_90_DAYS_PRC"];
        credit["@b90DAYSCRED"] = data.DATA_CRED[i]["90_DAYS_CRED"];
        credit["@b90DAYSPRC"] = data.DATA_CRED[i]["90_DAYS_PRC"];
        if (data.DATA_CRED[i]["BAL_CRED"] != undefined) {
            credit["@balKred"] = data.DATA_CRED[i]["BAL_CRED"].toFixed(2);
        }
        if (data.DATA_CRED[i]["BAL_PRC"] != undefined) {
            credit["@balPrc"] = data.DATA_CRED[i]["BAL_PRC"].toFixed(2);
        }
        credit["@contractype"] = data.DATA_CRED[i]["TYPE"];
        credit["@contrstate"] = data.DATA_CRED[i]["STATE"];
        credit["@crPay"] = data.DATA_CRED[i]["CR_PAY"];
        credit["@creditNum"] = data.DATA_CRED[i]["REFERENC"];
        credit["@currency"] = data.DATA_CRED[i]["CCY"];
        credit["@dateAct"] = data.DATA_CRED[i]["DATE_FIRSTPAY"];
        credit["@dateGiven"] = getyyyymmddstr(data.DATA_CRED[i]["DATE_GIVEN"]) + "T00:00:00";
        credit["@dateStart"] = data.DATA_CRED[i]["DATE_START"];
        credit["@dateclosC"] = data.DATA_CRED[i]["DATECLOS_C"];
        credit["@dateclosF"] = data.DATA_CRED[i]["DATECLOS_F"];
        credit["@daysCred"] = data.DATA_CRED[i]["DAYS_CRED"];
        credit["@idClient"] = data.APP_CUST_ID;
        if (data.DATA_CRED[i]["LIMIT"] != undefined) {
            credit["@limitBalance"] = data.DATA_CRED[i]["LIMIT"].toFixed(2);
        }
        if (data.DATA_CRED[i]["LIMIT_PREVIOUS"] != undefined) {
            credit["@limitOld"] = data.DATA_CRED[i]["LIMIT_PREVIOUS"].toFixed(2);
        }
        credit["@lockCard"] = data.DATA_CRED[i]["LOCK_CARD"];
        credit["@maxDaysCred"] = data.DATA_CRED[i]["MAX_DAYS_CRED"];
        credit["@maxDaysPrc"] = data.DATA_CRED[i]["MAX_DAYS_PRC"];
        if (data.DATA_CRED[i]["MAX_PRS_CRED"] != undefined) {
            credit["@maxPrsCred"] = data.DATA_CRED[i]["MAX_PRS_CRED"].toFixed(2);
        }
        if (data.DATA_CRED[i]["MAX_PRS_PRC"] != undefined) {
            credit["@maxPrsPr"] = data.DATA_CRED[i]["MAX_PRS_PRC"].toFixed(2);
        }
        if (data.DATA_CRED[i]["PLAT_MIN"] != undefined) {
            credit["@platMin"] = data.DATA_CRED[i]["PLAT_MIN"].toFixed(2);
        }
        credit["@product"] = data.DATA_CRED[i]["PRODUCT"];
        credit["@prosCred"] = data.DATA_CRED[i]["PROS_CRED"];
        credit["@prosPrc"] = data.DATA_CRED[i]["PROS_PRC"];
        credit["@spis"] = data.DATA_CRED[i]["SPIS"];
        credit["@startSumm"] = data.DATA_CRED[i]["START_SUMM"];
        credit["@trPay"] = data.DATA_CRED[i]["TR_PAY"];
        credit["@branch"] = data.DATA_CRED[i]["BRANCH"];
        if (data.DATA_CRED[i]["BRANCH"] != undefined && data.DATA_CRED[i]["BRANCH"].substr(0,2)=="AB") {
            credit["@bank"] = "AB";
        }
        else {
            credit["@bank"] = "PB";
        }
        credit.panExpDate = {};
        credit.Pans = {};
        credit.Pans.Pan = [];
        if (data.tPan != undefined) {
            for (var p=0;p<data.tPan.length; p++) {
                if (data.tPan[p].panDealRef == data.DATA_CRED[i]["REFERENC"]) {
                    credit["@panAcc"] = data.tPan[p].panAcc;
                    credit["@pan"] = data.tPan[p].pan;
                    credit.panExpDate["#value"] = data.tPan[p].panExp;
                    var pan = {};
                    pan["@acc"] = data.tPan[p].panAcc;
                    pan["@ccy"] = data.DATA_CRED[i]["CCY"];
                    pan["@dealRef"] = data.tPan[p].panDealRef;
                    pan["@expDate"] = data.tPan[p].panExp;
                    if ( data.tPan[p].pan ==  data.tPan[p].panMain ) {
                        pan["@main"] = "Y";
                    }else {
                        pan["@main"] = "N";
                    }
                    pan["@num"] = data.tPan[p].pan;
                    pan["@product"] = data.DATA_CRED[i]["PRODUCT"];
                    pan["@source"] = "V";
                    pan["@state"] = data.tPan[p].panSt;
                    credit.Pans.Pan.push(pan);

                }
            }
        }

        dataCredit.ListN2Credit.N2credit.push(credit);
    }
    cashshowcaseEl.xml.push(dataCredit);
}

if (data.DATA_DEBCARD != undefined ) {
    var dataDebcard = {};
    dataDebcard["@name"] = "DEBCARD";
    dataDebcard.ListN2DebCard = {};
    dataDebcard.ListN2DebCard.N2DebCard=[];
    for (var i = 0; i < data.DATA_DEBCARD.length; i++) {
        var debcard = {};
        debcard["@active"] = data.DATA_DEBCARD[i]["ACTIVE"];
        if (data.DATA_DEBCARD[i]["BAL"] != undefined) {
            debcard["@bal"] = data.DATA_DEBCARD[i]["BAL"].toFixed(2);
        }
        debcard["@bank"] = data.DATA_DEBCARD[i]["BANK"];
        if (data.DATA_DEBCARD[i]["C01"] != undefined) {
            debcard["@c01"] = data.DATA_DEBCARD[i]["C01"].toFixed(2);
        }
        if (data.DATA_DEBCARD[i]["C02"] != undefined) {
            debcard["@c02"] = data.DATA_DEBCARD[i]["C02"].toFixed(2);
        }
        if (data.DATA_DEBCARD[i]["C03"] != undefined) {
            debcard["@c03"] = data.DATA_DEBCARD[i]["C03"].toFixed(2);
        }
        debcard["@currency"] = data.DATA_DEBCARD[i]["CCY"];
        debcard["@dateFINISH"] = data.DATA_DEBCARD[i]["DATE_FINISH"];
        debcard["@dateOPEN"] = getyyyymmddstr(data.DATA_DEBCARD[i]["DATE_START"]) + "T00:00:00";
        debcard["@idCLIENT"] = data.APP_CUST_ID;
        debcard["@numCARD"] = data.DATA_DEBCARD[i]["PAN"];
        debcard["@typeCARD"] = data.DATA_DEBCARD[i]["TYPE_CARD"];
        if (data.DATA_DEBCARD[i]["Z01"] != undefined) {
            debcard["@z01"] = data.DATA_DEBCARD[i]["Z01"].toFixed(2);
        }
        if (data.DATA_DEBCARD[i]["Z02"] != undefined) {
            debcard["@z02"] = data.DATA_DEBCARD[i]["Z02"].toFixed(2);
        }
        if (data.DATA_DEBCARD[i]["Z03"] != undefined) {
            debcard["@z03"] = data.DATA_DEBCARD[i]["Z03"].toFixed(2);
        }
        dataDebcard.ListN2DebCard.N2DebCard.push(debcard);
    }
    cashshowcaseEl.xml.push(dataDebcard);
}

if (data.DATA_DEPOSIT != undefined ) {
    var dataDeposit = {};
    dataDeposit["@name"] = "DEPOSIT";
    dataDeposit.ListN2Deposit = {};
    dataDeposit.ListN2Deposit.N2Deposit = [];
    for (var i = 0; i < data.DATA_DEPOSIT.length; i++) {
        var deposit = {};
        deposit["@bank"] = data.DATA_DEPOSIT[i]["BANK"];
        deposit["@contractype"] = data.DATA_DEPOSIT[i]["TYPE"];
        deposit["@currency"] = data.DATA_DEPOSIT[i]["CCY"];
        deposit["@dateOPEN"] = getyyyymmddstr(data.DATA_DEPOSIT[i]["DATE_START"]) + "T00:00:00";
        deposit["@depCONTR"] = data.DATA_DEPOSIT[i]["REFERENC"];
        deposit["@depNUMB"] = data.DATA_DEPOSIT[i]["NUM"];
        deposit["@idCLIENT"] = data.APP_CUST_ID;
        if (data.DATA_DEPOSIT[i]["STARTSUM"] != undefined) {
            deposit["@startSUMM"] = data.DATA_DEPOSIT[i]["STARTSUM"].toFixed(2);
        }
        if (data.DATA_DEPOSIT[i]["BAL"] != undefined) {
            deposit["@summ"] = data.DATA_DEPOSIT[i]["BAL"].toFixed(2);
        }
        deposit["@termmonth"] = data.DATA_DEPOSIT[i]["MONTH"];

        dataDeposit.ListN2Deposit.N2Deposit.push(deposit);
    }
    cashshowcaseEl.xml.push(dataDeposit);
}

cashshowcase.push(cashshowcaseEl);
arrprsPush(arrprs,"DATA.CASH_SHOWCASE",cashshowcase);

/*убки*/
var bki = [];
var bkiEl = elprsCreate();
simplePush(bkiEl.long, "CUST_ID", data.APP_CUST_ID);
simplePush(bkiEl.string, "YBCH_NOT_WORK", data.BCH_YBCH_NOT_WORK);
simplePush(bkiEl.string, "CRED_HIST_TOTAL", data.BCH_CRED_HIST_TOTAL);
simplePush(bkiEl.string, "CRED_HIST_YBCH", data.BCH_CRED_HIST_YBCH);
simplePush(bkiEl.string, "CRED_HIST_DATA", data.BCH_CRED_HIST_DATA);
simplePush(bkiEl.double, "CRED_LIMIT_CC", data.CRED_LIMIT_CC);
simplePush(bkiEl.double, "CRED_LIMIT_ACTION", data.CRED_LIMIT_ACTION);
simplePush(bkiEl.double, "CRED_COUNT_ACT_FOREIGN", data.CRED_COUNT_ACT_FOREIGN);
simplePush(bkiEl.double, "CRED_COUNT_ACT", data.CRED_COUNT_ACT);
simplePush(bkiEl.long, "CRED_COUNT_ACT_CC", data.CRED_COUNT_ACT_CC);
simplePush(bkiEl.double, "CRED_BAL_TOTAL", data.CRED_BAL_TOTAL);
if (data.CRED_PLAT_MIN_TOTAL != undefined) {
    simplePush(bkiEl.double, "CRED_PLAT_MIN_TOTAL", Number(data.CRED_PLAT_MIN_TOTAL).toFixed(2));
}
simplePush(bkiEl.double, "CRED_LIMIT_TOTAL", data.CRED_LIMIT_TOTAL);

if (data.UBKI_CRED != undefined ) {
    var bkixml = {};
    bkixml["@name"] = "BKI_XML_RESULT";
    bkixml.bki_credits = {};
    bkixml.bki_credits.p = [];
    for (var i = 0; i < data.UBKI_CRED.length; i++) {
        var bkicred = {};
        bkicred["@b30_3y"] = data.UBKI_CRED[i]["B30"];
        bkicred["@b60_3y"] = data.UBKI_CRED[i]["B60"];
        bkicred["@b7_3y"] = data.UBKI_CRED[i]["B7"];
        bkicred["@b90_3y"] = data.UBKI_CRED[i]["B90"];
        bkicred["@crNum"] = data.UBKI_CRED[i]["CREDIT_NUM"];
        bkicred["@curr"] = data.UBKI_CRED[i]["CCY"];
        bkicred["@dateClose"] = getyyyymmddstr(data.UBKI_CRED[i]["DATE_CLOSE"]);
        bkicred["@dateStart"] = getyyyymmddstr(data.UBKI_CRED[i]["DATE_START"]);
        bkicred["@dlCred"] = data.UBKI_CRED[i]["DL_CRED"];
        bkicred["@dlDays"] = data.UBKI_CRED[i]["DL_DAYS"];
        bkicred["@dlDebt"] = data.UBKI_CRED[i]["CUR_DEBT"];
        bkicred["@limit"] = data.UBKI_CRED[i]["LIMIT"];
        bkicred["@maxDlCr"] = data.UBKI_CRED[i]["MAX_DL_CRED"];
        bkicred["@product"] = data.UBKI_CRED[i]["PRODUCT"];
        bkicred["@st"] = data.UBKI_CRED[i]["STATE"];
        bkicred["@bki"] = data.UBKI_CRED[i]["u"];
        //bkicred["@org"] = data.UBKI_CRED[i]["OUR_BANK"];

        bkixml.bki_credits.p.push(bkicred);
    }
    bkiEl.xml.push(bkixml);
}

bki.push(bkiEl);
arrprsPush(arrprs,"RES.BKIPRS",bki);


/*DATA_PERSLINK*/
if (data.DATA_PERSLINK != undefined) {
    var perslink = [];
    for (var i=0; i<data.DATA_PERSLINK.length; i++) {
        var perslinkEl = elprsCreate();
        simplePush(perslinkEl.long, "CUST_ID", data.DATA_PERSLINK[i].CUST_ID);
        simplePush(perslinkEl.string, "BL_CONTROL", data.DATA_PERSLINK[i].BL_CONTROL);
        simplePush(perslinkEl.string, "BL_ZONE", data.DATA_PERSLINK[i].BL_ZONE);
        if (data.DATA_PERSLINK[i].BL_ZONE != undefined && data.DATA_PERSLINK[i].BL_ZONE.length>0) {
            simplePush(perslinkEl.string, "BLCL_CUST", "Y");
        }
        else {
            simplePush(perslinkEl.string, "BLCL_CUST", "N");
        }
        if (data.DATA_PERSLINK[i].BL_PHONE != undefined && data.DATA_PERSLINK[i].BL_PHONE.length>0) {
            simplePush(perslinkEl.string, "BLCL_PHONE_TYPE", "Y");
        }
        else {
            simplePush(perslinkEl.string, "BLCL_PHONE_TYPE", "N");
        }
        simplePush(perslinkEl.string, "BLCL_CALL", data.DATA_PERSLINK[i].CALL);
        simplePush(perslinkEl.string, "BLOKPO_ZONE", data.DATA_PERSLINK[i].BLOKPO_ZONE);
        perslink.push(perslinkEl);
    }
    arrprsPush(arrprs,"RES.PERSLINK",perslink);
}



/*активные заявки по рассрочке*/

var loanXML = {};
if (data.DATA_LOANS != undefined){
    loanXML.DATA_LOANS = [];
    for (var i=0; i<data.DATA_LOANS.length; i++){
        loanXML.DATA_LOANS[i] = {};
        loanXML.DATA_LOANS[i]["@creationDate"] =data.DATA_LOANS[i].creationDate;
        loanXML.DATA_LOANS[i]["@nrmRef"] =data.DATA_LOANS[i].nrmRef;
        loanXML.DATA_LOANS[i].Deal ={};
        loanXML.DATA_LOANS[i].Deal["@advAmount"] = data.DATA_LOANS[i].Deal.advAmount;
        loanXML.DATA_LOANS[i].Deal["@loanAmount"] = data.DATA_LOANS[i].Deal.loanAmount;

    }
}
if (loanXML.DATA_LOANS != undefined) {
    xml.push(loanXML);
}





mqdoc.date=date;
mqdoc.string=string;
mqdoc.long=long;
mqdoc.double=double;
mqdoc.arrprs=arrprs;
mqdoc.xml=xml;

data.mqdoc = mqdoc;


//**********************************************************************************************************************

console.log(data.mqdoc);