var startTypes = new Array('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','UNIPACKSAS','ONLINEANKETA');
var upTypes = new Array('CHLIMIT','UPLIMIT','UPLIMNKK');
var socialSt = new Array('WORKPENS','FULLWORK','PARTWORK', 'SAILOR');
var typeRestr = new Array('RS06','RS12','RS24','RS36','RS60','RR06', 'RR12', 'RR24', 'RR36', 'RP03', 'RP06', 'RP12', 'RL03', 'RL06', 'SB03');
var stateCred = new Array ('O','A','R','D','L');
var odessaPB2sym = new Array ('MD', 'MI','OD');
var odessaPB = new Array ('DN6Y' , 'DN6B', 'DN01','DN02', 'DN03', 'DN04','DN05','DN0O', 'DN2K', 'DN3O', 'DN4I', 'DN5O', 'D3O2');
var odessaAB = new Array ('A209','A232','A256','A260','A31O','A343','A344','A345','A346','A347',
    'A3O2','A3O4','AN01','AN02','AN03','AN04','AN05','AN0O','AN2K','AN3O','AN4I','AN5O','AN6B','AN6C',	'AN6I','AN6Y');

data.RES_HIST_RESTRICTION = '';

/*1. Medium HISTORY; */
if (((data.BCH_CRED_HIST_DATA!= undefined && data.BCH_CRED_HIST_DATA.substring(0,1) == 'M') || (data.BCH_CRED_HIST_YBCH!= undefined && data.BCH_CRED_HIST_YBCH == 'M')) && data.RES_LIMIT_TYPE.indexOf('ZP') ==-1 &&
    data.RES_LIMIT_TYPE.indexOf('SOTR') ==-1 && data.RES_LIMIT_TYPE.indexOf('PENS') ==-1 && data.RES_LIMIT_TYPE.indexOf('DEPOS') ==-1){
    data.RES_LIMIT_ITOG = Math.min(Math.max(data.RES_LIMIT_ITOG*data.restructionOfLimit.MEDIUM.koeff_r,data.restructionOfLimit.MEDIUM.min_r),data.restructionOfLimit.MEDIUM.max_r);
    data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'mHist;';
}

/*2. Negative HISTORY; */
if (((data.BCH_CRED_HIST_DATA!= undefined && data.BCH_CRED_HIST_DATA.substring(0,1) == 'N') || (data.BCH_CRED_HIST_YBCH!= undefined && data.BCH_CRED_HIST_YBCH == 'N')) ){
    data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,data.restructionOfLimit.NEGATIVE.max_r);
    data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'nHist;';
}
data.retsr = data.RES_LIMIT_ITOG;
/*3. No static phone*/
if (data.LOCAL_PHONE_WORK_TYPE != 'STATIC' && data.LOCAL_PHONE_HOME_TYPE != 'STATIC' && data.RES_TYPE_CUST != 'INTERN' && data.RES_LIMIT_TYPE.indexOf('IMPORTANT') ==-1 &&
    data.LOCAL_POSITIVE_HISTORY != 'Y' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')){
    if (data.RES_LIMIT_ITOG > data.restructionOfLimit.NO_ST_PHONE.min_r){
        data.RES_LIMIT_ITOG = data.RES_LIMIT_ITOG*data.restructionOfLimit.NO_ST_PHONE.koeff_r;
    }
    data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,data.restructionOfLimit.NO_ST_PHONE.max_r);
    data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'statPhone;';
}

data.retsr_statPhone = data.RES_LIMIT_ITOG;

/*4. WORK Phone is MOB*/
if (data.LOCAL_PHONE_WORK_IS_MOB == 'Y' && data.RES_TYPE_CUST != 'INTERN' && data.RES_LIMIT_TYPE.indexOf('IMPORTANT') ==-1 &&
    data.LOCAL_POSITIVE_HISTORY != 'Y' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')){
    data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,data.restructionOfLimit.WPHONE_IS_MOB.max_r);
    data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'wPhoneM;';
}

/*5. OLD30*/
if (data.LOCAL_RESTRICTION_OLD30 > 0 && startTypes.indexOf(data.PROD_CHAR_TYPE)!=-1 && data.RES_LIMIT_ITOG > data.LOCAL_RESTRICTION_OLD30 &&
    data.RES_TYPE_CUST != 'INTERN' && data.RES_LIMIT_TYPE.indexOf('IMPORTANT') ==-1 &&
    data.LOCAL_POSITIVE_HISTORY != 'Y' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')){
    data.RES_LIMIT_ITOG = data.LOCAL_RESTRICTION_OLD30;
    data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'old30;';
}

/*6. Age*/
if (data.RES_LIMIT_TYPE.indexOf('IMPORTANT') ==-1 && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP') && data.RES_LIMIT_TYPE.indexOf('SOTR') ==-1){
    if (data.RES_AGE < 21){
        data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,data.restructionOfLimit.AGE_LT21.max_r);
        data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'age21;';
    }
    if (data.RES_AGE >= 21 && data.RES_AGE < 25){
        data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,data.restructionOfLimit.AGE_21_25.max_r);
        data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'age25;';
    }
}

/*7. Timeempl*/
if ( (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP') && data.APP_EMPL_TIMEEMPL < 6 && data.RES_LIMIT_ITOG > data.restructionOfLimit.TIMEEMPL.max_r && socialSt.indexOf(data.APP_EMPL_SOCIALSTATUS) != -1 &&
    data.RES_TYPE_CUST != 'INTERN' && data.RES_LIMIT_TYPE.indexOf('IMPORTANT') ==-1 &&
    data.LOCAL_POSITIVE_HISTORY != 'Y'){
    data.RES_LIMIT_ITOG = data.restructionOfLimit.TIMEEMPL.max_r;
    data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'timeempl<6;';
}

/*8. RESTRUCTURING*/
if (data.LOCAL_RESTRUCTURING >= 100 && data.LOCAL_RESTRUCTURING_LIMIT>data.RES_LIMIT_ITOG && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP') ){
    data.RES_LIMIT_ITOG = data.LOCAL_RESTRUCTURING_LIMIT;
    data.RES_LIMIT_ITOG_TYPE = 'LIMIT_OLD';
}

/*9. LIMIT_OLD  ZERO_Score*/
if (data.LOCAL_RESTRUCTURING >= 100 && data.LOCAL_RESTRUCTURING_LIMIT < data.RES_LIMIT_ITOG && data.LOCAL_SCORE_CUTOFF == 'ZERO' &&
    data.RES_TYPE_CUST != 'INTERN' && data.RES_LIMIT_TYPE.indexOf('IMPORTANT') ==-1 &&
    data.LOCAL_POSITIVE_HISTORY != 'Y' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')){
    data.RES_LIMIT_ITOG = data.LOCAL_RESTRUCTURING_LIMIT;
    data.RES_LIMIT_ITOG_TYPE = 'LIMIT_OLD';
    data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'limOldScore;';
}

/*10. ONLINEANKETA and RESTR */
if (data.PROD_CHAR_TYPE == 'ONLINEANKETA'){
    for (var i=0; i<data.DATA_CRED.length; i++){
        if (data.DATA_CRED[i].REFERENC != undefined && data.RES_LIMIT_ITOG>0 && typeRestr.indexOf(data.DATA_CRED[i].TYPE) != -1 && stateCred.indexOf(data.DATA_CRED[i].STATE) != -1){
            data.RES_LIMIT_ITOG = 0;
            data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'OLAPP_and_RESTR;';
        }
    }
}

/*11. UPGRADE*/
if (data.RES_LIMIT_TYPE.indexOf('UPGRADE')!=-1 && data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('UPGRADE')] > data.RES_LIMIT_ITOG){
    data.RES_LIMIT_ITOG = data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('UPGRADE')];
    data.RES_LIMIT_ITOG_TYPE = 'UPGRADE';
}

/*12. Limitrequested*/
if (data.PROD_CHAR_LIMITREQUESTED == 0){
    for (var i=0; i<data.DATA_CRED.length; i++){
        if ((data.BCH_CRED_HIST_YBCH!= undefined && data.BCH_CRED_HIST_YBCH.substring(0,1) == 'H') || typeRestr.indexOf(data.DATA_CRED[i].TYPE)!=-1 || data.LOCAL_HAS_DELINQUENCY == 'Y' ||
            (data.BCH_CRED_HIST_DATA != undefined && data.BCH_CRED_HIST_DATA.substring(0,1) == 'H') || data.BCH_CRED_OWN_PROS_YBCH == 'Y'){
            data.RES_LIMIT_ITOG = 0;
            data.RES_LIMIT_ITOG_TYPE = '';
        }
    }
}
data.retsr_limreq = data.RES_LIMIT_ITOG;

/*13. VOSTOK*/
if (data.SPVostok_AllBranch == 'Y' || data.SPVostok_VostokRegion == 'Y'){
    if (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP') {
        if (data.RES_LIMIT_TYPE.indexOf('ZP') == -1 && data.RES_LIMIT_TYPE.indexOf('SOTR') == -1 && data.RES_LIMIT_TYPE.indexOf('PENS') == -1 && data.RES_LIMIT_TYPE.indexOf('DEPOS') == -1) {
            if (data.RES_LIMIT_ITOG > 500) {
                data.RES_LIMIT_ITOG = 500;
                data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'vostok;';
            }
        }
        else {
            if (data.RES_LIMIT_ITOG > Math.max(data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('ZP')], data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('SOTR')], data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('PENS')], data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('DEPOS')])) {
                data.RES_LIMIT_ITOG = Math.max(data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('ZP')], data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('SOTR')], data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('PENS')], data.RES_LIMIT[data.RES_LIMIT_TYPE.indexOf('DEPOS')]);
                data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'vostok;';
            }
        }
    }
    else {
        if (data.RES_LIMIT_TYPE.indexOf('ZP') == -1 && data.RES_LIMIT_TYPE.indexOf('SOTR') == -1 && data.RES_LIMIT_TYPE.indexOf('PENS') == -1 && data.RES_LIMIT_TYPE.indexOf('DEPOS') == -1){
            data.RES_LIMIT_ITOG = Math.max(data.RES_LIMIT_ITOG,5000);
        }
        else {
            data.RES_LIMIT_ITOG = Math.max(data.RES_LIMIT_ITOG,10000);
        }
        data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'vostokVIP;';
    }
}


/*14. Client insurance*/
if (data.RES_CLIENT_INSURANCE == 'N' && data.LIMIT_CLIENT_F_NCLIENT == 'SSSS' && upTypes.indexOf(data.PROD_CHAR_TYPE) != -1 && data.DATA_CASHPAYMENTS_LIMIT > data.RES_CRED_LIM + 0.1*data.RES_CRED_LIM && data.LOCAL_TICKET_FLAG_TEHPASSP != 'Y' && data.LOCAL_TICKET_FLAG != 'Y' && data.LOCAL_TICKET_FLAG_EXTRACT != 'Y' && data.LOCAL_TICKET_FLAG_FORPASSP != 'Y' && data.insurance != false ){
    data.RES_LIMIT_ITOG = Math.min(data.RES_CRED_LIM + 500,data.DATA_CASHPAYMENTS_LIMIT);
    data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,25000);
    data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'insurance;';
}

/*15. MINING and UMZ*/
if ((data.APP_EMPL_ACTIVITY == 'MINING' ) && data.RES_LIMIT_TYPE.indexOf('IMPORTANT') ==-1 && data.RES_LIMIT_TYPE.indexOf('DEPOS') ==-1){ /*|| data.APP_EMPL_OKPO == '14308368'*/
    data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,2000);
    data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'mining_umz;';
}

/*16. Restr for Odessa*/
if (((data.PROD_CHAR_BANK == 'PB' && (data.PROD_CHAR_BRANCH != undefined && (odessaPB2sym.indexOf(data.PROD_CHAR_BRANCH.substring(0,2)) !=-1 || odessaPB.indexOf(data.PROD_CHAR_BRANCH) !=-1))) ||
    (data.PROD_CHAR_BANK == 'AB' && data.PROD_CHAR_BRANCH != undefined && odessaAB.indexOf(data.PROD_CHAR_BRANCH) !=-1)) && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP') &&
    (data.RES_LIMIT_ITOG_TYPE == 'NEW' || (data.RES_TYPE_CUST != 'INTERN' && data.RES_LIMIT_TYPE.indexOf('NEW')!= -1 && data.RES_LIMIT_TYPE.indexOf('IMPORTANT') ==-1) )){
    data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,1000);
    data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'odessa;';
}

/*17. NEW_INTERN UA 5000grn*/
if (data.RES_TYPE_CUST == 'NEW_INTERN' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')){
    data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG,5000);
    data.RES_LIMIT_ITOG_TYPE = 'NEW';
}

data.RES_LIMIT_EXTRA = data.RES_LIMIT_ITOG;

data.retsr_2cards_st = data.RES_LIMIT_ITOG;
/*18. 2 cards with limit*/
if (data.DATA_LIMIT_OTHERBANK > 0){
    if (data.PROD_CHAR_BANK == 'AB'){
        data.RES_LIMIT_ITOG = data.RES_LIMIT_ITOG - data.DATA_LIMIT_OTHERBANK*0.4;
    }
    else{
        data.RES_LIMIT_ITOG = data.RES_LIMIT_ITOG - data.DATA_LIMIT_OTHERBANK*0.5;
    }
    if (data.THE_RIP != 'Y') {
        if (data.RES_LIMIT_ITOG - data.RES_CRED_LIM  >= 300) {
                if (data.RES_LIMIT_ITOG > 3000 && data.RES_LIMIT_TYPE.indexOf('DEPOS') == -1 && data.RES_LIMIT_TYPE.indexOf('ZP') == -1 && data.RES_LIMIT_TYPE.indexOf('SOTR') == -1 &&
                    data.RES_LIMIT_TYPE.indexOf('PENS') == -1 && data.RES_LIMIT_TYPE.indexOf('HYSTORY') == -1) {
                    data.RES_LIMIT_ITOG = Math.min(data.RES_LIMIT_ITOG, 3000);
                }
        }
        else {
            data.RES_LIMIT_ITOG = 0;
        }
    }
    else {
        data.RES_LIMIT_ITOG = Math.max(data.RES_LIMIT_ITOG, 300);
    }
}
data.retsr_2cards_fn = data.RES_LIMIT_ITOG;


/*19. RIP restrict*/
if (data.THE_RIP == 'Y' && data.PROD_CHAR_BANK == 'AB'){
    data.RES_LIMIT_ITOG = Math.min(Math.max(data.PROD_CHAR_LIMITREQUESTED,2000),data.RES_LIMIT_ITOG);
    data.RES_HIST_RESTRICTION = data.RES_HIST_RESTRICTION + 'RIP;';
}

/*20. Не давать больше запрашиваемого лимита при заявке на повышение*/
if (upTypes.indexOf(data.PROD_CHAR_TYPE) != -1 && data.RES_LIMIT_ITOG > data.PROD_CHAR_LIMITREQUESTED && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')){
    data.RES_LIMIT_ITOG = data.PROD_CHAR_LIMITREQUESTED;
}

data.retsr_end = data.RES_LIMIT_ITOG;

/*Round*/
var the_limit, min_limit, round_to;
the_limit = data.RES_LIMIT_ITOG;

if (data.PROD_CHAR_BANK == 'PB' || data.PROD_CHAR_BANK == 'AB'){
    min_limit = 300;
}

if (data.RES_LIMIT_ITOG > 0) {
    if (data.RES_LIMIT_ITOG >= 3000) {
        round_to = 500;
        the_limit = the_limit / round_to;
        data.RES_LIMIT_ITOG = Math.round(the_limit) * round_to;
    }
    else
    if (data.RES_LIMIT_ITOG < 3000) {
        round_to = 100;
        the_limit = the_limit / round_to;
        data.RES_LIMIT_ITOG = Math.round(the_limit) * round_to;
    }

    data.RES_LIMIT_ITOG = Math.max(min_limit, data.RES_LIMIT_ITOG);
}

data.retsr_round = data.RES_LIMIT_ITOG;

data.nodeName = 'LimitRestrictions_after';