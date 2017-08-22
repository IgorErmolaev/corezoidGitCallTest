var fil1 = new Array('СЕВЕРО-ЗАПАДНОЕ РУ', 'ЮГО-ЗАПАДНОЕ РУ', 'СУМСКОЙ ФИЛИАЛ');
var fil2 = new Array('ВИННИЦКИЙ ФИЛИАЛ', 'ЖИТОМИРСКОЕ РУ', 'ПОЛТАВСКОЕ ГРУ', 'ЧЕРКАССКОЕ ГРУ');
var fil3 = new Array('ЗАПАДНОЕ ГРУ (Г. ЛЬВОВ)', 'ЧЕРНИГОВСКОЕ РУ', 'КРАМАТОРСКИЙ ФИЛИАЛ', 'КРЕМЕНЧУГСКИЙ ФИЛИАЛ');
var fil4 = new Array('КИРОВОГРАДСКОЕ РУ', 'ХАРЬКОВСКОЕ ГРУ');
var fil5 = new Array('ДНЕПРОПЕТРОВСКОЕ РУ', 'КРИВОРОЖСКИЙ ФИЛИАЛ','ПЕЧЕРСКИЙ ФИЛИАЛ, Г.КИЕВ', 'ЮГО-ВОСТОЧНОЕ РУ' , 'ВОСТОЧНОЕ РУ');
var fil6 = new Array('ЮЖНОЕ ГРУ', 'НИКОЛАЕВСКОЕ РУ', 'ФИЛИАЛ "КИЕВСИТИ"', 'КИЕВСКОЕ ГРУ', 'РАСЧЕТНЫЙ ЦЕНТР Г.КИЕВ', 'СТОЛИЧНЫЙ ФИЛИАЛ');

var actAdrEstate1 = new Array('HOSTEL', 'COMMUN', 'OTHER', 'PARENTS');


data.RES_SCCARD_NAME_SALDO = 'CC_SS_0515';
data.RES_SCCARD_SCORE_SALDO = 689.89;

/*PROD_CHAR_BRANCH_FIL - Филиал;*/
if (fil1.indexOf(data.PROD_CHAR_BRANCH_FIL) != -1){
    data.RES_SCCARD_SCORE_SALDO += -35.54;
}
else {
    if (fil2.indexOf(data.PROD_CHAR_BRANCH_FIL) != -1){
        data.RES_SCCARD_SCORE_SALDO += -21.14;
    }
    else {
        if (fil3.indexOf(data.PROD_CHAR_BRANCH_FIL) != -1){
            data.RES_SCCARD_SCORE_SALDO += -19.89;
        }
        else {
            if (fil4.indexOf(data.PROD_CHAR_BRANCH_FIL) != -1){
                data.RES_SCCARD_SCORE_SALDO += -10.59;
            }
            else {
                if (fil5.indexOf(data.PROD_CHAR_BRANCH_FIL) != -1){
                    data.RES_SCCARD_SCORE_SALDO += -6.82;
                }
                else {
                    if (fil6.indexOf(data.PROD_CHAR_BRANCH_FIL) != -1){
                        data.RES_SCCARD_SCORE_SALDO += 0;
                    }
                    else {
                        data.RES_SCCARD_SCORE_SALDO += -19.89;
                    }
                }
            }
        }
    }
}

/*APP_ACT_ADDRESS_ESTATETYPE - Вид владения по адресу проживания;*/
if (actAdrEstate1.indexOf(data.APP_ACT_ADDRESS_ESTATETYPE) != -1){
    data.RES_SCCARD_SCORE_SALDO += -7.57;
}
else {
    data.RES_SCCARD_SCORE_SALDO += 0;
}

/*RES_AGE - Возраст;*/
if (data.RES_AGE >= 18 && data.RES_AGE < 20){
    data.RES_SCCARD_SCORE_SALDO += -24.12;
}
else {
    if (data.RES_AGE >= 20 && data.RES_AGE < 22){
        data.RES_SCCARD_SCORE_SALDO += -12.75;
    }
    else {
        if (data.RES_AGE >= 22 && data.RES_AGE < 24){
            data.RES_SCCARD_SCORE_SALDO += -9.94;
        }
        else {
            if (data.RES_AGE >= 24){
                data.RES_SCCARD_SCORE_SALDO += 0;
            }
            else {
                data.RES_SCCARD_SCORE_SALDO += -24.12;
            }
        }
    }
}

/*RES_CRED_ACTIVE - Наличие активного кредитного продукта;*/
if (data.RES_CRED_ACTIVE == 'N'){
    data.RES_SCCARD_SCORE_SALDO += -7.28;
}
else {
    data.RES_SCCARD_SCORE_SALDO += 0;
}

/*APP_CUST_GENDER - Пол клиента;*/
if (data.APP_CUST_GENDER == 'F'){
    data.RES_SCCARD_SCORE_SALDO += -46.74;
}
else {
    data.RES_SCCARD_SCORE_SALDO += 0;
}

/*RES_HAS_INC_CONF - Наличие справки о доходах;*/
if (data.RES_HAS_INC_CONF == 'Y'){
    data.RES_SCCARD_SCORE_SALDO += 0;
}
else {
    data.RES_SCCARD_SCORE_SALDO += -47.02;
}

/*APP_MARITAL_CONSSOCSTAT - Трудоуйстройство супруга;*/
if (data.APP_MARITAL_CONSSOCSTAT == 'Y'){
    data.RES_SCCARD_SCORE_SALDO += 0;
}
else {
    data.RES_SCCARD_SCORE_SALDO += -2.21;
}

/*APP_MARITAL_MARITALCOND - Семейное положение;*/
if (data.APP_MARITAL_MARITALCOND == 'SINGLE'){
    data.RES_SCCARD_SCORE_SALDO += -2.52;
}
else {
    data.RES_SCCARD_SCORE_SALDO += 0;
}

/*APP_EMPL_SOCIALSTATUS - Социальный статус;*/
if (data.APP_EMPL_SOCIALSTATUS == 'STUDENT'){
    data.RES_SCCARD_SCORE_SALDO += -109.96;
}
else {
    if (data.APP_EMPL_SOCIALSTATUS == 'UNEMP'){
        data.RES_SCCARD_SCORE_SALDO += -48.09;
    }
    else {
        if (data.APP_EMPL_SOCIALSTATUS == 'DECREE'){
            data.RES_SCCARD_SCORE_SALDO += -5.16;
        }
        else {
            if (data.APP_EMPL_SOCIALSTATUS == 'PARTWORK' || data.APP_EMPL_SOCIALSTATUS == 'SAILOR' || data.APP_EMPL_SOCIALSTATUS == 'PENSION'){
                data.RES_SCCARD_SCORE_SALDO += -2.29;
            }
            else {
                data.RES_SCCARD_SCORE_SALDO += 0;
            }
        }
    }
}

/*Сумма указанных доходов в анкете;*/
var sum_inc;
sum_inc = data.APP_INCOME_MONTHSALARY + data.APP_INCOME_OTHERSOURCE;
if (sum_inc >= 0 && sum_inc <1500){
    data.RES_SCCARD_SCORE_SALDO += -28.25;
}
else {
    if (sum_inc >= 1500 && sum_inc <2000){
        data.RES_SCCARD_SCORE_SALDO += -27.23;
    }
    else {
        if (sum_inc >= 2000 && sum_inc < 2500) {
            data.RES_SCCARD_SCORE_SALDO += -25.22;
        }
        else {
            if (sum_inc >= 2500 && sum_inc < 3500) {
                data.RES_SCCARD_SCORE_SALDO += -14.5;
            }
            else {
                if (sum_inc >= 3500 && sum_inc < 4500) {
                    data.RES_SCCARD_SCORE_SALDO += -3.33;
                }
                else {
                    if (sum_inc >= 4500 && sum_inc < 6000) {
                        data.RES_SCCARD_SCORE_SALDO += -0.57;
                    }
                    else {
                        if (sum_inc >= 6000 ) {
                            data.RES_SCCARD_SCORE_SALDO += 0;
                        }
                        else {
                            data.RES_SCCARD_SCORE_SALDO += 0;
                        }
                    }
                }
            }
        }
    }
}

/*RES_LIMIT_ITOG_TYPE - Тип итогового лимита;*/
if (data.RES_LIMIT_ITOG_TYPE == 'STUD_VN' || data.RES_LIMIT_ITOG_TYPE == 'UNEMP' || data.RES_LIMIT_ITOG_TYPE == 'DECREE'){
    data.RES_SCCARD_SCORE_SALDO += 0;
}
else {
    if (data.RES_LIMIT_ITOG_TYPE == 'NEW' ){
        data.RES_SCCARD_SCORE_SALDO += 8.94;
    }
    else {
        data.RES_SCCARD_SCORE_SALDO += 13.82;
    }
}

/*PROD_CHAR_LIMITREQUESTED - Запрашиваемый клиентом лимит;*/
if (data.PROD_CHAR_LIMITREQUESTED >=1 && data.PROD_CHAR_LIMITREQUESTED <1000){
    data.RES_SCCARD_SCORE_SALDO += -63.31;
}
else {
    if (data.PROD_CHAR_LIMITREQUESTED >=1000 && data.PROD_CHAR_LIMITREQUESTED <1500){
        data.RES_SCCARD_SCORE_SALDO += -59.43;
    }
    else {
        if (data.PROD_CHAR_LIMITREQUESTED >=1500 && data.PROD_CHAR_LIMITREQUESTED <2500){
            data.RES_SCCARD_SCORE_SALDO += -33.41;
        }
        else {
            if (data.PROD_CHAR_LIMITREQUESTED >=2500 && data.PROD_CHAR_LIMITREQUESTED <4000){
                data.RES_SCCARD_SCORE_SALDO += -17.04;
            }
            else {
                if (data.PROD_CHAR_LIMITREQUESTED >=4000 && data.PROD_CHAR_LIMITREQUESTED <6000){
                    data.RES_SCCARD_SCORE_SALDO += -12.91;
                }
                else {
                    if (data.PROD_CHAR_LIMITREQUESTED >=6000){
                        data.RES_SCCARD_SCORE_SALDO += 0;
                    }
                    else {
                        data.RES_SCCARD_SCORE_SALDO += -63.31;
                    }
                }
            }
        }
    }
}

/*RES_LIMIT_ITOG - Итоговый лимит;*/
if (data.RES_LIMIT_ITOG == 300){
    data.RES_SCCARD_SCORE_SALDO += -164.87;
}
else {
    if (data.RES_LIMIT_ITOG >= 400 && data.RES_LIMIT_ITOG < 600){
        data.RES_SCCARD_SCORE_SALDO += -161.5;
    }
    else {
        if (data.RES_LIMIT_ITOG >= 600 && data.RES_LIMIT_ITOG < 1000){
            data.RES_SCCARD_SCORE_SALDO += -127.4;
        }
        else {
            if (data.RES_LIMIT_ITOG >= 1000 && data.RES_LIMIT_ITOG < 1500){
                data.RES_SCCARD_SCORE_SALDO += -79.9;
            }
            else {
                if (data.RES_LIMIT_ITOG >= 1500 && data.RES_LIMIT_ITOG < 2000){
                    data.RES_SCCARD_SCORE_SALDO += -24.22;
                }
                else {
                    if (data.RES_LIMIT_ITOG >= 2000 && data.RES_LIMIT_ITOG < 3500){
                        data.RES_SCCARD_SCORE_SALDO += -5.99;
                    }
                    else {
                        if (data.RES_LIMIT_ITOG >= 3500 ){
                            data.RES_SCCARD_SCORE_SALDO += 0;
                        }
                        else {
                            data.RES_SCCARD_SCORE_SALDO += -127.4;
                        }
                    }
                }
            }
        }
    }
}

data.nodeName = 'AppScorePB_Saldo';