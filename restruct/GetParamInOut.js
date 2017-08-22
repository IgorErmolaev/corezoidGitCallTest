data.input =  {};
data.output = {};

data.input.DATA_RESTRUCT = new Array();
data.input.DATA_DEBCARD = new Array();

data.input.APP_CUST_BIRTHDAY = data.APP_CUST_BIRTHDAY;
data.input.PROD_SCHEME_TERM = data.PROD_SCHEME_TERM;
data.input.PROD_CHAR_BRANCH = data.PROD_CHAR_BRANCH;
data.input.APP_CUST_GENDER = data.APP_CUST_GENDER;
data.input.APP_MARITAL_MARITALCOND = data.APP_MARITAL_MARITALCOND;
data.input.APP_SOCSTATUS_RESIDENT = data.APP_SOCSTATUS_RESIDENT;
data.input.APP_CUST_INN = data.APP_CUST_INN;
data.input.PROD_CHAR_BANK = data.PROD_CHAR_BANK;
data.input.APP_SOCSTATUS_CHILDNUMBER = data.APP_SOCSTATUS_CHILDNUMBER;
data.input.PROD_CHAR_TYPE = data.PROD_CHAR_TYPE;
data.input.APP_CUST_ID = data.APP_CUST_ID;
data.input.PROD_CHAR_ADVANCEAMOUNT = data.PROD_CHAR_ADVANCEAMOUNT;

for (var i=0; i<data.DATA_RESTRUCT.length;i++){
    data.input.DATA_RESTRUCT.push(data.DATA_RESTRUCT[i]);
}
for (var i=0; i<data.DATA_DEBCARD.length;i++){
    data.input.DATA_DEBCARD.push(data.DATA_DEBCARD[i]);
}

delete data.DATA_DEBCARD;
delete data.DATA_RESTRUCT;

var tmp = Object.getOwnPropertyNames(data);
var tmpInp = Object.getOwnPropertyNames(data.input);

for (var i=0; i< tmp.length; i++){
    if (tmpInp.indexOf(tmp[i])== -1 && tmp[i] != 'input' && tmp[i] != 'output' && tmp[i] != 'SID'){
        data.output[tmp[i]] = data[tmp[i]];
    }
}




/*
data.output.RES_RS_FINE_FORGIVE = data.RES_RS_FINE_FORGIVE;
data.output.RES_RS_FINE_REMAIN = data.RES_RS_FINE_REMAIN;
data.output.RES_RS_OVER_COM_FORGIVE = data.RES_RS_OVER_COM_FORGIVE;
data.output.RES_RS_OVER_COM_REMAIN = data.RES_RS_OVER_COM_REMAIN;
data.output.RES_RS_OVER_PROC_FORGIVE = data.RES_RS_OVER_PROC_FORGIVE;
data.output.RES_RS_OVER_PROC_REMAIN = data.RES_RS_OVER_PROC_REMAIN;
data.output.RES_RS_SHTR_FORGIVE = data.RES_RS_SHTR_FORGIVE;
data.output.RES_RS_SHTR_REMINE = data.RES_RS_SHTR_REMINE;
data.output.RES_RS_SUM_FORGIVE = data.RES_RS_SUM_FORGIVE;
data.output.RES_RS_SUM_REMINE = data.RES_RS_SUM_REMINE;
data.output.RES_RESTRUCT_REFERENCE = data.RES_RESTRUCT_REFERENCE;
data.output.RES_RS_CURR = data.RES_RS_CURR;
data.output.RES_DEBCARD_POGASH_TYPE = data.RES_DEBCARD_POGASH_TYPE;
data.output.RES_DEBCARD_POGASHENIE = data.RES_DEBCARD_POGASHENIE;
data.output.RES_CHAR_CRED_TYPE = data.RES_CHAR_CRED_TYPE;
data.output.RES_PERSENT = data.RES_PERSENT;
data.output.RES_RS_NEW_CRED_TERM = data.RES_RS_NEW_CRED_TERM;
data.output.RES_DEC_FINAL_FLOW = data.RES_DEC_FINAL_FLOW;
data.output.RES_RS_TOTAL_PROC_FORGIVE = data.RES_RS_TOTAL_PROC_FORGIVE;
data.output.RES_RS_TOTAL_PROC_REMINE = data.RES_RS_TOTAL_PROC_REMINE;
data.output.RES_RS_TOTAL_COM_FORGIVE = data.RES_RS_TOTAL_COM_FORGIVE;
data.output.RES_RS_TOTAL_COM_REMINE = data.RES_RS_TOTAL_COM_REMINE;
data.output.RES_RS_TOTAL_FINE_FORGIVE = data.RES_RS_TOTAL_FINE_FORGIVE;
data.output.RES_RS_TOTAL_FINE_REMINE = data.RES_RS_TOTAL_FINE_REMINE;
data.output.RES_RS_TOTAL_SHTR_FORGIVE = data.RES_RS_TOTAL_SHTR_FORGIVE;
data.output.RES_RS_TOTAL_SHTR_REMINE = data.RES_RS_TOTAL_SHTR_REMINE;
data.output.RES_RS_TOTAL_SUM_FORGIVE = data.RES_RS_TOTAL_SUM_FORGIVE;
data.output.RES_RS_TOTAL_SUM_REMINE = data.RES_RS_TOTAL_SUM_REMINE;
data.output.RES_BI = data.RES_BI;
data.output.RES_RS_NEW_CRED_SUM = data.RES_RS_NEW_CRED_SUM;
data.output.RES_RS_NEW_CRED_FIRST_PAY = data.RES_RS_NEW_CRED_FIRST_PAY;
data.output.RES_RS_NEW_CRED_PAYMONTH = data.RES_RS_NEW_CRED_PAYMONTH;

data.output.LOCAL_BAL_ALL = data.LOCAL_BAL_ALL;
data.output.LOCAL_BAL_PROC = data.LOCAL_BAL_PROC;
data.output.LOCAL_BAL_COM = data.LOCAL_BAL_COM;
data.output.LOCAL_BAL_BODY = data.LOCAL_BAL_BODY;
data.output.LOCAL_BAL_FINE = data.LOCAL_BAL_FINE;
data.output.LOCAL_MONTHLY_RATE_PERCENT = data.LOCAL_MONTHLY_RATE_PERCENT;
data.output.LOCAL_PAN_FLAG = data.LOCAL_PAN_FLAG;
data.output.LOCAL_TYPE_RESTR = data.LOCAL_TYPE_RESTR;
data.output.LOCAL_ONE_PAY = data.LOCAL_ONE_PAY;
data.output.LOCAL_MIN_SUM_COM = data.LOCAL_MIN_SUM_COM;
data.output.LOCAL_MIN_NEW_CRED_SUM = data.LOCAL_MIN_NEW_CRED_SUM;
*/
