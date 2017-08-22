function KcComm(grName) {
    switch (grName) {
        case ('SCORE'):
            return 'Поведенческий скоринг';
        case ('LOW INDEX'):
            return 'Низкий показатель оборот/лимит/скоринг';
        case ('GP'):
            return 'Блокировка по использованию гарантированых платежей';
        case ('LOSS'):
            return 'Клиент убыточный по модели прибыльности';
        case ('DEFAULT'):
            return 'Риск дефолта по поручителю';
        case ('REGION'):
            return 'Политически нестабильная зона';
        default :
            return '';
    }
}

if (data.status && data.status == 'ok' && data.response.mainInfo) {
    if (data["response"]["mainInfo"][0].res != undefined && data["response"]["mainInfo"][0].res == "empty")
    {


    }
    else {
        if (data["response"] != undefined) {
            if (data["response"]["mainInfo"].length > 0) {
                data.LimGlp = data["response"]["mainInfo"][0].lim_glp;
                data.LimL2f = data["response"]["mainInfo"][0].lim_l2f;
                data.Ob = data["response"]["mainInfo"][0].oborot;

                data.LimGul = data["response"]["mainInfo"][0].lim_gul;
                data.actType = data["response"]["mainInfo"][0].k110;
                data.Qual = data["response"]["mainInfo"][0].ballitog;
                data.vetka = data["response"]["mainInfo"][0].comment_;
                data.deb = data["response"]["mainInfo"][0].large_debitor;
                data.dReg = data["response"]["mainInfo"][0].date_registr;
                data.credH = data["response"]["mainInfo"][0].comment_stop;
                data.turnover3m = data["response"]["mainInfo"][0].oborot;

                data.profit_group = data["response"]["mainInfo"][0].profit_group;
                data.debtsyb = data["response"]["mainInfo"][0].debtsyb;
                data.date_registr = data["response"]["mainInfo"][0].date_registr;
                data.k050 = data["response"]["mainInfo"][0].k050;
                data.ob_ekv = data["response"]["mainInfo"][0].sum_ob_EKV;
                data.fl_url = 'Y';
                data.lim_q9pb_glp = data["response"]["mainInfo"][0].lim_q9pb_glp;
                data.lim_q9pb_l2f = data["response"]["mainInfo"][0].lim_q9pb_l2f;
                data.lim_q9pb_gul = data["response"]["mainInfo"][0].lim_q9pb_gul;
                data.lim_q9pb_lof = data["response"]["mainInfo"][0].lim_q9pb_lof;
                data.lim_q9pb_lok = data["response"]["mainInfo"][0].lim_q9pb_lok;
                data.lim_q9pb_b2b = data["response"]["mainInfo"][0].lim_q9pb_b2b;
                data.actType =data.actType.replace( /'/g, '’' );
            }
        }
    }



    if (data["response"]["stopFactors"][0].res != undefined && data["response"]["stopFactors"][0].res == "empty")
    {
        data.BlackCode = "0";
    }
    else
    {
        data.BlcodeComExcept = '';
        if (data["response"]["stopFactors"] != undefined && data["response"]["stopFactors"].length > 0) {
            var code = [];
            var comm_except = ['SCORE','LOW INDEX','GP','LOSS','DEFAULT','REGION'];
            for (var i=0; i<data["response"]["stopFactors"].length; i++) {
                var comm = data["response"]["stopFactors"][i].Comment_;
                var Blcode = data["response"]["stopFactors"][i].BlackCode;
                if(comm_except.indexOf(comm) == -1 || (comm_except.indexOf(comm) != -1 && Blcode == '55'))
                {
                    code.push(Blcode);
                }
                if (comm_except.indexOf(comm) != -1 && Blcode == '66'){
                    data.fl_Blcode = 'Y';
                    data.BlcodeComExcept = KcComm(comm) + ';' + data.BlcodeComExcept;
                }
            }
            if (code.indexOf("66") != -1) {
                data.BlackCode = "66";
            }
            else {
                if (data.fl_Blcode == 'Y') {
                    data.BlackCode = "66-";
                }
                else {
                    data.BlackCode = "55";
                }
            }
        }
    }

    if (data["response"]["relatedPersons"][0].res != undefined && data["response"]["relatedPersons"][0].res == "empty"){
        data.relatedPersons.push({id:'-1'});
    }
    else{
        if (data["response"]["relatedPersons"] != undefined && data["response"]["relatedPersons"].length > 0) {
            for (var i = 0; i < data["response"]["relatedPersons"].length; i++) {
                var id= data["response"]["relatedPersons"][i].clid;
                var type= data["response"]["relatedPersons"][i].reftype;
                var okpo = data["response"]["relatedPersons"][i].refperson;

                var relPers={id:id,type:type,okpo:okpo};
                if (id != 0 && (type=="D" || type=="U")){
                    data.relatedPersons.push(relPers);
                }
            }
        }
    }
}
else
{
    data.limitJur_not_work='Y';
}

if (!data.relatedPersons[0]){
    data.relatedPersons.push({id:'-1'});
}