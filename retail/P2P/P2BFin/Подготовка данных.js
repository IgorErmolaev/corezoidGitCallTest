//Проверка на введение пробела вместе с цифрами в поле окпо, в случае если введены не //только числа сервси выдаст ошибку
var okpo = data.okpo*1


data.api_login="msblimits";
data.api_secret="rDYaorolKNeDxxPj3H7cM9fbHezaSMgjpftOGR9qFn4cVTwYBDanNqyuF7ExTVQjak8RchiRFm4AfAzQeKe1bMvQUaoO5f7gzg8MxqDdMIO2jnTx77yiU49OfyDlNLCn";
require("libs/sha1.js");
sign_source ="okpo=" + okpo + "&api_login=" + data.api_login + "&api_secret=" + data.api_secret;
data.signature = CryptoJS.SHA1(sign_source).toString();

data.relatedPersons = []; //массив для связанных персон

//Переменная типа объект, что будет отвечать за количество сбоев и название сервиса
data.nerror={};
data.nerror.name_error ='';
data.nerror.count = 0;
data.nerror.retDesc='';
data.nerror.ref='';
//////////////////////////////

//Инициализайия переменных
data.LimGlp = 0;
data.LimL2f = 0;
data.Ob = 0;
data.LimGul = 0;
data.actType = 0;
data.Qual = 0;
data.vetka = 0;
data.deb = 0;
data.dReg = 0;
data.credH = 0;
data.turnover3m = 0;
data.debtsyb = 0;
data.fl_url = 'N';
data.k050 = '-';
data.ob_ekv = 0;
data.lim_q9pb_glp = 0;
data.lim_q9pb_l2f = 0;
data.lim_q9pb_gul = 0;
data.lim_q9pb_lof = 0;
data.lim_q9pb_lok = 0;
data.lim_q9pb_b2b = 0;
