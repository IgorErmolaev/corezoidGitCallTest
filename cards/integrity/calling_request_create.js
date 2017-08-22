var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\resource\\preparam_example.json').toString();
var data = JSON.parse(json).data;
function toDate(target) {

    if (typeof target == "string" && target.length == 24 && target.substr(4, 1) == "-" && target.substr(7, 1) == "-" && target.substr(10, 1) == "T" &&
        target.substr(13, 1) == ":" && target.substr(16, 1) == ":" && target.substr(19, 1) == "." && target.substr(23, 1) == "Z") {
        return new Date(target.substr(0, 10) + " " + target.substr(11, 8));
    }
    else return target;
}

function convertToDate(target) {
    if (target != null) {
        if (typeof target == "object") {
            if (target instanceof Array) {
                for (var i = 0; i<target.length; i++) {
                    target[i] = convertToDate(target[i]);
                }
            }
            else {
                var props = Object.getOwnPropertyNames(target);
                for (var i = 0; i<props.length; i++) {
                    target[props[i]] = convertToDate(target[props[i]]);
                }
            }
            return target;
        } else return toDate(target);
    } else return target;
}

data = convertToDate(data);
//console.log(data);

/****************START*******************/

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

mqdoc["@rtdm"] = "Y";
mqdoc["@proc_type"] = data.PROD_CHAR_TYPE;
mqdoc["@action"] = "CALLING"
mqdoc["@ref"] = data.APPLIC_ID;
mqdoc["@conv_id"] = data.calling_conv_id;

var date = [];
var string = [];
var long = [];
var double = [];
var arrprs = [];

simplePush(long, "APP.CUST_ID", data.APP_CUST_ID);
simplePush(string, "APP.CUST_GENDER", data.APP_CUST_GENDER);
simplePush(string, "APP.CUST_NAME", data.APP_CUST_NAME);
simplePush(string, "APP.CUST_PATRONYMIC", data.APP_CUST_PATRONYMIC);
simplePush(string, "APP.CUST_SURNAME", data.APP_CUST_SURNAME);
simplePush(string, "PROD.CHAR_BANK", data.PROD_CHAR_BANK);
simplePush(string, "PROD.SCHEME_CCY_LOAN", data.PROD_SCHEME_CCY_LOAN);
simplePush(string, "PROD.CHAR_TYPE", data.PROD_CHAR_TYPE);
simplePush(string, "PROD.CASH_CRED", data.PROD_CASH_CRED);
simplePush(string, "RES.CALL_DIALOGE_TYPE", data.RES_CALL_DIALOGE_TYPE);
simplePush(string, "RES.CALL_NEED_TRANSFER", data.RES_CALL_NEED_TRANSFER);
simplePush(string, "RES.RIP_APPLICATION", data.RES_RIP_APPLICATION);
simplePush(double, "RES.LIMIT_ITOG", data.RES_LIMIT_ITOG);
simplePush(string, "RES.LIMIT_ITOG_TYPE", data.RES_LIMIT_ITOG_TYPE);
simplePush(string, "APP.MARITAL_MARITALCOND", data.APP_MARITAL_MARITALCOND);
simplePush(long, "APP.SOCSTATUS_CHILDNUMBER", data.APP_SOCSTATUS_CHILDNUMBER);
simplePush(string, "APP.SOCSTATUS_EDUCATION", data.APP_SOCSTATUS_EDUCATION);
simplePush(string, "APP.PROPERTY_CAR_HAS", data.APP_PROPERTY_CAR_HAS);
simplePush(string, "APP.EMPL_SOCIALSTATUS", data.APP_EMPL_SOCIALSTATUS);
simplePush(string, "APP.EMPL_RANK", data.APP_EMPL_RANK);
simplePush(string, "APP.ACT_ADDRESS_ESTATETYPE", data.APP_ACT_ADDRESS_ESTATETYPE);
simplePush(string, "APP.EMPL_ORGTYPE", data.APP_EMPL_ORGTYPE);
simplePush(string, "APP.EMPL_ACTIVITY", data.APP_EMPL_ACTIVITY);
simplePush(double, "APP.INCOME_MONTHSALARY", data.APP_INCOME_MONTHSALARY);
simplePush(string, "APP.INCOME_MONTHSALARY_CURRENCY", data.APP_INCOME_MONTHSALARY_CURRENCY);
simplePush(double, "APP.INCOME_OTHERSOURCE", data.APP_INCOME_OTHERSOURCE);
simplePush(string, "APP.INCOME_OTHERSOURCE_CURRENCY", data.APP_INCOME_OTHERSOURCE_CURRENCY);
simplePush(string, "APP.EMPL_POSITION", data.APP_EMPL_POSITION);
simplePush(string, "APP.EMPL_WORKPLACE", data.APP_EMPL_WORKPLACE);
simplePush(date, "APP.EMPL_TIMEEMPL_DATE", data.APP_EMPL_TIMEEMPL_DATE);

if (data.APP_PHONE != undefined ) {
    var elarr = [];
    for (var i = 0; i<data.APP_PHONE.length;i++) {
        var el = elprsCreate();
        simplePush(el.string, "CVALUE", data.APP_PHONE[i].NUMBER_CALL);
        simplePush(el.string, "CTYPE", data.APP_PHONE[i].TYPE_CALL);
        simplePush(el.long, "CUST_ID", data.APP_PHONE[i].CUST_ID_CALL);
        simplePush(el.date, "DATE_MOD", addTToDate(data.APP_PHONE[i].DTM));
        simplePush(el.long, "LIGHT", data.APP_PHONE[i].LIGHT);
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



mqdoc.date=date;
mqdoc.string=string;
mqdoc.long=long;
mqdoc.double=double;
mqdoc.arrprs=arrprs;

data.mqdoc = mqdoc;

/****************END*******************/
console.log(JSON.stringify(data.mqdoc));