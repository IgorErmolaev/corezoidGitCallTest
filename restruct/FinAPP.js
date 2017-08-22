data.RES_RS_FINE_FORGIVE = new Array();
data.RES_RS_FINE_REMAIN= new Array();
data.RES_RS_OVER_COM_FORGIVE= new Array();
data.RES_RS_OVER_COM_REMAIN= new Array();
data.RES_RS_OVER_PROC_FORGIVE= new Array();
data.RES_RS_OVER_PROC_REMAIN= new Array();
data.RES_RS_SHTR_FORGIVE= new Array();
data.RES_RS_SHTR_REMINE= new Array();

data.RES_RS_SUM_FORGIVE= new Array();
data.RES_RS_SUM_REMINE= new Array();
data.RES_RESTRUCT_REFERENCE= new Array();
data.RES_RS_CURR= new Array();


var RS_OVER_PROC_FORGIVE =0;
var BAL_PROC=0;
var RS_OVER_COM_FORGIVE=0;
var BAL_COM=0;
var RS_FINE_FORGIVE=0;
var BAL_FINE=0;
var RS_SHTR_FORGIVE=0;
var RS_SHTR_REMINE =0;


/*------------------the final decision----------------------*/
data.RES_DEC_FINAL_FLOW = 'ACCEPT';

if (data.RES_CHAR_CRED_TYPE == 'erro' || data.RES_CHAR_CRED_TYPE=='0' || data.LOCAL_RES_RS_NEW_CRED_SUM == 0){
    data.RES_DEC_FINAL_FLOW = 'DECLINE';
    data.RES_CHAR_CRED_TYPE = '';
    data.RES_RS_NEW_CRED_TERM = 0;
}

for (var i=0;i<data.LOCAL_RS_OVER_PROC_FORGIVE.length;i++){
    RS_OVER_PROC_FORGIVE += data.LOCAL_RS_OVER_PROC_FORGIVE[i];
    BAL_PROC += data.LOCAL_BAL_PROC[i];
    RS_OVER_COM_FORGIVE += data.LOCAL_RS_OVER_COM_FORGIVE[i];
    BAL_COM += data.LOCAL_BAL_COM[i];
    RS_FINE_FORGIVE += data.LOCAL_RS_FINE_FORGIVE[i];
    BAL_FINE += data.LOCAL_BAL_FINE[i];
}

for (var i=0;i<data.LOCAL_RS_SHTR_FORGIVE.length;i++){
    RS_SHTR_FORGIVE += data.LOCAL_RS_SHTR_FORGIVE[i];
    RS_SHTR_REMINE += data.LOCAL_RS_SHTR_REMINE[i];
}

/*------------calculating--total--sum-forgive and remine-------------*/
data.RES_RS_TOTAL_PROC_FORGIVE = RS_OVER_PROC_FORGIVE;
data.RES_RS_TOTAL_PROC_REMINE = BAL_PROC - data.RES_RS_TOTAL_PROC_FORGIVE;
data.RES_RS_TOTAL_PROC_FORGIVE = Math.round(parseFloat(data.RES_RS_TOTAL_PROC_FORGIVE) * 100) / 100;
data.RES_RS_TOTAL_PROC_REMINE = Math.round(parseFloat(data.RES_RS_TOTAL_PROC_REMINE) * 100) / 100;

data.RES_RS_TOTAL_COM_FORGIVE = RS_OVER_COM_FORGIVE;
data.RES_RS_TOTAL_COM_REMINE = BAL_COM - data.RES_RS_TOTAL_COM_FORGIVE;
data.RES_RS_TOTAL_COM_FORGIVE = Math.round(parseFloat(data.RES_RS_TOTAL_COM_FORGIVE) * 100) / 100;
data.RES_RS_TOTAL_COM_REMINE = Math.round(parseFloat(data.RES_RS_TOTAL_COM_REMINE) * 100) / 100;

data.RES_RS_TOTAL_FINE_FORGIVE = RS_FINE_FORGIVE;
data.RES_RS_TOTAL_FINE_REMINE = BAL_FINE - data.RES_RS_TOTAL_FINE_FORGIVE;
data.RES_RS_TOTAL_FINE_FORGIVE = Math.round(parseFloat(data.RES_RS_TOTAL_FINE_FORGIVE) * 100) / 100;
data.RES_RS_TOTAL_FINE_REMINE = Math.round(parseFloat(data.RES_RS_TOTAL_FINE_REMINE) * 100) / 100;

data.RES_RS_TOTAL_SHTR_FORGIVE = RS_SHTR_FORGIVE;
data.RES_RS_TOTAL_SHTR_REMINE = RS_SHTR_REMINE;
data.RES_RS_TOTAL_SHTR_FORGIVE = Math.round(parseFloat(data.RES_RS_TOTAL_SHTR_FORGIVE) * 100) / 100;
data.RES_RS_TOTAL_SHTR_REMINE = Math.round(parseFloat(data.RES_RS_TOTAL_SHTR_REMINE) * 100) / 100;

data.RES_RS_TOTAL_SUM_FORGIVE = Math.round(parseFloat(data.LOCAL_RS_TOTAL_SUM_FORGIVE) * 100) / 100;
data.RES_RS_TOTAL_SUM_REMINE = Math.round(parseFloat(data.LOCAL_RS_TOTAL_SUM_REMINE) * 100) / 100;


/*--------------------RES array--------------------*/
for (i=0; i<data.DATA_RESTRUCT.length;i++){
    if (data.DATA_RESTRUCT[i].REFERENCE != null){
        data.RES_RS_FINE_FORGIVE.push(data.LOCAL_RS_FINE_FORGIVE[i]);
        data.RES_RS_FINE_FORGIVE[i] = Math.round(parseFloat(data.RES_RS_FINE_FORGIVE[i]) * 100) / 100;
        data.RES_RS_FINE_REMAIN.push(data.LOCAL_RS_FINE_REMAIN[i]);
        data.RES_RS_FINE_REMAIN[i] = Math.round(parseFloat(data.RES_RS_FINE_REMAIN[i]) * 100) / 100;
        data.RES_RS_OVER_COM_FORGIVE.push(data.LOCAL_RS_OVER_COM_FORGIVE[i]);
        data.RES_RS_OVER_COM_FORGIVE[i] = Math.round(parseFloat(data.RES_RS_OVER_COM_FORGIVE[i]) * 100) / 100;
        data.RES_RS_OVER_COM_REMAIN.push(data.LOCAL_RS_OVER_COM_REMAIN[i]);
        data.RES_RS_OVER_COM_REMAIN[i] = Math.round(parseFloat(data.RES_RS_OVER_COM_REMAIN[i]) * 100) / 100;
        data.RES_RS_OVER_PROC_FORGIVE.push(data.LOCAL_RS_OVER_PROC_FORGIVE[i]);
        data.RES_RS_OVER_PROC_FORGIVE[i] = Math.round(parseFloat(data.RES_RS_OVER_PROC_FORGIVE[i]) * 100) / 100;
        data.RES_RS_OVER_PROC_REMAIN.push(data.LOCAL_RS_OVER_PROC_REMAIN[i]);
        data.RES_RS_OVER_PROC_REMAIN[i] = Math.round(parseFloat(data.RES_RS_OVER_PROC_REMAIN[i]) * 100) / 100;
        data.RES_RS_SHTR_FORGIVE.push(data.LOCAL_RS_SHTR_FORGIVE[i]);
        data.RES_RS_SHTR_FORGIVE[i] = Math.round(parseFloat(data.RES_RS_SHTR_FORGIVE[i]) * 100) / 100;
        data.RES_RS_SHTR_REMINE.push(data.LOCAL_RS_SHTR_REMINE[i]);
        data.RES_RS_SHTR_REMINE[i] = Math.round(parseFloat(data.RES_RS_SHTR_REMINE[i]) * 100) / 100;

        data.RES_RS_SUM_FORGIVE.push(data.LOCAL_RS_SUM_FORGIVE[i]);
        data.RES_RS_SUM_FORGIVE[i] = Math.round(parseFloat(data.RES_RS_SUM_FORGIVE[i]) * 100) / 100;
        data.RES_RS_SUM_REMINE.push(data.LOCAL_RS_SUM_REMINE[i]);
        data.RES_RS_SUM_REMINE[i] = Math.round(parseFloat(data.RES_RS_SUM_REMINE[i]) * 100) / 100;
        data.RES_RESTRUCT_REFERENCE.push(data.DATA_RESTRUCT[i].REFERENCE);
        data.RES_RS_CURR.push(data.DATA_RESTRUCT[i].CURR);

    }
}

data.RES_BI = 'N';

data.LOCAL_RS_NEW_CRED_SUM = Math.round(parseFloat(data.LOCAL_RS_NEW_CRED_SUM) * 100) / 100;
data.RES_RS_NEW_CRED_SUM = String(data.LOCAL_RS_NEW_CRED_SUM);
data.LOCAL_RS_CRED_FIRST_PAY_B = Math.round(parseFloat(data.LOCAL_RS_CRED_FIRST_PAY_B) * 100) / 100;
data.RES_RS_NEW_CRED_FIRST_PAY = String(data.LOCAL_RS_CRED_FIRST_PAY_B);
data.LOCAL_RS_NEW_CRED_PAYMONTH = Math.round(parseFloat(data.LOCAL_RS_NEW_CRED_PAYMONTH) * 100) / 100;
data.RES_RS_NEW_CRED_PAYMONTH = String(data.LOCAL_RS_NEW_CRED_PAYMONTH);


data.PROD_CHAR_BRANCH_START = data.PROD_CHAR_BRANCH;

if (data.newBranch != undefined && data.newBranch!= ''){
    data.PROD_CHAR_BRANCH = data.newBranch;
}


if (data.PROD_SCHEME_TERM == 6 && data.LOCAL_ONE_PAY == 'Y' && (data.PROD_CHAR_BANK== 'PB' || data.PROD_CHAR_BANK== 'AB')) {
    data.PROD_SCHEME_TERM = 0;
    data.RES_CHAR_CRED_TYPE = 'CRPL';
    data.PROD_CHAR_BRANCH = data.PROD_CHAR_BRANCH_START;
    data.LOCAL_RS_CRED_FIRST_PAY_B = data.LOCAL_RS_NEW_CRED_SUM;
    data.RES_RS_NEW_CRED_FIRST_PAY = String(data.LOCAL_RS_CRED_FIRST_PAY_B);
    data.RES_RS_NEW_CRED_SUM = '0';
    data.RES_RS_NEW_CRED_PAYMONTH = '0';
    data.RES_RS_NEW_CRED_TERM = 0;
}
//delete data.DATA_RESTRUCT;
//delete data.DATA_DEBCARD;


