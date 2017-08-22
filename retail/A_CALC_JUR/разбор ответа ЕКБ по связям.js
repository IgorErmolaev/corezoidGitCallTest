
const LINK_CODES={"0100100MMM":"SON","0100100MFM":"SON","0100100MFF":"DAU","0100100MMF":"DAU","0100100SFM":"MOT","0100100SFF":"MOT","0100100SMM":"FAT","0100100SMF":"FAT","0100200SMM":"GUM","0100200SMF":"GUM","0100200SFM":"GUM","0100200SFF":"GUM","0100200MMM":"WAR","0100200MFM":"WAR","0100200MMF":"WAS","0100200MFF":"WAS","0100300MMM":"EPS","0100300MFM":"EPS","0100300MMF":"PDA","0100300MFF":"PDA","0100300SMM":"STF","0100300SMF":"STF","0100300SFF":"STM","0100300SFM":"STM","0100400MMF":"WIF","0100400SMF":"HUS","0100400SFM":"WIF","0100400MFM":"HUS","0100500MMM":"BRO","0100500MFM":"BRO","0100500SMM":"BRO","0100500SMF":"BRO","0100500MMF":"SIS","0100500MFF":"SIS","0100500SFM":"SIS","0100500SFF":"SIS","0100600MMM":"DSO","0100600MFM":"DSO","0100600MMF":"DDA","0100600MFF":"DDA","0100600SMM":"GRF","0100600SMF":"GRF","0100600SFM":"GRM","0100600SFF":"GRM","0100700MMM":"EPH","0100700MFM":"EPH","0100700MMF":"ECE","0100700MFF":"ECE","0100700SMM":"UNC","0100700SMF":"UNC","0100700SFM":"AUN","0100700SFF":"AUN","0100800MMM":"LNL","0100800MFM":"LNL","0100800SMM":"FAI","0100800SFM":"MOI","0100900MMM":"GHT","0100900MFF":"GHT","0100900SMF":"HEF","0100900SFF":"HEM","0101000MAA":"CLR","0101000SAA":"CLR","0101100MAA":"FAR","0101100SAA":"FAR","0300200MMF":"COM","0300200MFM":"COF","0300200SMF":"COM","0300200SFM":"COF","0300300MMF":"EXH","0300300MFM":"EXW","0300300SMF":"EXH","0300300SFM":"EXW","0300400MAA":"NEI","0300400SAA":"NEI","0300500MAA":"COL","0300500SAA":"COL","0300600MMM":"FAM","0300600MFM":"FAM","0300600MMF":"FAF","0300600MFF":"FAF","0300600SMM":"FAM","0300600SMF":"FAM","0300600SFM":"FAF","0300600SFF":"FAF","0400000MAA":"FAC","0400000SAA":"OWN","0200200SAB":"LBC","0200200SAC":"LD","0200200SAD":"LGD","0200200SAN":"LCD","0200200SAG":"LED","0200300SAD":"EA","0200300SBD":"EA","0200300SAC":"ECA","0200300SBC":"ECA","0200400SAB":"LF","0200100SAD":"PRS","0200100SBD":"PRE","0200100SCD":"PRP","0200100SAB":"PRF","0200900SAB":"FIN","0201200SAB":"DOV","0201200SAC":"PRO","0200600SAC":"PHS","0200500SAC":"JEM","0200500SBC":"JPE","0160002SAB":"SOD","0160002SAC":"SPE","0200100MAD":"PRI","0200200MAB":"DCH","0200200MAC":"DIR","0200200MAD":"GDI","0200200MAN":"COD","0200200MAG":"EXD","0200300MAC":"MAA","0200300MAD":"ACC","0200400MAB":"FOU"};
function is_array (a) {
    return (typeof a == "object") && (a instanceof Array);
}

data.APP_LINK = new Array();

if (data.doc.r.o.NLINK_LST != undefined && data.doc.r.o.NLINK_LST.Link !=undefined) {
    var nlink;
    if (is_array(data.doc.r.o.NLINK_LST.Link)) {
        nlink = data.doc.r.o.NLINK_LST.Link;
    } else {
        nlink = new Array(data.doc.r.o.NLINK_LST.Link);
    }

    for (var i=0; i<nlink.length; i++) {
        var currlink = nlink[i];
        var link = new Object();
        if (data.APP_CUST_ID_JUR == Number(currlink["@MainClientId"])) {
            link.DIRECT = "M";
            link.CUST_ID = Number(currlink["@SubClientId"]);
        } else {
            link.DIRECT = "S";
            link.CUST_ID = Number(currlink["@MainClientId"]);
        }

        var linktype = LINK_CODES[currlink["@LinkType"]+link.DIRECT+currlink["@NameKeyLeader"]+currlink["@NameKeyLinked"]];
        if ( linktype != undefined  && ['DCH','DIR','GDI','COD','EXD','FOU','LF'].indexOf(linktype) != -1  ) {
            link.TYPE=LINK_CODES[currlink["@LinkType"]+link.DIRECT+currlink["@NameKeyLeader"]+currlink["@NameKeyLinked"]];
            data.APP_LINK.push(link);
        }
    }

    var ClExtInfo;
    if (is_array(data.doc.r.o.NLINK_LST.ClExtInfo)) {
        ClExtInfo = data.doc.r.o.NLINK_LST.ClExtInfo;
    } else {
        ClExtInfo = new Array(data.doc.r.o.NLINK_LST.ClExtInfo);
    }

    for (var i=0; i<ClExtInfo.length; i++) {
        var currclex = ClExtInfo[i];
        for (var j=0; j<data.APP_LINK.length; j++) {
            if (data.APP_LINK[j].CUST_ID == Number(currclex["@ClientId"])) {
                data.APP_LINK[j].CUST_NAME = currclex["@FNameRu"];
                data.APP_LINK[j].CUST_SURNAME = currclex["@LNameRu"];
                data.APP_LINK[j].CUST_PATRONYMIC = currclex["@MNameRu"];
                data.APP_LINK[j].CUST_INN = currclex["@OKPO"];
                data.APP_LINK[j].CUST_STATE = currclex["@Sex"];
            }
        }
    }
}

delete  data["doc"];