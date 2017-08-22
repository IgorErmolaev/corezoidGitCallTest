/*tabl tActionClientRM*/
if (data['dataClientAction'] != null) {
    data['DATA_CLIENT_ACTION'] = data['dataClientAction'];
}
delete data['dataClientAction'];

/*TCalcLimit*/
if (data['tCalcLimit'] != null) {
    data['DATA_CASHPAYMENTS_LIMIT'] = data['tCalcLimit']['limit'];
    data['DATA_CASHPAYMENTS_TYPE'] = data['tCalcLimit']['rep_Type'];
}
delete data['tCalcLimit'];

/*TOkpoSalaryAVG*/
data['DATA_WORK_TOP1000_INN'] = 'N';
if (data['tOkpoSalaryAVG'] != null) {
    var okpo = data['tOkpoSalaryAVG']['okpo'].trim();
    if (okpo == data['APP_EMPL_OKPO']) {
        data['DATA_WORK_TOP1000_ZP'] = data['tOkpoSalaryAVG']['z_avg'];
    }
    if (okpo != '') {
        data['DATA_WORK_TOP1000_INN'] = 'Y';
    }
}
delete data['tOkpoSalaryAVG'];

/*TProblFlBr*/
if (data['tProblFlBr'] != null) {
    data['DATA_BRANCH_PROB_AVG'] = data['tProblFlBr']['problbranchavg'];
    data['DATA_BRANCH_PROB_TOTAL'] = data['tProblFlBr']['problbranch'];
}
delete data['tProblFlBr'];

/*TProblSotrDate*/
if (data['tProblSotrDate'] != null){
    data['DATA_EMPL_PROB_LDAP_EXECUTIVE'] = data['tProblSotrDate']['problExpert'];
    data['DATA_EMPL_PROB_LDAP_MANAGER'] = data['tProblSotrDate']['problManager'];
}
delete data['tProblSotrDate'];

/*tRelClients*/
if (data['limFach24'] != null) {
    data['DATA_TRELCLIENTS_FACH_LIM24'] = data['limFach24'];
}
delete data['limFach24'];

/*TTop1000Okpo*/
data['DATA_WORK_TOP1000'] = 'N';
if (data['tTop1000Okpo'] != null) {
    data['DATA_WORK_TOP1000_PHONE'] = data['tTop1000Okpo']['phone'];
    data['DATA_WORK_TOP1000_TYPE'] = data['tTop1000Okpo']['typePR'];
    data['DATA_WORK_TOP1000MAX'] = data['tTop1000Okpo']['maxlim'];
    data['DATA_WORK_TOP1000MIN'] = data['tTop1000Okpo']['minlim'];
    data['DATA_WORK_TOP1000'] = 'Y';
}
delete data['tTop1000Okpo'];

/*N2ExecutiveInfo*/
if (data['N2_ExecutiveInfo'] != null) {
    data['DATA_EMPL_BELON_BIS_EXECUTIVE'] = data['N2_ExecutiveInfo']['belon_Bis_Executive'];
    data['DATA_EMPL_POST_CODE_EXECUTIVE'] = data['N2_ExecutiveInfo']['post_Code_Executive'];
}
delete data['N2_ExecutiveInfo'];

