
if (data.hist != undefined) {
    for (var i = 0; i < data.hist.length; i++) {
        if (['UNIPACKSAS','CARDSET','REISSUE','UPLIMNKK'].indexOf(data.hist[i].charType) != -1) {
            if (data.hist[i].name == 'RES_DEC_REAS_FINAL_CODE_PRE') {
                data.RES_DEC_REAS_FINAL_CODE_PRE = data.hist[i].value;
            }
            if (data.hist[i].name == 'RES_DEC_REAS_FINAL_CODE_FIN') {
                data.RES_DEC_REAS_FINAL_CODE_FIN = data.hist[i].value;
            }
            if (data.hist[i].name == 'RES_INSURANCE_TAKEN') {
                data.RES_INSURANCE_TAKEN = data.hist[i].value;
            }
            if (data.hist[i].name == 'RES_MR_TAKEN') {
                data.RES_MR_TAKEN = data.hist[i].value;
            }
            if (data.hist[i].name == 'RES_LIMIT_CLIENT_F_NCLIENT') {
                data.RES_LIMIT_CLIENT_F_NCLIENT = data.hist[i].value;
            }
            if (data.hist[i].name == 'PROD_APP_CODE_COMMENT_KC') {
                data.PROD_APP_CODE_COMMENT_KC = data.hist[i].value;
            }
        }
    }

}