data['PROD_APP_EMPLOYEE'] = 'N';
data['RES_CUST_IS_VIP'] = 'N';
data['RES_CUST_IS_JUNIOR'] = 'N';
data['RES_CUST_IS_EXJUNIOR'] = 'N';


if (data['N2_ClientInfo'] != null) {
    if (data['N2_ClientInfo']['isagent'] == 'Y') {
        data['PROD_APP_EMPLOYEE'] = 'Y';
    }
    if (data['N2_ClientInfo']['vip'] == 'Y') {
        data['RES_CUST_IS_VIP'] = 'Y';
    }
    if (data['N2_ClientInfo']['junior'] == 'Y') {
        data['RES_CUST_IS_JUNIOR'] = 'Y';
    }
    if (data['N2_ClientInfo']['ex_Junior'] == 'EX_A') {
        data['RES_CUST_IS_EXJUNIOR'] = 'Y';
    }
    data['DATA_OPER_IS_VIP_MANAGER'] = data['N2_ClientInfo']['personalManager'];
}
delete data['N2_ClientInfo'];


