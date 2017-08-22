var limit = 0;
var limit_type;
var limit_max = 0;

if (data.DATA_OB_ALL > 0){
    if (data.DATA_OB_BALL_ITOG < 3 || data.DATA_OB_BALL_ITOG == undefined){
        limit = 0.1*data.DATA_OB_ALL;
    }
    else {
        if (data.DATA_OB_BALL_ITOG >=3 && data.DATA_OB_BALL_ITOG < 5){
            limit = 0.2*data.DATA_OB_ALL;
        }
        else {
            if (data.DATA_OB_BALL_ITOG >=5 && data.DATA_OB_BALL_ITOG < 8){
                limit = 0.3*data.DATA_OB_ALL;
            }
            else {
                if (data.DATA_OB_BALL_ITOG >=8 && data.DATA_OB_BALL_ITOG < 13){
                    limit = 0.4*data.DATA_OB_ALL;
                }
                else {
                    if (data.DATA_OB_BALL_ITOG >=13){
                        limit = 0.45*data.DATA_OB_ALL;
                    }
                }
            }
        }
    }
    if (data.DATA_OB_CNTCONTR <= 1){
        limit = limit/2;
    }
    limit_type = 'ACC_INCOME';
    limit_max = data.RTDM_DIC_LIMITPARAM.ACC_INCOME.ACC_INCOME.max_sum;
    limit = Math.max(limit,data.RTDM_DIC_LIMITPARAM.ACC_INCOME.ACC_INCOME.min_sum);
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.ACC_INCOME.ACC_INCOME.max_sum);
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push(limit_type);
    data.LOCAL_MAX_LIMIT.push(limit_max);
}

if (data.RES_PREDICT_LIMIT_TYPE != undefined && data.RES_PREDICT_LIMIT!= undefined && data.RES_PREDICT_LIMIT_TYPE.indexOf('BUSINESSIT') != -1){
    if (limit_type != 'ACC_INCOME'){
        limit = data.RES_PREDICT_LIMIT[data.RES_PREDICT_LIMIT_TYPE.indexOf('BUSINESSIT')];
        data.RES_LIMIT.push(limit);
        data.RES_LIMIT_TYPE.push('ACC_INCOME');
    }
    else{
        data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('ACC_INCOME')] = data.RES_PREDICT_LIMIT[data.RES_PREDICT_LIMIT_TYPE.indexOf('BUSINESSIT')];
    }

}

data.nodeName = 'LimCalc_AccIncome';