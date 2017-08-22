


if (data.BCH_CRED == undefined){
    data.BCH_CRED = [];
}

var ln = data.BCH_CRED.length;
data.BCH_CRED.push({});
data.BCH_CRED[ln].HIST_YBCH = data.BCH_CRED_HIST_YBCH;
data.BCH_CRED[ln].HIST_DATA = data.BCH_CRED_HIST_DATA;
data.BCH_CRED[ln].HIST_TOTAL = data.BCH_CRED_HIST_TOTAL;
data.BCH_CRED[ln].OWN_PROS_YBCH = data.BCH_CRED_OWN_PROS_YBCH;
data.BCH_CRED[ln].TOTAL_LIMIT = data.RES_CRED_TOTAL_LIMIT;
data.BCH_CRED[ln].PLAT_MIN_TOTAL = data.BCH_CRED_PLAT_MIN_TOTAL;
data.BCH_CRED[ln].COUNT_ACT = data.BCH_CRED_COUNT_ACT;
data.BCH_CRED[ln].COUNT_ACT_FOREIGN = data.BCH_CRED_COUNT_ACT_FOREIGN;
data.BCH_CRED[ln].BAL_TOTAL = data.BCH_CRED_BAL_TOTAL;
data.BCH_CRED[ln].YBCH_NOT_WORK = data.BCH_YBCH_NOT_WORK;
data.BCH_CRED[ln].CUST_ID = data.linkID;
data.BCH_CRED[ln].RESTR_PROD = data.hasRestProduct;
data.BCH_CRED[ln].CNT_ACTIVE_SPEC_CRED = data.LOCAL_COUNT_ACTIVE_CREDITS;
data.BCH_CRED[ln].SUM_ACTIVE_SPEC_CRED = data.LOCAL_SUM_ACTIVE_CREDITS;
data.BCH_CRED[ln].DLCRED = data.BCH_CRED_DLCRED;
data.BCH_CRED[ln].EMPL_NKI = data.BCH_CRED_EMPL_NKI;
data.BCH_CRED[ln].NOOWN_PROS_YBCH = data.BCH_CRED_NOOWN_PROS_YBCH;
data.BCH_CRED[ln].N_AMNISTY = data.BCH_CRED_N_AMNISTY;
data.BCH_CRED[ln].H_AMNISTY = data.BCH_CRED_H_AMNISTY;
data.BCH_CRED[ln].MAX_MID_PAY = data.RES_MAX_MID_PAY;




data.BCH_CRED_HIST_YBCH = '';
data.BCH_CRED_HIST_DATA = '';
data.BCH_CRED_HIST_TOTAL = '';
data.BCH_CRED_OWN_PROS_YBCH = '';


if (data.APP_LINK != undefined && data.APP_LINK.length>0){
    if (data.APP_CUST_ID_JUR == data.linkID ){
        data.linkID = data.APP_LINK[0].CUST_ID;
        data.indKI = 0;
    }
    else {
        data.indKI ++;
        if (data.indKI<data.APP_LINK.length){
            data.linkID = data.APP_LINK[data.indKI].CUST_ID;
        }
        else{
            data.linkID = 0;
        }
    }
}
else {
    data.linkID = 0;
}

delete  data.DATA_CRED;
delete  data.UBKI_CRED;