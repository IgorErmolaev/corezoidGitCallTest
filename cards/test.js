/*function datediff(di, createDate){
    var year = di.substring(0, 4);
    var month = di.substring(4, 6);
    var date = di.substring(6, 8);
    var di_good = new Date(year, month - 1, date);
    var diff = Math.abs(createDate - di_good);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / one_day);
    if (Math.abs(days) > 180){
        return 'Y';
    }
    else{
        return 'N';
    }

}*/

/*function convertDate (dateOld){
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

var dd = '2016-07-31T00:00:00';
var ddn = convertDate(dd);
    */

/*
data.cards = [];
var cards = [];
var cardsNew = [];
cards = data.__conveyor_api_array__;
var curDate = new Date;
var strYear = curDate.getFullYear();
var strMonth = curDate.getMonth() + 1;
strYear = strYear.toString().substring(2,4);
if (strMonth < 10){
    strMonth = '0'+ strMonth;
}
var str = strYear.toString() + strMonth.toString();
data.str = str;

var a=1;

a = a+1;

cardsNew = cards.filter(function(item){
    return item.product_type == 'KUN';
});

if (data.pointType != 'WAVE'){
    cardsNew = cardsNew.filter(function(item){
        return !(new RegExp("^(CRCU|CRCP|CRCR)$").test(item.contract_type));
    });
}

cardsNew = cardsNew.filter(function(item){
    return !(new RegExp("^(BOEC|BOEG)$").test(item.contract_type));
});

cardsNew = cardsNew.filter(function(item){
    return !(new RegExp("^(545708221.*)$").test(item.pan));
});

cardsNew = cardsNew.filter(function(item){
    if (item.exdate != null){
        return item.exdate.replace( /(\d{2})(\d{2})/, "$2$1") >= str;
    }
});

cardsNew = cardsNew.filter(function(item){
    return item.currency == 980;
});

cardsNew = cardsNew.filter(function(item){
    return item.pan.length == 16;
});

cardsNew = cardsNew.filter(function(item){
    return item.isTrustCard != 'Y';
});

cardsNew = cardsNew.filter(function(item){
    return item.bank == data.bank;
});

if(data.target == 'instant-installment'){
    cardsNew = cardsNew.filter(function(item){
        return item.card_name != "Карта Юниора";
    });

    cardsNew = cardsNew.filter(function(item){
        return item.pan.substring(0,6) != '4516933';
    });
}

if (data.VipStatus == 'Y'){
    cardsNew = cardsNew.filter(function(item){
        return item.card_state == '1' || item.card_state ==  '5';
    });
}
else{
    var cardsNewNotVIP = cardsNew.filter(function(item){
        return item.contract_state == 'a' && item.credit_limit > 0;
    });

    var cardsNotVIPNotLimit = cardsNewNotVIP.filter(function(item){
        return item.card_state == '1' || item.card_state ==  '5';
    });

    if (cardsNewNotVIP && cardsNotVIPNotLimit && cardsNewNotVIP.length > 0 && cardsNotVIPNotLimit.length == 0){
        if (data.lang == 'ru'){
            data.errText = 'Уважаемый клиент, у Вас уже есть карта с установленным кредитным лимитом ' + cardsNewNotVIP[0].credit_limit + ' грн, но она не активна. Сумма доступного остатка на карте составляет ' + cardsNewNotVIP[0].balance + ' грн. Пожалуйста, обратитесь в удобное для Вас отделение ПриватБанка для получения новой карты.';
        }
        else{
            data.errText = 'Шановний клієнте, у Вас вже є картка з встановленним кредитним лімітом ' + cardsNewNotVIP[0].credit_limit + ' грн, але вона не активна. Сума доступного залишку на картці становить ' + cardsNewNotVIP[0].balance + ' грн. Будь ласка, зверніться в зручне для Вас відділення ПриватБанку для отримання нової карти.';
        }
    }
    else{
        cardsNew = cardsNew.filter(function(item){
            return item.card_state == '1' || item.card_state ==  '5';
        });
    }

}


if (!data.errText){
    var cardsNew1 = [];
    if (cardsNew) {
        cardsNew.forEach(function(item, i){
            if (item.card_alias){
                var name = item.pan.substr(0,6) + '********' + item.pan.substr(14,2) + ' ' + item.card_alias;
            }
            else {
                var name = item.pan.substr(0,6) + '********' + item.pan.substr(14,2) + ' ' + item.card_name;
            }

            var tr = {
                "pan": item.pan,
                "refcontract": item.refcontract,
                "limit": item.credit_limit,
                "type": item.product_type,
                "expDate": item.exdate,
                "currency": item.currency,
                "refState": item.contract_state,
                "refType": item.contract_type,
                "name": name
            };
            cardsNew1[i] = tr;
        });
    }

    data.cards = cardsNew1;
}*/
/*
data.prelim_st = new Date();

data.prelim_st = new Date(data.prelim_st);
data.prelim_fn = new Date();
data.prelim_df = (data.prelim_fn - data.prelim_st)/1000;


purse_df

ekb_df

bki_df*/

data.RES_LIMIT_P48=0;
if (data.STRATEGY_ID == "CredCard") {
    data.RES_BI = "GD";
} else {
    data.RES_BI = "D";
}

data.RES_DEC_REAS_FINAL_COMMENT="kA101;";
data.RES_DEC_REAS_FINAL_CODE="A101;";
data.RES_VIP_SUM=0;
if (data.hasActiveRef == 'Y'){
    data.RES_DEC_REAS_FINAL_COMMENT="kL122;";
    data.RES_DEC_REAS_FINAL_CODE="L134;";
}









var errTask = ['161129W1233438ZMTGJA','161125W1685766TXUHKL','161201W1485928WVFBTH','161201W1943823PAAJOZ','161130W1416147IXVHIC',
    '161129W1317194JJDENN','161129W1199917WFMOBB','161201W1627555WSFBUI','161202W1515632YNFGMV','161201W1035452RZWCJO',
    '161129W1564691AEGKQT','161128W1878489XHDCQB','161130W1658615TCMUUS','161129W1258719YDYFAR','161130W1270777EUQAPA',
    '161130W1941681FZXMDF','161130W1581556BSQCVS','161129W1317203ZCNWWV','161202W1296319YNKGAF','161130W1270774SQRVZI',
    '161130W1484503HCRQQK','161129W1823012GHQDKE','161128W1871573EPIBEK','161130W1658624EEWIXV','161129W1650799LWGVAF',
    '161130W1581563BFMNOZ','161129W1463828KETVZY','161201W1757099DYNEUN','161130W1658589PCKXVI','161128W1142917KGQXVP',
    '161202W1867990TQFYZO','161130W1660157GOTPLT','161130W1658613BLOPGP','161201W1801379QGQHLJ','161130W1660152ZYTVFF',
    '161201W1928496ZCXPDJ','161129W1233445LHJPBO','161130W1941672ZVHVBU','161129W1564677VFZHOV','161122W1477306QOPVRU',
    '161127W1665073CKURLB','161202W1296320MMJXBF','161129W1564702MRZBRG','161129W1258714KRYVTQ','161202W1467061RXJTHQ',
    '161202W1467135MBZJJC','161129W1922806QBBQRC','161202W1467057DIUXBR','161129W1317204QXVXTI','161129W1199920GVEXKF',
    '161202W1129799HCWHBX','161201W1542228ZDJXYM','161201W1744439SBHVEE','161201W1485927QQINVI','161202W1129803HAQROQ',
    '161201W1542229BNORER','161202W1186361GDQYDG','161201W1943815KLPYKL','161202W1853515DWQNEQ','161202W1467076XXSVBA',
    '161202W1467123KVXMFJ','161129W1564697PGNDNY','161201W1356881SSUDZY','161130W1184352BBCIHA','161130W1156661XTDNPV',
    '161202W1515635FYNRLG','161128W1871580VJMHYN','161130W1521657LUUBUT','161202W1074494HUAXDY','161201W1342967RVEYPR',
    '161130W1660155QKKGML','161202W1186366JYWRKE','161130W1660166EIBJXP','161202W1467052UIKFFD','161202W1853517XVTXWG',
    '161130W1763770GEEHNT','161202W1467126UFAAEE','161201W1738815WTJFJX','161201W1485928EPVNEE','161130W1342866ZGXYLG',
    '161202W1482558WQDQMQ','161202W1376229IZIODP','161202W1467115TLBCAY','161202W1467133KGKYIE','161202W1258895SYEGIT',
    '161202W1124415WCVGPR','161203W1744069KLAXYP','161203W1744097FQHSVR','161203W1744104WZYIOF','161203W1670556CWTYRF',
    '161203W1843953SWZXLH','161203W1002736ESEAUB','161203W1426511VWEEWW','161203W1002730OWUBGD','161201W1440368SVTVUX',
    '161202W1467101TYVOEJ','161203W1055144HYYBNA','161203W1055153PRCSSU','161203W1837694QSYIJT','161203W1466043ZMOIJF',
    '161203W1744122EOSEJZ','161203W1744079WIVOMM','161203W1385864ZOHZJC','161203W1232068MSEPDJ','161203W1979928WMQEJK',
    '161203W1843960FLJAHT','161203W1843961HOZYWO','161203W1002729QEMWRE','161203W1209015OXCJPV','161203W1823313KZTJEX',
    '161203W1823323BFMRKB','161203W1245341DJCOQO','161203W1245350ROTMSM','161203W1837696AWHLPU','161203W1466030AFLMKZ',
    '161203W1466043CAUWGH','161203W1219930ALNPYS','161203W1748438VJZNIA','161203W1460325EBPDSQ','161203W1748446TEDHBK',
    '161203W1979930UJKTEG','161203W1792161BRFNAL','161203W1426514PJLBEF','161203W1843955LXCUEQ','161203W1002724ESGTPI',
    '161204W1150861NKOHZF','161204W1915753KAURMG','161204W1915755YSFVRW','161128W1046142YHMGJK','161130W1537286TILNZQ',
    '161128W1878488EDFMNW','161130W1763759PUVEHS','161130W1537292OURRVG','161201W1744430YCWHQW','161201W1768586COCATO',
    '161129W1233441RQPWWT','161201W1132740CZRIDI','161130W1184349QCDTEV','161201W1334906TSWGBI','161129W1823005IDQZOT',
    '161202W1515633NKSXRY','161130W1660163OSGZAY','161130W1110376DLVMFY','161128W1261368CQRYQB','161130W1331798RZJMJM',
    '161127W1097040KLZEFO','161126W1870413MPFYLF','161129W1634908RKPKJW','161128W1293633FGHETK','161201W1342958SIPSKM',
    '161128W1418746LBQNJR','161201W1943824AWFATQ','161202W1853521FNWIKO','161201W1132353IBVJZC','161130W1581540ABDFMR',
    '161130W1540125TKOZHB','161129W1922798WHHPCQ','161130W1944264NITMIX','161201W1090798NUNIFL','161201W1928498MJXAEK',
    '161124W1918868UBMKBR','161202W1124414ZPHNKA','161202W1790656EXHVKV','161130W1941667GIUYRF','161202W1934170DFJVGD',
    '161202W1129790VXUWJO','161129W1634911PGTCRP','161129W1861152GDXCZA','161129W1861149QDGIHL','161201W1485933IFUUFN',
    '161201W1323049XHTZZN','161201W1542224HMQGSH','161127W1665064TEAHEY','161130W1838332DLGFCD','161201W1768592HBDTTI',
    '161201W1542225LLKNPN','161130W1767046IAVOVI','161201W1757106GIJMPV','161130W1342868PXYAEC','161124W1918874HXPROK',
    '161128W1714862MIWNXP','161201W1334924NKQZFD','161202W1467094HBWGGB','161130W1058414IICHEV','161202W1467059HFTOGH',
    '161202W1853519KDRFMZ','161201W1741226TETUJH','161202W1867988EMIQZZ','161202W1467102LXLCMK','161130W1331797EKQQSS',
    '161202W1467104KXATSS','161201W1356868WGZWYG','161202W1467104XVKTPY','161130W1156656IIWAQO','161202W1467119EVQSVB',
    '161202W1160085JFJBTN','161130W1368198ISBCLD','161129W1564700KYSPFB','161202W1482544RXKXXE','161128W1087467TKUAPF',
    '161202W1467089THIRKG','161130W1540115YGNLXD','161202W1467084BFYZZY','161202W1467095TQFRYS','161202W1160093NEXXZA',
    '161202W1160089GOONGV','161201W1744442VTGWOQ','161202W1467114AAABYM','161129W1652187RUGPFT','161202W1515631SPTRRS',
    '161202W1129805IIQMXC','161202W1482544XVMZNA','161201W1542226ONNVXG','161130W1156667NGCPZC','161130W1368197XHEBAQ',
    '161201W1573595JDYSCX','161202W1160088OBLLYJ','161202W1934166ADLOZV','161202W1124413UIOHYD','161203W1744085IXLWVK',
    '161203W1221412TMBLWF','161203W1055149SEZOPT','161203W1466037MMMCPX','161203W1744083VADUIN','161203W1744090YZBEGI',
    '161203W1744064QUZPOP','161203W1744102YERADL','161203W1744094WUPTHB','161203W1744088WULCUV','161203W1744107AKKVLY',
    '161203W1221409XZYPYN','161203W1221402XKWVPU','161203W1245348HRAATG','161203W1670541LNUJZQ','161203W1792148OMAHYV',
    '161203W1591615OMGGOR','161203W1002725LRCHWI','161203W1002733OUDTAY','161203W1662785XEKASA','161203W1662790NTOBVF',
    '161203W1662778SRUZXL','161203W1837697GCVZAQ','161203W1219927AIMDEV','161203W1082409JAUTUW','161203W1082401CBXJNO',
    '161203W1748447AMQDLO','161203W1744077BNAXXB','161203W1744049YVYJBY','161203W1744087JWQKDY','161203W1015612OLYFFK',
    '161203W1843948JUDWSL','161203W1670552MNIVYP','161204W1150863LERZDH','161204W1765979KCCTLI','161204W1765980KIHEEJ',
    '161204W1765981ZYWMFF','161117W1338679CQBSBS','161130W1878917NYBOEU','161130W1416150DOFOMW','161129W1823011MKZFVN',
    '161130W1767048DBGCNB','161128W1878483ZVKIUZ','161125W1685773FRUKTB','161129W1351562FUMTLG','161130W1763760BFIYHW',
    '161201W1768593WQIUCM','161129W1233443LDQYFO','161130W1416137DBTACJ','161129W1933799MYXEWN','161130W1609459YRSOVC',
    '161202W1129792RCVVLF','161130W1660163UPPGEJ','161130W1658607HNWGVQ','161202W1853525FALGKU','161130W1944271WXZMXU',
    '161201W1125524JQSDRR','161129W1020584QOUMZQ','161201W1035464IPMZFW','161202W1129794YXVFOV','161130W1941684MDGMNG',
    '161130W1156665DCLMTE','161201W1060487SHAPCL','161202W1482551HYXNMM','161201W1485929XNHPVZ','161130W1763773TASFJD',
    '161201W1741223ZFPNBX','161201W1741219IZWSVS','161201W1342969AZOOKM','161202W1934636RCCCTZ','161202W1467078JAPGJH',
    '161130W1540124ZHUEXV','161201W1440375QRDRTE','161125W1413252QYGJWW','161201W1156950NUSLYK','161201W1125533SROASQ',
    '161201W1738821TJXOYU','161202W1934172ORUIKX','161130W1878927SGSSYE','161127W1487719ERRWRU','161201W1125523JWUDHK',
    '161202W1867992JNOSPH','161130W1703167UBWOAG','161201W1928494BJPCMU','161130W1944273PZAYTU','161130W1540120YZGIBR',
    '161201W1928495LPHEWB','161129W1286186RYWYCE','161130W1416144FRYAYK','161202W1467085NTCGPP','161201W1125534NFWRKF',
    '161202W1867996LFVWLU','161201W1573587FZPIZX','161202W1867994OLSLKI','161202W1951232LTRCMJ','161201W1035460ZBFZCR',
    '161201W1542227GPEIPE','161202W1467106IDQGWT','161130W1184350IDLYBH','161130W1342869PBKDSM','161202W1376237IXQSLG',
    '161130W1660160WQKBLZ','161202W1129789LBDFYC','161202W1951242BVELBL','161201W1738826WQARKP','161130W1658621UCOSND',
    '161201W1573594XCIKDB','161129W1061964LEJMTE','161201W1741229KHNXET','161201W1156949WMOYAC','161130W1660164FGZXYR',
    '161202W1467129CZTTSW','161202W1482538YXCBHV','161201W1943827NLKPWF','161130W1581560CPAATC','161130W1763772KWIRGK',
    '161201W1741233KJNDKW','161202W1467128NOUFDC','161202W1467125AHUDXV','161202W1934158RRLZZL','161130W1473345EJDMWD',
    '161202W1934161THNQFP','161202W1129799BSUWWU','161202W1186362JMVZIO','161130W1331800AFUJHW','161202W1467142JHEISL',
    '161202W1467103POTUYS','161202W1482560XAPJHX','161202W1186358JWABOH','161202W1489712CMHCRQ','161202W1467068CGLOHH',
    '161202W1467067KHREUC','161202W1482548IACALV','161202W1186363AUUSNH','161203W1002735CITGHD','161130W1941684TXQJVI',
    '161203W1245353VZHJHD','161203W1837688DJJDGP','161203W1460324XWJHPO','161203W1460324XRDRCJ','161203W1744038UONUCI',
    '161203W1744099TAQIXK','161203W1744120SVDVWK','161203W1744092KLCVGG','161203W1744121GIIWPL','161203W1744101EEEICP',
    '161203W1744054BQDNZZ','161203W1221410LLDMLZ','161203W1792154XAMTUL','161203W1670555BSANFM','161203W1209006HVEYTB',
    '161203W1209012NYLPMG','161203W1662789YRHVUV','161203W1662788YDSEIG','161203W1055150JLBZOX','161203W1055146JZWUZC',
    '161203W1837699SBJKWH','161203W1466038TQVDHW','161203W1219929IJAVGE','161203W1430423IFYMBF','161203W1460322DLDVAP',
    '161203W1744105VIDMOL','161203W1744100JCHNNA','161203W1744095QBFLKL','161203W1744075NKBBEN','161203W1744076TOCQDF',
    '161203W1744072FFDRRT','161203W1232061JEVMSV','161203W1221409RQRYPW','161203W1002727RYQNOR','161203W1002721ORLQZA',
    '161203W1002714OKRMJR','161204W1150862GUIRIN','161204W1915754GXIULL','161204W1765983TCPNQH','161130W1484501DLNHXM',
    '161130W1110382VAUJWY','161130W1270782EXOYEO','161130W1763764YKBNRD','161130W1763768GHZRGX','161130W1763765DIHARW',
    '161130W1878923UROCQM','161124W1309818YXBUVZ','161130W1941674QMTUUC','161129W1020582LUSIOF','161130W1658614HCTEEC',
    '161130W1906719EXHBGH','161201W1768588PYNTBJ','161130W1581570QLWXLX','161201W1125527VYRLDI','161127W1375028YPIABP',
    '161130W1331792PNLUJF','161130W1416149ACVFMP','161201W1334904UFPJDA','161202W1515634HKWSYQ','161129W1068618RNTCZN',
    '161201W1060480MYNGEU','161129W1586443FSINGT','161129W1068619KQLIJM','161129W1889299TXFVJA','161202W1129804KRQWQV',
    '161201W1105483VOFKXS','161128W1705531UOSHWG','161129W1258722BIBKBQ','161202W1467112COQSBA','161202W1898409JSIGMJ',
    '161202W1515621FBDYRZ','161201W1744438HICBBR','161201W1738824PLMBGY','161130W1878924TUFJGH','161130W1581558CIERIB',
    '161129W1564710YVSVVO','161202W1467075PQFIOL','161202W1467132TCWATI','161129W1823014VXABRO','161201W1356882UTEXWV',
    '161202W1934155IBFHYM','161202W1129805NFAJBF','161201W1090804CCXHDU','161129W1933784ABGBMI','161201W1768579NHCEWE',
    '161129W1258717SLTWPZ','161201W1342968JCCBWL','161202W1124407ZTVWIN','161201W1928500TQZHPI','161201W1485938SCWJMN',
    '161130W1763758XRWNKB','161201W1573590EXCTLP','161202W1467069RIDHRU','161202W1467056IAPCKC','161202W1467093YVPHVU',
    '161202W1160078TGBYME','161202W1467064LACAOD','161130W1540121VPVARA','161202W1640942NAIKLO','161201W1334926GIJYGN',
    '161130W1484508LYTIGL','161202W1467111POFZSY','161201W1485936AEWJEC','161202W1853508DXIIQZ','161202W1467050RRYCHA',
    '161202W1934168RTWRME','161202W1934164WMJATR','161202W1934159IUUZTE','161202W1074484YVMDQQ','161201W1943822GNMVUP',
    '161202W1467055PMJWLE','161129W1233440TLSMJD','161202W1296321GFPBQV','161201W1573596BRORFF','161201W1090805XCVOYH',
    '161202W1515628ANNQMW','161202W1867993QHBHXS','161130W1463043UCEIVK','161201W1323046DGTGME','161202W1790663HXDKCJ',
    '161202W1467141LWLEZL','161202W1186352BMQKTW','161201W1132355PLIFAF','161202W1467083IGFAZA','161202W1186364YYJMYE',
    '161130W1941682VUVEIV','161201W1156948CBZODI','161203W1744067RRSTNJ','161203W1221408ZXHHZW','161203W1670554AAGJLF',
    '161203W1002726IWNGDI','161202W1186356HTHROX','161202W1186360JLOYQP','161203W1748453LWFWWU','161203W1744103MFJQRB',
    '161203W1744057UMOECU','161203W1232067JQOKZG','161203W1843961ROTIDK','161203W1670557SQYFCD','161203W1591613TDGEIA',
    '161203W1426512MQMJPY','161203W1221411WWGTPW','161203W1430418WRJRGL','161203W1823318FCGUFR','161203W1823322CLAIMH',
    '161203W1823324AAJPIC','161203W1662791KUIBVI','161203W1055154QHDUKA','161203W1219932WICMJT','161203W1744104PCITBZ',
    '161203W1744050BWANUI','161203W1744070KOZTSE','161203W1744082EHAHSO','161203W1744053FNCWPO','161203W1385861XZCUDK',
    '161203W1015607LLCMXJ','161203W1979933MKGNNI','161203W1002734IGIYDF','161204W1150860QIYVHM','161204W1765984NXQKPU',
    '161130W1767045ZVWGFQ','161127W1665074KCPYGG','161129W1933785VXKZQP','161128W1924436TFFTMV','161130W1024282MRVVFO',
    '161129W1866001SCTAZV','161201W1741221BEKNPG','161130W1838340HJUIQP','161130W1110369SQSYGI','161127W1788231LDXSJM',
    '161129W1933796SYKBGG','161130W1660159NTPUCF','161201W1334907FVAKYI','161129W1933790MAGALM','161201W1741218IKCLZD',
    '161201W1323049DLTMCE','161202W1467080JZQHOQ','161129W1489847EHPAKJ','161130W1484499VLZDBN','161201W1334921HKZDBE',
    '161130W1581545FMGCWE','161201W1768589DBHABX','161130W1537297UALCFJ','161129W1258716JUIZMW','161129W1489846SJSTSU',
    '161130W1609452SUTQBC','161202W1129783LKSDHL','161129W1612625VBBRVH','161201W1738819EUNPXO','161201W1768589RYUVUC',
    '161202W1467071GEMEQL','161202W1467087MTJDSB','161130W1660153IUPXIC','161201W1311464QBEACS','161130W1540126UFXFTQ',
    '161202W1853523XWXWFY','161201W1943827UKJTVV','161201W1768594PNUALK','161129W1933794OSWRHM','161201W1531344POWQHE',
    '161201W1156941CJVIQV','161202W1160087CQBKTH','161201W1156947PWXCDH','161129W1068621JGZKSG','161201W1090796KPROHY',
    '161201W1233035OGNRMT','161129W1233428KJPUEL','161202W1467096WDTZWI','161130W1660159EPPCZD','161201W1132351AOSAHM',
    '161201W1531340EYPNUO','161202W1074489UUODJM','161201W1531345ALGHGJ','161202W1074481CRXMJR','161202W1467089HKQAVS',
    '161130W1024272WKFXUC','161202W1515629TOFBXH','161202W1482559NOQLGS','161201W1768585PMNOIN','161202W1482561QVRTDH',
    '161201W1741228KJHYEM','161130W1637921VBUKQA','161202W1467144YWKOHE','161201W1323051TOAWNV','161201W1156949CBZSHS',
    '161202W1853522RZTBEO','161202W1467060QPUXAR','161202W1934152SBJLJH','161130W1270775EYXDVO','161202W1729348NTNVME',
    '161202W1296318ATRHXY','161201W1132356IEKVEL','161129W1068615CZXEDZ','161202W1376232TENYTO','161202W1376230KSNRZI',
    '161201W1738813TWRYQQ','161130W1941678SWCFDN','161202W1074490ASDDMH','161202W1296322PZLOCS','161202W1129796WVFBQJ',
    '161202W1467139SPJMJV','161202W1467037GRWNDT','161201W1741229FQUNCB','161202W1853521XECOSZ','161130W1906710VZJCEQ',
    '161202W1482554UZMBLP','161201W1105481QAIFGZ','161201W1485930FXZCYD','161201W1768595EWJMGL','161202W1853514CUKQKT',
    '161203W1670560ADXOOE','161203W1744098ZHOBDF','161203W1670549WTYAGI','161203W1002736ASDADE','161203W1245342AFZFPZ',
    '161203W1713306WJVBYY','161203W1748452KBSYKX','161203W1748451FMZSJK','161203W1460315NVVVOH','161203W1744108IMNSHM',
    '161203W1744084HKKAWM','161203W1744080CNXLFJ','161203W1385854GYOGBP','161203W1979925KIBGZF','161203W1843942RWYLQN',
    '161203W1591614UVSURQ','161203W1002720BFICJJ','161203W1055145GKSRJC','161203W1245345HTSBLV','161203W1245351JJYSLZ',
    '161203W1055147DELWVC','161203W1245349JNIHAG','161203W1466040HNLANK','161203W1837699GEVLTM','161203W1744045ZMXCYD',
    '161203W1460327BVBMNE','161203W1748450JNHSJG','161203W1744118FIEZNE','161203W1744113VGFCST','161203W1744109ZKFHTW',
    '161203W1744059IUTIUM','161203W1744114TNLCBI','161203W1979932MJHYSS','161203W1979927NKLDJN','161203W1843958ESWLPE',
    '161204W1150854QLXMHW','161204W1150859QENDRV','161204W1915755XTXTYK','161204W1765978KGSULL','161201W1125535BEBNMY',
    '161130W1184343XBZDUO','161130W1058389JCMRIB','161130W1581564YXYHGN','161130W1581542VOCFVR','161201W1485921HJCERI',
    '161127W1665070SVOAFH','161130W1660158SDCLCU','161201W1233040UHGNST','161201W1768591ANWGCX','161129W1922808JHQNWO',
    '161130W1941680LCFRIL','161201W1342965QVUEDC','161201W1132748UDZKNR','161129W1823013GAAOGO','161129W1564689LRGQDJ',
    '161129W1444105LWFLZQ','161201W1323048TIXEJN','161201W1342966OUCROK','161201W1485923YRVYGP','161201W1928488TQQSKM',
    '161127W1204557DEXJFU','161201W1741224ZQGQMA','161130W1484506AFGXWQ','161201W1744440CYSEJX','161202W1853518ULLBLP',
    '161130W1658623OWTQRM','161202W1927342XOCWVN','161201W1531338WEBONR','161129W1564708HNNUAT','161201W1342970XSSNAB',
    '161201W1132354JWHVRF','161202W1467088ZKOURG','161129W1463829WQOIIF','161202W1934160IXTJUT','161202W1853515PFRVHP',
    '161202W1934156RVGNUF','161130W1416153EMQENO','161201W1542232GSZYMS','161201W1943825COVVTV','161202W1867995LQWFRX',
    '161201W1342971NKWDQR','161201W1744437VSEMNX','161130W1270780BLPECF','161202W1467118UJGMYD','161202W1074493TSTPAI',
    '161201W1132746NRVMWE','161130W1703166YLRPWE','161201W1132745RPUSOM','161129W1258715TJZMUM','161202W1482545GSVVOJ',
    '161130W1763767EFYZNC','161130W1763761JOUSSS','161202W1729325KQKYFH','161130W1156667RMMKAW','161129W1444104OQQWST',
    '161129W1652183HVHZEJ','161130W1537294ULNXHE','161129W1258724UFIJTZ','161202W1467105KNKQUW','161130W1658613IJKCOO',
    '161201W1035459XIBNFG','161129W1317201LBWWMH','161202W1129795CZBUNE','161202W1467110PJBYVV','161202W1160086TBSYCP',
    '161202W1074483RWYZVC','161202W1951240HBHVUE','161202W1467072JANXYW','161202W1186350WPEJME','161130W1763757PSSUQV',
    '161202W1467100HIYSVS','161201W1356878OWTEKQ','161202W1467113QXMTAW','161130W1878928WRXUDD','161202W1129798ARWSWK',
    '161202W1482547YVRRGH','161128W1871579BNYYBI','161202W1467079CYUSRN','161202W1296314YSEXBL','161202W1467092YBCYEY',
    '161201W1105482PFIBLA','161201W1573589HPTIKA','161201W1573588HHJSVB','161202W1640941HANOEG','161202W1467076MIOSKU',
    '161203W1744073KUGSLN','161203W1843949BYUXKS','161203W1843958KSCFGW','161203W1823321YRTVBW','161203W1209013FYXKEN',
    '161203W1744047ZAQCWF','161203W1744092LRMRGR','161203W1744052PAHLFD','161203W1744060XYLKCB','161203W1744093LYEUQY',
    '161203W1744091TRHFTB','161203W1744110KRGZKC','161203W1744086KPKXNE','161203W1744048NSGKHO','161203W1385863TUWVUN',
    '161202W1129797FNZDLA','161203W1843951NNASSN','161203W1670547AKENOJ','161203W1002728KNCAUG','161203W1670553DHRTNE',
    '161203W1662787WHHCNW','161203W1055152BIENCO','161203W1055136UBAEIL','161203W1837694DAGKHJ','161203W1466041WCEKXD',
    '161203W1466037UXPRTU','161203W1219928NGSNCZ','161203W1460326VDNAYH','161203W1744114XTPJLG','161203W1460321UDTVNB',
    '161203W1748449DUWXPY','161203W1744085FWKCXZ','161203W1744123CVHXAZ','161203W1744062QHAVJR','161203W1744111UQOFEA',
    '161203W1744071TOVFCK','161203W1744074WYRXHD','161203W1744096PBAZYV','161203W1744068SXLAPW','161203W1744115HHEPPQ',
    '161203W1744089XUPQDS','161203W1461496TEFVKL','161203W1843947BMIJLD','161203W1670559TEUEIA','161203W1002719LDGCFN',
    '161203W1426505UWTSMB','161203W1792157NLQJHB','161203W1002722GRFPKS','161203W1209014OOGIXV','161204W1915748JTJBGP',
    '161204W1765982AQXASU','161204W1528626GLLMAG','161130W1156664GCSHQG','161130W1484502FULHTA','161130W1906716AUODTV',
    '161130W1581522VDCPQL','161130W1110375ETGSJE','161201W1035461DTZKIH','161130W1658627AOMSKL','161201W1233041GRICPB',
    '161130W1184353WTIMEY','161129W1199915SYEGWE','161130W1537295XUKEZR','161201W1928493FILXUE','161130W1342867KQAMEN',
    '161128W1019759ZQGGHO','161130W1581567ZRSRME','161127W1528543GTFPZC','161130W1416143UQHDUH','161129W1020583TQDQUU',
    '161130W1658617JYCGJK','161201W1233042PTYBFT','161130W1484493BIXORX','161130W1540127KTZAMD','161201W1485925IAONWS',
    '161201W1440376GABGLE','161129W1564693MNMWYT','161130W1463049RZSXCI','161130W1156663RXOQSR','161130W1581535CIZPWK',
    '161201W1132358WMIKPE','161125W1144895HJJRZU','161128W1924441JWWLYK','161202W1074486JYUAAX','161201W1485935ASDDWG',
    '161202W1640936TGPORN','161202W1951239NTLTTY','161201W1542222LUEENN','161201W1738817IXHDJR','161202W1790664VDQCKX',
    '161129W1020585ARMPTJ','161201W1156951SAAHIJ','161129W1199916QVAKZX','161202W1934164JYTEAO','161202W1951238WVIAMF',
    '161130W1838341VQIRXH','161202W1467066AIVPUB','161201W1090801ZCLDAG','161129W1286188CTVRYR','161202W1186351JHXLAO',
    '161202W1467062RZDPEX','161202W1467136GARERP','161130W1637898SEIZZR','161117W1054224WXXIVD','161202W1129800SEFUYN',
    '161202W1467121UONUCK','161130W1581572TVPSGC','161129W1258723JHUDSW','161130W1941676OTOLTG','161201W1531341MPWZII',
    '161202W1467065BRRMFI','161201W1542223DJRZQG','161201W1342964JWFXAY','161202W1467131BQJYFX','161201W1342965XDLVYB',
    '161202W1489721QKLBMK','161201W1105480VJXAZI','161201W1132358ASOLTN','161202W1867989DJQOMX','161202W1934154PVEKKO',
    '161128W1013494MPPXFH','161130W1660145KUFYIX','161201W1744436KXVSKD','161202W1186355VBEILE','161202W1467081KCGRCJ',
    '161201W1757105PLTIPD','161129W1865996FPIEGM','161130W1763771CAMPOT','161130W1537297ZYVRXL','161202W1186357MFOJRB',
    '161202W1376233ZSQEAC','161130W1416150TYIADH','161202W1934157RUORHH','161129W1933788OJJKQF','161202W1482559MSHMRF',
    '161202W1853520CUNNOX','161202W1482550BHCRFA','161202W1482546GLIALC','161202W1186353NXGAKG','161129W1463828CHXCSZ',
    '161129W1286162KLFBAI','161202W1074488PVAPYK','161130W1944271QVVKIR','161130W1416146XWNGFC','161203W1591618LUPTDA',
    '161202W1951244MSDIIL','161203W1245347OCNCML','161203W1245336UVRLUG','161203W1466042UMBOKE','161203W1744063WVIMQB',
    '161203W1744110OBFXXL','161203W1744077VOHOIG','161203W1744065XDHMES','161203W1744058CLSNWV','161203W1385862PFLJLB',
    '161203W1979926WUYIPM','161203W1843955MZVCKB','161203W1245352XGBMMY','161203W1245343AEKIES','161203W1837698SGOPFN',
    '161203W1748445BZYAKY','161203W1744056UTIJUQ','161203W1744055OSRWXG','161203W1843950YLADAC','161203W1843952WNOOPT',
    '161203W1591608QSEJAK','161203W1670550CLDJDB','161204W1150864ATQPXD','161204W1765984GQRXOJ','161129W1286183QFJWXJ',
    '161130W1763762KFTJKP','161129W1199908NFRPJX','161128W1418755NSONYC','161130W1537296APELOT','161130W1368189MYDRQP',
    '161130W1484507HGKMVO','161130W1581548VLHHNQ','161130W1537291AMUFAV','161201W1334919YJKDSH','161201W1125537GJKBKK',
    '161128W1396024ECXKID','161128W1418756JEJJIG','161130W1763756TYBBZG','161129W1258721VVSQGA','161130W1484509DLUHKU',
    '161130W1058413KVYNBL','161202W1934171XCSEIW','161130W1944270QDAMPO','161201W1542217GSOBMV','161201W1132747BRNFEM',
    '161126W1863472IKFOPT','161202W1951243KPZTRV','161202W1160092YRNHCC','161129W1652174KCHWSH','161201W1928501TNMLHN',
    '161125W1553215NKVYXI','161130W1416151LQSQER','161202W1467077SYFYAY','161201W1531339FOLOGL','161130W1537293MSEULF',
    '161201W1485937CLAJAZ','161130W1658608IZGANW','161202W1467107HFXJYN','161129W1861150XQRAPA','161201W1334925ZKRLDT',
    '161130W1609461AFOWLN','161202W1313379YFLTIJ','161129W1866002XKHZIU','161201W1573581TDXUMM','161202W1853516KHNKNJ',
    '161202W1951241BEPFSZ','161202W1482553VHDVTB','161202W1867988NBBWMK','161130W1660154CQZESO','161201W1334931FHZQEC',
    '161202W1467049VMNYEQ','161202W1467122MSBHBG','161130W1658619QXOVDI','161202W1489719FTCACI','161130W1110380ANJGFU',
    '161202W1467053NZMQRD','161130W1540122ZVXDEF','161202W1467090FWOIEU','161202W1934167KWMGRU','161202W1934160QMNCOT',
    '161130W1484509DWRBSW','161129W1061963GAFNIS','161202W1376234XEJJVD','161201W1342970AKKCML','161202W1467083RKEHJN',
    '161201W1573596KBXDUC','161202W1853524QNDROL','161202W1867991GDFICX','161202W1296315BYODEW','161202W1129806ZIPBAR',
    '161202W1482549TBXTOO','161202W1376238BDIGCG','161201W1933652EMGNLV','161202W1186357RRMZNY','161202W1074491QEVAYR',
    '161201W1933645ZAHUTG','161201W1356883QKHCQU','161202W1467058WGAQXD','161202W1467109IEEKTU','161202W1467116LDHUSN',
    '161201W1741212VWYCMA','161201W1356880ECTSYC','161201W1485925JMUAUN','161202W1376236JIPJVI','161202W1296319XNAXIC',
    '161202W1867996HQWKEP','161202W1482556UXWURE','161201W1485931XQDTJH','161201W1132359LQEPBW','161202W1467082MEEBJA',
    '161202W1934163QWGTOY','161202W1934162VLSXHV','161202W1074492MNTXAD','161202W1186365GWFICN','161201W1323047HJNIWX',
    '161202W1467070PUSRYX','161201W1573591UONMGU','161202W1129802ETSJMH','161203W1221407PAVJLT','161203W1591618WACIQW',
    '161203W1245344GBMZOT','161203W1837695LZSIAW','161201W1757107GUYZJV','161202W1467098IWKEJJ','161203W1748448TPQWBJ',
    '161203W1744081GIZNKB','161203W1744123GUDNFN','161203W1744116FOIPYY','161203W1744106MZALWL','161203W1744097YUOBDD',
    '161203W1744066RZCLGC','161203W1232069PHCANG','161203W1979925SLZWYK','161203W1843956ZXSLYL','161203W1670551KXWOYE',
    '161203W1792156ZIRWFV','161203W1792156YBVJEI','161203W1002731NOVGJG','161203W1002723WHDSUT','161203W1002728YQEAHN',
    '161203W1002732GSGLMV','161203W1591615KOFMCW','161203W1430424ETXIBZ','161203W1823320JKNASV','161203W1245346MCLOSI',
    '161203W1245347PQGHKR','161203W1466039EXZADX','161203W1219920PSQKCV','161203W1460327GCBRII','161203W1460320YIACDD',
    '161203W1460328VCDVMO','161203W1460323FXMHEM','161203W1744078HEVBWT','161203W1979931EVMMPJ','161203W1843957QMJDMJ',
    '161203W1670546QRRPLR','161203W1209016QVHQTB','161204W1765973ZWZMSK'];

data.isDead = 'N';

if (errTask.indexOf(data.refRestr)!=-1){
    data.isDead = 'Y';
}














