var activ1 = new Array('MINING','REALEST','BUILD','COMMUN');
var activ2 = new Array('FOOD','AGRICUL','TRADE','MILIT','METALL');
var activ3 = new Array('SERV','MECHAN','TOURISM');
var activ4 = new Array('TRANSP','OTHER','ENERGY','MEDIC','EDUCAT','IT','LOWYER','PUBLIC');

var mobMTC = new Array('050','066','095','099');
var mobLifeBeeline = new Array('063','068','093');

var socStat = new Array('FULLWORK','WORKPENS','SAILOR','DECREE','UNEMP');

data.RES_SCCARD_NAME_1 = 'CC_AB_0116';

data.RES_SCCARD_SCORE_1 = 5.8591;

/*PROD_CHAR_LIMITREQUESTED - Запрашиваемый клиентом лимит*/
if (data.PROD_CHAR_LIMITREQUESTED >= 0 && data.PROD_CHAR_LIMITREQUESTED<501){
    data.RES_SCCARD_SCORE_1+= -1.1201;
}
else {
    if (data.PROD_CHAR_LIMITREQUESTED >= 501 && data.PROD_CHAR_LIMITREQUESTED<1101){
        data.RES_SCCARD_SCORE_1+= -0.6763;
    }
    else {
        if (data.PROD_CHAR_LIMITREQUESTED >= 1101 && data.PROD_CHAR_LIMITREQUESTED<5001){
            data.RES_SCCARD_SCORE_1+= -0.5852;
        }
        else {
            if (data.PROD_CHAR_LIMITREQUESTED >= 5001 && data.PROD_CHAR_LIMITREQUESTED<10001){
                data.RES_SCCARD_SCORE_1+= -0.3555;
            }
            else {
                if (data.PROD_CHAR_LIMITREQUESTED >= 10001 ){
                    data.RES_SCCARD_SCORE_1+= 0;
                }
            }
        }
    }
}

/* APP_EMPL_ACTIVITY- Отрасль организации*/
if (activ1.indexOf(data.APP_EMPL_ACTIVITY) != -1){
    data.RES_SCCARD_SCORE_1+= -1.3062;
}
else {
    if (activ2.indexOf(data.APP_EMPL_ACTIVITY) != -1){
        data.RES_SCCARD_SCORE_1+= -0.9540;
    }
    else {
        if (activ3.indexOf(data.APP_EMPL_ACTIVITY) != -1 || data.APP_EMPL_ACTIVITY == undefined ||  data.APP_EMPL_ACTIVITY.length == 0){
            data.RES_SCCARD_SCORE_1+= -0.9282;
        }
        else {
            if (activ4.indexOf(data.APP_EMPL_ACTIVITY) != -1 ){
                data.RES_SCCARD_SCORE_1+= -0.7178;
            }
            else {
                if (data.APP_EMPL_ACTIVITY == 'BANK' ){
                    data.RES_SCCARD_SCORE_1+= 0;
                }
            }
        }
    }
}

/* APP_INCOME_MONTHSALARY- Размер месячной З/П после уплаты налогов и других вычетов*/
if (data.APP_INCOME_MONTHSALARY <1201){
    data.RES_SCCARD_SCORE_1+= -0.2644;
}
else {
    if (data.APP_INCOME_MONTHSALARY >=1201 && data.APP_INCOME_MONTHSALARY <2101){
        data.RES_SCCARD_SCORE_1+= -0.1779;
    }
    else {
        if (data.APP_INCOME_MONTHSALARY >=2101 && data.APP_INCOME_MONTHSALARY <2801){
            data.RES_SCCARD_SCORE_1+= -0.1138;
        }
        else {
            if (data.APP_INCOME_MONTHSALARY >=2801 && data.APP_INCOME_MONTHSALARY <3201){
                data.RES_SCCARD_SCORE_1+= -0.0137;
            }
            else {
                if (data.APP_INCOME_MONTHSALARY >=3201 ){
                    data.RES_SCCARD_SCORE_1+= 0;
                }
            }
        }
    }
}

/*APP_REG_ADDRESS_SUBTOWN - Тип населенного пункта*/
if (data.APP_REG_ADDRESS.SUBTOWN == 'VILLAGE'){
    data.RES_SCCARD_SCORE_1+= -0.6413;
}
else {
    if (data.APP_REG_ADDRESS.SUBTOWN == 'SETL_CITY' || data.APP_REG_ADDRESS.SUBTOWN == 'PGT'){
        data.RES_SCCARD_SCORE_1+= -0.2635;
    }
    else {
        if (data.APP_REG_ADDRESS.SUBTOWN == 'TOWN' || data.APP_REG_ADDRESS.SUBTOWN == 'COUNTRY' || data.APP_REG_ADDRESS.SUBTOWN == 'SETTLEMENT' || data.APP_REG_ADDRESS.SUBTOWN == undefined || data.APP_REG_ADDRESS.SUBTOWN.length == 0){
            data.RES_SCCARD_SCORE_1+= -0.0837;
        }
        else {
            if (data.APP_REG_ADDRESS.SUBTOWN == 'CITY' ){
                data.RES_SCCARD_SCORE_1+= 0;
            }
        }
    }
}

/*LOCAL_PHONE_MOB_OPERATOR - Мобильный оператор*/
if (mobMTC.indexOf(data.LOCAL_PHONE_MOB_OPERATOR)!=-1){
    data.RES_SCCARD_SCORE_1+= -0.9190;
}
else {
    if (mobLifeBeeline.indexOf(data.LOCAL_PHONE_MOB_OPERATOR)!=-1 || data.LOCAL_PHONE_MOB_OPERATOR == undefined){
        data.RES_SCCARD_SCORE_1+= -0.5089;
    }
    else {
        data.RES_SCCARD_SCORE_1+= 0;
    }
}

/*LOCAL_COUNT_STATIC_PHONE - Количество стационарных телефонных номеров (указанных в анкете)*/
if (data.LOCAL_COUNT_STATIC_PHONE == 0){
    data.RES_SCCARD_SCORE_1+= -0.6392;
}
else {
    if (data.LOCAL_COUNT_STATIC_PHONE == 1){
        data.RES_SCCARD_SCORE_1+= -0.2637;
    }
    else {
        if (data.LOCAL_COUNT_STATIC_PHONE == 3){
            data.RES_SCCARD_SCORE_1+= 0;
        }
    }
}

/*LOCAL_BLCL_COLOR - ЧС. Цвета кодификаторов ЧС*/
if (data.LOCAL_BLCL_COLOR == 'Y'){
    data.RES_SCCARD_SCORE_1+= -1.3323;
}
else {
    if (data.LOCAL_BLCL_COLOR == 'G'){
        data.RES_SCCARD_SCORE_1+= 0;
    }
    else {
        data.RES_SCCARD_SCORE_1+= -0.5117;
    }
}

/*APP_SOCSTATUS_CHILDNUMBER - Количество детей*/
if (data.APP_SOCSTATUS_CHILDNUMBER == 2){
    data.RES_SCCARD_SCORE_1+= -0.1856;
}
else {
    if (data.APP_SOCSTATUS_CHILDNUMBER ==1 || data.APP_SOCSTATUS_CHILDNUMBER >=3 ){
        data.RES_SCCARD_SCORE_1+= 0;
    }
    else {
        data.RES_SCCARD_SCORE_1+= -0.3818;
    }
}

/*APP_EMPL_SOCIALSTATUS - Социальный статус (тип занятости) */
if (data.APP_EMPL_SOCIALSTATUS == 'STUDENT' || data.APP_EMPL_SOCIALSTATUS == 'PARTWORK'){
    data.RES_SCCARD_SCORE_1+= 0.2605;
}
else {
    if (socStat.indexOf(data.APP_EMPL_SOCIALSTATUS)!= -1 ){
        data.RES_SCCARD_SCORE_1+= 0.0967;
    }
    else {
        if (data.APP_EMPL_SOCIALSTATUS == 'PENSION' ){
            data.RES_SCCARD_SCORE_1+= 0;
        }
    }
}

/*APP_SOCSTATUS_EDUCATION - Образование */
if (data.APP_SOCSTATUS_EDUCATION == 'POS' || data.APP_SOCSTATUS_EDUCATION == 'SEC' || data.APP_SOCSTATUS_EDUCATION == 'UND' || data.APP_SOCSTATUS_EDUCATION == 'TEC'){
    data.RES_SCCARD_SCORE_1+= -0.6195;
}
else {
    if (data.APP_SOCSTATUS_EDUCATION == undefined ){
        data.RES_SCCARD_SCORE_1+= -0.4879;
    }
    else {
        if (data.APP_SOCSTATUS_EDUCATION == 'HIG' || data.APP_SOCSTATUS_EDUCATION == 'TWO'){
            data.RES_SCCARD_SCORE_1+= 0;
        }
    }
}

/*APP_MARITAL_MARITALCOND - Семейное положение  */
if (data.APP_MARITAL_MARITALCOND == 'SINGLE' || data.APP_MARITAL_MARITALCOND == 'DIVORCED' || data.APP_MARITAL_MARITALCOND == 'CIVILMER'){
    data.RES_SCCARD_SCORE_1+= -0.3151;
}
else {
    if (data.APP_MARITAL_MARITALCOND == 'MARRIED' || data.APP_MARITAL_MARITALCOND == 'WIDOW' ){
        data.RES_SCCARD_SCORE_1+= 0;
    }
}

/*APP_PROPERTY_CAR_HAS - Наличие автомобиля  */
if (data.APP_PROPERTY_CAR_HAS == 'N'){
    data.RES_SCCARD_SCORE_1+= -0.4043;
}
else {
    data.RES_SCCARD_SCORE_1+= 0;
}

/*APP_EMPL_RANK - Служебное положение  */
if (data.APP_EMPL_RANK == 'WORKER'){
    data.RES_SCCARD_SCORE_1+= -0.1994;
}
else {
    data.RES_SCCARD_SCORE_1+= 0;
}

/*APP_EMPL_TIMEEMPL - Стаж работы на предприятии*/
if (data.APP_EMPL_TIMEEMPL>0 && data.APP_EMPL_TIMEEMPL < 10){
    data.RES_SCCARD_SCORE_1+= -0.3406;
}
else {
    if (data.APP_EMPL_TIMEEMPL>=10 && data.APP_EMPL_TIMEEMPL < 22){
        data.RES_SCCARD_SCORE_1+= -0.3115;
    }
    else {
        if (data.APP_EMPL_TIMEEMPL>=22 && data.APP_EMPL_TIMEEMPL < 38){
            data.RES_SCCARD_SCORE_1+= -0.2631;
        }
        else {
            if (data.APP_EMPL_TIMEEMPL>=38 && data.APP_EMPL_TIMEEMPL < 57){
                data.RES_SCCARD_SCORE_1+= -0.1451;
            }
            else {
                if (data.APP_EMPL_TIMEEMPL>=57 && data.APP_EMPL_TIMEEMPL < 92){
                    data.RES_SCCARD_SCORE_1+= -0.0117;
                }
                else {
                    data.RES_SCCARD_SCORE_1+= 0;
                }
            }
        }
    }
}

/*RES_AGE - Возраст клиента*/
if (data.RES_AGE >= 18 && data.RES_AGE <22){
    data.RES_SCCARD_SCORE_1+= -0.9322;
}
else {
    if (data.RES_AGE >= 22 && data.RES_AGE <29){
        data.RES_SCCARD_SCORE_1+= -0.4426;
    }
    else {
        if (data.RES_AGE >= 29 && data.RES_AGE <45){
            data.RES_SCCARD_SCORE_1+= -0.4361;
        }
        else {
            if (data.RES_AGE >= 45 && data.RES_AGE <51){
                data.RES_SCCARD_SCORE_1+= -0.3509;
            }
            else {
                if (data.RES_AGE >= 51 && data.RES_AGE <58){
                    data.RES_SCCARD_SCORE_1+= -0.2194;
                }
                else {
                    if (data.RES_AGE >= 58){
                        data.RES_SCCARD_SCORE_1+= 0;
                    }
                }
            }
        }
    }
}

/*APP_CUST_GENDER - Пол клиента  */
if (data.APP_CUST_GENDER == 'M'){
    data.RES_SCCARD_SCORE_1+= -0.3561;
}
else {
    data.RES_SCCARD_SCORE_1+= 0;
}

data.RES_SCCARD_SCORE_1 = data.RES_SCCARD_SCORE_1*72.1347520444482 + 782.192809488736;

data.nodeName = 'AppScoreAB';