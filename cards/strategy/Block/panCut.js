 if (data.PROD.APP_GIVENPAN != undefined && data.PROD.APP_GIVENPAN.length >10){
     data.PROD.APP_GIVENPAN = data.PROD.APP_GIVENPAN.substr(0,4) + '*' + data.PROD.APP_GIVENPAN.slice(-4);
 }