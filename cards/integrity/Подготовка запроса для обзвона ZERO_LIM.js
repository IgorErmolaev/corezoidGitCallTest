var left = data.PROD_APP_GIVENPAN.substring(0, 2);
var right = data.PROD_APP_GIVENPAN.substring(data.PROD_APP_GIVENPAN.length - 2);
data.PROD_CHAR_MASK= left + '*' + right;

if (data.APP_PHONE != undefined){
    for (var i = 0; i<data.APP_PHONE.length;i++) {
        if (data.APP_PHONE[i].TYPE_CALL == "MOB") {
            data.CONTACT_VALUE = data.APP_PHONE[i].NUMBER_CALL;
        }
    }
}

switch (data.APP_CUST_LANG) {
    case 'UKR':
        data.langClient = 'UA';
        break;
    case 'RUS':
        data.langClient = 'RU';
        break;
    default :
        data.langClient = 'UA';
}
