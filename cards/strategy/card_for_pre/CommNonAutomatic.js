var typeRestr = new Array('RS06','RS12','RS24','RS36','RS60','RR06', 'RR12', 'RR24', 'RR36', 'RP03', 'RP06', 'RP12', 'RL03', 'RL06', 'SB03');
var typeUp = new Array('CHLIMIT','UPLIMIT','UPLIMNKK');
var typeSt = new Array('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','UNIPACKSAS','ONLINEANKETA');

function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

data.RES_COMMENT_NO_AUTO = '';


if (data.RES_DEC_FINAL_FLOW != 'DECLINE' || (data.DECLINE_GROUP == 'TRUE' && (data.APP_CUST_IMPORTANT_PRODUCT == 'VP' || data.RES_PROD_TYPE == 'VIP'))) {

    if (data.MON_SCORE_TEST == 'KC' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')) {
        data.RES_COMMENT_NO_AUTO += 'Экспертное решение(NEW);';
    }

    if (data.DATA_WORK_TOP1000 == 'Y' && data.DATA_WORK_TOP1000_TYPE == 'WHITEWORK' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')) {
        data.RES_COMMENT_NO_AUTO += 'Белое предприятие;';
    }

    if (data.APP_CUST_INN == undefined || data.APP_CUST_INN == '') {
        data.RES_COMMENT_NO_AUTO += 'У клиента нет ИНН, проведите проверку;';
    }

    if (data.LOCAL_HAS_DELINQUENCY == 'Y' || (data.BCH_CRED_HIST_DATA != undefined && data.BCH_CRED_HIST_DATA.substring(0,1) == 'H') || data.BCH_CRED_OWN_PROS_YBCH == 'Y') {
        data.RES_COMMENT_NO_AUTO += 'Ручная проверка наличия текущей просрочки;';
    }

    if (data.LOCAL_BLCL_CONTROL != undefined && data.LOCAL_BLCL_CONTROL.indexOf('DEAD') != -1) {
        data.RES_COMMENT_NO_AUTO += 'Клиент в ЧС как умерший. Проведите проверку;';
    }

    if (data.LOCAL_TICKET_FLAG_TEHPASSP == 'Y') {
        data.RES_COMMENT_NO_AUTO += 'Проверьте техпаспорт;';
    }

    if (data.DATA_ECB_NOT_WORK == 'Y') {
        data.RES_COMMENT_NO_AUTO += 'Ручная проверка ЧС;';
    }

    if ((data.BCH_CRED_HIST_DATA!= undefined && data.BCH_CRED_HIST_DATA.substring(0,1) == 'N') && data.RES_LIMIT_TYPE.indexOf('ZP') == -1 && data.RES_LIMIT_TYPE.indexOf('SOTR') == -1 && data.RES_LIMIT_TYPE.indexOf('PENS') == -1) {
        data.RES_COMMENT_NO_AUTO += 'Ручная проверка кредитной истории;';
    }

    if (data.APP_CUST_SPECIALPROJECT == 'ELITE' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')) {
        data.RES_COMMENT_NO_AUTO += 'Элитный район;';
    }

    for (var i = 0; i < data.DATA_CRED.length; i++) {
        if (typeRestr.indexOf(data.DATA_CRED[i].TYPE) != -1) {
            data.RES_COMMENT_NO_AUTO += 'Проверьте клиента. Была реструктуризация;';
            break;
        }
    }

    if (data.BCH_YBCH_NOT_WORK == 'Y') {
        data.RES_COMMENT_NO_AUTO += 'Не сработал запрос в УБКИ - ручная проверка;';
    }

    var difdays;
    difdays = Datediff(data.APP_CUST_IMPORTANT_DATE);
    if ((data.APP_CUST_IMPORTANT_COM != '' && data.APP_CUST_IMPORTANT_LIMIT > 0 && difdays <= 30) && data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP' &&
        (typeSt.indexOf(data.PROD_CHAR_TYPE) != -1 || (typeUp.indexOf(data.PROD_CHAR_TYPE) != -1 && data.APP_CUST_IMPORTANT_LIMIT > data.RES_CRED_LIM))) {
        data.RES_COMMENT_NO_AUTO = data.RES_COMMENT_NO_AUTO + 'Особый клиент=' + data.APP_CUST_IMPORTANT_LIMIT + ' k ' + data.APP_CUST_IMPORTANT_COM + ';';
        data.RES_TO_KC = 'Y';
    }

    if (data.RES_CUST_ISID_FRAUD == 'Y' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')) {
        data.RES_COMMENT_NO_AUTO += 'Фродовая валидация;';
    }

    if (data.FRAUD_DEC_FINAL_FLOW == 'REFER') {
        for (var i = 0; i < data.FRAUD_DEC_REAS_CODE_TABLE.length; i++) {
            data.RES_COMMENT_NO_AUTO = data.RES_COMMENT_NO_AUTO + data.FRAUD_DEC_REAS_CODE_TABLE[i] + ';';
        }
    }

    if ((data.RES_CUST_ISID == '' || data.RES_CUST_ISID == null) && data.PROD_CHAR_TYPE != 'UPLIMNKK' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')) {
        data.RES_COMMENT_NO_AUTO += 'Проверьте валидность ФОТО;';
    }

    if ((data.APP_CUST_SPECIALPROJECT == 'ZAGRAN' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP'))|| data.LOCAL_TICKET_FLAG_FORPASSP == 'Y') {
        data.RES_COMMENT_NO_AUTO += 'Загранпаспорт;';
    }

    if (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP') {
        if (data.RES_LIMIT_ITOG >= 15000 && data.RES_LIMIT_ITOG_TYPE != 'ZP' && data.RES_LIMIT_ITOG_TYPE != 'DEPOS') {
            data.RES_COMMENT_NO_AUTO += 'Лимит зоны ручного решения; ';
        }
    }

    if (data.APP_EMPL_OKPO == '26124366' || data.APP_EMPL_OKPO == '35736049') {
        data.RES_COMMENT_NO_AUTO += 'Проверьте ОКПО;';
    }

    if (data.LOCAL_LINK_SOTR_ALL != '' && data.LOCAL_LINK_SOTR_ALL != null) {
        data.RES_COMMENT_NO_AUTO = data.RES_COMMENT_NO_AUTO + 'Позвоните родственникам клиента id: ' + data.LOCAL_LINK_SOTR_ALL + ';';
    }

 /*   if (data.LOCAL_BLCL_CONTROL != undefined && data.LOCAL_BLCL_CONTROL.indexOf('ZPDO2')!=-1  && data.BLACK_PAN == 'FALSE' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')) {
        data.RES_COMMENT_NO_AUTO += 'Проверьте кредитную историю за 5 лет;';
    }*/

    if (data.LOCAL_DOC_IDENT_MAIN != 'PASSPORT' && data.LOCAL_DOC_IDENT_MAIN != 'FORPASSP') {
        data.RES_COMMENT_NO_AUTO += 'Проверьте документ регистрации в базе утерянных паспортов;';
    }

    if (data.DATA_PERSLINK != undefined){
        for (var i = 0; i< data.DATA_PERSLINK.length; i++){
            if (data.DATA_PERSLINK[i].PASS == 'Y' && data.DATA_PERSLINK[i].CUST_ID == data.APP_CUST_ID) {
                data.RES_COMMENT_NO_AUTO += 'Проверьте документ регистрации в базе утерянных паспортов;';
                break;
            }
        }
    }

    if (data.PROD_RETURN_KC == 'Y') {
        data.RES_COMMENT_NO_AUTO += 'Принудительная отправка на КЦ;';
    }

    if (data.LOCAL_BLPHONE == 'Y' && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP')) {
        data.RES_COMMENT_NO_AUTO += 'Негативный телефон;';
    }

    if (data.APP_ACT_ADDRESS.ADDLINK_LAST == 'P') {
        data.RES_COMMENT_NO_AUTO += 'Адрес проживания в списке ограничений;';
        data.FRAUD_FRAUD_SUSPICTION = 'Y';
    }
    if (data.APP_REG_ADDRESS.ADDLINK_LAST == 'P' && data.APP_ACT_ADDRESS_REG_EQUAL != 'Y') {
        data.RES_COMMENT_NO_AUTO += 'Адрес регистрации в списке ограничений;';
        data.FRAUD_FRAUD_SUSPICTION = 'Y';
    }

    if ( data.SPVostok_VostokRegion == 'Y' && data.PROD_CHAR_BRANCH_FIL == 'ВОСТОЧНОЕ РУ' && data.SPVostok_RegionNoSpravka == 'N' &&
        data.RES_LIMIT_TYPE.indexOf('ZP') == -1 && data.RES_LIMIT_TYPE.indexOf('SOTR') == -1 && data.RES_LIMIT_TYPE.indexOf('DEPOS') == -1) {
        data.RES_COMMENT_NO_AUTO += 'Проверьте справку переселенца на наличие адреса вне зоны АТО;';
    }

    var cntPeople = 10;
    if ((data.DATA_TOTAL_CLIENT_REG > cntPeople || data.DATA_TOTAL_CLIENT_ACT > cntPeople) && (data.APP_CUST_IMPORTANT_PRODUCT != 'VP' && data.RES_PROD_TYPE != 'VIP') && data.APP_CUST_ORGLEAD!='Y' &&
        data.RES_LIMIT_TYPE.indexOf('ZP') == -1 && data.RES_LIMIT_TYPE.indexOf('SOTR') == -1 && data.RES_LIMIT_TYPE.indexOf('DEPOS') == -1 && data.RES_LIMIT_TYPE.indexOf('ACC_INCOME') == -1 &&
        data.RES_LIMIT_TYPE.indexOf('HYSTORY') == -1 && data.RES_LIMIT_TYPE.indexOf('USAGE') == -1) {
        if (data.DATA_TOTAL_CLIENT_REG > cntPeople) {
            data.RES_COMMENT_NO_AUTO = data.RES_COMMENT_NO_AUTO + 'Проверьте адрес регистрации (кол-во клиентов ' + data.DATA_TOTAL_CLIENT_REG + ')- ' + data.APP_REG_ADDRESS.UADID + ';';
            data.FRAUD_FRAUD_SUSPICTION = 'Y';
        }
        if (data.DATA_TOTAL_CLIENT_ACT > cntPeople) {
            data.RES_COMMENT_NO_AUTO = data.RES_COMMENT_NO_AUTO + 'Проверьте адрес проживания (кол-во клиентов ' + data.DATA_TOTAL_CLIENT_ACT + ')- ' + data.APP_ACT_ADDRESS.UADID + ';';
            data.FRAUD_FRAUD_SUSPICTION = 'Y';
        }
    }

}

data.RES_DEC_AUTO = 'Y';
if (data.RES_COMMENT_NO_AUTO != ''){
    data.RES_DEC_AUTO = 'N';
}

if (data.RES_COMMENT_NO_AUTO != '') {
    if (data.LOCAL_UPGRADE_TYPE == 'GOLD') {
        data.RES_COMMENT_NO_AUTO += 'Перенос лимита с ГОЛДа; ';
    }
    else {
        if (data.LOCAL_UPGRADE_TYPE == 'UNI') {
            data.RES_COMMENT_NO_AUTO += 'Перенос лимита с Универсалки; ';
        }
        else {
            if (data.LOCAL_UPGRADE_TYPE == 'JUNI') {
                data.RES_COMMENT_NO_AUTO += 'Перенос лимита с Юниорки; ';
            }
        }
    }
}

data.nodeName = 'CommNonAutomatic';