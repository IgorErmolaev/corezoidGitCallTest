data.RES_SCCARD_NAME_BS = 'CC_ABBS_0116';

data.RES_SCCARD_SCORE_BS = 5.7541;

/*RAT_CLID_FAMST_DIV_TO_LINK_NEI - Отношение кол-ва клиентов с семейным положением "Разведен" к общему кол-ву связей типа "Сосед";*/
if (data.RAT_CLID_FAMST_DIV_TO_LINK_NEI == 0){
    data.RES_SCCARD_SCORE_BS += -0.5250;
}
else {
    if (data.RAT_CLID_FAMST_DIV_TO_LINK_NEI > 0 && data.RAT_CLID_FAMST_DIV_TO_LINK_NEI <= 0.113){
        data.RES_SCCARD_SCORE_BS += -0.2232;
    }
    else {
        if (data.RAT_CLID_FAMST_DIV_TO_LINK_NEI > 0.113 && data.RAT_CLID_FAMST_DIV_TO_LINK_NEI <= 0.113){
            data.RES_SCCARD_SCORE_BS += 0;
        }
        else {
            if (data.RAT_CLID_FAMST_DIV_TO_LINK_NEI == -1 || data.RAT_CLID_FAMST_DIV_TO_LINK_NEI== undefined){
                data.RES_SCCARD_SCORE_BS += -0.3263;
            }
        }
    }
}

/*RAT_CLID_H_EDU_TO_LINK_FAM - Доля клиентов с высшим образованием из связей типа "Знакомый";*/
if (data.RAT_CLID_H_EDU_TO_LINK_FAM == 0){
    data.RES_SCCARD_SCORE_BS += -0.6270;
}
else {
    if (data.RAT_CLID_H_EDU_TO_LINK_FAM > 0 && data.RAT_CLID_H_EDU_TO_LINK_FAM <= 0.12){
        data.RES_SCCARD_SCORE_BS += -0.2355;
    }
    else {
        if (data.RAT_CLID_H_EDU_TO_LINK_FAM > 0.12 && data.RAT_CLID_H_EDU_TO_LINK_FAM <= 0.17){
            data.RES_SCCARD_SCORE_BS += -0.1649;
        }
        else {
            if (data.RAT_CLID_H_EDU_TO_LINK_FAM > 0.17 && data.RAT_CLID_H_EDU_TO_LINK_FAM <= 0.19){
                data.RES_SCCARD_SCORE_BS += -0.1509;
            }
            else {
                if (data.RAT_CLID_H_EDU_TO_LINK_FAM > 0.19 && data.RAT_CLID_H_EDU_TO_LINK_FAM <= 0.29){
                    data.RES_SCCARD_SCORE_BS += -0.0429;
                }
                else {
                    if (data.RAT_CLID_H_EDU_TO_LINK_FAM > 0.29 ){
                        data.RES_SCCARD_SCORE_BS += 0;
                    }
                    else {
                        if (data.RAT_CLID_H_EDU_TO_LINK_FAM == -1 || data.RAT_CLID_H_EDU_TO_LINK_FAM == undefined ){
                            data.RES_SCCARD_SCORE_BS += -0.4917;
                        }
                    }
                }
            }
        }
    }
}

/*RAT_CLID_FAMST_MAR_TO_LINK_COHAB - Отношение кол-ва клиентов с семейным положением "Женат" к общему кол-ву связей типа "Сожитель";*/
if (data.RAT_CLID_FAMST_MAR_TO_LINK_COHAB == 0){
    data.RES_SCCARD_SCORE_BS += -0.2661;
}
else {
    if (data.RAT_CLID_FAMST_MAR_TO_LINK_COHAB > 0 && data.RAT_CLID_FAMST_MAR_TO_LINK_COHAB < 0.33){
        data.RES_SCCARD_SCORE_BS += -0.1568;
    }
    else {
        if (data.RAT_CLID_FAMST_MAR_TO_LINK_COHAB > 0.33 && data.RAT_CLID_FAMST_MAR_TO_LINK_COHAB < 0.51){
            data.RES_SCCARD_SCORE_BS += -0.0893;
        }
        else {
            if (data.RAT_CLID_FAMST_MAR_TO_LINK_COHAB > 0.51 ){
                data.RES_SCCARD_SCORE_BS += 0;
            }
            else {
                if (data.RAT_CLID_FAMST_MAR_TO_LINK_COHAB == -1 ||  data.RAT_CLID_FAMST_MAR_TO_LINK_COHAB == undefined){
                    data.RES_SCCARD_SCORE_BS += -0.7127;
                }
            }
        }
    }
}

/*RAT_CLID_AUTO_TO_LINK_ALL - Отношение клиентов с авто к общему кол-ву связей по клиенту;*/
if (data.RAT_CLID_AUTO_TO_LINK_ALL == 0){
    data.RES_SCCARD_SCORE_BS += -0.7229;
}
else {
    if (data.RAT_CLID_AUTO_TO_LINK_ALL > 0 && data.RAT_CLID_AUTO_TO_LINK_ALL<=0.05){
        data.RES_SCCARD_SCORE_BS += -0.6854;
    }
    else {
        if (data.RAT_CLID_AUTO_TO_LINK_ALL > 0.05 && data.RAT_CLID_AUTO_TO_LINK_ALL<=0.08){
            data.RES_SCCARD_SCORE_BS += -0.5981;
        }
        else {
            if (data.RAT_CLID_AUTO_TO_LINK_ALL > 0.08 && data.RAT_CLID_AUTO_TO_LINK_ALL<=0.11){
                data.RES_SCCARD_SCORE_BS += -0.5030;
            }
            else {
                if (data.RAT_CLID_AUTO_TO_LINK_ALL > 0.11 && data.RAT_CLID_AUTO_TO_LINK_ALL<=0.13){
                    data.RES_SCCARD_SCORE_BS += -0.3008;
                }
                else {
                    if (data.RAT_CLID_AUTO_TO_LINK_ALL > 0.13 ){
                        data.RES_SCCARD_SCORE_BS += 0;
                    }
                }
            }
        }
    }
}

/*RAT_CLID_H_EDU_TO_LINK_NEI - Доля клиентов с высшим образованием из связей типа "Сосед" ;*/
if (data.RAT_CLID_H_EDU_TO_LINK_NEI == 0){
    data.RES_SCCARD_SCORE_BS += -0.3662;
}
else {
    if (data.RAT_CLID_H_EDU_TO_LINK_NEI > 0 && data.RAT_CLID_H_EDU_TO_LINK_NEI <=0.16){
        data.RES_SCCARD_SCORE_BS += -0.2227;
    }
    else {
        if (data.RAT_CLID_H_EDU_TO_LINK_NEI > 0.16){
            data.RES_SCCARD_SCORE_BS += 0;
        }
        else {
            if (data.RAT_CLID_H_EDU_TO_LINK_NEI == -1 || data.RAT_CLID_H_EDU_TO_LINK_NEI == undefined){
                data.RES_SCCARD_SCORE_BS += -0.1054;
            }
        }
    }
}

/*RAT_LINK_FAM_TO_LINK_DRFO - Отношение кол-ва связей "Знакомый" к кол-ву связей из ДРФО ;*/
if (data.RAT_LINK_FAM_TO_LINK_DRFO ==-1 || data.RAT_LINK_FAM_TO_LINK_DRFO == undefined){
    data.RES_SCCARD_SCORE_BS += -0.8372;
}
else {
    if (data.RAT_LINK_FAM_TO_LINK_DRFO == 0){
        data.RES_SCCARD_SCORE_BS += -0.3311;
    }
    else {
        if (data.RAT_LINK_FAM_TO_LINK_DRFO > 0 && data.RAT_LINK_FAM_TO_LINK_DRFO<=0.91){
            data.RES_SCCARD_SCORE_BS += -0.1676;
        }
        else {
            if (data.RAT_LINK_FAM_TO_LINK_DRFO > 0.91 ){
                data.RES_SCCARD_SCORE_BS += 0;
            }
        }
    }
}

/*RAT_CLID_BAD90_TO_LINK_COHAB - Доля проблемных клиентов 90+ из числа связей типа "Сожитель" ;*/
if (data.RAT_CLID_BAD90_TO_LINK_COHAB > 0.51){
    data.RES_SCCARD_SCORE_BS += -0.7675;
}
else {
    if (data.RAT_CLID_BAD90_TO_LINK_COHAB > 0.34 && data.RAT_CLID_BAD90_TO_LINK_COHAB <=0.51){
        data.RES_SCCARD_SCORE_BS += -0.6560;
    }
    else {
        if (data.RAT_CLID_BAD90_TO_LINK_COHAB > 0.21 && data.RAT_CLID_BAD90_TO_LINK_COHAB <=0.34){
            data.RES_SCCARD_SCORE_BS += -0.5695;
        }
        else {
            if (data.RAT_CLID_BAD90_TO_LINK_COHAB > 0 && data.RAT_CLID_BAD90_TO_LINK_COHAB <=0.21){
                data.RES_SCCARD_SCORE_BS += -0.4989;
            }
            else {
                if (data.RAT_CLID_BAD90_TO_LINK_COHAB == -1 || data.RAT_CLID_BAD90_TO_LINK_COHAB== undefined){
                    data.RES_SCCARD_SCORE_BS += 0;
                }
            }
        }
    }
}

/*QTY_LINK_PHONE - Кол-во связей типа "Телефонная" ;*/
if (data.QTY_LINK_PHONE == 0){
    data.RES_SCCARD_SCORE_BS += -1.4790;
}
else {
    if (data.QTY_LINK_PHONE == 1){
        data.RES_SCCARD_SCORE_BS += -0.4779;
    }
    else {
        if (data.QTY_LINK_PHONE > 1){
            data.RES_SCCARD_SCORE_BS += 0;
        }
    }
}

/*RAT_CLID_H_EDU_TO_LINK_COHAB - Доля клиентов с высшим образованием из связей типа "Сожитель";*/
if (data.RAT_CLID_H_EDU_TO_LINK_COHAB == 0){
    data.RES_SCCARD_SCORE_BS += -0.7485;
}
else {
    if (data.RAT_CLID_H_EDU_TO_LINK_COHAB > 0 && data.RAT_CLID_H_EDU_TO_LINK_COHAB <= 0.035){
        data.RES_SCCARD_SCORE_BS += -0.2445;
    }
    else {
        if (data.RAT_CLID_H_EDU_TO_LINK_COHAB > 0.035 && data.RAT_CLID_H_EDU_TO_LINK_COHAB <= 0.09){
            data.RES_SCCARD_SCORE_BS += -0.1048;
        }
        else {
            if (data.RAT_CLID_H_EDU_TO_LINK_COHAB > 0.09){
                data.RES_SCCARD_SCORE_BS += 0;
            }
        }
    }
}


data.RES_SCCARD_SCORE_BS = (data.RES_SCCARD_SCORE_BS*72.1347520444482 + 782.192809488736) - 782.192809488736*Math.sqrt(9/16)/2;

if (
    data.RAT_CLID_FAMST_DIV_TO_LINK_NEI == null &&
    data.RAT_CLID_H_EDU_TO_LINK_FAM == null &&
    data.RAT_CLID_FAMST_MAR_TO_LINK_COHAB == null &&
    data.RAT_CLID_AUTO_TO_LINK_ALL == null &&
    data.RAT_CLID_H_EDU_TO_LINK_NEI == null &&
    data.RAT_LINK_FAM_TO_LINK_DRFO == null &&
    data.RAT_CLID_BAD90_TO_LINK_COHAB == null &&
    data.RAT_CLID_H_EDU_TO_LINK_COHAB == null &&
    data.QTY_LINK_PHONE == null
){
    data.RES_SCCARD_SCORE_BS = 628.9385;
}

data.nodeName = 'AppScoreAB_BS';



