if ( data['PROD_CHAR_BANK'] ='PB' && data['DATA_ECB_NOT_WORK']!='Y' &&
(data['LOCAL_BLCL_COLOR']=='R' ||
(data['LOCAL_BLCL_COLOR']=='Y' && data['LOCAL_BLCL_CONTROL_CL'] =='ZPD' && CASH_BLACK_PAN=='FALSE')
))  {
    data['RES_DEC_REAS_CODE_TABLE'].Push('D603');
}