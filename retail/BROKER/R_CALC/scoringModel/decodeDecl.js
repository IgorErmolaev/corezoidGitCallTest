/*{{conv[105434].ref[RES_SCCARD_DECIL].DECIL}}*/

data.declNum = 0;
if (data.decl != undefined) {
    for (var i = 0; i < data.decl.length; i++) {
        if (data.decl[i].border1 <= data.RES_SCCARD_SCORE_1 && data.decl[i].border2 > data.RES_SCCARD_SCORE_1) {
            data.declNum = i;
        }
    }
}
