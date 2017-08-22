
if (data['PROD_CHAR_BANK'] == 'AB' || data['PROD_CHAR_BANK'] == 'PB'){
    var pensAmountMin=400;
    var salaryAmountMin=500;
}

if (data['LOCAL_SALARY_AMOUNT'] >= salaryAmountMin || data['LOCAL_PENS_AMOUNT'] >= pensAmountMin){
    data['RES_TYPE_CUST'] = 'INTERN';
}
else {
    if (data['LOCAL_SALARY_LESS30'] == 'Y' || data['LOCAL_STUD_LESS30'] == 'Y' || data['LOCAL_PENS_LESS30'] == 'Y'){
        data['RES_TYPE_CUST'] = 'NEW_INTERN';
    }
}
data.nodeName = 'TypeClient_getTypeDebcard';