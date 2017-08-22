
if (Object.keys(data.resp).length > 0 && data.resp.res=="ok"){
    if (data.analis == "UPLIMINS" || data.analis == "UPLIMITNEW" ) {

        if (data.DATA_CASHPAYMENTS_LIMIT < Number(data.resp.newlimit)){
            data.DATA_CASHPAYMENTS_LIMIT = Number(data.resp.newlimit);
            data.DATA_CASHPAYMENTS_TYPE = data.resp.cardgroup;
        }


        if (data.resp.detailInfo != undefined && data.resp.detailInfo.calcGroupsList != undefined){
            for (var i=0;i<data.resp.detailInfo.calcGroupsList.length;i++){
                var cardg = data.resp.detailInfo.calcGroupsList[i].cardgroup;
                if (cardg != undefined ) cardg = cardg.trim();
                if (data.res_predict.RES_PREDICT_LIMIT_TYPE.indexOf(cardg) == -1){
                    data.res_predict.RES_PREDICT_LIMIT.push(Number(data.resp.detailInfo.calcGroupsList[i].newlimit_cutProduct));
                    data.res_predict.RES_PREDICT_LIMIT_TYPE.push(cardg);
                }
            }
        }

        if (data.resp.detailInfo != undefined && data.resp.detailInfo.limitSizeRestrictReasons != undefined){
            for (var i=0;i<data.resp.detailInfo.limitSizeRestrictReasons.length;i++){
                if (data.res_predict.RES_PREDICT_CODE.indexOf(data.resp.detailInfo.limitSizeRestrictReasons[i].id_type) ==-1){
                    data.res_predict.RES_PREDICT_CODE.push(data.resp.detailInfo.limitSizeRestrictReasons[i].id_type);
                    data.res_predict.RES_PREDICT_CODE_TYPE.push(data.resp.detailInfo.limitSizeRestrictReasons[i].WAVE);
                    data.res_predict.RES_PREDICT_CODE_TYPE_VIP.push(data.resp.detailInfo.limitSizeRestrictReasons[i].WaveVip);
                }

            }
        }

    }
    else if (data.analis == "NORISK") {
        data.DATA_TRELCLIENTS_FACH_LIM24 = Math.max(Number(data.resp.cashlim),data.DATA_TRELCLIENTS_FACH_LIM24);
    }
}


