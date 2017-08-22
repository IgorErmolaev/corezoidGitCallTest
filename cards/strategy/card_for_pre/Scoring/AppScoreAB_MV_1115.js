data.RES_SCCARD_NAME_MV = 'CC_ABMV_0116';

data.RES_SCCARD_SCORE_MV = 4.7577;

/*QTY_SHOP_TRAN - Количество трат в магазинах за 6-месяцев;*/
if (data.QTY_SHOP_TRAN > 3){
    data.RES_SCCARD_SCORE_MV+= -0.7505;
}
else {
    if (data.QTY_SHOP_TRAN > 0 && data.QTY_SHOP_TRAN <= 3){
        data.RES_SCCARD_SCORE_MV+= -0.0813;
    }
    else {
        if (data.QTY_SHOP_TRAN == 0){
            data.RES_SCCARD_SCORE_MV+= -0.0813;
        }
    }
}

/*QTY_LINK_TRAN - Количество расходов на транспорт и связь за 6 месяцев;*/
if (data.QTY_LINK_TRAN >0){
    data.RES_SCCARD_SCORE_MV+= -0.1354;
}
else {
    if (data.QTY_LINK_TRAN ==0){
        data.RES_SCCARD_SCORE_MV+= 0;
    }
}

/*QTY_PS_CASS - Кол-во оплат коммунальных услуг в кассе за 6 мес;*/
if (data.QTY_PS_CASS ==0){
    data.RES_SCCARD_SCORE_MV+= -0.5753;
}
else {
    if (data.QTY_PS_CASS ==1){
        data.RES_SCCARD_SCORE_MV+= -0.2138;
    }
    else {
        if (data.QTY_PS_CASS >1){
            data.RES_SCCARD_SCORE_MV+= 0;
        }
    }
}

/*FL_INSUR_NS - Наличие личного страхования у клиента;*/
if (data.FL_INSUR_NS == 1){
    data.RES_SCCARD_SCORE_MV+= -1.3552;
}
else {
    if (data.FL_INSUR_NS == 2){
        data.RES_SCCARD_SCORE_MV+=  -0.3719;
    }
    else {
        if (data.FL_INSUR_NS == 0){
            data.RES_SCCARD_SCORE_MV+= 0;
        }
    }
}

/*FL_KOPL - Признак копилка;*/
if (data.FL_KOPL == 2){
    data.RES_SCCARD_SCORE_MV+= -0.4183;
}
else {
    if (data.FL_KOPL == 1){
        data.RES_SCCARD_SCORE_MV+=  -0.2508;
    }
    else {
        if (data.FL_KOPL == 0){
            data.RES_SCCARD_SCORE_MV+= 0;
        }
    }
}

/*FL_DIR_UCH - Признак директор/учредитель юр. Лица;*/
if (data.FL_DIR_UCH == 'N'){
    data.RES_SCCARD_SCORE_MV+= -1.2048;
}
else {
    if (data.FL_DIR_UCH == 'Y'){
        data.RES_SCCARD_SCORE_MV+= 0;
    }
}

/*FL_P24 - Признак Приват24;*/
if (data.FL_P24 == 1){
    data.RES_SCCARD_SCORE_MV+= -0.7205;
}
else {
    if (data.FL_P24 == 0){
        data.RES_SCCARD_SCORE_MV+= -0.6828;
    }
    else {
        if (data.FL_P24 == 2){
            data.RES_SCCARD_SCORE_MV+= 0;
        }
    }
}

/*FL_Y_PH - Наличие желгото немобильного телефона;*/
if (data.FL_Y_PH == 'N'){
    data.RES_SCCARD_SCORE_MV+= -0.4311;
}
else {
    if (data.FL_Y_PH == 'Y'){
        data.RES_SCCARD_SCORE_MV+= 0;
    }
}

/*FL_G_MPH - Наличие зеленого мобильного телефона;*/
if (data.FL_G_MPH == 'Y'){
    data.RES_SCCARD_SCORE_MV+= -0.4356;
}
else {
    if (data.FL_G_MPH == 'N'){
        data.RES_SCCARD_SCORE_MV+= 0;
    }
}

data.RES_SCCARD_SCORE_MV = (data.RES_SCCARD_SCORE_MV*72.1347520444482 + 782.192809488736)  - 782.192809488736*Math.sqrt(9/16)/2;


if (
    data.QTY_SHOP_TRAN == null &&
    data.QTY_LINK_TRAN == null &&
    data.QTY_PS_CASS == null &&
    data.FL_INSUR_NS == null &&
    data.FL_KOPL == null &&
    data.FL_DIR_UCH == null &&
    data.FL_P24 == null &&
    data.FL_Y_PH == null &&
    data.FL_G_MPH == null
){
    data.RES_SCCARD_SCORE_MV = 628.3339;
}

data.nodeName = 'AppScoreAB_MV';









