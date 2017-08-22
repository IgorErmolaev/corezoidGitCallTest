// JavaScript Document

data.KC_CHAR_PLAT_MIN = 0;
data.KC_LIMIT_P48 = 0;
data.KC_FINAL_CODE = '';



if (data.hist != undefined) {
    for (var i = 0; i < data.hist.length; i++) {
        if ( data.hist[i].value != null && data.hist[i].charType == data.PROD_CHAR_TYPE ) {
            if (data.hist[i].name == 'RES_CHAR_PLAT_MIN') {
                data.KC_CHAR_PLAT_MIN = Number(data.hist[i].value);
            }
            if (data.hist[i].name == 'RES_LIMIT_P48') {
                data.KC_LIMIT_P48 = Number(data.hist[i].value);
            }
            if (data.hist[i].name == 'RES_DEC_REAS_FINAL_CODE') {
                data.KC_FINAL_CODE = data.hist[i].value;
            }
            if (data.hist[i].name == 'PROD_SCHEME_TERM') {
                data.KC_SCHEME_TERM = data.hist[i].value;
            }
        }
    }
}

if (data.KC_FINAL_CODE == 'A102') {
    data.KC_FINAL_CODE = 'A101';
}