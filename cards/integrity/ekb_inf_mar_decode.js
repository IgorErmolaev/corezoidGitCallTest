var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\resource\\inf_new_resp_example.json').toString();
var data = JSON.parse(json).data;
data.APP_MARITAL_MARITALCOND="MARRIED";


/****************START*******************/
function is_array (a) {
    return (typeof a == "object") && (a instanceof Array);
}

const WORKSTATUS = ["WORKPENS","FULLWORK","PARTWORK","SAILOR"];

const ATTRCONV = {"INCOMPLETEMIDEDU":"POS","MIDDLEEDU":"SEC","MIDTECHEDU":"TEC","INCOMPLETEHIEDU":"UND","HIGHEDU":"HIG","TWOORMORE":"TWO","PENSIONER":"PENSION","WORKINGPENS":"WORKPENS","NOTWORKER":"UNEMP","CONTRACT":"SAILOR","SEASON":"PARTWORK","HALFWORKER":"PARTWORK","DIRECTOR":"ORGLEAD","MANAGER":"WORKER","SPECIALIST":"WORKER","BUSINESSMAN":"BUSINESS","WIDOWER":"WIDOW","NEWERMARRIED":"SINGLE","SELFEMPLOYEDPERSON":"SELFEMPL","PERSONALPROPERTY":"OWN","JOINTLYPROPERTY":"DUAL","LIVINGWITHPARENTS":"PARENTS","COMMUNAL":"COMMUN","INTERNATIONAL":"INTERNAT","PRIVATECOMMERCIAL":"PRIVATE","ENTREPRENEURSHIP":"BUSINESS","METALLURGY":"METALL","ENGINEERING":"MECHAN","UTILITIES":"COMMUN","BANKS":"BANK","AGRICULTURE":"AGRICUL","CIVILSERVANTS":"PUBLIC","LEGALSERVICES":"LOWYER","EDUCATION":"EDUCAT","REALTYSERVICES":"REALEST","SERVICESECTOR":"SERV","CONSTRUCTION":"BUILD","LIGHTINDUSTRIES":"FOOD","ARMEDFORCES":"MILIT","HEALTH":"MEDIC","FUELCOMPLEX":"ENERGY","TRANSPORTATION":"TRANSP","IT":"IT","ETC":"OTHER","YES":"Y","NO":"N"};

function attrset(attr) {
    if (attr != null && ATTRCONV.hasOwnProperty(attr)) {
        return ATTRCONV[attr];
    } else {
        return attr;
    }
}


data.APP_MARITAL_DB = data.doc.r.INF_NEW["@DB"];
data.APP_MARITAL_INN = data.doc.r.INF_NEW["@OKPO"];
if (data.APP_MARITAL_INN == "null") {
    data.APP_MARITAL_INN="";
}
data.APP_MARITAL_PATRONYMIC = data.doc.r.INF_NEW["@ruMName"];
data.APP_MARITAL_NAME = data.doc.r.INF_NEW["@ruFName"];
data.APP_MARITAL_SURNAME = data.doc.r.INF_NEW["@ruLName"];

var P_CLIENTATTRS;
if (is_array(data.doc.r.INF_NEW.P_CLIENTATTRS)) {
    P_CLIENTATTRS = data.doc.r.INF_NEW.P_CLIENTATTRS;
} else {
    P_CLIENTATTRS = new Array(data.doc.r.INF_NEW.P_CLIENTATTRS);
}

for (var i=0; i<P_CLIENTATTRS.length; i++) {
    var attrid = P_CLIENTATTRS[i]["@AttrTypeId"];
    var attrdata = attrset(P_CLIENTATTRS[i]["@AttrData"]);
    if (attrid == "6") {
        data.APP_MARITAL_SOCIALSTATUS = attrdata;
        if (WORKSTATUS.indexOf(attrdata) > -1) {
            data.APP_MARITAL_CONSSOCSTAT = "Y"
        } else {
            data.APP_MARITAL_CONSSOCSTAT = "N"
        }
    }
}

//контакты супруги (паста из ekb_inf_new_decode)
var currMobPhone = new Object();
var currHomePhone = new Object();
var currWorkPhone = new Object();
if (data.doc.r.INF_NEW.CONT_INF != undefined) {
    var CONT_INF;
    if (is_array(data.doc.r.INF_NEW.CONT_INF)) {
        CONT_INF = data.doc.r.INF_NEW.CONT_INF;
    } else {
        CONT_INF = new Array(data.doc.r.INF_NEW.CONT_INF);
    }

    for (var i=0; i<CONT_INF.length; i++) {
        var cont = CONT_INF[i];
        var contType = Number(cont["@Type"]);
        if (contType == 0 || contType == 1 || contType == 3) {

            if (contType == 0) {
                if (Object.getOwnPropertyNames(currHomePhone).length === 0) {
                    //currHomePhone = new Object();
                    currHomePhone.TYPE_CALL = "HOME";
                    currHomePhone.CUST_ID_CALL = cont["@ClientID"];
                    currHomePhone.NUMBER_CALL = cont["@Number"];
                    currHomePhone.LIGHT = Number(cont["@VerifyCode"]);
                    currHomePhone.DTM = cont["@DTM"];
                }
                else {
                    if (currHomePhone.LIGHT < Number(cont["@VerifyCode"]) ||
                        ( currHomePhone.LIGHT == Number(cont["@VerifyCode"]) && currHomePhone.DTM < cont["@DTM"] ) ) {
                        currHomePhone.CUST_ID_CALL = cont["@ClientID"];
                        currHomePhone.NUMBER_CALL = cont["@Number"];
                        currHomePhone.LIGHT = Number(cont["@VerifyCode"]);
                        currHomePhone.DTM = cont["@DTM"];
                    }
                }

            }
            else if (contType == 1) {
                if (Object.getOwnPropertyNames(currWorkPhone).length === 0) {
                    //currWorkPhone = new Object();
                    currWorkPhone.TYPE_CALL = "WORK";
                    currWorkPhone.CUST_ID_CALL = cont["@ClientID"];
                    currWorkPhone.NUMBER_CALL = cont["@Number"];
                    currWorkPhone.LIGHT = Number(cont["@VerifyCode"]);
                    currWorkPhone.DTM = cont["@DTM"];
                }
                else {
                    if (currWorkPhone.LIGHT < Number(cont["@VerifyCode"]) ||
                        ( currWorkPhone.LIGHT == Number(cont["@VerifyCode"]) && currWorkPhone.DTM < cont["@DTM"] ) ) {
                        currWorkPhone.CUST_ID_CALL = cont["@ClientID"];
                        currWorkPhone.NUMBER_CALL = cont["@Number"];
                        currWorkPhone.LIGHT = Number(cont["@VerifyCode"]);
                        currWorkPhone.DTM = cont["@DTM"];
                    }
                }

            }
            else {
                if (Object.getOwnPropertyNames(currMobPhone).length === 0) {
                    //currMobPhone = new Object();
                    currMobPhone.TYPE_CALL = "MOB";
                    currMobPhone.CUST_ID_CALL = cont["@ClientID"];
                    currMobPhone.NUMBER_CALL = cont["@Number"];
                    currMobPhone.LIGHT = Number(cont["@VerifyCode"]);
                    currMobPhone.DTM = cont["@DTM"];
                }
                else {
                    if (currMobPhone.LIGHT < Number(cont["@VerifyCode"]) ||
                        ( currMobPhone.LIGHT == Number(cont["@VerifyCode"]) && currMobPhone.DTM < cont["@DTM"] ) ) {
                        currMobPhone.CUST_ID_CALL = cont["@ClientID"];
                        currMobPhone.NUMBER_CALL = cont["@Number"];
                        currMobPhone.LIGHT = Number(cont["@VerifyCode"]);
                        currMobPhone.DTM = cont["@DTM"];
                    }
                }

            }
        }
    }
}

if (Object.getOwnPropertyNames(currMobPhone).length !== 0) {
    data.APP_MARITAL_MOBILEPHONE = currMobPhone.NUMBER_CALL;
}

//определение LOCAL_RIP_MARITAL
if (data.APP_MARITAL_MARITALCOND == "MARRIED" && data.APP_MARITAL_CONSSOCSTAT == "Y") {
    data.LOCAL_RIP_MARITAL="MARRIED";
} else if (data.APP_MARITAL_MARITALCOND == "MARRIED" && data.APP_MARITAL_CONSSOCSTAT == "N" || data.APP_MARITAL_MARITALCOND =="WIDOW" ) {
    data.LOCAL_RIP_MARITAL="WIDOW";
} else if (data.APP_MARITAL_MARITALCOND == "DIVORCED") {
    data.LOCAL_RIP_MARITAL="DIVORCED";
} else if ( data.APP_MARITAL_MARITALCOND == "SINGLE" ) {
    data.LOCAL_RIP_MARITAL="SINGLE";
}


/****************END*******************/
console.log(data);