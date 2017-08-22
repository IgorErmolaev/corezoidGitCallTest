// JavaScript Document

var good_code = ['D010','D017','D021','D031','D039','D064','D068','D072','D087','D088', 'D200',
    'D201','D214','D217','D220','D225','D255','D267','D270','D284','D285','D287','D292','D293', 'D308'];

if (data.RES_DEC_AUTO == undefined ||  data.RES_DEC_AUTO =='') {
    data.RES_DEC_AUTO = 'Y';
}

/****************************************Comment**********************************************************************/
if (data.RES_DEC_CATEGORY == 'DECLINE') {
    data.RES_LIMIT_ITOG = 0;
    data.RES_CHAR_PLAT_MIN = 0;
    data.RES_LIMIT_ITOG_TYPE = '';
    data.RES_DEC_FINAL_FLOW = 'DECLINE';
}
else
{
    data.RES_DEC_FINAL_FLOW = 'ACCEPT';
}

if (data.RES_DEC_FINAL_FLOW !='ACCEPT') {
    for (var i = 0; i < data.RES_DEC_REAS_CODE_TABLE.length; i++) {
        if (data.RES_DEC_REAS_CODE_TABLE[i] == 'A101') {
            data.RES_DEC_REAS_CODE_TABLE[i].Push('')
        }
    }
}

data.RES_COMMENT_NO_AUTO = '';
if (data.LOCAL_HAS_DELINQUENCY == 'Y' || data.BCH_CRED_OWN_PROS_YBCH == 'Y') {
    data.RES_COMMENT_NO_AUTO += 'Текущая просрочка;';
}

if (data.BCH_CRED_HIST_YBCH != undefined && data.BCH_CRED_HIST_YBCH.substring(0,1) == 'H' && data.BCH_CRED_OWN_PROS_YBCH != 'Y'){
    data.RES_COMMENT_NO_AUTO += 'Текущая просрочка в другом банке;';
}

if (data.APP_CUST_INN == '') {
    data.RES_COMMENT_NO_AUTO += 'У клиента нет ИНН, проведите проверку;';
}

if (data.DATA_ECB_NOT_WORK == 'Y') {
    data.RES_COMMENT_NO_AUTO += 'Ручная проверка ЧС;';
}

if ( data.BCH_YBCH_NOT_WORK == 'Y)'){
    data.RES_COMMENT_NO_AUTO += 'Не сработал запрос в УБКИ - ручная проверка;';
}

if (data.LOCAL_CRED_CARD_NO_PAYM == 'Y') {
    data.RES_COMMENT_NO_AUTO += 'Еж. платеж по кредитке;';
}

if (data.LOCAL_OPEN_PEACH == 'Y') {
    data.RES_COMMENT_NO_AUTO += 'Не погашен Кредит на всякий случай или Быстрые наличные;';
}

if (data.limits_not_work == 'Y') {
    data.RES_COMMENT_NO_AUTO += 'Не сработал запрос в сервис лимитов - ручная проверка;';
}
if (good_code.indexOf(data.DATA_TRELCLIENTS_CODE) != -1) {
    data.RES_LIMIT_ITOG = 5000;
    switch(data.DATA_TRELCLIENTS_CODE)
    {
        case 'D010':     data.RES_COMMENT_NO_AUTO += ' Снижение по негативной причине;';                                                     break;
        case 'D017':     data.RES_COMMENT_NO_AUTO += '  Амнистия увеличения по заявке клиента;';                                             break;
        case 'D021':     data.RES_COMMENT_NO_AUTO += ' Негатив при стартовой выдаче;';                                                       break;
        case 'D031':     data.RES_COMMENT_NO_AUTO += ' Карта выдана менее 2 дней;';                                                          break;
        case 'D039':     data.RES_COMMENT_NO_AUTO += ' Было увеличение по ДОГОВОРУ за последние 2 недели, новый лимит <= установленного;';   break;
        case 'D064':     data.RES_COMMENT_NO_AUTO += ' Источник погашения используется по 4 и более карт;';                                  break;
        case 'D068':     data.RES_COMMENT_NO_AUTO += ' Карта выдана менее 90 дней;';                                                         break;
        case 'D072':     data.RES_COMMENT_NO_AUTO += ' Карта выдана менее 3-х месяцев;';                                                     break;
        case 'D087':     data.RES_COMMENT_NO_AUTO += ' Возрастное ограничение (69 лет и старше);';                                           break;
        case 'D088':     data.RES_COMMENT_NO_AUTO += ' Возрастное ограничение (отсутствие данных);';                                         break;
        case 'D200':     data.RES_COMMENT_NO_AUTO += ' Отказ по стартовому скорингу;';                                                       break;
        case 'D201':     data.RES_COMMENT_NO_AUTO += ' По скорингу;';                                                                        break;
        case 'D214':     data.RES_COMMENT_NO_AUTO += ' Возрастное ограничение (младше 25 лет);';                                             break;
        case 'D217':     data.RES_COMMENT_NO_AUTO += ' У клиента открыт проект на социальные выплаты;';                                      break;
        case 'D220':     data.RES_COMMENT_NO_AUTO += ' Кредитная нагрузка по БКИ (активные кредиты: внутренние и внешние);';                 break;
        case 'D225':     data.RES_COMMENT_NO_AUTO += ' Нет поступлений более 60 дней по дебетной карте;';                                    break;
        case 'D255':     data.RES_COMMENT_NO_AUTO += ' Возрастное ограничение (младше 21 года);';                                            break;
        case 'D267':     data.RES_COMMENT_NO_AUTO += ' Высокая проблемность по отрасли;';                                                    break;
        case 'D270':     data.RES_COMMENT_NO_AUTO += ' Кредитная нагрузка по БКИ (открыт потребительский кредит);';                          break;
        case 'D284':     data.RES_COMMENT_NO_AUTO += ' Снижение размера целевых поступлений;';                                               break;
        case 'D285':     data.RES_COMMENT_NO_AUTO += ' Клиент работает на предприятии, которое внесено в список ограничения предоставления банковских услуг;';    break;
        case 'D287':     data.RES_COMMENT_NO_AUTO += ' Нет оборотов более 60 дней по расчетного счету(чп);';                                 break;
        case 'D292':     data.RES_COMMENT_NO_AUTO += ' Клиент работает на предприятии с высоким уровнем проблемности (по сотрудникам)';      break;
        case 'D293':     data.RES_COMMENT_NO_AUTO += ' Обнуление лимита на Р/С работодателя;';                                               break;
        case 'D308':     data.RES_COMMENT_NO_AUTO += ' Наличие положительного решения по авто;';                                             break;
        default:         data.RES_COMMENT_NO_AUTO += '';                                                                                     break;
    }
}

if (data.RES_COMMENT_NO_AUTO != ''){
    data.RES_DEC_AUTO = 'N';
}


/*----------------------------------------pars fraud table-----------------------------------------------------------*/

if (data.FRAUD_DEC_REAS_CODE != undefined) {
    data.FRAUD_DEC_REAS_CODE_TABLE = data.FRAUD_DEC_REAS_CODE.split(';');
    data.FRAUD_DEC_REAS_CODE_TABLE.splice(data.FRAUD_DEC_REAS_CODE_TABLE.length-1,1);
}

if (data.FRAUD_DEC_FINAL_FLOW == 'REFER') {
    data.RES_DEC_AUTO = 'N';
    data.FRAUD_FRAUD_SUSPICTION = 'Y';
    for (i = 0; i < data.FRAUD_DEC_REAS_CODE_TABLE.length; i++) {
        if (data.FRAUD_DEC_REAS_CODE_TABLE[i] != '') {
            data.RES_COMMENT_NO_AUTO += 'k' + data.FRAUD_DEC_REAS_CODE_TABLE[i] || ';';
        }

    }
}

if ( data.RES_COMMENT_NO_AUTO != '') {
    data.RES_COMMENT_NO_AUTO = 'Проверьте клиента:' +  data.RES_COMMENT_NO_AUTO;
}


/*--------------------------------------------CALL------------------------------------------------------------------------*/
data.RES_CUST_NEED_CALL = 'N';

if (data.RES_CALL_HOME_PHONE == 'Y' || data.RES_CALL_WORK_PHONE == 'Y' || data.RES_CALL_MOB_PHONE == 'Y') {
    data.RES_CUST_NEED_CALL = 'Y';
}

if (data.RES_CUST_NEED_CALL == 'N') {
    data.RES_CALL_DIALOGE_TYPE = '';
}


/*---BI---*/
data.RES_BI = 'O';

if (data.RES_DEC_CATEGORY == 'DECLINE') {
    data.RES_BI = 'D';
}
else {
    if( data.RES_CUST_NEED_CALL == 'Y' ) {
        data.RES_BI = 'O';
    }
}

if (data.RES_DEC_FINAL_FLOW == 'ACCEPT' && data.RES_CUST_NEED_CALL != 'Y' && data.RES_DEC_AUTO != 'N') {
    data.RES_BI = 'GD';
}

if (data.RES_DEC_FINAL_FLOW == 'ACCEPT' && data.KC_FINAL_CODE != '' && data.KC_LIMIT_P48>0) {
    data.RES_BI = 'N';
}

if (data.RES_CUST_NEED_CALL == 'N' && data.RES_BI == 'O' && data.RES_DEC_AUTO =='N') {
    data.RES_BI = 'KC';
}

/*------------------------------------------------LIMIT_P48---------------------------------------------------------*/
data.RES_LIMIT_P48 = 0;

if (data.RES_BI  == 'GD') {
    data.RES_LIMIT_P48 = data.RES_LIMIT_ITOG;
    data.RES_CHAR_PLAT_MIN = data.RES_LIMIT_P48/data.PROD_SCHEME_TERM  + data.RES_LIMIT_P48 * 0.0599;
    data.RES_CHAR_PLAT_MIN = data.RES_CHAR_PLAT_MIN.toFixed(2);
}
if (data.RES_BI == 'N') {
    data.RES_LIMIT_P48 = Math.min(data.KC_LIMIT_P48,data.PROD_CHAR_LIMITREQUESTED);
    data.RES_CHAR_PLAT_MIN = data.RES_LIMIT_P48/data.PROD_SCHEME_TERM  + data.RES_LIMIT_P48 * 0.0599;
    data.RES_CHAR_PLAT_MIN = data.RES_CHAR_PLAT_MIN.toFixed(2);
}

/*---SMS---*/
data.RES_TYPE_SMS = 'Y';
