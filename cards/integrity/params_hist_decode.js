var data = {
    "status": "ok",
    "hist": [
        {
            "charType": "UNIPACK",
            "custId": 123456,
            "date": "2016-02-16T00:00:00",
            "name": "FRAUD_FIRST_SCOR",
            "ref": "111111111111",
            "strategyId": "CredCard",
            "value": "1234"
        },
        {
            "charType": "ANKETA",
            "custId": 123456,
            "date": "2016-02-16T00:00:00",
            "name": "RES_LIMIT_P48",
            "ref": "111111111111",
            "strategyId": "CredCard",
            "value": "111"
        },
        {
            "charType": "ANKETA",
            "custId": 123456,
            "date": "2016-02-16T00:00:00",
            "name": "FRAUD_FIRST_SCORING_DATE_SALDO",
            "ref": "111111111111",
            "strategyId": "CredCard",
            "value": "2016-02-16T00:00:00"
        }
    ]
};

data.params = ["FRAUD_FIRST_SCCARD_SCORE_SALDO", "FRAUD_FIRST_SCORING_DATE_SALDO", "FRAUD_FIRST_SCORING_SALDO", "FRAUD_FIRST_SCCARD_NAME", "FRAUD_FIRST_SCOR_DATE", "FRAUD_FIRST_SCOR", "RES_LIMIT_P48"];

/****************START*******************/

const nums = ["FRAUD_FIRST_SCORING_SALDO", "FRAUD_FIRST_SCOR", "RES_LIMIT_P48"];
const dates = ["FRAUD_FIRST_SCORING_DATE_SALDO", "FRAUD_FIRST_SCOR_DATE"];

var paramsHist = {};
paramsHist["RES_ONLINEANKETA_LIMIT"] = 0;

if (data.hist != undefined) {
    for (var i = 0; i < data.hist.length; i++) {
        if (nums.indexOf(data.hist[i].name) != -1) {
            if (data.hist[i].name == "RES_LIMIT_P48" && data.hist[i].charType == "ANKETA") {
                paramsHist["RES_ONLINEANKETA_LIMIT"] = Number(data.hist[i].value);
            } else if (data.hist[i].name != "RES_LIMIT_P48") {
                paramsHist[data.hist[i].name] = Number(data.hist[i].value);
            }
        } else if (dates.indexOf(data.hist[i].name) != -1) {
            if (data.hist[i].value != null) {
                paramsHist[data.hist[i].name] = new Date(data.hist[i].value);
            }
        } else {
            paramsHist[data.hist[i].name] = data.hist[i].value;
        }

    }
}


data.prevdata_resp = paramsHist;
/****************END*******************/
console.log(data);