var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\resource\\clientblock_resp_example.json').toString();
var data = JSON.parse(json).data;

/****************START*******************/
data.PROD_CLIENT_BLOCK="N";
if (data.clientBlock != undefined) data.PROD_CLIENT_BLOCK=data.clientBlock;
/****************END*******************/
console.log(data);