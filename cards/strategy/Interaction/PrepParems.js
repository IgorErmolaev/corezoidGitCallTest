

data.PROD_CHAR_TYPE = 'UPLIMNKK';

data.APP_CUST_ID = Number(data.APP_CUST_ID);

// скрипт PrepParamCred
/*const CURR = {"974":"BYR","756":"CHF","978":"EUR","826":"GBP","981":"GEL","985":"PLN","810":"RUR","980":"UAH","840":"USD","961":"XAG","959":"XAU"};

if (data.DATA_CRED != undefined)
{
    data.PROD_CHAR_REFERENCE = data.DATA_CRED[0].REFERENC;
    data.PROD_CHAR_TYPE_CARD = data.DATA_CRED[0].TYPE;
    data.PROD_PACK_TYPE = data.DATA_CRED[0].PRODUCT;
    data.RES_CRED_LIM = parseFloat(data.DATA_CRED[0].LIMIT);
}
else
{
    data.PROD_CHAR_REFERENCE = '';
    data.PROD_CHAR_TYPE_CARD = '';
    data.PROD_PACK_TYPE = '';
    data.RES_CRED_LIM = 0;
}

if (CURR.hasOwnProperty(data.PROD_SCHEME_CCY_LOAN)){
    data.PROD_SCHEME_CCY_LOAN = CURR[data.PROD_SCHEME_CCY_LOAN];
}


if (data.PROD_PACK_TYPE == 'UN_M'){
    data.PROD_PACK_TYPE = 'UNI';
}
    */