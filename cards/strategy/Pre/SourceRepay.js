var _MIN_PRIORITY = 100;
var _priokey = new Array();
var _priovalue = new Array();
var type_card = new Array('W','W_F','W_T','L');

var daysAfter, limitAmount, limitForFlag;
var natCurr = 'UAH';

function prioInit(){
    _priokey.push('SALARY');    _priovalue.push(1);
    _priokey.push('PENSION');   _priovalue.push(1);

    _priokey.push('W');         _priovalue.push(3);
    _priokey.push('W_F');       _priovalue.push(3);
    _priokey.push('W_T');       _priovalue.push(3);

    _priokey.push('L');         _priovalue.push(4);
    _priokey.push('CALCUL');    _priovalue.push(5);
    _priokey.push('P');         _priovalue.push(6);
    _priokey.push('GRANT');     _priovalue.push(7);
    _priokey.push('S');         _priovalue.push(8);
    _priokey.push('MANUAL');    _priovalue.push(9);
    _priokey.push('B');         _priovalue.push(10);
    _priokey.push('M');         _priovalue.push(11);
    _priokey.push('O');         _priovalue.push(12);
}

function getPriority(key) {
    var i;
    if (_priokey.indexOf(key) != -1){
        i= _priovalue[_priokey.indexOf(key)];
        return i;
    }
    else {
        _MIN_PRIORITY +=1;
        return _MIN_PRIORITY;
    }
}


function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

/*===========================================*/
var daysAfter = 30;
var limitAmount = 100;
var limitForFlag = 2000;
var natCurr = 'UAH';

var maxINCOME_01 = 0;
var maxPriority = _MIN_PRIORITY;
var DEBCARD_TYPE_CARD='';
var DEBCARD_PAN='';
var DEBCARD_DATE_START;
var currPriority, INCOME_01, RES_DEBCARD_X_SRED;
data['RES_DEBCARD_POGASHENIE'] = '';
data['RES_DEBCARD_POGASH_TYPE'] = '';
data['LOCAL_PAN_FLAG'] = 'N';
data['LOCAL_INCOME_01'] = new Array();

for (var i=0; i<data.DATA_DEBCARD.length; i++) {
    if (data['PROD_CHAR_BANK'] == 'AB') {
        if (data.DATA_DEBCARD[i].C01 != undefined) {
            data['LOCAL_INCOME_01'].push(data.DATA_DEBCARD[i].C01);
        }
        else {
            data['LOCAL_INCOME_01'].push(0);
        }
    }
    else {
        if (data.DATA_DEBCARD[i].Z01 != undefined) {
            data['LOCAL_INCOME_01'].push(data.DATA_DEBCARD[i].Z01);
        }
        else {
            data['LOCAL_INCOME_01'].push(0);
        }
    }
}

prioInit();


if (natCurr == data['PROD_GOAL_CARD_CCY']){
    maxPriority = getPriority(data['PROD_SETTING_PACKAGE']);
    if (maxPriority != _MIN_PRIORITY){
        data['RES_DEBCARD_POGASHENIE'] = data['PROD_APP_MAINPAN'];
    }
}
/*если не получили самый высокий приоритет, и вытянули значения из словаря, то ищем дальше*/
if (maxPriority != 1) {
    /*с оборотом*/
    for (var i=0; i< data['DATA_DEBCARD'].length; i++){
        DEBCARD_TYPE_CARD = data['DATA_DEBCARD'][i]['TYPE_CARD'];
        currPriority = getPriority(DEBCARD_TYPE_CARD);

        if (data['DATA_DEBCARD'][i]['ACTIVE'] == 'Y' && data['DATA_DEBCARD'][i]['CCY'] == natCurr && currPriority <= maxPriority){
            INCOME_01 = data.LOCAL_INCOME_01[i];
            DEBCARD_PAN = data['DATA_DEBCARD'][i]['PAN'];
            if (INCOME_01 > maxINCOME_01){
                maxINCOME_01 = INCOME_01;
                if (INCOME_01 >= limitAmount){
                    maxPriority = currPriority;
                    data['RES_DEBCARD_POGASHENIE'] = DEBCARD_PAN;
                    data['RES_DEBCARD_POGASH_TYPE'] = DEBCARD_TYPE_CARD;
                }
            }
            DEBCARD_DATE_START = Datediff (data['DATA_DEBCARD'][i]['DATE_START']);
            if (data['RES_DEBCARD_POGASHENIE'] == '' && DEBCARD_DATE_START < daysAfter){
                maxPriority = currPriority;
                data['RES_DEBCARD_POGASHENIE'] = DEBCARD_PAN;
                data['RES_DEBCARD_POGASH_TYPE'] = DEBCARD_TYPE_CARD;
            }
        }
    }
    /*без оборота */
    if (maxPriority == _MIN_PRIORITY){
        for (i=0; i< data['DATA_DEBCARD'].length; i++){
            currPriority = getPriority(data['DATA_DEBCARD'][i]['TYPE_CARD']);
            if (data['DATA_DEBCARD'][i]['ACTIVE'] == 'Y' && data['DATA_DEBCARD'][i]['CCY'] == natCurr && currPriority <= maxPriority){
                DEBCARD_PAN = data['DATA_DEBCARD'][i]['PAN'];
                maxPriority = currPriority;
                data['RES_DEBCARD_POGASHENIE'] = DEBCARD_PAN;
                data['RES_DEBCARD_POGASH_TYPE'] = DEBCARD_TYPE_CARD;
            }
        }
    }
}
/*расчёт LOCAL_PAN_FLAG*/
for (i=0; i< data['DATA_DEBCARD'].length; i++){
    if (data['LOCAL_PAN_FLAG'] == 'N' && data['DATA_DEBCARD'][i]['ACTIVE'] == 'Y' && data['DATA_DEBCARD'][i]['CCY'] == natCurr){
        DEBCARD_TYPE_CARD = data['DATA_DEBCARD'][i]['TYPE_CARD'];
        if (type_card.indexOf(DEBCARD_TYPE_CARD) !=-1){
            if (DEBCARD_TYPE_CARD == 'L'){
                RES_DEBCARD_X_SRED = data['RES_DEBCARD_P_SRED'];
            }
            else {
                RES_DEBCARD_X_SRED = data['RES_DEBCARD_Z_SRED'];
            }
            if (RES_DEBCARD_X_SRED >= limitForFlag){
                data['LOCAL_PAN_FLAG'] = 'Y';
            }
            DEBCARD_DATE_START = Datediff (data['DATA_DEBCARD'][i]['DATE_START']);
            if (DEBCARD_DATE_START < daysAfter){
                data['LOCAL_PAN_FLAG'] = 'Y';
            }
        }
    }
}

data.nodeName = 'SourceRepay';