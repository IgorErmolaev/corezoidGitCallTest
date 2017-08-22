if (data.userID == 9241){
    data.urlCalback = 'https://start.privatbank.ua:7585/Irbis/conveyor/restnbsm.json';
    data.urlSave = 'https://rtdm.it.loc/RTDMApi/log/insert.json';
    data.urlBase = 'https://rmsvc.privatbank.ua/service';
}
else {
    if (data.stateB == 'Y'){
        if (data.urlCalback == undefined || data.urlCalback==null){
            data.urlCalback = 'http://ac-pb-ua-master.isto.it.loc/response-restructuring/';
        }
        data.urlSave = 'https://rtdm.it.loc/RTDMApi/log/insert.json';
        data.urlBase = 'https://rmsvc.privatbank.ua/service';
    }
    else {
        if (data.noDocs == 'Y') {
            data.urlCalback = '';
            data.urlSave = 'https://rtdm.test.it.loc/RTDMApi/log/insert.json';
            data.urlBase = 'https://rmsvc.privatbank.ua/service';
        }
        else {
            data.urlCalback = '';//https://test-start.privatbank.ua:7355/Irbis/conveyor/restnbsm.json';
            data.urlSave = 'http://rtdm.test.it.loc/RTDMApi/log/insert.json';
            data.urlBase = 'https://rmsvc.privatbank.ua/service';
        }
    }
}

