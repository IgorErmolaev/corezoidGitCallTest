
var limit = 0;
var limit_max = 0;

function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

var days;
days = Datediff(data.APP_CUST_IMPORTANT_DATE);

if (data.APP_CUST_IMPORTANT_LIMIT > 0 && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && days <= 30){
    limit = data.APP_CUST_IMPORTANT_LIMIT;
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.IMPORTANT.IMPORTANT.max_sum);
    limit_max = data.RTDM_DIC_LIMITPARAM.IMPORTANT.IMPORTANT.max_sum;
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push('IMPORTANT');
    data.LOCAL_MAX_LIMIT.push(limit_max);
}

data.nodeName = 'LimCalc_Important';