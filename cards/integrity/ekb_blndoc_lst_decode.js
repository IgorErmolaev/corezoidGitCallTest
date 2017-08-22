var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\resource\\bln_doc_resp_example.json').toString();
var data = JSON.parse(json).data;




/****************START*******************/
if (data.doc.r.o.BLNDOC_LST != undefined) {
    for (var i=0 ; i<data.DATA_PERSLINK.length;i++) {
        if ( data.DATA_PERSLINK[i].CUST_ID == data.APP_CUST_ID ) {
            data.DATA_PERSLINK[i].PASS="Y";
        }
    }
    if (data.LOCAL_DOC_IDENT_MAIN == "PASSPORT") {
        data.DATA_LOSTPASS_ISBADPASS = "Y";
    }
}

/****************END*******************/

console.log(data);