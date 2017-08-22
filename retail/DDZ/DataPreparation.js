// JavaScript Document

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

var stateO =  new Array('O','L','R','A','D');
var restr =   new Array('RS06','RS12','RS24','RS36');
var product = new Array('AVTO','GIL','CASH','PERS','FACH');
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



//---------------------------------------------------RES_AGE------------

var age = Datediff(data.APP_CUST_BIRTHDAY)/12
data.RES_AGE = age.toFixed(2);

//----------------------------------------------EMPL_Experience---------

data.LOCAL_EXP = Datediff(data.APP_EMPL_TIMEEMPL_DATE);




data.LOCAL_BODY_DELINQUENCY = 0;
data.LOCAL_PRC_DELINQUENCY = 0;
data.LOCAL_COUNT_ACTIVE_CREDITS = 0;
data.LOCAL_COUNT_2_MONTH_CRED = 0;
data.LOCAL_CRED_CARD_NO_PAYM='N';
data.LOCAL_OPEN_PEACH='N';
data.LOCAL_MOBILIZATION = 'N';
data.LOCAL_RESTRUCT = 'N';

if (data.DATA_CRED != undefined) {

    for (var i=0; i<data.DATA_CRED.length;i++) {
        if (data.DATA_CRED[i].PROS_CRED == undefined) {data.DATA_CRED[i].PROS_CRED = 0;}
        if (data.DATA_CRED[i].PROS_PRC == undefined) {data.DATA_CRED[i].PROS_PRC = 0;}
    }

    //-------------------------------------------------------SUMM---------

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
            if (day_d != null && Math.abs(day_d)<90){
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

    /*--------------------------------------------Open Peach---------------------------------------*/
    for (var i=0; i<data.DATA_CRED.length; i++){
        if (data.DATA_CRED[i].STATE == 'O' || data.DATA_CRED[i].STATE == 'L' || data.DATA_CRED[i].STATE == 'R' || data.DATA_CRED[i].STATE == 'A' || data.DATA_CRED[i].STATE == 'D') {
            if (Math.abs(data.DATA_CRED[i].BAL) >0) {
                if (  (['PERS','FACH'].indexOf(data.DATA_CRED[i].PRODUCT) != -1 &&
                    (data.DATA_CRED[i].TYPE.substr(0,2) == 'PP' || data.DATA_CRED[i].TYPE.substr(0,2) == 'PA' || data.DATA_CRED[i].TYPE == 'CRB1')
                    ) ||
                    (data.DATA_CRED[i].DLP == 'LFZ' && (data.DATA_CRED[i].TYPE == 'CT' || data.DATA_CRED[i].TYPE == 'CE'))
                )
                {
                    data.LOCAL_OPEN_PEACH='Y';
                }
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

//----------------------------------------Deposit analisys-----------------------------------------------------------------------------------------

data.RES_DEPOZIT_ACTIVE = 'N';
data.RES_DEPOZIT_TOTAL = 0;

for (var i=0; i< data.DATA_DEPOSIT.length; i++) {
    if (data.DATA_DEPOSIT[i].REFERENC!= undefined) {
        data.RES_DEPOZIT_ACTIVE = 'Y'
        data.RES_DEPOZIT_TOTAL += data.DATA_DEPOSIT[i].BAL
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


//--------------------------------------oborot-----

if (data.DATA_OB_ALL != undefined && data.DATA_OB_ALL >0) {
    for (var i=0; i<data.DATA_CRED.length;i++) {
        if (data.DATA_CRED[i].DLP != undefined && ['L2F','LOF'].indexOf(data.DATA_CRED[i].DLP) != -1) {
            data.DATA_OB_ALL = (data.DATA_OB_ALL - Math.max(data.DATA_CRED[i].BAL,data.DATA_CRED[i].LIMIT))*0.05
        }
    }
}