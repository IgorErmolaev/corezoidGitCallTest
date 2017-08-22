/*var middleCode = new Array('D004', 'D006', 'D021', 'D030', 'D045', 'D060', 'D064', 'D071', 'D074', 'D078', 'D079', 'D087', 'D205', 'D215', 'D219', 'D259', 'D263', 'D267', 'D268', 'D270', 'D273', 'D285', 'D202');
var hardCode = new Array('D001', 'D003', 'D004', 'D006', 'D007', 'D008', 'D009', 'D010', 'D093', 'D013', 'D015', 'D040', 'D033', 'D035', 'D038', 'D060', 'D080', 'D087', 'D089', 'D090', 'D092', 'D098', 'D202', 'D204', 'D205', 'D213', 'D215', 'D217',
    'D219', 'D220', 'D221', 'D224', 'D225', 'D226', 'D257', 'D258', 'D263', 'D264', 'D266', 'D268', 'D271', 'D272', 'D273', 'D274', 'D275', 'D277', 'D276', 'D279', 'D280', 'D281', 'D286', 'D290', 'D296', 'D287', 'D299');
*/
var goodState = new Array('preLim', 'upLimit');
var typeVIP = new Array('PPFT','REPL','EXIT','FREE','FORL','LOYL','UPGR','LOY1','FRE3','EXI2','PPF1','REP1','EXI1','FRE1','FOR1','LOYD','UPG1','LODB','EXID','EXIB','LOY2','LODM','VIPP','MCWS',
    'MCWL','WS55','WS05','WS0P','WS5P','MCWF','WS00','INFI','INFA','INFL','INPA','INPI');
var ATOtype = new Array('CRUG','CRVU');


function getStateBadCode (codeFinal, arrayType, arrayCode,state){
    if (codeFinal != 'A101') {
        if (arrayType[arrayCode.indexOf(codeFinal)] == 'Y') {
            return 'refuse';
        }
        else {
            if (state != 'refuse'){
                return 'extraInfo';
            }
            return state;
        }
    }
    else{
        return state;
    }
}



data.STATE_ACTION = '';
data.PRECALC_LIMIT = 0;
data.insurance = false;
data.needSKKManager = 'N';
var middle = 'N';
if (data.LIMIT_CLIENT_RES == 'error' || data.LIMIT_CLIENT_RES == 'empty') {
    if (data.LIMIT_CLIENT_CODE == 'E004') {
        data.STATE_ACTION = 'extraInfo';
    }
    else {
        data.STATE_ACTION = 'error';
    }
}
else {
    if (data.LIMIT_CLIENT_RES != 'ok') {
        data.STATE_ACTION = 'error';
    }
    else {
        if (data.LIMIT_CLIENT_F_NREF != 'A101' || (data.LIMIT_CLIENT_F_NCLIENT != 'A101' && data.LIMIT_CLIENT_F_NCLIENT != 'SSSS')) {
            /*4.1. Если (f_nclient равен "D275" или f_nref равен "D275") и PARAMS "CUST_IS_VIP" равен "Y" и PARAMS "APP_MAINPAN_PRODUCT_TYPE" равен "VIP"*/
            if (((['D275'].indexOf(data.LIMIT_CLIENT_F_NREF) != -1 && data.RES_PREDICT_CODE_TYPE_VIP[data.RES_PREDICT_CODE.indexOf(data.LIMIT_CLIENT_F_NCLIENT)] != 'Y') || (['D275'].indexOf(data.LIMIT_CLIENT_F_NCLIENT) != -1 &&
                data.RES_PREDICT_CODE_TYPE_VIP[data.RES_PREDICT_CODE.indexOf(data.LIMIT_CLIENT_F_NREF)] != 'Y')) && (data.APP_CUST_IS_VIP == 'Y' || data.PROD_PACK_TYPE == 'VIP') && typeVIP.indexOf(data.PROD_CHAR_TYPE_CARD) != -1) {
                if (data.DATA_OPER_IS_VIP_MANAGER == 'Y'){
                    data.STATE_ACTION = 'createDoc';
                }
                else {
                    data.STATE_ACTION = 'refuse';
                }
            }
            else
            /*мгновенная рассрочка*/
            if (data.LIMIT_CLIENT_F_NCLIENT == 'D500' && data.LIMIT_CLIENT_F_NREF == 'A101' && data.PROD_CHAR_BANK != 'AB') {
                data.STATE_ACTION = 'instalment';
            }
            else
            if (data.RES_PREDICT_CODE != undefined){
                if (data.APP_CUST_IS_VIP == 'Y' || data.PROD_PACK_TYPE == 'VIP'){
                    if (data.RES_PREDICT_CODE_TYPE_VIP != undefined ){
                        data.STATE_ACTION = getStateBadCode(data.LIMIT_CLIENT_F_NCLIENT, data.RES_PREDICT_CODE_TYPE_VIP, data.RES_PREDICT_CODE,data.STATE_ACTION);
                        data.STATE_ACTION = getStateBadCode(data.LIMIT_CLIENT_F_NREF, data.RES_PREDICT_CODE_TYPE_VIP, data.RES_PREDICT_CODE,data.STATE_ACTION);
                    }
                }
                else{
                    if (data.RES_PREDICT_CODE_TYPE != undefined ){
                        data.STATE_ACTION = getStateBadCode(data.LIMIT_CLIENT_F_NCLIENT, data.RES_PREDICT_CODE_TYPE, data.RES_PREDICT_CODE,data.STATE_ACTION);
                        data.STATE_ACTION = getStateBadCode(data.LIMIT_CLIENT_F_NREF, data.RES_PREDICT_CODE_TYPE, data.RES_PREDICT_CODE,data.STATE_ACTION);
                    }
                }

            }
        }

        /*5.1. Сравниваем MaxLimGran из ответа и значение из PARAMS "APP_MAINPAN_CONTRACT_LIMIT"*/
        if (data.STATE_ACTION != 'instalment' && data.STATE_ACTION != 'refuse' && data.STATE_ACTION != 'extraInfo' ) {
            if (data.RES_CRED_LIM >= data.LIMIT_CLIENT_MAXLIMGRAN) {
                data.STATE_ACTION = 'refuse';
            }
            else {
                if (data.LIMIT_CLIENT_NEWLIMIT == null || data.LIMIT_CLIENT_NEWLIMIT == undefined || data.LIMIT_CLIENT_NEWLIMIT < 0) {
                    data.LIMIT_CLIENT_NEWLIMIT = 0;
                }
                if (data.sumLimitCred == undefined || data.sumLimitCred < 0) {
                    data.sumLimitCred = Math.max(Math.max(0,data.RES_CRED_LIM),data.DATA_CRED_SUM_LIMIT);
                }

                /*5.2. Вычисляем лимит предрасчитанный*/
                var limitPre = data.LIMIT_CLIENT_NEWLIMIT - data.sumLimitCred + data.RES_CRED_LIM;
                limitPre = Math.max(limitPre, 0);
                if ((data.APP_CUST_IS_VIP == 'Y' || data.PROD_PACK_TYPE == 'VIP') && typeVIP.indexOf(data.PROD_CHAR_TYPE_CARD)!=-1){
                    limitPre = Math.min(limitPre,50000);
                }


                /*5.3. Сравниваем лимит запрошенный (PARAMS.APP_MAINPAN_LIMIT_SUMM_REQ) и лимит предрасчитанный (см.п. 5.2.)*/
                if (data.STATE_ACTION != 'createDoc') {
                    if (data.PROD_CHAR_LIMITREQUESTED > limitPre) {
                        if (data.RES_CRED_LIM < limitPre) {
                            data.STATE_ACTION = 'preLim';
                            data.PRECALC_LIMIT = limitPre;
                        }
                        else {
                            data.STATE_ACTION = 'extraInfo';
                            data.PRECALC_LIMIT = limitPre;
                        }
                    }
                    else {
                        data.STATE_ACTION = 'upLimit';
                        data.PRECALC_LIMIT = data.PROD_CHAR_LIMITREQUESTED;
                    }
                }
                else {

                    if (data.PROD_CHAR_LIMITREQUESTED <= limitPre){
                        data.STATE_ACTION = 'upLimit';
                        data.PRECALC_LIMIT = data.PROD_CHAR_LIMITREQUESTED;
                    }
                    else{
                        data.STATE_ACTION = 'refuse';
                        data.PRECALC_LIMIT = 0;
                    }

                    if (data.PRECALC_LIMIT <= data.RES_CRED_LIM  && data.STATE_ACTION != 'refuse'){
                        data.STATE_ACTION = 'refuse';
                    }
                }
            }
        }
        else {
            data.PRECALC_LIMIT = 0;
        }

        if ( data.STATE_ACTION == ''){
            data.STATE_ACTION = 'extraInfo';
            data.PRECALC_LIMIT = 0;
        }


        /*- если преф "check_insur_limit" установлен в "Y" и f_nclient в ответе сервиса пришло "SSSS", то:
         в LGETPRECALCLIM_WAY пишем "PROPINS", а в FL_LGETPRECALCLIM пишем значение, которое хотели записать в LGETPRECALCLIM_WAY;
         - если предыдущие проверки не сработали, то просто пишем в LGETPRECALCLIM_WAY переданное значение.*/

        if (goodState.indexOf(data.STATE_ACTION) != -1 && data.LIMIT_CLIENT_F_NCLIENT == 'SSSS' && ['WAVE', 'P24WAVE', 'IVR'].indexOf(data.pointType) == -1 && data.PROD_CHAR_BANK != 'AB') {
            if (data.PRECALC_LIMIT - data.RES_CRED_LIM < 500 && data.RES_INSURANCE_TAKEN == 'false'){
                data.insurance = false;
                data.STATE_ACTION = 'refuse';
                data.PRECALC_LIMIT = 0;
                data.refuseCodes = 'kD135';
            }
            else {
                data.insurance = true;
            }
        }
        //------------при подаче заявки через Волну просим доп.данные--------------//
        if (data.pointType == 'WAVE' && goodState.indexOf(data.STATE_ACTION) != -1 && data.APP_CUST_IS_VIP != 'Y' && data.PROD_PACK_TYPE != 'VIP' && data.DATA_OPERCENTER != 'Y'){
            data.STATE_ACTION = 'extraInfo';
        }
    }

}



data.refuseCodes = '';
if (data.LIMIT_CLIENT_F_NCLIENT != 'SSSS') {
    if (data.LIMIT_CLIENT_F_NCLIENT == 'A101' && data.LIMIT_CLIENT_F_NREF != 'A101'){
        data.refuseCodes = data.LIMIT_CLIENT_F_NREF;
    }
    else {
        data.refuseCodes = data.LIMIT_CLIENT_F_NCLIENT;
    }
}
else {
    data.refuseCodes = data.LIMIT_CLIENT_F_NREF;
}

if (['extraInfo','upLimit','preLim'].indexOf(data.STATE_ACTION) != -1 && data.APP_CUST_IS_VIP != 'Y' && data.PROD_PACK_TYPE != 'VIP'){
    switch (data.groupResult){
        case '056783':
        case '056782':
            data.STATE_ACTION = 'extraInfo';
            data.PRECALC_LIMIT = 0;
            data.insurance = false;
            break;
        case '056784':
        case '058105':
            data.STATE_ACTION = 'refuse';
            data.PRECALC_LIMIT = 0;
            data.refuseCodes = 'kD135';
            data.insurance = false;
            break;
        default :
    }
}

if (data.STATE_ACTION == 'refuse' && data.refuseCodes == 'A101' && data.RES_CRED_LIM >= data.LIMIT_CLIENT_MAXLIMGRAN ){
    data.refuseCodes = 'kD111';
   /* if (data.block90Days  != 'Y' && data.RES_CRED_LIM <25000 && data.RES_CRED_LIM == data.LIMIT_CLIENT_MAXLIMGRAN){
        data.PRECALC_LIMIT =Math.min(data.RES_CRED_LIM + Math.max(Math.round(Math.min(0.1*data.RES_CRED_LIM,0.1*(data.PROD_CHAR_LIMITREQUESTED-data.RES_CRED_LIM))),100),25000);
        data.STATE_ACTION = 'upLimit';
        data.refuseCodes = 'A101';
        data.RES_BLOCK_TREE_MONTHS = 'Y';
    }*/
}




//---------------------------------------------------------------------
/*if (['upLimit','preLim'].indexOf(data.STATE_ACTION) != -1 && data.refuseCodes == 'A101' && data.PROD_CHAR_BANK == 'AB' && data.RES_CRED_LIM < data.LIMIT_CLIENT_MAXLIMGRAN  && data.APP_CUST_IS_VIP != 'Y' && data.PROD_PACK_TYPE != 'VIP'){
    //data.refuseCodes = 'kD111';
    var id_score = data.APP_CUST_ID;
    id_score = String(id_score);
    id_score = id_score.slice(-3);
    id_score = +id_score;
    if (id_score<500 && data.block90Days != 'Y' && data.RES_CRED_LIM < 25000 && data.RES_CRED_LIM < data.LIMIT_CLIENT_MAXLIMGRAN) {
        data.PRECALC_LIMIT = Math.min(Math.min(data.RES_CRED_LIM + Math.max(Math.round(Math.min(0.1 * data.RES_CRED_LIM, 0.1 * (data.PROD_CHAR_LIMITREQUESTED - data.RES_CRED_LIM))), 100), data.LIMIT_CLIENT_MAXLIMGRAN),25000);
        if (data.PRECALC_LIMIT - data.RES_CRED_LIM >=500 ){
            data.STATE_ACTION = 'upLimit';
            data.refuseCodes = 'A101';
            data.insurance = false;
            data.RES_BLOCK_TREE_MONTHS = 'Y';
        }
        else{
            data.refuseCodes = 'kD111';
            data.STATE_ACTION = 'refuse';
            data.PRECALC_LIMIT = 0;
            data.insurance = false;
        }

    }
    else {
        data.refuseCodes = 'kD111';
        data.STATE_ACTION = 'refuse';
        data.PRECALC_LIMIT = 0;
        data.insurance = false;
    }

}

if (['extraInfo'].indexOf(data.STATE_ACTION) != -1  && data.PROD_CHAR_BANK == 'AB'  && data.APP_CUST_IS_VIP != 'Y' && data.PROD_PACK_TYPE != 'VIP'){
    data.refuseCodes = 'kD111';
    data.STATE_ACTION = 'refuse';
    data.PRECALC_LIMIT = 0;
    data.insurance = false;
}*/
/*
if (data.PROD_CHAR_BANK == 'PB') {
    data.refuseCodes = 'kD111';
    data.STATE_ACTION = 'refuse';
    data.PRECALC_LIMIT = 0;
    data.insurance = false;
}*/


//---------------------------------------------------------------------
/*
if (data.clientActionKI == 'Y' && data.PROD_CHAR_BANK == 'PB' && data.APP_CUST_IS_VIP != 'Y' && data.PROD_PACK_TYPE != 'VIP'){
    data.STATE_ACTION = 'actionKI';
    data.PRECALC_LIMIT = 0;
}
*/

if (data.STATE_ACTION != 'refuse'  && data.hasCardLimit == 'Y'){
    data.STATE_ACTION = 'refuse';
    data.PRECALC_LIMIT = 0;
    data.insurance = false;
    data.refuseCodes = 'kL115';
}

if (data.STATE_ACTION != 'refuse'  && ATOtype.indexOf(data.PROD_CHAR_TYPE_CARD)!= -1){
    data.STATE_ACTION = 'refuse';
    data.PRECALC_LIMIT = 0;
    data.insurance = false;
    data.refuseCodes = 'kD125';
}

if (data.STATE_ACTION != 'refuse' && data.PROD_PACK_TYPE == 'JUNI'){
    data.PRECALC_LIMIT = Math.min(data.PRECALC_LIMIT,300);
    if (data.PRECALC_LIMIT <= data.RES_CRED_LIM){
        data.STATE_ACTION = 'refuse';
        data.PRECALC_LIMIT = 0;
        data.insurance = false;
        data.refuseCodes = 'kD111';
    }
}

if (data.FRAUD_DEC_FINAL_FLOW == 'DECLINE'){
    data.refuseCodes = 'kD111';
    data.STATE_ACTION = 'refuse';
    data.PRECALC_LIMIT = 0;
    data.insurance = false;
}

/*
 if (data.APP_CUST_ID == 1000735320)
 {
 data.STATE_ACTION = 'preLim';
 data.PRECALC_LIMIT = limitPre;
 data.refuseCodes = 'A101';
 data.insurance = true;
 }
 if (data.APP_CUST_ID == 20191917)
 {
 data.STATE_ACTION = 'preLim';
 data.PRECALC_LIMIT = 20000;
 data.refuseCodes = 'A101';
 data.insurance = true;
 }*/
/*if (data.APP_CUST_ID == 24812836)
 {
 data.STATE_ACTION = 'createDoc';
 data.refuseCodes ='D275';
 data.PRECALC_LIMIT = 30000;
 data.APP_CUST_IS_VIP = 'Y'
 //data.insurance = false;
 }*/





//-----------для тестовой группы п24-------------//
/*
 if (data.blockPrivat24 == 'TG01' && data.insurance == true){
 data.insurance = false;
 }
 */

var goodState = new Array('preLim', 'upLimit'); // в отдельной ноде еще раз объявила
var zpPredictType = new Array('ACTIVEZP','ZARPL_B','SOTR','SOTR_FST','ZARPL_ZFST','ZARPL_Z','ZARPL_ACCM','ZARPL_BFST','ZARPL_OST','SEA','CRED_ACCM');

var id_test = data.APP_CUST_ID;
id_test = String(id_test);
id_test = id_test.slice(-3);
id_test = +id_test;

if ((goodState.indexOf(data.STATE_ACTION) != -1 || (data.STATE_ACTION == 'extraInfo' && data.PRECALC_LIMIT > data.RES_CRED_LIM &&
    data.pointType == 'WAVE')) && data.insurance != 'true' && ((id_test >= 300 && id_test < 400) ||
    data.blockPrivat24 == 'TG01')) {

    for (var i = 0; i < data.RES_PREDICT_LIMIT_TYPE.length; i++) {
        if (zpPredictType.indexOf(data.RES_PREDICT_LIMIT_TYPE[i]) != -1)
            var ZP = 1;
    }

    if (ZP != 1 && data.isSmart == 'Y' && data.RES_PREDICT_LIMIT_TYPE.indexOf('DEPOSIT') == -1 && (data.colorP24
        == 0 || data.colorP24 == 2) && (data.APP_CUST_IS_VIP != 'Y' || data.RES_PROD_TYPE != 'VIP') &&
        (data.pointType != 'IVR' || data.pointType != 'SENDER')){
        data.STATE_ACTION = 'refuse';
        data.PRECALC_LIMIT_before_TG01 = data.PRECALC_LIMIT;
        data.PRECALC_LIMIT = 0;
        data.refuseCodes = 'TG01';
        data.insurance = false;
    }
}


//---------для Юниоров--------------//

/*if (data.STATE_ACTION != 'refuse' && data.PROD_PACK_TYPE == 'JUNI'){
    data.PRECALC_LIMIT = Math.min(data.PRECALC_LIMIT,300);
    if (data.APP_CUST_ID != data.APP_AUTHOR_ID){
        if (data.PRECALC_LIMIT <= data.RES_CRED_LIM){
        data.STATE_ACTION = 'refuse';
        data.PRECALC_LIMIT = 0;
        data.insurance = false;
        data.refuseCodes = 'kD111';
        }
    }
    else {
    data.STATE_ACTION = 'wait';
    }
}
*/


