/*var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\..\\test\\internalClient.json').toString();
var data = JSON.parse(json).data;
*/

//*******************************************************************************************************************************************

// JavaScript Document

function toDate(target) {
    if (typeof target == "string" && target.length == 24 && target.substr(4, 1) == "-" && target.substr(7, 1) == "-" && target.substr(10, 1) == "T" &&
        target.substr(13, 1) == ":" && target.substr(16, 1) == ":" && target.substr(19, 1) == "." && target.substr(23, 1) == "Z") {
        /*return new Date(target.substr(0, 10) + " " + target.substr(11, 8));*/
        return new Date(target);
    }
    else return target;
}

function Datediff(days_diff) {
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

function datediff_2days(date_start, date_end){
    date_s = new Date(date_start);
    date_e = new Date(date_end);
    var diff = Math.abs(date_e - date_s);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / one_day);
    return days;
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

data=convertToDate(data);


var stateO =  new Array('O','L','R','A','D');
var card  =   new Array('UNI','UN_M','GOLD','VIP');

//-----------------------Total credit cards limit----

data.LOCAL_CRED_CARD_LIM_TOTAL = 0;

for (var i=0; i<data.DATA_CRED.length; i++)
{
    if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1 && card.indexOf(data.DATA_CRED[i].PRODUCT)!=-1)
    {
        data.LOCAL_CRED_CARD_LIM_TOTAL += data.DATA_CRED[i].LIMIT;
    }
}


//---------------------Open credits, cards-------

data.LOCAL_CRED_ADD_LOAD = 0;

if (data.LOCAL_CRED_CARD_LIM_TOTAL>5000)
{
    if (data.DATA_CRED != undefined){
        for (var i=0; i<data.DATA_CRED.length; i++){
            if ((1- (data.DATA_CRED[i].LIMIT - Math.abs(data.DATA_CRED[i].BAL))/data.DATA_CRED[i].LIMIT )*100<50){
                data.LOCAL_CRED_ADD_LOAD += Math.abs(data.DATA_CRED[i].BAL)*0.05;
            }
            else {
                data.LOCAL_CRED_ADD_LOAD += data.DATA_CRED[i].LIMIT*0.05;
            }
        }
    }
}
else {
    if (data.LOCAL_CRED_CARD_LIM_TOTAL>0)
    {
        data.LOCAL_CRED_ADD_LOAD = 250;
    }
}

for (var i=0; i<data.DATA_CRED.length; i++) {
    if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1 && card.indexOf(data.DATA_CRED[i].PRODUCT)!=-1) {
        if (Math.abs(data.DATA_CRED[i].BAL)>0 && Math.abs(data.DATA_CRED[i].BAL)>data.DATA_CRED[i].LIMIT) {
            data.LOCAL_CRED_ADD_LOAD +=(Math.abs(data.DATA_CRED[i].BAL)-data.DATA_CRED[i].LIMIT)
        }
    }
}


//-------------------------Vitrina----------------

var one_mnth = 1000 * 60 * 60 * 24 * 30.5;
var dateD, dateS, dateC;

for (var i=0; i<data.DATA_CRED.length; i++) {
    if (data.DATA_CRED[i].DLP != undefined) {
        if (data.DATA_CRED[i].DLP =='L2F' || data.DATA_CRED[i].DLP  =='LOF') {
            data.LOCAL_CRED_ADD_LOAD += Math.max(data.DATA_CRED[i].BAL,data.DATA_CRED[i].LIMIT)*0.3
        }
        else {
            dateS=Datediff(data.DATA_CRED[i].DATE_START)/30.5;
            dateC=Datediff(data.DATA_CRED[i].DATECLOS_C)/30.5;
            dateD = datediff_2days(data.DATA_CRED[i].DATE_START, data.DATA_CRED[i].DATECLOS_C)/30.5;
            if (dateS<dateC && Math.round(dateD)!=0) {
                data.LOCAL_CRED_ADD_LOAD +=(1.2*data.DATA_CRED[i].START_SUMM/Math.round(dateD));
            }
        }
    }
}


//-------------------------paypart----------------

for (var i=0; i<data.DATA_CRED.length; i++) {
    if (data.DATA_CRED[i].PRODUCT == 'PAYP' || data.DATA_CRED[i].PRODUCT == 'PAYPA') {
        if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1) {
            if (data.DATA_CRED[i].PLAT_MIN != undefined && data.DATA_CRED[i].PLAT_MIN !=0) {
                data.LOCAL_CRED_ADD_LOAD += data.DATA_CRED[i].PLAT_MIN;
            }
            else {
                data.LOCAL_CRED_ADD_LOAD += data.DATA_CRED[i].START_SUMM/12;
            }
        }
    }
}


/*
 //-------------------------ubki---------

 data.LOCAL_CRED_ADD_LOAD = Math.max(data.LOCAL_CRED_ADD_LOAD,data.RES_CRED_PLAT_MIN);
 */

//-----------------------Summary--------------

data.RES_EXP_LOANS = Math.round(data.LOCAL_CRED_ADD_LOAD);

data.RES_EXP_MONTH_TOTAL = data.RES_EXP_LOANS + data.RES_EXP_MIN_LIV_COSTS;


//************************************************************************************************************
/*
console.log("RES_EXP_LOANS");
console.log(data.RES_EXP_LOANS);
console.log("RES_EXP_MONTH_TOTAL");
console.log(data.RES_EXP_MONTH_TOTAL);
*/


