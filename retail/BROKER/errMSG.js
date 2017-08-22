/*--------------set MsgID----------------*/

switch (data.typeErr) {
    case 'logic':
        data.code = 'R001';
        break;
    case 'state':
        data.code = 'R002';
        break;
    case 'score':
        data.code = 'R003';
        break;
    case 'valid':
        data.code = 'R004';
        break;
    case 'save':
        data.code = 'R005';
        break;
    case 'history':
        data.code = 'R006';
        break;
    case 'setBlock':
        data.code = 'R007';
        break;
    case 'block':
        data.code = 'R008';
        break;

    case 'kc':
        data.code = 'R009';
        break;

    default :
        data.code = 'R001';
}



data.MsgId = 'RTDM_RASSR.' + data.code;