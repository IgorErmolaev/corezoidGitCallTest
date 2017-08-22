if (data['PROD_CHAR_BANK'] == 'AB' || data['PROD_CHAR_BANK'] == 'PB'){
    var AmountMin = 100;
    var Amount = data['LOCAL_STUD_AMOUNT'];
}

if (Amount >= AmountMin || data['LOCAL_STUD_LESS30'] == 'Y' ){
    data['RES_TYPE_CUST'] = 'NEW_INTERN';
}
data.nodeName = 'TypeClient_getTypeStud';