var act_addr_1= new Array('OWN','DUAL','OTHER','RENT');
var act_addr_2= new Array('PARENTS','COMMUN','HOSTEL');

var empl_activity_1= new Array('MINING', 'BUILD');
var empl_activity_2= new Array('METALL', 'TRANSP', 'ENERGY', 'LOWYER', 'TOURISM', 'REALEST');
var empl_activity_3= new Array('AGRICUL', 'MECHAN', 'SERV', 'OTHER');
var empl_activity_4= new Array('PUBLIC', 'MILIT', 'IT', 'FOOD');
var empl_activity_5= new Array('EDUCAT', 'COMMUN', 'MEDIC', 'BANK');

/*Запорожье_Юг_Центр*/
var branch_1= new Array('A248','A251','A261','A280','A286','A292','A339','A33Z','A34Z','A36Z','AN3Z',   'A208','A259','A262','A272','A294','A31X','A35K','AN3X','AN4T','AN4X','ANEX','A210',
    'A233','A234','A247','A254','A267','A333','ABHE','AN33','A225','A33H','A34H','AN4H', 'A230','A238','A31T','A32T','A33T','AN3T','A31G','A358','AN2M','AN48','AN7G','A202',
    'A297','A31J','AN3J','A218','A221','A237','A322','A33D','A34L','A35L','AN37','AN3L', 'AN9L','A203','A206','A222','A263','A295','A32N','A33K','A33N','AN3N','A201','A249',
    'A273','A287','A327','A328','A329','A364','A242','A250','A31U','A31Y','A341','A3D9', 'AN5Y','A204','A32M','A33M','AN7M','AN9M','A31M','AN4W');
/*Днепропетровск_Крым_Восток*/
var branch_2= new Array('A236','A255','A283','A284','A324','A325','AB9D','AN3F','AN4A','A214','A215', 'A216','A231','A253','A3D3','A3D4','A3D5','A3D6','A3D7','A3D8','AN3D','A288','A31E',
    'A31F','AN4K','A275','A337','ABH0','AN2I','AN4P','ANE0','ANE4','ANE6','ANE7','ANE8', 'ANE9','ANEC','ANEE','A207','A235','A277','AN3S','AN6S','AN9S','A212','A271','A31A',
    'A32A','AN3A','A211','A244','A266','A268','A274','A3H6','A3H7','A3H8','A3H9','ABHA', 'AC8U','AN5W');
/*Одесса*/
var branch_3= new Array('A209','A232','A256','A260','A31O','A343','A344','A345','A346','A347','AN3O');
/*Киев*/
var branch_4= new Array('A213','A227','A243','A246','A258','A279','A3K2','A3K6','A3K7','A3K8','A3K9', 'ABAA','AN7K','ANZO');

var param = 7.1445

if (act_addr_1.indexOf(data['APP_ACT_ADDRESS']['ESTATETYPE']) != -1){
    param += 0.10479;
}
else {
    if (act_addr_2.indexOf(data['APP_ACT_ADDRESS']['ESTATETYPE']) != -1){
        param += 0;
    }
    else {
        param += 0;
    }
}

if (data['RES_AGE'] >= 18 && data['RES_AGE'] < 23){
    param += 0;
}
else {
    if (data['RES_AGE'] >= 23 && data['RES_AGE'] < 26){
        param += 0.05482;
    }
    else {
        if (data['RES_AGE'] >= 26 && data['RES_AGE'] < 32){
            param += 0.10048;
        }
        else {
            if (data['RES_AGE'] >= 32 && data['RES_AGE'] < 38){
                param += 0.13074;
            }
            else {
                if (data['RES_AGE'] >= 38 && data['RES_AGE'] < 43){
                    param += 0.07529;
                }
                else {
                    if (data['RES_AGE'] >= 43 && data['RES_AGE'] < 55) {
                        param += 0.06322;
                    }
                    else {
                        if (data['RES_AGE'] >= 55) {
                            param += 0.06420;
                        }
                    }
                }
            }
        }
    }
}

if (data['APP_CUST_GENDER'] == 'M'){
    param += 0.11973;
}
else {
    param += 0;
}

if (data['APP_MARITAL_MARITALCOND'] == 'MARRIED' || data['APP_MARITAL_MARITALCOND'] == 'DIVORCED'){
    param += 0.05239;
}
else {
    if (data['APP_MARITAL_MARITALCOND'] == 'SINGLE'){
        param += 0.00399;
    }
    else {
        if (data['APP_MARITAL_MARITALCOND'] == 'WIDOW'){
            param += 0;
        }
        else {
            param += 0;
        }
    }
}

if (data['APP_SOCSTATUS_EDUCATION'] == 'HIG' || data['APP_SOCSTATUS_EDUCATION'] == 'TWO'){
    param += 0.08977;
}
else {
    if (data['APP_SOCSTATUS_EDUCATION'] == 'TEC' ){
        param += 0.04216;
    }
    else {
        if (data['APP_SOCSTATUS_EDUCATION'] == 'TEC' || data['APP_SOCSTATUS_EDUCATION'] == 'SEC' || data['APP_SOCSTATUS_EDUCATION'] == 'UND'){
            param += 0;
        }
        else {
            param += 0;
        }
    }
}

if (empl_activity_1.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
    param += 0.03273;
}
else {
    if (empl_activity_2.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
        param -= 0.04253;
    }
    else {
        if (data['APP_EMPL_ACTIVITY'] == 'TRADE'){
            param -= 0.09910;
        }
        else {
            if (empl_activity_3.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
                param -= 0.09098;
            }
            else {
                if (empl_activity_4.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
                    param -= 0.12624;
                }
                else {
                    if (empl_activity_5.indexOf(data['APP_EMPL_ACTIVITY']) != -1){
                        param -= 0.17456;
                    }
                    else {
                        param -= 0;
                    }
                }
            }
        }
    }
}

if (data['APP_EMPL_ORGTYPE'] == 'BUSINESS' || data['APP_EMPL_ORGTYPE'] == 'INTERNAT'){
    param += 0.05126;
}
else {
    if (data['APP_EMPL_ORGTYPE'] == 'PRIVATE'){
        param += 0.02595;
    }
    else {
        if (data['APP_EMPL_ORGTYPE'] == 'STATE'){
            param += 0;
        }
    }
}

if (data['APP_EMPL_RANK'] == 'BUSINESS' || data['APP_EMPL_RANK'] == 'ORGLEAD'){
    param += 0.19851;
}
else {
    if (data['APP_EMPL_RANK'] == 'WORKER' ){
        param += 0;
    }
    else {
        param += 0;
    }
}

if (data['APP_EMPL_SOCIALSTATUS'] == 'WORKPENS' || data['APP_EMPL_SOCIALSTATUS'] == 'FULLWORK' ){
    param += 0.64026;
}
else {
    if (data['APP_EMPL_SOCIALSTATUS'] == 'SAILOR' || data['APP_EMPL_SOCIALSTATUS'] == 'PARTWORK' || data['APP_EMPL_SOCIALSTATUS'] == 'DECREE' ){
        param += 0.55122;
    }
    else {
        if (data['APP_EMPL_SOCIALSTATUS'] == 'PENSION' ){
            param += 0.30277;
        }
        else {
            if (data['APP_EMPL_SOCIALSTATUS'] == 'UNEMP' || data['APP_EMPL_SOCIALSTATUS'] == 'STUDENT' ){
                param += 0;
            }
            else {
                param += 0;
            }
        }
    }
}

if (data['APP_PROPERTY_CAR_HAS'] == 'Y'){
    param += 0.15463;
}
else {
    param += 0;
}

if (branch_1.indexOf(data['PROD_CHAR_BRANCH']) != -1){
    param += 0.02808;
}
else {
    if (branch_2.indexOf(data['PROD_CHAR_BRANCH']) != -1){
        param += 0.14301;
    }
    else {
        if (branch_3.indexOf(data['PROD_CHAR_BRANCH']) != -1){
            param += 0.21000;
        }
        else {
            if (branch_4.indexOf(data['PROD_CHAR_BRANCH']) != -1){
                param += 0.34028;
            }
        }
    }
}

data.RES_INC_NOT_CONF = Math.exp(param);

data.nodeName = 'ReconUnconfirm_inc_AB';

