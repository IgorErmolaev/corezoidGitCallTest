var activity_1 = new Array('AGRICUL', 'BUILD', 'TRADE');
var activity_2 = new Array('BANK', 'EDUCAT', 'MEDIC', 'PUBLIC');
var activity_3 = new Array('COMMUN', 'IT', 'MILIT', 'ENERGY');
var activity_4 = new Array('FOOD', 'SERV', 'TRANSP');

data['RES_SCCARD_NAME_1'] = 'R_PB_0812';

data['RES_SCCARD_SCORE_1'] = 319;

/*APP_CUST_GENDER*/
switch (data['APP_CUST_GENDER']){
    case 'F':
        data['RES_SCCARD_SCORE_1'] += 30;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0;
}

/*RES_AGE*/
if (data['RES_AGE'] >= 18 && data['RES_AGE']<22){
    data['RES_SCCARD_SCORE_1'] -= 20;
}
else {
    if (data['RES_AGE'] >= 22 && data['RES_AGE']<25){
        data['RES_SCCARD_SCORE_1'] -= 18;
    }
    else {
        if (data['RES_AGE'] >= 25 && data['RES_AGE']<30){
            data['RES_SCCARD_SCORE_1'] -= 9;
        }
        else {
            if (data['RES_AGE'] >= 30 && data['RES_AGE']<40){
                data['RES_SCCARD_SCORE_1'] -= 0;
            }
            else {
                if (data['RES_AGE'] >= 40 ){
                    data['RES_SCCARD_SCORE_1'] += 9;
                }
                else {
                    data['RES_SCCARD_SCORE_1'] += 0;
                }
            }
        }
    }
}

/*APP_MARITAL_MARITALCOND*/
switch (data['APP_MARITAL_MARITALCOND']){
    case 'MARRIED':
        data['RES_SCCARD_SCORE_1'] += 31;
        break;
    case 'WIDOW':
        data['RES_SCCARD_SCORE_1'] += 16;
        break;
    case 'SINGLE':
        data['RES_SCCARD_SCORE_1'] -= 16;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0;
}

/*APP_EMPL_ACTIVITY*/
if (activity_1.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
    data['RES_SCCARD_SCORE_1'] -= 29;
}
else {
    if (activity_2.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
        data['RES_SCCARD_SCORE_1'] += 29;
    }
    else {
        if (activity_3.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
            data['RES_SCCARD_SCORE_1'] += 15;
        }
        else {
            if (activity_4.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
                data['RES_SCCARD_SCORE_1'] -= 15;
            }
            else {
                data['RES_SCCARD_SCORE_1'] += 0;
            }
        }
    }
}

/*APP_SOCSTATUS_EDUCATION*/
switch (data['APP_SOCSTATUS_EDUCATION']){
    case 'POS':
    case 'SEC':
        data['RES_SCCARD_SCORE_1'] -= 45;
        break;
    case 'TEC':
        data['RES_SCCARD_SCORE_1'] += 0;
        break;
    case 'UND':
        data['RES_SCCARD_SCORE_1'] -= 23;
        break;
    case 'HIG':
    case 'TWO':
        data['RES_SCCARD_SCORE_1'] += 23;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0;
}

/*APP_EMPL_TIMEEMPL*/
if (data['APP_EMPL_TIMEEMPL'] >=0 && data['APP_EMPL_TIMEEMPL'] <36){
    data['RES_SCCARD_SCORE_1'] -= 15;
}
else {
    if (data['APP_EMPL_TIMEEMPL'] >=36 && data['APP_EMPL_TIMEEMPL'] <48){
        data['RES_SCCARD_SCORE_1'] += 0;
    }
    else {
        if (data['APP_EMPL_TIMEEMPL'] >=48 && data['APP_EMPL_TIMEEMPL'] <72){
            data['RES_SCCARD_SCORE_1'] += 15;
        }
        else {
            if (data['APP_EMPL_TIMEEMPL'] >=72 && data['APP_EMPL_TIMEEMPL'] <120){
                data['RES_SCCARD_SCORE_1'] += 30;
            }
            else {
                if (data['APP_EMPL_TIMEEMPL'] >=120 ){
                    data['RES_SCCARD_SCORE_1'] += 45;
                }
                else {
                    data['RES_SCCARD_SCORE_1'] += 0;
                }
            }
        }
    }
}

/*APP_EMPL_ORGTYPE*/
switch (data['APP_EMPL_ORGTYPE']){
    case 'BUSINESS':
    case 'PRIVATE':
        data['RES_SCCARD_SCORE_1'] -= 17;
        break;
    case 'INTERNAT':
    case 'STATE':
        data['RES_SCCARD_SCORE_1'] += 17;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0;
}

/*APP_EMPL_SOCIALSTATUS*/
if (data['APP_EMPL_SOCIALSTATUS'] == 'DECREE' || data['APP_EMPL_SOCIALSTATUS'] == 'STUDENT' || data['APP_EMPL_SOCIALSTATUS'] == 'UNEMP'){
    data['RES_SCCARD_SCORE_1'] -= 17;
}
else {
    if (data['APP_EMPL_SOCIALSTATUS'] == 'PENSION' || data['APP_EMPL_SOCIALSTATUS'] == 'WORKPENS' ){
        data['RES_SCCARD_SCORE_1'] += 17;
    }
    else {
        if (data['APP_EMPL_SOCIALSTATUS'] == 'PARTWORK' || data['APP_EMPL_SOCIALSTATUS'] == 'SAILOR' ){
            data['RES_SCCARD_SCORE_1'] -= 34;
        }
        else {
            data['RES_SCCARD_SCORE_1'] += 0;
        }
    }
}

/*APP_SOCSTATUS_CHILDNUMBER*/
if (data['APP_SOCSTATUS_CHILDNUMBER'] < 1){
    data['RES_SCCARD_SCORE_1'] -= 8;
}
else {
    if (data['APP_SOCSTATUS_CHILDNUMBER'] == 1){
        data['RES_SCCARD_SCORE_1'] += 0;
    }
    else {
        if (data['APP_SOCSTATUS_CHILDNUMBER'] == 2){
            data['RES_SCCARD_SCORE_1'] += 8;
        }
        else {
            if (data['APP_SOCSTATUS_CHILDNUMBER'] >=3){
                data['RES_SCCARD_SCORE_1'] -= 8;
            }
            else {
                data['RES_SCCARD_SCORE_1'] += 0;
            }
        }
    }
}

/*APP_ACT_ADDRESS_REG_EQUAL*/
switch (data['APP_ACT_ADDRESS_REG_EQUAL']){
    case 'Y':
        data['RES_SCCARD_SCORE_1'] += 0;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] -= 33;
}

/*PROD_CHAR_BANK*/
switch (data['PROD_CHAR_BANK']){
    case 'AB':
        data['RES_SCCARD_SCORE_1'] -= 49;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0;
}

/*LOCAL_DEPOSIT_SCORING_SUM*/
if (data['LOCAL_DEPOSIT_SCORING_SUM'] < 0.1){
    data['RES_SCCARD_SCORE_1'] -= 20;
}
else {
    if (data['LOCAL_DEPOSIT_SCORING_SUM'] >= 0.1 && data['LOCAL_DEPOSIT_SCORING_SUM'] < 100){
        data['RES_SCCARD_SCORE_1'] += 0;
    }
    else {
        if (data['LOCAL_DEPOSIT_SCORING_SUM'] >= 100){
            data['RES_SCCARD_SCORE_1'] += 20;
        }
        else {
            data['RES_SCCARD_SCORE_1'] += 0;
        }
    }
}

/*SalaryMoreThan500*/
if (data['RES_DEBCARD_P_SRED'] + data['RES_DEBCARD_Z_SRED'] >= 500){
    data['RES_SCCARD_SCORE_1'] += 20;
}
else {
    data['RES_SCCARD_SCORE_1'] += 0;
}

data.nodeName = 'AppScoreRIP';