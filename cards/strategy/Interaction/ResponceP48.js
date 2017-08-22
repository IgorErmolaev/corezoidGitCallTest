if (data.description == 'SUCCESS'){
    data.RES_LIMIT_ADJUST_P48 = data.newlim;
}
else{
    data.PROD_ACT_STATUS = 'EP';
    data.RES_LIMIT_ADJUST_P48 = 0;
}