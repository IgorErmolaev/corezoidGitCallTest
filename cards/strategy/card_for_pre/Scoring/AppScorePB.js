var addr = new Array('HOSTEL', 'COMMUN', 'PARENTS', 'RENT', 'OTHER');

var activity_1 = new Array('PUBLIC', 'IT', 'EDUCAT', 'MEDIC', 'BANK');
var activity_2 = new Array('MILIT', 'ENERGY', 'TRADE', 'TRANSP', 'OTHER','MECHAN', 'LOWYER', 'TOURISM', 'REALEST');
var activity_3 = new Array('FOOD', 'SERV', 'METALL');

var mob_1 = new Array('067','068','096','097','098');
var mob_2 = new Array('063','093','050','066','095','099');


data['RES_SCCARD_NAME_1'] = 'CC_PB_0515';

data['RES_SCCARD_SCORE_1'] = -2.1172;

/*APP_ACT_ADDRESS_ESTATETYPE - Вид владения по адресу проживания;*/
if (data['APP_ACT_ADDRESS_ESTATETYPE'] == 'DUAL'){
    data['RES_SCCARD_SCORE_1'] += 0.4298;
}
else {
    if (data['APP_ACT_ADDRESS_ESTATETYPE'] == 'OWN'){
        data['RES_SCCARD_SCORE_1'] += 0.3182;
    }
    else {
        if (addr.indexOf(data['APP_ACT_ADDRESS_ESTATETYPE']) != -1){
            data['RES_SCCARD_SCORE_1'] += 0.2697;
        }
        else {
            data['RES_SCCARD_SCORE_1'] += 0;
        }
    }
}

/*RES_AGE - Возраст;*/
if (data['RES_AGE'] >= 18 && data['RES_AGE'] < 20){
    data['RES_SCCARD_SCORE_1'] += 0;
}
else {
    if (data['RES_AGE'] >= 20 && data['RES_AGE'] < 22){
        data['RES_SCCARD_SCORE_1'] += 0.3725;
    }
    else {
        if (data['RES_AGE'] >= 22 && data['RES_AGE'] < 30){
            data['RES_SCCARD_SCORE_1'] += 0.5127;
        }
        else {
            if (data['RES_AGE'] >= 30 && data['RES_AGE'] < 35){
                data['RES_SCCARD_SCORE_1'] += 0.5337;
            }
            else {
                if (data['RES_AGE'] >= 35 && data['RES_AGE'] < 41){
                    data['RES_SCCARD_SCORE_1'] += 0.6197;
                }
                else {
                    if (data['RES_AGE'] >= 41 && data['RES_AGE'] < 52){
                        data['RES_SCCARD_SCORE_1'] += 0.7439;
                    }
                    else {
                        if (data['RES_AGE'] >= 52 && data['RES_AGE'] < 55){
                            data['RES_SCCARD_SCORE_1'] += 0.9189;
                        }
                        else {
                            if (data['RES_AGE'] >= 55 && data['RES_AGE'] < 59){
                                data['RES_SCCARD_SCORE_1'] += 1.0475;
                            }
                            else {
                                if (data['RES_AGE'] >= 59){
                                    data['RES_SCCARD_SCORE_1'] += 1.2437;
                                }
                                else {
                                    data['RES_SCCARD_SCORE_1'] += 0;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

/*RES_CRED_ACTIVE - Наличие активного кредитного продукта;*/
switch (data['RES_CRED_ACTIVE']){
    case 'N':
        data['RES_SCCARD_SCORE_1'] += 0.19;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0;
}

/*APP_CUST_GENDER - Наличие активного кредитного продукта;*/
switch (data['APP_CUST_GENDER']){
    case 'F':
        data['RES_SCCARD_SCORE_1'] += 0.4604;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0;
}

/*APP_MARITAL_MARITALCOND - Семейное положение;*/
switch (data['APP_MARITAL_MARITALCOND']){
    case 'MARRIED':
        data['RES_SCCARD_SCORE_1'] += 0.5911;
        break;
    case 'SINGLE':
        data['RES_SCCARD_SCORE_1'] -= 0.0582;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0;
}

/*APP_REG_ADDRESS_SUBTOWN - Тип населенного пункта;*/
switch (data['APP_REG_ADDRESS']['SUBTOWN']){
    case 'CITY':
        data['RES_SCCARD_SCORE_1'] += 0.1321;
        break;
    case 'SETTLEMENT':
    case 'PGT':
        data['RES_SCCARD_SCORE_1'] += 0.1221;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0;
}

/*APP_SOCSTATUS_EDUCATION - Образование;*/
switch (data['APP_SOCSTATUS_EDUCATION']){
    case 'HIG':
    case 'TWO':
        data['RES_SCCARD_SCORE_1'] += 1.2459;
        break;
    case 'TEC':
        data['RES_SCCARD_SCORE_1'] += 0.3944;
        break;
    case 'POS':
    case 'SEC':
        data['RES_SCCARD_SCORE_1'] += 0;
        break;
    case 'UND':
    default :
        data['RES_SCCARD_SCORE_1'] += 0.8969;
}

/*APP_EMPL_ACTIVITY  - Вид деятельности ;*/
if (activity_1.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
    data['RES_SCCARD_SCORE_1'] += 0.827;
}
else {
    if (data['APP_EMPL_ACTIVITY'] == 'COMMUN'){
        data['RES_SCCARD_SCORE_1'] += 0.4665;
    }
    else {
        if (activity_2.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
            data['RES_SCCARD_SCORE_1'] += 0.4574;
        }
        else {
            if (activity_3.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
                data['RES_SCCARD_SCORE_1'] += 0.4174;
            }
            else {
                if (data['APP_EMPL_ACTIVITY'] == 'MINING' || data['APP_EMPL_ACTIVITY'] == 'AGRICUL'){
                    data['RES_SCCARD_SCORE_1'] += 0.1871;
                }
                else {
                    if (data['APP_EMPL_ACTIVITY'] == 'BUILD'){
                        data['RES_SCCARD_SCORE_1'] += 0;
                    }
                    else {
                        data['RES_SCCARD_SCORE_1'] += 0.4665;
                    }
                }
            }
        }
    }
}

/*APP_EMPL_ORGTYPE - Тип собственности предприятия  ;*/
switch (data['APP_EMPL_ORGTYPE']){
    case 'STATE':
        data['RES_SCCARD_SCORE_1'] += 0.28;
        break;
    case 'BUSINESS':
        data['RES_SCCARD_SCORE_1'] += 0;
        break;
    case 'PRIVATE':
    case 'INTERNAT':
        data['RES_SCCARD_SCORE_1'] -= 0.0127;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0.3757;
}

/*APP_EMPL_RANK  - Служебное положение  ;*/
switch (data['APP_EMPL_RANK']){
    case 'WORKER':
        data['RES_SCCARD_SCORE_1'] += 0;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0.0965;
}

/*APP_EMPL_TIMEEMPL - Стаж работы на предприятии;*/
if (data['APP_EMPL_TIMEEMPL']>=1000){
    data['RES_SCCARD_SCORE_1'] += 0;
}
else {
    if (data['APP_EMPL_TIMEEMPL']>=0 && data['APP_EMPL_TIMEEMPL'] < 1){
        data['RES_SCCARD_SCORE_1'] += 0.1027;
    }
    else {
        if (data['APP_EMPL_TIMEEMPL']>=1 && data['APP_EMPL_TIMEEMPL'] < 9){
            data['RES_SCCARD_SCORE_1'] -= 0.1156;
        }
        else {
            if (data['APP_EMPL_TIMEEMPL']>=9 && data['APP_EMPL_TIMEEMPL'] < 36){
                data['RES_SCCARD_SCORE_1'] -= 0.0534;
            }
            else {
                if (data['APP_EMPL_TIMEEMPL']>=36 && data['APP_EMPL_TIMEEMPL'] < 72){
                    data['RES_SCCARD_SCORE_1'] += 0.0568;
                }
                else {
                    if (data['APP_EMPL_TIMEEMPL']>=72 && data['APP_EMPL_TIMEEMPL'] < 132){
                        data['RES_SCCARD_SCORE_1'] += 0.3839;
                    }
                    else {
                        if (data['APP_EMPL_TIMEEMPL']>=132 && data['APP_EMPL_TIMEEMPL'] < 1000){
                            data['RES_SCCARD_SCORE_1'] += 0.5337;
                        }
                        else{
                            data['RES_SCCARD_SCORE_1'] += 0;
                        }
                    }
                }
            }
        }
    }
}

/*LOCAL_BLCL_COLOR  - ЧС. Цвета кодификаторов ЧС  ;*/
switch (data['LOCAL_BLCL_COLOR']){
    case 'G':
        data['RES_SCCARD_SCORE_1'] += 0.8802;
        break;
    case 'Y':
        data['RES_SCCARD_SCORE_1'] += 0;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0.7072;
}

/*APP_PROPERTY_CAR_HAS  -Наличие автомобиля ;*/
switch (data['APP_PROPERTY_CAR_HAS']){
    case 'Y':
        data['RES_SCCARD_SCORE_1'] += 0.4741;
        break;
    default :
        data['RES_SCCARD_SCORE_1'] += 0;
}

/*LOCAL_PHONE_MOB_OPERATOR  -Мобильный оператор ;*/
if (mob_1.indexOf(data['LOCAL_PHONE_MOB_OPERATOR']) != -1){
    data['RES_SCCARD_SCORE_1'] += 0.3446;
}
else {
    if (mob_2.indexOf(data['LOCAL_PHONE_MOB_OPERATOR']) != -1){
        data['RES_SCCARD_SCORE_1'] += 0;
    }
    else {
        data['RES_SCCARD_SCORE_1'] += 0.2154;
    }
}

/*LOCAL_COUNT_STATIC_PHONE  -Кол-во стац. номеров телефонов из дом. и раб. ;*/
if (data['LOCAL_COUNT_STATIC_PHONE'] == 2){
    data['RES_SCCARD_SCORE_1'] += 0.5611;
}
else {
    if (data['LOCAL_COUNT_STATIC_PHONE'] == 1){
        data['RES_SCCARD_SCORE_1'] += 0.2864;
    }
    else {
        if (data['LOCAL_PHONE_WORK_TYPE'] == 'MOBILE' || data['LOCAL_PHONE_HOME_TYPE'] == 'MOBILE'){
            data['RES_SCCARD_SCORE_1'] += 0;
        }
        else {
            data['RES_SCCARD_SCORE_1'] += 0.0777;
        }
    }
}

/*Отношение суммы доходов к запрошенному лимиту ;*/
var tmp;
if (data['PROD_CHAR_LIMITREQUESTED'] != 0){
    tmp = (data['APP_INCOME_MONTHSALARY'] + data['APP_INCOME_OTHERSOURCE']) / data['PROD_CHAR_LIMITREQUESTED'];
}
else {
    tmp = 0;
}

if (tmp >= 0 && tmp <0.5){
    data['RES_SCCARD_SCORE_1'] += 0.1128;
}
else {
    if ((tmp >= 0.5 && tmp <0.75) || tmp >=5){
        data['RES_SCCARD_SCORE_1'] += 0.0521;
    }
    else {
        if ((tmp >= 0.75 && tmp <5) || tmp >=5){
            data['RES_SCCARD_SCORE_1'] += 0;
        }
        else {
            data['RES_SCCARD_SCORE_1'] += 0.0521;
        }
    }
}

/*------------------------------------------*/
data['RES_SCCARD_SCORE_1'] = data['RES_SCCARD_SCORE_1']*100/0.69314718056 +500;

data.nodeName = 'AppScorePB';