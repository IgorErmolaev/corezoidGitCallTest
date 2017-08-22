if (data.pers != undefined && data.pers[data.riskProd] != undefined && data.pers[data.riskProd][data.CORP_AB] != undefined) {
    data.paymInternal = data.pers[data.riskProd][data.CORP_AB].INTERN[data.declNum];
    data.paymExtern = data.pers[data.riskProd][data.CORP_AB].EXTERN[data.declNum];
}
else{
    data.paymInternal = 20;
    data.paymExtern = 30;
}

if (data.coefArr != undefined && data.coefArr[data.declNum] != undefined){
    data.RES_COEFF_ELIG = data.coefArr[data.declNum];
}
else {
    data.RES_COEFF_ELIG = 0.2;
}

