data.FIN_RCT = new Array();
data.flag_B = 0;
data.flag_N = 0;
data.flag_G = 0;
data.flag_M101 = 0;
data.flag_NoBlock = 0;
data.flag_TG01 = 0;

data.RES_BLOCK_CHAR_TYPE = new Array();
data.RES_BLOCK_CODE_COMNT = new Array();
data.RES_BLOCK_DATE = new Array();

var date_b1  = new Date();
var date_b2  = new Date();
var date_b3  = new Date();


var code_bad= new Array('D106','D112','L111','L120','L103','L116', 'M103','L106','L121','2222','L124','D124','L126','D130',
    'M109','M110','M111','M112','M113','M116','M117','M118','M119','M120','L132',
    'F012','F045','F046','F047','F057','F058','F059','F060','F061','F754','F755','F756');

var code_good= new Array('A101','A102','A103','A104','M104','D111');

var code_noBlock= new Array('M106','M107','M108','D132');

if (data.RES_DEC_REAS_CODE_TABLE!= undefined && data.RES_DEC_REAS_CODE_TABLE.length>0){
    for (var i=0; i< data.RES_DEC_REAS_CODE_TABLE.length;i++){
        data.FIN_RCT.push(data.RES_DEC_REAS_CODE_TABLE[i]);
    }
}
if (data.FIN_REAS_CODE_TABLE!= undefined && data.FIN_REAS_CODE_TABLE.length>0){
    for (var i=0; i< data.FIN_REAS_CODE_TABLE.length;i++){
        data.FIN_RCT.push(data.FIN_REAS_CODE_TABLE[i]);
    }
}

if (data.PROD_APP_CODE_COMMENT_KC != undefined){
    data.FIN_RCT.push(data.PROD_APP_CODE_COMMENT_KC);
}

if (data.STRATEGY_ID == 'UpLimit' && data.FIN_RCT.length==0 ){
    if (data.RES_LIMIT_P48>0 && data.insuranceTaken == false && data.insurance == true && (data.STATE_ACTION == 'upLimit' ||data.STATE_ACTION == 'preLim')){
        data.FIN_RCT.push('A101');
    }
    else {
        if (data.refuseCodes != undefined){
            data.FIN_RCT.push(data.refuseCodes);
        }
    }
}


if (data.RES_PROD_TYPE != 'FACH') {
    if (data.FIN_RCT!= undefined && data.FIN_RCT.length > 0) {
        for (var i = 0; i < data.FIN_RCT.length; i++) {
            var the_code = data.FIN_RCT[i];
            if (code_bad.indexOf(the_code) != -1) {
                data.flag_B++;
            }
            else {
                if (code_good.indexOf(the_code) != -1) {
                    data.flag_G++;
                }
                else {
                    if (the_code == 'M101') {
                        data.flag_M101++;
                    }
                    else {
                        if (code_noBlock.indexOf(the_code) != -1) {
                            data.flag_NoBlock++;
                        }
                        else {
                            if (the_code == 'TG01') {
                                data.flag_TG01++;
                            }
                            else {
                                data.flag_N++;
                            }
                        }
                    }
                }
            }
        }
    }

}


if ((data.flag_B > 0 || (data.flag_B == 0 && data.flag_N == 0 && data.flag_G != 0) || data.flag_M101 != 0) && data.flag_NoBlock == 0 && data.flag_TG01 == 0)
{
    if (data.FIN_RCT.indexOf('D135')== -1){
        date_b1.setDate(date_b1.getDate() + 30);
        data.RES_BLOCK_DATE.push(date_b1);
        data.RES_BLOCK_CHAR_TYPE.push('UPLIMIT');
        data.RES_BLOCK_CODE_COMNT.push('k001');

        data.RES_BLOCK_CHAR_TYPE.push('UPLIMNKK');
        data.RES_BLOCK_CODE_COMNT.push('k001');
        data.RES_BLOCK_DATE.push(date_b1);
    }

}

if (data.flag_TG01 > 0 && data.blockPrivat24 != 'TG01') {
    date_b2.setDate(date_b2.getDate() + 30);
    data.RES_BLOCK_CHAR_TYPE.push('PRIVAT24');
    data.RES_BLOCK_CODE_COMNT.push('TG01');
    data.RES_BLOCK_DATE.push(date_b2);

}

if (data.STRATEGY_ID == 'UpLimit' && data.RES_BLOCK_TREE_MONTHS == 'Y'){
    date_b3.setDate(date_b3.getDate() + 90);
    data.RES_BLOCK_CHAR_TYPE.push('UPLIMNKK3MONTHS');
    data.RES_BLOCK_CODE_COMNT.push('k001');
    data.RES_BLOCK_DATE.push(date_b3);
}



if (data.RES_CRED_LIM == undefined || data.RES_CRED_LIM==null){
    data.RES_CRED_LIM = 0;
}

data.OPER_TYPE = "UP";

if (data.STRATEGY_ID == 'UpLimit' ) {
    if (data.PROD_ACT_STATUS == undefined || data.PROD_ACT_STATUS == null) {
        if (data.RES_CRED_LIM < data.RES_LIMIT_P48) {
            data.PROD_ACT_STATUS = 'AN';
        }
        else {
            data.PROD_ACT_STATUS = 'DL';
        }
    }
    if (data.RES_TYPE_SMS == undefined || data.RES_TYPE_SMS==null ){
        data.RES_TYPE_SMS = 'Y';
    }
}

if (data.LOCAL_LIMIT_FOR_GOLD_ITOG == undefined || data.LOCAL_LIMIT_FOR_GOLD_ITOG==null){
    data.RES_ACTION_LIMIT = 0;
}
else{
    data.RES_ACTION_LIMIT =  data.LOCAL_LIMIT_FOR_GOLD_ITOG;
}

switch (data.APP_CUST_LANG) {
    case 'UKR':
        data.langClient = 'UA';
        break;
    case 'RUS':
        data.langClient = 'RU';
        break;
    default :
        data.langClient = 'UA';
}