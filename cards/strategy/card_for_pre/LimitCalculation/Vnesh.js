var limit = 0;
var limit_type;
var limit_max = 0;

var emplSocstat = new Array('WORKPENS','FULLWORK','PARTWORK', 'SAILOR');

function GetVnesh(coefficient,min_sum, max_sum){
    limit = coefficient * (data.RES_INC_DISP + data.RES_INC_NOT_CONF -data.RES_EXP_MONTH_TOTAL - data.RES_CRED_PLAT_MIN);
    limit = Math.max(limit,min_sum);
    limit = Math.min(limit,max_sum);
    limit_max = max_sum;
    limit_type = 'VNESH';
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push(limit_type);
    data.LOCAL_MAX_LIMIT.push(limit_max);
    data.RES_CUST_IS_VNESH = 'Y';
}

data.RES_CUST_IS_VNESH = 'N';
if (data.APP_EMPL_SOCIALSTATUS != 'PENSION') {
    if (data.RES_AGE < 22) {
        GetVnesh(data.RES_COEFF_ELIG, data.RTDM_DIC_LIMITPARAM.VNESH.AGElt22.min_sum, data.RTDM_DIC_LIMITPARAM.VNESH.AGElt22.max_sum);
    }
    else {
        if (data.APP_EMPL_TIMEEMPL < 6 && emplSocstat.indexOf(data.APP_EMPL_SOCIALSTATUS) != -1 && data.RES_TYPE_CUST != 'INTERN' && data.RES_PROD_TYPE != 'VIP' && data.LOCAL_POSITIVE_HISTORY == 'N') {
            GetVnesh(data.RES_COEFF_ELIG, data.RTDM_DIC_LIMITPARAM.VNESH.EXPERIENCElt6.min_sum, data.RTDM_DIC_LIMITPARAM.VNESH.EXPERIENCElt6.max_sum);
        }
        else {
            if ((data.APP_EMPL_SOCIALSTATUS == 'SAILOR' || data.APP_EMPL_SOCIALSTATUS == 'PARTWORK') && data.RES_TYPE_CUST != 'INTERN' && data.RES_PROD_TYPE != 'VIP') {
                GetVnesh(data.RES_COEFF_ELIG, data.RTDM_DIC_LIMITPARAM.VNESH.PARTWORK.min_sum, data.RTDM_DIC_LIMITPARAM.VNESH.PARTWORK.max_sum);
            }
            else {
                GetVnesh(data.RES_COEFF_ELIG, data.RTDM_DIC_LIMITPARAM.VNESH.VNESH.min_sum, data.RTDM_DIC_LIMITPARAM.VNESH.VNESH.max_sum);
            }
        }
    }
}

data.nodeName = 'LimCalc_Vnesh';