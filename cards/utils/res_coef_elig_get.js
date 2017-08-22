for (var i=0;i<data.matrix.length; i++) {
    if (data.matrix[i].border1 <= data.RES_SCCARD_TOTAL_SCORE && data.matrix[i].border2 > data.RES_SCCARD_TOTAL_SCORE) {
        if (data.RES_LIMIT_TYPE_MATRIX == 1) data.RES_COEFF_ELIG = data.matrix[i].probl1;
        else data.RES_COEFF_ELIG = data.matrix[i].probl2;
    }
}