var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\resource\\bln_addr_resp_example.json').toString();
var data = JSON.parse(json).data;

console.log(json);


/****************START*******************/
var ADDRESS = data.APP_REG_ADDRESS; /*var ADDRESS = data.APP_ACT_ADDRESS; - для адреса проживания*/
ADDRESS.ADDLINK_LAST = "N";

if ( data.doc.r.BLNADDR_LST != undefined && data.doc.r.BLNADDR_LST["@BlackAddrSt"] == "A") {

    const BL_ADDR_CODE = [1,2,8,9,12,13];

    var code = Number(data.doc.r.BLNADDR_LST["@BlackAddrType2"]);
    var bluadid = data.doc.r.BLNADDR_LST["@UADId"];
    if (BL_ADDR_CODE.indexOf(code) > -1 ) {
        if (bluadid == ADDRESS.UADID) {
            ADDRESS.ADDLINK_LAST = "Y";
        } else if ( bluadid == ADDRESS.UADID9 && ADDRESS.ADDLINK_LAST != "Y" ) {
            ADDRESS.ADDLINK_LAST = "P";
        }
    }
}

/****************END*******************/