var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\resource\\kchist_resp_example.json').toString();
var data = JSON.parse(json).data;


/****************START*******************/
if (data.underwrhist != undefined) {
    if (data.underwrhist.prodReturnKc != null && data.underwrhist.prodReturnKc.length > 0) {
        data.PROD_RETURN_KC=data.underwrhist.prodReturnKc;
    } else {
        data.PROD_RETURN_KC="N";
    }
}

/****************END*******************/
console.log(data);