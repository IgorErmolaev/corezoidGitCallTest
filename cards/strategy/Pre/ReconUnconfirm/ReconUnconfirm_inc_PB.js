var reg_1= new Array('город Киев','город Севастополь');
var reg_2= new Array('КИЕВСКАЯ', 'ОДЕССКАЯ');
var reg_3= new Array('ХАРЬКОВСКАЯ', 'ЛУГАНСКАЯ','НИКОЛАЕВСКАЯ','КИРОВОГРАДСКАЯ','ХЕРСОНСКАЯ','ДНЕПРОПЕТРОВСКАЯ','ЗАПОРОЖСКАЯ','ВИННИЦКАЯ','ДОНЕЦКАЯ','ЗАКАРПАТСКАЯ','ЛЬВОВСКАЯ','нет в справ');
var reg_4= new Array('ПОЛТАВСКАЯ', 'КРЫМ', 'ИВАНО-ФРАНКОВСКАЯ', 'ЧЕРНОВИЦКАЯ','ЖИТОМИРСКАЯ','ХМЕЛЬНИЦКАЯ','РОВЕНСКАЯ','ЧЕРКАССКАЯ','ВОЛЫНСКАЯ','СУМСКАЯ','ЧЕРНИГОВСКАЯ','ТЕРНОПОЛЬСКАЯ' , '');

var param = 6.58577;

if (data['APP_ACT_ADDRESS_ESTATETYPE'] == 'RENT' || data['APP_ACT_ADDRESS_ESTATETYPE'] == ''){
    param+=0.03275;
}
else {
    if (data['APP_ACT_ADDRESS_ESTATETYPE'] == 'OWN' || data['APP_ACT_ADDRESS_ESTATETYPE'] == 'OTHER'){
        param+=0.02025;
    }
    else {
        if (data['APP_ACT_ADDRESS_ESTATETYPE'] == 'DUAL'){
            param+=0.01031;
        }
        else {
            if (data['APP_ACT_ADDRESS_ESTATETYPE'] == 'HOSTEL' || data['APP_ACT_ADDRESS_ESTATETYPE'] == 'PARENTS' || data['APP_ACT_ADDRESS_ESTATETYPE'] == 'COMMUN'){
                param+=0;
            }
            else {
                param+=0.03275;
            }
        }
    }
}

if (data['APP_ACT_ADDRESS']['SUBTOWN'] == 'CITY' || data['APP_ACT_ADDRESS']['SUBTOWN'] == 'SETTLEMENT' || data['APP_ACT_ADDRESS']['SUBTOWN'] == ''){
    param+=0.01880;
}
else {
    if (data['APP_ACT_ADDRESS']['SUBTOWN'] == 'PGT' || data['APP_ACT_ADDRESS']['SUBTOWN'] == 'VILLAGE' || data['APP_ACT_ADDRESS']['SUBTOWN']== 'TOWN') {
        param += 0;
    }
    else {
        param += 0.03275;
    }
}

if (data['RES_AGE'] < 21){
    param+=0;
}
else {
    if ((data['RES_AGE'] >= 21 && data['RES_AGE'] <25) || data['RES_AGE'] >= 55){
        param+=0.01261;
    }
    else {
        if ((data['RES_AGE'] >= 25 && data['RES_AGE'] <30) || (data['RES_AGE'] >= 50 && data['RES_AGE'] < 55)){
            param+=0.02310;
        }
        else {
            if (data['RES_AGE'] >= 30 && data['RES_AGE'] <50){
                param+=0.03965;
            }
            else {
                param+=0;
            }
        }
    }
}

if (data['APP_CUST_GENDER'] == 'M'){
    param+=0.17429;
}
else {
    param+=0;
}

if (data['APP_MARITAL_MARITALCOND'] == 'MARRIED' || data['APP_MARITAL_MARITALCOND'] == 'CIVILMER' || data['APP_MARITAL_MARITALCOND'] == 'DIVORCED'){
    param+=0.01597;
}
else {
    if (data['APP_MARITAL_MARITALCOND'] == 'SINGLE' || data['APP_MARITAL_MARITALCOND'] == 'WIDOW' || data['APP_MARITAL_MARITALCOND'] == ''){
        param+=0;
    }
    else {
        param+=0;
    }
}

if (data['APP_SOCSTATUS_EDUCATION'] == 'TWO'){
    param+=0.36754;
}
else {
    if (data['APP_SOCSTATUS_EDUCATION'] == 'HIG'){
        param+=0.12619;
    }
    else {
        if (data['APP_SOCSTATUS_EDUCATION'] == 'TEC'){
            param+=0.03191;
        }
        else {
            param+=0;
        }
    }
}

if (data['APP_EMPL_ORGTYPE'] == 'BUSINESS' || data['APP_EMPL_ORGTYPE'] == 'INTERNAT'){
    param+=0.47154;
}
else {
    if (data['APP_EMPL_ORGTYPE'] == 'PRIVATE'){
        param+=0.33454;
    }
    else {
        if (data['APP_EMPL_ORGTYPE'] == 'STATE'){
            param+=0.17647;
        }
        else {
            param+=0;
        }
    }
}

if (data['APP_EMPL_RANK'] == 'BUSINESS' || data['APP_EMPL_RANK'] == 'ORGLEAD'){
    param+=0.26918;
}
else {
    if (data['APP_EMPL_RANK'] == 'WORKER'){
        param+=0.03731;
    }
    else {
        param+=0;
    }
}

if (data['APP_EMPL_SOCIALSTATUS'] == 'WORKPENS'){
    param+=0.39540;
}
else {
    if (data['APP_EMPL_SOCIALSTATUS'] == 'FULLWORK'){
        param+=0.31821;
    }
    else {
        if (data['APP_EMPL_SOCIALSTATUS'] == 'SAILOR' || data['APP_EMPL_SOCIALSTATUS'] == 'PARTWORK' || data['APP_EMPL_SOCIALSTATUS'] == ''){
            param+=0.31422;
        }
        else {
            if (data['APP_EMPL_SOCIALSTATUS'] == 'PENSION' || data['APP_EMPL_SOCIALSTATUS'] == 'DECREE' || data['APP_EMPL_SOCIALSTATUS'] == 'UNEMP'){
                param+=0.26132;
            }
            else {
                if (data['APP_EMPL_SOCIALSTATUS'] == 'STUDENT'){
                    param+=0;
                }
            }
        }
    }
}

if (data['APP_EMPL_TIMEEMPL'] <= 0){
    param+=0;
}
else {
    if (data['APP_EMPL_TIMEEMPL'] >= 1 && data['APP_EMPL_TIMEEMPL'] < 12){
        param+=0.06521;
    }
    else {
        if ((data['APP_EMPL_TIMEEMPL'] >= 12 && data['APP_EMPL_TIMEEMPL'] < 48) || (data['APP_EMPL_TIMEEMPL'] >= 240 && data['APP_EMPL_TIMEEMPL'] < 1000)){
            param+=0.14684;
        }
        else {
            if (data['APP_EMPL_TIMEEMPL'] >= 48 && data['APP_EMPL_TIMEEMPL'] < 240) {
                param+=0.16998;
            }
            else {
                param+=0;
            }
        }
    }
}

if (data['APP_PROPERTY_CAR_HAS' == 'Y']){
    param+=0.11529;
}
else {
    param+=0;
}

if (reg_1.indexOf(data['APP_ACT_ADDRESS']['ID_REGION_SP']) != -1){
    param+=0.36966;
}
else {
    if (reg_2.indexOf(data['APP_ACT_ADDRESS']['ID_REGION_SP']) != -1){
        param+=0.17704;
    }
    else {
        if (reg_3.indexOf(data['APP_ACT_ADDRESS']['ID_REGION_SP']) != -1){
            param+=0.06564;
        }
        else {
            if (reg_4.indexOf(data['APP_ACT_ADDRESS']['ID_REGION_SP']) != -1){
                param+=0;
            }
        }
    }
}

if (data['PROD_CHAR_LIMITREQUESTED']<1000){
    param+=0;
}
else {
    if (data['PROD_CHAR_LIMITREQUESTED']>=1000 && data['PROD_CHAR_LIMITREQUESTED']<1500){
        param+=0.09852;
    }
    else {
        if (data['PROD_CHAR_LIMITREQUESTED']>=1500 && data['PROD_CHAR_LIMITREQUESTED']<3000){
            param+=0.27891;
        }
        else {
            if (data['PROD_CHAR_LIMITREQUESTED']>=3000 && data['PROD_CHAR_LIMITREQUESTED']<5000){
                param+=0.40435;
            }
            else {
                if (data['PROD_CHAR_LIMITREQUESTED']>=5000 && data['PROD_CHAR_LIMITREQUESTED']<15000){
                    param+=0.57245;
                }
                else {
                    if (data['PROD_CHAR_LIMITREQUESTED']>=15000){
                        param+=0.78226;
                    }
                    else {
                        param+=0;
                    }
                }
            }
        }
    }
}

if (data['LOCAL_CONTACT_PHONE_WORK'] != '' && data['LOCAL_CONTACT_PHONE_WORK'] != undefined){
    param+=0.05876;
}
else {
    param+=0;
}

data.RES_INC_NOT_CONF = Math.exp(param);

data.nodeName = 'ReconUnconfirm_inc_PB';