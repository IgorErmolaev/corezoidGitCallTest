// JavaScript Document
   // JavaScript Document

var decl = [];
var declOver = [];


switch (true)
{
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D047')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D047'; decl.push('D047'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D008')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D008'; decl.push('D008'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D010')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D010'; decl.push('D010'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D012')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D012'; decl.push('D012'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D022')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D022'; decl.push('D022'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D029')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D029'; decl.push('D029'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D001')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D001'; decl.push('D001'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D028')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D028'; decl.push('D028'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D027')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D027'; decl.push('D027'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D046')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D046'; decl.push('D046'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D045')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D045'; decl.push('D045'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D044')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D044'; decl.push('D044'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D011')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D011'; decl.push('D011'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D049')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D049'; decl.push('D049'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D050')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D050'; decl.push('D050'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D025')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D025'; declOver.push('D025'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D009')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D009'; declOver.push('D009'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D018')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D018'; declOver.push('D018'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D019')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D019'; declOver.push('D019'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D021')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D021'; declOver.push('D021'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D015')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D015'; declOver.push('D015'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D017')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D017'; declOver.push('D017'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D020')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D020'; declOver.push('D020'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D013')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D013'; declOver.push('D013'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D024')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D024'; declOver.push('D024'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D016')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D016'; declOver.push('D016'); break;
    default:   data.RES_DEC_REAS_FINAL_CODE = 'A101';
}

if (decl.length>0){
    data.RES_DEC_CATEGORY = 'DECLINE';
    data.RES_DEC_FINAL_FLOW = 'DECLINE';
    data.RES_DEC_TEXT ='Decline application';
}
else
{
    if (declOver.length>0) {
        data.RES_DEC_CATEGORY = 'DECLINE_OVVERIDE';
        data.RES_DEC_FINAL_FLOW = 'DECLINE';
        data.RES_DEC_TEXT ='To underwriter';
    }
    else {
        data.RES_DEC_REAS_CODE_TABLE.push('A101');
        data.RES_DEC_CATEGORY = 'ACCEPT';
        data.RES_DEC_FINAL_FLOW = 'ACCEPT';
        data.RES_DEC_TEXT ='Accept application';
    }
}

data.RES_HISTORY_REAS_CODE = data.RES_DEC_REAS_CODE_TABLE.join(';');