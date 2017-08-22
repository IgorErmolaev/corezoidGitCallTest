function dateTimeToStr(a)
{
    var day = String(a.getDate()); if ( day.length ==1 ) day="0"+day;
    var mont = String(a.getMonth()+1); if ( mont.length == 1 ) mont="0"+mont;
    var hour = String(a.getHours()); if ( hour.length ==1 ) hour="0"+hour;
    var min = String(a.getMinutes()); if ( min.length ==1 ) min="0"+min;
    var sec = String(a.getSeconds()); if ( sec.length ==1 ) sec="0"+sec;
    return a.getFullYear() + "-" + mont + "-" + day + "T"+ hour+":"+ min+":"+ sec;
}

if (data.PROD_APP_DATEFILING == null) {
    data.PROD_APP_DATEFILING = dateTimeToStr(new Date());
}
data.APP_MARITAL_ID=0;


delete data.input;


//урлы для сервисов
data.ekb_url="https://cis.privatbank.ua/all";
data.rtdm_api_url="https://rtdm.it.loc/RTDMApi";
//data.rtdm_api_url="http://10.61.131.146:7004/RTDMApi";
data.jaguar_url="https://rtdm.it.loc/Jaguar";
data.addr_url="https://uaddr.privatbank.ua:7375/AddressReference/address/addressInfo.do?";
data.shp_search_url="https://att.privatbank.ua/all/conv/attachmentservice/search.json";
data.lim_or_neg_api_url="https://rmsvc.privatbank.ua/service/LimitOrNegative/?type=conv";
data.lim_or_neg_api_login="SASRTDM";
data.lim_or_neg_api_secret="QcXR6cQ8MgFSYrzAm3WtdphYF2DyEAUU8VSGxI38tB8nR81vqTFaQntPqtNN3IKT";
data.megav_url="https://stat.privatbank.ua/stat/api/sasinfo/get/";
data.client_prop_url="https://start.privatbank.ua:7585/Irbis/dbapi/getclientproperty.xml";
data.antifraud_url="https://vkfm.privatbank.ua/EAntiFraudCoreWave/fraud";
data.underwr_url = "https://rmsvc.privatbank.ua/service/uw_dec/live/";
data.calling_url = "https://rmsvc.privatbank.ua/service/uw_call/";
data.calling_conv_id = 89374;
data.underwr_conv_id = 89373;
data.dict_id = 96057;
data.pyscoring_url = "https://rtdm.it.loc/pyscoring";
/*data.status_fach_url = "https://cem.privatbank.ua:9106/OCCProxyService/client/loans/get";*/
data.status_fach_url = "https://cem.a-bank.com.ua/OCCProxyService/client/loans/get";



if (data.PROD_CHAR_BANK == "AB" && data.PROD_CHAR_TYPE != 'AUTOBROKER') {
    data.ekb_url="https://cis.a-bank.com.ua/all";
    data.shp_search_url="https://att.a-bank.com.ua/all/conv/attachmentservice/search.json";
}


data.APP_CUST_ID_OLD=0;
data.compliance_login = 'SASRTDM';
data.compliance_secret = 'nmd5yza54Sv7pGMFqfUaIFfOdqh0gZDEmRKUrU0vNwCccpRCELMmr1aEssEJsinO97JB2J6PfJ1r8T3NEQ96SkLlNq4fIs4SAOuCxArNktfsmjf19p71JTnxjrN2URUu';
data.rm_url = 'https://rmsvc.privatbank.ua';
data.purse_hbase_url = "https://stat.privatbank.ua/stat/api/purse/module/cards/byekb";

data.sidABKC = 'N';
if (data.PROD_CHAR_BANK == "AB"){
    var id_score = data.APP_CUST_ID;
    id_score = String(id_score);
    id_score = id_score.slice(-3);
    id_score = +id_score;

    if (id_score >= 800){
        data.underwr_url = "https://rmsvc.a-bank.com.ua/service/uw_dec/live/";
        data.sidABKC = 'Y';
    }

}