data.refActiveArray = [];

if (data.ClientApplications != undefined && data.ClientApplications.clientApplication != undefined){
    for (var i=0; i<data.ClientApplications.clientApplication.length; i++){
        if (data.ClientApplications.clientApplication[i]['@type'] == 'RESTRUCT' && data.ClientApplications.clientApplication[i]['@state'] == 'NN'){
            data.refActiveArray.push(data.ClientApplications.clientApplication[i]['@ref']);
        }
    }
}