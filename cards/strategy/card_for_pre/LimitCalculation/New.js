var limit = 0;
var limit_max = 0;

var emplSocstat = new Array('WORKPENS','FULLWORK','PARTWORK', 'SAILOR');


coef = data.RES_COEFF_ELIG/2;

limit = Math.min(Math.max(coef * (data.RES_INC_DISP + data.RES_INC_NOT_CONF - data.RES_EXP_MONTH_TOTAL - data.RES_CRED_PLAT_MIN),data.RTDM_DIC_LIMITPARAM.VNESH.VNESH.min_sum),data.RTDM_DIC_LIMITPARAM.NEW.NEW.max_sum);
limit_max = data.RTDM_DIC_LIMITPARAM.NEW.NEW.max_sum;

if (data.RES_AGE < 22){
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.VNESH.AGElt22.max_sum);
    limit_max = data.RTDM_DIC_LIMITPARAM.VNESH.AGElt22.max_sum;
}
if((data.APP_EMPL_SOCIALSTATUS == 'SAILOR' || data.APP_EMPL_SOCIALSTATUS == 'PARTWORK') && data.RES_PROD_TYPE != 'VIP'){
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.VNESH.PARTWORK.max_sum);
    limit_max = data.RTDM_DIC_LIMITPARAM.VNESH.PARTWORK.max_sum;
}
if (data.APP_EMPL_TIMEEMPL < 6 && emplSocstat.indexOf(data.APP_EMPL_SOCIALSTATUS) !=-1 && data.RES_TYPE_CUST != 'INTERN' && data.RES_PROD_TYPE != 'VIP' && data.LOCAL_POSITIVE_HISTORY == 'N' && data.RES_LIMIT.indexOf('IMPORTANT') ==-1){
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.VNESH.EXPERIENCElt6.max_sum);
    limit_max = data.RTDM_DIC_LIMITPARAM.VNESH.EXPERIENCElt6.max_sum;
}
if ((data.PROD_CHAR_BANK == 'AB' || data.PROD_CHAR_BANK == 'PB') && data.APP_CUST_INN == null){
    limit = 500;
    limit_max = 500;
}

data.RES_LIMIT.push(limit);
data.RES_LIMIT_TYPE.push('NEW');
data.LOCAL_MAX_LIMIT.push(limit_max);

data.nodeName = 'LimCalc_New';