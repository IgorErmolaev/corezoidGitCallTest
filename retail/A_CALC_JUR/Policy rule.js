function Datediff_day (days_diff ){
    var dateOpen = days_diff; // дата на входе
    var today = Date.now();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}

function getBlackPan (clID, debcardArr,obArr,deposArr, bchArr){
    var blackPan = 'FALSE';
    if (debcardArr != undefined){
        for(var d=0; d < debcardArr.length;d++){
            if (debcardArr[d].CUST_ID == clID){
                if (debcardArr[d].Z_SRED >= 1000 || debcardArr[d].P_SRED >= 1000){
                    blackPan = 'TRUE';
                    return blackPan;
                }
                break;
            }
        }
    }
    if (deposArr != undefined && blackPan != 'TRUE'){
        for(var d=0; d < deposArr.length;d++){
            if (deposArr[d].CUST_ID == clID){
                if (deposArr[d].TOTAL >= 10000){
                    blackPan = 'TRUE';
                    return blackPan;
                }
                break;
            }
        }
    }
    if (obArr != undefined && blackPan != 'TRUE'){
        for(var d=0; d < obArr.length;d++){
            if (obArr[d].CUST_ID == clID){
                if (obArr[d].OB_ALL >= 1000){
                    blackPan = 'TRUE';
                    return blackPan;
                }
                break;
            }
        }
    }
    if (bchArr != undefined && blackPan != 'TRUE'){
        for(var d=0; d < bchArr.length;d++){
            if (bchArr[d].CUST_ID == clID){
                if (bchArr[d].HIST_YBCH == 'POSITIVE' && ['NEGATIVE','HDNEGATIVE','MEDIUM'].indexOf(bchArr[d].HIST_DATA) ==-1){
                    blackPan = 'TRUE';
                    return blackPan;
                }
                break;
            }
        }
    }
    return blackPan;
}

function getStopPrecalc (clID, precalcArr,stop){
    var hasStop = 'FALSE';
    if (precalcArr != undefined){
        for (var c = 0 ; c< precalcArr.length; c++){
            if (precalcArr[c].CUST_ID == clID){
                if (precalcArr[c].CODE != undefined){
                    for (var s =0; s< precalcArr[c].CODE.length; s++){
                        if (precalcArr[c].CODE[s] == stop){
                            hasStop = 'TRUE';
                            return hasStop;
                        }
                    }
                }
                return hasStop;
            }
        }
    }
    return hasStop;
}

data.RES_DEC_REAS_CODE_TABLE = new Array();

if (data.req.BlackCode != undefined) {
    for (var i=0; i< data.req.BlackCode.length; i++){
//--------------------------Арест счета-------------------------------------------------------    
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'BLOCKED ACC' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D501') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D501');
        }
//------Обслуживание клиента временно приостановлено. Восстановление по индивидуальному согласованию-----    
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'CASH CL' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D502') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D502');
        }
//------Обслуживание клиента временно приостановлено. Восстановление по индивидуальному согласованию---     
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'CASH RP' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D503') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D503');
        }
//------Есть активы по предприятию/СПД со статусом "Мошенничество"/"СБ"/"Арест"/"Юр.департамент---    
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'FRAUD CL' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D504') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D504');
        }
//--------Дата регистрации предприятия менее 6 мес---------------------------------    
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'NEWBE' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D505') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D505');
        }
//-------Наличие актива, списанного в счет страхового резерва-----------------------    
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'RESERV DEBT' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D506') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D506');
        }
//------У предприятия/СПД  есть актив, переданный в СБ----------------------------    
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'SBJD CL' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D507') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D507');
        }
//-----У связанного лица наличие актива, списанного в счет страхового резерва--------- 
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'RESERV DEBT RP' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D508') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D508');
        }
//-----------------------Список инсайдеров---------------------------------------------
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'INSIDER' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D509') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D509');
        }
//----------------По лимиту на счет / "Гарантированному платежу" просрочка 30+---------
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'L2F/LGP 30+' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D510') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D510');
        }
//----------------Лимит обнулен после дополнительной проверки деп-том андеррайтинга--------
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'OBNUL' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D511') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D511');
        }
//---------------------Лимит обнулен по СЗ от филиала-------------------------------------- 
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'OBNUL SZ' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D512') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D512');
        }
//-----------Централизованное обнуление клиентов из нестабильной политической зоны----------
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'REGION' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D513') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D513');
        }
//-----------------------Активная сделка реструктуризации-----------------------
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'REST' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D514') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D514');
        }
//-----------По предприятию/СПД текущая просрочка  30+ более 200 грн---------------
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'NEG HIST 30+ CL' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D515') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D515');
        }
//------------По связанному лицу текущая просрочка 30+  более 200 грн------------- 
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'NEG HIST 30+ RP' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D516') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D516');
        }
//------------По предприятию/СПД текущая просрочка  90+ более 50 грн------------------
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'NEG HIST 90+ CL' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D517') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D517');
        }
//------------По связанному лицу текущая просрочка 90+  более 50 грн---------------------
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'NEG HIST 90+ RP' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D518') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D518');
        }
//-----Предприятие/СПД в списке ограничений(красный)--------------------------------------------
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'BLACK CL' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D519') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D519');
        }
//--------Связанное лицо в списке ограничений(красный)------------------------------------------
        if (data.req.BlackCode[i] == '66' && data.req.BlackComment[i] == 'BLACK RP' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D520') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D520');
        }
//-----Предприятие/СПД в списке ограничений(желтый)--------------------------------------------
        if (data.req.BlackCode[i] == '55' && data.req.BlackComment[i] == 'BLACK CL' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D521') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D521');
        }
//--------Связанное лицо в списке ограничений(желтый)------------------------------------------
        if (data.req.BlackCode[i] == '55' && data.req.BlackComment[i] == 'BLACK RP' && data.RES_DEC_REAS_CODE_TABLE.indexOf('D522') ==-1) {
            data.RES_DEC_REAS_CODE_TABLE.push('D522');
        }
    }
}

data.commAdd = '';

if (data.BCH_CRED != undefined){
    for (var i=0; i<data.BCH_CRED.length;i++){
        /*текущая просрочка от 500грн по АБ/ПБ*/
        if (data.BCH_CRED[i].HIST_DATA == 'HDNEGATIVE'){
            if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D523') ==-1){
                data.RES_DEC_REAS_CODE_TABLE.push('D523');
            }
            data.commAdd = 'Текущая просрочка ID: ' + data.BCH_CRED[i].CUST_ID + data.commAdd;
        }

        /*наличие реструктуризации*/
        if (data.BCH_CRED[i].RESTR_PROD == 'Y' ){
            if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D524') ==-1){
                data.RES_DEC_REAS_CODE_TABLE.push('D524');
            }
            data.commAdd = 'Необходимо полное погашение реструктуризации ID: ' + data.BCH_CRED[i].CUST_ID + data.commAdd;
        }

        /*наличие 3-х и более действующих кредитов у предприятия*/
        if (data.BCH_CRED[i].CUST_ID == data.APP_CUST_ID_JUR && data.BCH_CRED[i].COUNT_ACT >=3 && data.DATA_TRELCLIENTS_LIM_60_GOOD_CL<=0){
            data.RES_DEC_REAS_CODE_TABLE.push('D528');
        }

        /*наличие 2-х и более действующих кредитов у предприятия/связанного лица по Авто/Жилье/Кеши*/
        if (data.BCH_CRED[i].CNT_ACTIVE_SPEC_CRED >=2 &&  data.DATA_TRELCLIENTS_LIM_60_GOOD_CL<=0){
            if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D529') ==-1){
                data.RES_DEC_REAS_CODE_TABLE.push('D529');
            }
        }

        /*наличие НКИ по предприятию/связанному лицу*/
        if ((data.BCH_CRED[i].EMPL_NKI == 'Y' && data.BCH_CRED[i].CUST_ID == data.APP_CUST_ID_JUR) ||
            ( data.BCH_CRED[i].CUST_ID != data.APP_CUST_ID_JUR && (data.BCH_CRED[i].HIST_YBCH == 'NEGATIVE' ||  data.BCH_CRED[i].HIST_DATA == 'NEGATIVE'))){
            if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D530') ==-1){
                data.RES_DEC_REAS_CODE_TABLE.push('D530');
            }
        }

        /*наличие ЖНКИ по предприятию/связанному лицу в не нашем банке*/
        if (data.BCH_CRED[i].NOOWN_PROS_YBCH == 'Y' ){
            if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D532') ==-1){
                data.RES_DEC_REAS_CODE_TABLE.push('D532');
            }
        }



    }
}

/*текущая просрочка по договору поручительства*/
if (data.RES_PREDICT != undefined && data.APP_LINK != undefined){
    for (var i=0; i< data.APP_LINK.length; i++){
        if (getStopPrecalc(data.APP_LINK[i].CUST_ID,data.RES_PREDICT,'D035')== 'TRUE'){
            if (data.RES_DEC_REAS_CODE_TABLE.indexOf('D525') ==-1){
                data.RES_DEC_REAS_CODE_TABLE.push('D525');
            }
            data.commAdd = 'По договору поручительства INN: ' + data.APP_LINK[i].CUST_INN + data.commAdd;
        }
    }
}

/*ОКПО/ИНН в ЧС*/

if (data.DATA_PERSLINK != undefined){
    for (var i=0; i< data.DATA_PERSLINK.length; i++){
        if (data.DATA_ECB_NOT_WORK !='Y'&& data.RES_DEC_REAS_CODE_TABLE.indexOf('D526') ==-1 &&
            (data.DATA_PERSLINK[i].BL_ZONE == 'R' ||
            (data.DATA_PERSLINK[i].BL_ZONE == 'Y' && (data.DATA_PERSLINK[i].BL_CONTROL.indexOf('ZPD') != -1 || data.DATA_PERSLINK[i].BL_CONTROL.indexOf('ZPDO') != -1 ||
            data.DATA_PERSLINK[i].BL_CONTROL.indexOf('ZPDO2') != -1) && getBlackPan(data.DATA_PERSLINK[i].CUST_ID,data.RES_DEBCARD,data.DATA_OB,data.RES_DEPOSIT,data.BCH_CRED) == 'FALSE' ))){
            data.RES_DEC_REAS_CODE_TABLE.push('D526');
        }
    }
}


/*новый бизнес*/
var timeemple = new Date(data.APP_EMPL_TOTALTIMEEMPL_EXT);
timeemple = Datediff_day(timeemple) / 30.5;

if (timeemple< 6 && data.DATA_TRELCLIENTS_LIM_60_GOOD_CL<=0){
    data.RES_DEC_REAS_CODE_TABLE.push('D527');
}

/*не указан директор/учередитель*/
if (data.APP_LINK == undefined || data.APP_LINK.length == 0){
    data.RES_DEC_REAS_CODE_TABLE.push('D531');
}


var decl = [];


switch (true)
{
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D509')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D509'; decl.push('D509'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D510')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D510'; decl.push('D510'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D511')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D511'; decl.push('D511'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D512')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D512'; decl.push('D512'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D513')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D513'; decl.push('D513'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D514')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D514'; decl.push('D514'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D515')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D515'; decl.push('D515'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D516')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D516'; decl.push('D516'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D517')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D517'; decl.push('D517'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D518')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D518'; decl.push('D518'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D519')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D519'; decl.push('D519'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D520')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D520'; decl.push('D520'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D501')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D501'; decl.push('D501'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D502')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D502'; decl.push('D502'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D503')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D503'; decl.push('D503'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D504')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D504'; decl.push('D504'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D505')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D505'; decl.push('D505'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D506')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D506'; decl.push('D506'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D507')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D507'; decl.push('D507'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D508')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D508'; decl.push('D508'); break;

    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D523')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D523'; decl.push('D523'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D524')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D524'; decl.push('D524'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D525')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D525'; decl.push('D525'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D526')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D526'; decl.push('D526'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D527')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D527'; decl.push('D527'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D528')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D528'; decl.push('D528'); break;
    case (data.RES_DEC_REAS_CODE_TABLE.indexOf('D529')!= -1): data.RES_DEC_REAS_FINAL_CODE = 'D529'; decl.push('D529'); break;

    default:   data.RES_DEC_REAS_FINAL_CODE = 'A101';
}

if (decl.length>0){
    data.RES_DEC_CATEGORY = 'DECLINE';
    data.RES_DEC_FINAL_FLOW = 'DECLINE';
    data.RES_DEC_TEXT ='Decline application';
}
else
{
    data.RES_DEC_REAS_CODE_TABLE.push('A101');
    data.RES_DEC_CATEGORY = 'ACCEPT';
    data.RES_DEC_FINAL_FLOW = 'ACCEPT';
    data.RES_DEC_TEXT ='Accept application';
}

data.RES_HISTORY_REAS_CODE = data.RES_DEC_REAS_CODE_TABLE.join(';');