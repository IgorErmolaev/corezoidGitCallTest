/*var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\..\\LimitRestrictions\\for_test\\LimitRestrictionsVIP.json').toString();
var data = JSON.parse(json).data;
*/

//*******************************************************************************************************************************************


//var upTypes = new Array('CHLIMIT','UPLIMIT','UPLIMNKK');
var typeVIP = new Array('PPFT','REPL','EXIT','FREE','FORL','LOYL','UPGR','LOY1','FRE3','EXI2','PPF1','REP1','EXI1','FRE1','FOR1','LOYD','UPG1','LODB','EXID','EXIB','LOY2','LODM','VIPP','MCWS',
    'MCWL','WS55','WS05','WS0P','WS5P','MCWF','WS00','INFI','INFA','INFL','INPA','INPI');

data.RES_VIP_NEED_SZ = 'N';
data.RES_VIP_PERS_MANAGER = 'Y';

if ( data.RES_LIMIT_ITOG > 50000 ){
    if (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP'){
        switch (data.RES_PROD_TYPE){
            case 'UNI':
                data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,50000);
                break;
            case 'GOLD':
                data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,75000);
                break;
            default :
                data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,50000);
        }
    }
    else {
        data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,100000);
    }

}

if ( data.PROD_CHAR_BANK == 'PB' && (data.APP_CUST_IMPORTANT_PRODUCT == 'VP' || data.RES_PROD_TYPE == 'VIP')){

    if (data.APP_CUST_IMPORTANT_PRODUCT == 'VP' && data.APP_CUST_IMPORTANT_LIMIT >0 && data.APP_CUST_IMPORTANT_LIMIT>=data.RES_LIMIT_ITOG){
        data.RES_LIMIT_ITOG = data.RES_CRED_LIM + data.LOCAL_VIP_BALANCE;
    }

    if ((data.APP_CUST_IMPORTANT_PRODUCT != 'VP' || data.APP_CUST_IMPORTANT_LIMIT<data.RES_LIMIT_ITOG) && data.RES_PROD_TYPE == 'VIP'){
        if (data.LOCAL_VIP_SUM_LIMIT_FOR_IMPORTANT == undefined){data.LOCAL_VIP_SUM_LIMIT_FOR_IMPORTANT =0;}
        data.RES_LIMIT_ITOG = data.RES_LIMIT_ITOG - data.LOCAL_VIP_SUM_LIMIT_FOR_IMPORTANT + data.RES_CRED_LIM;
        data.RES_LIMIT_ITOG = Math.max(data.RES_LIMIT_ITOG,0);
    }

    if (data.RES_LIMIT_ITOG >= data.PROD_CHAR_LIMITREQUESTED){
        if (data.DATA_OPER_IS_VIP_MANAGER == 'Y'){
            data.RES_LIMIT_ITOG = data.PROD_CHAR_LIMITREQUESTED;
        }
        else {
            if (data.PROD_CHAR_LIMITREQUESTED >25000){
                data.RES_LIMIT_ITOG = Math.max(Math.min(data.RES_LIMIT_ITOG,25000),data.RES_CRED_LIM);
                data.RES_VIP_PERS_MANAGER = 'N';
            }
            else {
                data.RES_LIMIT_ITOG = data.PROD_CHAR_LIMITREQUESTED;
            }
        }
    }
    else {
        if (data.DATA_OPER_IS_VIP_MANAGER == 'Y'){
            data.RES_VIP_NEED_SZ = 'Y';
        }
        else {
            if (data.PROD_CHAR_LIMITREQUESTED >25000){
                data.RES_LIMIT_ITOG =  Math.max(Math.min(data.RES_LIMIT_ITOG,25000),data.RES_CRED_LIM);
                data.RES_VIP_PERS_MANAGER = 'N';
            }
        }
    }

    if (data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L102') != -1){
        data.RES_VIP_NEED_SZ = 'Y';
    }

    if (data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L116') != -1 || data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L127') != -1){
        data.RES_VIP_PERS_MANAGER = 'N';
    }

    if (typeVIP.indexOf(data.PROD_CHAR_TYPE_CARD)==-1 && data.RES_VIP_NEED_SZ == 'Y'){
        data.RES_VIP_NEED_SZ = 'N';
    }

    if (data.LOCAL_VIP_NO_NEED_SZ == 'Y'){
        data.RES_VIP_NEED_SZ = 'N';
    }
}




if (Math.abs(data.RES_LIMIT_ITOG - data.RES_CRED_LIM) + data.LOCAL_VIP_SUM_LIMIT_FOR_IMPORTANT > 100000){
    data.RES_LIMIT_ITOG = 0;
    data.RES_VIP_NEED_SZ = 'N';
    data.RES_VIP_PERS_MANAGER = 'Y';
}

if (data.RES_LIMIT_ITOG< 300 && data.THE_RIP == 'Y' && data.DATA_LIMIT_OTHERBANK >0){
    data.RES_LIMIT_ITOG =  300;
}

data.retsr_vip_end = data.RES_LIMIT_ITOG;

data.nodeName = 'LimitRestrictionsVIP';
