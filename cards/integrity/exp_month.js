var data = { "APP_ACT_ADDRESS": {
        "ADDLINK_LAST": "N",
        "SUBTOWN": "PGT",
        "ID_REGION": "UA4973",
        "UADID9": "5722LD4LU0000A",
        "UADID": "57DP7B5GK0000A"
    },
    "APP_REG_ADDRESS": {
        "ADDLINK_LAST": "N",
        "SUBTOWN": "PGT",
        "ID_REGION": "UA4973",
        "UADID9": "5722LD4LU0000A",
        "UADID": "57DP7B5GK0000A"
    },
    "PROD_CHAR_BANK":"PB",
    "PROD_CHAR_BRANCH":"DNC1",
    "APP_EMPL_ORGTYPE":"BLABLA",
    "APP_EMPL_SOCIALSTATUS":"PENS"
};


/****************START*******************/
const KIEV_PB = ["KI","K2","K3","K4","K5"];
const KIEV_AB = ["A3K2","A3K6","ABAA","A3K7","A213","A3K8","AN7K"];
const EXP_MONTH = {"PB":1684,"PB_COUNT":949,"PB_Kyiv":2000,"PB_Kyiv_Pens":1312,"PB_Pens":1312};

var kievBranch = -1;
var bank;
if (data.PROD_CHAR_BRANCH == undefined) {
    kievBranch = -1;
} else if ( data.PROD_CHAR_BANK == "PB") {
    kievBranch = KIEV_PB.indexOf(data.PROD_CHAR_BRANCH.substring(0,2));
} else if ( data.PROD_CHAR_BANK == "AB") {
    kievBranch = KIEV_AB.indexOf(data.PROD_CHAR_BRANCH);
}

if (["SETL_CITY","SETL_COUN","COUNTRY","PGT","SETTLEMENT","SMALL_VILLAGE","VILLAGE"].indexOf(data.APP_ACT_ADDRESS.SUBTOWN) > -1) {
    bank = "PB_COUNT";
} else if (data.APP_EMPL_SOCIALSTATUS =="PENSION") {
    if (kievBranch > -1) {
        bank="PB_Kyiv_Pens";
    }
    else {
        bank="PB_Pens";
    }
} else if (kievBranch > -1) {
    bank="PB_Kyiv";
} else bank="PB";

data.RES_EXP_MONTH_TOTAL = EXP_MONTH[bank];

data.nodeName = 'exp_month';

/****************END*******************/
console.log(data);