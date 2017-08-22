data.RES_SCCARD_NAME_VK = 'CC_ABVK_0116';

data.RES_SCCARD_SCORE_VK = 9.822338;

/*AGE_REG_SN - Возраст регистрации в соц. Сети;*/
if (data.AGE_REG_SN == undefined || data.AGE_REG_SN == null){
    data.RES_SCCARD_SCORE_VK+= -1.4122;
}
else {
    if (data.AGE_REG_SN >=0 &&  data.AGE_REG_SN<18){
        data.RES_SCCARD_SCORE_VK+= -1.62277;
    }
    else {
        if (data.AGE_REG_SN >=18 &&  data.AGE_REG_SN<21){
            data.RES_SCCARD_SCORE_VK+= -1.49385;
        }
        else {
            if (data.AGE_REG_SN >=21 &&  data.AGE_REG_SN<24){
                data.RES_SCCARD_SCORE_VK+= -1.3445;
            }
            else {
                if (data.AGE_REG_SN >=24 &&  data.AGE_REG_SN<28){
                    data.RES_SCCARD_SCORE_VK+= -1.17585;
                }
                else {
                    if (data.AGE_REG_SN >=28 &&  data.AGE_REG_SN<36){
                        data.RES_SCCARD_SCORE_VK+= -0.87365;
                    }
                    else {
                        if (data.AGE_REG_SN >=36){
                            data.RES_SCCARD_SCORE_VK+= 0;
                        }
                    }
                }
            }
        }
    }
}

/*FL_PH_SN - Признак указания телефона;*/
if (data.FL_PH_SN == 'N'){
    data.RES_SCCARD_SCORE_VK+= 0;
}
else {
    data.RES_SCCARD_SCORE_VK+= -0.15872;
}

/*FR_VIP - Доля друзей с признаком VIP;*/
if (data.FR_VIP > 0){
    data.RES_SCCARD_SCORE_VK+= 0;
}
else {
    data.RES_SCCARD_SCORE_VK+= -1.47714;
}

/*FR_PROSR - Доля  друзей, которые на просрочке;*/
if (data.FR_PROSR == undefined || data.FR_PROSR == null){
    data.RES_SCCARD_SCORE_VK+= -1.64323;
}
else {
    if (data.FR_PROSR >=0.08){
        data.RES_SCCARD_SCORE_VK+= -2.02544;
    }
    else {
        if (data.FR_PROSR < 0.08 && data.FR_PROSR >=0.05){
            data.RES_SCCARD_SCORE_VK+= -1.75325;
        }
        else {
            if (data.FR_PROSR < 0.05 && data.FR_PROSR >=0.03){
                data.RES_SCCARD_SCORE_VK+= -1.52708;
            }
            else {
                if (data.FR_PROSR < 0.03 && data.FR_PROSR >=0.01){
                    data.RES_SCCARD_SCORE_VK+= -1.10325;
                }
                else {
                    if (data.FR_PROSR == 0){
                        data.RES_SCCARD_SCORE_VK+=0;
                    }
                }
            }
        }
    }
}

/*Способ входа в соц. Сети;*/
if (data.PL_MOBILE == 'Y'){
    data.RES_SCCARD_SCORE_VK+= -1.28107;
}
else {
    if (data.PL_WEB == 'Y' || data.PL_ANDROID =='Y'){
        data.RES_SCCARD_SCORE_VK+= -0.98904;
    }
    else {
        if (data.PL_IPHONE == 'Y' || data.PL_IPAD =='Y' || data.PL_WPHONE=='Y' || data.PL_WINDOWS =='Y'){
            data.RES_SCCARD_SCORE_VK+= 0;
        }
        else {
            data.RES_SCCARD_SCORE_VK+= -0.98904;
        }
    }

}

/*VK_REGISTR_YEAR-  Год регистрации в ВК*/
if (data.VK_REGISTR_YEAR == '2011' || data.VK_REGISTR_YEAR == '2012'){
    data.RES_SCCARD_SCORE_VK+= -0.99967;
}
else {
    if (data.VK_REGISTR_YEAR == '2010' || data.VK_REGISTR_YEAR == '2013' || data.VK_REGISTR_YEAR == '2014' || data.VK_REGISTR_YEAR== undefined || data.VK_REGISTR_YEAR==null){
        data.RES_SCCARD_SCORE_VK+= -0.82865;
    }
    else {
        if (data.VK_REGISTR_YEAR == '2009' ){
            data.RES_SCCARD_SCORE_VK+= -0.25946;
        }
        else {
            if (data.VK_REGISTR_YEAR == '2007' || data.VK_REGISTR_YEAR == '2008' ){
                data.RES_SCCARD_SCORE_VK+= 0;
            }
        }
    }
}

/*SN_DEACTIVATED - Статус в социальной сети (деактивирован или заблокирован);*/
if (data.SN_DEACTIVATED == undefined || data.SN_DEACTIVATED.length == 0){
    data.RES_SCCARD_SCORE_VK+= -0.00763;
}
else {
    if( data.SN_DEACTIVATED == 'DELETED'){
        data.RES_SCCARD_SCORE_VK+= -0.64821;
    }
    else {
        if(data.SN_DEACTIVATED == 'BANNED'){
            data.RES_SCCARD_SCORE_VK+= 0;
        }
    }
}

/*FR_OPPOS_SEX - Доля друзей противоположного пола;*/
if (data.FR_OPPOS_SEX >=0 && data.FR_OPPOS_SEX<0.4 && data.FR_OPPOS_SEX != null){
    data.RES_SCCARD_SCORE_VK+= -0.53804;
}
else {
    if (data.FR_OPPOS_SEX >=0.4){
        data.RES_SCCARD_SCORE_VK+= -0.35904;
    }
    else {
        if (data.FR_OPPOS_SEX == undefined){
            data.RES_SCCARD_SCORE_VK+= 0;
        }
    }
}

/*REP_AGE_CATEGORY - Метка возрастной группы в категории возрастов;*/
if(data.REP_AGE_CATEGORY == undefined || data.REP_AGE_CATEGORY == null){
    data.RES_SCCARD_SCORE_VK+= -0.36088;
}
else {
    if(data.REP_AGE_CATEGORY == 1 || data.REP_AGE_CATEGORY == 2){
        data.RES_SCCARD_SCORE_VK+= -0.63684;
    }
    else {
        if(data.REP_AGE_CATEGORY == 3 ){
            data.RES_SCCARD_SCORE_VK+= -0.29235;
        }
        else {
            if(data.REP_AGE_CATEGORY == 4 ){
                data.RES_SCCARD_SCORE_VK+= -0.18919;
            }
            else {
                if(data.REP_AGE_CATEGORY == 5 ||  data.REP_AGE_CATEGORY == 6 || data.REP_AGE_CATEGORY == 7 ){
                    data.RES_SCCARD_SCORE_VK+= 0;
                }
            }
        }
    }
}

/*DEVIAT_AVG_FR_AGE_CATEG - Отклонение количества друзей пользователя от среднего количества друзей по каждой возрастной группе;*/
if (data.DEVIAT_AVG_FR_AGE_CATEG == undefined || data.DEVIAT_AVG_FR_AGE_CATEG == null){
    data.RES_SCCARD_SCORE_VK+= -1.23337;
}
else {
    if (data.DEVIAT_AVG_FR_AGE_CATEG >= 30 || data.DEVIAT_AVG_FR_AGE_CATEG<-90){
        data.RES_SCCARD_SCORE_VK+= -1.32314;
    }
    else {
        if (data.DEVIAT_AVG_FR_AGE_CATEG >= -90 && data.DEVIAT_AVG_FR_AGE_CATEG<30){
            data.RES_SCCARD_SCORE_VK+= 0;
        }
    }
}

/*FOLLOW_TO_FR - Отношение количества подписчиков к количеству друзей;*/
if (data.FOLLOW_TO_FR == 5 || data.FOLLOW_TO_FR == 6){
    data.RES_SCCARD_SCORE_VK+= -0.55178;
}
else {
    if (data.FOLLOW_TO_FR == 2 || data.FOLLOW_TO_FR == 3 || data.FOLLOW_TO_FR == 4){
        data.RES_SCCARD_SCORE_VK+= -0.24995;
    }
    else {
        if (data.FOLLOW_TO_FR == 0 || data.FOLLOW_TO_FR == undefined || data.FOLLOW_TO_FR == null ){
            data.RES_SCCARD_SCORE_VK+= -0.12883;
        }
        else {
            if (data.FOLLOW_TO_FR == 1 ){
                data.RES_SCCARD_SCORE_VK+= 0;
            }
        }
    }
}

/*FL_CORRECT_NAME - Признак правильного имени в соц.Сети*/
if (data.FL_CORRECT_NAME == 'Y'){
    data.RES_SCCARD_SCORE_VK+= 0;
}
else {
    data.RES_SCCARD_SCORE_VK+= -0.24964;
}

/*ANTIMAIDAN_GROUPS - Пользователь состоит в группах Антимайдана*/
if (data.ANTIMAIDAN_GROUPS == 'Y'){
    data.RES_SCCARD_SCORE_VK+= -1.00294;
}
else {
    if (data.ANTIMAIDAN_GROUPS == 'N'){
        data.RES_SCCARD_SCORE_VK+= 0;
    }
}

/*FR_ANTIMAIDAN - Доля друзей пользователя в группах Антимайдана;*/
if (data.FR_ANTIMAIDAN>= 0.06){
    data.RES_SCCARD_SCORE_VK+= -0.36562;
}
else {
    if (data.FR_ANTIMAIDAN>= 0.02 && data.FR_ANTIMAIDAN< 0.06){
        data.RES_SCCARD_SCORE_VK+= -0.18778;
    }
    else {
        if (data.FR_ANTIMAIDAN>= 0 && data.FR_ANTIMAIDAN< 0.02 && data.FR_ANTIMAIDAN != null){
            data.RES_SCCARD_SCORE_VK+= -0.10226;
        }
        else {
            if (data.FR_ANTIMAIDAN == undefined || data.FR_ANTIMAIDAN == null){
                data.RES_SCCARD_SCORE_VK+= 0;
            }
        }
    }
}

data.RES_SCCARD_SCORE_VK = (data.RES_SCCARD_SCORE_VK*72.1347520444482 + 782.192809488736) - 782.192809488736*14/16/14;

if (
    data.AGE_REG_SN == null &&
    data.FL_PH_SN == null &&
    data.FR_VIP == null &&
    data.FR_PROSR == null &&
    data.PL_MOBILE == null &&
    data.PL_IPHONE == null &&
    data.PL_IPAD == null &&
    data.PL_ANDROID == null &&
    data.PL_WPHONE == null &&
    data.PL_WINDOWS == null &&
    data.PL_WEB == null &&
    data.VK_REGISTR_YEAR == null &&
    data.SN_DEACTIVATED == null &&
    data.FR_OPPOS_SEX == null &&
    data.REP_AGE_CATEGORY == null &&
    data.DEVIAT_AVG_FR_AGE_CATEG == null &&
    data.FOLLOW_TO_FR == null &&
    data.FL_CORRECT_NAME == null &&
    data.ANTIMAIDAN_GROUPS == null &&
    data.FR_ANTIMAIDAN == null
){
    data.RES_SCCARD_SCORE_VK = 861.526;
}

data.nodeName = 'AppScoreAB_VK';