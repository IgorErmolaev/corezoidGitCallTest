

data.LOCAL_RS_OVER_COM_FORGIVE = new Array();
data.LOCAL_RS_OVER_COM_REMAIN = new Array();
data.LOCAL_RS_OVER_PROC_FORGIVE = new Array();
data.LOCAL_RS_OVER_PROC_REMAIN = new Array();
data.LOCAL_RS_FINE_FORGIVE = new Array();
data.LOCAL_RS_FINE_REMAIN = new Array();
data.LOCAL_RS_SUM_FORGIVE = new Array();
data.LOCAL_RS_SUM_REMINE = new Array();
data.LOCAL_RS_SHTR_FORGIVE = new Array();
data.LOCAL_RS_SHTR_REMINE = new Array();



if ( data.PROD_SCHEME_TERM == 3){
    var monthKoef = 0.336115;
    var procSum = 0.8;
}
else {
    if ( data.PROD_SCHEME_TERM == 6){
        var monthKoef = 0.1715614;
        var procSum = 0.8;
    }
    else {
        if ( data.PROD_SCHEME_TERM == 12){
            var monthKoef = 0.0879159;
            var procSum = 0.8;
        }
    }
}

var diffSum, diffSumTmp;
for (var i=0; i<data.DATA_RESTRUCT.length; i++) {
    diffSum = 0;
    diffSumTmp = 0;
    data.LOCAL_RS_OVER_COM_FORGIVE.push(0);
    data.LOCAL_RS_OVER_COM_REMAIN.push(0);
    data.LOCAL_RS_OVER_PROC_FORGIVE.push(0);
    data.LOCAL_RS_OVER_PROC_REMAIN.push(0);
    data.LOCAL_RS_FINE_FORGIVE.push(0);
    data.LOCAL_RS_FINE_REMAIN.push(0);
    data.LOCAL_RS_SHTR_FORGIVE.push(0);
    data.LOCAL_RS_SHTR_REMINE.push(0);
    if (data.DATA_RESTRUCT[i].CTYPE != 'SHTR' && data.DATA_RESTRUCT[i].CTYPE != 'SHTN'){
        if (data.LOCAL_BAL_ALL[i] < 20000){
            diffSum = data.LOCAL_BAL_ALL[i]*0.3;
        }
        else {
            if (data.LOCAL_BAL_ALL[i] < 30000){
                diffSum = data.LOCAL_BAL_ALL[i]*0.2;
            }
            else {
                if (data.LOCAL_BAL_ALL[i] >= 30000){
                    diffSum = data.LOCAL_BAL_ALL[i]*0.1;
                }
            }
        }

        if (data.LOCAL_BAL_BODY[i] < 20000){
            diffSumTmp = data.LOCAL_BAL_BODY[i]*2;
        }
        else {
            if (data.LOCAL_BAL_BODY[i] >= 20000){
                diffSumTmp = data.LOCAL_BAL_BODY[i]*1.5;
            }
        }


        diffSum = Math.max(diffSumTmp,diffSum);

        diffSumTmp = 0;
        if ((diffSum >= data.LOCAL_BAL_ALL[i]) || ((data.LOCAL_BAL_ALL[i] - diffSum)/data.LOCAL_BAL_BODY[i] <= 0.1) ){
            diffSumTmp = data.LOCAL_BAL_ALL[i] * procSum;
        }
        if (diffSumTmp > 0){
            if (diffSumTmp < data.LOCAL_BAL_BODY[i]){
                diffSumTmp = data.LOCAL_BAL_BODY[i]
            }
            diffSum =data.LOCAL_BAL_ALL[i] - diffSumTmp;
        }
        else {
            diffSum = data.LOCAL_BAL_ALL[i] - diffSum;
        }

        if (diffSum > 0){
            if (data.LOCAL_BAL_COM[i] >0){
                if (diffSum - data.LOCAL_BAL_COM[i] >= 0){
                    data.LOCAL_RS_OVER_COM_FORGIVE[i] = data.LOCAL_BAL_COM[i];
                    data.LOCAL_RS_OVER_COM_REMAIN[i] = 0;
                    diffSum += -data.LOCAL_BAL_COM[i];
                }
                else {
                    data.LOCAL_RS_OVER_COM_FORGIVE[i] = diffSum;
                    data.LOCAL_RS_OVER_COM_REMAIN[i] = data.LOCAL_BAL_COM[i] - data.LOCAL_RS_OVER_COM_FORGIVE[i];
                    diffSum =0;
                }
            }
        }
        if (diffSum > 0){
            if (data.LOCAL_BAL_PROC[i] >0){
                if (diffSum - data.LOCAL_BAL_PROC[i] >= 0){
                    data.LOCAL_RS_OVER_PROC_FORGIVE[i] = data.LOCAL_BAL_PROC[i];
                    data.LOCAL_RS_OVER_PROC_REMAIN[i] = 0;
                    diffSum += -data.LOCAL_BAL_PROC[i];
                }
                else {
                    data.LOCAL_RS_OVER_PROC_FORGIVE[i] =  diffSum;
                    data.LOCAL_RS_OVER_PROC_REMAIN[i] = data.LOCAL_BAL_PROC[i] - data.LOCAL_RS_OVER_PROC_FORGIVE[i];
                    diffSum =0;
                }
            }
        }
        if (diffSum > 0){
            if (data.LOCAL_BAL_FINE[i] >0){
                if (diffSum - data.LOCAL_BAL_FINE[i] >= 0){
                    data.LOCAL_RS_FINE_FORGIVE[i] = data.LOCAL_BAL_FINE[i];
                    data.LOCAL_RS_FINE_REMAIN[i] = 0;
                    diffSum += -data.LOCAL_BAL_FINE[i];
                }
                else {
                    data.LOCAL_RS_FINE_FORGIVE[i] = diffSum;
                    data.LOCAL_RS_FINE_REMAIN[i] = data.LOCAL_BAL_FINE[i] - data.LOCAL_RS_FINE_FORGIVE[i];
                    diffSum =0;
                }
            }
        }
        data.LOCAL_RS_SUM_FORGIVE.push(data.LOCAL_RS_OVER_COM_FORGIVE[i] + data.LOCAL_RS_OVER_PROC_FORGIVE[i] + data.LOCAL_RS_FINE_FORGIVE[i]);
        data.LOCAL_RS_SUM_REMINE.push(data.LOCAL_BAL_ALL[i] - data.LOCAL_RS_SUM_FORGIVE[i]);

    }

    else {
        if (data.DATA_RESTRUCT[i].CTYPE == 'SHTR' || data.DATA_RESTRUCT[i].CTYPE == 'SHTN'){
            if (data.LOCAL_BAL_ALL[i] < 20000){
                diffSum = data.LOCAL_BAL_ALL[i]*0.3;
            }
            else {
                if (data.LOCAL_BAL_ALL[i] < 30000){
                    diffSum = data.LOCAL_BAL_ALL[i]*0.2;
                }
                else {
                    if (data.LOCAL_BAL_ALL[i] >= 30000){
                        diffSum = data.LOCAL_BAL_ALL[i]*0.1;
                    }
                }
            }


            diffSum = data.LOCAL_BAL_ALL[i] - diffSum;
            data.LOCAL_RS_SHTR_FORGIVE[i]=diffSum;
            data.LOCAL_RS_SHTR_REMINE[i]= data.LOCAL_BAL_ALL[i] -  data.LOCAL_RS_SHTR_FORGIVE[i];
            data.LOCAL_RS_SUM_FORGIVE.push(data.LOCAL_RS_SHTR_FORGIVE[i]);
            data.LOCAL_RS_SUM_REMINE.push(data.LOCAL_RS_SHTR_REMINE[i]);
        }
    }

    if (data.DATA_RESTRUCT[i].FL_GD == 3){
        data.LOCAL_RS_SUM_REMINE[i] += data.LOCAL_RS_SUM_FORGIVE[i];
        data.LOCAL_RS_SUM_FORGIVE[i] = 0;
        data.LOCAL_RS_OVER_PROC_REMAIN[i] += data.LOCAL_RS_OVER_PROC_FORGIVE[i];
        data.LOCAL_RS_OVER_PROC_FORGIVE[i] = 0;
        data.LOCAL_RS_OVER_COM_REMAIN[i] += data.LOCAL_RS_OVER_COM_FORGIVE[i];
        data.LOCAL_RS_OVER_COM_FORGIVE[i] = 0;
        data.LOCAL_RS_FINE_REMAIN[i] += data.LOCAL_RS_FINE_FORGIVE[i];
        data.LOCAL_RS_FINE_FORGIVE[i] = 0;
        data.LOCAL_RS_SHTR_REMINE[i]+=data.LOCAL_RS_SHTR_FORGIVE[i];
        data.LOCAL_RS_SHTR_FORGIVE[i] = 0;
    }
}


data.LOCAL_RS_TOTAL_SUM_REMINE = 0;
data.LOCAL_RS_TOTAL_SUM_FORGIVE = 0;

/*-------------------SUM---------------------*/
for (i=0; i<data.LOCAL_RS_SUM_REMINE.length; i++){
    data.LOCAL_RS_TOTAL_SUM_REMINE += data.LOCAL_RS_SUM_REMINE[i];
    data.LOCAL_RS_TOTAL_SUM_FORGIVE += data.LOCAL_RS_SUM_FORGIVE[i];
}

data.LOCAL_RS_CRED_FIRST_PAY_B = data.PROD_CHAR_ADVANCEAMOUNT;

if(data.LOCAL_RS_TOTAL_SUM_REMINE - data.LOCAL_RS_CRED_FIRST_PAY_B < data.LOCAL_MIN_NEW_CRED_SUM){
    if (data.LOCAL_RS_TOTAL_SUM_REMINE > data.LOCAL_MIN_NEW_CRED_SUM){
        data.LOCAL_RS_NEW_CRED_SUM = data.LOCAL_MIN_NEW_CRED_SUM;
        data.LOCAL_RS_CRED_FIRST_PAY_B = data.LOCAL_RS_TOTAL_SUM_REMINE - data.LOCAL_RS_NEW_CRED_SUM;
    }
    else {
        data.LOCAL_RS_CRED_FIRST_PAY_B = 0.9*data.LOCAL_RS_TOTAL_SUM_REMINE;
        data.LOCAL_RS_NEW_CRED_SUM = data.LOCAL_RS_TOTAL_SUM_REMINE - data.LOCAL_RS_CRED_FIRST_PAY_B;
    }
}
else {
    data.LOCAL_RS_NEW_CRED_SUM = data.LOCAL_RS_TOTAL_SUM_REMINE - data.LOCAL_RS_CRED_FIRST_PAY_B;
}

data.LOCAL_RS_NEW_CRED_PAYMONTH = data.LOCAL_RS_NEW_CRED_SUM*monthKoef;