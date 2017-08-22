
data.carModel = new Array();

if (data.APP_PROPERTY_CAR != undefined) {
    if (data.APP_PROPERTY_CAR.length != 0) {
        for (var i = 0; i < data.APP_PROPERTY_CAR.length; i++) {
            data.carModel.push(data.APP_PROPERTY_CAR[i].MODEL.toUpperCase());
        }
    }
}

if (data.PROD_CHAR_BANK == 'AB' || data.PROD_CHAR_BANK == 'PB'){
    data.bankAdd = 'UA';
}

data.nodeName = 'ExtraLimit_before';