/**
 * Created by user on 05.04.2017.
 */
var fs = require('fs');
var json = fs.readFileSync(__dirname+'/../Integrity/ekb_bln_byclid_decode.json').toString();
var data = JSON.parse(json).data;
data.APP_CUST_ID=49186901; //текущий айди клиента, по которому ведётся проверка в чс
data.APP_PHONE = new Array();
var tmpobj = new Object();
tmpobj.TYPE_CALL = "MOB";
tmpobj.CUST_ID_CALL = 49186901;
tmpobj.NUMBER_CALL = "+380672221111";
tmpobj.LIGHT = 10;
tmpobj.DTM = new Date();
data.APP_PHONE.push(tmpobj);

/****************START*******************/
var black_cust_id=data.clientid;

function is_array (a) {
    return (typeof a == "object") && (a instanceof Array);
}

if ( black_cust_id==data.clientid ){
    data.LOCAL_BLPHONE="N";
}


if (data.DATA_PERSLINK == undefined) {
    data.DATA_PERSLINK = new Array();
}
if (data.doc.r.o.BLN_BYCLIENTID != undefined) {
    var BLN_BYCLIENTID;
    if (is_array(data.doc.r.o.BLN_BYCLIENTID)) {
        BLN_BYCLIENTID = data.doc.r.o.BLN_BYCLIENTID;
    } else {
        BLN_BYCLIENTID = new Array(data.doc.r.o.BLN_BYCLIENTID);
    }
    if (BLN_BYCLIENTID.length > 0) {

        //инициализация списков по умолчанию
        const BL_ZONE_RED_VALUE = "R";
        const BL_ZONE_YELLOW_VALUE = "Y";
        const BL_ZONE_GREEN_VALUE = "G";
        const BL_ZONE_RED_CODE = [1, 3, 5, 7, 16, 18, 22, 23, 24, 27, 28, 29, 33, 34, 35, 36, 40, 41, 42, 43, 44, 45];
        const BL_ZONE_RED_SOURCE = [5, 22, 34, 35, 39, 46, 48];
        const BL_ZONE_RED_SOURCE_CODE = {59: 15};
        const BL_ZONE_YELLOW_CODE = [2, 4, 6, 9, 10, 11, 14, 21, 26, 30, 32, 38];
        const BL_ZONE_GREEN_CODE = [8, 12, 13, 15, 17, 19, 20, 25, 37, 39, 99];
        const BL_ZONE_GREEN_SOURCE_CODE = {56: 27};

        const BL_CONTROL_ZPDO_CODE = [2, 4, 6, 9, 10, 11, 14, 21, 26, 30, 32, 38];
        const BL_CONTROL_ZPDO_VALUE = "ZPDO;";
        const BL_CONTROL_DEAD_CODE = [7];
        const BL_CONTROL_DEAD_VALUE = "DEAD;";
        const BL_CONTROL_KHS_CODE = [2, 4, 6, 9, 10, 11, 14, 21, 26, 30, 32, 38];
        const BL_CONTROL_KHS_VALUE = "KHS;";
        const BL_CONTROL_ZPDO2_CODE = [21];
        const BL_CONTROL_ZPDO2_VALUE = "ZPDO2;";
        const BL_CONTROL_TERROR_CODE = [16, 41, 45];
        const BL_CONTROL_TERROR_SOURCE = [48];
        const BL_CONTROL_TERROR_SOURCE_CODE = [21, 30];
        const BL_CONTROL_TERROR_VALUE = "TERROR;";

        const PERSLINK_CALL_CODE = [2, 3, 4, 6, 8, 9, 10, 11, 12, 14, 15];
        const PERSLINK_SMS_CODE = [2, 21, 3, 7, 22, 27, 38, 40, 41, 45];
        const PERSLINK_SMS_SOURCE = [5, 22, 34, 35, 39, 41];

        bl = new Object();
        var isFirst = true; //нужно для инициализации начальными параметрами
        bl.CUST_ID = black_cust_id;
        bl.BL_ZONE = "";
        bl.BL_CONTROL = "";
        bl.CALL = "";
        bl.SMS = "";
        bl.PASS = "";
        bl.BLOKPO_ZONE = "";
        bl.BL_PHONE = "";
        for (var i = 0; i < BLN_BYCLIENTID.length; i++) {
            var curr_bl = BLN_BYCLIENTID[i];
            //проверяем, если активная запись в ЧС
            if (curr_bl["@CtoBSt"] == "A") {

                /*инициализация флагов начальными параметрами*/
                if (isFirst) {
                    bl.CALL = "N";
                    bl.SMS = "Y";
                    bl.PASS = "N";
                    isFirst = false; // больше не 1-й проход по активной записи
                }

                var bl_source = Number(curr_bl["@SrcID"]);
                //проверка на кодификатор зоны
                var currTypes;
                if (curr_bl.TYPES != undefined) {
                    if (is_array(curr_bl.TYPES)) {
                        currTypes = curr_bl.TYPES;
                    } else {
                        currTypes = new Array(curr_bl.TYPES);
                    }
                    for (var types_idx = 0; types_idx < currTypes.length; types_idx++) {
                        var bl_type1 = Number(currTypes[types_idx]["@BlackType1"]);
                        var bl_code = Number(currTypes[types_idx]["@BlackType2"]);
                        if (( (BL_ZONE_RED_CODE.indexOf(bl_code) > -1) || (BL_ZONE_RED_SOURCE_CODE[bl_source] == bl_code) || (bl_code > 45 && bl_code <= 98) ||
                            (BL_ZONE_RED_SOURCE.indexOf(bl_source) > -1)) && BL_ZONE_GREEN_SOURCE_CODE[bl_source] != bl_code) {
                            bl.BL_ZONE = BL_ZONE_RED_VALUE;
                        } else if (BL_ZONE_YELLOW_CODE.indexOf(bl_code) > -1) {
                            if (bl.BL_ZONE != BL_ZONE_RED_VALUE) bl.BL_ZONE = BL_ZONE_YELLOW_VALUE;
                        } else if (BL_ZONE_GREEN_CODE.indexOf(bl_code) > -1 || BL_ZONE_GREEN_SOURCE_CODE[bl_source] == bl_code) {
                            if (bl.BL_ZONE != BL_ZONE_RED_VALUE && bl.BL_ZONE != BL_ZONE_YELLOW_VALUE) bl.BL_ZONE = BL_ZONE_GREEN_VALUE;
                        }

                        //проверка на control
                        //zpdo
                        if (BL_CONTROL_ZPDO_CODE.indexOf(bl_code) > -1) {
                            if (bl.BL_CONTROL.indexOf(BL_CONTROL_ZPDO_VALUE) == -1) bl.BL_CONTROL = bl.BL_CONTROL + BL_CONTROL_ZPDO_VALUE;
                        }
                        //dead
                        if (BL_CONTROL_DEAD_CODE.indexOf(bl_code) > -1) {
                            if (bl.BL_CONTROL.indexOf(BL_CONTROL_DEAD_VALUE) == -1) bl.BL_CONTROL = bl.BL_CONTROL + BL_CONTROL_DEAD_VALUE;
                        }
                        //khs
                        if (BL_CONTROL_KHS_CODE.indexOf(bl_code) > -1) {
                            if (bl.BL_CONTROL.indexOf(BL_CONTROL_KHS_VALUE) == -1) bl.BL_CONTROL = bl.BL_CONTROL + BL_CONTROL_KHS_VALUE;
                        }
                        //zpdo2
                        if (BL_CONTROL_ZPDO2_CODE.indexOf(bl_code) > -1) {
                            if (bl.BL_CONTROL.indexOf(BL_CONTROL_ZPDO2_VALUE) == -1) bl.BL_CONTROL = bl.BL_CONTROL + BL_CONTROL_ZPDO2_VALUE;
                        }
                        //terror
                        if ((BL_CONTROL_TERROR_CODE.indexOf(bl_code) > -1) ||
                            (BL_CONTROL_TERROR_SOURCE.indexOf(bl_source) > -1 && BL_CONTROL_TERROR_SOURCE_CODE.indexOf(bl_code) > -1)) {
                            if (bl.BL_CONTROL.indexOf(BL_CONTROL_TERROR_VALUE) == -1) bl.BL_CONTROL = bl.BL_CONTROL + BL_CONTROL_TERROR_VALUE;
                        }

                        //call
                        if (PERSLINK_CALL_CODE.indexOf(bl_code) > -1) {
                            bl.CALL = "Y";
                        }

                        //sms
                        if (PERSLINK_SMS_CODE.indexOf(bl_code) > -1 || PERSLINK_SMS_SOURCE.indexOf(bl_source) > -1) {
                            bl.CALL = "N";
                        }

                        //pass
                        //(в другом скрипте)

                        //blokpo
                        bl.BLOKPO_ZONE = bl.BL_ZONE;
                    }
                }

                //phone
                if (curr_bl["@BlackTable"] == "P" && data.phone == curr_bl["@BlackId"]) {
                    if (black_cust_id == data.clientid) {
                        bl.BL_PHONE = "Y";

                    }
                }
                data.DATA_PERSLINK.push(bl);


            }
        }
    }
}
else {
    bl = new Object();
    bl.CUST_ID=black_cust_id;
    bl.BL_ZONE="";
    bl.BL_CONTROL="";
    bl.CALL="";
    bl.SMS="";
    bl.PASS="";
    bl.BLOKPO_ZONE="";
    bl.BL_PHONE="";
    data.DATA_PERSLINK.push(bl);
}



/****************END*******************/
console.log(data);