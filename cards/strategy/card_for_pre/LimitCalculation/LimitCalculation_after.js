
function exlVnesh (arrLimitType){
    if (arrLimitType != undefined){
        for (var i=0; i< arrLimitType.length; i++){
            if (['ZP','CASHPAYM','LIMIT_OLD','DEPOS','STUD','HYSTORY','SOTR','PENS','ACC_INCOME','IMPORTANT','JUNIOR'].indexOf(arrLimitType[i])!= -1){
                return 'Y';
            }
        }
        return 'N';
    }
    else {
        return 'N';
    }
}


data.RES_LIMIT_ITOG = data.RES_LIMIT[0];
data.RES_LIMIT_ITOG_TYPE = data.RES_LIMIT_TYPE[0];
for (var i=0; i< data.RES_LIMIT.length;i++){
    if (data.RES_LIMIT[i] > data.RES_LIMIT_ITOG) {
        data.RES_LIMIT_ITOG = data.RES_LIMIT[i];
        data.RES_LIMIT_ITOG_TYPE = data.RES_LIMIT_TYPE[i];
    }
}

/*if (data.RES_LIMIT_TYPE.indexOf('DECREE') != -1 &&  data.RES_LIMIT_TYPE.indexOf('ZP')== -1 &&  data.RES_LIMIT_TYPE.indexOf('SOTR')== -1 &&  data.RES_LIMIT_TYPE.indexOf('DEPOS')== -1
 &&  data.RES_LIMIT_TYPE.indexOf('HYSTORY')== -1){
 data.RES_LIMIT_ITOG = data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('DECREE')];
 data.RES_LIMIT_ITOG_TYPE = 'DECREE';
 }*/

if (data.RES_LIMIT_ITOG == 0 && data.RES_LIMIT_ITOG_TYPE == ''){
    data.RES_LIMIT_ITOG_TYPE = 'VNESH';
}

if (data.RES_TYPE_CUST  != 'INTERN' && data.RES_TYPE_CUST  != 'NEW_INTERN'  && data.RES_LIMIT_TYPE.indexOf('NEW')!= -1 && data.RES_LIMIT_TYPE.indexOf('IMPORTANT')== -1 && data.APP_CUST_IMPORTANT_LIMIT<=0){
    data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG, data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('NEW')]);
    data.RES_LIMIT_ITOG_TYPE = 'NEW';
}

var exlVal = exlVnesh(data.RES_LIMIT_TYPE);

if (data.APP_EMPL_SOCIALSTATUS == 'DECREE' && data.RES_LIMIT_TYPE.indexOf('DECREE') != -1 && exlVal != 'Y'){
    data.RES_LIMIT_ITOG = data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('DECREE')];
    data.RES_LIMIT_ITOG_TYPE = 'DECREE';
}

if (data.APP_EMPL_SOCIALSTATUS == 'STUDENT' && data.RES_LIMIT_TYPE.indexOf('STUD_VN') != -1 && exlVal != 'Y'){
    data.RES_LIMIT_ITOG = data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('STUD_VN')];
    data.RES_LIMIT_ITOG_TYPE = 'STUD_VN';
}

if (data.APP_EMPL_SOCIALSTATUS == 'UNEMP' && data.RES_LIMIT_TYPE.indexOf('UNEMP') != -1 && exlVal != 'Y'){
    data.RES_LIMIT_ITOG = data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('UNEMP')];
    data.RES_LIMIT_ITOG_TYPE = 'UNEMP';
}

if (data.APP_EMPL_SOCIALSTATUS == 'PENSION' && data.RES_LIMIT_TYPE.indexOf('PENS_VN') != -1 && exlVal != 'Y'){
    data.RES_LIMIT_ITOG = data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('PENS_VN')];
    data.RES_LIMIT_ITOG_TYPE = 'PENS_VN';
}

data.RES_LIMIT_PLAT = data.RES_LIMIT_ITOG;

if (data.LIMIT_FOR_GOLD == 'Y'){
    data.LOCAL_LIMIT_FOR_GOLD_ITOG = data.RES_LIMIT_ITOG;
    data.RES_LIMIT_ITOG = 0;
    data.RES_LIMIT_ITOG_TYPE = '';
}

data.nodeName = 'LimitCalculation_after';