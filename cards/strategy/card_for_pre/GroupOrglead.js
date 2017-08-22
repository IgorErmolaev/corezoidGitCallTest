var LOCAL_TEST_SCORE = 'N';
var LOCAL_TEST_BAD = 'N';

if (data.APP_CUST_ORGLEAD == 'Y') {
    for (var i = 0; i < data.RES_DEC_REAS_CODE_TABLE.length; i++) {
        if (data.RES_DEC_REAS_CODE_TABLE[i] == 'L128' || data.RES_DEC_REAS_CODE_TABLE[i] == 'L127' || (data.RES_DEC_REAS_CODE_TABLE[i] == 'L121' && data.RES_TYPE_CUST == 'INTERN')) {
            LOCAL_TEST_SCORE = 'Y';
        }
        else {
            if (data.RES_DEC_REAS_CODE_TABLE[i] != 'A101') {
                LOCAL_TEST_BAD = 'Y';
            }
        }
    }

    if (LOCAL_TEST_SCORE == 'Y' && LOCAL_TEST_BAD == 'N') {
        if (data.RES_DEC_REAS_CODE_TABLE.indexOf('L121') != -1 && data.RES_TYPE_CUST == 'INTERN') {
            data.LOCAL_DEC_REAS_CODE_TABLE_1.splice(data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L121'), 1);
            data.RES_DEC_REAS_CODE_TABLE.splice(data.RES_DEC_REAS_CODE_TABLE.indexOf('L121'), 1);
        }
        data.LOCAL_DEC_REAS_CODE_TABLE_1.splice(data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L128'), 1);
        data.RES_DEC_REAS_CODE_TABLE.splice(data.RES_DEC_REAS_CODE_TABLE.indexOf('L128'), 1);

        data.LOCAL_DEC_REAS_CODE_TABLE_1.splice(data.LOCAL_DEC_REAS_CODE_TABLE_1.indexOf('L127'), 1);
        data.RES_DEC_REAS_CODE_TABLE.splice(data.RES_DEC_REAS_CODE_TABLE.indexOf('L127'), 1);

        data.LOCAL_DEC_CATEGORY_1.length = 0;
        data.LOCAL_DEC_CATEGORY_1.push('ACCEPT');
        data.LOCAL_DEC_TEXT_1.length = 0;
        data.LOCAL_DEC_TEXT_1.push('Accept application');
        data.RES_DEC_CATEGORY = 'ACCEPT';
        data.RES_DEC_TEXT = 'Accept application';

    }
    data.RES_LIMIT_ITOG = Math.max(data.RES_LIMIT_ITOG, 8000);
    data.RES_LIMIT_ITOG_TYPE = 'ORGLEAD';

}

data.nodeName = 'GroupOrglead';