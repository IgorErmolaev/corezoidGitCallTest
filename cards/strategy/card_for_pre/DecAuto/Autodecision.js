if (data.RES_DEC_AUTO == 'Y' && (data.RES_CUST_ISID == 'Y' || data.RES_PROD_TYPE == 'VIP' || data.PROD_CHAR_TYPE == 'UPLIMNKK') && data.FRAUD_FRAUD_SUSPICTION != 'Y' && data.RES_CUST_ISID_FRAUD != 'Y' && (data.RES_LIMIT_ITOG >= 0 || data.RES_LIMIT_ITOG_TYPE == 'ZP' || data.RES_LIMIT_ITOG_TYPE == 'PENS')){
    data.DecAuto = 'Y';
}

data.nodeName = 'Autodecision';