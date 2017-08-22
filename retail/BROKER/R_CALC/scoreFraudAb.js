// JavaScript Document
//------------------------------------First Score calculation------------------

//--------------------------Fraud scoring ------------------------------------

data.LOCAL_FIRST_SCOR = -1000;

if (data.LOCAL_FIRST_SCOR == -1000) {
    data.FRAUD_FIRST_SCORING = data.RES_SCCARD_SCORE_1;
    data.FRAUD_FIRST_SCORING_DATE = new Date;
}


//----------------------------------------------------------------------------

var corpAB = new Array("255","259","260","261","265","266");

data.LOCAL_SCORE_DECLINE = 'N';
data.LOCAL_SCOR_FLAG = 'N';
data.LOCAL_SCORE_BAL_OTS = 0.099;

if (data.LOCAL_DONBASS != 'Y'){
    if (corpAB.indexOf(data.PROD_CHAR_CORPORATION) != -1 && ['MOB','DORS','NOUTE','WINDOW','SMARTPHN'].indexOf(data.LOCAL_TYPE_PURPOSE) == -1 && data.RES_TYPE_CUST == 'INTERN'){
        if (data.RES_SCCARD_SCORE_1 >= 0.099){
            data.LOCAL_SCORE_DECLINE = 'Y';
            data.LOCAL_SCORE_BAL_OTS = 0.099;
        }
    }
    else {
        if (data.RES_SCCARD_SCORE_1 >= 0.099){
            data.LOCAL_SCORE_DECLINE = 'Y';
            data.LOCAL_SCORE_BAL_OTS = 0.099;
        }
    }
}
else {
    if (data.RES_SCCARD_SCORE_1 >= 0.099){
        data.LOCAL_SCORE_DECLINE = 'Y';
        data.LOCAL_SCORE_BAL_OTS = 0.099;
    }
}


/*
if (data.RES_LIMIT_ITOG_TYPE == 'VNESH' && data.RES_FINAL_KRED_SUM != 0 && data.PROD_CHAR_LOANAMOUNT/data.RES_FINAL_KRED_SUM<=1.5) {
    SCOR_FLAG = 'True';
}
else {
    SCOR_FLAG = 'False';
}

if (data.PROD_SCHEME_LOANPURPOSE != 'FQ') {
    if (data.RES_TYPE_CUST == 'EXTERN') {
        if (data.PROD_CHAR_BANK == 'AB') {
            if (data.PROD_CHAR_CORPORATION == '0' || data.PROD_CHAR_CORPORATION == '239') {
                if (data.LOCAL_TYPE_PURPOSE == 'MOB' || data.LOCAL_TYPE_PURPOSE == 'SMARTPHN') {
                    if (data.RES_SCCARD_SCORE_1<193) {
                        data.LOCAL_SCORE_BAL_OTS = 193;
                        if (SCOR_FLAG == 'True') {
                            data.LOCAL_SCOR_FLAG = 'Y';
                        }
                        else {
                            data.LOCAL_SCORE_DECLINE = 'Y';
                        }
                    }
                    else {
                        data.LOCAL_SCORE_BAL_OTS = 193;
                    }
                }
                else {
                    if (data.RES_SCCARD_SCORE_1<160) {
                        data.LOCAL_SCORE_BAL_OTS = 160;
                        if (SCOR_FLAG == 'True') {
                            data.LOCAL_SCOR_FLAG = 'Y';
                        }
                        else {
                            data.LOCAL_SCORE_DECLINE = 'Y';
                        }
                    }
                    else {
                        data.LOCAL_SCORE_BAL_OTS = 160;
                    }
                }
            }
        }
    }
}
    */