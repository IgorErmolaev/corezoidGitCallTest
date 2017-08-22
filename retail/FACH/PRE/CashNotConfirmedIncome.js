var branch1= new Array('HE','HM','KR','LG','MK','RO','ZP','IF','PL','VI');
var branch2= new Array('CS','DO','LV','NK','DN','HA','MR','SI','TE','OD','SE');
var branch3= new Array('KI','K5','K2','K3','K4');

var activity1 = new Array('EDUCAT','MEDIC','COMMUN','MILIT','');
var activity2 = new Array('PUBLIC','AGRICUL','FOOD','MECHAN','METALL','BANK','SERV');
var activity3 = new Array('IT','LOWYER','TOURISM','REALEST');


data.LOCAL_DISP_SCORE_TABLE = 7.96553;

if (data.PROD_CHAR_BRANCH!= undefined && branch1.indexOf(data.PROD_CHAR_BRANCH.substr(1,2))!= -1) {
    data.LOCAL_DISP_SCORE_TABLE += 0.06316;
}
else {
    if (data.PROD_CHAR_BRANCH!= undefined && branch2.indexOf(data.PROD_CHAR_BRANCH.substr(1,2))!= -1){
        data.LOCAL_DISP_SCORE_TABLE +=  0.19874;
    }
    else {
        if (data.PROD_CHAR_BRANCH!= undefined && branch3.indexOf(data.PROD_CHAR_BRANCH.substr(1,2))!= -1) {
            data.LOCAL_DISP_SCORE_TABLE += 0.54087;
        }
    }
}

/***--------------------------------------------------------------------------------------------****/


if (data.APP_EMPL_RANK == 'WORKER' || data.APP_EMPL_RANK == undefined || data.APP_EMPL_RANK == '') {
    data.LOCAL_DISP_SCORE_TABLE += - 0.41995;
}
/***--------------------------------------------------------------------------------------------****/
if (activity1.indexOf(data.APP_EMPL_ACTIVITY) != -1){
    data.LOCAL_DISP_SCORE_TABLE +=- 0.20778;
}
else {
    if (activity2.indexOf(data.APP_EMPL_ACTIVITY) != -1 ){
        data.LOCAL_DISP_SCORE_TABLE += - 0.09613;
    }
    else {
        if (activity3.indexOf(data.APP_EMPL_ACTIVITY) != -1) {
            data.LOCAL_DISP_SCORE_TABLE += 0.07827;
        }
    }
}
/***--------------------------------------------------------------------------------------------****/

if (data.APP_CUST_GENDER == 'M' ) {
    data.LOCAL_DISP_SCORE_TABLE += 0.30246;
}
/***--------------------------------------------------------------------------------------------****/
if (data.APP_ACT_ADDRESS.SUBTOWN == 'TOWN') {
    data.LOCAL_DISP_SCORE_TABLE += 0.08628;
}
/***--------------------------------------------------------------------------------------------****/

if (data.RES_AGE >=16 && data.RES_AGE<21){
    data.LOCAL_DISP_SCORE_TABLE += -0.27069;
}
else {
    if (data.RES_AGE >=21 && data.RES_AGE<26){
        data.LOCAL_DISP_SCORE_TABLE += -0.08308;
    }
    else {
        if (data.RES_AGE >=26 && data.RES_AGE<44){
            data.LOCAL_DISP_SCORE_TABLE += 0.05768;
        }
        else {
            if (data.RES_AGE >=44 && data.RES_AGE<50){
                data.LOCAL_DISP_SCORE_TABLE += 0.03159;
            }
            else {
                data.LOCAL_DISP_SCORE_TABLE += -0.27069;
            }
        }
    }
}

/***--------------------------------------------------------------------------------------------****/

if (data.APP_EMPL_ORGTYPE == 'PRIVATE'){
    data.LOCAL_DISP_SCORE_TABLE += -0.23984;
}
else {
    if (data.APP_EMPL_ORGTYPE == 'STATE'){
        data.LOCAL_DISP_SCORE_TABLE += -0.32168;
    }
    else {
        if (data.APP_EMPL_ORGTYPE == 'BUSINESS'){
            data.LOCAL_DISP_SCORE_TABLE += -0.17253;
        }
        else {
            data.LOCAL_DISP_SCORE_TABLE += -0.32168;
        }
    }
}

/***--------------------------------------------------------------------------------------------****/

data.RES_INC_NOT_CONF =Math.exp(data.LOCAL_DISP_SCORE_TABLE);

if (data.RES_INC_NOT_CONF * 1.3 > data.APP_INCOME_OTHERSOURCE ) {
    data.RES_INC_NOT_CONF = data.APP_INCOME_OTHERSOURCE;
}
data.RES_INC_DISP =Math.max((data.APP_INCOME_MONTHSALARY + data.RES_INC_NOT_CONF - data.RES_EXP_MONTH_TOTAL),0);