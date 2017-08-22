/*--------------set MsgID----------------*/

switch (data.typeErr) {
    case 'timeOut':
        data.code = 'EC001';
        break;
    case 'dataCredit':
        data.code = 'EC002';
        break;
    case 'EKB':
        data.code = 'EC003';
        break;
    case 'address':
        data.code = 'EC004';
        break;
    case 'collider':
        data.code = 'EC005';
        break;
    case 'UBKI':
        data.code = 'EC006';
        break;
    case 'megaVitr':
        data.code = 'EC007';
        break;
    case 'propertyClient':
        data.code = 'EC008';
        break;
    case 'history':
        data.code = 'EC009';
        break;
    case 'limits':
        data.code = 'EC010';
        break;
    case 'blockGetServ':
        data.code = 'EC011';
        break;
    case 'antifraud':
        data.code = 'EC012';
        break;
    case 'P48limits':
        data.code = 'EC014';
        break;
    case 'KC':
        data.code = 'EC015';
        break;
    case 'calling':
        data.code = 'EC016';
        break;
    case 'save':
        data.code = 'EC017';
        break;
    case 'callback':
        data.code = 'EC018';
        break;
    case 'docs':
        data.code = 'EC019';
        break;
    case 'error':
        data.code = 'EC020';
        break;
    default :
        data.code = 'EC013';
}


data.MsgId = 'RTDM_CARDS.' + data.code;

/*--------------set errorMsg----------------*/
/*
if (data['__conveyor_api_return_http_code__'] != undefined){
    data.errorMsg = data['__conveyor_api_return_http_code__'];
}

if (data['__conveyor_api_return_description__'] != undefined){
    data.errorMsg = data['__conveyor_api_return_description__'];
}

if (data['__conveyor_code_return_description__'] != undefined){
    data.errorMsg = data['__conveyor_code_return_description__'];
}






var typeVIP = new Array('PPFT','REPL','EXIT','FREE','FORL','LOYL','UPGR','LOY1','FRE3','EXI2','FREG','PPF1','REP1','EXI1','FRE1','FOR1','LOYD','UPG1','LODB','EXID','EXIB','LOY2','LODM','VIPP',
'MCWS','MCWL','WS55','WS05','WS0P','WS5P','MCWF','WS00','INFI','INFA','INFL','INPA','INPI');

data.flVIP = 'N';
if (typeVIP.indexOf(data.PROD.CHAR_TYPE_CARD) != -1){
    data.flVIP = 'Y';
}


*/







