
if(data.DATA_RESTRUCT != undefined){
    if (data.ind <data.DATA_RESTRUCT.length){
        data.getRef = data.DATA_RESTRUCT[data.ind].REFERENCE;
        data.getCompl = data.DATA_RESTRUCT[data.ind].COMPLEX;
        if (data.getCompl == 'SYB'){
            data.getRef = data.getRef.substring(data.getRef.indexOf('@')+1);
        }
        data.ind++;
    }
    else{
        data.getCompl = '';
    }
}