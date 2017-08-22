
function DatediffFut(days_diff) { //разница дат
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = dateOpen - today;
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

/*if (data.BaseAccount != undefined){
    data.nowAvail = data.BaseAccount.Avail;
}
else{
    data.nowAvail = 0;
}*/

if (data['a.debtResponse'] != undefined ){
    data.refTech = data['a.debtResponse'].refContract;
    data.nowAvail = data['a.debtResponse'].balFo;

}
else {
    data.nowAvail = 0;
}

data.allAvans = 'N'; //нет средств
if (data.PROD_CHAR_ADVANCEAMOUNT <= data.nowAvail){
    data.allAvans = 'Y';//средства поступили в нужном к-стве или более аванса
    data.PROD_CHAR_ADVANCEAMOUNT = data.nowAvail;
}
else{
    if (data.nowAvail >0){
        data.allAvans = 'P';
    }
}


if (data.preNowAvail == data.nowAvail){
    data.noSMS = 'Y';
}
else{
    data.preNowAvail=data.nowAvail;
    data.noSMS = 'N';
}

var datediff = DatediffFut(data.DATE_PROM);
data.dateEnd = 'N';
if (datediff <-1){
    data.dateEnd = 'Y';
}

data.indexP48 ++;


/*
 data.bal2620 = 0;
 if (data.BaseAccount != undefined){
 data.bal2620 = data.BaseAccount.Avail;
 }

 if (data.countEsc == 1 && data.bal2620>0){
 }

 data.countEsc++;
*/