// JavaScript Document

function Datediff(days_diff ){
    var dateOpen = days_diff; // дата на входе
    var today = Date.now();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24 * 30.5;
    var days = diff / one_day;
    days = days.toFixed(2);
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

var stateO =  new Array('O','L','R','A','D');
var restr =   new Array('RS06','RS12','RS24','RS36');
var product = new Array('GIL','CASH','PERS','FACH');
var dlp =     new Array ('LG1','LG2','LGS');
var doneck = new Array ('UA6806','UA6828','UA6829','UA6833','UA6849','UA6852','UA6871','UA7595','UA6879','UA6807','UA6881','UA6889','UA6919','UA6932',
    'UA6933','UA6934','UA6948','UA6951','UA6956','UA6995','UA6996','UA7004','UA7007','UA7021','UA7025','UA7042','UA7057','UA7136','UA6869','UA6876','UA7428',
    'UA7002','UA8134','UA7902','UA7899','UA6817','UA6884','UA7973','UA6950','UA6851','UA7006','UA7228','UA6831','UA7003','UA6832','UA6916');
var lugansk = new Array ('UA17411',
    'UA17448','UA17422','UA17436','UA17442','UA17464','UA17449','UA17487','UA17412','UA17490','UA17495','UA17521','UA17522',
    'UA17537','UA17548','UA17549','UA18084','UA17493','UA18280','UA17494','UA18085','UA17536','UA17785','UA17840','UA17488',
    'UA18083','UA18174','UA18127','UA17489','UA18166','UA18411','UA17463','UA17420');

var card_type = new Array ('W','W_F','W_T','L');

data.LOCAL_INCOME_MONTHSALARY = 0;
data.LOCAL_INCOME_MONTHSALARY = data.APP_INCOME_MONTHSALARY_EXT;

data.LOCAL_INCOME_OTHERSOURCE = 0;
data.LOCAL_INCOME_OTHERSOURCE = data.APP_INCOME_OTHERSOURCE_EXT;

if (data.DATA_OB_ALL == undefined) {data.DATA_OB_ALL = 0;}

if (data.DATA_TRELCLIENTS_LIM_60_GOOD_CL == undefined) {data.LOCAL_TRELCLIENTS_MAX_LIM_GOOD_CL = 0;}
else {data.LOCAL_TRELCLIENTS_MAX_LIM_GOOD_CL = data.DATA_TRELCLIENTS_LIM_60_GOOD_CL}

//------------------------------------------------

for (var i=0; i<data.DATA_CRED.length;i++) {
    if (data.DATA_CRED[i].PROS_CRED == undefined) {data.DATA_CRED[i].PROS_CRED = 0;}
    if (data.DATA_CRED[i].PROS_PRC == undefined) {data.DATA_CRED[i].PROS_PRC = 0;}
}


//---------------------------------------------------RES_AGE------------

var age = Datediff(data.APP_CUST_BIRTHDAY)/12
data.RES_AGE = age.toFixed(2);

//----------------------------------------------EMPL_Experience---------

data.LOCAL_EXP = Datediff(data.APP_EMPL_TIMEEMPL_DATE);

//--------------------------------------------------First Payment %-------------------------------------------------
data.LOCAL_CAR_VALUE_EXT = 0;
data.RES_CHAR_ADVANCE_PRC = 0;

data.LOCAL_CAR_VALUE_EXT = data.APP_PROPERTY_CAR_VALUE_EXT + data.APP_PROPERTY_CAR_EXPENSES_EXT;

if (data.LOCAL_CAR_VALUE_EXT!=0) {
    data.LOCAL_FIRST_PAYM = (data.PROD_CHAR_ADVANCEAMOUNT_EXT/data.LOCAL_CAR_VALUE_EXT*100).toFixed(2);
}
data.RES_CHAR_ADVANCE_PRC = Math.round(data.LOCAL_FIRST_PAYM);

//-------------------------------------------------------SUMM---------
data.LOCAL_BODY_DELINQUENCY = 0;
data.LOCAL_PRC_DELINQUENCY = 0;

for (var i=0; i<data.DATA_CRED.length;i++) {
    data.LOCAL_BODY_DELINQUENCY += Math.abs(data.DATA_CRED[i].PROS_CRED);
    data.LOCAL_PRC_DELINQUENCY += Math.abs(data.DATA_CRED[i].PROS_PRC);
}

//--------------------------------------------------- Restruct ----------------------------------------------------------

data.LOCAL_RESTRUCT = 'N';

for (var i=0; i<data.DATA_CRED.length;i++) {
    if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1) {
        if (restr.indexOf(data.DATA_CRED[i].TYPE)!=-1){
            if (Math.abs(data.DATA_CRED[i].BAL)>50) {
                data.LOCAL_RESTRUCT = 'Y';
            }
        }
    }
}

//------------------------------COUNT ACTIVE CREDITS-----------------------------------------------------*/
data.LOCAL_COUNT_ACTIVE_CREDITS = 0;
data.LOCAL_SUM_ACTIVE_CREDITS = 0;

for (var i=0; i< data.DATA_CRED.length; i++){
    if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1) {
        if (product.indexOf(data.DATA_CRED[i].PRODUCT)!=-1 || (data.DATA_CRED[i].PRODUCT == 'AVTO' && data.DATA_CRED[i].BRANCH != 'AB1A')){
            if (Math.abs(data.DATA_CRED[i].START_SUMM) != 0){
                if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100>20) {
                    data.LOCAL_COUNT_ACTIVE_CREDITS ++;
                }
            }
        }
        else {
            if (data.DATA_CRED[i].PRODUCT == 'RAS'){
                if (Math.abs(data.DATA_CRED[i].START_SUMM) != 0) {
                    if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100>20) {
                        data.LOCAL_SUM_ACTIVE_CREDITS += data.DATA_CRED[i].START_SUMM;
                    }
                }
            }
        }
    }
}

if (data.LOCAL_SUM_ACTIVE_CREDITS>20000) {
    data.LOCAL_COUNT_ACTIVE_CREDITS += 1;
}
data.LOCAL_COUNT_ACTIVE_CREDITS += data.LOCAL_CRED_COUNT_FOREIGN;

//--------------------COUNT ACTIVE CREDITS 2 months---------------------------------------------------------

data.LOCAL_COUNT_2_MONTH_CRED = 0;

for (var i=0; i< data.DATA_CRED.length; i++){
    if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1){
        if (Datediff(data.DATA_CRED[i].DATE_START)<3 && data.DATA_CRED[i].DATE_START!=undefined) {
            if (dlp.indexOf(data.DATA_CRED[i].DLP)==-1) {
                if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100>20) {
                    if (data.DATA_CRED[i].START_SUMM>20000) {
                        data.LOCAL_COUNT_2_MONTH_CRED +=1;
                    }
                }
            }
        }
        else {
            if (Datediff(data.DATA_CRED[i].DATE_START)<7 && data.DATA_CRED[i].DATE_START!=undefined) {
                if (data.DATA_CRED[i].PRODUCT == 'AVTO') {
                    data.LOCAL_COUNT_2_MONTH_CRED +=1;
                }
            }
        }
    }
}

//----------------------------------------Deposit analisys-----------------------------------------------------------------------------------------

data.RES_DEPOZIT_ACTIVE = 'N';
data.RES_DEPOZIT_TOTAL = 0;

for (var i=0; i< data.DATA_DEPOSIT.length; i++) {
    if (data.DATA_DEPOSIT[i].REFERENC!= undefined) {
        data.RES_DEPOZIT_ACTIVE = 'Y'
    }
    data.RES_DEPOZIT_TOTAL += data.DATA_DEPOSIT[i].BAL
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
                if (data.DATA_DEBCARD[i].Z01 > 1000 && data.DATA_DEBCARD[i].Z02 > 1000 && data.DATA_DEBCARD[i].Z03 > 1000) {
                    data.LOCAL_DONBASS_EXCLUDES = 'Y';
                }
            }
        }
    }
    if (data.RES_DEPOZIT_ACTIVE == 'Y' && data.RES_DEPOZIT_TOTAL>10000) {
        data.LOCAL_DONBASS_EXCLUDES = 'Y';
    }
}
//--------------------------------------------------------------------

data.RES_SCHEME_TERM = data.PROD_SCHEME_TERM;

//-----------------------------------mobilization----

data.LOCAL_MOBILIZATION = 'N';

for (var i=0; i<data.DATA_CRED.length;i++) {
    if (data.DATA_CRED[i].REFERENC != undefined) {
        if (stateO.indexOf(data.DATA_CRED[i].STATE)!=-1 && ['BOEC','BOEG'].indexOf(data.DATA_CRED[i].TYPE) != -1) {
            data.LOCAL_MOBILIZATION = 'Y';
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