data.status = 'okref';

if (data.convjr_history != undefined && data.convjr_history.length>0 ){
    for (var i=0; i<data.convjr_history.length; i++){
        if (data.convjr_history[i].state == 'ENDMN' ){
            data.status = 'none';
            break;
        }
        if (['CREDR','LOGIC','GNPAN', 'WRITE','ENDPR'].indexOf(data.convjr_history[i].state) != -1){
            data.status = 'hasRestr';
            break;
        }
        if (data.convjr_history[i].state == 'CLTEH'){
            data.status = 'none';
        }
    }
}
else {
    data.status = 'none';
}