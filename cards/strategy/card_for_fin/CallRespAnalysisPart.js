var LOCAL_CALL_TOTAL, LOCAL_CALL_BAL;
var LOCAL_PHONE_ARRAY = new Array();
data.RES_CALL_WORK_BAL = 0;
data.RES_CALL_HOME_BAL = 0;
data.RES_CALL_MOB_BAL = 0;

if (data.LOCAL_CODE == undefined || data.LOCAL_CODE == null)
{
    data.LOCAL_CODE = {};
}

function AnalysisType (type){

    var total_call_qa_grade= 0;
    var tmp=0;
    LOCAL_CALL_TOTAL = '';
    LOCAL_CALL_BAL = 0;
    LOCAL_PHONE_ARRAY.length = 0;
    if (data.LOCAL_CODE != undefined ) {
        var localCodeObj = data.LOCAL_CODE[type];
        for (var j = 0; j < localCodeObj.length; j++) {
            if (localCodeObj[j].call_grade != null && localCodeObj[j].call_qa_match != null && localCodeObj[j].call_qa_nomatch != null) {
                if (localCodeObj[j].call_grade == 0 && localCodeObj[j].call_qa_match != 0 && localCodeObj[j].call_qa_nomatch != 0) {
                    tmp = MatchProc(localCodeObj[j].NBSM_QUESTION, localCodeObj[j].NBSM_ANSWER, localCodeObj[j].CALL_ANSWER, localCodeObj[j].call_qa_match, localCodeObj[j].call_qa_nomatch);
                    total_call_qa_grade += tmp;
                    LOCAL_PHONE_ARRAY.push(tmp);
                }
                else {
                    total_call_qa_grade += localCodeObj[j].call_grade;
                    LOCAL_PHONE_ARRAY.push(localCodeObj[j].call_grade);
                }
            }
        }
    }

    if (total_call_qa_grade <-1){
        LOCAL_CALL_TOTAL = 'C_NEG';
    }
    else {
        if (total_call_qa_grade >=-1 && total_call_qa_grade <= 1){
            LOCAL_CALL_TOTAL = 'C_NULL';
        }
        else {
            if (total_call_qa_grade >1){
                LOCAL_CALL_TOTAL = 'C_POS';
            }
        }
    }
    LOCAL_CALL_BAL = total_call_qa_grade;
}

function MatchProc (nbsm_qcode, nbsm_acode, call_acode, call_qamatch, call_qanomatch){
    /*APP_EMPL_SOCIALSTATUS*/
    if (nbsm_qcode == 'Q054' || nbsm_qcode == 'Q062'){
        if (nbsm_acode.slice(nbsm_acode.indexOf('_')+1) == data.APP_EMPL_SOCIALSTATUS){
            return call_qamatch;
        }
        else {
            return call_qanomatch;
        }
    }
    /*APP_EMPL_ORGTYPE*/
    if (nbsm_qcode == 'Q001' || nbsm_qcode == 'Q052'){
        if (nbsm_acode.slice(nbsm_acode.indexOf('_')+1) == data.APP_EMPL_ORGTYPE){
            return call_qamatch;
        }
        else {
            return call_qanomatch;
        }
    }
    /*APP_EMPL_RANK*/
    if (nbsm_qcode == 'Q003' || nbsm_qcode == 'Q051'){
        if (nbsm_acode.slice(nbsm_acode.indexOf('_')+1) == data.APP_EMPL_RANK){
            return call_qamatch;
        }
        else {
            return call_qanomatch;
        }
    }
    /*APP_MARITAL_MARITALCOND*/
    if (nbsm_qcode == 'Q013'){
        if (nbsm_acode.slice(nbsm_acode.indexOf('_')+1) == data.APP_MARITAL_MARITALCOND){
            return call_qamatch;
        }
        else {
            return call_qanomatch;
        }
    }
    /*APP_EMPL_TIMEEMPL_DATE*/
    if (nbsm_qcode == 'Q004' || nbsm_qcode == 'Q026'){
        if (data.PROD_CASH_CRED != 'Y'){
            var timeempl = data.APP_EMPL_TIMEEMPL;
            if (timeempl < 3 && call_acode =='99'){
                return call_qamatch;
            }
            else {
                if ((timeempl >= 3 && timeempl < 6) &&  call_acode =='100'){
                    return call_qamatch;
                }
                else {
                    if ((timeempl >= 6 && timeempl < 12) && call_acode =='101'){
                        return call_qamatch;
                    }
                    else {
                        if ((timeempl >= 12 && timeempl < 36) && call_acode=='102'){
                            return call_qamatch;
                        }
                        else {
                            if ((timeempl >= 36 && timeempl < 120) && call_acode =='103'){
                                return call_qamatch;
                            }
                            else {
                                if (timeempl >= 120 && call_acode =='104'){
                                    return call_qamatch;
                                }
                                else {
                                    return call_qanomatch;
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            var timeempl = data.APP_EMPL_TIMEEMPL;
            if (timeempl < 3 && call_acode =='814'){
                return call_qamatch;
            }
            else {
                if ((timeempl >= 3 && timeempl < 6) && call_acode =='815'){
                    return call_qamatch;
                }
                else {
                    return call_qanomatch;
                }
            }
        }
    }

}


//----------------------------------------------------------------------------------------
data.LOCAL_PHONE_WORK_ARRAY= new Array();
data.LOCAL_PHONE_HOME_ARRAY = new Array();
data.LOCAL_PHONE_MOB_ARRAY = new Array();

if (data.RES_CALL_WORK_PHONE == 'Y') {
    AnalysisType('WORK');
    data.RES_CALL_WORK_TOTAL = LOCAL_CALL_TOTAL;
    data.RES_CALL_WORK_BAL = LOCAL_CALL_BAL;
    if (LOCAL_PHONE_ARRAY != undefined && LOCAL_PHONE_ARRAY!= null && LOCAL_PHONE_ARRAY.length>0) {
        for (var i = 0; i < LOCAL_PHONE_ARRAY.length; i++) {
            data.LOCAL_PHONE_WORK_ARRAY.push(LOCAL_PHONE_ARRAY[i]);
        }
    }
    else {
        data.LOCAL_PHONE_WORK_ARRAY.push(0);
    }
}

if (data.RES_CALL_HOME_PHONE == 'Y'){
    AnalysisType('HOME');
    data.RES_CALL_HOME_TOTAL = LOCAL_CALL_TOTAL;
    data.RES_CALL_HOME_BAL = LOCAL_CALL_BAL;
    if (LOCAL_PHONE_ARRAY != undefined && LOCAL_PHONE_ARRAY!= null && LOCAL_PHONE_ARRAY.length>0) {
        for (var i = 0; i < LOCAL_PHONE_ARRAY.length; i++) {
            data.LOCAL_PHONE_HOME_ARRAY.push(LOCAL_PHONE_ARRAY[i]);
        }
    }
    else {
        data.LOCAL_PHONE_HOME_ARRAY.push(0);
    }
}

if (data.RES_CALL_MOB_PHONE == 'Y'){
    AnalysisType('MOB');
    data.RES_CALL_MOB_TOTAL = LOCAL_CALL_TOTAL;
    data.RES_CALL_MOB_BAL = LOCAL_CALL_BAL;
    if (LOCAL_PHONE_ARRAY != undefined && LOCAL_PHONE_ARRAY!= null && LOCAL_PHONE_ARRAY.length>0) {
        for (var i = 0; i < LOCAL_PHONE_ARRAY.length; i++) {
            data.LOCAL_PHONE_MOB_ARRAY.push(LOCAL_PHONE_ARRAY[i]);
        }
    }
    else {
        data.LOCAL_PHONE_MOB_ARRAY.push(0);
    }
}

data.RES_CALL_BAL = 0;
data.RES_CALL_BAL = data.RES_CALL_WORK_BAL + data.RES_CALL_HOME_BAL  + data.RES_CALL_MOB_BAL ;

if (data.RES_CALL_BAL <-1){
    data.RES_CALL_TOTAL = 'C_NEG';
}
else {
    if (data.RES_CALL_BAL >=-1 && data.RES_CALL_BAL <=1){
        data.RES_CALL_TOTAL = 'C_NULL';
    }
    else {
        if (data.RES_CALL_BAL >1){
            data.RES_CALL_TOTAL = 'C_POS';
        }
    }
}