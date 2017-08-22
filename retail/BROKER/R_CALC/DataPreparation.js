// JavaScript Document

function toDate(target) {
    if (typeof target == "string" && target.length == 24 && target.substr(4, 1) == "-" && target.substr(7, 1) == "-" && target.substr(10, 1) == "T" &&
        target.substr(13, 1) == ":" && target.substr(16, 1) == ":" && target.substr(19, 1) == "." && target.substr(23, 1) == "Z") {
        /*return new Date(target.substr(0, 10) + " " + target.substr(11, 8));*/
        return new Date(target);
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

data=convertToDate(data);

function Datediff(days_diff ){
    var dateOpen = days_diff; // дата на входе
    var today = Date.now();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24 * 30.5;
    var days = Math.round(diff / one_day);
    return days;
}

function Datediff_day (days_diff ){
    var dateOpen = days_diff; // дата на входе
    var today = Date.now();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}


function parseDateFormat (dateS){

    var date = dateS.split(' ');
    var parts = date[0].split('-');
    var month = parseInt(parts[1]);
    var date = parseInt(parts[0]);
    var year = parseInt(parts[2]);

    if (month <10){
        month = '0' + month;
    }

    if (date <10){
        date = '0' + date;
    }

    var d = year+'-'+month+'-'+date;

    var dateF = new Date(d);
    return dateF;
}


var stateO =  new Array('O','L','R','A','D');
var doneck = new Array ('UA6806','UA6828','UA6829','UA6833','UA6849','UA6852','UA6871','UA7595','UA6879','UA6807','UA6881','UA6889','UA6919','UA6932',
    'UA6933','UA6934','UA6948','UA6951','UA6956','UA6995','UA6996','UA7004','UA7007','UA7021','UA7025','UA7042','UA7057','UA7136','UA6869','UA6876','UA7428',
    'UA7002','UA8134','UA7902','UA7899','UA6817','UA6884','UA7973','UA6950','UA6851','UA7006','UA7228','UA6831','UA7003','UA6832','UA6916');
var lugansk = new Array ('UA17411',
    'UA17448','UA17422','UA17436','UA17442','UA17464','UA17449','UA17487','UA17412','UA17490','UA17495','UA17521','UA17522',
    'UA17537','UA17548','UA17549','UA18084','UA17493','UA18280','UA17494','UA18085','UA17536','UA17785','UA17840','UA17488',
    'UA18083','UA18174','UA18127','UA17489','UA18166','UA18411','UA17463','UA17420');

var card_type = new Array ('W','W_F','W_T','L');
var restr =   new Array('RS06','RS12','RS24','RS36');
var debcardType = new Array ('W','W_F','W_T');
var cardProduct = new Array ('UNI','UN_M','GOLD','GL_L');
var riskLogin = new Array (	'ZP240898DIV','CS191185MIO','DD111283SOV','HA210485VJI','HA200487FEM','TG130990KTT','TG010286MTB1','TG080480BVT','AB290486PVA','DD010489KKV',
    'ZP200889SDV1','K2070284GIJ','OD170692VAO','DO110988KAV','DO101091DTA');

//---------------------------------local-------------------------------------

data.LOCAL_INCOME_MONTHSALARY = Math.max(data.APP_INCOME_MONTHSALARY,0);
data.LOCAL_INCOME_OTHERSOURCE = Math.max(data.APP_INCOME_MONTHSALARY,0);


//---------------------------------------------------RES_AGE------------

var age = Datediff(data.APP_CUST_BIRTHDAY)/12;
data.RES_AGE = age.toFixed(2);

//----------------------------  -----------------Zarplatnik---------------

data.LOCAL_DEBCARD_FLAG = 'N';

for (var i=0; i<data.DATA_DEBCARD.length; i++) {
    if (debcardType.indexOf(data.DATA_DEBCARD[i].TYPE_CARD) != -1 && data.DATA_DEBCARD[i].ACTIVE =='Y' && data.DATA_DEBCARD[i].DATE_START != undefined) {
        if (Datediff_day(data.DATA_DEBCARD[i].DATE_START)>=30) {
            if (data.DATA_DEBCARD[i].Z01 > 500) {
                data.LOCAL_DEBCARD_FLAG = 'Y';
            }
        }
        else {
            data.LOCAL_DEBCARD_FLAG = 'Y';
        }
    }
}

//---------------------------------------------Special Customer--------------

data.LOCAL_GREEN_STRIPE = 'N';

if (data.APP_CUST_IMPORTANT == 'Y') {
    data.LOCAL_GREEN_STRIPE = 'Y';
    data.RES_DEC_AUTO = 'N';
}

//---------------------------------------Value Total---------------------------

data.LOCAL_SCHEME_VALUE_TOTAL = 0;

for (var i=0; i<data.PROD_SCHEME.length; i++) {
    if (data.PROD_SCHEME[i].QUANTITY == undefined) {
        data.PROD_SCHEME[i].QUANTITY = 1;
    }
    data.PROD_SCHEME[i].VALUE = Number(data.PROD_SCHEME[i].VALUE).toFixed(2);
    data.LOCAL_SCHEME_VALUE_TOTAL = data.LOCAL_SCHEME_VALUE_TOTAL + data.PROD_SCHEME[i].VALUE*data.PROD_SCHEME[i].QUANTITY;
}

//--------------------------------------Value Other Goodstype------------------

data.LOCAL_SCHEME_VALUE_OTHER = 0;

for (var i=0; i<data.PROD_SCHEME.length; i++) {
    if (data.PROD_SCHEME[i].GOODSTYPE == 'OTHER') {
        if (data.PROD_SCHEME[i].QUANTITY == undefined) {
            data.PROD_SCHEME[i].QUANTITY = 1;
        }
        data.LOCAL_SCHEME_VALUE_OTHER = data.LOCAL_SCHEME_VALUE_OTHER + data.PROD_SCHEME[i].VALUE*data.PROD_SCHEME[i].QUANTITY;
    }
}


//------------------------------------First Payment %--------------------------

data.RES_CHAR_ADVANCE_PRC = 0;

if (data.LOCAL_SCHEME_VALUE_TOTAL != 0) {
    data.LOCAL_FIRST_PAYM = data.PROD_CHAR_ADVANCEAMOUNT/data.LOCAL_SCHEME_VALUE_TOTAL *100
}

data.RES_CHAR_ADVANCE_PRC = data.LOCAL_FIRST_PAYM.toFixed(2);


//------------------------------------Loan Amount------------------------------

var value = data.LOCAL_SCHEME_VALUE_TOTAL;
var paym = 0.3;
var oneTimeFee = data.PROD_SCHEME_ONETIMEFEE;
if (data.PROD_SCHEME_INSURANCERATES_PRIVATE != undefined) {
    var insuaranceRate = data.PROD_SCHEME_INSURANCERATES_PRIVATE;
}
else {
    insuaranceRate = 1;
}
var term = data.PROD_SCHEME_TERM;

data.LOCAL_CHAR_LOANAMOUNT = (value - paym*value) * (1+oneTimeFee/100 ) + (value - paym*value) *  (1+oneTimeFee/100) * insuaranceRate/100 * term;

//---------------------------------Count of phones-----------------------

data.LOCAL_COUNT_OF_PHONES = 0

for (var i=0; i<data.PROD_SCHEME.length; i++) {
    if (data.PROD_SCHEME[i].QUANTITY == undefined) {
        data.PROD_SCHEME[i].QUANTITY = 1;
    }
    if (data.PROD_SCHEME[i].GOODSTYPE == 'MOB' && data.PROD_SCHEME[i].QUANTITY>0) {
        data.LOCAL_COUNT_OF_PHONES = data.LOCAL_COUNT_OF_PHONES + data.PROD_SCHEME[i].QUANTITY;
    }
}

//--------------------------------Type of Purpose----------------------

data.LOCAL_VALUE_MOB = 0;
data.LOCAL_SMARTPH_PRICE = 0;

for (var i=0; i<data.PROD_SCHEME.length; i++) {
    if (data.PROD_SCHEME[i].GOODSTYPE == 'MOB') {
        data.LOCAL_VALUE_MOB = data.LOCAL_VALUE_MOB + data.PROD_SCHEME[i].VALUE;
    }
    if (data.PROD_SCHEME[i].GOODSTYPE == 'SMARTPHN') {
        data.LOCAL_SMARTPH_PRICE = data.LOCAL_SMARTPH_PRICE + data.PROD_SCHEME[i].VALUE;
    }
    if (data.PROD_SCHEME[i].GOODSTYPE == 'NOUTE') {
        data.LOCAL_TYPE_PURPOSE = 'NOUTE';
    }
    if (data.PROD_SCHEME[i].GOODSTYPE == 'WINDOW') {
        data.LOCAL_TYPE_PURPOSE = 'WINDOW';
    }
}

if (data.LOCAL_SCHEME_VALUE_TOTAL !=0) {
    if (data.LOCAL_VALUE_MOB/data.LOCAL_SCHEME_VALUE_TOTAL *100>50) {
        data.LOCAL_TYPE_PURPOSE = 'MOB';
    }
    if (data.LOCAL_SMARTPH_PRICE/data.LOCAL_SCHEME_VALUE_TOTAL *100>50) {
        data.LOCAL_TYPE_PURPOSE = 'SMARTPHN';
    }
}

//-------------------------------Count of Smartphones-------------

data.LOCAL_COUNT_OF_SMARTPHONES = 0;

for (var i=0; i<data.PROD_SCHEME.length; i++) {
    if (data.PROD_SCHEME[i].QUANTITY == undefined) {
        data.PROD_SCHEME[i].QUANTITY = 1;
    }
    if (data.PROD_SCHEME[i].GOODSTYPE == 'SMARTPHN' && data.PROD_SCHEME[i].QUANTITY>0) {
        data.LOCAL_COUNT_OF_SMARTPHONES = data.LOCAL_COUNT_OF_SMARTPHONES + data.PROD_SCHEME[i].QUANTITY;
    }
}


//--------------------------------------------------------------------------

data.LOCAL_BODY_DELINQUENCY = 0;
data.LOCAL_PRC_DELINQUENCY = 0;
data.LOCAL_COUNT_ACTIVE_CREDITS = 0;
data.LOCAL_COUNT_2_MONTH_CRED = 0;
data.LOCAL_CRED_CARD_NO_PAYM='N';
data.LOCAL_OPEN_PEACH='N';
data.LOCAL_MOBILIZATION = 'N';
data.LOCAL_RESTRUCT = 'N';
data.LOCAL_LIMIT_OLD = 0;
data.LOCAL_LIMIT_OLD_CHECK = 'N';

if (data.DATA_CRED != undefined) {

    for (var i=0; i<data.DATA_CRED.length;i++) {
        if (data.DATA_CRED[i].PROS_CRED == undefined) {data.DATA_CRED[i].PROS_CRED = 0;}
        if (data.DATA_CRED[i].PROS_PRC == undefined) {data.DATA_CRED[i].PROS_PRC = 0;}
    }

    //-------------------------SUMM---------

    for (var i=0; i<data.DATA_CRED.length;i++) {
        data.LOCAL_BODY_DELINQUENCY += Math.abs(data.DATA_CRED[i].PROS_CRED);
        data.LOCAL_PRC_DELINQUENCY += Math.abs(data.DATA_CRED[i].PROS_PRC);
    }


    //---------------COUNT ACTIVE CREDITS-----------------------*/

    for (var i=0; i< data.DATA_CRED.length; i++){
        if (data.DATA_CRED[i].STATE == 'O' || data.DATA_CRED[i].STATE == 'L' || data.DATA_CRED[i].STATE =='R' || data.DATA_CRED[i].STATE == 'A' || data.DATA_CRED[i].STATE == 'D'){
            if (data.DATA_CRED[i].DLP == '' && data.DATA_CRED[i].TYPE != 'CRCR' && data.DATA_CRED[i].TYPE != 'CRCP'){
                if (Math.abs(data.DATA_CRED[i].BAL) != 0){
                    data.LOCAL_COUNT_ACTIVE_CREDITS ++;
                }
            }
            else {
                if (data.DATA_CRED[i].START_SUMM !== 0){
                    if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100 > 20){
                        data.LOCAL_COUNT_ACTIVE_CREDITS ++;
                    }
                }
            }
        }
    }

    //--------------------COUNT ACTIVE CREDITS 2 months--------

    for (var i=0; i< data.DATA_CRED.length; i++) {
        if (data.DATA_CRED[i].STATE == 'O' || data.DATA_CRED[i].STATE == 'L' || data.DATA_CRED[i].STATE == 'R' || data.DATA_CRED[i].STATE == 'A' || data.DATA_CRED[i].STATE == 'D') {
            day_d = Datediff_day(data.DATA_CRED[i].DATE_START);
            if (day_d != null && Math.abs(day_d)<60){
                if (data.DATA_CRED[i].START_SUMM != 0 && data.DATA_CRED[i].DLP !==''){
                    if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100 > 20){
                        data.LOCAL_COUNT_2_MONTH_CRED ++;
                    }
                }
            }
        }
    }

    /*---------------------------------------------Credit card no payment-----------------------------------*/
    for (var i=0; i< data.DATA_CRED.length; i++) {
        if (data.DATA_CRED[i].STATE == 'O' || data.DATA_CRED[i].STATE == 'L' || data.DATA_CRED[i].STATE == 'R' || data.DATA_CRED[i].STATE == 'A' || data.DATA_CRED[i].STATE == 'D') {
            if (data.DATA_CRED[i].DLP!=undefined && data.DATA_CRED[i].DLP == ''){
                if (data.DATA_CRED[i].PRODUCT != 'CASS' && data.DATA_CRED[i].PRODUCT != 'NOTR'){
                    day_d = Datediff_day(data.DATA_CRED[i].DATE_GIVEN);
                    if (day_d !== null && Math.abs(day_d)<90){
                        if (data.DATA_CRED[i].LIMIT >0 && data.DATA_CRED[i].BAL <0 && data.DATA_CRED[i].TR_PAY <2 && data.DATA_CRED[i].TR_PAY != 0){
                            if (data.DATA_CRED[i].CR_PAY/data.DATA_CRED[i].TR_PAY <= data.DATA_CRED[i].LIMIT*0.07){
                                data.LOCAL_CRED_CARD_NO_PAYM = 'Y';
                            }
                        }
                    }
                }
            }
        }
    }

//----------------------------------Cred pros calculation--------------------

    data.LOCAL_HAS_DELINQUENCY = 'N';

    for (var i=0; i< data.DATA_CRED.length; i++) {
        if (Datediff_day(data.DATA_CRED[i].DATE_START)>=30  && data.DATA_CRED[i].DATE_START != undefined) {
            if ((data.DATA_CRED[i].DAYS_CRED>=7 || data.DATA_CRED[i].DAYS_PRC>=7) && Math.abs(data.DATA_CRED[i].PROS_CRED + data.DATA_CRED[i].PROS_PRC)>50) {
                data.LOCAL_HAS_DELINQUENCY = 'Y';
            }
        }
        else {
            if ((data.DATA_CRED[i].DAYS_CRED>=0 || data.DATA_CRED[i].DAYS_PRC>=0) && Math.abs(data.DATA_CRED[i].PROS_CRED + data.DATA_CRED[i].PROS_PRC)>0) {
                data.LOCAL_HAS_DELINQUENCY = 'Y';
            }
        }
    }

    //-----------------------------------mobilization----


    for (var i=0; i<data.DATA_CRED.length;i++) {
        if (data.DATA_CRED[i].REFERENC != undefined) {
            if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1 && ['BOEC','BOEG'].indexOf(data.DATA_CRED[i].TYPE) != -1) {
                data.LOCAL_MOBILIZATION = 'Y';
            }
        }
    }

    //---------------------------------- LIMIT OLD ------------------------------


    for (var i=0; i<data.DATA_CRED.length;i++) {
        if (cardProduct.indexOf(data.DATA_CRED[i].PRODUCT) != -1) {
            if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1 && (data.DATA_CRED[i].LIMIT>0 || data.DATA_CRED[i].LIMIT_PREVIOUS>0)) {
                data.LOCAL_LIMIT_OLD_CHECK = 'Y';
                data.LOCAL_LIMIT_OLD = Math.max(data.LOCAL_LIMIT_OLD,data.DATA_CRED[i].LIMIT,data.DATA_CRED[i].LIMIT_PREVIOUS);
            }
            if (Datediff(data.DATA_CRED[i].DATECLOS_F)<6 && data.DATA_CRED[i].LIMIT_PREVIOUS>0) {
                data.LOCAL_LIMIT_OLD_CHECK = 'Y';
                data.LOCAL_LIMIT_OLD = Math.max(data.LOCAL_LIMIT_OLD,data.DATA_CRED[i].LIMIT,data.DATA_CRED[i].LIMIT_PREVIOUS);
            }
        }
    }


    //--------------------------------------------------- Restruct -------


    for (var i=0; i<data.DATA_CRED.length;i++) {
        if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1) {
            if (restr.indexOf(data.DATA_CRED[i].TYPE)!=-1){
                if (Math.abs(data.DATA_CRED[i].BAL)>50) {
                    data.LOCAL_RESTRUCT = 'Y';
                }
            }
        }
    }

}

//---------------------------------------Risk logins-------------------------

data.LOCAL_RISK_LOGINS = '';

if (data.PROD_EMPL_LDAP_EXECUTIVE != undefined) {
    data.PROD_EMPL_LDAP_EXECUTIVE = data.PROD_EMPL_LDAP_EXECUTIVE.toUpperCase();

    if (riskLogin.indexOf(data.PROD_EMPL_LDAP_EXECUTIVE) != -1) {
        data.LOCAL_RISK_LOGINS = 'Y';
    }
}
//----------------------------------------Deposit analisys-----------------------------------------------------------------------------------------

data.RES_DEPOZIT_ACTIVE = 'N';
data.RES_DEPOZIT_TOTAL = 0;

for (var i=0; i< data.DATA_DEPOSIT.length; i++) {
    if (data.DATA_DEPOSIT[i].REFERENC!= undefined) {
        data.RES_DEPOZIT_ACTIVE = 'Y';
        data.RES_DEPOZIT_TOTAL += data.DATA_DEPOSIT[i].BAL
    }
}

//---------------------------------------------Ubki history-------------------

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

//------------------------------for black list--------------------------------

data.LOCAL_BLCL_CONTROL_CL = '';

if (data.LOCAL_BLCL_CONTROL != undefined) {
    if (data.LOCAL_BLCL_CONTROL.indexOf('ZPD') != -1) {
        data.LOCAL_BLCL_CONTROL_CL = 'ZPD'
    }
    if (data.LOCAL_BLCL_CONTROL.indexOf('ZPDO') != -1) {
        data.LOCAL_BLCL_CONTROL_CL = 'ZPDO'
    }
    if (data.LOCAL_BLCL_CONTROL.indexOf('ZPDO2') != -1) {
        data.LOCAL_BLCL_CONTROL_CL = 'ZPDO2'
    }
}

//-------------------------------------------------BLOKPO------------------------------------------------------------------------***/
if (data.DATA_PERSLINK != undefined) {
    for (var i = 0; i < data.DATA_PERSLINK.length; i++) {
        if (data.DATA_PERSLINK[i].CUST_ID == data.APP_CUST_ID) {
            if (data.DATA_PERSLINK[i].CUST_ID == data.APP_CUST_ID && data.DATA_PERSLINK[i].BLOKPO_ZONE == 'R') {
                data.LOCAL_BLOKPO = 'Y';
                break;
            }
        }
    }
}

//------------------------------vostok-------------
data.LOCAL_DONBASS_EXCLUDES = 'N';
data.LOCAL_CRED_HIST_VOSTOK = 'N';
data.LOCAL_DONBASS = 'N';

if (lugansk.indexOf(data.APP_ACT_ADDRESS.ID_REGION) != -1 || lugansk.indexOf(data.APP_REG_ADDRESS.ID_REGION) != -1 ||
    doneck.indexOf(data.APP_ACT_ADDRESS.ID_REGION) != -1 || doneck.indexOf(data.APP_REG_ADDRESS.ID_REGION) != -1
)
{
    data.LOCAL_DONBASS = 'Y';
}

if (data.LOCAL_DONBASS == 'Y') {
    for (var i=0; i<data.DATA_DEBCARD.length; i++) {
        if (card_type.indexOf(data.DATA_DEBCARD[i].TYPE_CARD) != -1 && data.DATA_DEBCARD[i].ACTIVE =='Y' && data.DATA_DEBCARD[i].DATE_START != undefined) {
            if (Datediff_day(data.DATA_DEBCARD[i].DATE_START)>=30) {
                if ((data.DATA_DEBCARD[i].Z01 > 500 && data.DATA_DEBCARD[i].Z02 > 500) || (data.DATA_DEBCARD[i].Z01 > 500 && data.DATA_DEBCARD[i].Z03 > 500) ||
                    (data.DATA_DEBCARD[i].Z02 > 500 && data.DATA_DEBCARD[i].Z03 > 500) ) {
                    data.LOCAL_DONBASS_EXCLUDES = 'Y';
                }
            }
        }
    }
    if (data.RES_DEPOZIT_ACTIVE == 'Y' && data.RES_DEPOZIT_TOTAL>5000) {
        data.LOCAL_DONBASS_EXCLUDES = 'Y';
    }

    var datDifClose ;
    var one_mnth = 1000 * 60 * 60 * 24 * 30.5;

    if (data.DATA_CRED != undefined){
        for(var i=0;i<data.DATA_CRED.length;i++){
            if (data.DATA_CRED[i].DLP != undefined && data.DATA_CRED[i].DLP !=''){
                if (["C","Z","K"].indexOf(data.DATA_CRED[i].STATE) != -1){
                    datDifClose = Datediff(data.DATA_CRED[i].DATECLOS_F);
                    if (datDifClose/30<24 && Date(data.DATA_CRED[i].DATECLOS_F)>Date(data.DATA_CRED[i].START)){
                        var closeDay = Date(data.DATA_CRED[i].DATECLOS_F);
                        var startDay = Date(data.DATA_CRED[i].START);
                        var localCredMediumTerm =Math.round(Math.abs(closeDay - startDay)/one_mnth);
                        if (localCredMediumTerm>0 && data.DATA_CRED[i].START_SUMM > 2000){
                            var localCredMediumPayment = data.DATA_CRED[i].START_SUMM/localCredMediumTerm;
                            if (localCredMediumTerm>=3 && localCredMediumPayment>=100){
                                data.LOCAL_CRED_HIST_VOSTOK = 'Y';
                            }
                        }
                    }

                }
                else{
                    if (data.DATA_CRED[i].STATE!= undefined && data.DATA_CRED[i].STATE!= ''){
                        var localCredActualyTerm =Datediff(data.DATA_CRED[i].START);
                        localCredActualyTerm = localCredActualyTerm/30;
                        if(localCredActualyTerm>0 && (data.DATA_CRED[i].START_SUMM - Math.abs(data.DATA_CRED[i].BAL))>2000){
                            var localCredMediumPayment = data.DATA_CRED[i].START_SUMM/localCredActualyTerm;
                            if(localCredActualyTerm>=7 && localCredMediumPayment>=100){
                                data.LOCAL_CRED_HIST_VOSTOK = 'Y';
                            }
                        }
                    }
                }
            }
            else{
                if (["O","L","R","A","D"].indexOf(data.DATA_CRED[i].STATE) != -1){
                    //if (data.DATA_CRED[i].LIMIT >= 500){
                        var localCredMediumTerm = Math.abs(data.DATA_CRED[i].TR_PAY);
                        if (localCredMediumTerm>=6 && data.DATA_CRED[i].CR_PAY>=2000){
                            data.LOCAL_CRED_HIST_VOSTOK = 'Y';
                        }
                    //}

                }
            }
        }
    }
}


//--------------------------------------oborot-----

if (data.DATA_OB_ALL != undefined && data.DATA_OB_ALL >0) {
    for (var i=0; i<data.DATA_CRED.length;i++) {
        if (data.DATA_CRED[i].DLP != undefined && ['L2F','LOF'].indexOf(data.DATA_CRED[i].DLP) != -1) {
            data.DATA_OB_ALL = (data.DATA_OB_ALL - Math.max(data.DATA_CRED[i].BAL,data.DATA_CRED[i].LIMIT))*0.05
        }
    }
}

//-----------------------------------min cred cards limit----------------------------------------------

data.LOCAL_CRED_MIN_CARD_LIMIT = 'N';

for (var i=0; i< data.DATA_CRED.length; i++) {
    if (cardProduct.indexOf (data.DATA_CRED[i].PRODUCT) != -1) {
        if (stateO.indexOf (data.DATA_CRED[i].STATE) != -1) {
            if (data.DATA_CRED[i].LIMIT>300) {
                data.LOCAL_CRED_MIN_CARD_LIMIT = 'Y';
            }
        }
    }
}

//-------------------------------active rassr < 1moth----------------------------

data.LOCAL_CRED_RASSR = 0;
if (data.DATA_LOANS != undefined){
    for (var i=0; i<data.DATA_LOANS.length; i++){
        var dateCreate = parseDateFormat(data.DATA_LOANS[i].creationDate);
        dateCreate = Datediff_day(dateCreate);

        if (dateCreate <30){
            data.LOCAL_CRED_RASSR = 1;
        }
        else {
            if (dateCreate >= 30 && dateCreate <60) {
                data.LOCAL_CRED_RASSR = 2;

            }
        }
    }
}



