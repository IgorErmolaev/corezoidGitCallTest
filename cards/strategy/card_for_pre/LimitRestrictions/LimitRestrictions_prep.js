 if (data.PROD_CHAR_BANK == 'AB' || data.PROD_CHAR_BANK == 'PB'){
     data.limitBank = 'AB/PB';
 }
 if (data.APP_CUST_IMPORTANT_PRODUCT == 'VP' || data.RES_PROD_TYPE == 'VIP'){
     data.limitBank = 'AB/PB_VIP';
 }

 data.nodeName = 'LimitRestrictions_before';