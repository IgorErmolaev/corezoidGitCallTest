if (data['DATA_CASHPAYMENTS_LIMIT'] >0 || data['RES_CUST_IS_EXJUNIOR'] == 'Y'){
    data['RES_TYPE_CUST'] = 'INTERN';
}

data.nodeName = 'TypeClient_getTypeCashpaym';