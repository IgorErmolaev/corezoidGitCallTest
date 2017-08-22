var branch1 = new Array('A225', 'A33H', 'A34H', 'AN4H', 'A229', 'A240', 'A31R', 'A32P', 'A32R', 'A34P', 'ABRO','A205', 'A31V', 'A32V', 'A33V', 'A351', 'AN3V', 'AN4V');
var branch2 = new Array('A226', 'A289', 'A32I', 'A33I', 'A34I', 'A403', 'ABIF', 'AC56', 'AN3I', 'AN6Q', 'A210', 'A233', 'A234', 'A247', 'A254', 'A267', 'A333', 'ABHE', 'AN33', 'A334',
    'A432','A200', 'A219', 'A228', 'A239', 'A31C', 'A32C', 'AN3C','A281', 'A331', 'AN31', 'ANEJ','A275', 'A337', 'ABH0', 'AN2I', 'AN4P', 'ANE0', 'ANE4', 'ANE6', 'ANE7', 'ANE8', 'ANE9', 'ANEC', 'ANEE','A285', 'AN4J');
var branch3 = new Array('A31G', 'A358', 'AN2M', 'AN48', 'AN7G', 'A208', 'A259', 'A262', 'A272', 'A294', 'A31X', 'A35K', 'AN3X', 'AN4T', 'AN4X', 'ANEX','A252', 'A32E', 'AN3E', 'ANES',
    'A218', 'A221', 'A237', 'A322', 'A33D', 'A34L', 'A35L', 'AN37', 'AN3L', 'AN9L', 'A264','A204', 'A32M', 'A33M', 'AN7M', 'AN9M','A202', 'A297', 'A31J', 'AN3J','A203', 'A206', 'A222', 'A263', 'A295',
    'A32N', 'A33K', 'A33N', 'AN3N','A242', 'A250', 'A31U', 'A31Y', 'A341', 'A3D9', 'AN5Y','A211', 'A244', 'A266', 'A268', 'A274', 'A3H6', 'A3H7', 'A3H8', 'A3H9', 'ABHA', 'AC8U', 'AN5W','A245', 'A32B',
    'A342', 'A37K', 'AN2B', 'AN38', 'AN3B','A248', 'A251', 'A261', 'A280', 'A286', 'A292', 'A339', 'A33Z', 'A34Z', 'A36Z', 'AN3Z');
var branch4 = new Array('A223', 'A224', 'A241', 'A348', 'A349', 'A350', 'A37W', 'ABVI','A230', 'A238', 'A31T', 'A32T', 'A33T', 'AN3T','A326', 'A33Q', 'A34Q', 'AN3Q', 'AN5Q', 'A411');
var branch5 = new Array('A257', 'A32G', 'A332', 'A335', 'A33U', 'AN3U', 'AN50', 'A209', 'A232', 'A256', 'A260', 'A31O', 'A343', 'A344', 'A345', 'A346', 'A347', 'AN3O',
    'A270','A201', 'A249', 'A273', 'A287', 'A327', 'A328', 'A329', 'A364', 'A31M', 'AN4W', 'A213', 'A227', 'A243', 'A246', 'A258', 'A279', 'A3K2',
    'A3K6', 'A3K7', 'A3K8', 'A3K9', 'ABAA', 'AN7K', 'ANZO', 'A291', 'A33B');

var typeLimit1 = new Array('DECREE', 'STUD_VN', 'UNEMP','LIMIT_OLD', 'NEW');
var typeLimit2 = new Array('PENS_VN','HYSTORY', 'VNESH');


data.RES_SCCARD_SCORE_SALDO = 4.3706;

/* PROD_CHAR_BRANCH - Городпо бранчу;*/
if (branch1.indexOf(data.PROD_CHAR_BRANCH) != -1){
    data.RES_SCCARD_SCORE_SALDO += -0.6970;
}
else {
    if (branch2.indexOf(data.PROD_CHAR_BRANCH) != -1){
        data.RES_SCCARD_SCORE_SALDO += -0.5079;
    }
    else {
        if (branch3.indexOf(data.PROD_CHAR_BRANCH) != -1){
            data.RES_SCCARD_SCORE_SALDO += -0.3243;
        }
        else {
            if (branch4.indexOf(data.PROD_CHAR_BRANCH) != -1){
                data.RES_SCCARD_SCORE_SALDO += -0.3015;
            }
            else {
                if (branch5.indexOf(data.PROD_CHAR_BRANCH) != -1){
                    data.RES_SCCARD_SCORE_SALDO += 0;
                }
            }
        }
    }
}

/*APP_MARITAL_CONSSOCSTAT - Трудоустроен(а) супруга / супруг;*/
if (data.APP_MARITAL_CONSSOCSTAT == 'N'){
    data.RES_SCCARD_SCORE_SALDO += -0.2508;
}
else {
    if (data.APP_MARITAL_CONSSOCSTAT == 'Y'){
        data.RES_SCCARD_SCORE_SALDO += 0;
    }
    else {
        data.RES_SCCARD_SCORE_SALDO += -0.8408;
    }
}

/*APP_EMPL_SOCIALSTATUS - Социальный статус (тип занятости);*/
if (data.APP_EMPL_SOCIALSTATUS == 'DECREE'){
    data.RES_SCCARD_SCORE_SALDO += -0.8634;
}
else {
    if (data.APP_EMPL_SOCIALSTATUS == 'STUDENT'){
        data.RES_SCCARD_SCORE_SALDO += -0.4767;
    }
    else {
        if (data.APP_EMPL_SOCIALSTATUS == 'UNEMP' || data.APP_EMPL_SOCIALSTATUS == 'SAILOR'){
            data.RES_SCCARD_SCORE_SALDO += -0.4214;
        }
        else {
            if (data.APP_EMPL_SOCIALSTATUS == 'PARTWORK' ){
                data.RES_SCCARD_SCORE_SALDO += -0.3486;
            }
            else {
                if (data.APP_EMPL_SOCIALSTATUS == 'PENSION' ){
                    data.RES_SCCARD_SCORE_SALDO += -0.3033;
                }
                else {
                    if (data.APP_EMPL_SOCIALSTATUS == 'FULLWORK' ){
                        data.RES_SCCARD_SCORE_SALDO += -0.1747;
                    }
                    else {
                        if (data.APP_EMPL_SOCIALSTATUS == 'WORKPENS' ){
                            data.RES_SCCARD_SCORE_SALDO += 0;
                        }
                    }
                }
            }
        }
    }
}

/*LOCAL_BLCL_COLOR - ЧС. Цвета кодификаторов ЧС;*/
if (data.LOCAL_BLCL_COLOR == 'Y'){
    data.RES_SCCARD_SCORE_SALDO += -1.5119;
}
else {
    if (data.LOCAL_BLCL_COLOR == 'G'){
        data.RES_SCCARD_SCORE_SALDO += 0;
    }
    else {
        data.RES_SCCARD_SCORE_SALDO += -0.1111;
    }
}

/*RES_HAS_INC_CONF - Наличие справки о доходе;*/
if (data.RES_HAS_INC_CONF == 'N'){
    data.RES_SCCARD_SCORE_SALDO += -1.0597;
}
else {
    if (data.RES_HAS_INC_CONF == 'Y'){
        data.RES_SCCARD_SCORE_SALDO += 0;
    }
}

/*PROD_CHAR_LIMITREQUESTED - Запрашиваемый клиентом лимит;*/
if (data.PROD_CHAR_LIMITREQUESTED <= 500){
    data.RES_SCCARD_SCORE_SALDO += -1.4605;
}
else {
    if (data.PROD_CHAR_LIMITREQUESTED > 500 && data.PROD_CHAR_LIMITREQUESTED <= 1000){
        data.RES_SCCARD_SCORE_SALDO += -0.8607;
    }
    else {
        if (data.PROD_CHAR_LIMITREQUESTED > 1000 && data.PROD_CHAR_LIMITREQUESTED <= 2000){
            data.RES_SCCARD_SCORE_SALDO += -0.5912;
        }
        else {
            if (data.PROD_CHAR_LIMITREQUESTED > 2000 && data.PROD_CHAR_LIMITREQUESTED <= 3000){
                data.RES_SCCARD_SCORE_SALDO += -0.1678;
            }
            else {
                if (data.PROD_CHAR_LIMITREQUESTED > 3000 && data.PROD_CHAR_LIMITREQUESTED <= 5000){
                    data.RES_SCCARD_SCORE_SALDO += -0.1593;
                }
                else {
                    if (data.PROD_CHAR_LIMITREQUESTED > 5000 && data.PROD_CHAR_LIMITREQUESTED <= 10000){
                        data.RES_SCCARD_SCORE_SALDO +=-0.0026;
                    }
                    else {
                        if (data.PROD_CHAR_LIMITREQUESTED > 10000 ){
                            data.RES_SCCARD_SCORE_SALDO += 0;
                        }
                    }
                }
            }
        }
    }
}

/*RES_LIMIT_ITOG - Итоговый лимит;*/
if (data.RES_LIMIT_ITOG == 0){
    data.RES_SCCARD_SCORE_SALDO += -3.0989;
}
else {
    if (data.RES_LIMIT_ITOG > 0 && data.RES_LIMIT_ITOG <=500){
        data.RES_SCCARD_SCORE_SALDO += -2.9214;
    }
    else {
        if (data.RES_LIMIT_ITOG > 500 && data.RES_LIMIT_ITOG <=1400){
            data.RES_SCCARD_SCORE_SALDO += -2.2231;
        }
        else {
            if (data.RES_LIMIT_ITOG > 1400 && data.RES_LIMIT_ITOG <=2000){
                data.RES_SCCARD_SCORE_SALDO += -1.1055;
            }
            else {
                if (data.RES_LIMIT_ITOG > 2000 && data.RES_LIMIT_ITOG <=3000){
                    data.RES_SCCARD_SCORE_SALDO += -0.6393;
                }
                else {
                    if (data.RES_LIMIT_ITOG > 3000 && data.RES_LIMIT_ITOG <=4000){
                        data.RES_SCCARD_SCORE_SALDO += -0.3802;
                    }
                    else {
                        if (data.RES_LIMIT_ITOG > 4000){
                            data.RES_SCCARD_SCORE_SALDO += 0;
                        }
                    }
                }
            }
        }
    }
}

/*RES_LIMIT_ITOG_TYPE - Тип итогового лимита;*/
if (typeLimit1.indexOf(data.RES_LIMIT_ITOG_TYPE) != -1){
    data.RES_SCCARD_SCORE_SALDO += -0.3395;
}
else {
    if (typeLimit2.indexOf(data.RES_LIMIT_ITOG_TYPE) != -1){
        data.RES_SCCARD_SCORE_SALDO += 0;
    }

}

/*RES_PROD_TYPE - Группа типов договора;*/
if (data.RES_PROD_TYPE == 'UNI'){
    data.RES_SCCARD_SCORE_SALDO += -0.2210;
}
else {
    if (data.RES_PROD_TYPE == 'GOLD'){
        data.RES_SCCARD_SCORE_SALDO += 0;
    }
}

/*RES_DEPOSIT_ACTIVE - Наличие открытого депозита;*/
if (data.RES_DEPOSIT_ACTIVE == 'Y'){
    data.RES_SCCARD_SCORE_SALDO += -0.7929;
}
else {
    if (data.RES_DEPOSIT_ACTIVE == 'N'){
        data.RES_SCCARD_SCORE_SALDO += 0;
    }
}

/*RES_CRED_ACTIVE - Наличие открытого депозита;*/
if (data.RES_CRED_ACTIVE == 'Y'){
    data.RES_SCCARD_SCORE_SALDO += -0.1681;
}
else {
    if (data.RES_CRED_ACTIVE == 'N'){
        data.RES_SCCARD_SCORE_SALDO += 0;
    }
}

data.RES_SCCARD_SCORE_SALDO = data.RES_SCCARD_SCORE_SALDO*72.1347520444482 + 782.192809488736;


data.nodeName = 'AppScoreAB_Saldo';











