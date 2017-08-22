
var limit = 0;
var limit_type;
var limit_max = 0;

var PensPredictType = new Array('ZARPL_P','ZARPL_PFST');

if (data.RES_PREDICT_LIMIT_TYPE != undefined) {
    var maxLimitPredict = 0;
    var maxTypePredict;
    for (var i = 0; i < data.RES_PREDICT_LIMIT_TYPE.length; i++) {
        if (PensPredictType.indexOf(data.RES_PREDICT_LIMIT_TYPE[i].trim()) != -1) {
            if (maxLimitPredict < data.RES_PREDICT_LIMIT[i]) {
                maxLimitPredict = Math.max(maxLimitPredict, data.RES_PREDICT_LIMIT[i]);
                maxTypePredict = data.RES_PREDICT_LIMIT_TYPE[i].trim();
            }
        }
    }
    if (maxLimitPredict > 0) {
        data.RES_LIMIT.push(maxLimitPredict);
        data.RES_LIMIT_TYPE.push('PENS');
        if (data.RES_AGE <= 40){
            data.LOCAL_MAX_LIMIT.push(data.RTDM_DIC_LIMITPARAM.PENS.AGElt25.max_sum);
        }
        else {
            data.LOCAL_MAX_LIMIT.push(data.RTDM_DIC_LIMITPARAM.PENS.AGEge25.max_sum);
        }
    }

}

/*if (data.RES_AGE <= 25) {
    if (data.LOCAL_PENS_AMOUNT >= data.RTDM_DIC_LIMITPARAM.PENS.AGElt25.bound) {
        limit = data.RTDM_DIC_LIMITPARAM.PENS.AGElt25.coefficient * (data.RES_INC_DISP + data.RES_INC_NOT_CONF);
        limit = Math.max(limit,data.RTDM_DIC_LIMITPARAM.PENS.AGElt25.min_sum);
        limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.PENS.AGElt25.max_sum);
        limit_max = data.RTDM_DIC_LIMITPARAM.PENS.AGElt25.max_sum;
        limit_type = 'PENS';
        data.RES_LIMIT.push(limit);
        data.RES_LIMIT_TYPE.push(limit_type);
        data.LOCAL_MAX_LIMIT.push(limit_max);
    }
}
else {*/
    /*if (data.LOCAL_PENS_AMOUNT >= data.RTDM_DIC_LIMITPARAM.PENS.AGEge25.bound) {
        limit = data.RTDM_DIC_LIMITPARAM.PENS.AGEge25.coefficient * (data.RES_INC_DISP + data.RES_INC_NOT_CONF);
        limit = Math.max(limit,data.RTDM_DIC_LIMITPARAM.PENS.AGEge25.min_sum);
        limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.PENS.AGEge25.max_sum);
        limit_max = data.RTDM_DIC_LIMITPARAM.PENS.AGEge25.max_sum;
        limit_type = 'PENS';
        data.RES_LIMIT.push(limit);
        data.RES_LIMIT_TYPE.push(limit_type);
        data.LOCAL_MAX_LIMIT.push(limit_max);
    }
}*/

limit = 0;
limit_max = 0;

if (data.APP_EMPL_SOCIALSTATUS == 'PENSION') {
    data.RES_CUST_IS_PENS_VN = 'Y';
    if (data.RES_AGE <= 25) {
        limit = data.RTDM_DIC_LIMITPARAM.PENS_VN.AGElt25.coefficient * (data.RES_INC_DISP + data.RES_INC_NOT_CONF - data.RES_CRED_PLAT_MIN - data.RES_EXP_MONTH_TOTAL);
        limit = Math.max(limit, data.RTDM_DIC_LIMITPARAM.PENS_VN.AGElt25.min_sum);
        limit = Math.min(limit, data.RTDM_DIC_LIMITPARAM.PENS_VN.AGElt25.max_sum);
        limit_max = data.RTDM_DIC_LIMITPARAM.PENS_VN.AGElt25.max_sum;
        limit_type = 'PENS_VN';
        data.RES_LIMIT.push(limit);
        data.RES_LIMIT_TYPE.push(limit_type);
        data.LOCAL_MAX_LIMIT.push(limit_max);
    }
    else {
        limit = data.RTDM_DIC_LIMITPARAM.PENS_VN.AGEge25.coefficient * (data.RES_INC_DISP + data.RES_INC_NOT_CONF - data.RES_CRED_PLAT_MIN - data.RES_EXP_MONTH_TOTAL);
        limit = Math.max(limit, data.RTDM_DIC_LIMITPARAM.PENS_VN.AGEge25.min_sum);
        limit = Math.min(limit, data.RTDM_DIC_LIMITPARAM.PENS_VN.AGEge25.max_sum);
        limit_max = data.RTDM_DIC_LIMITPARAM.PENS_VN.AGEge25.max_sum;
        limit_type = 'PENS_VN';
        data.RES_LIMIT.push(limit);
        data.RES_LIMIT_TYPE.push(limit_type);
        data.LOCAL_MAX_LIMIT.push(limit_max);
    }
}

data.nodeName = 'LimCalc_Pens_PensVN';
