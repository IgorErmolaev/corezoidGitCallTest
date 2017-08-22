data['DATA_ATTRACT_CHANNEL'] = new Array();
data['DATA_ATTRACT_DATE'] = new Array();
data['DATA_ATTRACT_PHONE_MODEL'] = new Array();
data['DATA_ATTRACT_PHONE_OS'] = new Array();
data['DATA_ATTRACT_SHELF'] = new Array();


if (data["tRefSource_RS_MCPB"] != null){
    localObjS = data["tRefSource_RS_MCPB"];
    var arrKeyS = Object.keys(localObjS);

    for (var i=0; i< arrKeyS.length; i++) {
        if (data["tRefSource_RS_MCPB"][i]['source']!= ''){
            data['DATA_ATTRACT_DATE'].push(new Date(data["tRefSource_RS_MCPB"][i]['dateOdb']['time'] - data["tRefSource_RS_MCPB"][i]['dateOdb']['timezoneOffset']*60*1000));
            data['DATA_ATTRACT_CHANNEL'].push(data["tRefSource_RS_MCPB"][i]['source']);
            data['DATA_ATTRACT_SHELF'].push('');
        }
    }
    delete data["tRefSource_RS_MCPB"];
}

if (data["tCrossSelling"] != null) {
    localObj = data["tCrossSelling"];
    var arrKey = Object.keys(localObj);

    for (var i = 0; i < arrKey.length; i++) {
        data['DATA_ATTRACT_DATE'].push(new Date(data["tCrossSelling"][i]['date_Request']['time'] - data["tCrossSelling"][i]['date_Request']['timezoneOffset']*60*1000));
        data['DATA_ATTRACT_SHELF'].push(data['tCrossSelling'][i]['sours_Code']);
        data['DATA_ATTRACT_CHANNEL'].push('CROSS');
        if (data['tCrossSelling'][i]['phone_Model'] != '') {
            data['DATA_ATTRACT_PHONE_MODEL'].push(data['tCrossSelling'][i]['phone_Model']);
        }
        if (data['tCrossSelling'][i]['phone_Os'] != '') {
            data['DATA_ATTRACT_PHONE_OS'].push(data['tCrossSelling'][i]['phone_Os']);
        }
        if (data['tCrossSelling'][i]['cust_Inn_Agent'] != '0') {
            data['DATA_EMPL_PROB_LDAP_MANAGER'] = data['tCrossSelling'][i]['cust_Inn_Agent'];
        }
    }
    delete data["tCrossSelling"];
}



data['RES_CHANNEL'] = '';
data['RES_CHANNEL_SHELF'] = '';
data['RES_CHANNEL_SHELF_DATE'] = '';

if (data['DATA_ATTRACT_CHANNEL'].length != 0){
    if (data['DATA_ATTRACT_CHANNEL'].indexOf('CALL') != -1){
        data['RES_CHANNEL'] = 'CALL';
        data['RES_CHANNEL_SHELF'] = data['DATA_ATTRACT_SHELF'][data['DATA_ATTRACT_CHANNEL'].indexOf('CALL')];
        data['RES_CHANNEL_SHELF_DATE'] = data['DATA_ATTRACT_DATE'][data['DATA_ATTRACT_CHANNEL'].indexOf('CALL')];
    }
    else {
        if (data['DATA_ATTRACT_CHANNEL'].indexOf('CROSS') != -1){
            data['RES_CHANNEL'] = 'CALL';
            data['RES_CHANNEL_SHELF'] = data['DATA_ATTRACT_SHELF'][data['DATA_ATTRACT_CHANNEL'].indexOf('CROSS')];
            data['RES_CHANNEL_SHELF_DATE'] = data['DATA_ATTRACT_DATE'][data['DATA_ATTRACT_CHANNEL'].indexOf('CROSS')];
        }
        else {
            if (data['DATA_ATTRACT_CHANNEL'].indexOf('CARD') != -1){
                data['RES_CHANNEL'] = 'CARD';
                data['RES_CHANNEL_SHELF'] = data['DATA_ATTRACT_SHELF'][data['DATA_ATTRACT_CHANNEL'].indexOf('CARD')];
                data['RES_CHANNEL_SHELF_DATE'] = data['DATA_ATTRACT_DATE'][data['DATA_ATTRACT_CHANNEL'].indexOf('CARD')];
            }
        }
    }
}