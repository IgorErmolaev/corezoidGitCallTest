function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}


function getLimitPrecalc (predictLimitArr,predictTypeArr,typesArr,resLimitArr,resLimitTypeArr,typeLim){
    var maxLim = 0;
    var arrReturn = [];
    if (predictTypeArr != undefined){
        for (var i=0;i<predictTypeArr.length;i++){
            if (typesArr.indexOf(predictTypeArr[i].trim()) != -1){
                if (maxLim < predictLimitArr[i]){
                    maxLim = predictLimitArr[i];
                }
            }
        }
        if (maxLim > 0) {
            resLimitArr.push(maxLim);
            arrReturn.push(resLimitArr);
            resLimitTypeArr.push(typeLim);
            arrReturn.push(resLimitTypeArr);
        }
    }
    return arrReturn;
}


var calcArrReturn = [];


//------------------------- ZP ---------------------------


var zpPredictType = new Array('ACTIVEZP','ZARPL_B', 'SOTR', 'SOTR_FST','ZARPL_ZFST', 'ZARPL_Z', 'ZARPL_ACCM', 'ZARPL_BFST','ZARPL_OST', 'SEA', 'CRED_ACCM');

calcArrReturn = getLimitPrecalc(data.RES_PREDICT_LIMIT,data.RES_PREDICT_LIMIT_TYPE,zpPredictType,data.RES_LIMIT,data.RES_LIMIT_TYPE,'ZP');
calcArrReturn.length = 0;

if (data.RES_PREDICT_LIMIT_TYPE != undefined && data.RES_LIMIT_TYPE.indexOf('ZP')!= -1) {
    for (var i = 0; i < data.RES_PREDICT_LIMIT_TYPE.length; i++) {
        if (['SOTR','SOTR_FST'].indexOf(data.RES_PREDICT_LIMIT_TYPE[i])!=-1 && data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('ZP')] == data.RES_PREDICT_LIMIT[i]){
            data.RES_LIMIT_TYPE[data.RES_LIMIT_TYPE.indexOf('ZP')] = 'SOTR';
        }
    }
}

if (data.RES_LIMIT_TYPE == undefined || data.RES_LIMIT_TYPE.indexOf('ZP') == -1) {

    if (data.APP_EMPL_ORGTYPE != undefined && data.APP_EMPL_ORGTYPE != '') {
        if (data.PROD_SETTING_PACKAGE == 'SALARY') {
            data.RES_LIMIT.push(0);
            data.RES_LIMIT_TYPE.push('ZP');
            data.LIM_SALARY = 0;

        }
    }
}

//------ PENS --------
calcArrReturn = getLimitPrecalc(data.RES_PREDICT_LIMIT,data.RES_PREDICT_LIMIT_TYPE,['ZARPL_P','ZARPL_PFST'],data.RES_LIMIT,data.RES_LIMIT_TYPE,'PENS');
calcArrReturn.length = 0;
//------ DEPOS --------
calcArrReturn = getLimitPrecalc(data.RES_PREDICT_LIMIT,data.RES_PREDICT_LIMIT_TYPE,['DEPOSIT'],data.RES_LIMIT,data.RES_LIMIT_TYPE,'DEPOS');
calcArrReturn.length = 0;
//------ STUD --------
calcArrReturn = getLimitPrecalc(data.RES_PREDICT_LIMIT,data.RES_PREDICT_LIMIT_TYPE,['ZARPL_S'],data.RES_LIMIT,data.RES_LIMIT_TYPE,'STUD');
calcArrReturn.length = 0;
//------ ACC_INCOME --------
calcArrReturn = getLimitPrecalc(data.RES_PREDICT_LIMIT,data.RES_PREDICT_LIMIT_TYPE,['FOUNDERS'],data.RES_LIMIT,data.RES_LIMIT_TYPE,'ACC_INCOME');
calcArrReturn.length = 0;
//------ HYSTORY --------
calcArrReturn = getLimitPrecalc(data.RES_PREDICT_LIMIT,data.RES_PREDICT_LIMIT_TYPE,['UBKI','RESTR','SYB_HIGH','SYB_LOW','SYB_MIDDLE','PAYSTOPIES','KNVS'],data.RES_LIMIT,data.RES_LIMIT_TYPE,'HYSTORY');
calcArrReturn.length = 0;
//------ JUNIOR --------
calcArrReturn = getLimitPrecalc(data.RES_PREDICT_LIMIT,data.RES_PREDICT_LIMIT_TYPE,['JUNIUPCL18','INCOME_M18'],data.RES_LIMIT,data.RES_LIMIT_TYPE,'JUNIOR');
calcArrReturn.length = 0;
//------ LIMIT_OLD --------
calcArrReturn = getLimitPrecalc(data.RES_PREDICT_LIMIT,data.RES_PREDICT_LIMIT_TYPE,['PREVLIMIT'],data.RES_LIMIT,data.RES_LIMIT_TYPE,'LIMIT_OLD');
calcArrReturn.length = 0;



//------------------------- CASHPAYM ---------------------------
var limit = 0;

if (data.DATA_CASHPAYMENTS_LIMIT > 0){
    limit = Math.min(data.DATA_CASHPAYMENTS_LIMIT,data.RTDM_DIC_LIMITPARAM.CASHPAYM.CASHPAYM.max_sum);
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push('CASHPAYM');
}

//------------------------- NEW ---------------------------

limit = 0;
var emplSocstat = new Array('WORKPENS','FULLWORK','PARTWORK', 'SAILOR');

coef = data.RES_COEFF_ELIG/2;

limit = Math.min(Math.max(coef * (data.RES_INC_DISP + data.RES_INC_NOT_CONF - data.RES_EXP_MONTH_TOTAL - data.RES_CRED_PLAT_MIN),data.RTDM_DIC_LIMITPARAM.VNESH.VNESH.min_sum),data.RTDM_DIC_LIMITPARAM.NEW.NEW.max_sum);

if (data.RES_AGE < 22){
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.VNESH.AGElt22.max_sum);
}
if((data.APP_EMPL_SOCIALSTATUS == 'SAILOR' || data.APP_EMPL_SOCIALSTATUS == 'PARTWORK') && data.RES_PROD_TYPE != 'VIP'){
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.VNESH.PARTWORK.max_sum);
}
if (data.APP_EMPL_TIMEEMPL < 6 && emplSocstat.indexOf(data.APP_EMPL_SOCIALSTATUS) !=-1 && data.RES_TYPE_CUST != 'INTERN' && data.RES_PROD_TYPE != 'VIP' && data.LOCAL_POSITIVE_HISTORY == 'N' && data.RES_LIMIT.indexOf('IMPORTANT') ==-1){
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.VNESH.EXPERIENCElt6.max_sum);
}
if ((data.PROD_CHAR_BANK == 'AB' || data.PROD_CHAR_BANK == 'PB') && data.APP_CUST_INN == null){
    limit = 500;
}

data.RES_LIMIT.push(limit);
data.RES_LIMIT_TYPE.push('NEW');

//------------------------- IMPORTANT ---------------------------

var days;
limit = 0;
days = Datediff(data.APP_CUST_IMPORTANT_DATE);

if (data.APP_CUST_IMPORTANT_LIMIT > 0 && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && days <= 30){
    limit = data.APP_CUST_IMPORTANT_LIMIT;
    limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.IMPORTANT.IMPORTANT.max_sum);
    data.RES_LIMIT.push(limit);
    data.RES_LIMIT_TYPE.push('IMPORTANT');
}

//------------------------- UPGRADE ---------------------------

limit = 0;
var startType = new Array('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','UNIPACKSAS','ONLINEANKETA');

if (startType.indexOf(data.PROD_CHAR_TYPE) != -1 && data.PROD_SCHEME_CCY_LOAN == data.LOCAL_CARD_UPGRADE_CCY && data.DATA_CARD_UPGRADE_LIMIT >0 ){
    for (var i=0; i<data.DATA_CRED.length; i++){
        if (data.DATA_CRED[i].REFERENC == data.DATA_CARD_UPGRADE_REFCONTRAC){
            limit = data.DATA_CARD_UPGRADE_LIMIT;
            limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.UPGRADE.UPGRADE.max_sum);
            data.RES_LIMIT.push(limit);
            data.RES_LIMIT_TYPE.push('UPGRADE');
        }
    }
}