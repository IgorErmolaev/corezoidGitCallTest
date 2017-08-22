var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\..\\..\\resource\\prior_final_code_example.json').toString();
var data = JSON.parse(json).data;

/****************START*******************/
var fin_code;
var fin_code_comment;
var curr_prior;
data.RES_DEC_FINAL_COMMENT = "";

for (var i=0;i<data.FIN_REAS_CODE_TABLE.length;i++){
    var code = data.code_list[data.FIN_REAS_CODE_TABLE[i]];
    if (code != null ) {
        if (curr_prior == undefined) {
            curr_prior = code.priority;
        }
        if (code.priority <= curr_prior) {
            curr_prior = code.priority;
            fin_code = data.FIN_REAS_CODE_TABLE[i];
            fin_code_comment = code.L101;
        }
        data.RES_DEC_FINAL_COMMENT = data.RES_DEC_FINAL_COMMENT + code.L101 + ";";
    }
}
data.RES_DEC_REAS_FINAL_CODE = fin_code;
data.RES_DEC_FINAL_CODE_COMMENT = fin_code_comment;

delete data.code_list;


/****************END*******************/
console.log(data);