// JavaScript Document

data.status = '';
data.f_nclientD013='';

if (data["0"] != undefined) {
    if (data["0"]["res"] == 'ok') {
        data.status = 'ok';
        data.LimTek = data["0"].lim;
        data.LimNew = data["0"].newlimit;
        data.refcontract = data["0"].refcontract;
        data.f_nclientD013=data["0"].f_nclient;
    }
    else
    {
        data.status = 'error';
    }
}
else
{
    if(data["__conveyor_api_array__"][0].res=='empty')
    {
        data.status = 'empty';
    }
    else
    {
        data.status='error';
    }
}


if (data.status=='ok' && data["detailInfo"]["limitSizeRestrictReasons"] != undefined && data["detailInfo"]["limitSizeRestrictReasons"].length > 0) {
    var wave = [];
    var code = [];
    var good_fin = ['D004','D098','D298','D015'];
    for (var i=0; i<data["detailInfo"]["limitSizeRestrictReasons"].length; i++) {
        var id_type = data["detailInfo"]["limitSizeRestrictReasons"][i].id_type;
        if (id_type!='D013' || (id_type=='D013' && data.f_nclientD013 == 'D013')){
            code.push(data["detailInfo"]["limitSizeRestrictReasons"][i].id_type);
            if (data.char_type == 'KUB_PRE') {
                wave.push(data["detailInfo"]["limitSizeRestrictReasons"][i].KUB);
            }
            else {
                if (good_fin.indexOf(id_type) == -1 ) {
                    wave.push(data["detailInfo"]["limitSizeRestrictReasons"][i].KUB);
                }
            }
        }
    }

    if (wave.indexOf("Y") != -1) {
        switch (true) {
            case (code.indexOf("D001") != -1): data.f_nclient = 'D001'; break;
            case (code.indexOf("D003") != -1): data.f_nclient = 'D003'; break;
            case (code.indexOf("D080") != -1): data.f_nclient = 'D080'; break;
            case (code.indexOf("D040") != -1): data.f_nclient = 'D040'; break;
            case (code.indexOf("D226") != -1): data.f_nclient = 'D226'; break;
            case (code.indexOf("D205") != -1): data.f_nclient = 'D205'; break;
            case (code.indexOf("D266") != -1): data.f_nclient = 'D266'; break;
            case (code.indexOf("D004") != -1): data.f_nclient = 'D004'; break;
            case (code.indexOf("D007") != -1): data.f_nclient = 'D007'; break;
            case (code.indexOf("D009") != -1): data.f_nclient = 'D009'; break;
            case (code.indexOf("D093") != -1): data.f_nclient = 'D093'; break;
            case (code.indexOf("D033") != -1): data.f_nclient = 'D033'; break;
            case (code.indexOf("D035") != -1): data.f_nclient = 'D035'; break;
            case (code.indexOf("D038") != -1): data.f_nclient = 'D038'; break;
            case (code.indexOf("D087") != -1): data.f_nclient = 'D087'; break;
            case (code.indexOf("D089") != -1): data.f_nclient = 'D089'; break;
            case (code.indexOf("D090") != -1): data.f_nclient = 'D090'; break;
            case (code.indexOf("D098") != -1): data.f_nclient = 'D098'; break;
            case (code.indexOf("D204") != -1): data.f_nclient = 'D204'; break;
            case (code.indexOf("D213") != -1): data.f_nclient = 'D213'; break;
            case (code.indexOf("D257") != -1): data.f_nclient = 'D257'; break;
            case (code.indexOf("D258") != -1): data.f_nclient = 'D258'; break;
            case (code.indexOf("D274") != -1): data.f_nclient = 'D274'; break;
            case (code.indexOf("D275") != -1): data.f_nclient = 'D275'; break;
            case (code.indexOf("D280") != -1): data.f_nclient = 'D280'; break;
            case (code.indexOf("D286") != -1): data.f_nclient = 'D286'; break;
            case (code.indexOf("D290") != -1): data.f_nclient = 'D290'; break;
            case (code.indexOf("D297") != -1): data.f_nclient = 'D297'; break;
            case (code.indexOf("D298") != -1): data.f_nclient = 'D298'; break;
            case (code.indexOf("D006") != -1): data.f_nclient = 'D006'; break;
            case (code.indexOf("D008") != -1): data.f_nclient = 'D008'; break;
            case (code.indexOf("D010") != -1): data.f_nclient = 'D010'; break;
            case (code.indexOf("D013") != -1): data.f_nclient = 'D013'; break;
            case (code.indexOf("D015") != -1): data.f_nclient = 'D015'; break;
            case (code.indexOf("D060") != -1): data.f_nclient = 'D060'; break;
            case (code.indexOf("D092") != -1): data.f_nclient = 'D092'; break;
            case (code.indexOf("D202") != -1): data.f_nclient = 'D202'; break;
            case (code.indexOf("D215") != -1): data.f_nclient = 'D215'; break;
            case (code.indexOf("D263") != -1): data.f_nclient = 'D263'; break;
            case (code.indexOf("D264") != -1): data.f_nclient = 'D264'; break;
            case (code.indexOf("D268") != -1): data.f_nclient = 'D268'; break;
            case (code.indexOf("D271") != -1): data.f_nclient = 'D271'; break;
            case (code.indexOf("D272") != -1): data.f_nclient = 'D272'; break;
            case (code.indexOf("D273") != -1): data.f_nclient = 'D273'; break;
            case (code.indexOf("D276") != -1): data.f_nclient = 'D276'; break;
            case (code.indexOf("D217") != -1): data.f_nclient = 'D217'; break;
            case (code.indexOf("D220") != -1): data.f_nclient = 'D220'; break;
            case (code.indexOf("D221") != -1): data.f_nclient = 'D221'; break;
            case (code.indexOf("D224") != -1): data.f_nclient = 'D224'; break;
            case (code.indexOf("D225") != -1): data.f_nclient = 'D225'; break;
            case (code.indexOf("D308") != -1): data.f_nclient = 'D308'; break;
            case (code.indexOf("D259") != -1): data.f_nclient = 'D259'; break;
            case (code.indexOf("D277") != -1): data.f_nclient = 'D277'; break;
            case (code.indexOf("D279") != -1): data.f_nclient = 'D279'; break;
            case (code.indexOf("D281") != -1): data.f_nclient = 'D281'; break;
            case (code.indexOf("D296") != -1): data.f_nclient = 'D296'; break;
            case (code.indexOf("D299") != -1): data.f_nclient = 'D299'; break;
            case (code.indexOf("D302") != -1): data.f_nclient = 'D302'; break;
            default:   data.f_nclient = 'D500';
        }
    }
    else {
        data.f_nclient = 'A101';
    }
    if (code.indexOf("D010") != -1) {
        data.f_nclient_comm = 'C012';
    }
    if (code.indexOf("D217") != -1) {
        data.f_nclient_comm = 'C020';
    }
    if (code.indexOf("D221") != -1) {
        data.f_nclient_comm = 'C013';
    }
    if (code.indexOf("D225") != -1) {
        data.f_nclient_comm = 'C015';
    }
    if (code.indexOf("D268") != -1) {
        data.f_nclient_comm = 'C016';
    }
    if (code.indexOf("D276") != -1) {
        data.f_nclient_comm = 'C017';
    }
    if (code.indexOf("D290") != -1) {
        data.f_nclient_comm = 'C018';
    }
    if (code.indexOf("D301") != -1) {
        data.f_nclient_comm = 'C014';
    }
    if (code.indexOf("D202") != -1) {
        data.f_nclient_comm = 'C021';
    }
    if (code.indexOf("D288") != -1) {
        data.f_nclient_comm = 'C022';
    }
    if (code.indexOf("D263") != -1) {
        data.f_nclient_comm = 'C023';
    }
    if (code.indexOf("D015") != -1) {
        data.f_nclient_comm = 'C024';
    }
    if (code.indexOf("D298") != -1 || code.indexOf("D004") != -1 || code.indexOf("D098") != -1) {
        data.f_nclient_comm = 'C019';
    }
}

if ( data.status=='ok' &&data["detailInfo"]["calcGroupsList"] != undefined && data["detailInfo"]["calcGroupsList"].length > 0) {
    var code = [];
    for (var i=0; i<data["detailInfo"]["calcGroupsList"].length; i++) {
        code.push(Number(data["detailInfo"]["calcGroupsList"][i].newlimit_cutHistAge));
    }
    data.LimitFis = Math.max.apply(null,code);
}