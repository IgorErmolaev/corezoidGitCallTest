var balYBCH =0;
if (data.PROD_CHAR_BANK== 'PB' && (data.THE_RIP == 'N' || data.THE_RIP ==undefined)){
    if (data.BCH_YBCH_SCORE == null || data.BCH_YBCH_SCORE <= 0){
        balYBCH = 432.26;
    }
    else {
        balYBCH = data.BCH_YBCH_SCORE;
    }
    if (data.RES_SCCARD_SCORE_VK == undefined || data.RES_SCCARD_SCORE_VK < 0){
        data.RES_SCCARD_SCORE_VK = 816.23;
    }

    data.RES_SCCARD_TOTAL_SCORE = -705.61 + 0.72766 * data.RES_SCCARD_SCORE_1 + 0.94207 * balYBCH + 0.66044 * data.RES_SCCARD_SCORE_VK;
}

else {
/*    if (data.PROD_CHAR_BANK== 'AB' || data.THE_RIP == 'Y' ){
        if (data.BCH_YBCH_SCORE == null || data.BCH_YBCH_SCORE <= 0 || data.BCH_YBCH_SCORE == undefined){
            balYBCH =  419.1718;
        }
        else {
            balYBCH = data.BCH_YBCH_SCORE;
        }
        var tmp;
        tmp = data.RES_SCCARD_SCORE_1* 0.00875 + data.RES_SCCARD_SCORE_VK*0.00792 + data.RES_SCCARD_SCORE_MV*0.00912 + data.RES_SCCARD_SCORE_BS*0.00546 + balYBCH*0.00761 - 24.9674;
        data.RES_SCCARD_TOTAL_SCORE = 1/(1 + Math.exp(-tmp));
        data.RES_SCCARD_TOTAL_SCORE = data.RES_SCCARD_TOTAL_SCORE*1000;
    }
    else {*/
        data.RES_SCCARD_SCORE_1 = parseFloat(data.RES_SCCARD_SCORE_1);
        data.RES_SCCARD_TOTAL_SCORE = data.RES_SCCARD_SCORE_1;
    /*}*/
}

data.nodeName = 'TotalScoring';