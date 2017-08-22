// JavaScript Document
const MOB_CODES = ["039", "050", "063", "066", "067", "068", "091", "092", "093", "094", "095", "096", "097", "098", "099", "073"];
//const REGION_PHCODES = {"043":"UA1285", "033":"UA3490", "056":"UA4973", "062":"UA6806", "041":"UA8404", "031":"UA10684",
//    "061":"UA11614", "044":"UA14155", "052":"UA15969", "069":"UA1", "064":"UA17411", "032":"UA18568", "051":"UA21155",
//    "048":"UA22387", "036":"UA26403", "054":"UA27785", "035":"UA29699", "057":"UA31354", "055":"UA33532", "038":"UA34511",
//    "047":"UA36552", "037":"UA37957", "034":"UA12859", "053":"UA24044", "046":"UA38641"};
data.LOCAL_COUNT_STATIC_PHONE=0;
for (var i=0; i<data.APP_PHONE.length; i++) {
    if (data.APP_PHONE[i].CUST_ID_CALL == data.APP_CUST_ID) {
        //определение ненужных локальных параметров
        var num=data.APP_PHONE[i].NUMBER_CALL;
        if (data.APP_PHONE[i].TYPE_CALL == "HOME") {
            data.LOCAL_CONTACT_PHONE_HOME=num;
            //для украины
            data.LOCAL_PHONE_HOME_OPERATOR=num.substring(3,6);
            if (MOB_CODES.indexOf(data.LOCAL_PHONE_HOME_OPERATOR) > -1) {
                data.LOCAL_PHONE_HOME_TYPE = "MOBILE";
            } else {
                data.LOCAL_PHONE_HOME_TYPE = "STATIC";
                data.LOCAL_COUNT_STATIC_PHONE++;
            }
        }
        else if (data.APP_PHONE[i].TYPE_CALL == "MOB") {
            data.LOCAL_CONTACT_PHONE_MOB=num;
            data.LOCAL_PHONE_MOB_OPERATOR=num.substring(3,6);
        }
        else if (data.APP_PHONE[i].TYPE_CALL == "WORK") {
            data.LOCAL_CONTACT_PHONE_WORK=num;
            data.LOCAL_PHONE_WORK_OPERATOR=num.substring(3,6);
            if (MOB_CODES.indexOf(data.LOCAL_PHONE_WORK_OPERATOR) > -1) {
                data.LOCAL_PHONE_WORK_TYPE = "MOBILE";
            } else {
                data.LOCAL_PHONE_WORK_TYPE = "STATIC";
                data.LOCAL_COUNT_STATIC_PHONE++;
            }
        }
        if ( (["WORKPENS","FULLWORK"].indexOf(data.APP_EMPL_SOCIALSTATUS) >-1) && data.APP_EMPL_RANK != "BUSINESS" &&
            data.APP_EMPL_ORGTYPE != "BUSINESS" && data.LOCAL_PHONE_WORK_TYPE == "MOBILE" &&
            data.LOCAL_PHONE_HOME_TYPE == "STATIC") {
            data.LOCAL_PHONE_WORK_IS_MOB="Y";
        } else {
            data.LOCAL_PHONE_WORK_IS_MOB="N";
        }

    }
}