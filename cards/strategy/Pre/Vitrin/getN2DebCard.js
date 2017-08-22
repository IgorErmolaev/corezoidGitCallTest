
data['DATA_DEBCARD'] = new Array();

if (data["N2_DebCard"] != null) {
    localObj = data["N2_DebCard"];
    var arrKey = Object.keys(localObj);

    for (var i = 0; i < arrKey.length; i++) {
        data['DATA_DEBCARD'][i] = {};
        data['DATA_DEBCARD'][i]['BANK'] = data["N2_DebCard"][i]['bank'];
        data['DATA_DEBCARD'][i]['PAN'] = data["N2_DebCard"][i]['num_Card'];
        data['DATA_DEBCARD'][i]['CCY'] = data["N2_DebCard"][i]['currency'];
        data['DATA_DEBCARD'][i]['TYPE_CARD'] = data["N2_DebCard"][i]['type_Card'];
        data['DATA_DEBCARD'][i]['OKPO_ZP'] = data["N2_DebCard"][i]['okpo_Zp'];
        data['DATA_DEBCARD'][i]['DATE_START'] = new Date(data["N2_DebCard"][i]['date_Open']['time'] - data["N2_DebCard"][i]['date_Open']['timezoneOffset']*60*1000);
        data['DATA_DEBCARD'][i]['ACTIVE'] = data["N2_DebCard"][i]['active'];
        data['DATA_DEBCARD'][i]['Z01'] = data["N2_DebCard"][i]['z01'];
        data['DATA_DEBCARD'][i]['Z02'] = data["N2_DebCard"][i]['z02'];
        data['DATA_DEBCARD'][i]['Z03'] = data["N2_DebCard"][i]['z03'];
        data['DATA_DEBCARD'][i]['Z04'] = data["N2_DebCard"][i]['z04'];
        data['DATA_DEBCARD'][i]['C01'] = data["N2_DebCard"][i]['c01'];
        data['DATA_DEBCARD'][i]['C02'] = data["N2_DebCard"][i]['c02'];
        data['DATA_DEBCARD'][i]['C03'] = data["N2_DebCard"][i]['c03'];
        data['DATA_DEBCARD'][i]['C04'] = data["N2_DebCard"][i]['c04'];
    }
    delete data["N2_DebCard"];
}