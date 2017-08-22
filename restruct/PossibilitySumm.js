data.LOCAL_BAL_ALL = new Array();
data.LOCAL_BAL_PROC = new Array();
data.LOCAL_BAL_COM = new Array();
data.LOCAL_BAL_BODY = new Array();
data.LOCAL_BAL_FINE = new Array();
data.LOCAL_SUM_MANDATORY_PROC = new Array();
data.LOCAL_SUM_POSSIBLY_PROC_FORGIVE = new Array();
data.LOCAL_SUM_POSSIBLY_COM_FORGIVE = new Array();
data.LOCAL_SUM_POSSIBLY_FINE_FORGIVE = new Array();
data.LOCAL_SUM_POSSIBLY_COM_PROC_FORGIVE = new Array();
data.LOCAL_BAL_BODY_WITHOUT_SHTR = new Array();



for (var i=0; i<data.DATA_RESTRUCT.length; i++){
    var bal_all = data.DATA_RESTRUCT[i].NORM_BODY + data.DATA_RESTRUCT[i].NORM_COM+ data.DATA_RESTRUCT[i].NORM_PROC + data.DATA_RESTRUCT[i].OVER_BODY + data.DATA_RESTRUCT[i].OVER_COM + data.DATA_RESTRUCT[i].OVER_PROC + data.DATA_RESTRUCT[i].FINE;
    data.LOCAL_BAL_ALL.push(bal_all);
    var bal_proc = data.DATA_RESTRUCT[i].NORM_PROC +data.DATA_RESTRUCT[i].OVER_PROC;
    data.LOCAL_BAL_PROC.push(bal_proc);
    var bal_com = data.DATA_RESTRUCT[i].NORM_COM +data.DATA_RESTRUCT[i].OVER_COM;
    data.LOCAL_BAL_COM.push(bal_com);
    var bal_body = data.DATA_RESTRUCT[i].NORM_BODY +data.DATA_RESTRUCT[i].OVER_BODY;
    data.LOCAL_BAL_BODY.push(bal_body);
    data.LOCAL_BAL_FINE.push(data.DATA_RESTRUCT[i].FINE);

    if (data.DATA_RESTRUCT[i].CTYPE != 'SHTR' && data.DATA_RESTRUCT[i].CTYPE != 'SHTN'){
        var without_shtr = data.DATA_RESTRUCT[i].NORM_BODY +data.DATA_RESTRUCT[i].OVER_BODY;
        data.LOCAL_BAL_BODY_WITHOUT_SHTR.push(without_shtr);
    }
    else {
        data.LOCAL_BAL_BODY_WITHOUT_SHTR.push(0);
    }
}

/*excludes*/
if (data.APP_CUST_INN == '2688108553'){
    data.LOCAL_BAL_BODY_WITHOUT_SHTR[0] = 2083.52;
    data.LOCAL_BAL_BODY_WITHOUT_SHTR[1] = 12330.06;
}
/**********/

if(data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB'){
    data.LOCAL_MIN_SUM_COM = 30;
    data.LOCAL_MIN_NEW_CRED_SUM = 50;
}

for (i=0;i<data.DATA_RESTRUCT.length; i++){
    data.LOCAL_SUM_MANDATORY_PROC.push(0);
    data.LOCAL_SUM_POSSIBLY_PROC_FORGIVE.push(0);
    data.LOCAL_SUM_POSSIBLY_COM_FORGIVE.push(0);
    data.LOCAL_SUM_POSSIBLY_FINE_FORGIVE.push(0);
    data.LOCAL_SUM_POSSIBLY_COM_PROC_FORGIVE.push(0);

    /*excludes*/
    if ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && data.APP_CUST_INN == '2958116134' && data.DATA_RESTRUCT[i].REFERENCE == 'SAMDN34000021859883'){
        data.DATA_RESTRUCT[i].RATEFINE = 43.2;
        data.DATA_RESTRUCT[i].RATE = 21.6;
        data.LOCAL_SUM_POSSIBLY_COM_FORGIVE[i] = 0.05 *  data.LOCAL_BAL_COM[i];
    }
    /**********/
    /*---------------P48------------*/
    if (data.DATA_RESTRUCT[i].COMPLEX == 'P48'){
        /*calc possible amount of forgiveness percent*/
        if (data.LOCAL_BAL_BODY[i] > 0 && data.DATA_RESTRUCT[i].RATEFINE > data.DATA_RESTRUCT[i].RATE){
            data.LOCAL_SUM_MANDATORY_PROC[i] = data.DATA_RESTRUCT[i].EXAGE*data.DATA_RESTRUCT[i].RATE*data.LOCAL_BAL_BODY[i] /36000;

            data.LOCAL_SUM_POSSIBLY_PROC_FORGIVE[i] = data.LOCAL_BAL_PROC[i] + data.DATA_RESTRUCT[i].SUMREPEX - data.LOCAL_SUM_MANDATORY_PROC[i];
            data.LOCAL_SUM_POSSIBLY_PROC_FORGIVE[i] = Math.max(data.LOCAL_SUM_POSSIBLY_PROC_FORGIVE[i],0);
            data.LOCAL_SUM_POSSIBLY_PROC_FORGIVE[i] = Math.min(data.LOCAL_SUM_POSSIBLY_PROC_FORGIVE[i],data.LOCAL_BAL_PROC[i]);
        }
        if (data.DATA_RESTRUCT[i].RATEFINE == data.DATA_RESTRUCT[i].RATE){
            data.LOCAL_SUM_POSSIBLY_COM_PROC_FORGIVE[i] = Math.max(data.LOCAL_MIN_SUM_COM,0.01*data.LOCAL_BAL_BODY[i])*data.DATA_RESTRUCT[i].EXAGE/30;
            /*excludes*/
            if ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && data.APP_CUST_INN == '3272712492' && data.DATA_RESTRUCT[i].REFERENCE == 'SAMDN44000028810905'){
                data.LOCAL_SUM_POSSIBLY_COM_PROC_FORGIVE[i] = Math.max(30,0.06*data.LOCAL_BAL_BODY[i])*data.DATA_RESTRUCT[i].EXAGE/30;
            }
            if ((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && data.APP_CUST_INN == '3106108294' && data.DATA_RESTRUCT[i].REFERENCE == 'SAMDN40000010527505'){
                data.LOCAL_SUM_POSSIBLY_COM_PROC_FORGIVE[i] = 10075.81;
            }
            /**********/
            data.LOCAL_SUM_POSSIBLY_COM_PROC_FORGIVE[i] = Math.max(data.LOCAL_SUM_POSSIBLY_COM_PROC_FORGIVE[i],0);
            data.LOCAL_SUM_POSSIBLY_COM_PROC_FORGIVE[i] = Math.min(data.LOCAL_SUM_POSSIBLY_COM_PROC_FORGIVE[i],(data.LOCAL_BAL_COM[i] + data.LOCAL_BAL_PROC[i]))
        }
        data.LOCAL_SUM_POSSIBLY_FINE_FORGIVE[i] = data.LOCAL_BAL_FINE[i];
    }
    /*---------------SYB------------*/
    if (data.DATA_RESTRUCT[i].COMPLEX == 'SYB'){
        data.LOCAL_SUM_POSSIBLY_FINE_FORGIVE[i] = data.LOCAL_BAL_FINE[i];
        /*****VIP*****/
        if (data.LOCAL_SUM_POSSIBLY_FINE_FORGIVE[i] == 0 && data.DATA_RESTRUCT[i].CTYPE == 'VK'){
            if (data.LOCAL_BAL_BODY[i] > 0 && data.DATA_RESTRUCT[i].RATEFINE > data.DATA_RESTRUCT[i].RATE){
                data.LOCAL_SUM_MANDATORY_PROC[i] = data.DATA_RESTRUCT[i].EXAGE*data.DATA_RESTRUCT[i].RATEFINE*data.LOCAL_BAL_BODY[i] /(36000*2);

                data.LOCAL_SUM_POSSIBLY_PROC_FORGIVE[i] = data.LOCAL_BAL_PROC[i] + data.DATA_RESTRUCT[i].SUMREPEX - data.LOCAL_SUM_MANDATORY_PROC[i];
                data.LOCAL_SUM_POSSIBLY_PROC_FORGIVE[i] = Math.max(data.LOCAL_SUM_POSSIBLY_PROC_FORGIVE[i],0);
                data.LOCAL_SUM_POSSIBLY_PROC_FORGIVE[i] = Math.min(data.LOCAL_SUM_POSSIBLY_PROC_FORGIVE[i],data.LOCAL_BAL_PROC[i]);
            }
        }
        /*************/
    }

}


var maxBal = 0;
for (var i = 0; data.LOCAL_BAL_ALL.length; i++){
    if (maxBal < data.LOCAL_BAL_ALL[i]){
        data.bankMax = data.DATA_RESTRUCT[i].BANK;
        data.ctypeMax = data.DATA_RESTRUCT[i].CTYPE;
    }
}