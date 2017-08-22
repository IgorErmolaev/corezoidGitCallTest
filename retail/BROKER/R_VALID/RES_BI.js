if (data.RES_CUST_ISID != 'Y') {
    data.RES_DEC_AUTO = 'N';
    data.RES_BI = 'KC';
    data.RES_COMMENT_NO_AUTO = 'Клиент не идентифицирован' + ' ' + data.RES_COMMENT_NO_AUTO;
}

if (data.RES_CUST_ISID_FRAUD == 'Y') {
    data.RES_DEC_AUTO = 'N';
    data.RES_BI = 'F';
    data.RES_COMMENT_NO_AUTO = 'Клиент не идентифицирован' + ' ' + data.RES_COMMENT_NO_AUTO;
}