
if (data.r != undefined && data.r.loans != undefined && data.r.loans[0].loan != undefined){
            data.DATA_RESTRUCT[data.ind-1].OVER_PROC = data.r.loans[0].loan.balPercEx;
            data.DATA_RESTRUCT[data.ind-1].OVER_BODY = data.r.loans[0].loan.balCreditEx;
            data.DATA_RESTRUCT[data.ind-1].OVER_COM = data.r.loans[0].loan.balComissEx;
            data.DATA_RESTRUCT[data.ind-1].NORM_COM = data.r.loans[0].loan.balComiss;
            data.DATA_RESTRUCT[data.ind-1].NORM_BODY = data.r.loans[0].loan.balCredit;
            data.DATA_RESTRUCT[data.ind-1].NORM_PROC = data.r.loans[0].loan.balPerc;
            data.DATA_RESTRUCT[data.ind-1].FINE = data.r.loans[0].loan.balPenja;
            data.DATA_RESTRUCT[data.ind-1].BALCONTR = data.r.loans[0].loan.balContract;
}