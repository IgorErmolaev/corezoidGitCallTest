// JavaScript Document

var corp = new Array('229','230','237','232','200','233','255','259','260','261','265','266');
var koef = 0;

if (data.PROD_CHAR_BANK == 'PB') {
    switch (true) {
        case (data.RES_SCCARD_SCORE_1<=189): koef = 0.5; break;
        case (data.RES_SCCARD_SCORE_1>=190 && data.RES_SCCARD_SCORE_1<=212): koef = 0.5; break;
        case (data.RES_SCCARD_SCORE_1>=213 && data.RES_SCCARD_SCORE_1<=230): koef = 0.5; break;
        case (data.RES_SCCARD_SCORE_1>=231 && data.RES_SCCARD_SCORE_1<=246): koef = 0.5; break;
        case (data.RES_SCCARD_SCORE_1>=247 && data.RES_SCCARD_SCORE_1<=260): koef = 0.6; break;
        case (data.RES_SCCARD_SCORE_1>=261 && data.RES_SCCARD_SCORE_1<=271): koef = 0.6; break;
        case (data.RES_SCCARD_SCORE_1>=272 && data.RES_SCCARD_SCORE_1<=284): koef = 0.6; break;
        case (data.RES_SCCARD_SCORE_1>=285 && data.RES_SCCARD_SCORE_1<=296): koef = 0.6; break;
        case (data.RES_SCCARD_SCORE_1>=297 && data.RES_SCCARD_SCORE_1<=308): koef = 0.6; break;
        case (data.RES_SCCARD_SCORE_1>=309 && data.RES_SCCARD_SCORE_1<=319): koef = 0.6; break;
        case (data.RES_SCCARD_SCORE_1>=320 && data.RES_SCCARD_SCORE_1<=330): koef = 0.6; break;
        case (data.RES_SCCARD_SCORE_1>=331 && data.RES_SCCARD_SCORE_1<=342): koef = 0.6; break;
        case (data.RES_SCCARD_SCORE_1>=343 && data.RES_SCCARD_SCORE_1<=353): koef = 0.7; break;
        case (data.RES_SCCARD_SCORE_1>=354 && data.RES_SCCARD_SCORE_1<=365): koef = 0.7; break;
        case (data.RES_SCCARD_SCORE_1>=366 && data.RES_SCCARD_SCORE_1<=378): koef = 0.7; break;
        case (data.RES_SCCARD_SCORE_1>=379 && data.RES_SCCARD_SCORE_1<=391): koef = 0.7; break;
        case (data.RES_SCCARD_SCORE_1>=392 && data.RES_SCCARD_SCORE_1<=407): koef = 0.7; break;
        case (data.RES_SCCARD_SCORE_1>=408 && data.RES_SCCARD_SCORE_1<=427): koef = 0.7; break;
        case (data.RES_SCCARD_SCORE_1>=428 && data.RES_SCCARD_SCORE_1<=453): koef = 0.7; break;
        case (data.RES_SCCARD_SCORE_1>=454): koef = 0.7; break;
        default: koef = 0; break;
    }
}
if (data.PROD_CHAR_BANK == 'AB') {
    if (corp.indexOf(data.PROD_CHAR_CORPORATION) != -1) {
        switch (true) {
            case (data.RES_SCCARD_SCORE_1<=134): koef = 0.5; break;
            case (data.RES_SCCARD_SCORE_1>=135 && data.RES_SCCARD_SCORE_1<=158): koef = 0.5; break;
            case (data.RES_SCCARD_SCORE_1>=159 && data.RES_SCCARD_SCORE_1<=176): koef = 0.5; break;
            case (data.RES_SCCARD_SCORE_1>=177 && data.RES_SCCARD_SCORE_1<=193): koef = 0.5; break;
            case (data.RES_SCCARD_SCORE_1>=194 && data.RES_SCCARD_SCORE_1<=205): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=206 && data.RES_SCCARD_SCORE_1<=219): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=220 && data.RES_SCCARD_SCORE_1<=229): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=230 && data.RES_SCCARD_SCORE_1<=241): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=242 && data.RES_SCCARD_SCORE_1<=251): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=252 && data.RES_SCCARD_SCORE_1<=263): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=264 && data.RES_SCCARD_SCORE_1<=274): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=275 && data.RES_SCCARD_SCORE_1<=283): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=284 && data.RES_SCCARD_SCORE_1<=296): koef = 0.7; break;
            case (data.RES_SCCARD_SCORE_1>=297 && data.RES_SCCARD_SCORE_1<=307): koef = 0.7; break;
            case (data.RES_SCCARD_SCORE_1>=308 && data.RES_SCCARD_SCORE_1<=319): koef = 0.7; break;
            case (data.RES_SCCARD_SCORE_1>=320 && data.RES_SCCARD_SCORE_1<=332): koef = 0.7; break;
            case (data.RES_SCCARD_SCORE_1>=333 && data.RES_SCCARD_SCORE_1<=346): koef = 0.7; break;
            case (data.RES_SCCARD_SCORE_1>=347 && data.RES_SCCARD_SCORE_1<=365): koef = 0.7; break;
            case (data.RES_SCCARD_SCORE_1>=366 && data.RES_SCCARD_SCORE_1<=391): koef = 0.7; break;
            case (data.RES_SCCARD_SCORE_1>=392): koef = 0.7; break;
            default: koef = 0; break;
        }
    }
    else {
        switch (true) {
            case (data.RES_SCCARD_SCORE_1<=134): koef = 0.2; break;
            case (data.RES_SCCARD_SCORE_1>=135 && data.RES_SCCARD_SCORE_1<=158): koef = 0.2; break;
            case (data.RES_SCCARD_SCORE_1>=159 && data.RES_SCCARD_SCORE_1<=176): koef = 0.3; break;
            case (data.RES_SCCARD_SCORE_1>=177 && data.RES_SCCARD_SCORE_1<=193): koef = 0.3; break;
            case (data.RES_SCCARD_SCORE_1>=194 && data.RES_SCCARD_SCORE_1<=205): koef = 0.4; break;
            case (data.RES_SCCARD_SCORE_1>=206 && data.RES_SCCARD_SCORE_1<=219): koef = 0.4; break;
            case (data.RES_SCCARD_SCORE_1>=220 && data.RES_SCCARD_SCORE_1<=229): koef = 0.4; break;
            case (data.RES_SCCARD_SCORE_1>=230 && data.RES_SCCARD_SCORE_1<=241): koef = 0.4; break;
            case (data.RES_SCCARD_SCORE_1>=242 && data.RES_SCCARD_SCORE_1<=251): koef = 0.5; break;
            case (data.RES_SCCARD_SCORE_1>=252 && data.RES_SCCARD_SCORE_1<=263): koef = 0.5; break;
            case (data.RES_SCCARD_SCORE_1>=264 && data.RES_SCCARD_SCORE_1<=274): koef = 0.5; break;
            case (data.RES_SCCARD_SCORE_1>=275 && data.RES_SCCARD_SCORE_1<=283): koef = 0.5; break;
            case (data.RES_SCCARD_SCORE_1>=284 && data.RES_SCCARD_SCORE_1<=296): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=297 && data.RES_SCCARD_SCORE_1<=307): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=308 && data.RES_SCCARD_SCORE_1<=319): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=320 && data.RES_SCCARD_SCORE_1<=332): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=333 && data.RES_SCCARD_SCORE_1<=346): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=347 && data.RES_SCCARD_SCORE_1<=365): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=366 && data.RES_SCCARD_SCORE_1<=391): koef = 0.6; break;
            case (data.RES_SCCARD_SCORE_1>=392): koef = 0.6; break;
            default: koef = 0; break;
        }
    }
}
else {
    koef = 0;
}


data.RES_COEFF_ELIG = koef;