// JavaScript Document
function parse(str) {
    var y = str.substr(6,4),
        m = str.substr(0,2),
        d = str.substr(3,2);
    return new Date(y,m,d);
}
function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24 * 30.5;
    var days = Math.round(diff / one_day);
    return days;
}

if (data.okpo != data.INN) {
    if (data.LinkName == undefined) {
        data.TypeDec = "KC";
        data.RES_COMMENT_NO_AUTO = "Cвязь с указанным юридическим лицом не установлена, необходимо проверить устав ЕДР";
    }
    else {
        var link = data.LinkName.split(';');
        if (link.indexOf('УЧРЕДИТЕЛИ') == -1) {
            data.TypeDec = "KC";
            data.RES_COMMENT_NO_AUTO = "Cвязь с указанным юридическим лицом не установлена, необходимо проверить устав ЕДР";
        }
    }
}

if (data.fl_url == 'N') {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = "Нет финансовых показателей по бизнесу в системе. Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.LIM_P2B == null) {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = "Необходимо сравнить расчетную сумму кредита с запрошенной клиентом" + ';' + data.RES_COMMENT_NO_AUTO;
}

var dt = parse(data.date_registr);

if (data.date_registr == "" || Datediff(dt)<6) {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = "Недостаточный опыт работы согласно данных системы. Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if(data.cnt_exp == "" || data.cnt_exp<1) {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = "Недостаточный опыт работы согласно данных анкеты. Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.assets<data.LIM_P2B) {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = "Оцененный бизнес согласно данных клиента < возможной суммы кредита. Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.LIM_P2B>0 && data.okpo.length == 8) {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = "Проверка фин. состояния/ прозрачности структуры собственности" + ';' + data.RES_COMMENT_NO_AUTO;
}
else {
    if (data.LIM_P2B>100000 ) {
        data.TypeDec = "KC";
        data.RES_COMMENT_NO_AUTO = "Возможная сумма кредита более 100 тыс. UAH. Необходимо провести дополнительную проверку (УБКИ/ЕГРОДИ)" + ';' + data.RES_COMMENT_NO_AUTO;
    }
}

if (data.OKPO_BLOCK == "Y" || data.ClientID == 21180037)
{
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = "Положительное решение по данному ОКПО" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.LimitRequsted > data.LIM_P2B && data.LIM_P2B>=50000 && (data.LimitRequsted - data.LIM_P2B)/data.LIM_P2B > 0.25) {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = "Расчетный лимит не соответствует запрошенному. Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.BlackCode == "66-") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = "Поручитель имеет" + ' ' + data.BlcodeComExcept + " - " + "Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C012") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = "Клиенту проводили снижение лимита на карте. Необходимо проверить актуальность причины снижения и провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C013") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = "Клиент имеет утилизацию по договору более 90% на текущий момент" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C014") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = " Клиент имеет >=4 непогашенных активных кредитов" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C015") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = " Нет поступлений на счета клиента более 60дней. Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C016") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = " Связанное лицо в ЧС (нестрогий). Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C017") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = " Клиент является низкодходным. Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C018") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = " По связанному лицу есть НКИ. Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C019") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = " НКИ по клиенту. Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C020") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = " Клиенту открыт проект социальных выплат. Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C021") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = " Клиент из нестабильной политической зоны. Необходима проверка с учетом данных по бизнесу" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C022") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = " Наличие непогашенного кредита Быстрые Наличные" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C023") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = " Клиент из региона с высоким риском к мошенничеству" + ';' + data.RES_COMMENT_NO_AUTO;
}

if (data.f_nclient_comm == "C024") {
    data.TypeDec = "KC";
    data.RES_COMMENT_NO_AUTO = " Поведенческий скоринг" + ';' + data.RES_COMMENT_NO_AUTO;
}



if (data.LIM_P2B != null) {
    data.LIM_P2B = Number(data.LIM_P2B).toFixed(2);
}