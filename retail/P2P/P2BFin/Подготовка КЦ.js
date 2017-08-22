Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return yyyy + '-' +(mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
};

data.STRATEGY_ID = "P2B";
data.APP_CUST_ID = data.clientid;
data.PROD_CHAR_BANK = data.bank;
data.PROD_CHAR_LIMITREQUESTED = data.LimitRequsted;
data.RES_LIMIT_ITOG = data.LIM_P2B;
data.RES_LIMIT_ITOG = Number(data.RES_LIMIT_ITOG).toFixed(2);
data.PROD_CHAR_TYPE = "KUB";
data.underwr_url = "https://rmsvc.privatbank.ua/service/uw_dec/live/";
data.KUB_CALL.ATTR50 = data.phone;

dt = new Date();
data.KUB_DATE = dt.yyyymmdd();

delete data.input;
delete data.KUB_CALL.input;