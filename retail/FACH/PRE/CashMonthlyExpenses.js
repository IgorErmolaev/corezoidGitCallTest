// JavaScript Document

var stateO =  new Array('O','L','R','A','D');
var card  =   new Array('UNI','UN_M','GOLD','VIP');

function Datediff(days_diff) {
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

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

if (data.LOCAL_CRED_CARD_LIM_TOTAL>8000)
{
    data.LOCAL_CRED_ADD_LOAD = data.LOCAL_CRED_CARD_LIM_TOTAL*0.05;
}
else {
    if (data.LOCAL_CRED_CARD_LIM_TOTAL>0)
    {
        data.LOCAL_CRED_ADD_LOAD = 400;
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

for (var i=0; i<data.DATA_CRED.length; i++) {
    if (data.DATA_CRED[i].DLP != undefined) {
        if (data.DATA_CRED[i].DLP =='L2F' || data.DATA_CRED[i].DLP  =='LOF') {
            data.LOCAL_CRED_ADD_LOAD += Math.max(data.DATA_CRED[i].BAL,data.DATA_CRED[i].LIMIT)*0.3
        }
        else {
            DaysS=Datediff(data.DATA_CRED[i].DATE_START);
            DaysC=Datediff(data.DATA_CRED[i].DATECLOS_C);
            param = Math.abs(DaysS - DaysC)/30.5;
            if (data.DATA_CRED[i].DATE_START<data.DATA_CRED[i].DATECLOS_C && param !=0) {
                data.LOCAL_CRED_ADD_LOAD +=(1.2*data.DATA_CRED[i].START_SUMM/param);
            }
        }
    }
}

//-------------------------paypart----------------

for (var i=0; i<data.DATA_CRED.length; i++) {
    if (data.DATA_CRED[i].PRODUCT == 'PAYP') {
        if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1) {
            if (data.DATA_CRED[i].PLAT_MIN != undefined && data.DATA_CRED[i].PLAT_MIN !=0) {
                data.LOCAL_CRED_ADD_LOAD += data.DATA_CRED[i].PLAT_MIN
            }
            else {
                data.LOCAL_CRED_ADD_LOAD += data.DATA_CRED[i].START_SUMM/12;
            }
        }
    }
}

//-------------------------ubki---------

data.LOCAL_CRED_ADD_LOAD = Math.max(data.LOCAL_CRED_ADD_LOAD,data.RES_CRED_PLAT_MIN);

//-----------------------Summary--------------
data.RES_EXP_MONTH_TOTAL = 0;

data.RES_EXP_LOANS = Math.round(data.LOCAL_CRED_ADD_LOAD);

data.RES_EXP_MONTH_TOTAL += data.RES_EXP_LOANS; 