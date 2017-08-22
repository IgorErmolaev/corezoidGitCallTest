// JavaScript Document

data.RES_BI = 'N';

if (data.RES_CUST_NEED_CALL == 'Y') {
    data.RES_BI = 'O';
}

if (data.RES_DEC_AUTO == 'N') {
    data.RES_BI = 'KC';
}

if (data.FRAUD_FRAUD_SUSPICTION == 'Y') {
    data.RES_BI = 'F';
}

if (data.RES_DEC_CATEGORY == 'DECLINE' || data.RES_DEC_CATEGORY == 'DECLINE_OVVERIDE') {
    data.RES_BI = 'D';
}


/*
if (data.APP_CUST_ID == '1800053060'){
    data.RES_BI = 'KC';
    data.RES_COMMENT_NO_AUTO = 'Проверьте клиента: D009;Экпертное решение. Сумма/Аванс;';
    data.RES_DEC_CATEGORY = 'ACCEPT';
    data.RES_DEC_REAS_FINAL_CODE = 'A101';
    data.RES_DEC_AUTO = 'N';
    data.RES_DEC_FINAL_FLOW = 'ACCEPT';
}
*/