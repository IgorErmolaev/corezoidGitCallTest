
data['LOCAL_INCOME_MONTHSALARY'] = data['APP_INCOME_MONTHSALARY'];
data['LOCAL_INCOME_OTHERSOURCE'] = data['APP_INCOME_OTHERSOURCE'];

if ((data['RES_DEBCARD_PENS'] == 'Y' && data['RES_DEBCARD_P_SRED'] != 0) || (data['RES_DEBCARD_ZP'] == 'Y' && data['RES_DEBCARD_Z_SRED'] != 0)){
    if (data['RES_DEBCARD_PENS'] == 'Y'){
        data['LOCAL_INCOME_MONTHSALARY'] = data['RES_DEBCARD_P_SRED'];
        if (data['APP_EMPL_SOCIALSTATUS'] == 'WORKPENS' && data['PROD_CHAR_BANK'] != 'PB' && data['PROD_CHAR_BANK'] != 'AB' && (data['RES_HAS_INC_CONF'] == 'Y' || data['PROD_CHAR_BANK'] == 'PL')){
            data['LOCAL_INCOME_MONTHSALARY'] = data['APP_INCOME_MONTHSALARY'];
        }
    }
    if (data['RES_DEBCARD_ZP'] == 'Y'){
        data['LOCAL_INCOME_MONTHSALARY'] = data['RES_DEBCARD_Z_SRED'];
        if (data['RES_DEBCARD_PENS'] == 'Y'){
            data['LOCAL_INCOME_MONTHSALARY'] += data['RES_DEBCARD_P_SRED'];
        }
        if (data['LOCAL_DEBCARD_CHECK_OKPO'] == 'N' &&  data['PROD_CHAR_BANK'] != 'PB' && data['PROD_CHAR_BANK'] != 'AB' && (data['RES_HAS_INC_CONF'] == 'Y' || data['PROD_CHAR_BANK'] == 'PL')){
            data['LOCAL_INCOME_MONTHSALARY'] += data['APP_INCOME_MONTHSALARY'];
        }
    }
}
else {
    if (data['DATA_WORK_TOP1000'] == 'Y'){
        if ((data['RES_HAS_INC_CONF'] == 'Y' || data['PROD_CHAR_BANK'] == 'PL') && data['PROD_CHAR_BANK'] != 'PB' && data['PROD_CHAR_BANK'] != 'AB'){
            data['LOCAL_INCOME_MONTHSALARY'] = data['APP_INCOME_MONTHSALARY'];
        }
        else {
            if ( data['DATA_WORK_TOP1000_INN'] == 'Y'){
                data['LOCAL_INCOME_MONTHSALARY'] = 0.82 * data['DATA_WORK_TOP1000_ZP'];
            }
            else {
                data['LOCAL_INCOME_MONTHSALARY'] = 0;
                data['LOCAL_INCOME_OTHERSOURCE'] = data['APP_INCOME_MONTHSALARY'] + data['APP_INCOME_OTHERSOURCE'];
            }
        }
    }
    else {
        if (data['LOCAL_STUD_ACTIVE'] == 'Y' && data['LOCAL_STUD_SRED'] >0) {
            data['LOCAL_INCOME_MONTHSALARY'] = data['LOCAL_STUD_SRED'];
        }
        else {
            if ((data['RES_HAS_INC_CONF'] != 'Y' && data['PROD_CHAR_BANK'] != 'PL') || data['PROD_CHAR_BANK'] == 'PB' ){
                data['LOCAL_INCOME_MONTHSALARY'] = 0;
                data['LOCAL_INCOME_OTHERSOURCE'] = data['APP_INCOME_MONTHSALARY'] + data['APP_INCOME_OTHERSOURCE'];
            }
        }
    }

}
data['RES_INC_DISP'] = Math.max( data['LOCAL_INCOME_MONTHSALARY'], 0);

data.nodeName = 'ReconConfirmedIncome';