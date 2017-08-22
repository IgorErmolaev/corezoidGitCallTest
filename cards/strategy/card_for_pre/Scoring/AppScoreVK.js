
data['RES_SCCARD_NAME_VK'] = 'CC_VK_0515';

data['RES_SCCARD_SCORE_VK'] = 1288;

/*FL_PH_SN - признак указания телефона;*/
switch (data['FL_PH_SN']){
    case 'N':
        data['RES_SCCARD_SCORE_VK'] += 0;
        break;
    default :
        data['RES_SCCARD_SCORE_VK'] -= 43;
}

/*FR_AVG_AGE - средний возраст друзей в соц.сети;*/
if (data['FR_AVG_AGE'] < 18 && data['FR_AVG_AGE'] != null){
    data['RES_SCCARD_SCORE_VK'] -=  105.5;
}
else {
    if (data['FR_AVG_AGE'] >=18 && data['FR_AVG_AGE'] < 20){
        data['RES_SCCARD_SCORE_VK'] -=  57.8;
    }
    else {
        if (data['FR_AVG_AGE'] >=20 && data['FR_AVG_AGE'] < 22){
            data['RES_SCCARD_SCORE_VK'] -=  19.5;
        }
        else {
            if (data['FR_AVG_AGE'] >=22 ){
                data['RES_SCCARD_SCORE_VK'] +=  0;
            }
            else {
                data['RES_SCCARD_SCORE_VK'] -=  57.8;
            }
        }
    }
}

/*FR_PROSR - доля друзей на просрочке;*/
if (data['FR_PROSR']>= 0 && data['FR_PROSR']< 0.03 && data['FR_PROSR']!= null){
    data['RES_SCCARD_SCORE_VK'] += 0;
}
else {
    if (data['FR_PROSR']>= 0.03 && data['FR_PROSR']< 0.07){
        data['RES_SCCARD_SCORE_VK'] -= 62.6;
    }
    else {
        if (data['FR_PROSR']>= 0.07 && data['FR_PROSR']< 0.1){
            data['RES_SCCARD_SCORE_VK'] -= 129;
        }
        else {
            if (data['FR_PROSR']>= 0.1 && data['FR_PROSR']< 0.15){
                data['RES_SCCARD_SCORE_VK'] -= 169.7;
            }
            else {
                if (data['FR_PROSR']>= 0.15 ){
                    data['RES_SCCARD_SCORE_VK'] -= 225.1;
                }
                else {
                    data['RES_SCCARD_SCORE_VK'] -= 62.6;
                }
            }
        }
    }
}

/*UNIVER_CITY  -  Город, в котором пользователь закончил ВУЗ  ;*/
switch (data['UNIVER_CITY']){
    case '280':
    case '314':
        data['RES_SCCARD_SCORE_VK'] += 0;
        break;
    default :
        data['RES_SCCARD_SCORE_VK'] -= 43.5;
}

/*PL_MOBILE   -  Город, в котором пользователь закончил ВУЗ  ;*/
switch (data['PL_MOBILE']){
    case 'Y':
        data['RES_SCCARD_SCORE_VK'] -= 56.8;
        break;
    default :
        data['RES_SCCARD_SCORE_VK'] += 0;
}

/*AGE_GR_ID_DEV - Cредний ID клиента VK по возрастной группе;*/
if (data['AGE_GR_ID_DEV'] < -99999999 || data['AGE_GR_ID_DEV'] == null){
    data['RES_SCCARD_SCORE_VK'] -= 67.3;
}
else {
    if (data['AGE_GR_ID_DEV'] >= -99999999 && data['AGE_GR_ID_DEV'] < -69999999){
        data['RES_SCCARD_SCORE_VK'] -= 56.4;
    }
    else {
        if (data['AGE_GR_ID_DEV'] >= -69999999 && data['AGE_GR_ID_DEV'] < 30000000){
            data['RES_SCCARD_SCORE_VK'] -= 28;
        }
        else {
            if (data['AGE_GR_ID_DEV'] >= 30000000 && data['AGE_GR_ID_DEV'] < 70000000){
                data['RES_SCCARD_SCORE_VK'] -= 3.3;
            }
            else {
                if (data['AGE_GR_ID_DEV'] >=  70000000){
                    data['RES_SCCARD_SCORE_VK'] += 0;
                }
            }
        }
    }
}

/*REP_AGE_CATEGORY - Метка возрастной группы в категории возрастов  ;*/
if (data['REP_AGE_CATEGORY'] >=1 && data['REP_AGE_CATEGORY'] < 3){
    data['RES_SCCARD_SCORE_VK'] -= 103.8;
}
else {
    if (data['REP_AGE_CATEGORY'] ==3 || data['REP_AGE_CATEGORY'] == null || data['REP_AGE_CATEGORY'] <1){
        data['RES_SCCARD_SCORE_VK'] -= 78.3;
    }
    else {
        if (data['REP_AGE_CATEGORY'] = 4 ){
            data['RES_SCCARD_SCORE_VK'] -= 65.8;
        }
        else {
            if (data['REP_AGE_CATEGORY'] >=5 && data['REP_AGE_CATEGORY'] <=7){
                data['RES_SCCARD_SCORE_VK'] += 0;
            }
        }
    }
}

/*REGION_CATEGORY  -Метка региона   ;*/
if ((data['REGION_CATEGORY'] >= 1 && data['REGION_CATEGORY']<3) || data['REGION_CATEGORY'] == null || data['REGION_CATEGORY']<1){
    data['RES_SCCARD_SCORE_VK'] -= 22.7;
}
else {
    if (data['REGION_CATEGORY'] == 3){
        data['RES_SCCARD_SCORE_VK'] += 0;
    }
}

/*SMOKING_POS   -Положительно относится к курению ;*/
switch (data['SMOKING_POS']){
    case 'Y':
        data['RES_SCCARD_SCORE_VK'] -= 55.7;
        break;
    default :
        data['RES_SCCARD_SCORE_VK'] += 0;
}

/*SELL_AUTO    -Признак того, что клиент продаёт автомобиль;*/
switch (data['SELL_AUTO']) {
    case 'Y':
        data['RES_SCCARD_SCORE_VK'] += 0;
        break;
    default :
        data['RES_SCCARD_SCORE_VK'] -= 71.5;
}

/*FILL_TXT_FLD -Сколько текстовых полей заполнил (activity, interests, movies, tv, books, games, about) ;*/
switch (data['FILL_TXT_FLD']) {
    case 3:
        data['RES_SCCARD_SCORE_VK'] -= 21.1;
        break;
    case 0:
        data['RES_SCCARD_SCORE_VK'] += 0;
        break;
    default :
        data['RES_SCCARD_SCORE_VK'] -= 10.8;
}

/*FL_CORRECT_NAME     -Признак правильного имени в соц. сети ;*/
switch (data['FL_CORRECT_NAME']) {
    case 'Y':
        data['RES_SCCARD_SCORE_VK'] += 0;
        break;
    default :
        data['RES_SCCARD_SCORE_VK'] -= 12.7;
}

/*ANTIMAIDAN_GROUPS -Пользователь состоит в группах Антимайдана ;*/
switch (data['ANTIMAIDAN_GROUPS']) {
    case 'Y':
        data['RES_SCCARD_SCORE_VK'] -= 79.5;
        break;
    default :
        data['RES_SCCARD_SCORE_VK'] += 0;
}

/*FR_ANTIMAIDAN -  Доля друзей пользователя в группах Антимайдана;*/
if (data['FR_ANTIMAIDAN'] >= 0 && data['FR_ANTIMAIDAN'] < 0.01 && data['FR_ANTIMAIDAN'] != null){
    data['RES_SCCARD_SCORE_VK'] -= 0;
}
else {
    if ((data['FR_ANTIMAIDAN'] >= 0.01 && data['FR_ANTIMAIDAN'] < 0.08) || data['FR_ANTIMAIDAN'] == null){
        data['RES_SCCARD_SCORE_VK'] -= 37.6;
    }
    else {
        if (data['FR_ANTIMAIDAN'] >= 0.08 && data['FR_ANTIMAIDAN'] < 0.2){
            data['RES_SCCARD_SCORE_VK'] -= 78;
        }
        else {
            if (data['FR_ANTIMAIDAN'] >= 0.2 ){
                data['RES_SCCARD_SCORE_VK'] -= 158.4;
            }
        }
    }
}

/*FR_DEPOSIT  -  Доля друзей пользователя, у которых есть депозит;*/
if (data['FR_DEPOSIT'] >= 0 && data['FR_DEPOSIT'] < 0.03 && data['FR_DEPOSIT'] != null){
    data['RES_SCCARD_SCORE_VK'] -= 67.6;
}
else {
    if ((data['FR_DEPOSIT'] >= 0.03 && data['FR_DEPOSIT'] < 0.05) || data['FR_DEPOSIT'] == null){
        data['RES_SCCARD_SCORE_VK'] -= 29.7;
    }
    else {
        if (data['FR_DEPOSIT'] >= 0.05 && data['FR_DEPOSIT'] < 0.08){
            data['RES_SCCARD_SCORE_VK'] -= 10.4;
        }
        else {
            if (data['FR_DEPOSIT'] >= 0.08 ){
                data['RES_SCCARD_SCORE_VK'] += 0;
            }
        }
    }
}

/*FR_GOLD - Доля друзей пользователя, у которых есть карта Gold ;*/
if (data['FR_GOLD'] >= 0 && data['FR_GOLD'] < 0.01 && data['FR_GOLD'] != null){
    data['RES_SCCARD_SCORE_VK'] -= 70.8;
}
else {
    if ((data['FR_GOLD'] >= 0.01 && data['FR_GOLD'] < 0.02) || data['FR_GOLD'] == null){
        data['RES_SCCARD_SCORE_VK'] -= 32.4;
    }
    else {
        if (data['FR_GOLD'] >= 0.02 && data['FR_GOLD'] < 0.04){
            data['RES_SCCARD_SCORE_VK'] -= 9.2;
        }
        else {
            if (data['FR_GOLD'] >= 0.04 ){
                data['RES_SCCARD_SCORE_VK'] += 0;
            }
        }
    }
}

data.nodeName = 'AppScorePB_VK';