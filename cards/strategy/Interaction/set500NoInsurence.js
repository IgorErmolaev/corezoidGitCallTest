
if (data.groupResult == '056779' && data.PROD_CLIENT_BLOCK == 'Y'){
    data.RES_LIMIT_P48 = 0;
}
else {
    data.RES_LIMIT_P48 = data.RES_CRED_LIM + 500;
}
