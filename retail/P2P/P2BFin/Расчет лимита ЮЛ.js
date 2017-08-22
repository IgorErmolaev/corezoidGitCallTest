data.LIM_p2bul = 0;

if (data.profit_group == "NULL" || data.profit_group == "0") {
    data.LIM_p2bul = (data.Ob * 0.1 - data.debtsyb) * 0.71 * data.term;
}

if (data.profit_group == "-1") {
    data.LIM_p2bul = (data.Ob * 0.15 - data.debtsyb) * 0.71 * data.term;
}

if (data.profit_group == "1") {
    data.LIM_p2bul = (data.Ob * 0.2 - data.debtsyb) * 0.71 * data.term;
}

if (data.LIM_p2bul<50000 && data.LimGlp > 10000 ) {
    data.LIM_p2bul = 50000;
}

if (data.LIM_p2bul<50000 && data.ob_ekv>5000) {
    data.LIM_p2bul = 50000;
}

data.LIM_p2bul = data.LIM_p2bul.toFixed(2);