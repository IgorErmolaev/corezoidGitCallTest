data.arrP48Ref = [];

 if (data.DATA_RESTRUCT != undefined){
    for (var i=0; i<data.DATA_RESTRUCT.length; i++){
        if (data.DATA_RESTRUCT[i].REFERENCE != undefined && data.DATA_RESTRUCT[i].COMPLEX == 'P48'){
            data.arrP48Ref.push(data.DATA_RESTRUCT[i].REFERENCE);
        }
    }
 }
data.endP48Ref = 'N';
data.indP48Ref = 0;



//-------------------------------------------------------------

if (data.arrP48Ref != undefined && data.indP48Ref<data.arrP48Ref.length){
    data.refP48Ref = data.arrP48Ref[data.indP48Ref];
    data.indP48Ref ++;
}
else{
    data.endP48Ref = 'Y';
}

//-------------------------------------------------------------

if (data.reference != 'Not found in FIID DN97'){
    for (var i=0; i< data.DATA_RESTRUCT.length; i++){
        if (data.refP48Ref==data.DATA_RESTRUCT[i].REFERENCE){
            data.DATA_RESTRUCT[i].OVER_PROC = parseFloat(data.over_proc);
            data.DATA_RESTRUCT[i].OVER_BODY = parseFloat(data.over_body);
            data.DATA_RESTRUCT[i].OVER_COM = parseFloat(data.over_com);
            data.DATA_RESTRUCT[i].NORM_COM = parseFloat(data.norm_com);
            data.DATA_RESTRUCT[i].NORM_BODY = parseFloat(data.norm_body);
            if (data.norm_proc!= undefined){
                data.DATA_RESTRUCT[i].NORM_PROC += parseFloat(data.norm_proc);
            }
            data.DATA_RESTRUCT[i].FINE = parseFloat(data.fine);
            data.DATA_RESTRUCT[i].BALCONTR = parseFloat(data.balcontr);
            data.DATA_RESTRUCT[i].PAN = data.pan;
            data.DATA_RESTRUCT[i].RATE = parseFloat(data.rate);
            data.DATA_RESTRUCT[i].FL_GD = parseInt(data.fl_gd);
            data.DATA_RESTRUCT[i].CTYPE = data.contracttypeplat;
            data.DATA_RESTRUCT[i].BANK = data.bank;
            data.DATA_RESTRUCT[i].SUMREPEX = parseFloat(data.sumrepex);
            data.DATA_RESTRUCT[i].COMPLEX = data.complex;
            data.DATA_RESTRUCT[i].EXAGE = parseFloat(data.exage);

        }
    }
}