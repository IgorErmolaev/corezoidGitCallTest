/*---------------Bigger avans---------------*/

var ForgiveBigAvans = function  (RS_FORGIVE,REMAIN,SUM,DIFF_SUM,DIFF_SUM_TMP){
    var rem_tmp;
    for (var j=0;j <RS_FORGIVE.length; j++) {
        if (RS_FORGIVE[j] / SUM > 0) {
            if (DIFF_SUM*RS_FORGIVE[j]/SUM < RS_FORGIVE[j]){
                if (DIFF_SUM_TMP-(DIFF_SUM*RS_FORGIVE[j]/SUM)>=0){
                    REMAIN[j] += DIFF_SUM*RS_FORGIVE[j]/SUM;
                    DIFF_SUM_TMP -= (DIFF_SUM*RS_FORGIVE[j]/SUM);
                    RS_FORGIVE[j] -= (DIFF_SUM*RS_FORGIVE[j]/SUM);
                }
                else {
                    REMAIN[j] += DIFF_SUM_TMP;
                    RS_FORGIVE[j] -= DIFF_SUM_TMP;
                    DIFF_SUM_TMP = 0;
                }
            }
            else {
                REMAIN[j] += RS_FORGIVE[j];
                DIFF_SUM_TMP -= RS_FORGIVE[j];
                RS_FORGIVE[j] = 0;
            }
        }
    }
    return [RS_FORGIVE,REMAIN,SUM,DIFF_SUM,DIFF_SUM_TMP]
};

var Diff001Kop = function (DIFF_SUM_TMP,RS_FORGIVE_SUM,RS_FORGIVE,REMAIN){
    if (RS_FORGIVE_SUM>=0.01){
        for (var j=0; j<RS_FORGIVE.length;j++){
            if (RS_FORGIVE[j] > 0 && DIFF_SUM_TMP>0){
                REMAIN[j] +=  DIFF_SUM_TMP;
                RS_FORGIVE[j] -= DIFF_SUM_TMP;
                DIFF_SUM_TMP =0;
            }
        }
    }
    return [DIFF_SUM_TMP,RS_FORGIVE_SUM,RS_FORGIVE,REMAIN]
};





if (data.LOCAL_RS_NEW_CRED_SUM <0) {
    var diffsumAvans = data.LOCAL_RS_CRED_FIRST_PAY_B - data.LOCAL_RS_TOTAL_SUM_REMINE;
    var diffsumAvans_tmp = diffsumAvans;

    var LOCAL_SUM_COM = 0;
    var LOCAL_SUM_FINE = 0;
    var LOCAL_SUM_PROC = 0;
    for (i = 0; i < data.LOCAL_RS_OVER_COM_FORGIVE.length; i++) {
        LOCAL_SUM_COM += data.LOCAL_RS_OVER_COM_FORGIVE[i];
        LOCAL_SUM_FINE += data.LOCAL_RS_FINE_FORGIVE[i];
        LOCAL_SUM_PROC += data.LOCAL_RS_OVER_PROC_FORGIVE[i];
    }

    /*---------- fogive fine-----------*/
    if (LOCAL_SUM_FINE > 0) {
        var funcFine = ForgiveBigAvans(data.LOCAL_RS_FINE_FORGIVE, data.LOCAL_RS_FINE_REMAIN, LOCAL_SUM_FINE, diffsumAvans, diffsumAvans_tmp);
        data.LOCAL_RS_FINE_FORGIVE = funcFine[0];
        data.LOCAL_RS_FINE_REMAIN = funcFine[1];
        LOCAL_SUM_FINE = funcFine[2];
        diffsumAvans = funcFine[3];
        diffsumAvans_tmp = funcFine[4];
        if (diffsumAvans_tmp = 0.01) {
            var LOCAL_SUM_FINE_FORGIVE = 0;
            for (i = 0; i < data.LOCAL_RS_FINE_FORGIVE.length; i++) {
                LOCAL_SUM_FINE_FORGIVE += data.LOCAL_RS_FINE_FORGIVE[i];
            }
            var funcZeroFine = Diff001Kop(diffsumAvans_tmp, LOCAL_SUM_FINE_FORGIVE, data.LOCAL_RS_FINE_FORGIVE, data.LOCAL_RS_FINE_REMAIN);
            diffsumAvans_tmp = funcZeroFine[0];
            LOCAL_SUM_FINE_FORGIVE = funcZeroFine[1];
            data.LOCAL_RS_FINE_FORGIVE = funcZeroFine[2];
            data.LOCAL_RS_FINE_REMAIN = funcZeroFine[3];
        }
        diffsumAvans = diffsumAvans_tmp;
    }

    /*---------- fogive SHTR-----------*/
    if (diffsumAvans > 0) {
        for (var i = 0; i < data.DATA_RESTRUCT.length; i++) {
            if (data.DATA_RESTRUCT[i].CTYPE == 'SHTR' || data.DATA_RESTRUCT[i].CTYPE == 'SHTN') {
                if (data.LOCAL_RS_SHTR_FORGIVE[i] - diffsumAvans > 0) {
                    data.LOCAL_RS_SHTR_FORGIVE[i] -= diffsumAvans;
                    data.LOCAL_RS_SHTR_REMINE[i] += diffsumAvans;
                    diffsumAvans = 0;
                }
                else {
                    data.LOCAL_RS_SHTR_REMINE[i] += data.LOCAL_RS_SHTR_FORGIVE[i];
                    diffsumAvans -= data.LOCAL_RS_SHTR_FORGIVE[i];
                    data.LOCAL_RS_SHTR_FORGIVE[i] = 0;
                }
            }
        }
        var LOCAL_SUM_SHTR_FORGIVE = 0;
        for (i = 0; i < data.LOCAL_RS_SHTR_FORGIVE.length; i++) {
            LOCAL_SUM_SHTR_FORGIVE += data.LOCAL_RS_SHTR_FORGIVE[i];
        }
        var funcZeroShtr = Diff001Kop(diffsumAvans, LOCAL_SUM_SHTR_FORGIVE, data.LOCAL_RS_SHTR_FORGIVE, data.LOCAL_RS_SHTR_REMINE);
        diffsumAvans = funcZeroShtr[0];
        LOCAL_SUM_SHTR_FORGIVE = funcZeroShtr[1];
        data.LOCAL_RS_SHTR_FORGIVE = funcZeroShtr[2];
        data.LOCAL_RS_SHTR_REMINE = funcZeroShtr[3];
        diffsumAvans_tmp = diffsumAvans;
    }

    /*---------- fogive PROC-----------*/
    if (LOCAL_SUM_PROC > 0 && diffsumAvans > 0) {
        var funcProc = ForgiveBigAvans(data.LOCAL_RS_OVER_PROC_FORGIVE, data.LOCAL_RS_OVER_PROC_REMAIN, LOCAL_SUM_PROC, diffsumAvans, diffsumAvans_tmp);
        data.LOCAL_RS_OVER_PROC_FORGIVE = funcProc[0];
        data.LOCAL_RS_OVER_PROC_REMAIN = funcProc[1];
        LOCAL_SUM_PROC = funcProc[2];
        diffsumAvans = funcProc[3];
        diffsumAvans_tmp = funcProc[4];
        if (diffsumAvans_tmp = 0.01) {
            var LOCAL_SUM_PROC_FORGIVE = 0;
            for (i = 0; i < data.LOCAL_RS_OVER_PROC_FORGIVE.length; i++) {
                LOCAL_SUM_PROC_FORGIVE += data.LOCAL_RS_OVER_PROC_FORGIVE[i];
            }
            var funcZeroProc = Diff001Kop(diffsumAvans_tmp, LOCAL_SUM_PROC_FORGIVE, data.LOCAL_RS_OVER_PROC_FORGIVE, data.LOCAL_RS_OVER_PROC_REMAIN);
            diffsumAvans_tmp = funcZeroProc[0];
            LOCAL_SUM_PROC_FORGIVE = funcZeroProc[1];
            data.LOCAL_RS_OVER_PROC_FORGIVE = funcZeroProc[2];
            data.LOCAL_RS_OVER_PROC_REMAIN = funcZeroProc[3];
        }
        diffsumAvans = diffsumAvans_tmp;
    }


    /*---------- fogive COM-----------*/
    if (LOCAL_SUM_COM > 0 && diffsumAvans > 0) {
        var funcCom = ForgiveBigAvans(data.LOCAL_RS_OVER_COM_FORGIVE, data.LOCAL_RS_OVER_COM_REMAIN, LOCAL_SUM_COM, diffsumAvans, diffsumAvans_tmp);
        data.LOCAL_RS_OVER_COM_FORGIVE = funcCom[0];
        data.LOCAL_RS_OVER_COM_REMAIN = funcCom[1];
        LOCAL_SUM_COM = funcCom[2];
        diffsumAvans = funcCom[3];
        diffsumAvans_tmp = funcCom[4];
        if (diffsumAvans_tmp = 0.01) {
            var LOCAL_SUM_COM_FORGIVE = 0;
            for (i = 0; i < data.LOCAL_RS_OVER_COM_FORGIVE.length; i++) {
                LOCAL_SUM_COM_FORGIVE += data.LOCAL_RS_OVER_COM_FORGIVE[i];
            }
            var funcZeroCom = Diff001Kop(diffsumAvans_tmp, LOCAL_SUM_COM_FORGIVE, data.LOCAL_RS_OVER_COM_FORGIVE, data.LOCAL_RS_OVER_COM_REMAIN);
            diffsumAvans_tmp = funcZeroCom[0];
            LOCAL_SUM_COM_FORGIVE = funcZeroCom[1];
            data.LOCAL_RS_OVER_COM_FORGIVE = funcZeroCom[2];
            data.LOCAL_RS_OVER_COM_REMAIN = funcZeroCom[3];
        }
        diffsumAvans = diffsumAvans_tmp;
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




data.LOCAL_RS_NEW_CRED_PAYMONTH = data.LOCAL_RS_NEW_CRED_SUM*data.monthKoef;
