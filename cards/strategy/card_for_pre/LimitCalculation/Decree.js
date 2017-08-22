var limit = 0;
var limit_type;
var limit_max = 0;

data.RES_CUST_IS_DECREE = 'N';
if (data.APP_EMPL_SOCIALSTATUS == 'DECREE'){
    data.RES_CUST_IS_DECREE = 'Y';
    limit = data.RTDM_DIC_LIMITPARAM.DECREE.DECREE.coefficient * (data.RES_INC_DISP + data.RES_INC_NOT_CONF);
    limit = Math.max(limit,data.RTDM_DIC_LIMITPARAM.DECREE.DECREE.min_sum);
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.DECREE.DECREE.max_sum);
    limit_max = data.RTDM_DIC_LIMITPARAM.DECREE.DECREE.max_sum;
    limit_type = 'DECREE';
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push(limit_type);
    data.LOCAL_MAX_LIMIT.push(limit_max);
}

data.nodeName = 'LimCalc_Decree';