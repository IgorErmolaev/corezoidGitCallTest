var actAdr = new Array('SETL_CITY','SETL_COUN','COUNTRY','PGT','SETTLEMENT','SMALL_VILLAGE','VILLAGE');
var emplActivity1 = new Array('BANK','EDUCAT','IT','MEDIC','MILIT');
var emplActivity2 = new Array('COMMUN','LOWYER','MECHAN','PUBLIC');

data.RES_SCCARD_CALL_BAL = 123;
data.RES_SCCARD_CALL_NAME = 'CC_CALL_0113';

/*возраст*/
if (data.RES_AGE < 18 || (data.RES_AGE >= 21 && data.RES_AGE < 44)){
    data.RES_SCCARD_CALL_BAL += 0;
}
else {
    if (data.RES_AGE >= 18 && data.RES_AGE < 19){
        data.RES_SCCARD_CALL_BAL += 31.51;
    }
    else {
        if (data.RES_AGE >= 19 && data.RES_AGE < 20){
            data.RES_SCCARD_CALL_BAL += 21.01;
        }
        else {
            if (data.RES_AGE >= 20 && data.RES_AGE < 21){
                data.RES_SCCARD_CALL_BAL += 10.5;
            }
            else {
                if (data.RES_AGE >= 44 && data.RES_AGE < 55){
                    data.RES_SCCARD_CALL_BAL += -10.5;
                }
                else {
                    if (data.RES_AGE >= 55){
                        data.RES_SCCARD_CALL_BAL += -21.01;
                    }
                }
            }
        }
    }
}

/*активный кредит*/
if (data.RES_CRED_ACTIVE == 'Y'){
    data.RES_SCCARD_CALL_BAL += 36.39;
}
else {
    data.RES_SCCARD_CALL_BAL += 0;
}

/*пол клиента*/
if (data.APP_CUST_GENDER == 'M'){
    data.RES_SCCARD_CALL_BAL += 22.72;
}
else {
    data.RES_SCCARD_CALL_BAL += 0;
}

/*Debcard_zp*/
if (data.RES_DEBCARD_ZP == 'Y'){
    data.RES_SCCARD_CALL_BAL += -23.65;
}
else {
    data.RES_SCCARD_CALL_BAL += 0;
}

/*Cельская местность*/
if (actAdr.indexOf(data.APP_ACT_ADDRESS.SUBTOWN) != -1){
    data.RES_SCCARD_CALL_BAL += 14.82;
}
else {
    data.RES_SCCARD_CALL_BAL += 0;
}

/*Образование*/
if (data.APP_SOCSTATUS_EDUCATION == 'POS' || data.APP_SOCSTATUS_EDUCATION == 'SEC' || data.APP_SOCSTATUS_EDUCATION == 'UND'){
    data.RES_SCCARD_CALL_BAL += 12.23;
}
else {
    if (data.APP_SOCSTATUS_EDUCATION == 'HIG' || data.APP_SOCSTATUS_EDUCATION == 'TWO' ){
        data.RES_SCCARD_CALL_BAL += -12.23;
    }
    else {
        data.RES_SCCARD_CALL_BAL += 0;
    }
}

/*Сфера деятельности*/
if (emplActivity1.indexOf(data.APP_EMPL_ACTIVITY) != -1){
    data.RES_SCCARD_CALL_BAL += -20.88;
}
else {
    if (emplActivity2.indexOf(data.APP_EMPL_ACTIVITY) != -1){
        data.RES_SCCARD_CALL_BAL += -13.92;
    }
    else {
        if (data.APP_EMPL_ACTIVITY == 'METALL' || data.APP_EMPL_ACTIVITY == 'OTHER' || data.APP_EMPL_ACTIVITY == 'ENERGY'){
            data.RES_SCCARD_CALL_BAL += -6.96;
        }
        else {
            data.RES_SCCARD_CALL_BAL += 0;
        }
    }
}

/*Тип собственности*/
if (data.APP_EMPL_ORGTYPE == 'STATE'){
    data.RES_SCCARD_CALL_BAL += -9.11;
}
else {
    data.RES_SCCARD_CALL_BAL += 0;
}

/*RELATION_CaLL_LIMIT*/
var relationCallLimit ;
relationCallLimit = data.APP_INCOME_MONTHSALARY + data.APP_INCOME_OTHERSOURCE;
if (relationCallLimit != 0){
    relationCallLimit = data.RES_LIMIT_ITOG/ relationCallLimit;
}
else {
    relationCallLimit = -1;
}

if (relationCallLimit>=0 && relationCallLimit<0.3){
    data.RES_SCCARD_CALL_BAL += 6.84;
}
else {
    if (relationCallLimit>=0.3 && relationCallLimit<1.5){
        data.RES_SCCARD_CALL_BAL += 0;
    }
    else {
        if (relationCallLimit>=1.5 && relationCallLimit<4){
            data.RES_SCCARD_CALL_BAL += -6.84;
        }
        else {
            if (relationCallLimit>=4){
                data.RES_SCCARD_CALL_BAL += -13.68;
            }
            else {
                data.RES_SCCARD_CALL_BAL += 0;
            }
        }
    }
}

/**/
if (data.RES_DEPOSIT_TOTAL >0 && data.RES_DEPOSIT_TOTAL < 200 ){
    data.RES_SCCARD_CALL_BAL += 14.07;
}
else {
    if (data.RES_DEPOSIT_TOTAL >= 200){
        data.RES_SCCARD_CALL_BAL += -14.07;
    }
    else {
        data.RES_SCCARD_CALL_BAL += 0;
    }
}

data.nodeName = 'ScoreCall';