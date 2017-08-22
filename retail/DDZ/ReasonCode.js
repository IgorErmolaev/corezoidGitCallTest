// JavaScript Document
var decl = [];


switch (true)
{
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('7503')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D703'; decl.push('D703'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D702')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D702'; decl.push('D702'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D704')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D506'; decl.push('D704'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D705')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D549'; decl.push('D705'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D707')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D707'; decl.push('D707'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D706')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D706'; decl.push('D706'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D713')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D713'; decl.push('D713'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D701')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D701'; decl.push('D701'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D709')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D709'; decl.push('D709'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D710')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D710'; decl.push('D710'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D711')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D711'; decl.push('D711'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D712')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D712'; decl.push('D712'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D725')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D725'; decl.push('D725'); break;
    default:   data.RES_DEC_REAS_FINAL_CODE = 'A101';
}

if (decl.length>0){
    data.RES_DEC_CATEGORY = 'DECLINE';
    data.RES_DEC_FINAL_FLOW = 'DECLINE';
    data.RES_DEC_TEXT ='Decline application';
}
else
{
    data.RES_DEC_REAS_CODE_TABLE.push('A101');
    data.RES_DEC_CATEGORY = 'ACCEPT';
    data.RES_DEC_FINAL_FLOW = 'ACCEPT';
    data.RES_DEC_TEXT ='Accept application';
}

data.RES_HISTORY_REAS_CODE = data.RES_DEC_REAS_CODE_TABLE.join(';');