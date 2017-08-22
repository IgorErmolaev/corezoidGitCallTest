/**
 * Created by user on 29.11.2016.
 */
// JavaScript Document

var stateO =  new Array('O','L','R','A','D');
var stateC =  new Array('C','Z','K');
data.RES_CRED_HIST_DATA = '';
data.LOCAL_CRED_MEDIUM_TERM = [];
data.LOCAL_CRED_ACTUALY_TERM = [];
data.LOCAL_CRED_MEDIUM_PAYMENT = [];
var DelAmountVal = 400;

//-----------------------------------------COUNT ACTIVE CREDITS----------------
data.LOCAL_CRED_UNIQ_DATA = [];


if (data.DATA_CRED != undefined) {
    for (var i=0; i< data.DATA_CRED.length; i++){
        var credUniqData = '';
        if (stateO.indexOf(data.DATA_CRED[i].STATE) != -1 && data.DATA_CRED[i].DATE_START != undefined) {
            if (data.DATA_CRED[i].DLP == '' || data.DATA_CRED[i].DLP == undefined) {
                if (Math.abs(data.DATA_CRED[i].BAL)!=0) {
                    credUniqData = 'Y';
                }
            }
            else {
                if (data.DATA_CRED[i].START_SUMM != 0) {
                    if (Math.abs(data.DATA_CRED[i].BAL/data.DATA_CRED[i].START_SUMM)*100>10) {
                        credUniqData = 'Y';
                    }
                }
            }
        }
        data.LOCAL_CRED_UNIQ_DATA.push(credUniqData);
    }
}

//-----------------------------------------Positive History-------------------

var one_mnth = 1000 * 60 * 60 * 24 * 30.5;
var today = new Date();

if (data.DATA_CRED != undefined) {
    for (var i=0; i< data.DATA_CRED.length; i++){
        if (data.DATA_CRED[i].DLP != '') {
            if(stateC.indexOf(data.DATA_CRED[i].STATE) != -1) {
                data.LOCAL_CRED_MEDIUM_TERM[i] = (Math.round(Math.abs(Date(data.DATA_CRED[i].DATECLOS_C) - Date(data.DATA_CRED[i].DATE_START))/one_mnth));
                if (data.LOCAL_CRED_MEDIUM_TERM[i] !=0) {
                    data.LOCAL_CRED_MEDIUM_PAYMENT[i] = data.DATA_CRED[i].START_SUMM/data.LOCAL_CRED_MEDIUM_TERM[i];
                    if (data.LOCAL_CRED_MEDIUM_TERM[i]>=3 && data.LOCAL_CRED_MEDIUM_PAYMENT[i]>=50) {
                        data.RES_CRED_HIST_DATA = 'POSITIVE';
                    }
                }
            }
            else {
                if (data.DATA_CRED[i].STATE != '') {
                    data.LOCAL_CRED_ACTUALY_TERM[i] = (Math.round(Math.abs(today - Date(data.DATA_CRED[i].DATE_START))/one_mnth));
                    if (data.LOCAL_CRED_ACTUALY_TERM[i] != 0) {
                        data.LOCAL_CRED_MEDIUM_PAYMENT[i] = data.DATA_CRED[i].START_SUMM/data.LOCAL_CRED_ACTUALY_TERM[i];
                        if (data.LOCAL_CRED_ACTUALY_TERM[i]>=3 && data.LOCAL_CRED_MEDIUM_PAYMENT[i]>=50) {
                            data.RES_CRED_HIST_DATA = 'POSITIVE';
                        }
                    }
                }
            }
        }
        else {
            if (data.DATA_CRED[i].STATE != '') {
                data.LOCAL_CRED_MEDIUM_TERM[i] = (Math.round(Math.abs(Date(data.DATA_CRED[i].DATE_FIRSTPAY) - today)/one_mnth));
                if (data.LOCAL_CRED_MEDIUM_TERM[i] !=0) {
                    data.LOCAL_CRED_MEDIUM_PAYMENT[i] = data.DATA_CRED[i].CR_PAY/data.LOCAL_CRED_MEDIUM_TERM[i];
                }
                if (data.LOCAL_CRED_ACTUALY_TERM[i]>=3 && data.LOCAL_CRED_MEDIUM_PAYMENT[i]>=50) {
                    data.RES_CRED_HIST_DATA = 'POSITIVE';
                }
            }
        }
    }
}


//---------------------------------Negative History----------------------------

if (data.DATA_CRED != undefined) {
    for (var i=0; i< data.DATA_CRED.length; i++){
        if(stateC.indexOf(data.DATA_CRED[i].STATE) != -1) {
            if (data.DATA_CRED[i]["90_DAYS_CRED"]>=1 && data.DATA_CRED[i].DAYS_MAX<=1080) {
                if (data.DATA_CRED[i].DLP != '') {
                    if (data.DATA_CRED[i].MAX_PRS_CRED >= DelAmountVal) {
                        data.RES_CRED_HIST_DATA = 'NEGATIVE';
                    }
                }
                else {
                    if (data.DATA_CRED[i].MAX_PRS_CRED >= DelAmountVal) {
                        data.RES_CRED_HIST_DATA = 'NEGATIVE';
                    }
                }
            }
        }
        else {
            if (data.DATA_CRED[i].STATE != '') {
                if (data.DATA_CRED[i]["90_DAYS_CRED"]>=1 || data.DATA_CRED[i]["60_90_DAYS_CRED"]>=2 ||  data.DATA_CRED[i].DAYS_MAX<=720) {
                    if (data.DATA_CRED[i].DLP != '') {
                        if (data.DATA_CRED[i].MAX_PRS_CRED >= DelAmountVal) {
                            data.RES_CRED_HIST_DATA = 'NEGATIVE';
                        }
                    }
                    else {
                        if (data.DATA_CRED[i].MAX_PRS_CRED >= DelAmountVal) {
                            data.RES_CRED_HIST_DATA = 'NEGATIVE';
                        }
                    }
                }
            }
        }
    }
}
