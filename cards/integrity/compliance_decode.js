
data.APP_CUST_ID_OLD = 0;

if (data.clientIDsComplianceResponse != undefined && data.clientIDsComplianceResponse.status == 'ok' && data.clientIDsComplianceResponse.response != undefined){
    for (var i=0;i<data.clientIDsComplianceResponse.response.length;i++){
        if ((data.clientIDsComplianceResponse.response[i].status == 'G' || data.clientIDsComplianceResponse.response[i].status == 'Y') && data.clientIDsComplianceResponse.response[i].clientID == data.APP_CUST_ID){
            data.APP_CUST_ID_OLD = parseInt(data.clientIDsComplianceResponse.response[i].clientIDOld);
        }
    }
}