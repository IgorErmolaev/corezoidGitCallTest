
data.insurance = false;
if (data.RES_BI == 'KC' || data.RES_BI == 'F'){
    data.STATE_ACTION = 'lowKC';
}
else {
    data.STATE_ACTION = 'lowLim';
    data.PRECALC_LIMIT = data.PROD_CHAR_LIMITREQUESTED;
    data.PROD_ACT_STATUS  = 'AN';
}