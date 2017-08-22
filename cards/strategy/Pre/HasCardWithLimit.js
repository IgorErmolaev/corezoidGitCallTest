var Product= new Array('UNI', 'UN_M', 'GOLD');
var State= new Array('O','A','R','D','L');

data.LOCAL_CRED_HAS_CARD_WITH_LIMIT = 'N';
var cnt =0;
data.DATA_REF_OTHERBANK  = null;
data.DATA_LIMIT_OTHERBANK = 0;

if (data.PROD_CHAR_LIMITREQUESTED  != undefined && data.PROD_CHAR_LIMITREQUESTED >= 0 && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.PROD_PACK_TYPE != 'VIP'){
    for (var i=0; i< data.DATA_CRED.length; i++){
        if (data.DATA_CRED[i].REFERENC != undefined && data.DATA_CRED[i].REFERENC != data.PROD_CHAR_REFERENCE && data.DATA_CRED[i].LIMIT>0 && Product.indexOf(data.DATA_CRED[i].PRODUCT) != -1 &&
        State.indexOf(data.DATA_CRED[i].STATE) != -1 && data.DATA_CRED[i].RASTR != 'Y' ){
            if (data.DATA_CRED[i].BANK == data.PROD_CHAR_BANK){
                data.LOCAL_CRED_HAS_CARD_WITH_LIMIT = 'Y';
            }
            else{
                cnt++;
                data.DATA_REF_OTHERBANK  = data.DATA_CRED[i].REFERENC;
                data.DATA_LIMIT_OTHERBANK = data.DATA_CRED[i].LIMIT;
                data.PROD_CHAR_SET_LIMIT = 'LIMIT';
            }
        }
    }
}

if (cnt >1){
    data.LOCAL_CRED_HAS_CARD_WITH_LIMIT = 'Y';
    data.DATA_REF_OTHERBANK  = null;
    data.DATA_LIMIT_OTHERBANK = 0;
    data.PROD_CHAR_SET_LIMIT = 'ZERO';
}


data.nodeName = 'HasCardWithLimit';