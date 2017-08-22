var decl = [];


switch (true)
{
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D503')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D503'; decl.push('D503'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D505')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D505'; decl.push('D505'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D506')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D506'; decl.push('D506'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D549')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D549'; decl.push('D549'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D536')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D536'; decl.push('D536'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D512')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D512'; decl.push('D512'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D509')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D509'; decl.push('D509'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D508')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D508'; decl.push('D508'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D502')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D502'; decl.push('D502'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D510')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D510'; decl.push('D510'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D507')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D507'; decl.push('D507'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D537')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D537'; decl.push('D537'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D555')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D537'; decl.push('D555'); break;
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