var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\resource\\antifraud_resp_example.json').toString();
var data = JSON.parse(json).data;

/****************START*******************/
if (data.WaveResponse != undefined) {
    data.FRAUD_FRAUD_SUSPICTION = data.WaveResponse["FRAUD.FRAUD_SUSPICTION"]["#value"];
    data.FRAUD_DEC_FINAL_FLOW = data.WaveResponse["DECISION"]["#value"];
    data.FRAUD_DEC_REAS_CODE = data.WaveResponse["RULE_CODES"]["#value"];
}
/****************END*******************/
console.log(data);