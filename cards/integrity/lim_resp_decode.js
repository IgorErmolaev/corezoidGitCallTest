var fs = require('fs');
var json = fs.readFileSync(__dirname+'/../resource/test.json').toString();
var data = JSON.parse(json).data;

function is_array (a) {
    return (typeof a == "object") && (a instanceof Array);
}

data.resp={};

if (data["__conveyor_api_array__"] != undefined && data["__conveyor_api_array__"].length > 0) {
    data.resp = data["__conveyor_api_array__"][0];
} else if (data["0"] != undefined) {
    if (is_array(data["0"])) {
        data.resp = data["0"][0];
    } else
    data.resp = data["0"];
}

if (data.detailInfo != undefined) {
    data.resp.detailInfo = data.detailInfo;
}


data.analis = "UPLIMINS";

/****************START*******************/

data.res_predict={};

data.res_predict.RES_PREDICT_LIMIT = [];
data.res_predict.RES_PREDICT_LIMIT_TYPE = [];

data.res_predict.RES_PREDICT_CODE = [];
data.res_predict.RES_PREDICT_CODE_TYPE = [];
data.res_predict.RES_PREDICT_CODE_TYPE_VIP = [];

if (Object.keys(data.resp).length > 0 && data.resp.res=="ok") {
    if (data.analis == "UPLIMINS") {

        data.DATA_CASHPAYMENTS_LIMIT = Number(data.resp.newlimit);
        data.DATA_CASHPAYMENTS_TYPE = data.resp.cardgroup;
        data.RES_CLIENT_INSURANCE = data.resp.insurance;
        data.DATA_CASHPAYMENTS_LIMIT = Number(data.resp.newlimit);
        data.DATA_CASHPAYMENTS_TYPE = data.resp.cardgroup;
        data.RES_CLIENT_INSURANCE = data.resp.insurance;
        data.LIMIT_CLIENT_CODE = data.resp.code;
        data.LIMIT_CLIENT_F_NREF = data.resp.f_nref;
        data.LIMIT_CLIENT_RES = data.resp.res;
        data.LIMIT_CLIENT_F_NCLIENT = data.resp.f_nclient;
        data.LIMIT_CLIENT_MAXLIMGRAN = Number(data.resp.MaxLimGran);
        data.LIMIT_CLIENT_NEWLIMIT = Number(data.resp.newlimit);

        /*исключение для SCORINCOME для не а-банка*/
        if (data.DATA_CASHPAYMENTS_TYPE == "SCORINCOME" && data.PROD_CHAR_BANK != "AB") {
            data.DATA_CASHPAYMENTS_TYPE = "";
            data.DATA_CASHPAYMENTS_LIMIT = 0;
        }

        if (data.resp.detailInfo != undefined && data.resp.detailInfo.calcGroupsList != undefined){
            for (var i=0;i<data.resp.detailInfo.calcGroupsList.length;i++){
                data.res_predict.RES_PREDICT_LIMIT.push(Number(data.resp.detailInfo.calcGroupsList[i].newlimit_cutProduct));
                var cardg = data.resp.detailInfo.calcGroupsList[i].cardgroup;
                if (cardg != undefined ) cardg = cardg.trim();
                data.res_predict.RES_PREDICT_LIMIT_TYPE.push(cardg);
            }
        }

        if (data.resp.detailInfo != undefined && data.resp.detailInfo.limitSizeRestrictReasons != undefined){
            for (var i=0;i<data.resp.detailInfo.limitSizeRestrictReasons.length;i++){
                data.res_predict.RES_PREDICT_CODE.push(data.resp.detailInfo.limitSizeRestrictReasons[i].id_type);
                data.res_predict.RES_PREDICT_CODE_TYPE.push(data.resp.detailInfo.limitSizeRestrictReasons[i].WAVE);
                data.res_predict.RES_PREDICT_CODE_TYPE_VIP.push(data.resp.detailInfo.limitSizeRestrictReasons[i].WaveVip);
            }
        }

    }
    else if (data.analis == "NORISK") {
        data.DATA_TRELCLIENTS_FACH_LIM24 = Number(data.resp.cashlim);
    }
}


delete data.resp;
if (data["__conveyor_api_array__"] != undefined){
    delete  data["__conveyor_api_array__"];
}
if (data["0"] != undefined){
    delete  data["0"];
}
/****************END*******************/

console.log(data);