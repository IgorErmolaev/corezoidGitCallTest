
const GROUP_1_DL = '056784';
const GROUP_2_TICKET = '056783';
const GROUP_3_INFO = '056782';
const GROUP_4_REISSUE = '056781';
const GROUP_5_SSSS = '056779';
const GROUP_6_MR = '056780';
const GROUP_7_ACT = '058105';


function convertDate (dateOld){
    var dateOldDate = new Date(dateOld);
    var year = dateOldDate.getFullYear();
    var month = dateOldDate.getMonth()+1;
    var date = dateOldDate.getDate();

    if (month <10){
        month = '0' + month;
    }

    if (date <10){
        date = '0' + date;
    }

    return date + '.' + month + '.' + year;
}

var groupDL = new Array('D101','D106','D102','D112','D135','L102','L114','L111','L124','L113','L120','L129','L130','L117','L125','D133','D124','L103','L116','M103','L122','L127','L128','D130','L106','L107','L121',
    'L126','L105','M123','M101','M121','M115','M104','X101','L131','M106','M107','M108','M109','M110','M111','M112','M113','M116','M117','M118','M119','M120','M114','2222');
var groupTicket = new Array('D110');
var groupAddInfo = new Array('D119','D126');
var groupReissue = new Array('D120','D122','D125','L115','L119','D129','L112','M105');
var groupSSSS = new Array('SSSS');
var groupMR = new Array('D500');

data.groupResult = null;

if (groupTicket.indexOf(data.PROD_APP_CODE_COMMENT_KC) !=-1 || groupTicket.indexOf(data.RES_DEC_REAS_FINAL_CODE_FIN) !=-1 || groupTicket.indexOf(data.RES_DEC_REAS_FINAL_CODE_PRE) !=-1 || groupTicket.indexOf(data.RES_LIMIT_CLIENT_F_NCLIENT) !=-1){
    data.groupResult = GROUP_2_TICKET;
}

if (groupAddInfo.indexOf(data.PROD_APP_CODE_COMMENT_KC) !=-1 || groupAddInfo.indexOf(data.RES_DEC_REAS_FINAL_CODE_FIN) !=-1 || groupAddInfo.indexOf(data.RES_DEC_REAS_FINAL_CODE_PRE) !=-1 || groupAddInfo.indexOf(data.RES_LIMIT_CLIENT_F_NCLIENT) !=-1){
    data.groupResult = GROUP_3_INFO;
}

if (groupReissue.indexOf(data.PROD_APP_CODE_COMMENT_KC) !=-1 || groupReissue.indexOf(data.RES_DEC_REAS_FINAL_CODE_FIN) !=-1 || groupReissue.indexOf(data.RES_DEC_REAS_FINAL_CODE_PRE) !=-1 || groupReissue.indexOf(data.RES_LIMIT_CLIENT_F_NCLIENT) !=-1){
    data.groupResult = GROUP_4_REISSUE;
}

if (data.RES_MR_TAKEN == 'false' && groupMR.indexOf(data.RES_LIMIT_CLIENT_F_NCLIENT) !=-1 &&  groupMR.indexOf(data.LIMIT_CLIENT_F_NCLIENT) !=-1){
    data.groupResult = GROUP_6_MR;
}

if (data.RES_INSURANCE_TAKEN == 'false' && groupSSSS.indexOf(data.RES_LIMIT_CLIENT_F_NCLIENT) != -1 && groupSSSS.indexOf(data.LIMIT_CLIENT_F_NCLIENT) != -1){
    data.groupResult = GROUP_5_SSSS;
}

if (data.convjr != undefined && data.convjr.state != undefined){
    data.groupResult = GROUP_7_ACT;
}

if (groupDL.indexOf(data.PROD_APP_CODE_COMMENT_KC) !=-1 || groupDL.indexOf(data.RES_DEC_REAS_FINAL_CODE_FIN) !=-1 || groupDL.indexOf(data.RES_DEC_REAS_FINAL_CODE_PRE) !=-1 || groupDL.indexOf(data.RES_LIMIT_CLIENT_F_NCLIENT) !=-1){
    if (data.RES_DEC_REAS_FINAL_CODE_FIN == 'D135' || data.RES_DEC_REAS_FINAL_CODE_PRE == 'D135'){
        if (data.blockdate != undefined && data.blockdate != null){
            data.groupResult = GROUP_1_DL;
        }
    }
    else {
        data.groupResult = GROUP_1_DL;
    }
}

if (data.blockdate != undefined && data.blockdate != null && data.blockdate != ''){
    data.dateBlock = convertDate(data.blockdate);
}

