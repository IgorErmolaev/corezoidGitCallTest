var typeSt = new Array('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','UNIPACKSAS','ONLINEANKETA');
var badStop = new Array('D101','D119','D122','D125','L115','L102','L114','D126','L117','D124','L116','M103','L127','D130','L106','M105','M115','X101');

if (data.limit_prep != undefined && data.limit_prep >0 && data.PROD_CHAR_BANK == 'AB' && typeSt.indexOf(data.PROD_CHAR_TYPE)!=-1){
    var typeBad = 'Y';
    for (var i=0; i<data.LOCAL_DEC_REAS_CODE_TABLE_1.length; i++){
        if (badStop.indexOf(data.LOCAL_DEC_REAS_CODE_TABLE_1[i]) != -1){
            typeBad = 'N';
            break;
        }
    }
    if (typeBad == 'Y'){
        data.RES_LIMIT_ITOG = data.limit_prep;
        for (var i=0;i<data.RES_DEC_REAS_CODE_TABLE.length;i++){
            if (['A101'].indexOf(data.RES_DEC_REAS_CODE_TABLE[i])== -1){
                data.LOCAL_DEC_CATEGORY_1.splice(data.RES_DEC_REAS_CODE_TABLE[i],1);
                data.LOCAL_DEC_TEXT_1.splice(data.RES_DEC_REAS_CODE_TABLE[i],1);
                data.RES_DEC_REAS_CODE_TABLE.splice(data.RES_DEC_REAS_CODE_TABLE[i],1);
                data.LOCAL_DEC_REAS_CODE_TABLE_1.splice(data.RES_DEC_REAS_CODE_TABLE[i],1);
            }
        }
        data.RES_DEC_CATEGORY='ACCEPT';
        data.RES_DEC_TEXT='ACCEPT';
    }
}