var limit = 0;
var limit_type;
var limit_max = 0;
var zpPredictType = new Array('ACTIVEZP','ZARPL_B', 'SOTR', 'SOTR_FST','ZARPL_ZFST', 'ZARPL_Z', 'ZARPL_ACCM', 'ZARPL_BFST','ZARPL_OST', 'SEA', 'CRED_ACCM');

if (data.RES_PREDICT_LIMIT_TYPE != undefined) {
    var maxLimitPredict = 0;
    var maxTypePredict;
    for (var i = 0; i < data.RES_PREDICT_LIMIT_TYPE.length; i++) {
        if (zpPredictType.indexOf(data.RES_PREDICT_LIMIT_TYPE[i].trim()) != -1) {
            if (maxLimitPredict < data.RES_PREDICT_LIMIT[i]) {
                maxLimitPredict = Math.max(maxLimitPredict, data.RES_PREDICT_LIMIT[i]);
                maxTypePredict = data.RES_PREDICT_LIMIT_TYPE[i].trim();
            }
        }
    }
    if (maxLimitPredict > 0) {
        data.RES_LIMIT.push(maxLimitPredict);
        data.LIM_SALARY = maxLimitPredict;
        if (['SOTR','SOTR_FST'].indexOf(maxTypePredict)!= -1){
            data.RES_LIMIT_TYPE.push('SOTR');
            data.LOCAL_MAX_LIMIT.push(data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].EMPLOYEE.max_sum);
        }
        else{
            data.RES_LIMIT_TYPE.push('ZP');
            if (['ZARPL_B','ZARPL_BFST'].indexOf(maxTypePredict) != -1){
                data.LOCAL_MAX_LIMIT.push(data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].STATE.max_sum);
            }
            else{
                data.LOCAL_MAX_LIMIT.push(data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].PRIVATE.max_sum);
            }
        }
    }

}

if (data.RES_LIMIT_TYPE == undefined || data.RES_LIMIT_TYPE.indexOf('ZP') == -1) {

    if (data.APP_EMPL_ORGTYPE != undefined && data.APP_EMPL_ORGTYPE != '') {
        if (data.PROD_SETTING_PACKAGE == 'SALARY') {/*data.LOCAL_SALARY_AMOUNT >= data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].STATE.bound ||  data.LOCAL_SALARY_LESS30 == 'Y' || data.APP_CUST_SPECIALPROJECT == 'ZP'*/
            data.RES_LIMIT.push(0);
            data.RES_LIMIT_TYPE.push('ZP');
            data.LOCAL_MAX_LIMIT.push(0);
            data.LIM_SALARY = 0;

            /*       if (data.PROD_APP_EMPLOYEE == 'Y') {
             limit = Math.min(Math.max(data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].EMPLOYEE.min_sum, data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].EMPLOYEE.coefficient * (data.RES_INC_DISP + data.RES_INC_NOT_CONF)), data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].EMPLOYEE.max_sum);
             limit_type = 'SOTR';
             limit_max = data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].EMPLOYEE.max_sum;
             }
             else {
             limit_type = 'ZP';
             if (data.APP_EMPL_ORGTYPE == 'STATE' || data.APP_EMPL_ORGTYPE == 'INTERNAT' || (data.LOCAL_SALARY_AMOUNT_TYPE != undefined && data.LOCAL_SALARY_AMOUNT_TYPE.length != 0 && data.LOCAL_SALARY_AMOUNT_TYPE.indexOf('W_T') != -1)) {
             limit = Math.min(Math.max(data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].STATE.min_sum, data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].STATE.coefficient * (data.RES_INC_DISP + data.RES_INC_NOT_CONF)), data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].STATE.max_sum);
             limit_max = data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].STATE.max_sum;
             }
             if (data.APP_EMPL_ORGTYPE == 'PRIVATE' || data.APP_EMPL_ORGTYPE == 'BUSINESS' || (data.LOCAL_SALARY_AMOUNT_TYPE != undefined && data.LOCAL_SALARY_AMOUNT_TYPE.length != 0 && data.LOCAL_SALARY_AMOUNT_TYPE.indexOf('W_F') != -1)) {
             limit = Math.min(Math.max(data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].PRIVATE.min_sum, data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].PRIVATE.coefficient * (data.RES_INC_DISP + data.RES_INC_NOT_CONF)), data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].PRIVATE.max_sum);
             limit_max = data.RTDM_DIC_LIMITPARAM['SOTR/ZP'].PRIVATE.max_sum;
             }
             if (data.PROD_CHAR_BANK == 'PB' && data.RES_DEBCARD_Z_SRED >= 10000 && limit < data.RES_DEBCARD_Z_SRED && limit > 0) {
             limit = 10000;
             limit_max = 10000;
             }
             if (data.PROD_SETTING_PACKAGE == 'SALARY' && (data.PROD_CHAR_BANK == 'AB' || data.PROD_CHAR_BANK == 'PB')) {
             limit = Math.min(limit, 2000);
             limit_max = 2000;
             }
             }
             if ((data.SPVostok_AllBranch == 'Y' || data.SPVostok_VostokRegion == 'Y') && limit_type != 'SOTR') {
             limit = Math.min(limit, 5000);
             limit_max = 5000;
             }
             data.RES_LIMIT.push(limit);
             data.RES_LIMIT_TYPE.push(limit_type);
             data.LOCAL_MAX_LIMIT.push(limit_max);
             data.LIM_SALARY = limit;*/
        }
    }

}

data.nodeName = 'LimCalc_ZpSotr';