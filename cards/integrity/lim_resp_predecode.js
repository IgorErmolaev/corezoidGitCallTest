analis = "UPLIMINS";
if (analis == "UPLIMINS") {
    var fs = require('fs');
    var json = fs.readFileSync(__dirname + '\\..\\resource\\lim_resp_example.json').toString();
    var data = JSON.parse(json).data;
}
else {
    var fs = require('fs');
    var json = fs.readFileSync(__dirname + '\\..\\resource\\lim_norisk_resp_example.json').toString();
    var data = JSON.parse(json).data;
}
data.analis=analis;


/****************START*******************/

data.resp={};

if (data["__conveyor_api_array__"] != undefined && data["__conveyor_api_array__"].length > 0) {
    data.resp = data["__conveyor_api_array__"][0];
} else if (data["0"] != undefined) {
    data.resp = data["0"];
}

if (data.detailInfo != undefined) {
    data.resp.detailInfo = data.detailInfo;
}

/****************END*******************/

console.log(data);