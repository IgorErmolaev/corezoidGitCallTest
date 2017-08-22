var limit = 0;
var limit_type;
var limit_max = 0;
var days =0;


if (data.RES_PREDICT_LIMIT_TYPE != undefined) {

    if (data.RES_PREDICT_LIMIT_TYPE.indexOf('DEPOSIT')!= -1){
        data.RES_LIMIT.push(data.RES_PREDICT_LIMIT[data.RES_PREDICT_LIMIT_TYPE.indexOf('DEPOSIT')]);
        data.RES_LIMIT_TYPE.push('DEPOS');
        data.LOCAL_MAX_LIMIT.push(data.RTDM_DIC_LIMITPARAM.DEPOS.DEPOS.max_sum);
    }
}


data.nodeName = 'LimCalc_Depos';

/*
function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

var odessaPB2sym = new Array ('MD', 'MI','OD');
var odessaPB = new Array ('DN6Y' , 'DN6B', 'DN01','DN02', 'DN03', 'DN04','DN05','DN0O', 'DN2K', 'DN3O', 'DN4I', 'DN5O', 'D3O2');
var odessaAB = new Array ('A209','A232','A256','A260','A31O','A343','A344','A345','A346','A347',
    'A3O2','A3O4','AN01','AN02','AN03','AN04','AN05','AN0O','AN2K','AN3O','AN4I','AN5O','AN6B','AN6C',	'AN6I','AN6Y');


if (data.RES_TYPE_CUST == 'INTERN'  ){
    if (data.DATA_DEPOSIT != undefined) {
        for (var i=0;i<data.DATA_DEPOSIT.length; i++){
            days = Datediff(data.DATA_DEPOSIT[i].DATE_START);
            if (data.RES_DEPOSIT_TOTAL > data.RTDM_DIC_LIMITPARAM.DEPOS.DEPOS.bound && days >= 30){
                if (data.RTDM_DIC_LIMITPARAM.DEPOS.DEPOS.coefficient * data.RES_DEPOSIT_TOTAL > limit){
                    limit = data.RTDM_DIC_LIMITPARAM.DEPOS.DEPOS.coefficient * data.RES_DEPOSIT_TOTAL;
                }
            }
            else {
                if (data.RES_DEPOSIT_TOTAL > data.RTDM_DIC_LIMITPARAM.DEPOS.DEPOS.bound && days < 30){
                    if (0.2 * data.RES_DEPOSIT_TOTAL > limit){
                        limit = 0.2 * data.RES_DEPOSIT_TOTAL;
                    }
                }
            }
        }

        if (limit > 0){
            limit_max = data.RTDM_DIC_LIMITPARAM.DEPOS.DEPOS.max_sum;
            limit_type = 'DEPOS';
            limit = Math.max(limit,data.RTDM_DIC_LIMITPARAM.DEPOS.DEPOS.min_sum);
            limit = Math.min(limit,data.RTDM_DIC_LIMITPARAM.DEPOS.DEPOS.max_sum);

            if (((data.PROD_CHAR_BANK == 'PB' && (data.PROD_CHAR_BRANCH != undefined && (odessaPB2sym.indexOf(data.PROD_CHAR_BRANCH.substring(0,2)) !=-1 || odessaPB.indexOf(data.PROD_CHAR_BRANCH) !=-1))) ||
                (data.PROD_CHAR_BANK == 'AB' && data.PROD_CHAR_BRANCH != undefined && odessaAB.indexOf(data.PROD_CHAR_BRANCH) !=-1))){
                limit = Math.min(limit,5000);
            }

            data.RES_LIMIT.push(limit);
            data.RES_LIMIT_TYPE.push(limit_type);
            data.LOCAL_MAX_LIMIT.push(limit_max);
        }


    }

}
*/




















