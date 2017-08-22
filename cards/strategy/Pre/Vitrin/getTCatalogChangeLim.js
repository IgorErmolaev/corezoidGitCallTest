data['DATA_LIMIT_DOWN_CATALOGE_DATE'] = new Array();
data['DATA_LIMIT_DOWN_CATALOGE_REF'] = new Array();
data['DATA_LIMIT_DOWN_CATALOGE'] = new Array();
var CATALOGE_DATE;

if (data["tCatalogChangeLim"] != null) {
    localObj = data["tCatalogChangeLim"];
    var arrKey = Object.keys(localObj);

    for (var i = 0; i < arrKey.length; i++) {

        CATALOGE_DATE = new Date(data["tCatalogChangeLim"][i]['datechange'].substring(0,10));
        data['DATA_LIMIT_DOWN_CATALOGE_DATE'].push(CATALOGE_DATE);
        data['DATA_LIMIT_DOWN_CATALOGE_REF'].push(data["tCatalogChangeLim"][i]['refContract']);
        data['DATA_LIMIT_DOWN_CATALOGE_REF'][i] = data['DATA_LIMIT_DOWN_CATALOGE_REF'][i].trim();
        data['DATA_LIMIT_DOWN_CATALOGE'].push(data["tCatalogChangeLim"][i]['changeLimitType']);
        data['DATA_LIMIT_DOWN_CATALOGE'][i] = data['DATA_LIMIT_DOWN_CATALOGE'][i].trim();
    }
    delete data["tCatalogChangeLim"];
}

