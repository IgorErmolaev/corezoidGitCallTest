
var KievPB = new Array('KI','K2','K3','K4','K5');
var KievAB = new Array('A3K2','A3K6','ABAA','A3K7','A213','A3K8','AN7K');
var KievPBRip = new Array('K2','K3','K5','KI','SE','SU');

var balZero = 0;
var balZeroPB = 0;
var balMin = 0;
var balGreyZone = 0;
var balGood = 0;
var balBad= 0;

if (data.RES_SCORE_REGION == 'BAD' && data.THE_RIP != 'Y'){
    data.RES_SCORE_TYPE = 'REGION_BAD';
    balZero = data.crmCutoffs.REGION_BAD.zero_b;
    balMin = data.crmCutoffs.REGION_BAD.min_b;
    balGreyZone = data.crmCutoffs.REGION_BAD.gray_z;
    balGood = data.crmCutoffs.REGION_BAD.good_b;
    balBad = data.crmCutoffs.REGION_BAD.bad_b;
}
else {
    if (data.RES_SCORE_REGION == 'PREBAD' && data.THE_RIP != 'Y'){
        data.RES_SCORE_TYPE = 'REGION_PREBAD';
        balZero = data.crmCutoffs.REGION_PREBAD.zero_b;
        balMin = data.crmCutoffs.REGION_PREBAD.min_b;
        balGreyZone = data.crmCutoffs.REGION_PREBAD.gray_z;
        balGood = data.crmCutoffs.REGION_PREBAD.good_b;
        balBad = data.crmCutoffs.REGION_PREBAD.bad_b;
    }
    else {
        if (data.RES_SCORE_REGION == 'OTHERS' && data.THE_RIP != 'Y'){
            data.RES_SCORE_TYPE='REGION_OTHER';
            balZero = data.crmCutoffs.REGION_OTHER.zero_b;
            balMin = data.crmCutoffs.REGION_OTHER.min_b;
            balGreyZone = data.crmCutoffs.REGION_OTHER.gray_z;
            balGood = data.crmCutoffs.REGION_OTHER.good_b;
            balBad = data.crmCutoffs.REGION_OTHER.bad_b;
        }
        else {
            if (data.THE_RIP == 'Y' && (data.THE_RIP_TYPE == '1' || data.THE_RIP_TYPE == '4')){
                data.RIP_TYPE = 'SYS';
                data.RES_SCORE_TYPE='RIP_SYS';
                balZero = data.crmCutoffs.RIP_SYS.zero_b;
                balMin = data.crmCutoffs.RIP_SYS.min_b;
                balGreyZone = data.crmCutoffs.RIP_SYS.gray_z;
                balGood = data.crmCutoffs.RIP_SYS.good_b;
                balBad = data.crmCutoffs.RIP_SYS.bad_b;
            }
            else {
                if (data.THE_RIP == 'Y' && (data.THE_RIP_TYPE != '1' && data.THE_RIP_TYPE != '4')){
                    data.RIP_TYPE = 'NO_SYS';
                    data.RES_SCORE_TYPE='RIP_NO_SYS';
                    balZero = data.crmCutoffs.RIP_NO_SYS.zero_b;
                    balMin = data.crmCutoffs.RIP_NO_SYS.min_b;
                    balGreyZone = data.crmCutoffs.RIP_NO_SYS.gray_z;
                    balGood = data.crmCutoffs.RIP_NO_SYS.good_b;
                    balBad = data.crmCutoffs.RIP_NO_SYS.bad_b;
                }
            }
        }
    }
}

if ((data.PROD_CHAR_BANK == 'PB' && data.PROD_CHAR_BRANCH != undefined && KievPB.indexOf(data.PROD_CHAR_BRANCH.substring(0,2)) != -1)  && (data.RES_SCORE_TYPE != 'RIP_SYS' && data.RES_SCORE_TYPE != 'RIP_NO_SYS')){
    balZero = data.crmCutoffs.REGION_BAD.zero_b;
}

balZeroPB = balZero;

if (data.PROD_CHAR_BANK == 'PB' && data.PROD_CHAR_BRANCH != undefined && KievPBRip.indexOf(data.PROD_CHAR_BRANCH.substring(0,2)) != -1 && (data.RES_SCORE_TYPE == 'RIP_SYS' || data.RES_SCORE_TYPE == 'RIP_NO_SYS')){
    balZeroPB = 200;
}

if ((data.PROD_CHAR_BANK == 'PB' && data.PROD_CHAR_BRANCH != undefined && KievPB.indexOf(data.PROD_CHAR_BRANCH.substring(0,2)) != -1) ||
    (data.PROD_CHAR_BANK == 'AB' && data.PROD_CHAR_BRANCH != undefined && KievAB.indexOf(data.PROD_CHAR_BRANCH.substring(0,4)) != -1)){
    if (data.RES_SCORE_TYPE == 'RIP_SYS' || data.RES_SCORE_TYPE == 'RIP_NO_SYS'){
        if (balZeroPB < 200){
            balZeroPB = 200;
            data.RES_SCORE_TYPE = 'RIP_KYIV';
        }
    }
    else {
        if((data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB') && balZeroPB < balZero){
            balZeroPB = balZero;
            data.RES_SCORE_TYPE = 'KYIV';
        }
    }
}

if (data.SPVostok_AllBranch == 'Y' && data.PROD_CHAR_BANK == 'PB'){
    if (data.RES_SCORE_TYPE == 'REGION_BAD') {
        balZeroPB = 1200;
    }
    if (data.RES_SCORE_TYPE == 'REGION_PREBAD') {
        balZeroPB = 883;
    }
    if (data.RES_SCORE_TYPE == 'REGION_OTHERS') {
        balZeroPB = 760;
    }
}

balZero = balZeroPB;

if (data.PROD_CHAR_BANK == 'AB') {
  /*  if (data.THE_RIP == 'Y') {
        switch (data.RES_LIMIT_ITOG_TYPE) {
            case 'NEW':
            case 'VNESH':
                balZero = 0.446418;
                break;
            case 'CASHPAYM':
                balZero = 0.492824;
                break;
            case 'ZP':
            case 'PENS':
            case 'DEPOS':
                balZero = 0.5;
                break;
            default :
                balZero = 0.5;
        }
    }
    else {*/
    switch (data.RES_LIMIT_ITOG_TYPE) {
        case 'NEW':
        case 'VNESH':
            balZero = 0.446418;
            break;
        case 'CASHPAYM':
            balZero = 0.492824;
            break;
        case 'ZP':
        case 'PENS':
        case 'DEPOS':
            balZero =  0.5;
            break;
        default :
            balZero = 0.421458;
    }


    balGreyZone = 0.25;
}

/*set zero cutoffs and gray zone values*/
if ((data.RES_SCCARD_TOTAL_SCORE < balZero && data.PROD_CHAR_BANK == 'PB') || (data.RES_SCCARD_TOTAL_SCORE > balZero && data.PROD_CHAR_BANK == 'AB')){
    data.LOCAL_SCORE_CUTOFF = 'ZERO';
}
/*
if (data.RES_SCCARD_TOTAL_SCORE >= balZero && data.RES_SCCARD_TOTAL_SCORE < balMin && data.PROD_CHAR_BANK == 'AB' && data.THE_RIP == 'Y'){
    data.LOCAL_SCORE_CUTOFF = 'MIN';
}*/
/*grey zone*/
if ((data.RES_SCCARD_TOTAL_SCORE < balZero && data.RES_SCCARD_TOTAL_SCORE > balZero - balGreyZone  && data.PROD_CHAR_BANK == 'PB') ||
    (data.RES_SCCARD_TOTAL_SCORE > balZero && data.RES_SCCARD_TOTAL_SCORE < balZero + balGreyZone  && data.PROD_CHAR_BANK == 'AB')){
    data.RES_SCORE_GREY_ZONE = 'SCORE_NEG';
}
if ((data.RES_SCCARD_TOTAL_SCORE >= balZero && data.RES_SCCARD_TOTAL_SCORE < balZero + balGreyZone && data.PROD_CHAR_BANK == 'PB') ||
    (data.RES_SCCARD_TOTAL_SCORE <= balZero && data.RES_SCCARD_TOTAL_SCORE > balZero - balGreyZone && data.PROD_CHAR_BANK == 'AB')){
    data.RES_SCORE_GREY_ZONE = 'SCORE_POS';
}
data.GREY_ZONE = balGreyZone;

/*main logic for good and bad scoring values*/
data.LOCAL_SCORE_GOOD = 'N';
data.LOCAL_SCORE_BAD = 'N';
if(data.RES_SCCARD_TOTAL_SCORE >= balGood && data.PROD_CHAR_BANK == 'PB'){
    data.LOCAL_SCORE_GOOD = 'Y';
}
if(data.RES_SCCARD_TOTAL_SCORE < balBad && data.PROD_CHAR_BANK == 'PB'){
    data.LOCAL_SCORE_BAD = 'Y';
}

data.nodeName = 'CutOffsAndTheChannels';