var limit = 0;
var limit_type;
var limit_max = 0;

if (data.DATA_CASHPAYMENTS_LIMIT > 0){
    limit= data.DATA_CASHPAYMENTS_LIMIT;
    limit_type = 'CASHPAYM';
    limit_max = data.RTDM_DIC_LIMITPARAM.CASHPAYM.CASHPAYM.max_sum;
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.CASHPAYM.CASHPAYM.max_sum);
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push(limit_type);
    data.LOCAL_MAX_LIMIT.push(limit_max);
}

data.nodeName = 'LimCalc_Cashpaym';