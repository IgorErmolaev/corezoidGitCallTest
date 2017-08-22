
if (data['LOCAL_RESTRUCTURING_INTERN'] == 'Y'){
    data['RES_TYPE_CUST'] = 'INTERN';
}
else {
    if (data['LOCAL_RESTRUCTURING']>= 100 && data['LOCAL_RESTRUCTURING_LIMIT'] >0){
        data['RES_TYPE_CUST'] = 'NEW_INTERN';
    }
}
data.nodeName = 'TypeClient_getTypeLimOld';

