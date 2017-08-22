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

var procBody = 0.1;
var procSum = 1.2;


var diffSum, diffSumTmp;
for (var i = 0; i < data.DATA_RESTRUCT.length; i++) {
    diffSum = 0;
    data.LOCAL_RS_OVER_COM_FORGIVE.push(0);
    data.LOCAL_RS_OVER_COM_REMAIN.push(0);
    data.LOCAL_RS_OVER_PROC_FORGIVE.push(0);
    data.LOCAL_RS_OVER_PROC_REMAIN.push(0);
    data.LOCAL_RS_FINE_FORGIVE.push(0);
    data.LOCAL_RS_FINE_REMAIN.push(0);
    data.LOCAL_RS_SHTR_FORGIVE.push(0);
    data.LOCAL_RS_SHTR_REMINE.push(0);
    if (data.DATA_RESTRUCT[i].CTYPE != 'SHTR' && data.DATA_RESTRUCT[i].CTYPE != 'SHTN') {

        diffSum = data.LOCAL_BAL_BODY[i] * procSum;

        if (data.LOCAL_BAL_BODY[i] < procBody * data.LOCAL_BAL_ALL[i]) {
            diffSum = 0.15 * data.LOCAL_BAL_ALL[i];
        }
        if (data.LOCAL_BAL_BODY[i] == data.LOCAL_BAL_ALL[i]) {
            diffSum = data.LOCAL_BAL_BODY[i];
        }

        diffSum = data.LOCAL_BAL_ALL[i] - diffSum;


        if (diffSum > 0) {
            if (data.LOCAL_BAL_COM[i] > 0) {
                if (diffSum - data.LOCAL_BAL_COM[i] >= 0) {
                    data.LOCAL_RS_OVER_COM_FORGIVE[i] = data.LOCAL_BAL_COM[i];
                    data.LOCAL_RS_OVER_COM_REMAIN[i] = 0;
                    diffSum += -data.LOCAL_BAL_COM[i];
                }
                else {
                    data.LOCAL_RS_OVER_COM_FORGIVE[i] = diffSum;
                    data.LOCAL_RS_OVER_COM_REMAIN[i] = data.LOCAL_BAL_COM[i] - data.LOCAL_RS_OVER_COM_FORGIVE[i];
                    diffSum = 0;
                }
            }
        }
        if (diffSum > 0) {
            if (data.LOCAL_BAL_PROC[i] > 0) {
                if (diffSum - data.LOCAL_BAL_PROC[i] >= 0) {
                    data.LOCAL_RS_OVER_PROC_FORGIVE[i] = data.LOCAL_BAL_PROC[i];
                    data.LOCAL_RS_OVER_PROC_REMAIN[i] = 0;
                    diffSum += -data.LOCAL_BAL_PROC[i];
                }
                else {
                    data.LOCAL_RS_OVER_PROC_FORGIVE[i] = diffSum;
                    data.LOCAL_RS_OVER_PROC_REMAIN[i] = data.LOCAL_BAL_PROC[i] - data.LOCAL_RS_OVER_PROC_FORGIVE[i];
                    diffSum = 0;
                }
            }
        }
        if (diffSum > 0) {
            if (data.LOCAL_BAL_FINE[i] > 0) {
                if (diffSum - data.LOCAL_BAL_FINE[i] >= 0) {
                    data.LOCAL_RS_FINE_FORGIVE[i] = data.LOCAL_BAL_FINE[i];
                    data.LOCAL_RS_FINE_REMAIN[i] = 0;
                    diffSum += -data.LOCAL_BAL_FINE[i];
                }
                else {
                    data.LOCAL_RS_FINE_FORGIVE[i] = diffSum;
                    data.LOCAL_RS_FINE_REMAIN[i] = data.LOCAL_BAL_FINE[i] - data.LOCAL_RS_FINE_FORGIVE[i];
                    diffSum = 0;
                }
            }
        }

        data.LOCAL_RS_SUM_FORGIVE.push(data.LOCAL_RS_OVER_COM_FORGIVE[i] + data.LOCAL_RS_OVER_PROC_FORGIVE[i] + data.LOCAL_RS_FINE_FORGIVE[i]);
        data.LOCAL_RS_SUM_REMINE.push(data.LOCAL_BAL_ALL[i] - data.LOCAL_RS_SUM_FORGIVE[i]);
    }
    else {
        if (data.DATA_RESTRUCT[i].CTYPE == 'SHTR' || data.DATA_RESTRUCT[i].CTYPE == 'SHTN') {
            data.LOCAL_RS_SHTR_FORGIVE[i] = data.LOCAL_BAL_ALL[i];
            data.LOCAL_RS_SUM_FORGIVE.push(data.LOCAL_RS_SHTR_FORGIVE[i]);
            data.LOCAL_RS_SUM_REMINE.push(data.LOCAL_RS_SHTR_REMINE[i]);
        }
    }

}

