var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\..\\resource\\dic_doc_type_resp_example.json').toString();
var data = JSON.parse(json).data;

/**/
data.DOC_IDENT= [
    {
        "IDENT_MAIN": "Y",
        "WEIGHT": 60,
        "DESCR": "Cвидетельство о рождении",
        "TYPE": "BIRHTCERTIF",
        "VALID": "Y",
        "EKB_TYPE": "000003",
        "NUM": "594146",
        "SER": "1-НО",
        "MAIN": "Y",
        "DATESTART": "2014-05-21",
        "DATEEND": "1900-01-01",
        "CUST_ID": "1028538516",
        "COUNTRY": "UA",
        "ID": "1027971644"
    }
];
/**/

/****************START*******************/

const DOC_TYPE = {
    "000001": {
        "docWeight": 10,
        "docType": "PASSPORT",
        "docDescr": "Общегражданский паспорт"
    },
    "000003": {
        "docWeight": 60,
        "docType": "BIRHTCERTIF",
        "docDescr": "Cвидетельство о рождении"
    },
    "000004": {
        "docWeight": 30,
        "docType": "MILITARY_ID",
        "docDescr": "Военный билет"
    },
    "000009": {
        "docWeight": 20,
        "docType": "TEMPCITIZENUA",
        "docDescr": "Временное удостоверение гражданина Украины"
    },
    "000013": {
        "docWeight": 75,
        "docType": "PERMRESID",
        "docDescr": "Удостоверение на постоянное проживание"
    },
    "000014": {
        "docWeight": 40,
        "docType": "SEAMAN",
        "docDescr": "Удостоверение личности моряка"
    },
    "000027": {
        "docWeight": 10,
        "docType": "PASSPORT",
        "docDescr": "Электронный паспорт гражданина Украины"
    }
};

const DOC_TYPE_NORES = {
    "000002": {
    "docWeight": 70,
        "docType": "FORPASSP",
        "docDescr": "Международный загран паспорт"
},
    "000014": {
    "docWeight": 40,
        "docType": "SEAMAN",
        "docDescr": "Удостоверение личности моряка"
},
    "000020": {
    "docWeight": 71,
        "docType": "DIPLPASSP",
        "docDescr": "Дипломатический паспорт"
}
}

var dictDocType;
if (data.APP_SOCSTATUS_IS_RESIDENT == "N") {
    dictDocType=DOC_TYPE_NORES;
} else {
    dictDocType=DOC_TYPE;
}

for (var i=0;i<data.DOC_IDENT.length; i++) {
    var ekbtype = data.DOC_IDENT[i].EKB_TYPE;
    if (ekbtype in dictDocType) {
        data.DOC_IDENT[i].TYPE = dictDocType[ekbtype].docType;
        data.DOC_IDENT[i].DESCR = dictDocType[ekbtype].docDescr;
        data.DOC_IDENT[i].WEIGHT = dictDocType[ekbtype].docWeight;
        data.DOC_IDENT[i].IDENT_MAIN = "N"
    }
}

//
var identMain = data.DOC_IDENT[0];

for (var i=1;i<data.DOC_IDENT.length; i++) {
    if (
        (data.DOC_IDENT[i].WEIGHT < identMain.WEIGHT) ||
        (data.DOC_IDENT[i].WEIGHT == identMain.WEIGHT && data.DOC_IDENT[i].VALID > identMain.VALID) ||
        (data.DOC_IDENT[i].WEIGHT == identMain.WEIGHT &&
           data.DOC_IDENT[i].VALID == identMain.VALID && data.DOC_IDENT[i].MAIN > identMain.MAIN)
    ) {
        identMain = data.DOC_IDENT[i];
    }
}

identMain.IDENT_MAIN="Y";

data.DOC_IDENT_SER=identMain.SER;
data.DOC_IDENT_NUM=identMain.NUM;
data.DOC_IDENT_DATESTART=identMain.DATESTART;
data.LOCAL_DOC_IDENT_COUNTRY=identMain.COUNTRY;
data.LOCAL_DOC_IDENT_MAIN = identMain.TYPE;

/****************END*******************/
console.log(data);