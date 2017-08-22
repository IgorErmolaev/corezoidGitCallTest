
function setDD_MM(str) {
    if (str < 10) {
        return "0" + String(str);
    } else {
        return String(str);
    }
}

var str = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
var strRandom = '';

for (var i = 0; i < 7; i++) {
    var rannn = Math.floor(Math.random() * 36);
    strRandom += str[rannn];
}

var years, months, day, milsec;

var today = new Date();
years = String(today.getFullYear());
months = setDD_MM(today.getMonth() + 1);
day = setDD_MM(today.getDate());

years = years.substring(2);
var dateRef = years + months + day;

milsec = String(today.getTime()).slice(-5);


var ref = dateRef + 'DO' +milsec + strRandom;