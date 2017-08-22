data.LIM_P2B = Math.max(data.LIM_p2bpl,data.LIM_p2bul,0);
data.LIM_P2B = Math.round(data.LIM_P2B/1000) * 1000;
data.LIM_p2bpl = Math.round(data.LIM_p2bpl/1000) * 1000;
data.LIM_p2bul = Math.round(data.LIM_p2bul/1000) * 1000;

if (data.LIM_P2B > 50000) {
    if (data.BlackCode == "55" || (data.LimGlp == 0 && data.LimL2f == 0)) {
        data.LIM_P2B = 50000;
    }
    else {
        if (data.LIM_P2B > 500000) {
            data.LIM_P2B = 500000;
            data.LIM_P2B = Math.min(data.LIM_P2B,data.LimitRequsted);
        }
        else {
            data.LIM_P2B = Math.min(data.LIM_P2B,data.LimitRequsted);
        }
    }
}
else {
    if (data.LIM_P2B >= 40000) {
        data.LIM_P2B = 50000;
    }
    else {
        if (data.ob_ex >=20000) {
            data.TypeDec = "KC";
            data.RES_COMMENT_NO_AUTO = "Лимит рассчитан менее MIN. Необходимо провести анализ с учетом указанных клиентом данных" + ';' + data.RES_COMMENT_NO_AUTO;
        }
        else {
            data.LIM_P2B = 0;
            data.FinalCode = 'D004';
            data.Decision = 'Decline';
        }
    }
}

if (data.LIM_P2B < data.LimitRequsted) {
    if (data.LIM_P2B >= data.LimitRequsted*0.8 && (data.LimitRequsted - data.LIM_P2B)<50000) {
        data.LIM_P2B = data.LimitRequsted;
    }
}