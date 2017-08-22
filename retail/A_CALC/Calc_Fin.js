var fs = require('fs');
var json = fs.readFileSync(__dirname+'//calc_fin.json').toString();
var data = JSON.parse(json).data;

/*****************************START*********************************/

/*data.COMMENT = "Стратегия: срок:" + data.RES_SCHEME_TERM + ",  стоимость:" + data.APP_PROPERTY_CAR_VALUE_EXT + ", сумма аванса: " + data.RES_OFFER1_FIRST_PAYM;*/

//-------------------------------------RISK_GROUP-------------------------

if (data.RES_TYPE_CUST == 'INTERN') {
    switch (data.LOCAL_CRED_HISTORY)
    {
        case 'POSITIVE' : data.RES_RISK_GROUP = 'LOW'; break;
        case 'MEDIUM': data.RES_RISK_GROUP = 'MEDIUM'; break;
        default: data.RES_RISK_GROUP = 'HIGH'; break;
    }
}
else {
    if (data.LOCAL_CRED_HISTORY == 'POSITIVE') {
        data.RES_RISK_GROUP = 'MEDIUM';
    }
    else {
        data.RES_RISK_GROUP = 'HIGH';
    }
}

//---------------------------------------Fraud flag------

var FRAUD_EXCLUDES;

if (data.RES_DEBCARD_P_SRED>1000 || data.RES_DEBCARD_Z_SRED>1000 || data.RES_DEPOZIT_TOTAL>5000) {
    FRAUD_EXCLUDES = 'TRUE';
}
else {
    FRAUD_EXCLUDES = 'FALSE';
}

if (data.FRAUD_DEC_FINAL_FLOW == 'REFER' && FRAUD_EXCLUDES == 'TRUE') {
    data.FRAUD_DEC_FINAL_FLOW = 'ACCEPT';
}

if (data.FRAUD_DEC_FINAL_FLOW == 'DECLINE' && data.RES_TYPE_CUST == 'INTERN') {
    data.FRAUD_DEC_FINAL_FLOW = 'REFER';
}

//------------------------------------------------RES_BI--------

data.RES_BI = 'N';
data.RES_CUST_NEED_CALL = 'N';

//if (data.RES_DEC_CATEGORY != 'DECLINE') {
//  if (data.RES_LIMIT_ITOG_TYPE == 'VNESH' || data.RES_LIMIT_ITOG_TYPE =='NEW') {
//    data.RES_CUST_NEED_CALL = 'Y';
//    data.RES_BI = 'O';
//  }
//}

if (data.RES_DEC_CATEGORY == 'DECLINE') {
    data.RES_BI = 'D';
}

//------------------------------------------Dialog type-----

if (data.RES_CUST_NEED_CALL == 'Y') {
    data.RES_CALL_DIALOGE_TYPE = 'NORMAL';
}
//---------------------------RES.CHAR_PLAT_MIN-----

data.RES_CHAR_PLAT_MIN = data.PROD_CHAR_PAYMONTH;

//---------------------------------------------------

data.RES_ADD_CONDITIONS = '';

if (data.RES_DEC_CATEGORY != 'DECLINE') {
    if (data.LOCAL_BODY_DELINQUENCY !=0 && (data.LOCAL_BODY_DELINQUENCY + data.LOCAL_PRC_DELINQUENCY)<=500 && (data.LOCAL_BODY_DELINQUENCY + data.LOCAL_PRC_DELINQUENCY)>=50 ) {
        data.RES_ADD_CONDITIONS = 'Погасіть поточну заборгованість;';
    }
    /*if (data.RES_OFFER1_FIRST_PAYM > data.PROD_CHAR_ADVANCEAMOUNT_EXT) {
        data.RES_ADD_CONDITIONS = 'Повысить аванс на ' + (data.RES_OFFER1_FIRST_PAYM-data.PROD_CHAR_ADVANCEAMOUNT_EXT) + 'грн;' + data.RES_ADD_CONDITIONS;
    }*/

    //Создаем список референсов с жестко-негативной кредитной историей
    if (data.HDNegRefsUBKI != undefined) {
        var hdNegRef = ' ';
        for (var w = 0; w < data.HDNegRefsUBKI.length; w++) {
            if (data.HDNegRefsUBKI.length > 1 && w > 0) hdNegRef+=', ';
            hdNegRef += "№ " + data.HDNegRefsUBKI[w] + ' ';
        }
    }
    if (data.RES_DEC_REAS_CODE_TABLE != undefined && data.RES_DEC_REAS_CODE_TABLE.indexOf('D511')!=-1 ) {
        data.RES_ADD_CONDITIONS = 'За умови погашення поточної заборгованості за договором' + hdNegRef;
    }
}

//---------------------Doc need--------------

for (var i=0; i<data.DOC_IDENT.length; i++) {
    if (data.DOC_IDENT[i].CUST_ID == data.APP_CUST_ID &&
        (data.DOC_IDENT[i].TYPE == undefined || data.DOC_IDENT[i].COUNTRY == undefined || data.DOC_IDENT[i].DATESTART == undefined)

    )
    {
        data.RES_DOC_NEED = '1;';
    }
}

if (data.RES_LIMIT_ITOG_TYPE != 'REL') {
    if (data.RES_HAS_INC_CONF =='N') {
        if (
            (data.RES_DEBCARD_ZP =='Y' && data.RES_TERMS_MIN_1ST_PAYM <20 && data.RES_DEBCARD_Z_SRED<data.APP_INCOME_MONTHSALARY_EXT) ||
            (data.APP_INCOME_MONTHSALARY !=0 && data.APP_INCOME_MONTHSALARY_EXT>2*data.APP_INCOME_MONTHSALARY)
        )
        {
            data.RES_DOC_NEED = data.RES_DOC_NEED + '2;';
        }
    }
}


//-----------------------------------------------

if (data.APP_CUST_ID == 24977296){
    data.RES_ADD_CONDITIONS = 'За умови погашення поточної заборгованості по іншим кредитам; '  + data.RES_ADD_CONDITIONS;
    data.RES_DEC_CATEGORY = 'ACCEPT';
    data.RES_BI = 'N';
}



/***********************END**********************/
console.log(data.RES_ADD_CONDITIONS);