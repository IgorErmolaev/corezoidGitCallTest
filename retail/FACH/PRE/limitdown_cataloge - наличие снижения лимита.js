// JavaScript Document
function datediff(date_start, date_end){
    var date_s = new Date(date_start);
    var diff = Math.abs(date_end - date_s);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / one_day);
    return days;
}

var today = new Date();
data.LOCAL_CATALOGE_FLAG ="N";
const CATALOGE_EXCLUDE1=["DOLLARS_CARDS","BLACK","TRG_BLACK","SECONDCARD","FRAUD","REFDOWN",
    "CLIENT_M18","NO RS","MORE THEN 300","MORE THEN HALF","CLOSED PARENT",
    "NEPERED","AGE70","EUROCREDIT","PR1","PR2","TRG_UVOL","SOTR_UVOL",
    "SOTR","UVOL","CORRECT","SZ"];

const CATALOGE_EXCLUDE2=["DOLLARS_CARDS","BLACK","TRG_BLACK","SECONDCARD","FRAUD","REFDOWN",
    "CLIENT_M18","NO RS","MORE THEN 300","MORE THEN HALF","CLOSED PARENT",
    "NEPERED","AGE70","EUROCREDIT","PR1","PR2","TRG_UVOL","SOTR_UVOL",
    "SOTR","UVOL","SPIS_RES","BM","RESTR","CORRECT","SZ"];

if (data.DATA_LIMIT_DOWN_CATALOGE != undefined) {
    for (var i=0; i<data.DATA_LIMIT_DOWN_CATALOGE.length; i++) {
        if ( data.DATA_LIMIT_DOWN_CATALOGE_REF[i] != undefined && data.DATA_LIMIT_DOWN_CATALOGE_REF[i].length>0 &&
            data.DATA_LIMIT_DOWN_CATALOGE[i] != undefined && data.DATA_LIMIT_DOWN_CATALOGE[i].length>0 && datediff(data.DATA_LIMIT_DOWN_CATALOGE_DATE[i], today) <90) {

            if (
                ( data.DATA_LIMIT_DOWN_CATALOGE_REF[i] == data.PROD_CHAR_REFERENCE && CATALOGE_EXCLUDE1.indexOf(data.DATA_LIMIT_DOWN_CATALOGE[i]) == -1 ) ||
                CATALOGE_EXCLUDE2.indexOf(data.DATA_LIMIT_DOWN_CATALOGE[i]) == -1
            ) {
                data.LOCAL_CATALOGE_FLAG ="Y";
            }
        }

    }
}