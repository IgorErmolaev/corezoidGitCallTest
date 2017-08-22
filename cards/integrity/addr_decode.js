var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\..\\resource\\addr_resp_example.json').toString();
var data = JSON.parse(json).data;
//console.log(json);

/****************START*******************/
//!!!var ADDRESS = data.APP_REG_ADDRESS; - для адреса регистрации
var paramName = "APP.ACT_ADDRESS";
var ADDRESS = data.APP_ACT_ADDRESS;
ADDRESS.UADID9 = ADDRESS.UADID;
ADDRESS.ID_REGION = "";
ADDRESS.SUBTOWN = "";
function is_array (a) {
    return (typeof a == "object") && (a instanceof Array);
}

function subtown_priority (subtown) {
    switch (subtown) {
        case "CITY":
            return 1;
            break;
        case "TOWN":
            return 2;
            break;
        case "PGT":
            return 3;
            break;
        case "VILLAGE":
            return 4;
            break;
        case "SMALL_VILLAGE":
            return 5;
            break;
        case "SETTLEMENT":
            return 6;
            break;
        default:
            return 7;
    }
}

if ( data.addressByAnswer.addr != undefined ) {
    var addr;
    if (is_array(data.addressByAnswer.addr)) {
        addr = data.addressByAnswer.addr;
    } else {
        addr = new Array(data.addressByAnswer.addr);
    }
    for (var addridx = 0 ;addridx<addr.length; addridx++) {
        if (addr[addridx]["@langCode"] == "RUS") {
            //для ответа для кц
            if (data.xml == undefined) {
                data.xml = [];
            }
            var addrxml = {};
            addrxml["@name"] = paramName;
            addrxml.doc = {};
            addrxml.doc.addr = {};
            addrxml.doc.addr.N = [];
            /*******************/

            var addrPath;
            if (is_array(addr[addridx].addrPath)) {
                addrPath = addr[addridx].addrPath;
            } else {
                addrPath = new Array(addr[addridx].addrPath);
            }
            var highestSubtownPriority = 0;
            var lowestIdForRegion = 4;
            for (var i=0; i<addrPath.length; i++) {
                //для ответа для кц
                var n = {};
                n["@c"] = addrPath[i]["@code"];
                n["@d"] = addrPath[i]["@desc"];
                n["@n"] = addrPath[i]["@nodeTypeId"];
                n["@s"] = addrPath[i]["@nodeTypeCode"];
                n["@t"] = addrPath[i]["@nodeTypeName"];
                addrxml.doc.addr.N.push(n);
                /*****************/
                //определение SUBTOWN
                if ( addrPath[i]["@nodeTypeId"] == "4") {

                    ADDRESS.CITY = addrPath[i]["@desc"];

                    var currSubtownPriority = subtown_priority(addrPath[i]["@nodeTypeCode"]);
                    if (currSubtownPriority > highestSubtownPriority && addrPath[i]["@nodeTypeCode"] && addrPath[i]["@nodeTypeCode"].trim().length>0) {
                        highestSubtownPriority = currSubtownPriority;
                        ADDRESS.SUBTOWN = addrPath[i]["@nodeTypeCode"];
                    }
                }
                //определение ID_REGION
                if ( addrPath[i]["@nodeTypeId"] == "2" || addrPath[i]["@nodeTypeId"] == "4") {
                    var currId = Number(addrPath[i]["@nodeTypeId"]);
                    if (currId >= lowestIdForRegion) {
                        lowestIdForRegion = currId;
                        ADDRESS.ID_REGION = addrPath[i]["@code"];
                    }
                }
                //определение айди дома
                if (addrPath[i]["@nodeTypeId"] == "9") {
                    ADDRESS.UADID9 = addrPath[i]["@code"]
                }
            }
        }
    }
    ADDRESS.addrxml = addrxml;
}
/****************END*******************/
console.log(data);