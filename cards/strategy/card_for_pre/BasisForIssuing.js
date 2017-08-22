data.RES_CUST_IS_HISTORY = 'N';
data.RES_CUST_IS_PENS_VN = 'N';
data.RES_IS_STUD = 'N';
data.RES_CUST_IS_DEPOS = 'N';
data.RES_CUST_IS_CASHPAYM = 'N';
data.RES_CUST_IS_TOP1000 = 'N';
data.RES_CUST_IS_PENS = 'N';
data.RES_CUST_IS_ZP = 'N';
data.RES_CUST_IS_SOTR = 'N';

for (var i=0; i< data.RES_LIMIT_TYPE.length; i++){
    if (data.RES_LIMIT_TYPE[i] == 'HYSTORY' && data.RES_LIMIT[i] > 0){
        data.RES_CUST_IS_HISTORY = 'Y';
    }
    if (data.RES_LIMIT_TYPE[i] == 'PENS_VN' && data.RES_LIMIT[i] > 0){
        data.RES_CUST_IS_PENS_VN = 'Y';
    }
    if (data.RES_LIMIT_TYPE[i] == 'STUD' && data.RES_LIMIT[i] > 0){
        data.RES_IS_STUD = 'Y';
    }
    if (data.RES_LIMIT_TYPE[i] == 'DEPOS' && data.RES_LIMIT[i] > 0){
        data.RES_CUST_IS_DEPOS = 'Y';
    }
    if (data.RES_LIMIT_TYPE[i] == 'CASHPAYM' && data.RES_LIMIT[i] > 0){
        data.RES_CUST_IS_CASHPAYM = 'Y';
    }
    if (data.RES_LIMIT_TYPE[i] == 'TOP-1000' && data.RES_LIMIT[i] > 0){
        data.RES_CUST_IS_TOP1000 = 'Y';
    }
    if (data.RES_LIMIT_TYPE[i] == 'PENS' && data.RES_LIMIT[i] > 0){
        data.RES_CUST_IS_PENS = 'Y';
    }
    if (data.RES_LIMIT_TYPE[i] == 'ZP' && data.RES_LIMIT[i] > 0){
        data.RES_CUST_IS_ZP = 'Y';
    }
    if (data.RES_LIMIT_TYPE[i] == 'SOTR' && data.RES_LIMIT[i] > 0){
        data.RES_CUST_IS_SOTR = 'Y';
    }
}

data.RES_CRED_KOD = '5';

if (data.LOCAL_TICKET_FLAG_TEHPASSP == 'Y'){
    data.RES_CRED_KOD = 'Я';
}

if (data.THE_RIP == 'Y'){
    if (data.PROD_CHAR_BANK == 'PB'){
        data.RES_CRED_KOD = 'Ч';
    }
    if (data.PROD_CHAR_BANK == 'AB'){
        data.RES_CRED_KOD = 'У';
    }
}

if (data.RES_CUST_IS_TOP1000 == 'Y' && data.DATA_WORK_TOP1000 == 'Y' && data.DATA_WORK_TOP1000 == 'WHITEWORK'){
    data.RES_CRED_KOD = 'Э';
}

if (data.RES_CUST_IS_SOTR == 'Y' || data.RES_CUST_IS_ZP == 'Y'){
    data.RES_CRED_KOD='1';
}

if (data.RES_CUST_IS_PENS == 'Y'){
    data.RES_CRED_KOD='L';
}

if (data.DATA_WORK_TOP1000 == 'Y'){
    data.RES_CRED_KOD='N';
}

if (data.RES_LIMIT_ITOG_TYPE == 'HYSTORY' && data.APP_CUST_SPECIALPROJECT == 'POSSIBIL'){
    data.RES_CRED_KOD='Ь';
}

if (data.RES_CUST_IS_CASHPAYM == 'Y'){
    data.RES_CRED_KOD='7';
}

if (data.RES_CUST_IS_HISTORY == 'Y'){
    data.RES_CRED_KOD='2';
}

if (data.RES_CUST_IS_DEPOS == 'Y'){
    data.RES_CRED_KOD='3';
}

if (data.RES_IS_STUD == 'Y'){
    data.RES_CRED_KOD='8';
}

if (data.RES_CUST_IS_PENS_VN == 'Y'){
    data.RES_CRED_KOD='L';
}

data.nodeName = 'BasisForIssuing';