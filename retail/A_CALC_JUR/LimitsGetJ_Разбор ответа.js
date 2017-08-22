data.req = {};
data.BlackComment = [];
data.BlackCode = [];


if (data.status == 'ok') {
    if (data["response"]["mainInfo"][0].res != undefined && data["response"]["mainInfo"][0].res == "empty")
    {
        data.LimGlp = 0;
        data.LimL2f = 0;
        data.Ob = 0;
        data.debtsyb = 0;
        data.fl_url = 'N';
        data.k050 = '-';
        data.ob_ekv = 0;
    }
    else {
        if (data["response"] != undefined) {
            if (data["response"]["mainInfo"].length > 0) {
                data.LimGlp = data["response"]["mainInfo"][0].lim_glp;
                data.LimL2f = data["response"]["mainInfo"][0].lim_l2f;
                data.Ob = data["response"]["mainInfo"][0].oborot;
                data.profit_group = data["response"]["mainInfo"][0].profit_group;
                data.debtsyb = data["response"]["mainInfo"][0].debtsyb;
                data.date_registr = data["response"]["mainInfo"][0].date_registr;
                data.k050 = data["response"]["mainInfo"][0].k050;
                data.ob_ekv = data["response"]["mainInfo"][0].sum_ob_EKV;
                data.fl_url = 'Y';
            }
        }
    }

    if (data["response"]["stopFactors"][0].res != undefined && data["response"]["stopFactors"][0].res == "empty")
    {
        data.BlackComment = [];
        data.BlackCode = [];
    }
    else
    {
        if (data["response"]["stopFactors"] != undefined && data["response"]["stopFactors"].length > 0) {
            var comm_except = ['BLOCKED ACC','CASH CL','CASH RP','FRAUD CL','NEWBE','RESERV DEBT','SBJD CL','RESERV DEBT RP','INSIDER', 'L2F/LGP 30+','OBNUL',
                'OBNUL SZ','REGION','REST','NEG HIST 30+ CL','NEG HIST 30+ RP','NEG HIST 90+ CL','NEG HIST 90+ RP','BLACK CL','BLACK RP'];
            for (var i=0; i<data["response"]["stopFactors"].length; i++) {
                var comm = data["response"]["stopFactors"][i].Comment_;
                var Blcode = data["response"]["stopFactors"][i].BlackCode;
                if(comm_except.indexOf(comm) != -1)
                {
                    data.BlackCode.push(Blcode);
                    data.BlackComment.push(comm);
                }
            }
        }
    }
}
else
{
    data.LimGlp = 0;
    data.LimL2f = 0;
    data.Ob = 0;
    data.debtsyb = 0;
    data.fl_url = 'N';
    data.k050 = '-';
    data.ob_ekv = 0;
}

data.req.BlackComment = data.BlackComment;
data.req.BlackCode = data.BlackCode;