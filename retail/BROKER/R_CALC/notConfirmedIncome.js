// JavaScript Document

function Datediff(days_diff ){
    var dateOpen = days_diff; // дата на входе
    var today = Date.now();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

var card_type = new Array ('W','W_F','W_T');
var socEducate = new Array('POS','SEC','TEC','UND');
var branch1 = new Array('DD','VO','KG','CN','VI','KT','SU','PL','TE','CS','MK','CV','DZ');
var branch2 = new Array ('KR','HM','ZP','ZR','NK','LG','IF','RO','LV','HA');
var branch3 = new Array ('DO','HE','MR','DN','SI');
var branch4 = new Array ('K2','K3','K4','K5','KI');
var addrEstateType = new Array ('OWN','DUAL','OTHER','RENT');
var branchKiev = new Array('A213','A227','A243','A246','A258','A279','A3K2','A3K6','A3K7','A3K8','A3K9','ABAA','AN7K','ANZO');
var branchOdessa = new Array('A209','A232','A256','A260','A31O','A343','A344','A345','A346','A347','AN3O');

var branchDneCrEast = new Array("A236","A255","A283","A284","A324","A325","AB9D","AN3F","AN4A","A214","A215","A216","A231",
    "A253","A3D3","A3D4","A3D5","A3D6","A3D7","A3D8","AN3D","A288","A31E","A31F","AN4K","A275",
    "A337","ABH0","AN2I","AN4P","ANE0","ANE4","ANE6","ANE7","ANE8","ANE9","ANEC","ANEE","A207",
    "A235","A277","AN3S","AN6S","AN9S","A212","A271","A31A","A32A","AN3A","A211","A244","A266",
    "A268","A274","A3H6","A3H7","A3H8","A3H9","ABHA","AC8U","AN5W");

var branchZapSouCent = new Array("A248","A251","A261","A280","A286","A292","A339","A33Z","A34Z","A36Z","AN3Z","A208","A259",
    "A262","A272","A294","A31X","A35K","AN3X","AN4T","AN4X","ANEX","A210","A233","A234","A247",
    "A254","A267","A333","ABHE","AN33","A225","A33H","A34H","AN4H","A230","A238","A31T","A32T",
    "A33T","AN3T","A31G","A358","AN2M","AN48","AN7G","A202","A297","A31J","AN3J","A218","A221",
    "A237","A322","A33D","A34L","A35L","AN37","AN3L","AN9L","A203","A206","A222","A263","A295",
    "A32N","A33K","A33N","AN3N","A201","A249","A273","A287","A327","A328","A329","A364","A242",
    "A250","A31U","A31Y","A341","A3D9","AN5Y","A204","A32M","A33M","AN7M","AN9M","A31M","AN4W");
data.LOCAL_DISP_SCORE_TABLE = [];

//----------------------------Searching Income Tickets-----

data.LOCAL_TICKET_FLAG = 'N';

for (var i=0; i<data.DOC_IDENT.length; i++) {
    if (data.DOC_IDENT[i].CUST_ID == data.APP_CUST_ID && data.DOC_IDENT[i].TICKET != undefined && Datediff(data.DOC_IDENT[i].TICKETDATE)<=5)
    {
        data.LOCAL_TICKET_FLAG = 'Y';
    }
}

data.RES_HAS_INC_CONF = data.LOCAL_TICKET_FLAG;

//---------------------------ZP SRED-----------

data.LOCAL_DEBCARD_Z_SRED = 0;
data.LOCAL_DEBCARD_P_SRED = 0;
data.RES_DEBCARD_ZP_PAN = '';
data.RES_DEBCARD_ZP = 'N';
data.RES_DEBCARD_Z_SRED = 0;
data.RES_DEBCARD_PENS_PAN = '';
data.RES_DEBCARD_PENS = 'N'
data.RES_DEBCARD_P_SRED = 0;
data.LOCAL_PERSONAL_SRED = 0;
data.LOCAL_PERSONAL_ACTIVE = 'N';
data.LOCAL_STUD_SRED = 0;
data.LOCAL_STUD_ACTIVE = 'N';


for (var i=0; i<data.DATA_DEBCARD.length; i++) {
    if (card_type.indexOf(data.DATA_DEBCARD[i].TYPE_CARD) != -1 && data.DATA_DEBCARD[i].ACTIVE =='Y') {
        if (Datediff(data.DATA_DEBCARD[i].DATE_START)>90) {
            data.LOCAL_DEBCARD_Z_SRED = (data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02+data.DATA_DEBCARD[i].Z03)/3;
        }
        else {
            data.LOCAL_DEBCARD_Z_SRED = Math.max(data.DATA_DEBCARD[i].Z01,data.DATA_DEBCARD[i].Z02);
        }
        data.RES_DEBCARD_Z_SRED += data.LOCAL_DEBCARD_Z_SRED;
        data.RES_DEBCARD_ZP = 'Y';
        data.RES_DEBCARD_ZP_PAN = data.DATA_DEBCARD[i].PAN + ';'+ data.RES_DEBCARD_ZP_PAN;
    }

    if (data.DATA_DEBCARD[i].TYPE_CARD =='L' && data.DATA_DEBCARD[i].ACTIVE =='Y') {
        switch (true)
        {
            case (Datediff(data.DATA_DEBCARD[i].DATE_START)>=120): data.LOCAL_DEBCARD_P_SRED = (data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02+data.DATA_DEBCARD[i].Z03)/3; break;
            case (Datediff(data.DATA_DEBCARD[i].DATE_START)>=90):  data.LOCAL_DEBCARD_P_SRED = (data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02+data.DATA_DEBCARD[i].Z03/3)/3; break;
            case (Datediff(data.DATA_DEBCARD[i].DATE_START)>=60):  data.LOCAL_DEBCARD_P_SRED = (data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02/3)/2; break;
            case (Datediff(data.DATA_DEBCARD[i].DATE_START)>=30):  data.LOCAL_DEBCARD_P_SRED = (data.DATA_DEBCARD[i].Z01)/3; break;
        }
        if (data.DATA_DEBCARD[i].BANK =='AB' && data.LOCAL_DEBCARD_P_SRED>5000) {
            data.RES_DEBCARD_P_SRED += 5000;
        }
        else {
            data.RES_DEBCARD_P_SRED += data.LOCAL_DEBCARD_P_SRED;
        }
        data.RES_DEBCARD_PENS = 'Y';
        data.RES_DEBCARD_PENS_PAN = data.DATA_DEBCARD[i].PAN + ';'+ data.RES_DEBCARD_PENS_PAN;
    }

    if (data.DATA_DEBCARD[i].TYPE_CARD =='P' && data.DATA_DEBCARD[i].ACTIVE =='Y') {
        data.LOCAL_PERSONAL_SRED = Math.min(data.DATA_DEBCARD[i].Z01,(data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02)/2,(data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02+data.DATA_DEBCARD[i].Z03)/3);
        data.LOCAL_PERSONAL_ACTIVE = 'Y';
    }

    if (data.DATA_DEBCARD[i].TYPE_CARD =='S' && data.DATA_DEBCARD[i].ACTIVE =='Y') {
        data.LOCAL_STUD_SRED = Math.min(data.DATA_DEBCARD[i].Z01,(data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02)/2,(data.DATA_DEBCARD[i].Z01+data.DATA_DEBCARD[i].Z02+data.DATA_DEBCARD[i].Z03)/3);
        data.LOCAL_STUD_ACTIVE = 'Y';
    }
}

//---------------------------------OKPO----------

data.LOCAL_DEBCARD_CHECK_OKPO = 'N';
data.LOCAL_TICKET_SALLARY = data.APP_INCOME_MONTHSALARY_EXT;

for (var i=0; i<data.DATA_DEBCARD.length; i++) {
    if (card_type.indexOf(data.DATA_DEBCARD[i].TYPE_CARD) != -1 && data.DATA_DEBCARD[i].ACTIVE =='Y' && data.DATA_DEBCARD[i].OKPO_ZP != undefined) {
        if (data.APP_EMPL_OKPO ==data.DATA_DEBCARD[i].OKPO_ZP && data.RES_HAS_INC_CONF == 'Y') {
            data.LOCAL_DEBCARD_CHECK_OKPO = 'Y';
        }
    }
}

//-------------------------------INCOME----

if ((data.RES_DEBCARD_PENS == 'Y' && data.RES_DEBCARD_P_SRED !=0) || (data.RES_DEBCARD_ZP == 'Y' && data.RES_DEBCARD_Z_SRED !=0)) {
    if (data.RES_DEBCARD_PENS == 'Y') {
        data.LOCAL_INCOME_MONTHSALARY = data.RES_DEBCARD_P_SRED + data.DATA_OB_ALL;
        if (data.APP_EMPL_SOCIALSTATUS == 'WORKPENS' && data.RES_HAS_INC_CONF =='Y') {
            data.LOCAL_INCOME_MONTHSALARY = data.LOCAL_TICKET_SALLARY + data.DATA_OB_ALL;
        }
    }
    if (data.RES_DEBCARD_ZP == 'Y') {
        data.LOCAL_INCOME_MONTHSALARY = data.RES_DEBCARD_Z_SRED + data.DATA_OB_ALL;
        if (data.RES_DEBCARD_PENS == 'Y') {
            data.LOCAL_INCOME_MONTHSALARY += data.RES_DEBCARD_P_SRED + data.DATA_OB_ALL;
        }
        if (data.LOCAL_DEBCARD_CHECK_OKPO == 'N' && data.RES_HAS_INC_CONF =='Y') {
            data.LOCAL_INCOME_MONTHSALARY += data.LOCAL_TICKET_SALLARY + data.DATA_OB_ALL;
        }
    }
}
else {
    if (data.DATA_WORK_TOP1000 =='Y') {
        if (data.RES_HAS_INC_CONF =='Y') {
            data.LOCAL_INCOME_MONTHSALARY = data.LOCAL_TICKET_SALLARY + data.DATA_OB_ALL;
        }
        else {
            if (data.DATA_WORK_TOP1000_INN =='Y') {
                data.LOCAL_INCOME_MONTHSALARY = data.DATA_WORK_TOP1000_ZP*0.82 + data.DATA_OB_ALL;
            }
            else {
                data.LOCAL_INCOME_OTHERSOURCE += data.LOCAL_INCOME_MONTHSALARY;
                data.LOCAL_INCOME_MONTHSALARY = data.DATA_OB_ALL;
            }
        }
    }
    else {
        if (data.LOCAL_STUD_ACTIVE =='Y' && data.LOCAL_STUD_SRED>0) {
            data.LOCAL_INCOME_MONTHSALARY = data.LOCAL_STUD_SRED + data.DATA_OB_ALL;
        }
        else {
            if (data.RES_HAS_INC_CONF !='Y') {
                data.LOCAL_INCOME_OTHERSOURCE += data.LOCAL_INCOME_MONTHSALARY;
                if (data.DATA_OB_ALL != undefined && data.DATA_OB_ALL >0) {
                    data.LOCAL_INCOME_MONTHSALARY = data.DATA_OB_ALL;
                }
                else {
                    data.LOCAL_INCOME_MONTHSALARY = 0;
                }
            }
        }
    }
}

//-----------------------------Not Confirmed-----------------------------------

if (data.PROD_CHAR_BANK == 'PB') {
    data.LOCAL_DISP_SCORE_TABLE [0] = 8.77999;
    if (data.APP_CUST_GENDER == 'M') {
        data.LOCAL_DISP_SCORE_TABLE [1] = 0;
    }
    else {
        data.LOCAL_DISP_SCORE_TABLE [1] = -0.23538;
    }
    if (data.APP_ACT_ADDRESS_ESTATETYPE == 'OTHER') {
        data.LOCAL_DISP_SCORE_TABLE [2] = -0.14726;
    }
    else {
        if (data.APP_ACT_ADDRESS_ESTATETYPE == 'RENT' || data.APP_ACT_ADDRESS_ESTATETYPE == 'DUAL') {
            data.LOCAL_DISP_SCORE_TABLE [2] = -0.04048;
        }
        else {
            if (data.APP_ACT_ADDRESS_ESTATETYPE == 'OWN') {
                data.LOCAL_DISP_SCORE_TABLE [2] = 0;
            }
            else {
                data.LOCAL_DISP_SCORE_TABLE [2] = -0.1789;
            }
        }
    }
    switch (data.APP_EMPL_RANK) {
        case 'BUSINESS': data.LOCAL_DISP_SCORE_TABLE [3] = 0.60533; break;
        case 'ORGLEAD':  data.LOCAL_DISP_SCORE_TABLE [3] = 0.62443; break;
        case 'WORKER':   data.LOCAL_DISP_SCORE_TABLE [3] = 0.23798; break;
        default: data.LOCAL_DISP_SCORE_TABLE [3] = 0; break;
    }
    if (data.APP_EMPL_ACTIVITY == 'PUBLIC' || data.APP_EMPL_ACTIVITY == 'AGRICUL' || data.APP_EMPL_ACTIVITY == 'FOOD' || data.APP_EMPL_ACTIVITY == 'MECHAN' || data.APP_EMPL_ACTIVITY == 'BANK') {
        data.LOCAL_DISP_SCORE_TABLE [4] = -0.28455;
    }
    else {
        if (data.APP_EMPL_ACTIVITY == 'ENERGY' || data.APP_EMPL_ACTIVITY == 'OTHER' || data.APP_EMPL_ACTIVITY == 'SERV' || data.APP_EMPL_ACTIVITY == 'METALL') {
            data.LOCAL_DISP_SCORE_TABLE [4] = -0.24388;
        }
        else {
            if (data.APP_EMPL_ACTIVITY == 'TRANSP' || data.APP_EMPL_ACTIVITY == 'IT' || data.APP_EMPL_ACTIVITY == 'TOURISM' || data.APP_EMPL_ACTIVITY == 'MINING' || data.APP_EMPL_ACTIVITY == 'BUILD') {
                data.LOCAL_DISP_SCORE_TABLE [4] = -0.14718;
            }
            else {
                if (data.APP_EMPL_ACTIVITY == 'REALEST' || data.APP_EMPL_ACTIVITY == 'LOWYER') {
                    data.LOCAL_DISP_SCORE_TABLE [4] = -0.14718;
                }
                else {
                    data.LOCAL_DISP_SCORE_TABLE [4] = -0.34006;
                }
            }
        }
    }
    switch (data.APP_EMPL_ORGTYPE) {
        case 'PRIVATE':   data.LOCAL_DISP_SCORE_TABLE [5] = 0.1352; break;
        case 'INTERNAT':  data.LOCAL_DISP_SCORE_TABLE [5] = 0.29001; break;
        case 'BUSINESS':  data.LOCAL_DISP_SCORE_TABLE [5] = 0.26154; break;
        default: data.LOCAL_DISP_SCORE_TABLE [5] = 0; break;
    }
    if (socEducate.indexOf(data.APP_SOCSTATUS_EDUCATION) != -1) {
        data.LOCAL_DISP_SCORE_TABLE [6] = -0.40773;
    }
    else {
        if (data.APP_SOCSTATUS_EDUCATION == 'HIG') {
            data.LOCAL_DISP_SCORE_TABLE [6] = -0.19598;
        }
        else {
            if (data.APP_SOCSTATUS_EDUCATION == 'TWO') {
                data.LOCAL_DISP_SCORE_TABLE [6] = 0;
            }
            else {
                data.LOCAL_DISP_SCORE_TABLE [6] = -0.40773;
            }
        }
    }
    if (data.APP_PROPERTY_CAR == 'Y') {
        data.LOCAL_DISP_SCORE_TABLE [7] = 0;
    }
    else {
        data.LOCAL_DISP_SCORE_TABLE [7] = -0.18417;
    }
    switch (true) {
        case data.RES_AGE<18:  data.LOCAL_DISP_SCORE_TABLE [8] = -0.0748; break;
        case data.RES_AGE>=18 && data.RES_AGE<19:  data.LOCAL_DISP_SCORE_TABLE [8] = -0.23583; break;
        case data.RES_AGE>=20 && data.RES_AGE<22:  data.LOCAL_DISP_SCORE_TABLE [8] = -0.16052; break;
        case data.RES_AGE>=23 && data.RES_AGE<27:  data.LOCAL_DISP_SCORE_TABLE [8] = -0.02654; break;
        case data.RES_AGE>=28 && data.RES_AGE<44:  data.LOCAL_DISP_SCORE_TABLE [8] = 0.01888; break;
        case data.RES_AGE>=45 && data.RES_AGE<51:  data.LOCAL_DISP_SCORE_TABLE [8] = -0.01486; break;
        case data.RES_AGE>=52 && data.RES_AGE<62:  data.LOCAL_DISP_SCORE_TABLE [8] = 0.00227; break;
        default: data.LOCAL_DISP_SCORE_TABLE [8] = 0; break;
    }
    if (branch1.indexOf(data.PROD_CHAR_BRANCH.substr(0,2)) != -1) {
        data.LOCAL_DISP_SCORE_TABLE [9] = -0.41038;
    }
    else {
        if (branch2.indexOf(data.PROD_CHAR_BRANCH.substr(0,2)) != -1) {
            data.LOCAL_DISP_SCORE_TABLE [9] = -0.32787;
        }
        else {
            if (branch3.indexOf(data.PROD_CHAR_BRANCH.substr(0,2)) != -1) {
                data.LOCAL_DISP_SCORE_TABLE [9] = -0.26315;
            }
            else {
                if (data.PROD_CHAR_BRANCH.substr(0,2) == 'SE' || data.PROD_CHAR_BRANCH.substr(0,2) == 'OD') {
                    data.LOCAL_DISP_SCORE_TABLE [9] = -0.17171;
                }
                else {
                    if (branch4.indexOf(data.PROD_CHAR_BRANCH.substr(0,2)) != -1) {
                        data.LOCAL_DISP_SCORE_TABLE [9] = 0;
                    }
                    else {
                        data.LOCAL_DISP_SCORE_TABLE [9] = -0.41038;
                    }
                }
            }
        }
    }
}

// -----------------------------------AB------------------------------------

if (data.PROD_CHAR_BANK == 'AB') {
    data.LOCAL_DISP_SCORE_TABLE [0] = 7.14450;
    if (addrEstateType.indexOf(data.APP_ACT_ADDRESS_ESTATETYPE) != -1) {
        data.LOCAL_DISP_SCORE_TABLE [1] = 0.10479;
    }
    else {
        data.LOCAL_DISP_SCORE_TABLE [1] = 0;
    }
    switch (true) {
        case data.RES_AGE>=55:  data.LOCAL_DISP_SCORE_TABLE [2] = 0.06420; break;
        case data.RES_AGE>=43 && data.RES_AGE<54:  data.LOCAL_DISP_SCORE_TABLE [2] = 0.06322; break;
        case data.RES_AGE>=38 && data.RES_AGE<42:  data.LOCAL_DISP_SCORE_TABLE [2] = 0.07529; break;
        case data.RES_AGE>=32 && data.RES_AGE<37:  data.LOCAL_DISP_SCORE_TABLE [2] = 0.13074; break;
        case data.RES_AGE>=26 && data.RES_AGE<31:  data.LOCAL_DISP_SCORE_TABLE [2] = 0.10048; break;
        case data.RES_AGE>=23 && data.RES_AGE<25:  data.LOCAL_DISP_SCORE_TABLE [2] = 0.05482; break;
        case data.RES_AGE<22:  data.LOCAL_DISP_SCORE_TABLE [2] = 0; break;
        default: data.LOCAL_DISP_SCORE_TABLE [2] = 0; break;
    }
    if (data.APP_CUST_GENDER == 'M') {
        data.LOCAL_DISP_SCORE_TABLE [3] = 0.11973;
    }
    else {
        data.LOCAL_DISP_SCORE_TABLE [3] = 0;
    }
    if (data.APP_MARITAL_MARITALCOND == 'MARRIED' || data.APP_MARITAL_MARITALCOND == 'DIVORCED') {
        data.LOCAL_DISP_SCORE_TABLE [4] = 0.05239;
    }
    else {
        if (data.APP_MARITAL_MARITALCOND == 'SINGLE') {
            data.LOCAL_DISP_SCORE_TABLE [4] = 0.00399;
        }
        else {
            data.LOCAL_DISP_SCORE_TABLE [4] = 0;
        }
    }
    if (data.APP_SOCSTATUS_EDUCATION == 'HIG' || data.APP_SOCSTATUS_EDUCATION == 'TWO') {
        data.LOCAL_DISP_SCORE_TABLE [5] = 0.08977;
    }
    else {
        if (data.APP_SOCSTATUS_EDUCATION == 'TEC') {
            data.LOCAL_DISP_SCORE_TABLE [5] = 0.04216;
        }
        else {
            data.LOCAL_DISP_SCORE_TABLE [5] = 0;
        }
    }
    if (data.APP_EMPL_ACTIVITY == 'MINING' || data.APP_EMPL_ACTIVITY == 'BUILD') {
        data.LOCAL_DISP_SCORE_TABLE [6] = 0.03273;
    }
    else {
        if (data.APP_EMPL_ACTIVITY == 'METALL' || data.APP_EMPL_ACTIVITY == 'TRANSP' || data.APP_EMPL_ACTIVITY == 'ENERGY' || data.APP_EMPL_ACTIVITY == 'LOWYER' || data.APP_EMPL_ACTIVITY == 'TOURISM' || data.APP_EMPL_ACTIVITY == 'REALEST') {
            data.LOCAL_DISP_SCORE_TABLE [6] = -0.04253;
        }
        else {
            if (data.APP_EMPL_ACTIVITY == 'TRADE') {
                data.LOCAL_DISP_SCORE_TABLE [6] = -0.09910;
            }
            else {
                if (data.APP_EMPL_ACTIVITY == 'AGRICUL' || data.APP_EMPL_ACTIVITY == 'MECHAN' || data.APP_EMPL_ACTIVITY == 'SERV' || data.APP_EMPL_ACTIVITY == 'OTHER') {
                    data.LOCAL_DISP_SCORE_TABLE [6] = -0.09098;
                }
                else {
                    if (data.APP_EMPL_ACTIVITY == 'PUBLIC' || data.APP_EMPL_ACTIVITY == 'MILIT' || data.APP_EMPL_ACTIVITY == 'IT' || data.APP_EMPL_ACTIVITY == 'FOOD') {
                        data.LOCAL_DISP_SCORE_TABLE [6] = -0.12624;
                    }
                    else {
                        if (data.APP_EMPL_ACTIVITY == 'EDUCAT' || data.APP_EMPL_ACTIVITY == 'COMMUN' || data.APP_EMPL_ACTIVITY == 'MEDIC' || data.APP_EMPL_ACTIVITY == 'BANK') {
                            data.LOCAL_DISP_SCORE_TABLE [6] = -0.17456;
                        }
                        else {
                            data.LOCAL_DISP_SCORE_TABLE [6] = 0;
                        }
                    }
                }
            }
        }
    }
    switch (data.APP_EMPL_ORGTYPE) {
        case 'PRIVATE':   data.LOCAL_DISP_SCORE_TABLE [7] = 0.02595; break;
        case 'INTERNAT':  data.LOCAL_DISP_SCORE_TABLE [7] = 0.05126; break;
        case 'BUSINESS':  data.LOCAL_DISP_SCORE_TABLE [7] = 0.05126; break;
        default: data.LOCAL_DISP_SCORE_TABLE [7] = 0; break;
    }
    switch (data.APP_EMPL_RANK) {
        case 'BUSINESS': data.LOCAL_DISP_SCORE_TABLE [8] = 0.19851; break;
        case 'ORGLEAD':  data.LOCAL_DISP_SCORE_TABLE [8] = 0.19851; break;
        case 'WORKER':   data.LOCAL_DISP_SCORE_TABLE [8] = 0; break;
        default: data.LOCAL_DISP_SCORE_TABLE [8] = 0; break;
    }
    if (data.APP_EMPL_SOCIALSTATUS == 'FULLWORK' || data.APP_EMPL_SOCIALSTATUS == 'WORKPENS') {
        data.LOCAL_DISP_SCORE_TABLE [9] = 0.64026;
    }
    else {
        if (data.APP_EMPL_SOCIALSTATUS == 'SAILOR' || data.APP_EMPL_SOCIALSTATUS == 'PARTWORK' || data.APP_EMPL_SOCIALSTATUS == 'DECREE') {
            data.LOCAL_DISP_SCORE_TABLE [9] = 0.55122;
        }
        else {
            if (data.APP_EMPL_SOCIALSTATUS == 'PENSION') {
                data.LOCAL_DISP_SCORE_TABLE [9] = 0.30277;
            }
            else {
                data.LOCAL_DISP_SCORE_TABLE [9] = 0;
            }
        }
    }
    if (data.APP_PROPERTY_CAR == 'Y') {
        data.LOCAL_DISP_SCORE_TABLE [10] = 0.15463;
    }
    else {
        data.LOCAL_DISP_SCORE_TABLE [10] = 0;
    }
    if (branchKiev.indexOf(data.PROD_CHAR_BRANCH) != -1) {
        data.LOCAL_DISP_SCORE_TABLE [11] = 0.34028;
    }
    else {
        if (branchOdessa.indexOf(data.PROD_CHAR_BRANCH) != -1) {
            data.LOCAL_DISP_SCORE_TABLE [11] = 0.21000;
        }
        else {
            if (branchDneCrEast.indexOf(data.PROD_CHAR_BRANCH) != -1) {
                data.LOCAL_DISP_SCORE_TABLE [11] = 0.14301;
            }
            else {
                if (branchZapSouCent.indexOf(data.PROD_CHAR_BRANCH) != -1) {
                    data.LOCAL_DISP_SCORE_TABLE [11] = 0.02808;
                }
                else {
                    data.LOCAL_DISP_SCORE_TABLE [11] = 0;
                }
            }
        }
    }
}
//--------------------------Total score-------------------------------------

data.LOCAL_DISP_SCORE = 0;

for (var i=0; i<data.LOCAL_DISP_SCORE_TABLE.length; i++) {
    data.LOCAL_DISP_SCORE = data.LOCAL_DISP_SCORE + data.LOCAL_DISP_SCORE_TABLE[i];
}

//-------------------------------Exp----------------------------------------

data.RES_INC_NOT_CONF = Math.exp(data.LOCAL_DISP_SCORE);


//-----------------------------Income-----------------------------------------

if (data.PROD_CHAR_BANK == 'AB' || data.PROD_CHAR_BANK == 'PB') {
    if (data.RES_INC_NOT_CONF * 1.5 > data.LOCAL_INCOME_OTHERSOURCE) {
        data.RES_INC_NOT_CONF = data.LOCAL_INCOME_OTHERSOURCE;
    }
}
else {
    if (data.RES_INC_NOT_CONF * 1.3 > data.LOCAL_INCOME_OTHERSOURCE) {
        data.RES_INC_NOT_CONF = data.LOCAL_INCOME_OTHERSOURCE;
    }
}
