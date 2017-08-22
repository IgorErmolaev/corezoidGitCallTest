// JavaScript Document
data.FIN_RCT = new Array();
data.max_b = data['FIN_RCT'].length;
data.flag_B = 0;
data.flag_N = 0;
data.flag_G = 0;
data.flag_M101 = 0;
data.flag_NoBlock = 0;

data.RES_BLOCK_CHAR_TYPE = new Array();
data.RES_BLOCK_CODE_COMNT = new Array();
data.RES_BLOCK_DATE = new Array();

var date_b1  = new Date();
var date_b2  = new Date();

var code_bad= new Array('D046','D047','D029','D012','D013','D022','D001','D008','D027','D028','3011','D048',
    'F012','F045','F046','F047','F057','F058','F059','F060','F061','F754','F755','F756');

var code_good= new Array('A101','A102');

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



if (data.PROD_ACT_STATUS == 'DL' || data.PROD_ACT_STATUS == 'ER')
{
    //date
    if (data.RES_BLOCK_CHAR_TYPE.length > 0)
    {
        data.RES_BLOCK_CHAR_TYPE.length = 0;
        data.RES_BLOCK_CODE_COMNT.length = 0;
        data.RES_BLOCK_DATE.length = 0;
    }
}

if (data.STRATEGY_ID == 'Broker' || data.STRATEGY_ID == 'Rassr'){
    for (var i = 0; i < data.FIN_RCT.length; i++) {
        var the_code = data.FIN_RCT[i];
        if (code_bad.indexOf(the_code) != -1){
            date_b1.setDate(date_b1.getDate() + 30);
            data.RES_BLOCK_DATE.push(date_b1);
            data.RES_BLOCK_CHAR_TYPE.push('BROKER');
            data.RES_BLOCK_CODE_COMNT.push('k001');
        }
        else {
            if (code_good.indexOf(the_code) != -1){
                date_b1.setDate(date_b1.getDate() + 7);
                data.RES_BLOCK_DATE.push(date_b1);
                data.RES_BLOCK_CHAR_TYPE.push('BROKER');
                data.RES_BLOCK_CODE_COMNT.push('k001');
            }
        }
    }
}