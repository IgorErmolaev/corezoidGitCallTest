var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\resource\\shp_search_resp_example.json').toString();
var data = JSON.parse(json).data;
//console.log(json);


/****************START*******************/
const DOC_BIZ_TYPE={"243":"INCOME_DECL","245":"EMPL_CERTIF","383":"INCOME","388":"TEHPASSP","1698":"OUT_SALARY","1919":"OUT_CRED"};
const DOC_ESTATE_TYPE={"186":"TEHPASSP","387":"FLATTECH","389":"GENPOW","1059":"CRED_SALE","1202":"CRED_PLAN","1374":"RENT","1379":"COVER_DOG","1680":"CRED_INSURANCE"};
const DOC_IDENT_TYPE={"156":"FORPASSP"};


function datediff(date_start, date_end){
    date_s = new Date(date_start);
    var diff = Math.abs(date_end - date_start);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / one_day);
    return days;
}

data.DOC_BIZ = new Array();
data.LOCAL_TICKET_FLAG = "N";
data.LOCAL_TICKET_FLAG_10 = "N";
data.LOCAL_TICKET_FLAG_EXTRACT = "N";
data.RES_HAS_INC_CONF = "N";
data.LOCAL_TICKET_FLAG_OUT_CRED = "N";
data.LOCAL_TICKET_FLAG_TEHPASSP="N";
data.LOCAL_TICKET_FLAG_FORPASSP="N";

data.DOC_ESTATE = new Array();

var today = new Date();

if (data.answer=="ok") {
    for (var i=0;i<data.attachments.length;i++) {
        var currdoc = data.attachments[i];
        //определени DOC_BIZ
        if ( Object.keys(DOC_BIZ_TYPE).indexOf(String(currdoc.vdDoc.id)) > -1 ) {
            var docbiz = new Object();
            docbiz.DTYPE = DOC_BIZ_TYPE[String(currdoc.vdDoc.id)];
            docbiz.TICKET = currdoc.id;
            if (currdoc.creationDate == undefined || currdoc.creationDate.trim().length == 0) {
                docbiz.TICKET_DATE = new Date("1900-01-01");
            } else
            docbiz.TICKET_DATE = new Date(currdoc.creationDate.substring(0,10));
            data.DOC_BIZ.push(docbiz);

            //расчёт флагов
            var ticketDaysOld =  datediff(docbiz.TICKET_DATE, today);
            //Наличие справки с работы
            if ( ["INCOME", "INCOME_DECL", "EMPL_CERTIF"].indexOf(docbiz.DTYPE) > -1  && ticketDaysOld <= 5 ) {
                data.LOCAL_TICKET_FLAG="Y";
            }
            if ( ["INCOME", "INCOME_DECL"].indexOf(docbiz.DTYPE) > -1 && ticketDaysOld <=10) {
                data.LOCAL_TICKET_FLAG_10 = "Y";
            }
            //Наличие выписки по ЗП карте другого банка
            if ( docbiz.DTYPE == "OUT_SALARY" && ticketDaysOld <=5) {
                data.LOCAL_TICKET_FLAG_EXTRACT = "Y";
            }

            if ( data.LOCAL_TICKET_FLAG_EXTRACT =="Y" && data.LOCAL_TICKET_FLAG == "Y" ) {
                data.RES_HAS_INC_CONF = "Y";
            }
            //Наличие справки о кредите в др. банке
            if ( docbiz.DTYPE == "OUT_CRED" && ticketDaysOld <=5) {
                data.LOCAL_TICKET_FLAG_OUT_CRED = "Y";
            }

        }
        //DOC_ESTATE
        else if ( Object.keys(DOC_ESTATE_TYPE).indexOf(String(currdoc.vdDoc.id)) > -1 ) {
            var docestate = new Object();
            docestate.DTYPE = DOC_ESTATE_TYPE[String(currdoc.vdDoc.id)];
            docestate.TICKET = currdoc.id;
            if (currdoc.creationDate == undefined || currdoc.creationDate.trim().length == 0) {
                docestate.TICKET_DATE = new Date("1900-01-01");
            } else
                docestate.TICKET_DATE = new Date(currdoc.creationDate.substring(0, 10));
            //флаг наличия техпаспорта
            if (docestate.DTYPE == "TEHPASSP" && datediff(docestate.TICKET_DATE, today) <=5) {
                data.LOCAL_TICKET_FLAG_TEHPASSP="Y";
            }
            data.DOC_ESTATE.push(docestate);
        }
        //DOC_IDENT
        else if ( Object.keys(DOC_IDENT_TYPE).indexOf(String(currdoc.vdDoc.id)) > -1 ) {
            var docident = new Object();
            docident.DTYPE = DOC_IDENT_TYPE[String(currdoc.vdDoc.id)];
            if (currdoc.creationDate == undefined || currdoc.creationDate.trim().length == 0) {
                docident.TICKET_DATE = new Date("1900-01-01");
            } else {
                docident.TICKET_DATE = new Date(currdoc.creationDate.substring(0, 10));
            }
            //наличие тикета загранпаспорта
            if (docident.DTYPE == "FORPASSP" && datediff(docident.TICKET_DATE, today) <=5) {
                data.LOCAL_TICKET_FLAG_FORPASSP="Y";
            }

        }

    }
}
delete data.attachments;

/****************END*******************/

console.log(data);