var fs = require('fs');
var json = fs.readFileSync(__dirname + '\\..\\resource\\ubki_resp_example.json').toString();
var data = JSON.parse(json).data;
//console.log(data);

/****************START*******************/
function is_array(a) {
    return (typeof a == "object") && (a instanceof Array);
}

function compareHist(hist1, hist2) {
    return (Number(hist1["@dlyear"]) * 365 + Number(hist1["@dlmonth"]) * 30) - (Number(hist2["@dlyear"]) * 365 + Number(hist2["@dlmonth"]) * 30);
}

const UBKI_CURR = {
    "974": "BYR",
    "756": "CHF",
    "978": "EUR",
    "826": "GBP",
    "981": "GEL",
    "985": "PLN",
    "810": "RUR",
    "980": "UAH",
    "840": "USD",
    "961": "XAG",
    "959": "XAU"
};
const UBKI_PRODUCT = {
    "5": {"PR": "AVTO", "G": "A"},
    "31": {"PR": "CC", "G": "C"},
    "42": {"PR": "CSC", "G": "P"},
    "4": {"PR": "EPTECH", "G": "M"},
    "14": {"PR": "FACTOR", "G": "N"},
    "1": {"PR": "INCPT", "G": "N"},
    "3": {"PR": "KNB", "G": "N"},
    "12": {"PR": "LSG", "G": "N"},
    "6": {"PR": "STD", "G": "N"}
};
const PROS_PERIOD_M = 36; // промежуток в месяцах, за который анализируются выходы на просрочку
const PROS_PERIOD_2Y = 24; // 2-й промежуток в месяцах, за который анализируются выходы на просрочку

var today = new Date();
var month_period = today.getFullYear() * 12 + (today.getMonth() + 1) - PROS_PERIOD_M;
var month_period_2y = today.getFullYear() * 12 + (today.getMonth() + 1) - PROS_PERIOD_2Y;

data.ubki_errcode ="0";

if (data.ubkidata != undefined) {
    if (data.ubkidata.comp != undefined) {


        var comp;
        if (is_array(data.ubkidata.comp)) {
            comp = data.ubkidata.comp;
        } else {
            comp = new Array(data.ubkidata.comp);
        }

        var credlist = new Array();

        for (var i = 0; i < comp.length; i++) {
            if (comp[i]["@id"] == "8") {
                if (comp[i].urating != null && comp[i].urating["@score"] != "NA") {
                    data.BCH_YBCH_SCORE = comp[i].urating["@score"];
                    data.BCH_YBCH_SCORE_DATE = new Date(comp[i].urating["@scoredate"]);
                }
            }
            if (comp[i]["@id"] == "2") {
                if (comp[i].crdeal != undefined) {
                    var crdeal;
                    if (is_array(comp[i].crdeal)) {
                        crdeal = comp[i].crdeal;
                    } else {
                        crdeal = new Array(comp[i].crdeal);
                    }
                    for (var cridx = 0; cridx < crdeal.length; cridx++) {
                        var cred = new Object();
                        cred.CREDIT_NUM = crdeal[cridx]["@dlref"];
                        cred.CCY = UBKI_CURR[crdeal[cridx]["@dlcurr"]];
                        if (cred.CREDIT_NUM.substring(0, 5) == "SAMAB" || cred.CREDIT_NUM.substring(0, 3) == "AB.") {
                            cred.OUR_BANK = "OWN";
                        } else {
                            cred.OUR_BANK = crdeal[cridx]["@dldonor"];
                        }
                        if (UBKI_PRODUCT.hasOwnProperty(crdeal[cridx]["@dlcelcred"])) {
                            cred.PRODUCT = UBKI_PRODUCT[crdeal[cridx]["@dlcelcred"]].PR;
                            cred.GR_NAME = UBKI_PRODUCT[crdeal[cridx]["@dlcelcred"]].G;
                        } else {
                            cred.PRODUCT = "UNKN";
                            cred.GR_NAME = "N";
                        }
                        //разбор истории
                        var hist;
                        if (is_array(crdeal[cridx].deallife)) {
                            hist = crdeal[cridx].deallife;
                        } else {
                            hist = new Array(crdeal[cridx].deallife);
                        }
                        //сортировка истории
                        hist.sort(compareHist);
                        var lastHist = new Object(); // ссылка на последнюю запись истории
                        var creditHistory = new Array(); // новый массив с историей
                        var max_dl_cred = 0; // максимальное кол-во дней просрочки
                        var plat_cnt = 0; // количество платежей
                        var plat_cnt_2y = 0; //количество платежей по кредиту за последнии 2 года
                        var b7 = 0;
                        var b7flag = false;
                        var b30 = 0;
                        var b30flag = false;
                        var b60 = 0;
                        var b60flag = false;
                        var b90 = 0;
                        var b90flag = false;
                        for (var histidx = 0; histidx < hist.length; histidx++) {
                            var currhist = new Object();
                            currhist.CREDIT_NUM = hist[histidx]["@dlref"];
                            currhist.DL_YEAR = hist[histidx]["@dlyear"];
                            currhist.DL_MONTH = hist[histidx]["@dlmonth"];
                            currhist.DL_CRED = Number(hist[histidx]["@dlamtexp"]);
                            currhist.DL_DAYS = Number(hist[histidx]["@dldayexp"]);
                            currhist.PAY = hist[histidx]["@dlflpay"];
                            currhist.CUR_DEBT = Number(hist[histidx]["@dlamtcur"]);
                            currhist.PLAT_MIN = Number(hist[histidx]["@dlamtpaym"]);
                            cred.DATE_REFRESH = lastHist.DATE_REFRESH;
                            var state = hist[histidx]["@dlflstat"];
                            if (state == "1") {
                                currhist.STATE = "A";
                            } else if (state == "7") {
                                currhist.STATE = "S";
                            } else currhist.STATE = "U";
                            if (hist[histidx]["@dlds"] != undefined && hist[histidx]["@dlds"].length > 0) {
                                currhist.DATE_START = new Date(hist[histidx]["@dlds"]);
                            }
                            if (hist[histidx]["@dldff"] != undefined && hist[histidx]["@dldff"].length > 0) {
                                currhist.DATE_CLOSE = new Date(hist[histidx]["@dldff"]);
                            } else if (hist[histidx]["@dldpf"] != undefined && hist[histidx]["@dldpf"].length > 0) {
                                currhist.DATE_CLOSE = new Date(hist[histidx]["@dldpf"]);
                            }
                            currhist.LIMIT = Number(hist[histidx]["@dlamtlim"]);
                            //анализ за период
                            if ((Number(currhist.DL_YEAR) * 12 + Number(currhist.DL_MONTH)) > month_period) {
                                max_dl_cred = Math.max(max_dl_cred, currhist.DL_CRED);
                                if (currhist.PAY == "1") {
                                    plat_cnt++;
                                }
                                //количество выходов на просрочки
                                //если просрочка меньше 7 дней, то погасил, обнуляем флаги
                                if (currhist.DL_DAYS < 7) {
                                    b7flag = false;
                                    b30flag = false;
                                    b60flag = false;
                                    b90flag = false;
                                } else if (currhist.DL_DAYS >= 7 && currhist.DL_DAYS < 30 && !b7flag) {
                                    b30flag = false;
                                    b60flag = false;
                                    b90flag = false;
                                    b7flag = true;
                                    b7++;
                                } else if (currhist.DL_DAYS >= 30 && currhist.DL_DAYS < 60 && !b30flag) {
                                    b7flag = false;
                                    b60flag = false;
                                    b90flag = false;
                                    b30flag = true;
                                    b30++;
                                } else if (currhist.DL_DAYS >= 60 && currhist.DL_DAYS < 90 && !b60flag) {
                                    b7flag = false;
                                    b30flag = false;
                                    b90flag = false;
                                    b60flag = true;
                                    b60++;
                                } else if (currhist.DL_DAYS >= 90 && !b90flag) {
                                    b7flag = false;
                                    b30flag = false;
                                    b60flag = false;
                                    b90flag = true;
                                    b90++;
                                }
                            }
                            if ((Number(currhist.DL_YEAR) * 12 + Number(currhist.DL_MONTH)) > month_period_2y) {
                                if (currhist.PAY == "1") {
                                    plat_cnt_2y++;
                                }
                            }
                            lastHist = currhist;
                            creditHistory.push(currhist);
                        }
                        cred.HIST = creditHistory;
                        cred.MAX_DL_CRED = max_dl_cred;
                        cred.PLAT_CNT = plat_cnt;
                        cred.PLAT_CNT_2Y = plat_cnt_2y;
                        cred.B7 = b7;
                        cred.B30 = b30;
                        cred.B60 = b60;
                        cred.B90 = b90;
                        //доопределение параметров из последней записи истории
                        if (lastHist != undefined) {
                            if (lastHist.STATE == "S") {
                                if (lastHist.DATE_CLOSE.getFullYear() * 12 + (lastHist.DATE_CLOSE.getMonth() + 1) > month_period) {
                                    cred.STATE = "A";
                                } else {
                                    cred.STATE = "U";
                                }
                            } else {
                                cred.STATE = lastHist.STATE;
                            }
                            cred.DATE_START = lastHist.DATE_START;
                            cred.DATE_CLOSE = lastHist.DATE_CLOSE;
                            cred.CUR_DEBT = lastHist.CUR_DEBT;
                            cred.DL_CRED = lastHist.DL_CRED;
                            cred.DL_DAYS = lastHist.DL_DAYS;
                            cred.LIMIT = lastHist.LIMIT;
                            cred.DATE_REFRESH = new Date(lastHist.DATE_REFRESH);
                            cred.PLAT_MIN = lastHist.PLAT_MIN;
                        }
                        credlist.push(cred);
                    }
                }
            }
        }
        data.UBKI_CRED = credlist;
        data.BCH_YBCH_NOT_WORK = "N";
    } else {
        if (data.ubkidata.tech != undefined && data.ubkidata.tech.error != undefined) {
            data.BCH_YBCH_NOT_WORK = "Y";
            data.UBKI_CRED = new Array();
            data.ubki_errcode = data.ubkidata.tech.error["@errtype"];
            data.ubki_errtext = data.ubkidata.tech.error["@errtext"];
        }
    }
} else {
        data.UBKI_CRED = new Array();
        data.BCH_YBCH_NOT_WORK = "Y";
    }
    delete data.ubkidata;
    /****************END*******************/
    console.log(JSON.stringify(data.UBKI_CRED));
    console.log(data.BCH_YBCH_SCORE, data.BCH_YBCH_SCORE_DATE, data.ubki_errcode, data.ubki_errtext);