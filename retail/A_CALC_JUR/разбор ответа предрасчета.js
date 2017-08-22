
if (data.RES_PREDICT == undefined){
    data.RES_PREDICT = [];
}

if (data.res_predict != undefined) {
    var ln = data.RES_PREDICT.length;
    data.RES_PREDICT.push({});

    data.RES_PREDICT[ln].CUST_ID = data.clientID;
    data.RES_PREDICT[ln].CODE = data.res_predict.RES_PREDICT_CODE;
    data.RES_PREDICT[ln].CODE_TYPE = data.res_predict.RES_PREDICT_CODE_TYPE;
    data.RES_PREDICT[ln].LIMIT = data.res_predict.RES_PREDICT_LIMIT;
    data.RES_PREDICT[ln].LIMIT_TYPE = data.res_predict.RES_PREDICT_LIMIT_TYPE;
}
delete data.res_predict;