// JavaScript Document

code_jur = new Array();
data.j_nclient = 'A101';

var bad_k050 = ['130','140','145','150','180','185','190','235','310','320','330','340','350','390','400','410','420','425','430','610','810','815',
    '820','825','830','835','840','845','850','855','860','920','925'];


//----------Проверка блокировки поручителя----
if (data.OKPO_BLOCK == 'Y') {
    code_jur.push('D009');
}
//--------------Проверка  поручителя на форму хозяйствования--------

data.neg_k050 = 'N';

if (bad_k050.indexOf(data.k050) != -1) {
    data.neg_k050 = 'Y';
}
if (data.neg_k050 == 'Y') {
    code_jur.push('D017');
}

//-------Стоп по юр.лицу-----------------

if (data.BlackCode == '66') {
    code_jur.push('D005');
}


//---------Проверка связи физ и юр лица

if (data.okpo != data.INN) {
    if (data.LinkName == undefined) {
        code_jur.push('D011');
    }
    /*
     else {
     var link = data.LinkName.split(';');
     if (link.indexOf('УЧРЕДИТЕЛИ') == -1 && link.indexOf('УЧРЕДИТЕЛЬ') == -1 ) {
     data.RES_DEC_REAS_CODE_TABLE.push('D011');
     }
     }
     */
}

if (code_jur.length>0) {
    switch(true) {
        case (code_jur.indexOf('D011') != -1): data.j_nclient = 'D011'; break;
        case (code_jur.indexOf('D009') != -1): data.j_nclient = 'D009'; break;
        case (code_jur.indexOf('D005') != -1): data.j_nclient = 'D005'; break;
        case (code_jur.indexOf('D017') != -1): data.j_nclient = 'D017'; break;
        default:   data.j_nclient = 'D500';
    }
}