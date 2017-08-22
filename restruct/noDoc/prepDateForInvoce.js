function setDD_MM(str) {
    if (str < 10) {
        return "0" + String(str);
    } else {
        return String(str);
    }
}

var dateP = new Date(data.DATE_PROM);

dateP.setDate(dateP.getDate()+1);
var getY = dateP.getFullYear();
var getM = setDD_MM(dateP.getMonth()+1);
var getD = setDD_MM(dateP.getDate());

data.datePrep = getY + '-'+ getM + '-'+ getD;

if (data.refInvoice != undefined && data.invoiceProcess == 'create'){
    data.invoiceProcess = 'change';
}