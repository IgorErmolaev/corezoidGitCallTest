/*--------------set MsgID----------------*/

switch (data.typeErr) {
    case 'logic':
        data.code = 'EC001';
        break;
    case 'promise':
        data.code = 'EC002';
        break;
    case 'cost':
        data.code = 'EC003';
        break;
    case 'callback':
        data.code = 'EC004';
        break;
    case 'save':
        data.code = 'EC005';
        break;
    case 'history':
        data.code = 'EC006';
        break;
    case 'state':
        data.code = 'EC007';
        break;
    case 'gen2620':
        data.code = 'EC008';
        break;
    case 'restrwithout':
        data.code = 'EC009';
        break;
    case 'invoce':
        data.code = 'EC010';
        break;
    case 'sms':
        data.code = 'EC011';
        break;
    case 'trestruct':
        data.code = 'EC012';
        break;
    case 'balancecardp48':
        data.code = 'EC013';
        break;
    case 'balancerefp48':
        data.code = 'EC014';
        break;
    case 'balanceodb':
        data.code = 'EC015';
        break;
    case 'spisan':
        data.code = 'EC016';
        break;
    case 'balance':
        data.code = 'EC017';
        break;
    case 'close2620':
        data.code = 'EC018';
        break;
    case 'escalation':
        data.code = 'EC019';
        break;
    case 'genvirt':
        data.code = 'EC020';
        break;
    case 'written':
        data.code = 'EC021';
        break;
    case 'ProblemClients': // no err
        data.code = 'EC022';
        break;
    case 'wave': // no err
        data.code = 'EC023';
        break;
    case 'purse': // no err
        data.code = 'EC024';
        break;



    default :
        data.code = 'EC001';
}


data.MsgId = 'RESTRUCT.' + data.code;
