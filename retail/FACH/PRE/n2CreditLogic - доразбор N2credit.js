var typeProduct = new Array('UNI','UN_M','GOLD','GL_L');
var typeSt = new Array('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','UNIPACKSAS','ONLINEANKETA');
var stateO = new Array('O','R','D');
var stateOM = new Array('O','A','R','D','L');


function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}


/*Limit online*/
data.LOCAL_CRED_CARD_LIM_ONLINE =0;
for (var i=0; i<data.DATA_CRED.length;i++){
    if (data.DATA_CRED[i].REFERENC == data.PROD_CHAR_REFERENCE && data.PROD_CHAR_TYPE == 'UPLIMNKK'){
        data.LOCAL_CRED_CARD_LIM_ONLINE = data.DATA_CRED[i].LIMIT;
    }
}

/* Lock card*/
data.LOCAL_LOCK_CARD = 'N';

for (var i=0; i<data.DATA_CRED.length;i++) {
    if (typeProduct.indexOf(data.DATA_CRED[i].PRODUCT) !=-1 && data.DATA_CRED[i].LOCK_CARD == 1 ) {
        if (typeSt.indexOf(data.PROD_CHAR_TYPE) !=-1){
            data.LOCAL_LOCK_CARD = 'Y';
        }
        else {
            if (data.DATA_CRED[i].REFERENC == data.PROD_CHAR_REFERENCE){
                data.LOCAL_LOCK_CARD = 'Y';
            }
            else{
                if (data.LOCAL_CRED_CARD_LIM_ONLINE <= 0){
                    data.LOCAL_LOCK_CARD = 'Y';
                }
            }
        }
    }
}
if (data.LOCAL_LOCK_CARD == 'Y'){
    for (var i=0; i<data.DATA_CRED.length;i++) {
        if (typeProduct.indexOf(data.DATA_CRED[i].PRODUCT) !=-1 && data.DATA_CRED[i].LOCK_CARD != 1){
            if (data.DATA_CRED[i].LIMIT > 0 && stateO.indexOf(data.DATA_CRED[i].STATE)!= -1){
                data.LOCAL_LOCK_CARD = 'N';
            }
        }
    }
}


data.LOCAL_BODY_DELINQUENCY = 0;
data.LOCAL_PRC_DELINQUENCY = 0;
data.LOCAL_CRED_CARD_MORE_TERM ='N';
data.LOCAL_RESTRUCTURING = 0;
data.LOCAL_RESTRUCTURING_LIMIT = 0;
data.LOCAL_RESTRICTION_OLD30 = 0;
data.LOCAL_RESTRUCTURING_INTERN = 'N';
data.LOCAL_HAS_DELINQUENCY = 'N';
data.LOCAL_MOBILIZATION = 'N';
data.LOCAL_OLD_CONTR_TYPE = "N";
var daydifGive, ddays_st,ddays_cl;

if (data.DATA_CRED != undefined) {
    for (var i=0; i<data.DATA_CRED.length;i++){

        /*Сумма просрочки по основному долгу (тело кредита) */
        data.LOCAL_BODY_DELINQUENCY += data.DATA_CRED[i].PROS_CRED;

        /* Сумма просрочки без ОД (проценты,комиссии,пеня)*/
        data.LOCAL_PRC_DELINQUENCY += data.DATA_CRED[i].PROS_PRC;

        /*Карта открыта более 6 мес. назад*/
        ddays_cl = Datediff(data.DATA_CRED[i].DATECLOS_F);
        ddays_st = Datediff(data.DATA_CRED[i].DATE_START);
        if (data.DATA_CRED[i].REFERENC == data.PROD_CHAR_REFERENCE && data.PROD_CHAR_REFERENCE!= ''){
            daydifGive = Datediff(data.DATA_CRED[i].DATE_GIVEN);
            if (daydifGive/30 >6 ||  ddays_st/30>6){
                data.LOCAL_CRED_CARD_MORE_TERM ='Y';
            }
        }

        /*Данные по переносу лимита со старой карты*/
        if (data.DATA_CRED[i].REFERENC != '' && (typeProduct.indexOf(data.DATA_CRED[i].PRODUCT)!=-1 || data.DATA_CRED[i].PRODUCT == 'VIP') &&
            ((data.PROD_CHAR_BANK =='PB' || data.PROD_CHAR_BANK =='AB') &&  (data.DATA_CRED[i].BANK == 'PB' || data.DATA_CRED[i].BANK == 'AB'))){
            if (stateO.indexOf(data.DATA_CRED[i].STATE) != -1 && (data.DATA_CRED[i].LIMIT >0 || data.DATA_CRED[i].LIMIT_PREVIOUS > 0)){
                data.LOCAL_RESTRUCTURING += 100;
                data.LOCAL_RESTRUCTURING_LIMIT = Math.max(data.LOCAL_RESTRUCTURING_LIMIT,data.DATA_CRED[i].LIMIT,data.DATA_CRED[i].LIMIT_PREVIOUS);
            }
            if (ddays_cl/30 < 6 && data.DATA_CRED[i].LIMIT_PREVIOUS>0){
                data.LOCAL_RESTRUCTURING += 1000;
                data.LOCAL_RESTRUCTURING_LIMIT = Math.max(data.LOCAL_RESTRUCTURING_LIMIT,data.DATA_CRED[i].LIMIT_PREVIOUS);
                if (data.LOCAL_RESTRUCTURING_INTERN != 'Y' && ddays_st >=90){
                    data.LOCAL_RESTRUCTURING_INTERN = 'Y';
                }
            }
            if (ddays_st <30 && (data.DATA_CRED[i].LIMIT >0 || data.DATA_CRED[i].LIMIT_PREVIOUS > 0)){
                data.LOCAL_RESTRICTION_OLD30 = Math.max(data.LOCAL_RESTRICTION_OLD30,data.DATA_CRED[i].LIMIT,data.DATA_CRED[i].LIMIT_PREVIOUS)
            }
        }

        /*Валюта для повышения класса / Тип повышения класса*/
        if (data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB'){
            data.LOCAL_CARD_UPGRADE_CCY = 'UAH'
        }
        if (typeSt.indexOf(data.PROD_CHAR_TYPE)!= -1 && (data.DATA_CARD_UPGRADE_REFCONTRAC != undefined && data.DATA_CARD_UPGRADE_REFCONTRAC.length >0) &&
            data.PROD_TRANSUT == 'U' && data.DATA_CRED[i].REFERENC == data.DATA_CARD_UPGRADE_REFCONTRAC){
            data.LOCAL_CARD_UPGRADE_CCY = data.DATA_CRED[i].CCY;
            if (data.DATA_CRED[i].PRODUCT == 'GOLD' || data.DATA_CRED[i].PRODUCT == 'GL_L'){
                data.LOCAL_UPGRADE_TYPE = 'GOLD';
            }
            if (data.DATA_CRED[i].PRODUCT == 'UNI' || data.DATA_CRED[i].PRODUCT == 'UN_M'){
                data.LOCAL_UPGRADE_TYPE = 'UNI';
            }
            if (data.DATA_CRED[i].PRODUCT == 'JUNI'){
                data.LOCAL_UPGRADE_TYPE = 'JUNI';
            }
        }

        /*Наличие просрочки*/
        if (((data.LOCAL_BODY_DELINQUENCY + data.LOCAL_PRC_DELINQUENCY) >= 50 && (data.PROD_CHAR_BANK == 'AB' || data.PROD_CHAR_BANK == 'PB')) ||
            data.DATA_CRED[i].DAYS_CRED > 0 || data.DATA_CRED[i].DAYS_PRC > 0){
            data.LOCAL_HAS_DELINQUENCY = 'Y';
        }

        /*Клиент мобилизирован*/
        if (data.LOCAL_MOBILIZATION == 'N' && (data.DATA_CRED[i].TYPE == 'BOEC' || data.DATA_CRED[i].TYPE == 'BOEG') &&  stateOM.indexOf(data.DATA_CRED[i].STATE)!=-1){
            data.LOCAL_MOBILIZATION = 'Y';
        }
        if (data.PROD_CHAR_TYPE_CARD == 'BOEC' || data.PROD_CHAR_TYPE_CARD == 'BOEG'){
            data.LOCAL_MOBILIZATION = 'Y';
        }

        /*LOCAL_OLD_CONTR_TYPE*/
        if ( ["UNIG","UNII","UNIU","UNMP","UNUA","UNV5","UN14","UN15","UNCB","UND2",
                "UND4","UNI2","UNI4","UNI7","UNID","UNIK","UNIM","UNIO","UNIP","UNIT",
                "UNIV","UNIZ","UNK2","UNK4","UNKK","UNM2","UNM4","UNM7","UNP2","UNP4",
                "UNT2","UNT4","UNU2","UNU4","UNU7","UNV2","UNV4","UNZ2","UNZ4","UT2",
                "UT3","UT4","UKK4","UKK7","UKK2","UII2","UII7","UII4","MUT2", "UCMC", "UCMK"].indexOf(data.DATA_CRED[i].TYPE) >-1  &&
            ["O","A","R","D"].indexOf(data.DATA_CRED[i].STATE) >-1) {
            data.LOCAL_OLD_CONTR_TYPE = "Y";
        }

    }
}