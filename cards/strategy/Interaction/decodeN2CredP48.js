var Product= new Array('UNI', 'UN_M', 'GOLD');
var VipProd= new Array('RS_V','RS_N','METR','ALT','SOB','EKOM','UNI','GOLD','CEB','VIP','LICH','ZP','OBJC','OBJG','ZP','ZP_R','STUD','LICH','SEA','PENS','GD_L','GD_M',
    'BAD','PERS','BLAN','KRED','CASH','KB','UN_M','PV01','PN02','PV02','PN02','PV03','PN03','PV17','PN17','PV04','PN04','PV05','PN05','PV06','PN06',
    'PV07','PN07','PV16','PN19','PV11','PN20','PV10','PN21','PV14','PV16','PV13','PN11','PV12','PN10','PV08','PV14','PV09','PN13','PV15','PF12');
var State= new Array('O','A','R','D','L');

data.LOCAL_CRED_HAS_CARD_WITH_LIMIT = 'N';
var cnt =0;
data.DATA_REF_OTHERBANK  = null;
data.DATA_LIMIT_OTHERBANK = 0;


/*сохраняем старый DATA_CRED, делаем из него ключ_реф-значение*/
var datacred = new Object();
if (data.DATA_CRED != null) {
    for (var i=0; i<data.DATA_CRED.length; i++){
        var credref = data.DATA_CRED[i].REFERENC;
        if (credref != null && credref.length>0) {
            var cred = new Object();
            cred.BAL = data.DATA_CRED[i].BAL;
            cred.LIMIT = data.DATA_CRED[i].LIMIT;
            cred.PRODUCT = data.DATA_CRED[i].PRODUCT;
            cred.TYPE = data.DATA_CRED[i].TYPE;
            cred.STATE = data.DATA_CRED[i].STATE;
            cred.BANK = data.DATA_CRED[i].BANK;
            datacred[credref] = cred;
        }

    }
}

/*****************************N2_CREDIT*****************************/

data.DATA_CRED = new Array();
data.cred_branch_list = new Array();
var product = new Array('UNI','UNI_M','RS_N','RS_V','SOB','CASH','METR','GOLD','FACH');
var active = new Array('O','A','R','D','L');

if ( data.N2_Credit != null) {

    for (var i = 0; i < data.N2_Credit.length; i++) {
        if (data.N2_Credit[i].credit_Num != '') {
            data.DATA_CRED[i] = {};
            var to_Curr;
            if (data.N2_Credit[i].to_Curr != null) {
                to_Curr = data.N2_Credit[i].to_Curr;
            } else {
                to_Curr=1;
            }
            data.DATA_CRED[i].REFERENC = data.N2_Credit[i].credit_Num.trim();

            data.DATA_CRED[i].BAL = data.N2_Credit[i].bal_Kred * to_Curr;
            data.DATA_CRED[i].LIMIT = data.N2_Credit[i].limit_Balance * to_Curr;
            data.DATA_CRED[i].PRODUCT = data.N2_Credit[i].product.trim();
            data.DATA_CRED[i].TYPE = data.N2_Credit[i].contractype.trim();
            data.DATA_CRED[i].STATE = data.N2_Credit[i].contrstate.trim();
            data.DATA_CRED[i].CCY = data.N2_Credit[i].currency.trim();
            data.DATA_CRED[i].RASTR = data.N2_Credit[i].rastr_State.trim();

            if (data.N2_Credit[i].bank == undefined) {
                data.DATA_CRED[i].BANK = "PB";
            } else {
                data.DATA_CRED[i].BANK = data.N2_Credit[i].bank.trim();
            }

            data.DATA_CRED[i].TO_CURR = to_Curr;

            //заполняем данными из кошелька (если они есть)
            var credref = data.DATA_CRED[i].REFERENC;
            if (datacred[credref] != undefined) {
                data.DATA_CRED[i].BAL = datacred[credref].BAL;
                data.DATA_CRED[i].LIMIT = datacred[credref].LIMIT;
                data.DATA_CRED[i].PRODUCT = datacred[credref].PRODUCT;
                data.DATA_CRED[i].TYPE = datacred[credref].TYPE;
                data.DATA_CRED[i].STATE = datacred[credref].STATE;
                delete datacred[credref];
            }

        }
    }
    //дополняем остатками от старого датакреда
    var datacredkeys = Object.keys(datacred);
    var deltaindex = data.DATA_CRED.length;
    for (var i=0; i<datacredkeys.length; i++) {
        var realindex = i + deltaindex;
        data.DATA_CRED[realindex] = new Object();
        data.DATA_CRED[realindex].REFERENC = datacredkeys[i];
        data.DATA_CRED[realindex].BAL = datacred[datacredkeys[i]].BAL;
        data.DATA_CRED[realindex].LIMIT = datacred[datacredkeys[i]].LIMIT;
        data.DATA_CRED[realindex].PRODUCT = datacred[datacredkeys[i]].PRODUCT;
        data.DATA_CRED[realindex].TYPE = datacred[datacredkeys[i]].TYPE;
        data.DATA_CRED[realindex].STATE = datacred[datacredkeys[i]].STATE;
        data.DATA_CRED[realindex].BANK = datacred[datacredkeys[i]].BANK;

        data.DATA_CRED[realindex].CCY = "UAH";
        data.DATA_CRED[realindex].RASTR = "";

        data.DATA_CRED[realindex].TO_CURR = 1;
    }
    delete data.N2_Credit;
}

data.sumLimitCred = 0;
data.hasCardLimit = 'N';

if (data.DATA_CRED != undefined ){
    for (var i=0; i< data.DATA_CRED.length; i++){
        if (data.DATA_CRED[i].REFERENC != undefined && data.DATA_CRED[i].LIMIT>0 && (Product.indexOf(data.DATA_CRED[i].PRODUCT) != -1 || (VipProd.indexOf(data.DATA_CRED[i].PRODUCT) !=
            -1 && (data.APP_CUST_IS_VIP == 'Y' || data.PROD_PACK_TYPE == 'VIP' ) && data.DATA_CRED[i].PRODUCT != 'JUNI')) &&
            State.indexOf(data.DATA_CRED[i].STATE) != -1 && data.DATA_CRED[i].RASTR != 'Y' ){
            data.sumLimitCred += data.DATA_CRED[i].LIMIT;

            if (data.APP_CUST_IS_VIP != 'Y' && data.PROD_PACK_TYPE != 'VIP' && data.DATA_CRED[i].REFERENC != data.PROD_CHAR_REFERENCE && data.DATA_CRED[i].BANK == data.PROD_CHAR_BANK){
                data.hasCardLimit = 'Y';
            }
        }
    }
}
