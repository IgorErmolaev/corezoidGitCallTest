

//------------------------------------------------RES_BI--------

data.RES_BI = 'N';
data.RES_CUST_NEED_CALL = 'N';


if (data.RES_DEC_CATEGORY == 'DECLINE') {
    data.RES_BI = 'D';
}

//---------------------------RES.CHAR_PLAT_MIN-----

data.RES_CHAR_PLAT_MIN = data.PROD_CHAR_PAYMONTH;

//-----------------------------------------------------
data.RES_MAX_MID_PAY = 0;
if (data.BCH_CRED != undefined){
    for (var i = 0; i < data.BCH_CRED.length; i++) {
        if (data.BCH_CRED[i].CUST_ID == data.APP_CUST_ID_JUR && data.BCH_CRED[i].MAX_MID_PAY != undefined){
            data.RES_MAX_MID_PAY = data.BCH_CRED[i].MAX_MID_PAY;
            break;
        }
    }
}

//-----------------------------------------------------

data.RES_ADD_CONDITIONS = '';
if (data.RES_DEC_CATEGORY != 'DECLINE') {
    /*наличие ЖНКИ менее 500грн*/
    if (data.BCH_CRED != undefined) {
        for (var i = 0; i < data.BCH_CRED.length; i++) {
            if (data.BCH_CRED[i].DLCRED < 500 && data.BCH_CRED[i].OWN_PROS_YBCH == 'Y') {
                data.RES_ADD_CONDITIONS = 'За умови погашення поточної заборгованості по виданим кредитам ' ;
                if (data.APP_CUST_ID_JUR == data.BCH_CRED[i].CUST_ID){
                    data.RES_ADD_CONDITIONS += 'ОКПО: ' + data.APP_CUST_INN + '; ';
                }
                else {
                    for (var j=0; j< data.APP_LINK.length; j++){
                        if (data.BCH_CRED[i].CUST_ID == data.APP_LINK[j].CUST_ID){
                            data.RES_ADD_CONDITIONS += 'ПІП: '+ data.APP_LINK[j].CUST_SURNAME + ' '+ data.APP_LINK[j].CUST_NAME + ' ' + data.APP_LINK[j].CUST_PATRONYMIC + ', ІНН: ' + data.APP_LINK[j].CUST_INN +  '; ';
                        }
                    }

                }
                data.RES_ADD_CONDITIONS +=  data.RES_ADD_CONDITIONS;

            }
            if (data.BCH_CRED[i].DLCRED < 50 && data.BCH_CRED[i].NOOWN_PROS_YBCH == 'Y') {
                data.RES_ADD_CONDITIONS = 'За умови надання довідки із банку про відсутність простроченої заборгованості за договором в іншому банку ' ;
                if (data.APP_CUST_ID_JUR == data.BCH_CRED[i].CUST_ID){
                    data.RES_ADD_CONDITIONS += 'ОКПО: ' + data.APP_CUST_INN + '; ';
                }
                else {
                    for (var j=0; j< data.APP_LINK.length; j++){
                        if (data.BCH_CRED[i].CUST_ID == data.APP_LINK[j].CUST_ID){
                            data.RES_ADD_CONDITIONS += 'ІНН: ' + data.APP_LINK[j].CUST_INN +  '; ';
                        }
                    }

                }
                data.RES_ADD_CONDITIONS +=  data.RES_ADD_CONDITIONS;
            }
        }

    }
}




