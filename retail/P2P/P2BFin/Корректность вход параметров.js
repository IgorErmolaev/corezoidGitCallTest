// JavaScript Document
if (data.okpo == '' || data.okpo == null) {
    data.TypeDec = 'AVTO';
    data.Decision = 'Check';
    data.FinalCode = 'С101';
    data.LIM_P2B = 0;
    data.comment = 'Не заполнен окпо юр лица';
}
if (data.term == '' || data.term == null || data.term == "null") {
    data.TypeDec = 'AVTO';
    data.Decision = 'Check';
    data.LIM_P2B = 0;
    data.comment = 'Не заполнен срок кредита';
}

if (data.LimitRequsted == '' || data.LimitRequsted == null || data.LimitRequsted == "null") {
    data.TypeDec = 'AVTO';
    data.Decision = 'Check';
    data.FinalCode = 'С101';
    data.LIM_P2B = 0;
    data.comment = 'Не заполнена сумма кредита';
}

if (Number(data.LimitRequsted)<50000) {
    data.TypeDec = 'AVTO';
    data.Decision = 'Check';
    data.FinalCode = 'С101';
    data.LIM_P2B = 0;
    data.comment = 'Минимальная сумма кредита 50 тыс.';
}

if (Number(data.LimitRequsted)<50000) {
    data.TypeDec = 'AVTO';
    data.Decision = 'Check';
    data.FinalCode = 'С101';
    data.LIM_P2B = 0;
    data.comment = 'Минимальная сумма кредита 50 тыс.';
}

if (Number(data.LimitRequsted)>500000) {
    data.TypeDec = 'AVTO';
    data.Decision = 'Check';
    data.FinalCode = 'С101';
    data.LIM_P2B = 0;
    data.comment = 'Максимальная сумма кредита 500 тыс.';
}

if (data.clientid == '' || data.clientid == null) {
    data.TypeDec = 'AVTO';
    data.Decision = 'Check';
    data.FinalCode = 'С101';
    data.LIM_P2B = 0;
    data.comment = 'Не заполнен клиентид';
}

if (data.ob_ex == '' || data.ob_ex == null || data.ob_ex == "null") {
    data.TypeDec = 'AVTO';
    data.Decision = 'Check';
    data.FinalCode = 'С101';
    data.LIM_P2B = 0;
    data.comment = 'Не заполнен оборот юр лица';
}

if (data.assets == '' || data.assets == null) {
    data.TypeDec = 'AVTO';
    data.Decision = 'Check';
    data.FinalCode = 'С101';
    data.LIM_P2B = 0;
    data.comment = 'Не заполнена стоимость активов';
}

if (data.convjr != undefined && data.convjr.state != 'BLOCK') {
    data.TypeDec = 'AVTO';
    data.Decision = 'Check';
    data.FinalCode = 'С101';
    data.LIM_P2B = 0;
    data.comment = 'По данному клиенту заявка находится в работе ';
}