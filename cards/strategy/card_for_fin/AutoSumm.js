data['AUTOSUM'] = 'N';
if (
    (data['PROD_CHAR_BANK']== 'PB' || data['PROD_CHAR_BANK']== 'AB') && (data['RES_LIMIT_ITOG'] < 3000 || data['RES_LIMIT_ITOG_TYPE'] == 'ZP' || data['RES_LIMIT_ITOG_TYPE'] == 'PENS')
){
    data['AUTOSUM'] = 'Y';
}