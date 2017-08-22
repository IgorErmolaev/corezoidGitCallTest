
if (data.APP_LINK != undefined && data.APP_LINK.length>0){
    if (data.APP_CUST_ID_JUR == data.custID ){
        data.custID = data.APP_LINK[0].CUST_ID;
        data.indKI = 0;
    }
    else {
        data.indKI ++;
        if (data.indKI<data.APP_LINK.length){
            data.custID = data.APP_LINK[data.indKI].CUST_ID;
        }
        else{
            data.custID = 0;
        }
    }
}
else {
    data.custID = 0;
}
