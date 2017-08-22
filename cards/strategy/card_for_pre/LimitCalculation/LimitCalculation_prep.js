var tmp = 'N';
if ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && data.PROD_CHAR_TYPE == 'UPLIMNKK' && (data.PROD_PACK_TYPE == 'UNI' || data.PROD_PACK_TYPE == 'UN_M' ) && data.RES_CRED_LIM == 15000){
    data.PROD_PACK_TYPE = 'GOLD';
    data.LIMIT_FOR_GOLD = 'Y';
    tmp = 'Y';
}

if (data.LIMIT_FOR_GOLD == 'Y' && tmp != 'Y'){
    data.PROD_PACK_TYPE = 'UNI';
    data.LIMIT_FOR_GOLD = 'N';
}

if (data.LIMIT_FOR_GOLD != 'Y'){
    data.LIMIT_FOR_GOLD = 'N';
}

data.LimitBank = 'PB';

if (data.PROD_CHAR_BANK == 'PB' && data.PROD_PACK_TYPE != 'GOLD' && data.RES_PROD_TYPE != 'VIP'){
    data.LimitBank = 'PB';
}
else {
    if (data.PROD_CHAR_BANK == 'PB' && data.PROD_PACK_TYPE == 'GOLD' && data.RES_PROD_TYPE != 'VIP'){
        data.LimitBank = 'PB_GOLD';
    }
    else {
        if (data.PROD_CHAR_BANK == 'PB'  && data.RES_PROD_TYPE == 'VIP'){
            data.LimitBank = 'PB_VIP';
        }
        else {
            if (data.PROD_CHAR_BANK == 'AB' && data.PROD_PACK_TYPE != 'GOLD' && data.RES_PROD_TYPE != 'VIP'){
                data.LimitBank = 'AB';
            }
            else {
                if (data.PROD_CHAR_BANK == 'AB' && data.PROD_PACK_TYPE == 'GOLD' && data.RES_PROD_TYPE != 'VIP') {
                    data.LimitBank = 'AB_GOLD';
                }
                else {
                    if (data.PROD_CHAR_BANK == 'AB' &&  data.RES_PROD_TYPE == 'VIP') {
                        data.LimitBank = 'AB_GOLD';
                    }
                }
            }
        }
    }
}

data.RES_LIMIT = new Array();
data.RES_LIMIT_TYPE = new Array();
data.LOCAL_MAX_LIMIT = new Array();

data.nodeName = 'LimitCalculation_before';