// JavaScript Document

//---------------Payment_Excludes---------
/*if (
    (data.PROD_CHAR_CORPORATION == '190' && (data.PROD_SCHEME_LOANPURPOSE == 'R1'|| data.PROD_SCHEME_LOANPURPOSE == 'R2')) ||
    (data.PROD_SCHEME_OTCNUMBER == '1966' && data.PROD_SCHEME_LOANPURPOSE == 'RU') ||
    data.PROD_SCHEME_OTCNUMBER == '2222' ||
    data.PROD_SCHEME_OTCNUMBER == '2493'
)
{
    paymentExclud = 'True'
}
else {
    paymentExclud = 'False'
}*/

//----------------Risk_Prod-------------
if (data.LOCAL_TYPE_PURPOSE == 'MOB' || data.LOCAL_TYPE_PURPOSE == 'DORS' || data.LOCAL_TYPE_PURPOSE == 'NOUTE' || data.LOCAL_TYPE_PURPOSE == 'WINDOW') {/*data.LOCAL_TYPE_PURPOSE == 'SMARTPHN'*/
    riskProd = 'Y';
}
else {
    riskProd = 'N';
}

//----------------CORP_AB-------------

var corpAB = new Array("255","259","260","261","265","266");

if (corpAB.indexOf(data.PROD_CHAR_CORPORATION) != 0) {
    CORP_AB = 'True';
}
else {
    CORP_AB = 'False';
}


/* new model
if (riskProd == 'Y'){
    if (CORP_AB == 'True'){
        switch(true) {
            case (data.RES_SCCARD_SCORE_1<0.03): data.typeFistPaym = '0-0'; break;
            case (data.RES_SCCARD_SCORE_1>=0.03 && data.RES_SCCARD_SCORE_1<0.05):  data.typeFistPaym = '0-10'; break;
            case (data.RES_SCCARD_SCORE_1>=0.05 && data.RES_SCCARD_SCORE_1<0.062):  data.typeFistPaym = '10-10'; break;
            case (data.RES_SCCARD_SCORE_1>=0.062 && data.RES_SCCARD_SCORE_1<0.08):  data.typeFistPaym = '10-20'; break;
            case (data.RES_SCCARD_SCORE_1>=0.08 && data.RES_SCCARD_SCORE_1<0.172):  data.typeFistPaym = '20-20'; break;
            case (data.RES_SCCARD_SCORE_1>=0.172 ): data.typeFistPaym = '10-20'; break;
            default: data.typeFistPaym = '10-20'; break;
        }
    }
    else{
        switch(true) {
            case (data.RES_SCCARD_SCORE_1<0.03): data.typeFistPaym = '0-0'; break;
            case (data.RES_SCCARD_SCORE_1>=0.03 && data.RES_SCCARD_SCORE_1<0.036):  data.typeFistPaym = '0-10'; break;
            case (data.RES_SCCARD_SCORE_1>=0.036 && data.RES_SCCARD_SCORE_1<0.042):  data.typeFistPaym = '0-20'; break;
            case (data.RES_SCCARD_SCORE_1>=0.042 && data.RES_SCCARD_SCORE_1<0.062):  data.typeFistPaym = '10-20'; break;
            case (data.RES_SCCARD_SCORE_1>=0.062 && data.RES_SCCARD_SCORE_1<0.08):  data.typeFistPaym = '10-30'; break;
            case (data.RES_SCCARD_SCORE_1>=0.08 && data.RES_SCCARD_SCORE_1<0.172):  data.typeFistPaym = '20-30'; break;
            case (data.RES_SCCARD_SCORE_1>=0.172 ): data.typeFistPaym = '20-30'; break;
            default: data.typeFistPaym = '20-30'; break;
        }
    }
}
else{
    switch(true) {
        case (data.RES_SCCARD_SCORE_1<0.042): data.typeFistPaym = '0-0'; break;
        case (data.RES_SCCARD_SCORE_1>=0.042 && data.RES_SCCARD_SCORE_1<0.062):  data.typeFistPaym = '0-10'; break;
        case (data.RES_SCCARD_SCORE_1>=0.062 && data.RES_SCCARD_SCORE_1<0.108):  data.typeFistPaym = '10-20'; break;
        case (data.RES_SCCARD_SCORE_1>=0.108 && data.RES_SCCARD_SCORE_1<0.172):  data.typeFistPaym = '20-20'; break;
        case (data.RES_SCCARD_SCORE_1>=0.172 ): data.typeFistPaym = '10-20'; break;
        default: data.typeFistPaym = '10-20'; break;
    }
}
*/


if (paymentExclud == 'True') {
    data.typeFistPaym = '0-0'
}
else {
    if (data.PROD_CHAR_BANK == 'PB') {
        if (riskProd == 'Y') {
            switch(true) {
                case (data.RES_SCCARD_SCORE_1<=271):                                  data.typeFistPaym = '20-40'; break;
                case (data.RES_SCCARD_SCORE_1>=272 && data.RES_SCCARD_SCORE_1<=319):  data.typeFistPaym = '10-20'; break;
                case (data.RES_SCCARD_SCORE_1>=320 && data.RES_SCCARD_SCORE_1<=365):  data.typeFistPaym = '0-10'; break;
                case (data.RES_SCCARD_SCORE_1>=366 ):                                 data.typeFistPaym = '0-0'; break;
                default: data.typeFistPaym = '20-40'; break;
            }
        }
        else {
            switch(true) {
                case (data.RES_SCCARD_SCORE_1<=271):                                  data.typeFistPaym = '20-40'; break;
                case (data.RES_SCCARD_SCORE_1>=272 && data.RES_SCCARD_SCORE_1<=319):  data.typeFistPaym = '0-10'; break;
                case (data.RES_SCCARD_SCORE_1>=320 && data.RES_SCCARD_SCORE_1<=365):  data.typeFistPaym = '0-0'; break;
                case (data.RES_SCCARD_SCORE_1>=366 ):                                 data.typeFistPaym = '0-0'; break;
                default: data.typeFistPaym = '20-40'; break;
            }
        }
    }
    if (data.PROD_CHAR_BANK == 'AB') {
        if (riskProd == 'Y') {
            if (CORP_AB == 'True') {
                switch(true) {
                    case (data.RES_SCCARD_SCORE_1<=193):                                  data.typeFistPaym = '10-20'; break;
                    case (data.RES_SCCARD_SCORE_1>=194 && data.RES_SCCARD_SCORE_1<=241):  data.typeFistPaym = '0-10'; break;
                    case (data.RES_SCCARD_SCORE_1>=242 && data.RES_SCCARD_SCORE_1<=283):  data.typeFistPaym = '0-10'; break;
                    case (data.RES_SCCARD_SCORE_1>=284 ):                                 data.typeFistPaym = '0-0'; break;
                    default: data.typeFistPaym = '10-20'; break;
                }
            }
            else {
                switch(true) {
                    case (data.RES_SCCARD_SCORE_1<=193):                                  data.typeFistPaym = '20-30'; break;
                    case (data.RES_SCCARD_SCORE_1>=194 && data.RES_SCCARD_SCORE_1<=241):  data.typeFistPaym = '0-20'; break;
                    case (data.RES_SCCARD_SCORE_1>=242 && data.RES_SCCARD_SCORE_1<=283):  data.typeFistPaym = '0-10'; break;
                    case (data.RES_SCCARD_SCORE_1>=284 ):                                 data.typeFistPaym = '0-0'; break;
                    default: data.typeFistPaym = '20-30'; break;
                }
            }
        }
        else {
            if (CORP_AB == 'True') {
                switch(true) {
                    case (data.RES_SCCARD_SCORE_1<=193):                                  data.typeFistPaym = '10-20'; break;
                    case (data.RES_SCCARD_SCORE_1>=194 && data.RES_SCCARD_SCORE_1<=241):  data.typeFistPaym = '0-10'; break;
                    case (data.RES_SCCARD_SCORE_1>=242 && data.RES_SCCARD_SCORE_1<=283):  data.typeFistPaym = '0-0'; break;
                    case (data.RES_SCCARD_SCORE_1>=284 ):                                 data.typeFistPaym = '0-0'; break;
                    default: data.typeFistPaym = '10-20'; break;
                }
            }
            else {
                switch(true) {
                    case (data.RES_SCCARD_SCORE_1<=193):                                  data.typeFistPaym = '10-20'; break;
                    case (data.RES_SCCARD_SCORE_1>=194 && data.RES_SCCARD_SCORE_1<=241):  data.typeFistPaym = '0-10'; break;
                    case (data.RES_SCCARD_SCORE_1>=242 && data.RES_SCCARD_SCORE_1<=283):  data.typeFistPaym = '0-10'; break;
                    case (data.RES_SCCARD_SCORE_1>=284 ):                                 data.typeFistPaym = '0-0'; break;
                    default: data.typeFistPaym = '10-20'; break;
                }
            }
        }
    }
    else {
        data.typeFistPaym = '0-0';
    }
}
