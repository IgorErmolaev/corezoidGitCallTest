function sortArrRef (a,b){
    if (a != undefined && b!= undefined){
        var datA = Number(a.substr(0,6));
        var datB = Number(b.substr(0,6));
    }
    if (datA>datB){
        return 1;
    }
    else {
        return -1;
    }
}


var arrRestr = [];

if (data.ClientApplications!= undefined && data.ClientApplications.clientApplication != undefined){
    if (Array.isArray(data.ClientApplications.clientApplication)){
        for(var i=0; i<data.ClientApplications.clientApplication.length; i++){
            if (data.ClientApplications.clientApplication[i]['@type'] == 'RESTRUCT'){
                arrRestr.push(data.ClientApplications.clientApplication[i]['@ref'].trim());
            }
        }
        arrRestr.sort(sortArrRef);
        data.refWave = arrRestr[arrRestr.length-1];
        for(var i=0; i<data.ClientApplications.clientApplication.length; i++){
            if (data.ClientApplications.clientApplication[i]['@ref'] == data.refWave){
                data.stateRefWave = data.ClientApplications.clientApplication[i]['@state'].trim();
            }
        }
    }
    else {
        if (data.ClientApplications.clientApplication['@type']== 'RESTRUCT'){
            data.refWave = data.ClientApplications.clientApplication['@ref'].trim();
            data.stateRefWave = data.ClientApplications.clientApplication['@state'].trim();
        }
    }


}
else {
    data.stateApp = 'error';
}