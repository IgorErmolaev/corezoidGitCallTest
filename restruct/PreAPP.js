
for (var i=0; i<data.DATA_RESTRUCT.length; i++){
    if (data.DATA_RESTRUCT[i].BALCONTR == null || data.DATA_RESTRUCT[i].BALCONTR == '' || isFinite(data.DATA_RESTRUCT[i].BALCONTR) == false){
        data.DATA_RESTRUCT[i].BALCONTR = 0;
    }
    else {
        data.DATA_RESTRUCT[i].BALCONTR = Math.abs(data.DATA_RESTRUCT[i].BALCONTR);
    }
    if (data.DATA_RESTRUCT[i].EXAGE == null || data.DATA_RESTRUCT[i].EXAGE == '' || isFinite(data.DATA_RESTRUCT[i].EXAGE) == false){
        data.DATA_RESTRUCT[i].EXAGE = 0;
    }
    if (data.DATA_RESTRUCT[i].FINE == null || data.DATA_RESTRUCT[i].FINE == '' || isFinite(data.DATA_RESTRUCT[i].FINE) == false){
        data.DATA_RESTRUCT[i].FINE = 0;
    }
    else {
        data.DATA_RESTRUCT[i].FINE = Math.abs(data.DATA_RESTRUCT[i].FINE);
    }
    if (data.DATA_RESTRUCT[i].FL_GD == null || data.DATA_RESTRUCT[i].FL_GD == '' || isFinite(data.DATA_RESTRUCT[i].FL_GD) == false){
        data.DATA_RESTRUCT[i].FL_GD = 0;
    }
    if (data.DATA_RESTRUCT[i].NORM_BODY == null || data.DATA_RESTRUCT[i].NORM_BODY == '' || isFinite(data.DATA_RESTRUCT[i].NORM_BODY) == false){
        data.DATA_RESTRUCT[i].NORM_BODY = 0;
    }
    else {
        data.DATA_RESTRUCT[i].NORM_BODY = Math.abs(data.DATA_RESTRUCT[i].NORM_BODY);
    }
    if (data.DATA_RESTRUCT[i].NORM_COM == null || data.DATA_RESTRUCT[i].NORM_COM == '' || isFinite(data.DATA_RESTRUCT[i].NORM_COM) == false){
        data.DATA_RESTRUCT[i].NORM_COM = 0;
    }
    else {
        data.DATA_RESTRUCT[i].NORM_COM = Math.abs(data.DATA_RESTRUCT[i].NORM_COM);
    }
    if (data.DATA_RESTRUCT[i].NORM_PROC == null || data.DATA_RESTRUCT[i].NORM_PROC == '' || isFinite(data.DATA_RESTRUCT[i].NORM_PROC) == false){
        data.DATA_RESTRUCT[i].NORM_PROC = 0;
    }
    else {
        data.DATA_RESTRUCT[i].NORM_PROC = Math.abs(data.DATA_RESTRUCT[i].NORM_PROC);
    }
    if (data.DATA_RESTRUCT[i].OVER_BODY == null || data.DATA_RESTRUCT[i].OVER_BODY == '' || isFinite(data.DATA_RESTRUCT[i].OVER_BODY) == false){
        data.DATA_RESTRUCT[i].OVER_BODY = 0;
    }
    else {
        data.DATA_RESTRUCT[i].OVER_BODY = Math.abs(data.DATA_RESTRUCT[i].OVER_BODY);
    }
    if (data.DATA_RESTRUCT[i].OVER_COM == null || data.DATA_RESTRUCT[i].OVER_COM == '' || isFinite(data.DATA_RESTRUCT[i].OVER_COM) == false){
        data.DATA_RESTRUCT[i].OVER_COM = 0;
    }
    else {
        data.DATA_RESTRUCT[i].OVER_COM = Math.abs(data.DATA_RESTRUCT[i].OVER_COM);
    }
    if (data.DATA_RESTRUCT[i].OVER_PROC == null || data.DATA_RESTRUCT[i].OVER_PROC == '' || isFinite(data.DATA_RESTRUCT[i].OVER_PROC) == false){
        data.DATA_RESTRUCT[i].OVER_PROC = 0;
    }
    else {
        data.DATA_RESTRUCT[i].OVER_PROC = Math.abs(data.DATA_RESTRUCT[i].OVER_PROC);
    }
    if (data.DATA_RESTRUCT[i].RATE == null || data.DATA_RESTRUCT[i].RATE == '' || isFinite(data.DATA_RESTRUCT[i].RATE) == false){
        data.DATA_RESTRUCT[i].RATE = 0;
    }
    if (data.DATA_RESTRUCT[i].RATEFINE == null || data.DATA_RESTRUCT[i].RATEFINE == '' || isFinite(data.DATA_RESTRUCT[i].RATEFINE) == false){
        data.DATA_RESTRUCT[i].RATEFINE = 0;
    }
    if (data.DATA_RESTRUCT[i].SUMREPEX == null || data.DATA_RESTRUCT[i].SUMREPEX == '' || isFinite(data.DATA_RESTRUCT[i].SUMREPEX) == false){
        data.DATA_RESTRUCT[i].SUMREPEX = 0;
    }
}

if (data.DATA_DEBCARD == undefined){
    data.DATA_DEBCARD = new Array();
}

if (data.PROD_CHAR_ADVANCEAMOUNT== null || data.PROD_CHAR_ADVANCEAMOUNT == '' || isFinite(data.PROD_CHAR_ADVANCEAMOUNT) == false){
    data.PROD_CHAR_ADVANCEAMOUNT = 0;
}
if (data.PROD_CHAR_PAYMONTH== null || data.PROD_CHAR_PAYMONTH == '' || isFinite(data.PROD_CHAR_PAYMONTH) == false){
    data.PROD_CHAR_PAYMONTH = 0;
}

if (data.PROD_SCHEME_TERM == null || data.PROD_SCHEME_TERM == '' || isFinite(data.PROD_SCHEME_TERM) == false){
    data.PROD_SCHEME_TERM = 0;
}

if (data.avans != undefined && data.noDocs != 'Y'){
    data.PROD_CHAR_ADVANCEAMOUNT = data.avans;
}


/*тип, коэф для печати(базовая процентная ставка за мес), коэф ежемесячный*/
var objTypePers = new Array(
    {
        't0': ['CRPL',0.001,0],
        't3': ['',0,0],
        't6': ['RR06',1.083,0.1730429],
        't12': ['RR12',1.083,0.0893173],
        't24': ['RR24',2,0.0528711],
        't36': ['RR36',2,0.0392329]
    },
    {
        't0': ['CRPL',0.001,0],
        't3': ['RP03',0.667,0.3377876],
        't6': ['RP06',1.083,0.1730429],
        't12': ['RP12',1.083,0.0893173],
        't24': ['',0,0],
        't36': ['',0,0]
    },
    {
        't0': ['CRPL',0.001,0],
        't3': ['RL03',0.667,0.3377876],
        't6': ['RL06',1.083,0.1730429],
        't12': ['',0,0],
        't24': ['',0,0],
        't36': ['',0,0]
    },
    {
        't0': ['CRPL',0.001,0],
        't3': ['SB03',0.417,0.5],
        't6': ['',0,0],
        't12': ['',0,0],
        't24': ['',0,0],
        't36': ['',0,0]
    }
);

var tmp=0;
data.LOCAL_TYPE_RESTR = 1;
for (var i=0; i<data.DATA_RESTRUCT.length;i++){
    if ((data.DATA_RESTRUCT[i].FL_GD == 2 || data.DATA_RESTRUCT[i].FL_GD == 3) ){
        data.LOCAL_TYPE_RESTR = 2;
        tmp = 1;
        if ( data.PROD_SCHEME_TERM == 24 || data.PROD_SCHEME_TERM== 36 ){
            data.LOCAL_TYPE_RESTR = 1;
            tmp = 0;
        }
    }
    else {
        if ((data.DATA_RESTRUCT[i].FL_GD == 4 || data.DATA_RESTRUCT[i].FL_GD == 5)){
            data.LOCAL_TYPE_RESTR = 3;
            tmp = 2;
            if (data.PROD_SCHEME_TERM == 12 || data.PROD_SCHEME_TERM == 24 || data.PROD_SCHEME_TERM== 36 ){
                data.LOCAL_TYPE_RESTR = 1;
                tmp = 0;
            }
        }
        else {
            if (data.DATA_RESTRUCT[i].FL_GD == 6 ){
                data.LOCAL_TYPE_RESTR = 4;
                tmp = 3;
                if (data.PROD_SCHEME_TERM == 6 || data.PROD_SCHEME_TERM == 12 || data.PROD_SCHEME_TERM == 24 || data.PROD_SCHEME_TERM== 36 ){
                    data.LOCAL_TYPE_RESTR = 1;
                    tmp = 0;
                }
            }
        }
    }
}

switch (data.PROD_SCHEME_TERM){
    case 3:
        data.RES_CHAR_CRED_TYPE = objTypePers[tmp].t3[0];
        data.RES_PERSENT = objTypePers[tmp].t3[1];
        data.monthKoef = objTypePers[tmp].t3[2];
        break;
    case 6:
        data.RES_CHAR_CRED_TYPE = objTypePers[tmp].t6[0];
        data.RES_PERSENT = objTypePers[tmp].t6[1];
        data.monthKoef = objTypePers[tmp].t6[2];
        break;
    case 12:
        data.RES_CHAR_CRED_TYPE = objTypePers[tmp].t12[0];
        data.RES_PERSENT = objTypePers[tmp].t12[1];
        data.monthKoef = objTypePers[tmp].t12[2];
        break;
    case 24:
        data.RES_CHAR_CRED_TYPE = objTypePers[tmp].t24[0];
        data.RES_PERSENT = objTypePers[tmp].t24[1];
        data.monthKoef = objTypePers[tmp].t24[2];
        break;
    case 36:
        data.RES_CHAR_CRED_TYPE = objTypePers[tmp].t36[0];
        data.RES_PERSENT = objTypePers[tmp].t36[1];
        data.monthKoef = objTypePers[tmp].t36[2];
        break;
    case 0:
        data.RES_CHAR_CRED_TYPE = objTypePers[tmp].t0[0];
        data.RES_PERSENT = objTypePers[tmp].t0[1];
        data.monthKoef = objTypePers[tmp].t0[2];
        break;
    default :
        data.RES_CHAR_CRED_TYPE = '';
        data.RES_PERSENT = 0;
        data.monthKoef = 0;
}

data.RES_RS_NEW_CRED_TERM = data.PROD_SCHEME_TERM;

data.termWave = data.PROD_SCHEME_TERM;

data.LOCAL_ONE_PAY = 'N';
if (data.PROD_SCHEME_TERM ==0  ){
    data.PROD_SCHEME_TERM = 6;
    data.LOCAL_ONE_PAY = 'Y';
}


if (data.PROD_CHAR_TYPE == 'RESTRTHIRD'){
    data.custIDRestr = data.APP_RESTR_CUST_ID;
}
else {
    data.custIDRestr = data.APP_CUST_ID;
}

data.brnmFinish = '';
if (data.PROD_CHAR_BANK == 'AB'){
    data.brnmFinish = 'AB';
}
else {
    if (data.PROD_CHAR_BRANCH.substr(0,1) == 'O'){
        data.brnmFinish = 'PB_O';
    }
    else{
        if (data.PROD_CHAR_BRANCH.substr(0,1) == 'D'){
            data.brnmFinish = 'PB_D';
        }
        else{
            if (data.PROD_CHAR_BRANCH.substr(0,1) == 'K'){
                data.brnmFinish = 'PB_K';
            }
        }
    }
}
