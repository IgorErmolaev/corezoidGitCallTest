var Gold= new Array('CLGL','CLGB', 'CLG5', 'UGK1', 'UCRG', 'UGKM');

var Vip= new Array('PPFT','REPL','EXIT','FREE','FORL','LOYL','UPGR','LOY1','FRE3','EXI2','PPF1','REP1','EXI1','FRE1','FOR1','LOYD','UPG1','LODB','EXID','EXIB','LOY2','LODM','VIPP','MCWS',
    'MCWL','WS55','WS05','WS0P','WS5P','MCWF','WS00','INFI','INFA','INFL','INPA','INPI');

var stateO = new Array('O','A','R','D','L');

if (data.PROD_PACK_TYPE == 'UN_M'){
    data.PROD_PACK_TYPE = 'UNI';
}

if ((data.PROD_CHAR_REFERENCE != '' || data.PROD_CHAR_REFERENCE!= undefined) && (data.PROD_PACK_TYPE == '' || data.PROD_PACK_TYPE == undefined)){
    data.PROD_PACK_TYPE = 'UNI';
    if (Gold.indexOf(data.PROD_CHAR_TYPE_CARD) != -1){
        data.PROD_PACK_TYPE = 'GOLD';
    }
    else {
        for (var i=0; i< data.DATA_CRED.length; i++){
            if (data.DATA_CRED[i].REFERENC == data.PROD_CHAR_REFERENCE && (data.DATA_CRED[i].PRODUCT == 'GOLD' || data.DATA_CRED[i].PRODUCT == 'GL_L') ){
                data.PROD_PACK_TYPE = 'GOLD';
            }
        }
    }
}

for (var i=0; i< data.DATA_CRED.length; i++){
    if (Vip.indexOf(data.DATA_CRED[i].TYPE) != -1 &&  stateO.indexOf(data.DATA_CRED[i].STATE)!=-1 ){
        data.PROD_PACK_TYPE = 'VIP';
    }
}

if (data.PROD_CHAR_TYPE == 'VIPCARD' ||
    ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && (data.APP_CUST_IMPORTANT != '' || data.APP_CUST_IMPORTANT != undefined) && data.APP_CUST_IMPORTANT_PRODUCT == 'VP' && data.APP_CUST_IMPORTANT_LIMIT > 0) ||
    ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && Vip.indexOf(data.PROD_CHAR_TYPE_CARD) != -1)){
    data.PROD_PACK_TYPE = 'VIP';
}

data.RES_PROD_TYPE = data.PROD_PACK_TYPE;

if (data.PROD_CASH_CRED == 'Y'){
    data.RES_PROD_TYPE = 'FACH';
}