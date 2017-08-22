var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\resource\\callhist_resp_example.json').toString();
var data = JSON.parse(json).data;

/****************START*******************/
if (data.callhist != undefined) {
    for (var key in data.callhist) {
        if (data.callhist.hasOwnProperty(key)) {
            for (var i=0; i<data.APP_PHONE.length;i++){
                if (data.APP_PHONE[i].NUMBER_CALL == key) {
                    data.APP_PHONE[i].CALL_QA = data.callhist[key].callQa;
                    data.APP_PHONE[i].CALL_QA_DECODE = data.callhist[key].callQaDecode;
                    data.APP_PHONE[i].CALL_BAL_HIST = data.callhist[key].resCallBalHist;
                    data.APP_PHONE[i].CALL_TOTAL_HIST = data.callhist[key].resCallTotal;
                }
            }
        }
    }
}
/****************END*******************/
console.log(data);