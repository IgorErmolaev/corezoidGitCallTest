var limit = 0;
var limit_max = 0;

var startType = new Array('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','UNIPACKSAS','ONLINEANKETA');

/*HYSTORY*/
if (data.BCH_CRED_LIMIT_ACTION >0 && data.BCH_CRED_HIST_YBCH.substr(0,1) != 'N' && data.BCH_CRED_HIST_YBCH.substr(0,1) != 'H' && data.BCH_CRED_HIST_DATA.substr(0,1) != 'N' && data.BCH_CRED_HIST_DATA.substr(0,1) != 'H' &&
0.8 * (data.APP_INCOME_MONTHSALARY + data.APP_INCOME_OTHERSOURCE) >= (data.RES_EXP_MONTH_TOTAL + data.RES_CRED_PLAT_MIN + 0.07*data.BCH_CRED_COUNT_ACT) && data.BCH_CRED_COUNT_ACT_CC <2){
    limit= data.BCH_CRED_LIMIT_ACTION;
    data.RES_LIMIT_CRED_HIST = limit;
    limit_max = data.RTDM_DIC_LIMITPARAM.HYSTORY.HYSTORY.max_sum;
    limit = Math.max(limit,data.RTDM_DIC_LIMITPARAM.HYSTORY.HYSTORY.min_sum);
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.HYSTORY.HYSTORY.max_sum);
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push('HYSTORY');
    data.LOCAL_MAX_LIMIT.push(limit_max);
}

/*JUNIOR*/
limit = 0;
limit_max = 0;

if (data.RES_CUST_IS_EXJUNIOR == 'Y'){
    limit_max = data.RTDM_DIC_LIMITPARAM.JUNIOR.JUNIOR.max_sum;
    limit = data.RTDM_DIC_LIMITPARAM.JUNIOR.JUNIOR.min_sum;
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push('JUNIOR');
    data.LOCAL_MAX_LIMIT.push(limit_max);
}

/*LIMIT_OLD*/
limit = 0;
limit_max = 0;

if (data.LOCAL_RESTRUCTURING >=100 && data.LOCAL_RESTRUCTURING_LIMIT > 0 ){
    limit_max = data.RTDM_DIC_LIMITPARAM.LIMIT_OLD.LIMIT_OLD.max_sum;
    limit = data.LOCAL_RESTRUCTURING_LIMIT;
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push('LIMIT_OLD');
    data.LOCAL_MAX_LIMIT.push(limit_max);
}

/*UPGRADE*/
limit = 0;
limit_max = 0;

if (startType.indexOf(data.PROD_CHAR_TYPE) != -1 && data.PROD_SCHEME_CCY_LOAN == data.LOCAL_CARD_UPGRADE_CCY && data.DATA_CARD_UPGRADE_LIMIT >0 ){
    for (var i=0; i<data.DATA_CRED.length; i++){
        if (data.DATA_CRED[i].REFERENC == data.DATA_CARD_UPGRADE_REFCONTRAC){
            limit = data.DATA_CARD_UPGRADE_LIMIT;
            limit_max = data.RTDM_DIC_LIMITPARAM.UPGRADE.UPGRADE.max_sum;
            limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.UPGRADE.UPGRADE.max_sum);
            data.RES_LIMIT.push(limit);
            data.RES_LIMIT_TYPE.push('UPGRADE');
            data.LOCAL_MAX_LIMIT.push(limit_max);
        }
    }
}


data.nodeName = 'LimCalc_Hystory_Junior_LimitOld_Upgrade';