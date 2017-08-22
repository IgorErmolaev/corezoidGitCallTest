var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\resource\\currrate_resp_example.json').toString();
var data = JSON.parse(json).data;
//console.log(data);

/****************START*******************/

if (data.currrate != undefined) {
    var toCurr = {};
    for (var i=0;i<data.currrate.length; i++) {
        toCurr[data.currrate[i].curr] = data.currrate[i].toCurr;
    }
    data.toCurr = toCurr;
}

/****************END*******************/

//console.log(data);