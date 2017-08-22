// JavaScript Document
function parse(str) {
    if(!/^(\d){8}$/.test(str)) return new Date(str).getTime();
    var y = str.substr(0,4),
        m = str.substr(4,2),
        d = str.substr(6,2);
    return new Date(y,m,d).getTime();
}
if (data.APP_CUST_BIRTHDAY!=undefined)
{
    data.APP_CUST_BIRTHDAY = parse(data.APP_CUST_BIRTHDAY );
}
data.APP_EMPL_TIMEEMPL_DATE = parse(data.APP_EMPL_TIMEEMPL_DATE);


if (data.DATA_CRED != undefined) {
    for (var i=0; i< data.DATA_CRED.length; i++){
        if (data.DATA_CRED[i].DATE_START!=undefined) {
            data.DATA_CRED[i].DATE_START = parse(data.DATA_CRED[i].DATE_START);
        }
        if (data.DATA_CRED[i].DATECLOS_C!=undefined) {
            data.DATA_CRED[i].DATECLOS_C = parse(data.DATA_CRED[i].DATECLOS_C);
        }
    }
}

if (data.DATA_DEBCARD != undefined) {
    for (var i=0; i< data.DATA_DEBCARD.length; i++){
        if (data.DATA_DEBCARD[i].DATE_START!=undefined) {
            data.DATA_DEBCARD[i].DATE_START = parse(data.DATA_DEBCARD[i].DATE_START);
        }
    }
}

if (data.DOC_IDENT!= undefined) {
    for (var i=0; i< data.DOC_IDENT.length; i++){
        if (data.DOC_IDENT[i].TICKETDATE!=undefined) {
            data.DOC_IDENT[i].TICKETDATE = parse(data.DOC_IDENT[i].TICKETDATE);
        }
    }
}