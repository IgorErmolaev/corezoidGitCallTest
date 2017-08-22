var badNum = new Array('111111','000000','123456','121212','123123','');

data.FRAUD_FRAUD_SUSPICTION = 'N';

if (data.FRAUD_DEC_FINAL_FLOW == 'REFER' && (data.RES_DEBCARD_P_SRED >1000 || data.RES_DEBCARD_Z_SRED>1000 || data.RES_DEPOSIT_TOTAL>5000  )){
    data.FRAUD_DEC_FINAL_FLOW = 'ACCEPT';
}

if (data.FRAUD_DEC_FINAL_FLOW == 'DECLINE' && data.RES_TYPE_CUST == 'INTERN'){
    data.FRAUD_DEC_FINAL_FLOW = 'REFER';
}

if (data.APP_CUST_IMPORTANT == 'Y' && data.FRAUD_DEC_FINAL_FLOW == 'DECLINE'){
    if (data.APP_CUST_IMPORTANT_COM != undefined && data.APP_CUST_IMPORTANT_COM.length >= 4 && data.APP_CUST_IMPORTANT_COM.length<= 10 && data.APP_CUST_IMPORTANT_COM.substring(0,4) != '1111'){
        if (badNum.indexOf(data.APP_CUST_IMPORTANT_COM) ==-1){
            data.FRAUD_DEC_FINAL_FLOW = 'REFER';
        }
    }
}

if (data.FRAUD_DEC_FINAL_FLOW == 'REFER'){
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
}

if (data.RES_CUST_ISID_FRAUD == 'Y' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')){
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
}

/* -----------to FRAUD----------------*/
if (data.APP_EMPL_OKPO == '26124366' || data.APP_EMPL_OKPO == '35736049'){
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
}
/*--------------phone in BL------------*/
if (data.LOCAL_BLPHONE == 'Y' ){
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
}

data.nodeName = 'AnalisysAntiFraud';