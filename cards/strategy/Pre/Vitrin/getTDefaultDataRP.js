
data['DATA_DEFAULT_COUNT_D1'] = new Array();
data['DATA_DEFAULT_COUNT_D2'] = new Array();
data['DATA_DEFAULT_COUNT_D3'] = new Array();
data['DATA_DEFAULT_SHARE_D1'] = new Array();
data['DATA_DEFAULT_SHARE_D2'] = new Array();
data['DATA_DEFAULT_SHARE_D3'] = new Array();

if (data['tDefaultDataRP'] != null) {
    data['DATA_DEFAULT_COUNT_D1'] = data['tDefaultDataRP']['count_D1'];
    data['DATA_DEFAULT_COUNT_D2'] = data['tDefaultDataRP']['count_D2'];
    data['DATA_DEFAULT_COUNT_D3'] = data['tDefaultDataRP']['count_D3'];

    data['DATA_DEFAULT_SHARE_D1'] = data['tDefaultDataRP']['share_D1'];
    data['DATA_DEFAULT_SHARE_D2'] = data['tDefaultDataRP']['share_D2'];
    data['DATA_DEFAULT_SHARE_D3'] = data['tDefaultDataRP']['share_D3'];
}
delete data['tDefaultDataRP'];
