var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\..\\resource\\client_prop_resp_example.json').toString();
var data = JSON.parse(json).data;

//data = {"listclientproperty":{"clientProperty":[{"@bank":"PB","@clid":"21254590","@credit":"CR","@dateMod":"2013-11-22","@docno":"88","@ldap":"dn230589tai","@limit":"1400","@oper":"ST","@product":"UN","@typePay":"EMPTY"},{"@bank":"PB","@clid":"21254590","@credit":"CR","@dateMod":"2012-11-22","@docno":"55","@ldap":"dn230589tai","@limit":"43566","@oper":"ST","@product":"MG","@typePay":"EMPTY"},{"@bank":"PB","@clid":"21254590","@credit":"CR","@dateMod":"2012-11-22","@docno":"55","@ldap":"dn230589tai","@limit":"43566","@oper":"UP","@product":"MG","@typePay":"EMPTY"}]},"APP_CUST_IMPORTANT_LIMIT":null,"PROD_CHAR_BANK":"PB","__conveyor_copy_task_return_type_error__":"software","__conveyor_copy_task_return_type_tag__":"copy_task_wrong_convert_param","__conveyor_copy_task_return_description__":"Param: APP_CUST_IMPORTANT_LIMIT, Value: null, Try convert to: number","ref":"160121B1DT228544WDTQ1","client_prop_url":"https://test-start.privatbank.ua:7355/MARS/Irbis/dbapi/getclientproperty.xml","client_prop_not_work":"N","SID":"160121pba1w2u36110rr","APP_CUST_ID":21254590,"APP_CUST_IMPORTANT":"Y"};

/****************START*******************/
function is_array (a) {
    return (typeof a == "object") && (a instanceof Array);
}

function datediff(date_start, date_end){
    date_s = new Date(date_start);
    var diff = Math.abs(date_end - date_s);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / one_day);
    return days;
}

data.APP_CUST_IMPORTANT_LIMIT=0;
data.APP_CUST_IMPORTANT="N";
//data.LOCAL_VIP_NO_NEED_SZ="N";

if (data.listclientproperty != undefined && data.listclientproperty.clientProperty != undefined) {
    var clientProperty;
    if (is_array(data.listclientproperty.clientProperty)) {
        clientProperty = data.listclientproperty.clientProperty;
    } else {
        clientProperty = new Array(data.listclientproperty.clientProperty);
    }
    if (clientProperty.length>0) {
        if (clientProperty[0]["@dateMod"]!=undefined) {
            data.APP_CUST_IMPORTANT_DATE = new Date(clientProperty[0]["@dateMod"]);
            /*if (datediff(data.APP_CUST_IMPORTANT_DATE, new Date()) < 6 * 30) {
                data.LOCAL_VIP_NO_NEED_SZ = "Y";
            }*/
        }
        data.APP_CUST_IMPORTANT_COM=clientProperty[0]["@docno"];
        data.APP_CUST_IMPORTANT_LIMIT=Number(clientProperty[0]["@limit"]);
        data.APP_CUST_IMPORTANT_PRODUCT=clientProperty[0]["@product"];
        data.APP_CUST_IMPORTANT="Y";
    }
}
/****************END*******************/
console.log(data);