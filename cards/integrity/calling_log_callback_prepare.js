var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\..\\resource\\calling_log_callback_prepare.json').toString();
var data = JSON.parse(json).data;

/****************START*******************/
function is_array (a) {
    return (typeof a == "object") && (a instanceof Array);
}

var not_need = ['jaguar_url','onlineanketa_callback_url','underwr_url','wave_irbis_url','calling_url','nkk_callback_pre_url','nkk_callback_fin_url','rtdm_api_url'];

var props = Object.getOwnPropertyNames(data);
var resp = new Object();
for (var i=0;i<props.length; i++) {
    if (not_need.indexOf(props[i]) == -1) {
        resp[props[i]] = data[props[i]];
    }
}
data.output=resp ;


data.new_state = "DL";
data.new_lg_state="REFUSE";

if (data.calling_feedback != undefined && data.calling_feedback.app_contact_list != undefined ) {
    var cont = data.calling_feedback.app_contact_list;
    for (var i=0;i<cont.length;i++) {
        data.cust_id = cont.cust_id;
        if (cont[i].contact_status == "OK" || cont[i].contact_status == "CY") {
            data.new_state = "AN";
            data.new_lg_state="FINISH";
        }
    }
}

/****************END*******************/