var VipProd= new Array('RS_V','RS_N','METR','ALT','SOB','EKOM','UNI','GOLD','CEB','VIP','LICH','ZP','OBJC','OBJG','ZP','ZP_R','STUD','LICH','SEA','PENS','GD_L','GD_M',
    'BAD','PERS','BLAN','KRED','CASH','KB','UN_M','PV01','PN02','PV02','PN02','PV03','PN03','PV17','PN17','PV04','PN04','PV05','PN05','PV06','PN06',
    'PV07','PN07','PV16','PN19','PV11','PN20','PV10','PN21','PV14','PV16','PV13','PN11','PV12','PN10','PV08','PV14','PV09','PN13','PV15','PF12');

var State= new Array('O','A','R','D','L')

data.LOCAL_VIP_BALANCE = 0;
data.LOCAL_VIP_SUM_LIMIT_FOR_IMPORTANT = 0;

if (
    (data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB')
    && (
        data.RES_PROD_TYPE == 'VIP' || (data.APP_CUST_IMPORTANT != undefined && data.APP_CUST_IMPORTANT_PRODUCT == 'VP' && data.APP_CUST_IMPORTANT_LIMIT>0)
    )
){
    for (var i=0 ; i< data.DATA_CRED.length; i++){
        if ((data.DATA_CRED[i].REFERENC != '' && data.DATA_CRED[i].REFERENC != undefined) && data.DATA_CRED[i].LIMIT>0 && VipProd.indexOf(data.DATA_CRED[i].PRODUCT) != -1 && State.indexOf(data.DATA_CRED[i].STATE)!= -1 &&
            data.DATA_CRED[i].RASTR != 'Y' && (data.DATA_CRED[i].BANK =='AB' || data.DATA_CRED[i].BANK =='PB')){
            data.LOCAL_VIP_SUM_LIMIT_FOR_IMPORTANT += data.DATA_CRED[i].LIMIT;
        }
    }
    if (data.APP_CUST_IMPORTANT_LIMIT > 0){
        data.LOCAL_VIP_BALANCE = data.APP_CUST_IMPORTANT_LIMIT - data.LOCAL_VIP_SUM_LIMIT_FOR_IMPORTANT;
    }
    else {
        data.LOCAL_VIP_BALANCE =0;
    }
}

data.nodeName = 'VipBalanceLimitCalc';