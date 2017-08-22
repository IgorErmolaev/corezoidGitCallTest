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

mqdoc["@rtdm"] = "Y";
mqdoc["@proc_type"] = data.charType;
if (data.charType == 'MSBTRANSP'){
    mqdoc["@action"] = "PRST";
}
else {
    mqdoc["@action"] = "FNST";
}

mqdoc["@ref"] = data.APPLIC_ID;

mqdoc["@conv_id"] = data.conv_id;


var date = [];
var string = [];
var long = [];
var double = [];
var arrprs = [];
var xml = [];

simplePush(string, "nameCompany", data.nameCompany);
simplePush(string, "OKPOCompany", data.OKPOCompany);
simplePush(double, "calcLimit", data.calcLimit);
simplePush(string, "remark", data.remark);

simplePush(string, "PROD.CHAR_BANK", 'PB');
simplePush(string, "RES.RIP_APPLICATION", 'N');
simplePush(long, "APP.CUST_ID", data.APP_CUST_ID);


mqdoc.date=date;
mqdoc.string=string;
mqdoc.long=long;
mqdoc.double=double;
mqdoc.arrprs=arrprs;
mqdoc.xml=xml;

data.mqdoc = mqdoc;


//**********************************************************************************************************************

console.log(data.mqdoc);