var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\..\\PRE\\test.json').toString();
var data = JSON.parse(json).data;

//**********************************************************************

data.nextProcess = 'Y';

if (data.hist != undefined && data.stateFach != undefined && data.stateFach != 'e' && data.PROD_StatusFach != 'Y'){
    for (var i=0;i<data.hist.length;i++){
        if (data.hist[i].charType == 'FACH'){
            if(data.hist[i].name == 'RES_BI' && data.hist[i].value == 'GD'){
                var old_RES_BI = data.hist[i].value;
                var ref = data.hist[i].ref;
                for (var j=0;j<data.hist.length;j++){
                    if (data.hist[j].ref == ref){
                        if (data.hist[j].name == 'RES_LIMIT_P48') {
                            var old_RES_LIMIT_P48 = Number(data.hist[j].value);
                        }
                        if (data.hist[j].name == 'RES_DEC_REAS_FINAL_CODE') {
                            var old_RES_DEC_REAS_FINAL_CODE =data.hist[j].value;
                        }
                        if (data.hist[j].name == 'RES_CHAR_PLAT_MIN') {
                            var old_RES_CHAR_PLAT_MIN = Number(data.hist[j].value);
                        }
                        if (data.hist[j].name == 'PROD_CHAR_LIMITREQUESTED') {
                            var old_PROD_CHAR_LIMITREQUESTED = Number(data.hist[j].value);
                        }
                        if (data.hist[j].name == 'PROD_SCHEME_TERM') {
                            var old_PROD_SCHEME_TERM = Number(data.hist[j].value);
                        }
                        if (data.hist[j].name == 'PROD_CHAR_BANK') {
                            var old_PROD_CHAR_BANK = data.hist[j].value;
                        }
                        if (data.hist[j].name == 'RES_DEC_FINAL_FLOW') {
                            var old_RES_DEC_FINAL_FLOW = data.hist[j].value;
                        }
                        if (data.hist[j].name == 'RES_DEC_FINAL_CODE_COMMENT') {
                            var old_RES_DEC_FINAL_CODE_COMMENT = data.hist[j].value;
                        }
                    }
                }
                if (old_RES_LIMIT_P48>0 && (old_RES_LIMIT_P48 == Number(data.PROD_CHAR_LIMITREQUESTED) || Number(data.PROD_CHAR_LIMITREQUESTED) == old_PROD_CHAR_LIMITREQUESTED) &&
                    old_PROD_SCHEME_TERM == Number(data.PROD_SCHEME_TERM) && data.PROD_CHAR_BANK == old_PROD_CHAR_BANK){
                    data.nextProcess = 'N';
                    data.RES_PROD_TYPE = 'FACH';
                    data.RES_LIMIT_P48 = old_RES_LIMIT_P48;
                    data.RES_DEC_REAS_FINAL_CODE = old_RES_DEC_REAS_FINAL_CODE;
                    data.RES_CHAR_PLAT_MIN = old_RES_CHAR_PLAT_MIN;
                    data.RES_DEC_FINAL_FLOW = old_RES_DEC_FINAL_FLOW;
                    data.RES_DEC_FINAL_CODE_COMMENT = old_RES_DEC_FINAL_CODE_COMMENT;
                    data.RES_BI = old_RES_BI;
                    break;
                }

            }
        }
    }

    delete data.hist;
}


//****************************************

console.log(data.nextProcess);