var limit = 0;
var limit_usage =0;
var limit_max = 0;

var typeP = new Array('RAS', 'PERS', 'SOB', 'UNI', 'UN_M', 'RS_V', 'RS_N', 'METR', 'GOLD', 'VIP', 'GD_L');
var socStat = new Array('DECREE', 'STUDENT', 'UNEMP');

for (var i=0; i<data.DATA_CRED.length; i++){
    if (data.DATA_CRED[i].TR_PAY >=6 && data.LOCAL_POSITIVE_HISTORY == 'Y' && data.LOCAL_CRED_HIST_DATA_IDX[i] == 'P' && data.DATA_CRED[i].CR_PAY >= data.RTDM_DIC_LIMITPARAM.USAGE.USAGE.bound &&
        typeP.indexOf(data.DATA_CRED[i].PRODUCT) != -1){
        if (data.DATA_CRED[i].LIMIT > data.RTDM_DIC_LIMITPARAM.USAGE.USAGE.bound || data.DATA_CRED[i].LIMIT_PREVIOUS > data.RTDM_DIC_LIMITPARAM.USAGE.USAGE.bound ){
            limit = 3 * (data.DATA_CRED[i].CR_PAY / data.DATA_CRED[i].TR_PAY /0.5 - data.RES_EXP_MONTH_TOTAL - data.RES_CRED_PLAT_MIN);
        }
        else {
            limit = 1.5 * (data.DATA_CRED[i].CR_PAY / data.DATA_CRED[i].TR_PAY  - data.RES_EXP_MONTH_TOTAL - data.RES_CRED_PLAT_MIN);
        }

        limit_usage = Math.max(limit_usage,0);
        limit = Math.max(limit,0);
        limit_usage += limit;
        limit_max = Math.max(limit_usage,limit_max);

    }
}
if (limit_usage > 0){
    limit = Math.min(limit_max,data.RTDM_DIC_LIMITPARAM.USAGE.USAGE.max_sum);
    if (data.RES_AGE < 25 || socStat.indexOf(data.APP_EMPL_SOCIALSTATUS) != -1){
        limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.USAGE.USAGE.max_sum);
    }
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push('USAGE');
    data.LOCAL_MAX_LIMIT.push(limit_max);
}

data.nodeName = 'LimCalc_Usage';