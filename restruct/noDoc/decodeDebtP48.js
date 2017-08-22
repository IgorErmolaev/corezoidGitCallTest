if (data['a.debtResponse'] != undefined ){
            data.DATA_RESTRUCT[data.ind-1].OVER_PROC = data['a.debtResponse'].balPrcEx;
            data.DATA_RESTRUCT[data.ind-1].OVER_BODY = data['a.debtResponse'].balCreditEx;
            data.DATA_RESTRUCT[data.ind-1].OVER_COM = 0;
            data.DATA_RESTRUCT[data.ind-1].NORM_COM = data['a.debtResponse'].balFee;
            data.DATA_RESTRUCT[data.ind-1].NORM_BODY = data['a.debtResponse'].balCredit;
            data.DATA_RESTRUCT[data.ind-1].NORM_PROC = data['a.debtResponse'].balPrc;
            data.DATA_RESTRUCT[data.ind-1].FINE = 0;
            data.DATA_RESTRUCT[data.ind-1].BALCONTR = data['a.debtResponse'].balanceAll;

}