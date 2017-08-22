var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\resource\\megav_resp_example.json').toString();
var data = JSON.parse(json).data;

/****************START*******************/
function to_number(a) {
    if  (a!=undefined && a!="null") {
        return Number(a);
    } else return null;
}

if (data.doc.r.O != undefined) {

    data.FL_PH_SN = data.doc.r.O['@FL_PH_SN'];
    data.FR_AVG_AGE = to_number(data.doc.r.O['@FR_AVG_AGE']);
    data.FR_PROSR = to_number(data.doc.r.O['@FR_PROSR']);
    data.UNIVER_CITY = data.doc.r.O['@UNIVER_CITY'];
    data.PL_MOBILE = data.doc.r.O['@PL_MOBILE'];
    data.AGE_GR_ID_DEV = to_number(data.doc.r.O['@AGE_GR_ID_DEV']);
    data.REP_AGE_CATEGORY = to_number(data.doc.r.O['@REP_AGE_CATEGORY']);
    data.REGION_CATEGORY = to_number(data.doc.r.O['@REGION_CATEGORY']);
    data.SMOKING_POS = data.doc.r.O['@SMOKING_POS'];
    data.SELL_AUTO = data.doc.r.O['@SELL_AUTO'];
    data.FILL_TXT_FLD = to_number(data.doc.r.O['@FILL_TXT_FLD']);
    data.FL_CORRECT_NAME = data.doc.r.O['@FL_CORRECT_NAME'];
    data.ANTIMAIDAN_GROUPS = data.doc.r.O['@ANTIMAIDAN_GROUPS'];
    data.FR_ANTIMAIDAN = to_number(data.doc.r.O['@FR_ANTIMAIDAN']);
    data.FR_DEPOSIT = to_number(data.doc.r.O['@FR_DEPOSIT']);
    data.FR_GOLD = to_number(data.doc.r.O['@FR_GOLD']);
    data.AGE_REG_SN = to_number(data.doc.r.O['@AGE_REG_SN']);
    data.FR_VIP = to_number(data.doc.r.O['@FR_VIP']);
    data.PL_IPHONE = data.doc.r.O['@PL_IPHONE'];
    data.PL_IPAD = data.doc.r.O['@PL_IPAD'];
    data.PL_ANDROID = data.doc.r.O['@PL_ANDROID'];
    data.PL_WPHONE = data.doc.r.O['@PL_WPHONE'];
    data.PL_WINDOWS = data.doc.r.O['@PL_WINDOWS'];
    data.PL_WEB = data.doc.r.O['@PL_WEB'];
    data.VK_REGISTR_YEAR = to_number(data.doc.r.O['@VK_REGISTR_YEAR']);
    data.SN_DEACTIVATED = data.doc.r.O['@SN_DEACTIVATED'];
    data.FR_OPPOS_SEX = to_number(data.doc.r.O['@FR_OPPOS_SEX']);
    data.DEVIAT_AVG_FR_AGE_CATEG = to_number(data.doc.r.O['@DEVIAT_AVG_FR_AGE_CATEG']);
    data.FOLLOW_TO_FR = to_number(data.doc.r.O['@FOLLOW_TO_FR']);
    data.QTY_SHOP_TRAN = to_number(data.doc.r.O['@QTY_SHOP_TRAN']);
    data.QTY_LINK_TRAN = to_number(data.doc.r.O['@QTY_LINK_TRAN']);
    data.QTY_PS_CASS = to_number(data.doc.r.O['@QTY_PS_CASS']);
    data.FL_INSUR_NS = to_number(data.doc.r.O['@FL_INSUR_NS']);
    data.FL_KOPL = to_number(data.doc.r.O['@FL_KOPL']);
    data.FL_DIR_UCH = data.doc.r.O['@FL_DIR_UCH'];
    data.FL_P24 = to_number(data.doc.r.O['@FL_P24']);
    data.FL_Y_PH = data.doc.r.O['@FL_Y_PH'];
    data.FL_G_MPH = data.doc.r.O['@FL_G_MPH'];

    data.RAT_CLID_FAMST_DIV_TO_LINK_NEI  = to_number(data.doc.r.O['@W_RAT_CLID_FAMST_DIV_TO_LINK_NEI']);
    data.RAT_CLID_H_EDU_TO_LINK_FAM  = to_number(data.doc.r.O['@W_RAT_CLID_H_EDU_TO_LINK_FAM']);
    data.RAT_CLID_FAMST_MAR_TO_LINK_COHAB  = to_number(data.doc.r.O['@W_RAT_CLID_FAMST_MAR_TO_LINK_COHAB']);
    data.RAT_CLID_AUTO_TO_LINK_ALL =  to_number(data.doc.r.O['@W_RAT_CLID_AUTO_TO_LINK_ALL']);
    data.RAT_CLID_H_EDU_TO_LINK_NEI = to_number(data.doc.r.O['@W_RAT_CLID_H_EDU_TO_LINK_NEI']);
    data.RAT_LINK_FAM_TO_LINK_DRFO = to_number(data.doc.r.O['@W_RAT_LINK_FAM_TO_LINK_DRFO']);
    data.RAT_CLID_BAD90_TO_LINK_COHAB =  to_number(data.doc.r.O['@W_RAT_CLID_BAD90_TO_LINK_COHAB']);
    data.QTY_LINK_PHONE = to_number(data.doc.r.O['@W_QTY_LINK_PHONE']);
    data.RAT_CLID_H_EDU_TO_LINK_COHAB = to_number(data.doc.r.O['@W_RAT_CLID_H_EDU_TO_LINK_COHAB']);

}

/****************END*******************/

console.log(data);