// JavaScript Document
if (data.RES_DEC_CATEGORY == 'ACCEPT') {
    if (data.DATA_TRELCLIENTS_MAXPAY>300) {
        if (data.PROD_CHAR_LIMITREQUESTED > data.DATA_TRELCLIENTS_MAXPAY) {
            data.RES_LIMIT_ITOG = data.DATA_TRELCLIENTS_MAXPAY;
        }
        else {
            data.RES_LIMIT_ITOG = data.PROD_CHAR_LIMITREQUESTED;
        }
    }
    else {
        if (data.PROD_CHAR_LIMITREQUESTED > data.RES_FINAL_KRED_SUM) {
            data.RES_LIMIT_ITOG = data.RES_FINAL_KRED_SUM;
        }
        else {
            data.RES_LIMIT_ITOG = data.PROD_CHAR_LIMITREQUESTED;
        }
    }
}
else {
    data.RES_LIMIT_ITOG = 0;
}

if (data.RES_TYPE_CUST == 'EXTERN') {
    data.RES_LIMIT_ITOG = Math.min (data.RES_LIMIT_ITOG, 1500);
}