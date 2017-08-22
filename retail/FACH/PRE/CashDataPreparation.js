// JavaScript Document
function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

var day_d;
for (var i=0; i<data.DATA_CRED.length; i++){
    if (data.DATA_CRED[i].DLP!= undefined) {
        data.DATA_CRED[i].DLP = data.DATA_CRED[i].DLP.trim();
    }
}

data.PROD_PACK_TYPE = 'FACH';


data.LOCAL_COUNT_ACTIVE_CREDITS = 0;
data.LOCAL_COUNT_2_MONTH_CRED = 0;
data.LOCAL_CRED_CARD_NO_PAYM='N';
data.LOCAL_OPEN_PEACH='N';
data.LOCAL_DONBASS_EXCLUDES = 'N';
data.LOCAL_BLOKPO = 'N';
data.cash_amnisty  = 'N';

if (data.DATA_CRED != undefined) {

    /*------------------------------COUNT ACTIVE CREDITS-----------------------------------------------------*/
    for (var i=0; i< data.DATA_CRED.length; i++){
        if (data.DATA_CRED[i].STATE == 'O' || data.DATA_CRED[i].STATE == 'L' || data.DATA_CRED[i].STATE =='R' || data.DATA_CRED[i].STATE == 'A' || data.DATA_CRED[i].STATE == 'D'){
            if (data.DATA_CRED[i].DLP == '' && data.DATA_CRED[i].TYPE != 'CRCR' && data.DATA_CRED[i].TYPE != 'CRCP'){
                if (Math.abs(data.DATA_CRED[i].BAL) != 0){
                    data.LOCAL_COUNT_ACTIVE_CREDITS ++;
                }
            }
            else {
                if (data.DATA_CRED[i].START_SUMM !== 0){
                    if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100 > 20){
                        data.LOCAL_COUNT_ACTIVE_CREDITS ++;
                    }
                }
            }
        }
    }

    /*---------------------------------COUNT ACTIVE CREDITS 3 months-----------------------------------*/
    for (var i=0; i< data.DATA_CRED.length; i++) {
        if (data.DATA_CRED[i].STATE == 'O' || data.DATA_CRED[i].STATE == 'L' || data.DATA_CRED[i].STATE == 'R' || data.DATA_CRED[i].STATE == 'A' || data.DATA_CRED[i].STATE == 'D') {
            day_d = Datediff(data.DATA_CRED[i].DATE_START);
            if (day_d != null && Math.abs(day_d)<90){
                if (data.DATA_CRED[i].START_SUMM != 0 && data.DATA_CRED[i].DLP !==''){
                    if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100 > 20){
                        data.LOCAL_COUNT_2_MONTH_CRED ++;
                    }
                }
            }
        }
    }

    /*---------------------------------------------Credit card no payment-----------------------------------*/
    for (var i=0; i< data.DATA_CRED.length; i++) {
        if (data.DATA_CRED[i].STATE == 'O' || data.DATA_CRED[i].STATE == 'L' || data.DATA_CRED[i].STATE == 'R' || data.DATA_CRED[i].STATE == 'A' || data.DATA_CRED[i].STATE == 'D') {
            if (data.DATA_CRED[i].DLP!=undefined && data.DATA_CRED[i].DLP == ''){
                if (data.DATA_CRED[i].PRODUCT != 'CASS' && data.DATA_CRED[i].PRODUCT != 'NOTR'){
                    day_d = Datediff(data.DATA_CRED[i].DATE_GIVEN);
                    if (day_d !== null && Math.abs(day_d)<90){
                        if (data.DATA_CRED[i].LIMIT >0 && data.DATA_CRED[i].BAL <0 && data.DATA_CRED[i].TR_PAY <2 && data.DATA_CRED[i].TR_PAY != 0){
                            if (data.DATA_CRED[i].CR_PAY/data.DATA_CRED[i].TR_PAY <= data.DATA_CRED[i].LIMIT*0.07){
                                data.LOCAL_CRED_CARD_NO_PAYM = 'Y';
                            }
                        }
                    }
                }
            }
        }
    }


    /*--------------------------------------------Open Peach---------------------------------------*/
    for (var i=0; i<data.DATA_CRED.length; i++){
        if (data.DATA_CRED[i].STATE == 'O' || data.DATA_CRED[i].STATE == 'L' || data.DATA_CRED[i].STATE == 'R' || data.DATA_CRED[i].STATE == 'A' || data.DATA_CRED[i].STATE == 'D') {
            if (Math.abs(data.DATA_CRED[i].BAL) >0) {
                if (  (['PERS','FACH'].indexOf(data.DATA_CRED[i].PRODUCT) != -1 &&
                    (data.DATA_CRED[i].TYPE.substr(0,2) == 'PP' || data.DATA_CRED[i].TYPE.substr(0,2) == 'PA' || data.DATA_CRED[i].TYPE == 'CRB1')
                    ) ||
                    (data.DATA_CRED[i].DLP == 'LFZ' && (data.DATA_CRED[i].TYPE == 'CT'))
                )
                {
                    data.LOCAL_OPEN_PEACH='Y';
                }
            }
        }
    }

    /*----------------------------------------Cash Amnisty---------------------------------------*/

    var code_amnisty = ['D015','D018','D099','D068','D072','D200','D201','D267','D304'];

    if (data.DATA_TRELCLIENTS_NEGAT == 'N' ||(data.DATA_TRELCLIENTS_NEGAT == 'Y' && code_amnisty.indexOf(data.DATA_TRELCLIENTS_CODE) != -1))
    {
        for (var i=0; i< data.DATA_CRED.length; i++){
            if (data.DATA_CRED[i].DLP == 'LFZ' && data.DATA_CRED[i].TYPE == 'CT') {
                if (data.DATA_CRED[i].STATE == 'O' || data.DATA_CRED[i].STATE == 'L' || data.DATA_CRED[i].STATE == 'R' || data.DATA_CRED[i].STATE == 'A' || data.DATA_CRED[i].STATE == 'D') {
                    if (data.DATA_CRED[i].START_SUMM !== 0){
                        if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100 > 10){
                            data.cash_amnisty = 'Y';
                            data.cash_amnisty_lim = data.DATA_CRED[i].START_SUMM;
                        }
                    }
                }
                else {
                    day_cash = Datediff(data.DATA_CRED[i].DATECLOS_F);
                    if (day_cash !== null && Math.abs(day_cash)<=60){
                        data.cash_amnisty = 'Y';
                        data.cash_amnisty_lim = data.DATA_CRED[i].START_SUMM;
                    }
                }
            }
            if (data.DATA_CRED[i].PRODUCT == 'FACH' || data.DATA_CRED[i].TYPE == 'CRB1') {
                if (data.DATA_CRED[i].STATE == 'K' || data.DATA_CRED[i].STATE == 'C' || data.DATA_CRED[i].STATE == 'Z') {
                    day_cash = Datediff(data.DATA_CRED[i].DATECLOS_F);
                    if (day_cash !== null && Math.abs(day_cash)<=60){
                        data.cash_amnisty = 'Y';
                        data.cash_amnisty_lim = data.DATA_CRED[i].LIMIT_PREVIOUS;
                    }
                }
            }
        }
        /*амнистия для закрытых кредитов по БН*/
        if (data.DATA_TRELCLIENTS_NEGAT == 'Y' && data.cash_amnisty == 'Y') {
            data.DATA_TRELCLIENTS_NEGAT = 'N';
            data.DATA_TRELCLIENTS_CODE = 'A101';
        }
    }

}

/*--------------------------------------Vostok---------------------------------------------------------------------*/
var day_dep;

if (data['SPVostok_VostokRegion'] =='Y' && data.DATA_DEBCARD != undefined) {
    for (var i=0; i<data.DATA_DEBCARD.length;i++) {
        if ((data.DATA_DEBCARD[i].TYPE_CARD =='W'|| data.DATA_DEBCARD[i].TYPE_CARD=='W_F'|| data.DATA_DEBCARD[i].TYPE_CARD=='W_T'|| data.DATA_DEBCARD[i].TYPE_CARD=='L') &&
            data.DATA_DEBCARD[i].ACTIVE =='Y') {
            day_dep=Datediff(data.DATA_DEBCARD[i].DATE_START);
            if (day_dep >=30){
                if (data.DATA_DEBCARD[i].Z02>1000 && data.DATA_DEBCARD[i].Z03>1000 && data.DATA_DEBCARD[i].Z01>1000 ){
                    data.LOCAL_DONBASS_EXCLUDES = 'Y';

                }
            }
        }
    }
}

if (data.RES_DEPOSIT_ACTIVE =='Y' && data.RES_DEPOSIT_TOTAL >10000 ) {
    data.LOCAL_DONBASS_EXCLUDES ='Y';
}

if (data.DATA_OB_ALL >1000 ) {
    data.LOCAL_DONBASS_EXCLUDES ='Y';
}



/**-------------------------------------------------BLOKPO------------------------------------------------------------------------***/
if (data.DATA_PERSLINK != undefined) {
    for (var i = 0; i < data.DATA_PERSLINK.length; i++) {
        if (data.DATA_PERSLINK[i].CUST_ID == data.APP_CUST_ID) {
            if (data.DATA_PERSLINK[i].CUST_ID == data.APP_CUST_ID && data.DATA_PERSLINK[i].BLOKPO_ZONE == 'R') {
                data.LOCAL_BLOKPO = 'Y';
                break;
            }
        }
    }
}