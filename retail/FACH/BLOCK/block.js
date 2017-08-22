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

var code_bad= new Array('D106','D112','L111','L120','L103','L116', 'M103','L106','L121','2222','L124','D124','L126','D130',
    'M109','M110','M111','M112','M113','M116','M117','M118','M119','M120',
    'F012','F045','F046','F047','F057','F058','F059','F060','F061','F754','F755','F756');

var code_good= new Array('A101','A102','A103','A104','M104','D111');

var code_noBlock= new Array('M106','M107','M108','D132');

var code_cash = new Array('D601','D603', 'D604', 'D605', 'D606', 'D607', 'D608', 'D609', 'D610', 'D620', 'D621', 'D622', 'D623', 'D624', 'D626','D642',
    'D004','D006','D009','D093','D028','D038','D999','D072','D073','D080','D087','D203','D265','D266','D267','D271','D272','D273','D280','D283','D291');

var code_cash_good = new Array( 'D618','D602','D269','D264','D274','D262','D231','D287','D284','D225','D224','D270','D220','D288','D294','D295','D301','D217','D216','D204',
    'D201','D200','D099','D094','D079','D054','D053','D048','D085','D202','D075','D074','D068','D211','D064','D061','D039','D031','D213','D025',
    'D024','D023','D002','D293','D292','D078','D277','D206','D071','D290','D215','D035','D034','D033','D027','D026','D092','D021','D018',
    'D017','D015','D282','D281','D013','D010','D090','D089','D285','D268','D009','D257','D258','D286','D008','D007','D255','D214','D088',
    'D060','D205','D098','D226','D003','D001','D095','D230');


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

if (data.RES_PROD_TYPE != 'FACH') {
    if (data.max_b > 0) {
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
                    if (the_code = 'M101') {
                        data.flag_M101++;
                    }
                    else {
                        if (code_noBlock.indexOf(the_code) != -1) {
                            data.flag_NoBlock++;
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

if ((data.flag_B > 0 || (data.flag_B == 0 && data.flag_N == 0 && data.flag_G != 0) || data.flag_M101 != 0) && data.flag_NoBlock == 0)
{
    date_b1.setDate(date_b1.getDate() + 30);
    data.RES_BLOCK_DATE.push(date_b1);
    data.RES_BLOCK_CHAR_TYPE.push('UPLIMIT');
    data.RES_BLOCK_CODE_COMNT.push('k001');

    data.RES_BLOCK_CHAR_TYPE.push('UPLIMNKK');
    data.RES_BLOCK_CODE_COMNT.push('k001');
    data.RES_BLOCK_DATE.push(date_b1);
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

if (data.RES_PROD_TYPE == 'FACH'){
    if (code_cash.indexOf(data.RES_DEC_REAS_FINAL_CODE) != -1){
        date_b1.setDate(date_b1.getDate() + 30);
        data.RES_BLOCK_DATE.push(date_b1);
        data.RES_BLOCK_CHAR_TYPE.push('FACH');
        data.RES_BLOCK_CODE_COMNT.push('k001');
    }
    else {
        if (data.RES_DEC_REAS_FINAL_CODE == 'A101') {
            date_b1.setDate(date_b1.getDate() + 5);
            data.RES_BLOCK_DATE.push(date_b1);
            data.RES_BLOCK_CHAR_TYPE.push('FACH');
            data.RES_BLOCK_CODE_COMNT.push('k001');
        }
        else {
            if (code_cash_good.indexOf(data.RES_DEC_REAS_FINAL_CODE) != -1){
                date_b1.setDate(date_b1.getDate() + 3);
                data.RES_BLOCK_DATE.push(date_b1);
                data.RES_BLOCK_CHAR_TYPE.push('FACH');
                data.RES_BLOCK_CODE_COMNT.push('k001');
            }
        }
    }
}