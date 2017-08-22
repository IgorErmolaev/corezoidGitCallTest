data['DATA_LINK'] = new Array();

if (data["N2_SotrLinks"] != null) {
    localObj = data["N2_SotrLinks"];
    var arrKey = Object.keys(localObj);

    for (var i = 0; i < arrKey.length; i++) {
        data['DATA_LINK'][i] = {};
        data['DATA_LINK'][i]['TYPE'] = data["N2_SotrLinks"][i]['linkType'];
        data['DATA_LINK'][i]['CUST_ID'] = data["N2_SotrLinks"][i]['clientIDKin'];
        data['DATA_LINK'][i]['SOTR_WORK'] = data["N2_SotrLinks"][i]['isWorking'];
        data['DATA_LINK'][i]['CUST_SOTR_ID'] = data["N2_SotrLinks"][i]['clientIDSotr'];
        data['DATA_LINK'][i]['BANK'] = data["N2_SotrLinks"][i]['bank'];
    }
    delete data["N2_SotrLinks"];
}