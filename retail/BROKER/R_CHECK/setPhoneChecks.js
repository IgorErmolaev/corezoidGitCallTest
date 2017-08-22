// JavaScript Document

//-----------------INTERNAL----------

if (data.RES_TYPE_CUST == 'INTERN' && data.RES_LIMIT_ITOG_TYPE != 'SCOR') {
    INTERN = 'True';
}
else {
    INTERN = 'False';
}
//----------------Z_SPED_CHECK---------------

if (data.RES_DEBCARD_Z_SRED>=500 || data.RES_DEBCARD_P_SRED>=500) {
    Z_SPED_CHECK = 'True';
}
else {
    Z_SPED_CHECK = 'False';
}

//-------------SYS_SCORE_PARTNERS-------------------

if (data.PROD_CHAR_CORPORATION != '0') {
    SYS_SCORE_PARTNERS = 'True';
}
else {
    SYS_SCORE_PARTNERS = 'False';
}
//-----------------TEST_ZVONOK---------------------

if (data.RES_LIMIT_ITOG_TYPE == 'NEW') {
    TEST_ZVONOK = 'True';
}
else {
    TEST_ZVONOK = 'False';
}

//-------------------TEST_GROUP------------------

if (Number(data.APP_CUST_ID)%1000<600) {
    group = 'Champion';
}
else {
    group = 'Challenger';
}

//--------------set_phone_check-----------------------

data.LOCAL_CALL_RES = '';
if (data.RES_CALL_LAST_WORK_TOTAL == 'C_NULL' || data.RES_CALL_LAST_WORK_TOTAL == 'C_NEG') {
    data.LOCAL_CALL_RES = 'W'+data.LOCAL_CALL_RES;
}
if (data.RES_CALL_LAST_HOME_TOTAL == 'C_NULL' || data.RES_CALL_LAST_HOME_TOTAL == 'C_NEG') {
    data.LOCAL_CALL_RES = 'H'+data.LOCAL_CALL_RES;
}
if (data.RES_CALL_LAST_MOB_TOTAL == 'C_NULL' || data.RES_CALL_LAST_MOB_TOTAL == 'C_NEG') {
    data.LOCAL_CALL_RES = 'M'+data.LOCAL_CALL_RES;
}

if (INTERN == 'True') {
    set_call = 'No_Call';
}
else {
    if (Z_SPED_CHECK == 'True') {
        set_call = 'No_Call';
    }
    else {
        if (SYS_SCORE_PARTNERS == 'True') {
            if (data.PROD_CHAR_LOANAMOUNT>0 && data.PROD_CHAR_LOANAMOUNT<=3500) {
                if (TEST_ZVONOK == 'True') {
                    if (data.RES_CHAR_ADVANCE_PRC>=0 && data.RES_CHAR_ADVANCE_PRC<=30) {
                        if (group == 'Champion') {
                            set_call = 'No_Call';
                        }
                        else {
                            switch (data.LOCAL_CALL_RES) {
                                case 'W': set_call = 'W'; break;
                                case 'H': set_call = 'H'; break;
                                case 'HM': set_call = 'H+M'; break;
                                case 'WH': set_call = 'W+H'; break;
                                case 'WM': set_call = 'W+M'; break;
                                case 'M': set_call = 'M'; break;
                                case 'WHM': set_call = 'W+H+M'; break;
                                default: 'No_Call';
                            }
                        }
                    }
                    else {
                        set_call = 'No_Call';
                    }
                }
                else {
                    set_call = 'No_Call';
                }
            }
            else {
                if (data.RES_CHAR_ADVANCE_PRC>=0 && data.RES_CHAR_ADVANCE_PRC<=30) {
                    switch (data.LOCAL_CALL_RES) {
                        case 'W': set_call = 'W'; break;
                        case 'H': set_call = 'H'; break;
                        case 'HM': set_call = 'H+M'; break;
                        case 'WH': set_call = 'W+H'; break;
                        case 'WM': set_call = 'W+M'; break;
                        case 'M': set_call = 'M'; break;
                        case 'WHM': set_call = 'W+H+M'; break;
                        default: 'No_Call';
                    }
                }
                else {
                    set_call = 'No_Call';
                }
            }
        }
        else {
            switch (data.LOCAL_CALL_RES) {
                case 'W': set_call = 'W'; break;
                case 'H': set_call = 'H'; break;
                case 'HM': set_call = 'H+M'; break;
                case 'WH': set_call = 'W+H'; break;
                case 'WM': set_call = 'W+M'; break;
                case 'M': set_call = 'M'; break;
                case 'WHM': set_call = 'W+H+M'; break;
                default: 'No_Call';
            }
        }
    }
}

switch (data.data.LOCAL_CALL_RES) {
    case 'H':   homeCall = 'Y'; workCall = 'N'; mobCall = 'N'; break;
    case 'H+M': homeCall = 'Y'; workCall = 'N'; mobCall = 'Y'; break;
    case 'M':   homeCall = 'Y'; workCall = 'N'; mobCall = 'N'; break;
    case 'No_Call': homeCall = 'N'; workCall = 'N'; mobCall = 'N'; break;
    case 'W':   homeCall = 'N'; workCall = 'Y'; mobCall = 'N'; break;
    case 'W+H': homeCall = 'Y'; workCall = 'Y'; mobCall = 'N'; break;
    case 'W+H+M': homeCall = 'Y'; workCall = 'Y'; mobCall = 'Y'; break;
    case 'W+M': homeCall = 'N'; workCall = 'Y'; mobCall = 'Y'; break;
}

//---------------------------------------------------------------

if (data.RES_CALL_HOME_NUMBER != ''&& data.RES_CALL_HOME_NUMBER != undefined) {
    data.RES_CALL_HOME_PHONE = homeCall;
}
else {
    data.RES_CALL_HOME_PHONE = 'N';
}

if (data.RES_CALL_MOB_NUMBER != ''&& data.RES_CALL_MOB_NUMBER != undefined) {
    data.RES_CALL_MOB_PHONE = mobCall;
}
else {
    data.RES_CALL_MOB_PHONE = 'N';
}

if (data.RES_CALL_WORK_NUMBER != ''&& data.RES_CALL_WORK_NUMBER != undefined) {
    data.RES_CALL_WORK_PHONE = workCall;
}
else {
    data.RES_CALL_WORK_PHONE = 'N';
}