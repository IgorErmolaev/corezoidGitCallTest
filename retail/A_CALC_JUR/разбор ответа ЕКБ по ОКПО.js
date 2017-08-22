function is_array (a) {
    return (typeof a == "object") && (a instanceof Array);
}

data.APP_CUST_ID_JUR =0;

if (data["doc"]["r"]["INF_NEW"] != undefined) {
    if (Array.isArray(data["doc"]["r"]["INF_NEW"]) == true) {
        data.APP_CUST_ID_JUR= data["doc"]["r"]["INF_NEW"][0]["@Id"];
    }
    else
    {
        data.APP_CUST_ID_JUR= data["doc"]["r"]["INF_NEW"]["@Id"];
    }
}

data.APP_CUST_ID_JUR = parseInt(data.APP_CUST_ID_JUR);

// ---------- адреса ----------------

data.APP_ACT_ADDRESS = new Object();
data.APP_REG_ADDRESS = new Object();
var regAddrFound = false;
var regAddrDate = "";
var actAddrFound = false;
var actAddrDate = "";

var ADDR_INF;
if (is_array(data.doc.r.INF_NEW.ADDR_INF)) {
    ADDR_INF = data.doc.r.INF_NEW.ADDR_INF;
} else {
    ADDR_INF = new Array(data.doc.r.INF_NEW.ADDR_INF);
}

for (var i=0; i<ADDR_INF.length; i++) {
    var addr = ADDR_INF[i];
    if (addr["@Type"] == "11" )  {
        if (regAddrFound == false && addr["@DTM"]>regAddrDate) {
            data.APP_REG_ADDRESS.UADID = addr["@UADId"];
            data.APP_REG_ADDRESS.KLADRCODE = addr["@KladrCode"];
            if (data.APP_REG_ADDRESS.KLADRCODE == 'null') data.APP_REG_ADDRESS.KLADRCODE="";
            regAddrDate = addr["@DTM"];
            if (addr["@Main"] == "Y") {
                regAddrFound = true;
            }
        }
    }
    if (addr["@Type"] == "12" )  {
        if (actAddrFound == false && addr["@DTM"]>actAddrDate) {
            data.APP_ACT_ADDRESS.UADID = addr["@UADId"];
            data.APP_ACT_ADDRESS.KLADRCODE = addr["@KladrCode"];
            /*            if (data.APP_ACT_ADDRESS_ESTATETYPE != null) {
             data.APP_ACT_ADDRESS.ESTATETYPE = data.APP_ACT_ADDRESS_ESTATETYPE; // одинаковый для всех, Тоня капризная баба
             }
             */
            if (data.APP_ACT_ADDRESS.KLADRCODE == 'null') data.APP_ACT_ADDRESS.KLADRCODE="";
            actAddrDate = addr["@DTM"];
            if (addr["@Main"] == "Y") {
                actAddrFound = true;
            }
        }
    }
}

if (regAddrFound || regAddrDate != "") {
    data.reg_addr_found=true;
}

if (actAddrFound || actAddrDate != "") {
    data.act_addr_found=true;
}

if (data.reg_addr_found && data.act_addr_found && data.APP_ACT_ADDRESS.UADID == data.APP_REG_ADDRESS.UADID) {
    data.APP_ACT_ADDRESS_REG_EQUAL="Y";
} else {
    data.APP_ACT_ADDRESS_REG_EQUAL="N";
}

delete  data["doc"];