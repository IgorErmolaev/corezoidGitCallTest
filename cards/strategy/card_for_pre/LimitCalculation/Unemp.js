var limit = 0;
var limit_type;
var limit_max = 0;

var marrSocstatus = new Array('WORKPENS','FULLWORK','PARTWORK', 'SAILOR');

if(data.APP_EMPL_SOCIALSTATUS == 'UNEMP'){
    if (data.APP_MARITAL_MARITALCOND == 'MARRIED' && marrSocstatus.indexOf(data.APP_MARITAL_SOCIALSTATUS) != -1){
        limit = data.RTDM_DIC_LIMITPARAM.UNEMP.UNEMP.min_sum;
    }
    if (data.APP_MARITAL_MARITALCOND != 'MARRIED' || (data.APP_MARITAL_MARITALCOND == 'MARRIED' && marrSocstatus.indexOf(data.APP_MARITAL_SOCIALSTATUS) == -1)){
        limit = data.RTDM_DIC_LIMITPARAM.UNEMP.UNEMP.min_sum;
    }
    limit_max = data.RTDM_DIC_LIMITPARAM.UNEMP.UNEMP.min_sum;
    limit_type = 'UNEMP';
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push(limit_type);
    data.LOCAL_MAX_LIMIT.push(limit_max);
}

data.nodeName = 'LimCalc_Unemp';