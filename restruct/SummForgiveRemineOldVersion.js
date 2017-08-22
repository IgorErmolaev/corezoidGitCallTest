function ForgiveBigAvans(cred, SUM) {
    var  DIFF_TMP;
    DIFF_TMP = cred.DIFF_SUM;
    for (var j = 0; j < cred.RS_FORGIVE.length; j++) {
        if (cred.RS_FORGIVE[j] / SUM > 0) {
            if (cred.DIFF_SUM * cred.RS_FORGIVE[j] / SUM < cred.RS_FORGIVE[j]) {
                if (DIFF_TMP - (cred.DIFF_SUM * cred.RS_FORGIVE[j] / SUM) >= 0) {
                    cred.REMAIN[j] += cred.DIFF_SUM * cred.RS_FORGIVE[j] / SUM;
                    DIFF_TMP -= (cred.DIFF_SUM *cred.RS_FORGIVE[j] / SUM);
                    cred.RS_FORGIVE[j] -= (cred.DIFF_SUM * cred.RS_FORGIVE[j] / SUM);
                }
                else {
                    cred.REMAIN[j] += DIFF_TMP;
                    cred.RS_FORGIVE[j] -= DIFF_TMP;
                    DIFF_TMP = 0;
                }
            }
            else {
                cred.REMAIN[j] +=cred.RS_FORGIVE[j];
                DIFF_TMP -= cred.RS_FORGIVE[j];
                cred.RS_FORGIVE[j] = 0;
            }
        }
    }
    cred.DIFF_SUM = DIFF_TMP;

}

function Diff001Kop(RS_FORGIVE_SUM, cred) {
    if (RS_FORGIVE_SUM >= 0.01) {
        for (var j = 0; j < cred.RS_FORGIVE.length; j++) {
            if (cred.RS_FORGIVE[j] > 0 && cred.DIFF_SUM > 0) {
                cred.REMAIN[j] += cred.DIFF_SUM;
                cred.RS_FORGIVE[j] -= cred.DIFF_SUM;
                cred.DIFF_SUM = 0;
            }
        }
    }
}


data.LOCAL_RS_TOTAL_SUM_REMINE = 0;
data.LOCAL_RS_TOTAL_SUM_FORGIVE = 0;

/*-------------------SUM---------------------*/
for (i = 0; i < data.LOCAL_RS_SUM_REMINE.length; i++) {
    data.LOCAL_RS_TOTAL_SUM_REMINE += data.LOCAL_RS_SUM_REMINE[i];
    data.LOCAL_RS_TOTAL_SUM_FORGIVE += data.LOCAL_RS_SUM_FORGIVE[i];
}
var LOCAL_SUM_COM, LOCAL_SUM_FINE, LOCAL_SUM_PROC;
LOCAL_SUM_COM = 0;
LOCAL_SUM_FINE = 0;
LOCAL_SUM_PROC = 0;

for (i = 0; i < data.LOCAL_RS_OVER_COM_FORGIVE.length; i++) {
    LOCAL_SUM_COM += data.LOCAL_RS_OVER_COM_FORGIVE[i];
    LOCAL_SUM_FINE += data.LOCAL_RS_FINE_FORGIVE[i];
    LOCAL_SUM_PROC += data.LOCAL_RS_OVER_PROC_FORGIVE[i];
}
data.LOCAL_RS_CRED_FIRST_PAY_B = data.PROD_CHAR_ADVANCEAMOUNT;

//================ big avans==================
if (data.LOCAL_RS_CRED_FIRST_PAY_B > data.LOCAL_RS_TOTAL_SUM_REMINE ) {
    var DIFF_SUM = data.LOCAL_RS_CRED_FIRST_PAY_B - data.LOCAL_RS_TOTAL_SUM_REMINE;
    var DIFF_SUM_TMP = DIFF_SUM;
    var newCred = {};

    /*---------- fogive fine-----------*/
    if (LOCAL_SUM_FINE > 0) {
        newCred.REMAIN = data.LOCAL_RS_FINE_REMAIN;
        newCred.RS_FORGIVE = data.LOCAL_RS_FINE_FORGIVE;
        newCred.DIFF_SUM = DIFF_SUM;
        ForgiveBigAvans(newCred, LOCAL_SUM_FINE);
        DIFF_SUM_TMP = newCred.DIFF_SUM;
        if (DIFF_SUM_TMP == 0.01) {
            var LOCAL_SUM_FINE_FORGIVE = 0;
            for (i = 0; i < data.LOCAL_RS_FINE_FORGIVE.length; i++) {
                LOCAL_SUM_FINE_FORGIVE += data.LOCAL_RS_FINE_FORGIVE[i];
            }
            Diff001Kop(LOCAL_SUM_FINE_FORGIVE, newCred);
        }
        DIFF_SUM_TMP = newCred.DIFF_SUM;
        DIFF_SUM = DIFF_SUM_TMP;
    }

    /*---------- fogive SHTR-----------*/
    if (DIFF_SUM > 0) {
        for (i = 0; i < data.DATA_RESTRUCT.length; i++) {
            if (data.DATA_RESTRUCT[i].CTYPE == 'SHTR' || data.DATA_RESTRUCT[i].CTYPE == 'SHTN') {
                if (data.LOCAL_RS_SHTR_FORGIVE[i] - DIFF_SUM > 0) {
                    data.LOCAL_RS_SHTR_FORGIVE[i] -= DIFF_SUM;
                    data.LOCAL_RS_SHTR_REMINE[i] += DIFF_SUM;
                    DIFF_SUM = 0;
                }
                else {
                    data.LOCAL_RS_SHTR_REMINE[i] += data.LOCAL_RS_SHTR_FORGIVE[i];
                    DIFF_SUM -= data.LOCAL_RS_SHTR_FORGIVE[i];
                    data.LOCAL_RS_SHTR_FORGIVE[i] = 0;
                }
            }
        }
        var LOCAL_SUM_SHTR_FORGIVE = 0;
        for (i = 0; i < data.LOCAL_RS_SHTR_FORGIVE.length; i++) {
            LOCAL_SUM_SHTR_FORGIVE += data.LOCAL_RS_SHTR_FORGIVE[i];
        }
        newCred.REMAIN = data.LOCAL_RS_SHTR_REMINE;
        newCred.RS_FORGIVE = data.LOCAL_RS_SHTR_FORGIVE;
        newCred.DIFF_SUM = DIFF_SUM;
        Diff001Kop(LOCAL_SUM_SHTR_FORGIVE,newCred );
        DIFF_SUM = newCred.DIFF_SUM;
        DIFF_SUM_TMP = DIFF_SUM;
    }

    /*---------- fogive PROC-----------*/
    if (LOCAL_SUM_PROC > 0 && DIFF_SUM > 0) {
        newCred.REMAIN = data.LOCAL_RS_OVER_PROC_REMAIN;
        newCred.RS_FORGIVE = data.LOCAL_RS_OVER_PROC_FORGIVE;
        newCred.DIFF_SUM = DIFF_SUM;
        ForgiveBigAvans(newCred, LOCAL_SUM_PROC);
        DIFF_SUM_TMP = newCred.DIFF_SUM;
        if (DIFF_SUM_TMP == 0.01) {
            var LOCAL_SUM_PROC_FORGIVE = 0;
            for (i = 0; i < data.LOCAL_RS_OVER_PROC_FORGIVE.length; i++) {
                LOCAL_SUM_PROC_FORGIVE += data.LOCAL_RS_OVER_PROC_FORGIVE[i];
            }
            Diff001Kop( LOCAL_SUM_PROC_FORGIVE, newCred);
        }
        DIFF_SUM_TMP = newCred.DIFF_SUM;
        DIFF_SUM = DIFF_SUM_TMP;
    }

    /*---------- fogive COM-----------*/
    if (LOCAL_SUM_COM > 0 && DIFF_SUM > 0) {
        newCred.REMAIN = data.LOCAL_RS_OVER_COM_REMAIN;
        newCred.RS_FORGIVE = data.LOCAL_RS_OVER_COM_FORGIVE;
        newCred.DIFF_SUM = DIFF_SUM;
        ForgiveBigAvans(newCred, LOCAL_SUM_COM);
        DIFF_SUM_TMP = newCred.DIFF_SUM;
        if (DIFF_SUM_TMP == 0.01) {
            var LOCAL_SUM_COM_FORGIVE = 0;
            for (i = 0; i < data.LOCAL_RS_OVER_COM_FORGIVE.length; i++) {
                LOCAL_SUM_COM_FORGIVE += data.LOCAL_RS_OVER_COM_FORGIVE[i];
            }
            Diff001Kop( LOCAL_SUM_COM_FORGIVE, newCred);
        }
        DIFF_SUM_TMP = newCred.DIFF_SUM;
        DIFF_SUM = DIFF_SUM_TMP;
    }

    /*----------TOTAL SUM------------*/
    for (i = 0; i < data.DATA_RESTRUCT.length; i++) {
        if (data.DATA_RESTRUCT[i].CTYPE != 'SHTR' && data.DATA_RESTRUCT[i].CTYPE != 'SHTN') {
            /*-----------calculation amount of forgive ----------*/
            data.LOCAL_RS_SUM_FORGIVE[i] = data.LOCAL_RS_OVER_PROC_FORGIVE[i] + data.LOCAL_RS_OVER_COM_FORGIVE[i] + data.LOCAL_RS_FINE_FORGIVE[i];
            /*-----------calculation amount of remain sum ----------*/
            data.LOCAL_RS_SUM_REMINE[i] = data.LOCAL_BAL_ALL[i] - data.LOCAL_RS_SUM_FORGIVE[i];
        }
        else {
            data.LOCAL_RS_SUM_FORGIVE[i] = data.LOCAL_RS_SHTR_FORGIVE[i];
            data.LOCAL_RS_SUM_REMINE[i] = data.LOCAL_RS_SHTR_REMINE[i];
        }
    }
    data.LOCAL_RS_TOTAL_SUM_REMINE = 0;
    data.LOCAL_RS_TOTAL_SUM_FORGIVE = 0;
    for (i = 0; i < data.LOCAL_RS_SUM_REMINE.length; i++) {
        data.LOCAL_RS_TOTAL_SUM_REMINE += data.LOCAL_RS_SUM_REMINE[i];
        data.LOCAL_RS_TOTAL_SUM_FORGIVE += data.LOCAL_RS_SUM_FORGIVE[i];
    }

}
/*================other==================*/
if (data.LOCAL_ONE_PAY != 'Y'){
    data.LOCAL_RS_NEW_CRED_SUM = data.LOCAL_RS_TOTAL_SUM_REMINE - data.LOCAL_RS_CRED_FIRST_PAY_B;
    /*------------------------calculation NEW cred annuity PAYmonth ----------*/
    data.LOCAL_RS_NEW_CRED_PAYMONTH = data.LOCAL_RS_NEW_CRED_SUM*data.monthKoef;
}
else {
    data.LOCAL_RS_NEW_CRED_SUM = data.LOCAL_RS_TOTAL_SUM_REMINE;
    data.LOCAL_RS_NEW_CRED_PAYMONTH = 0;
}


