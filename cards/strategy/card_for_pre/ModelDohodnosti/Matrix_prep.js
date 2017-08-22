
if (data.PROD_CHAR_BANK == 'PB') {
    if (data.RES_SCORE_REGION == 'BAD') {
        data.typeMatrix = 'MATRIX_MODEL_BAD';
    }
    else {
        if (data.RES_SCORE_REGION == 'OTHERS') {
            data.typeMatrix = 'MATRIX_MODEL_OTHER';
        }
        else {
            data.typeMatrix = 'MATRIX_MODEL_PREBAD';
        }
    }
}
else {
    if (data.PROD_CHAR_BANK == 'AB'){
        data.typeMatrix = 'MATRIX_MODEL_AB';
    }
}

data.nodeName = 'DohodMatrix';