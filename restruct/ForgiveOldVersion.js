
function ForgiveBigAvans (RS_FORGIVE,REMAIN,SUM,DIFF_SUM,DIFF_SUM_TMP){
    // var REMAIN = new Array();
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
}

function Diff001Kop (DIFF_SUM_TMP,RS_FORGIVE_SUM,RS_FORGIVE,REMAIN){
    if (RS_FORGIVE_SUM>=0.01){
        for (var j=0; j<RS_FORGIVE.length;j++){
            if (RS_FORGIVE[j] > 0 && DIFF_SUM_TMP>0){
                REMAIN[j] +=  DIFF_SUM_TMP;
                RS_FORGIVE[j] -= DIFF_SUM_TMP;
                DIFF_SUM_TMP =0;
            }
        }
    }
}




data['LOCAL_RS_OVER_PROC_FORGIVE'] = new Array();
data['LOCAL_RS_OVER_PROC_REMAIN'] = new Array();
data['LOCAL_RS_OVER_COM_FORGIVE'] = new Array();
data['LOCAL_RS_OVER_COM_REMAIN'] = new Array();
data['LOCAL_RS_COM_PROC_FORGIVE'] = new Array();
data['LOCAL_DOLIA'] = new Array();
data['LOCAL_RS_FINE_FORGIVE'] = new Array();
data['LOCAL_RS_FINE_REMAIN'] = new Array();
data['LOCAL_RS_SUM_FORGIVE'] = new Array();
data['LOCAL_RS_SHTR_FORGIVE'] = new Array();
data['LOCAL_RS_SHTR_REMINE'] = new Array();
data['LOCAL_RS_SUM_FORGIVE'] = new Array();
data['LOCAL_RS_SUM_REMINE'] = new Array();


//DataProc(data['PROD_SCHEME_TERM']);


if (data['PROD_SCHEME_TERM'] == 6){
    var preProc =0.98;
    var perCom =0.98;
    var perFineMore001 =0.98;
    var perFineLess001 =0.9;
    var perShtr =0.9;
    var annPercRate = 0.01;
    var koefPayVal = 0.1666667;
}
else {
    if (data['PROD_SCHEME_TERM'] == 12){
        var preProc =0.8;
        var perCom =0.8;
        var perFineMore001 =0.8;
        var perFineLess001 =0.8;
        var perShtr =0.9;
        var annPercRate = 10;
        var koefPayVal = 0.0879786;
    }
    else {
        if (data['PROD_SCHEME_TERM'] == 24){
            var preProc =0.6;
            var perCom =0.6;
            var perFineMore001 =0.6;
            var perFineLess001 =0.6;
            var perShtr =0.9;
            var annPercRate = 18;
            var koefPayVal =0.05004;
        }
        else {
            if (data['PROD_SCHEME_TERM'] == 36){
                var preProc =0.5;
                var perCom =0.5;
                var perFineMore001 =0.5;
                var perFineLess001 =0.5;
                var perShtr =0.9;
                var annPercRate = 18;
                var koefPayVal =0.03628;
            }
            else {
                if (data['PROD_SCHEME_TERM'] == 60){
                    var preProc =0.5;
                    var perCom =0.5;
                    var perFineMore001 =0.5;
                    var perFineLess001 =0.5;
                    var perShtr =0.9;
                    var annPercRate = 18;
                    var koefPayVal =0.0255296;
                }
                else {
                    var preProc =0;
                    var perCom =0;
                    var perFineMore001 =0;
                    var perFineLess001 =0;
                    var perShtr =0;
                    var annPercRate = 0;
                    var koefPayVal = 0;
                }
            }
        }
    }
}





/*excludes*/
if ((data['PROD_CHAR_BANK'] == 'PB' || data['PROD_CHAR_BANK'] == 'AB') && (data['APP_CUST_INN'] == '3272712492' || data['APP_CUST_INN'] == '3014518792')){
    preProc =0.98;
    perCom =0.98;
    perFineMore001 =0.98;
    perFineLess001 =0.9;
}
/**********/
var RS_OVER_PROC_FORGIVE, RS_OVER_PROC_REMAIN, RS_OVER_COM_FORGIVE, RS_OVER_COM_REMAIN, RS_COM_PROC_FORGIVE, DOLIA, RS_FINE_FORGIVE, RS_FINE_REMAIN, RS_SUM_FORGIVE,RS_SUM_REMINE,RS_SHTR_FORGIVE, RS_SHTR_REMINE;

for (var i=0; i<data['DATA_RESTRUCT'].length; i++){
    data['LOCAL_RS_OVER_PROC_FORGIVE'].push(0);
    data['LOCAL_RS_OVER_PROC_REMAIN'].push(0);

    data['LOCAL_RS_OVER_COM_FORGIVE'].push(0);
    data['LOCAL_RS_OVER_COM_REMAIN'].push(0);

    data['LOCAL_RS_COM_PROC_FORGIVE'].push(0);
    data['LOCAL_DOLIA'].push(0);

    data['LOCAL_RS_FINE_FORGIVE'].push(0);
    data['LOCAL_RS_FINE_REMAIN'].push(0);

    data['LOCAL_RS_SUM_FORGIVE'].push(0);
    data['LOCAL_RS_SUM_REMINE'].push(0);

    if (data['DATA_RESTRUCT'][i]['CTYPE'] != 'SHTR' && data['DATA_RESTRUCT'][i]['CTYPE'] != 'SHTN'){
        /*---------------forgiveness of percent--------------------*/
        data['LOCAL_RS_OVER_PROC_FORGIVE'][i] = data['LOCAL_SUM_POSSIBLY_PROC_FORGIVE'][i]* preProc;
        data['LOCAL_RS_OVER_PROC_REMAIN'][i] = data['LOCAL_BAL_PROC'][i] - data['LOCAL_RS_OVER_PROC_FORGIVE'][i];

        /*---------------forgiveness of commission---------------*/
        data['LOCAL_RS_OVER_COM_FORGIVE'][i] = data['LOCAL_SUM_POSSIBLY_COM_FORGIVE'][i]* perCom;
        data['LOCAL_RS_OVER_COM_REMAIN'][i] = data['LOCAL_BAL_COM'][i] - data['LOCAL_RS_OVER_COM_FORGIVE'][i];

        /*---------------forgiveness of commission---------------*/
        if (data['LOCAL_SUM_POSSIBLY_COM_PROC_FORGIVE'][i] > 0 && data['LOCAL_BAL_COM'][i]+data['LOCAL_BAL_PROC'][i]>0){
            data['LOCAL_RS_COM_PROC_FORGIVE'][i] = data['LOCAL_SUM_POSSIBLY_COM_PROC_FORGIVE'][i]* perCom;
            data['LOCAL_DOLIA'][i] = data['LOCAL_RS_COM_PROC_FORGIVE'][i]/(data['LOCAL_BAL_COM'][i] + data['LOCAL_BAL_PROC'][i]);

            data['LOCAL_RS_OVER_PROC_FORGIVE'][i] = data['LOCAL_DOLIA'][i]*data['LOCAL_BAL_PROC'][i];
            data['LOCAL_RS_OVER_PROC_REMAIN'][i] = data['LOCAL_BAL_PROC'][i] - data['LOCAL_RS_OVER_PROC_FORGIVE'][i];

            data['LOCAL_RS_OVER_COM_FORGIVE'][i] = data['LOCAL_DOLIA'][i]*data['LOCAL_BAL_COM'][i];
            data['LOCAL_RS_OVER_COM_REMAIN'][i] = data['LOCAL_BAL_COM'][i] - data['LOCAL_RS_OVER_COM_FORGIVE'][i];
        }

        /*---------------forgiveness of fines---------------*/
        if (data['DATA_RESTRUCT'][i]['RATE'] > 0.01 || data['DATA_RESTRUCT'][i]['COMPLEX'] == 'P48'){
            data['LOCAL_RS_FINE_FORGIVE'][i] = data['LOCAL_SUM_POSSIBLY_FINE_FORGIVE'][i] * perFineMore001;
            data['LOCAL_RS_FINE_REMAIN'][i] = data['LOCAL_BAL_FINE'][i] - data['LOCAL_RS_FINE_FORGIVE'][i];
        }
        else {
            data['LOCAL_RS_FINE_FORGIVE'][i] = data['LOCAL_SUM_POSSIBLY_FINE_FORGIVE'][i] * perFineLess001;
            data['LOCAL_RS_FINE_REMAIN'][i] = data['LOCAL_BAL_FINE'][i] - data['LOCAL_RS_FINE_FORGIVE'][i];
        }
        /*-----------calculation amount of forgive ----------*/
        data['LOCAL_RS_SUM_FORGIVE'][i] = data['LOCAL_RS_OVER_PROC_FORGIVE'][i] + data['LOCAL_RS_OVER_COM_FORGIVE'][i] + data['LOCAL_RS_FINE_FORGIVE'][i];
        /*-----------calculation amount of remain sum ----------*/
        data['LOCAL_RS_SUM_REMINE'][i] = data['LOCAL_BAL_ALL'][i] - data['LOCAL_RS_SUM_FORGIVE'][i];
    }
    /*---------------forgiveness SHTR--------------------*/
    if (data['DATA_RESTRUCT'][i]['CTYPE'] == 'SHTR' || data['DATA_RESTRUCT'][i]['CTYPE'] == 'SHTN'){
        RS_SHTR_FORGIVE = data['LOCAL_BAL_ALL'][i] * perShtr;
        data['LOCAL_RS_SHTR_FORGIVE'].push(RS_SHTR_FORGIVE);
        RS_SHTR_REMINE = data['LOCAL_BAL_ALL'][i] - data['LOCAL_RS_SHTR_FORGIVE'][i];
        data['LOCAL_RS_SHTR_REMINE'].push(RS_SHTR_REMINE);
        data['LOCAL_RS_SUM_FORGIVE'][i] = data['LOCAL_RS_SHTR_FORGIVE'][i];
        data['LOCAL_RS_SUM_REMINE'][i] = data['LOCAL_RS_SHTR_REMINE'][i];
    }
    else {
        data['LOCAL_RS_SHTR_FORGIVE'].push(0);
        data['LOCAL_RS_SHTR_REMINE'].push(0);
    }
}

for (i=0; i <data['DATA_RESTRUCT'].length;i++){
    if (data['DATA_RESTRUCT'][i]['FL_GD'] == 1 || data['DATA_RESTRUCT'][i]['FL_GD'] == 3 || data['DATA_RESTRUCT'][i]['FL_GD'] == 5){
        data['LOCAL_RS_SUM_REMINE'][i] = data['LOCAL_RS_SUM_REMINE'][i] + data['LOCAL_RS_SUM_FORGIVE'][i];
        data['LOCAL_RS_SUM_FORGIVE'][i] = 0;
        data['LOCAL_RS_OVER_PROC_REMAIN'][i] += data['LOCAL_RS_OVER_PROC_FORGIVE'][i];
        data['LOCAL_RS_OVER_PROC_FORGIVE'][i] = 0;
        data['LOCAL_RS_OVER_COM_REMAIN'][i] += data['LOCAL_RS_OVER_COM_FORGIVE'][i];
        data['LOCAL_RS_OVER_COM_FORGIVE'][i] = 0;
        data['LOCAL_RS_FINE_REMAIN'][i] += data['LOCAL_RS_FINE_FORGIVE'][i];
        data['LOCAL_RS_FINE_FORGIVE'][i] = 0;
        data['LOCAL_RS_SHTR_REMINE'][i]+=data['LOCAL_RS_SHTR_FORGIVE'][i];
        data['LOCAL_RS_SHTR_FORGIVE'][i] = 0;
    }
}

data['LOCAL_RS_TOTAL_SUM_REMINE'] = 0;
data['LOCAL_RS_TOTAL_SUM_FORGIVE'] = 0;

/*-------------------SUM---------------------*/
for (i=0; i<data['LOCAL_RS_SUM_REMINE'].length; i++){
    data['LOCAL_RS_TOTAL_SUM_REMINE'] += data['LOCAL_RS_SUM_REMINE'][i];
    data['LOCAL_RS_TOTAL_SUM_FORGIVE'] += data['LOCAL_RS_SUM_FORGIVE'][i];
}
var LOCAL_SUM_COM,LOCAL_SUM_FINE,LOCAL_SUM_PROC;
for (i=0; i<data['LOCAL_RS_OVER_COM_FORGIVE'].length;i++ ){
    LOCAL_SUM_COM += data['LOCAL_RS_OVER_COM_FORGIVE'][i];
    LOCAL_SUM_FINE += data['LOCAL_RS_FINE_FORGIVE'][i];
    LOCAL_SUM_PROC += data['LOCAL_RS_OVER_PROC_FORGIVE'][i];
}
data['LOCAL_RS_CRED_FIRST_PAY_B'] = data['PROD_CHAR_ADVANCEAMOUNT'];

//================onepay with  big avans==================
/*if (data['LOCAL_RS_CRED_FIRST_PAY_B'] > data['LOCAL_RS_TOTAL_SUM_REMINE'] && data['LOCAL_ONE_PAY'] == 'Y'){
 var DIFF_SUM = data['LOCAL_RS_CRED_FIRST_PAY_B'] - data['LOCAL_RS_TOTAL_SUM_REMINE'];
 var DIFF_SUM_TMP = DIFF_SUM;

 /*---------- fogive fine-----------*/
/*   if (LOCAL_SUM_FINE > 0){
 ForgiveBigAvans(data['LOCAL_RS_FINE_FORGIVE'],data['LOCAL_RS_FINE_REMAIN'],LOCAL_SUM_FINE,DIFF_SUM,DIFF_SUM_TMP);
 if (DIFF_SUM_TMP = 0.01){
 var LOCAL_SUM_FINE_FORGIVE;
 for (i=0; i<data['LOCAL_RS_FINE_FORGIVE'].length;i++){
 LOCAL_SUM_FINE_FORGIVE += data['LOCAL_RS_FINE_FORGIVE'][i];
 }
 Diff001Kop(DIFF_SUM_TMP,LOCAL_SUM_FINE_FORGIVE,data['LOCAL_RS_FINE_FORGIVE'],data['LOCAL_RS_FINE_REMAIN']);
 }
 DIFF_SUM =DIFF_SUM_TMP;
 }

 /*---------- fogive SHTR-----------*/
/*   if (DIFF_SUM >0){
 for (i=0;i<data['DATA_RESTRUCT'].length;i++)
 {
 if (data['DATA_RESTRUCT'][i]['CTYPE'] == 'SHTR' || data['DATA_RESTRUCT'][i]['CTYPE'] == 'SHTN') {
 if (data['LOCAL_RS_SHTR_FORGIVE'][i]-DIFF_SUM >0){
 data['LOCAL_RS_SHTR_FORGIVE'][i] -= DIFF_SUM;
 data['LOCAL_RS_SHTR_REMINE'][i] += DIFF_SUM;
 DIFF_SUM = 0;
 }
 else {
 data['LOCAL_RS_SHTR_REMINE'][i] += data['LOCAL_RS_SHTR_FORGIVE'][i];
 DIFF_SUM -= data['LOCAL_RS_SHTR_FORGIVE'][i];
 data['LOCAL_RS_SHTR_FORGIVE'][i] = 0;
 }
 }
 }
 var LOCAL_SUM_SHTR_FORGIVE;
 for (i=0; i<data['LOCAL_RS_SHTR_FORGIVE'].length;i++){
 LOCAL_SUM_SHTR_FORGIVE += data['LOCAL_RS_FINE_FORGIVE'][i];
 }
 Diff001Kop(DIFF_SUM,LOCAL_SUM_SHTR_FORGIVE,data['LOCAL_RS_SHTR_FORGIVE'],data['LOCAL_RS_SHTR_REMINE']);
 DIFF_SUM_TMP = DIFF_SUM;
 }

 /*---------- fogive PROC-----------*/
/*   if (LOCAL_SUM_PROC > 0 && DIFF_SUM >0){
 ForgiveBigAvans(data['LOCAL_RS_OVER_PROC_FORGIVE'],data['LOCAL_RS_OVER_PROC_REMAIN'],LOCAL_SUM_PROC,DIFF_SUM,DIFF_SUM_TMP);
 if (DIFF_SUM_TMP = 0.01){
 var LOCAL_SUM_PROC_FORGIVE;
 for (i=0; i<data['LOCAL_RS_OVER_PROC_FORGIVE'].length;i++){
 LOCAL_SUM_PROC_FORGIVE += data['LOCAL_RS_OVER_PROC_FORGIVE'][i];
 }
 Diff001Kop(DIFF_SUM_TMP,LOCAL_SUM_PROC_FORGIVE,data['LOCAL_RS_OVER_PROC_FORGIVE'],data['LOCAL_RS_OVER_PROC_REMAIN']);
 }
 DIFF_SUM =DIFF_SUM_TMP;
 }

 /*---------- fogive COM-----------*/
/*   if (LOCAL_SUM_COM > 0 && DIFF_SUM >0){
 ForgiveBigAvans(data['LOCAL_RS_OVER_COM_FORGIVE'],data['LOCAL_RS_OVER_COM_REMAIN'],LOCAL_SUM_COM,DIFF_SUM,DIFF_SUM_TMP);
 if (DIFF_SUM_TMP = 0.01){
 var LOCAL_SUM_COM_FORGIVE;
 for (i=0; i<data['LOCAL_RS_OVER_COM_FORGIVE'].length;i++){
 LOCAL_SUM_COM_FORGIVE += data['LOCAL_RS_OVER_COM_FORGIVE'][i];
 }
 Diff001Kop(DIFF_SUM_TMP,LOCAL_SUM_COM_FORGIVE,data['LOCAL_RS_OVER_COM_FORGIVE'],data['LOCAL_RS_OVER_COM_REMAIN']);
 }
 DIFF_SUM =DIFF_SUM_TMP;
 }

 /*----------TOTAL SUM------------*/
/*    for (i=0; i<data['DATA_RESTRUCT'].length;i++){
 if (data['DATA_RESTRUCT'][i]['CTYPE'] != 'SHTR' && data['DATA_RESTRUCT'][i]['CTYPE'] != 'SHTN'){
 /*-----------calculation amount of forgive ----------*/
/*            RS_SUM_FORGIVE = data['LOCAL_RS_OVER_PROC_FORGIVE'][i] + data['LOCAL_RS_OVER_COM_FORGIVE'][i] + data['LOCAL_RS_FINE_FORGIVE'][i];
 data['LOCAL_RS_SUM_FORGIVE'].push(RS_SUM_FORGIVE);
 /*-----------calculation amount of remain sum ----------*/
/*            RS_SUM_REMINE = data['LOCAL_BAL_ALL'][i] - data['LOCAL_RS_SUM_FORGIVE'][i];
 data['LOCAL_RS_SUM_REMINE'].push(RS_SUM_REMINE);
 }
 else {
 data['LOCAL_RS_SUM_FORGIVE'][i] = data['LOCAL_RS_SHTR_FORGIVE'][i];
 data['LOCAL_RS_SUM_REMINE'][i] = data['LOCAL_RS_SHTR_REMINE'][i];
 }
 }
 data['LOCAL_RS_TOTAL_SUM_REMINE'] =0;
 data['LOCAL_RS_TOTAL_SUM_FORGIVE'] = 0;
 for (i=0; i<data['LOCAL_RS_SUM_REMINE'].length; i++){
 data['LOCAL_RS_TOTAL_SUM_REMINE'] += data['LOCAL_RS_SUM_REMINE'][i];
 data['LOCAL_RS_TOTAL_SUM_FORGIVE'] += data['LOCAL_RS_SUM_FORGIVE'][i];
 }
 }
 /*================other==================*//*
 else {*/
if(data['LOCAL_RS_TOTAL_SUM_REMINE'] - data['LOCAL_RS_CRED_FIRST_PAY_B'] < data['LOCAL_MIN_NEW_CRED_SUM']){
    if (data['LOCAL_RS_TOTAL_SUM_REMINE'] > data['LOCAL_MIN_NEW_CRED_SUM']){
        data['LOCAL_RS_NEW_CRED_SUM'] = data['LOCAL_MIN_NEW_CRED_SUM'];
        data['LOCAL_RS_CRED_FIRST_PAY_B'] = data['LOCAL_RS_TOTAL_SUM_REMINE'] - data['LOCAL_RS_NEW_CRED_SUM'];
    }
    else {
        data['LOCAL_RS_CRED_FIRST_PAY_B'] = 0.9*data['LOCAL_RS_TOTAL_SUM_REMINE'];
        data['LOCAL_RS_NEW_CRED_SUM'] = data['LOCAL_RS_TOTAL_SUM_REMINE'] - data['LOCAL_RS_CRED_FIRST_PAY_B'];
    }
}
else {
    data['LOCAL_RS_NEW_CRED_SUM'] = data['LOCAL_RS_TOTAL_SUM_REMINE'] - data['LOCAL_RS_CRED_FIRST_PAY_B'];
}
/*}

 /*------------------------calculation NEW cred annuity PAYmonth ----------*/
data['LOCAL_MONTHLY_RATE_PERCENT'] = annPercRate;
data['LOCAL_RS_NEW_CRED_PAYMONTH'] = data['LOCAL_RS_NEW_CRED_SUM']*koefPayVal;