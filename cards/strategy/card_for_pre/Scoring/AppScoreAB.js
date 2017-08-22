var activ_1= new Array('MINING', 'AGRICUL', 'METALL', 'FOOD', 'OTHER');
var activ_2= new Array('SERV', 'TRANSP', 'TRADE', 'MECHAN');
var activ_3= new Array('ENERGY', 'MILIT', 'LOWYER', 'TOURISM', 'REALEST', 'PUBLIC', 'IT', 'COMMUN');
var activ_4= new Array('MEDIC', 'EDUCAT', 'BANK');

var socstat = new Array('DECREE', 'WORKPENS', 'UNEMP', 'PENSION', 'STUDENT');

var mobOper_1 = new Array('063', '093');
var mobOper_2 = new Array('050', '066', '095', '099', '094', '092', '091');
var mobOper_3 = new Array('067', '096', '097', '098', '068');


data['RES_SCCARD_NAME_1'] = 'CC_AB_0913';

data['RES_SCCARD_SCORE_1'] = 1260.4;

/*APP_CUST_GENDER*/
switch (data['APP_CUST_GENDER']) {
    case 'F':
        data['RES_SCCARD_SCORE_1'] += 75;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0;
}

/*RES_AGE*/
if (data['RES_AGE'] >=18 && data['RES_AGE'] <21){
    data['RES_SCCARD_SCORE_1'] -= 162.1;
}
else {
    if (data['RES_AGE'] >=21 && data['RES_AGE'] <27){
        data['RES_SCCARD_SCORE_1'] -= 97.1;
    }
    else {
        if (data['RES_AGE'] >=27 && data['RES_AGE'] <39){
            data['RES_SCCARD_SCORE_1'] -= 87.3;
        }
        else {
            if (data['RES_AGE'] >=39 && data['RES_AGE'] <45){
                data['RES_SCCARD_SCORE_1'] -= 53.2;
            }
            else {
                if (data['RES_AGE'] >=45 && data['RES_AGE'] <52){
                    data['RES_SCCARD_SCORE_1'] -= 35.2;
                }
                else {
                    if (data['RES_AGE'] >=52 && data['RES_AGE'] <57){
                        data['RES_SCCARD_SCORE_1'] -= 27.9;
                    }
                    else {
                        if (data['RES_AGE'] >=57 ){
                            data['RES_SCCARD_SCORE_1'] -= 0;
                        }
                        else {
                            data['RES_SCCARD_SCORE_1'] -= 162.1;
                        }
                    }
                }
            }
        }
    }
}

/*APP_MARITAL_MARITALCOND*/
switch  (data['APP_MARITAL_MARITALCOND']){
    case 'SINGLE':
        data['RES_SCCARD_SCORE_1'] -= 93.8;
        break;
    case 'DIVORCED':
        data['RES_SCCARD_SCORE_1'] -= 97.2;
        break;
    case 'WIDOW':
        data['RES_SCCARD_SCORE_1'] -= 97.2;
        break;
    case 'MARRIED':
        data['RES_SCCARD_SCORE_1'] -= 0;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] -= 97.2;
}

/*APP_EMPL_ACTIVITY*/
if (data['APP_EMPL_ACTIVITY'] == 'BUILD'){
    data['RES_SCCARD_SCORE_1'] -= 151.9;
}
else {
    if (activ_1.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
        data['RES_SCCARD_SCORE_1'] -= 102.2;
    }
    else {
        if (activ_2.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
            data['RES_SCCARD_SCORE_1'] -= 86.8;
        }
        else {
            if (activ_3.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
                data['RES_SCCARD_SCORE_1'] -= 41;
            }
            else {
                if (activ_4.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
                    data['RES_SCCARD_SCORE_1'] -= 0;
                }
                else {
                    if (data['APP_EMPL_ACTIVITY'] == 'OTHER'){
                        data['RES_SCCARD_SCORE_1'] -= 102.2;
                    }
                    else {
                        data['RES_SCCARD_SCORE_1'] -= 65.8;
                    }
                }
            }
        }
    }
}

/*APP_SOCSTATUS_EDUCATION*/
switch (data['APP_SOCSTATUS_EDUCATION']){
    case 'POS':
    case 'SEC':
        data['RES_SCCARD_SCORE_1'] -= 193.7;
        break;
    case 'TEC':
        data['RES_SCCARD_SCORE_1'] -= 104.4;
        break;
    case 'UND':
        data['RES_SCCARD_SCORE_1'] -= 24.4;
        break;
    case 'HIG':
    case 'TWO':
        data['RES_SCCARD_SCORE_1'] -= 0;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] -= 193.7;
}

/*APP_EMPL_TIMEEMPL*/
if (data['APP_EMPL_TIMEEMPL'] < 1){
    data['RES_SCCARD_SCORE_1'] -= 112.3;
}
else {
    if (data['APP_EMPL_TIMEEMPL'] >= 1 && data['APP_EMPL_TIMEEMPL'] <18){
        data['RES_SCCARD_SCORE_1'] -= 95;
    }
    else {
        if (data['APP_EMPL_TIMEEMPL'] >= 18 && data['APP_EMPL_TIMEEMPL'] <36){
            data['RES_SCCARD_SCORE_1'] -= 81.1;
        }
        else {
            if (data['APP_EMPL_TIMEEMPL'] >= 36 && data['APP_EMPL_TIMEEMPL'] <66){
                data['RES_SCCARD_SCORE_1'] -= 75.9;
            }
            else {
                if (data['APP_EMPL_TIMEEMPL'] >= 66 && data['APP_EMPL_TIMEEMPL'] <120){
                    data['RES_SCCARD_SCORE_1'] -= 49.9;
                }
                else {
                    if (data['APP_EMPL_TIMEEMPL'] >= 120){
                        data['RES_SCCARD_SCORE_1'] -= 0;
                    }
                    else {
                        data['RES_SCCARD_SCORE_1'] -= 112.3;
                    }
                }
            }
        }
    }
}

/*APP_EMPL_ORGTYPE*/
switch (data['APP_EMPL_ORGTYPE']){
    case 'BUSINESS':
        data['RES_SCCARD_SCORE_1'] -= 32.9;
        break;
    case 'PRIVATE':
        data['RES_SCCARD_SCORE_1'] -= 12.5;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] -= 0;
}

/*APP_EMPL_SOCIALSTATUS*/
if (data['APP_EMPL_SOCIALSTATUS'] == 'SAILOR'){
    data['RES_SCCARD_SCORE_1'] -= 82.6;
}
else {
    if (data['APP_EMPL_SOCIALSTATUS'] == 'PARTWORK'){
        data['RES_SCCARD_SCORE_1'] -= 71.5;
    }
    else {
        if (data['APP_EMPL_SOCIALSTATUS'] == 'FULLWORK'){
            data['RES_SCCARD_SCORE_1'] -= 61;
        }
        else {
            if (socstat.indexOf(data['APP_EMPL_SOCIALSTATUS']) != -1){
                data['RES_SCCARD_SCORE_1'] -= 0;
            }
            else {
                data['RES_SCCARD_SCORE_1'] -= 82.6;
            }
        }
    }
}

/*APP_SOCSTATUS_CHILDNUMBER*/
if (data['APP_SOCSTATUS_CHILDNUMBER'] == 0){
    data['RES_SCCARD_SCORE_1'] += 56.5;
}
else {
    if (data['APP_SOCSTATUS_CHILDNUMBER'] == 1){
        data['RES_SCCARD_SCORE_1'] += 43;
    }
    else {
        if (data['APP_SOCSTATUS_CHILDNUMBER'] == 2){
            data['RES_SCCARD_SCORE_1'] += 56.9;
        }
        else {
            if (data['APP_SOCSTATUS_CHILDNUMBER'] >= 3){
                data['RES_SCCARD_SCORE_1'] += 0;
            }
            else {
                data['RES_SCCARD_SCORE_1'] += 39;
            }
        }
    }
}

/*APP_PROPERTY_CAR_HAS*/
switch (data['APP_PROPERTY_CAR_HAS']){
    case 'Y':
        data['RES_SCCARD_SCORE_1'] -= 0;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] -= 57.4;
}

/*APP_REG_ADRESS_SUBTOWN*/
switch (data['APP_REG_ADRESS_SUBTOWN']){
    case 'COUNTRY':
        data['RES_SCCARD_SCORE_1'] -= 118.5;
        break;
    case 'SETL_CITY':
        data['RES_SCCARD_SCORE_1'] -= 101.2;
        break;
    case 'TOWN':
        data['RES_SCCARD_SCORE_1'] -= 0;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] -= 32.9;
}

/*LOCAL_PHONE_MOB_OPERATOR*/
if (mobOper_1.indexOf(data['LOCAL_PHONE_MOB_OPERATOR']) != -1){
    data['RES_SCCARD_SCORE_1'] -= 63.1;
}
else {
    if (mobOper_2.indexOf(data['LOCAL_PHONE_MOB_OPERATOR']) != -1){
        data['RES_SCCARD_SCORE_1'] -= 27.9;
    }
    else {
        if (mobOper_3.indexOf(data['LOCAL_PHONE_MOB_OPERATOR']) != -1){
            data['RES_SCCARD_SCORE_1'] -= 0;
        }
        else {
            data['RES_SCCARD_SCORE_1'] -= 27.9;
        }
    }

}

/*APP_EMPL_RANK*/
switch (data['APP_EMPL_RANK']){
    case 'WORKER':
        data['RES_SCCARD_SCORE_1'] -= 41.9;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] -= 0;
}

/*LOCAL_SUM_ZP_PENS_DEPOS*/
if (data['LOCAL_SUM_ZP_PENS_DEPOS'] < 10){
    data['RES_SCCARD_SCORE_1'] -= 39.3;
}
else {
    if (data['LOCAL_SUM_ZP_PENS_DEPOS'] >= 10 && data['LOCAL_SUM_ZP_PENS_DEPOS'] < 1000){
        data['RES_SCCARD_SCORE_1'] -= 13.7;
    }
    else {
        if (data['LOCAL_SUM_ZP_PENS_DEPOS'] >= 1000 ){
            data['RES_SCCARD_SCORE_1'] -= 0;
        }
        else {
            data['RES_SCCARD_SCORE_1'] -= 39.3;
        }
    }
}

/*LOCAL_COUNT_STATIC_PHONE*/
switch (data['LOCAL_COUNT_STATIC_PHONE']){
    case 0:
        data['RES_SCCARD_SCORE_1'] -= 59;
        break;
    case 1:
        data['RES_SCCARD_SCORE_1'] -= 18.4;
        break;
    case 2:
        data['RES_SCCARD_SCORE_1'] -= 0;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] -= 59;
}

/*LOCAL_BLCL_COLOR*/
if (data['LOCAL_BLCL_COLOR'] == 'R' || data['LOCAL_BLCL_COLOR'] == 'Y' || data['LOCAL_BLCL_COLOR'] == 'G'){
    data['RES_SCCARD_SCORE_1'] -= 131.1;
}
else {
    data['RES_SCCARD_SCORE_1'] -= 0;
}