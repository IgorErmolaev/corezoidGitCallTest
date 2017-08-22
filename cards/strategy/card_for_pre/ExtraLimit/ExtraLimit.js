function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

function CarAge (age){
    if (age < 2){
        return 'low_2';
    }
    else {
        if(age>=2 && age<5){
            return '2_5';
        }
        else {
            if(age>=5 && age<10){
                return '5_10';
            }
            else {
                if(age>=10){
                    return '10_hi';
                }
                else {
                    return '10_hi';
                }
            }
        }
    }
}


/*AddLimit_For_Type_Limit*/

var limZp = 0;
var limPens = 0;
var limDepos = 0;
var limHystory = 0;
var maxItogLim = 0;
var ExtraSumMultiBr =0;


if (data.RES_LIMIT_TYPE.indexOf('ZP')!= -1){
    limZp = data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('ZP')];
}
if (data.RES_LIMIT_TYPE.indexOf('PENS')!= -1){
    limPens = data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('PENS')];
}
if (data.RES_LIMIT_TYPE.indexOf('DEPOS')!= -1){
    limDepos = data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('DEPOS')];
}
if (data.RES_LIMIT_TYPE.indexOf('HYSTORY')!= -1){
    limHystory = data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('HYSTORY')];
}

if (data.RES_LIMIT_TYPE.indexOf(data.RES_LIMIT_ITOG_TYPE)!= -1){
    maxItogLim = data.LOCAL_MAX_LIMIT[data.RES_LIMIT_TYPE.indexOf(data.RES_LIMIT_ITOG_TYPE)];
}

if (data.coefAddLimit != null) {
    switch (data.RES_LIMIT_ITOG_TYPE) {
        case 'DEPOS':
            ExtraSumMultiBr = Math.max(data.coefAddLimit.DEPOS.zp_value * limZp, data.coefAddLimit.DEPOS.pens_value * limPens) + data.coefAddLimit.DEPOS.depos_value * limDepos + data.coefAddLimit.DEPOS.history_value * limHystory;
            break;
        case 'SOTR':
            ExtraSumMultiBr = Math.max(data.coefAddLimit.SOTR.zp_value * limZp, data.coefAddLimit.SOTR.pens_value * limPens) + data.coefAddLimit.SOTR.depos_value * limDepos + data.coefAddLimit.SOTR.history_value * limHystory;
            break;
        case 'ZP':
            ExtraSumMultiBr = Math.max(data.coefAddLimit.ZP.zp_value * limZp, data.coefAddLimit.ZP.pens_value * limPens) + data.coefAddLimit.ZP.depos_value * limDepos + data.coefAddLimit.ZP.history_value * limHystory;
            break;
        case 'PENS_VN':
            ExtraSumMultiBr = Math.max(data.coefAddLimit.PENS_VN.zp_value * limZp, data.coefAddLimit.PENS_VN.pens_value * limPens) + data.coefAddLimit.PENS_VN.depos_value * limDepos + data.coefAddLimit.PENS_VN.history_value * limHystory;
            break;
        case 'VNESH':
            ExtraSumMultiBr = Math.max(data.coefAddLimit.VNESH.zp_value * limZp, data.coefAddLimit.VNESH.pens_value * limPens) + data.coefAddLimit.VNESH.depos_value * limDepos + data.coefAddLimit.VNESH.history_value * limHystory;
            break;
        case 'ELITE':
            ExtraSumMultiBr = Math.max(data.coefAddLimit.ELITE.zp_value * limZp, data.coefAddLimit.ELITE.pens_value * limPens) + data.coefAddLimit.ELITE.depos_value * limDepos + data.coefAddLimit.ELITE.history_value * limHystory;
            break;
        case 'PENS':
            ExtraSumMultiBr = Math.max(data.coefAddLimit.PENS.zp_value * limZp, data.coefAddLimit.PENS.pens_value * limPens) + data.coefAddLimit.PENS.depos_value * limDepos + data.coefAddLimit.PENS.history_value * limHystory;
            break;
        case 'HYSTORY':
            ExtraSumMultiBr = Math.max(data.coefAddLimit.HYSTORY.zp_value * limZp, data.coefAddLimit.HYSTORY.pens_value * limPens) + data.coefAddLimit.HYSTORY.depos_value * limDepos + data.coefAddLimit.HYSTORY.history_value * limHystory;
            break;
        case 'CASHPAYM':
            ExtraSumMultiBr = Math.max(data.coefAddLimit.CASHPAYM.zp_value * limZp, data.coefAddLimit.CASHPAYM.pens_value * limPens) + data.coefAddLimit.CASHPAYM.depos_value * limDepos + data.coefAddLimit.CASHPAYM.history_value * limHystory;
            break;
        default :
            ExtraSumMultiBr = Math.max(data.coefAddLimit.OTHER.zp_value * limZp, data.coefAddLimit.OTHER.pens_value * limPens) + data.coefAddLimit.OTHER.depos_value * limDepos + data.coefAddLimit.OTHER.history_value * limHystory;
    }
}

data.RES_LIMIT_ITOG += ExtraSumMultiBr;
if (ExtraSumMultiBr > 0 && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP'){

    switch (data.RES_PROD_TYPE){
        case 'UNI':
            data.RES_LIMIT_ITOG = Math.max(data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf(data.RES_LIMIT_ITOG_TYPE)], Math.min(data.RES_LIMIT_ITOG,50000));
            break;
        case 'GOLD':
            data.RES_LIMIT_ITOG = Math.max(data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf(data.RES_LIMIT_ITOG_TYPE)], Math.min(data.RES_LIMIT_ITOG,75000));
            break;
        default :
            data.RES_LIMIT_ITOG = Math.max(data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf(data.RES_LIMIT_ITOG_TYPE)], Math.min(data.RES_LIMIT_ITOG,50000));
    }
}


delete data.coefAddLimit;

/*AddLimit_For_Car*/
/*
var isNative, diffyear, carAge, ExtraSum;
if (data.APP_PROPERTY_CAR!= undefined && data.APP_PROPERTY_CAR.length != 0) {
    for (var i = 0; i < data.APP_PROPERTY_CAR.length; i++) {
        isNative = 0;
        diffyear = 0;
        carAge = '10_hi';
        ExtraSum = 0;
        for (var j=0; j< data.crmCars.length; j++) {
            if (data.crmCars[j] != null && data.APP_PROPERTY_CAR[i].MODEL.toUpperCase() == data.crmCars[j].model) {
                if (data.crmCars[j].isnative == 'Y'){
                    isNative = 1;
                }
                break;
            }
        }

        diffyear = Datediff(data.APP_PROPERTY_CAR[i].YEAR) /365;
        carAge = CarAge(diffyear);

        for (j=0; j<data.carAddLimit.length; j++){
            if (data.carAddLimit[j] != null && data.carAddLimit[j].car_age == carAge && data.carAddLimit[j].nativ == isNative){
                ExtraSum = data.carAddLimit[j].add_sum;
                break;
            }
        }

        data.RES_LIMIT_ITOG += ExtraSum;
    }
}
*/
delete data.crmCars;
delete data.carAddLimit;

if (maxItogLim>0) {
    data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG, maxItogLim);
}

data.RES_LIMIT_EXTRA = data.RES_LIMIT_ITOG;

data.nodeName = 'ExtraLimit_after';