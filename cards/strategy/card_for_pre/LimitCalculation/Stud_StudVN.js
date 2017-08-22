var limit = 0;
var limit_type;
var limit_max = 0;

if (data.PROD_SETTING_PACKAGE == 'GRANT' || data.LOCAL_STUD_AMOUNT >= data.RTDM_DIC_LIMITPARAM.STUD.STUD.bound || data.LOCAL_STUD_LESS30 == 'Y'){
    limit = data.RTDM_DIC_LIMITPARAM.STUD.STUD.coefficient * (data.RES_INC_DISP + data.RES_INC_NOT_CONF);
    limit = Math.max(limit,data.RTDM_DIC_LIMITPARAM.STUD.STUD.min_sum);
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.STUD.STUD.max_sum);
    limit_max = data.RTDM_DIC_LIMITPARAM.STUD.STUD.max_sum;
    limit_type = 'STUD';
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push(limit_type);
    data.LOCAL_MAX_LIMIT.push(limit_max);
}

limit = 0;
limit_max = 0;

if (data.APP_EMPL_SOCIALSTATUS == 'STUDENT' && data.RES_LIMIT_TYPE.indexOf('STUD') == -1){
    limit = data.RTDM_DIC_LIMITPARAM.STUD.STUD.min_sum;
    limit_max = data.RTDM_DIC_LIMITPARAM.STUD.STUD.min_sum;
    limit_type = 'STUD_VN';
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push(limit_type);
    data.LOCAL_MAX_LIMIT.push(limit_max);
}

data.nodeName = 'LimCalc_Stud_StudVN';