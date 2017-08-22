data.LIM_p2bpl = data.LimitFis * 0.05 * 0.71 * data.term;

if (data.LIM_p2bpl>100000) {
    data.LIM_p2bpl = 100000;
}
else {
    data.LIM_p2bpl = data.LIM_p2bpl.toFixed(2);
}