var fs = require('fs');
var json = fs.readFileSync(__dirname+'/../resource/inf_new_resp_example.json').toString();
var data = JSON.parse(json).data;

/****************START*******************/
function is_array (a) {
    return (typeof a == "object") && (a instanceof Array);
}

function datediff(date_start, date_end){
    var date_s = new Date(date_start);
    var diff = Math.abs(date_end - date_s);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / one_day);
    return days;
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const ATTRCONV = {"INCOMPLETEMIDEDU":"POS","MIDDLEEDU":"SEC","MIDTECHEDU":"TEC","INCOMPLETEHIEDU":"UND","HIGHEDU":"HIG","TWOORMORE":"TWO","PENSIONER":"PENSION","WORKINGPENS":"WORKPENS","NOTWORKER":"UNEMP","CONTRACT":"SAILOR","SEASON":"PARTWORK","HALFWORKER":"PARTWORK","DIRECTOR":"ORGLEAD","MANAGER":"WORKER","SPECIALIST":"WORKER","BUSINESSMAN":"BUSINESS","WIDOWER":"WIDOW","NEWERMARRIED":"SINGLE","SELFEMPLOYEDPERSON":"SELFEMPL","PERSONALPROPERTY":"OWN","JOINTLYPROPERTY":"DUAL","LIVINGWITHPARENTS":"PARENTS","COMMUNAL":"COMMUN","INTERNATIONAL":"INTERNAT","PRIVATECOMMERCIAL":"PRIVATE","ENTREPRENEURSHIP":"BUSINESS","METALLURGY":"METALL","ENGINEERING":"MECHAN","UTILITIES":"COMMUN","BANKS":"BANK","AGRICULTURE":"AGRICUL","CIVILSERVANTS":"PUBLIC","LEGALSERVICES":"LOWYER","EDUCATION":"EDUCAT","REALTYSERVICES":"REALEST","SERVICESECTOR":"SERV","CONSTRUCTION":"BUILD","LIGHTINDUSTRIES":"FOOD","ARMEDFORCES":"MILIT","HEALTH":"MEDIC","FUELCOMPLEX":"ENERGY","TRANSPORTATION":"TRANSP","IT":"IT","ETC":"OTHER","YES":"Y","NO":"N"};

function attrset(attr) {
    if (attr != null && ATTRCONV.hasOwnProperty(attr)) {
        return ATTRCONV[attr];
    } else {
        return attr;
    }
}

//основные параметры
data.APP_SOCSTATUS_RESIDENT = data.doc.r.INF_NEW["@CountryRes"];
if ( data.APP_SOCSTATUS_RESIDENT == "UA" ) {
    data.APP_SOCSTATUS_IS_RESIDENT="Y";
} else {
    data.APP_SOCSTATUS_IS_RESIDENT="N";
}
data.APP_CUST_DB = data.doc.r.INF_NEW["@DB"];
data.APP_CUST_BIRTHDAY = new Date(data.doc.r.INF_NEW["@DB"]);
data.RES_AGE = getAge(data.APP_CUST_BIRTHDAY);
data.APP_CUST_INN = data.doc.r.INF_NEW["@OKPO"];
if (data.APP_CUST_INN == "null") {
    data.APP_CUST_INN="";
}
if ( data.doc.r.INF_NEW["@WOKPO"] == "null" ) {
    data.APP_EMPL_OKPO="";
} else {
    data.APP_EMPL_OKPO = data.doc.r.INF_NEW["@WOKPO"];
}
data.APP_CUST_PATRONYMIC = data.doc.r.INF_NEW["@ruMName"];
data.APP_CUST_NAME = data.doc.r.INF_NEW["@ruFName"];
data.APP_CUST_SURNAME = data.doc.r.INF_NEW["@ruLName"];
data.APP_SOCSTATUS_RESIDENT = data.doc.r.INF_NEW["@CountryRes"];
data.APP_CUST_LANG = data.doc.r.INF_NEW["@Lang"];
data.APP_CUST_GENDER = data.doc.r.INF_NEW["@Sex"];
data.APP_CUST_RELIGIOUS = data.doc.r.INF_NEW["@FlBelieve"];

//флаг предприниматель
if (data.doc.r.INF_NEW["@FlJur"] == "Y" && data.doc.r.INF_NEW["@FlPhys"] == "Y") data.APP_IS_ENTERPRENEUR = "Y";
else data.APP_IS_ENTERPRENEUR = "N";

//анкетные данные
data.APP_INCOME_MONTHSALARY=0;
data.APP_SOCSTATUS_CHILDNUMBER=0;
data.APP_INCOME_MONTHSALARY=0;
data.APP_INCOME_OTHERSOURCE=0;

if (data.doc.r.INF_NEW.P_CLIENTATTRS != undefined) {
    var P_CLIENTATTRS;
    if (is_array(data.doc.r.INF_NEW.P_CLIENTATTRS)) {
        P_CLIENTATTRS = data.doc.r.INF_NEW.P_CLIENTATTRS;
    } else {
        P_CLIENTATTRS = new Array(data.doc.r.INF_NEW.P_CLIENTATTRS);
    }

    for (var i=0; i<P_CLIENTATTRS.length; i++) {
        var attrid = P_CLIENTATTRS[i]["@AttrTypeId"];
        var attrdata = attrset(P_CLIENTATTRS[i]["@AttrData"]);
        if (attrid == "16") data.APP_INCOME_MONTHSALARY = Number(attrdata);
        if (attrid == "2") data.APP_SOCSTATUS_CHILDNUMBER = Number(attrdata);
        if (attrid == "14") data.APP_EMPL_ORGTYPE = attrdata;
        if (attrid == "7") data.APP_EMPL_RANK = attrdata;
        if (attrid == "1") data.APP_MARITAL_MARITALCOND = attrdata;
        if (attrid == "6") data.APP_EMPL_SOCIALSTATUS = attrdata;
        if (attrid == "4") data.APP_SOCSTATUS_EDUCATION = attrdata;
        if (attrid == "62") data.APP_EMPL_WORKPLACE = attrdata;
        if (attrid == "15") data.APP_EMPL_ACTIVITY = attrdata;
        if (attrid == "73") {
            data.APP_EMPL_TIMEEMPL_DATE = attrdata;
            data.APP_EMPL_TIMEEMPL = Math.floor(datediff(new Date(data.APP_EMPL_TIMEEMPL_DATE), new Date()) / 30);
        }
        if (attrid == "16") data.APP_INCOME_MONTHSALARY = Number(attrdata);
        if (attrid == "17") data.APP_INCOME_MONTHSALARY_CURRENCY = attrdata;
        if (attrid == "18") data.APP_INCOME_OTHERSOURCE = Number(attrdata);
        if (attrid == "19") data.APP_INCOME_OTHERSOURCE_CURRENCY = attrdata;
        if (attrid == "13") data.APP_ACT_ADDRESS_ESTATETYPE = attrdata;
        if (attrid == "59") data.APP_EMPL_POSITION = attrdata;
        if (attrid == "32") data.APP_CUST_COD_ANSWER = attrdata;
    }
}


//семейное положение для скоринга (LOCAL_MARITAL_MARITALCOND)
if (data.APP_MARITAL_MARITALCOND == "MARRIED") {
    if (data.APP_SOCSTATUS_CHILDNUMBER<0) data.LOCAL_MARITAL_MARITALCOND="MARRIED_-1";
    else data.LOCAL_MARITAL_MARITALCOND = data.APP_MARITAL_MARITALCOND + "_" + String(data.APP_SOCSTATUS_CHILDNUMBER);
} else data.LOCAL_MARITAL_MARITALCOND = data.APP_MARITAL_MARITALCOND;

//документы идентификации
//основной массив с доками
data.DOC_IDENT = new Array();

if (data.doc.r.INF_NEW.D_MAIN != undefined) {
    var docMain = data.doc.r.INF_NEW.D_MAIN;
    docm = new Object();
    docm.ID = docMain["@DId"];
    docm.COUNTRY = docMain["@DCountry"];
    docm.CUST_ID = docMain["@CId"];
    if (docMain["@DExpd"]!="null") {
        docm.DATEEND = docMain["@DExpd"];
    } else docm.DATEEND="1900-01-01";
    if (docMain["@DDS"]!="null") {
        docm.DATESTART = docMain["@DDS"];
    } else docm.DATESTART="1900-01-01";
    if (docMain["@DDTM"]!="null") {
        docm.DATEMOD = docMain["@DDTM"];
    } else docm.DATEMOD="1900-01-01";
    docm.MAIN = "Y";
    docm.SER = docMain["@DSer"];
    docm.NUM = docMain["@DNum"];
    docm.EKB_TYPE = docMain["@DType"];
    docm.GIVEN = docMain["@DWho"];
    if (docMain["@DSt"] == "A") {
        docm.ACTUAL = "Y";
    } else {
        docm.ACTUAL = "N";
    }
    if (docMain["@DExpd"] == "null" || new Date(docMain["@DExpd"].substring(0,10)) > new Date() ) {
        docm.VALID = "Y";
    } else {
        docm.VALID = "N";
    }
    data.DOC_IDENT.push(docm);

}

if (data.doc.r.INF_NEW.D_LST != undefined) {
    var D_LST;
    if (is_array(data.doc.r.INF_NEW.D_LST)) {
        D_LST = data.doc.r.INF_NEW.D_LST;
    } else {
        D_LST = new Array(data.doc.r.INF_NEW.D_LST);
    }

    for (var i=0; i<D_LST.length; i++) {
        var docLst = D_LST[i];
        if ( docm.SER != docLst["@DSer"] && docm.NUM != docLst["@DNum"] ) {
            var docdoc = new Object();
            docdoc.ID = docLst["@DId"];
            docdoc.COUNTRY = docLst["@DCountry"];
            docdoc.CUST_ID = docLst["@CId"];
            if (docMain["@DExpd"]!="null") {
                docm.DATEEND = docMain["@DExpd"];
            } else docm.DATEEND="1900-01-01";
            if (docLst["@DDS"]!="null") {
                docdoc.DATESTART = docLst["@DDS"];
            } else docdoc.DATESTART="1900-01-01";
            if (docLst["@DDTM"]!="null") {
                docdoc.DATEMOD = docLst["@DDTM"];
            } else docdoc.DATEMOD="1900-01-01";
            docdoc.MAIN = "N";
            docdoc.SER = docLst["@DSer"];
            docdoc.NUM = docLst["@DNum"];
            docdoc.EKB_TYPE = docLst["@DType"];
            docdoc.GIVEN = docLst["@DWho"];
            if (docLst["@DSt"] == "A") {
                docdoc.ACTUAL = "Y";
            } else {
                docdoc.ACTUAL = "N";
            }
            if (docLst["@DExpd"] == "null" || new Date(docLst["@DExpd"].substring(0,10)) > new Date() ) {
                docdoc.VALID = "Y";
            } else {
                docdoc.VALID = "N";
            }
            data.DOC_IDENT.push(docdoc);
        }
    }
}

//контакты
data.APP_PHONE = new Array();
var currMobPhone = new Object();
var currHomePhone = new Object();
var currWorkPhone = new Object();
data.LOCAL_CONTACT_EMAIL="N";

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
                    currHomePhone.MAIN=cont["@Main"];
                }
                else {
                    if (currHomePhone.LIGHT < Number(cont["@VerifyCode"]) ||
                        ( currHomePhone.LIGHT == Number(cont["@VerifyCode"]) && currHomePhone.DTM < cont["@DTM"] ) ) {
                        currHomePhone.CUST_ID_CALL = cont["@ClientID"];
                        currHomePhone.NUMBER_CALL = cont["@Number"];
                        currHomePhone.LIGHT = Number(cont["@VerifyCode"]);
                        currHomePhone.DTM = cont["@DTM"];
                        currHomePhone.MAIN=cont["@Main"];
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
                    currWorkPhone.MAIN=cont["@Main"];
                }
                else {
                    if (currWorkPhone.LIGHT < Number(cont["@VerifyCode"]) ||
                        ( currWorkPhone.LIGHT == Number(cont["@VerifyCode"]) && currWorkPhone.DTM < cont["@DTM"] ) ) {
                        currWorkPhone.CUST_ID_CALL = cont["@ClientID"];
                        currWorkPhone.NUMBER_CALL = cont["@Number"];
                        currWorkPhone.LIGHT = Number(cont["@VerifyCode"]);
                        currWorkPhone.DTM = cont["@DTM"];
                        currWorkPhone.MAIN=cont["@Main"];
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
                    currMobPhone.MAIN=cont["@GroupMain"];
                }
                else {
                    if (currMobPhone.LIGHT < Number(cont["@VerifyCode"]) || (currMobPhone.MAIN < cont["@GroupMain"] && Number(cont["@VerifyCode"]) >= currMobPhone.LIGHT)||
                        ( currMobPhone.LIGHT == Number(cont["@VerifyCode"]) && currMobPhone.DTM < cont["@DTM"] && currMobPhone.MAIN <= cont["@GroupMain"] ) ) {
                        currMobPhone.CUST_ID_CALL = cont["@ClientID"];
                        currMobPhone.NUMBER_CALL = cont["@Number"];
                        currMobPhone.LIGHT = Number(cont["@VerifyCode"]);
                        currMobPhone.DTM = cont["@DTM"];
                        currMobPhone.MAIN=cont["@GroupMain"];
                    }
                }

            }
        } else if (contType == 9 ) {
            data.LOCAL_CONTACT_EMAIL="Y";
            data.APP_CONTACT_EMAIL=cont["@Number"];
        }
    }
}

if (Object.getOwnPropertyNames(currHomePhone).length !== 0) {
    data.APP_PHONE.push(currHomePhone);
}
if (Object.getOwnPropertyNames(currWorkPhone).length !== 0) {
    data.APP_PHONE.push(currWorkPhone);
}
if (Object.getOwnPropertyNames(currMobPhone).length !== 0) {
    data.APP_PHONE.push(currMobPhone);
}
//nums для других сервисов
var nums = new Array();
for (var i=0; i<data.APP_PHONE.length; i++) {
    nums.push(data.APP_PHONE[i].NUMBER_CALL);
}
data.nums = nums;


//адреса
data.APP_ACT_ADDRESS = new Object();
data.APP_REG_ADDRESS = new Object();
var regAddrFound = false;
var regAddrDate = "";
var actAddrFound = false;
var actAddrDate = "";

var ADDR_INF;
if (is_array(data.doc.r.INF_NEW.ADDR_INF)) {
    ADDR_INF = data.doc.r.INF_NEW.ADDR_INF;
} else {
    ADDR_INF = new Array(data.doc.r.INF_NEW.ADDR_INF);
}

for (var i=0; i<ADDR_INF.length; i++) {
    var addr = ADDR_INF[i];
    if (addr["@Type"] == "11" )  {
        if (regAddrFound == false && addr["@DTM"]>regAddrDate) {
            data.APP_REG_ADDRESS.UADID = addr["@UADId"];
            data.APP_REG_ADDRESS.KLADRCODE = addr["@KladrCode"];
            if (data.APP_REG_ADDRESS.KLADRCODE == 'null') data.APP_REG_ADDRESS.KLADRCODE="";
            data.APP_REG_ADDRESS.FLAT = addr["@Flat"];
            if (data.APP_ACT_ADDRESS.FLAT == 'null') data.APP_ACT_ADDRESS.FLAT="";
            data.APP_REG_ADDRESS.HOUSE = addr["@Home"];
            if (data.APP_ACT_ADDRESS.HOUSE == 'null') data.APP_ACT_ADDRESS.HOUSE="";
            data.APP_REG_ADDRESS.INDEX = addr["@Zip"];
            if (data.APP_REG_ADDRESS.INDEX == 'null') data.APP_REG_ADDRESS.INDEX="";
            regAddrDate = addr["@DTM"];
            if (addr["@Main"] == "Y") {
                regAddrFound = true;
            }
        }
    }
    if (addr["@Type"] == "12" )  {
        if (actAddrFound == false && addr["@DTM"]>actAddrDate) {
            data.APP_ACT_ADDRESS.UADID = addr["@UADId"];
            data.APP_ACT_ADDRESS.KLADRCODE = addr["@KladrCode"];
/*            if (data.APP_ACT_ADDRESS_ESTATETYPE != null) {
                data.APP_ACT_ADDRESS.ESTATETYPE = data.APP_ACT_ADDRESS_ESTATETYPE; // одинаковый для всех, Тоня капризная баба
            }
*/
            if (data.APP_ACT_ADDRESS.KLADRCODE == 'null') data.APP_ACT_ADDRESS.KLADRCODE="";
            data.APP_ACT_ADDRESS.FLAT = addr["@Flat"];
            if (data.APP_ACT_ADDRESS.FLAT == 'null') data.APP_ACT_ADDRESS.FLAT="";
            data.APP_ACT_ADDRESS.HOUSE = addr["@Home"];
            if (data.APP_ACT_ADDRESS.HOUSE == 'null') data.APP_ACT_ADDRESS.HOUSE="";
            data.APP_ACT_ADDRESS.INDEX = addr["@Zip"];
            if (data.APP_ACT_ADDRESS.INDEX == 'null') data.APP_ACT_ADDRESS.INDEX="";
            actAddrDate = addr["@DTM"];
            if (addr["@Main"] == "Y") {
                actAddrFound = true;
            }
        }
    }
}

if (regAddrFound || regAddrDate != "") {
    data.reg_addr_found=true;
}

if (actAddrFound || actAddrDate != "") {
    data.act_addr_found=true;
}

if (data.reg_addr_found && data.act_addr_found && data.APP_ACT_ADDRESS.UADID == data.APP_REG_ADDRESS.UADID) {
    data.APP_ACT_ADDRESS_REG_EQUAL="Y";
} else {
    data.APP_ACT_ADDRESS_REG_EQUAL="N";
}

/****************END*******************/
console.log(data);