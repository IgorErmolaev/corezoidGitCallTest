if (data.declNum != undefined){
    data.declNum = parseFloat(data.declNum);
}
else {
    data.declNum = 0;
}

if (data.paymInternal != undefined){
    data.paymInternal = parseFloat(data.paymInternal);
}
else {
    data.paymInternal = 20;
}

if (data.paymExtern != undefined){
    data.paymExtern = parseFloat(data.paymExtern);
}
else {
    data.paymExtern = 30;
}

if (data.RES_COEFF_ELIG != undefined){
    data.RES_COEFF_ELIG = parseFloat(data.RES_COEFF_ELIG);
}
else {
    data.RES_COEFF_ELIG = 0.2;
}

