
data.Loan = [];
if (data.DATA_RESTRUCT != undefined) {
    for (var i = 0; i < data.DATA_RESTRUCT.length; i++) {
        data.Loan[i] = {};
        data.Loan[i]['@ContractPCPlat'] = data.DATA_RESTRUCT[i].COMPLEX;
        data.Loan[i]['@RefContractPlat'] = data.DATA_RESTRUCT[i].REFERENCE;
        data.Loan[i]['@ContractTypePlat'] = data.DATA_RESTRUCT[i].CTYPE;
        data.Loan[i]['@PanPlat'] = data.DATA_RESTRUCT[i].PAN;
        data.Loan[i]['@CurrencyPlatISO'] = data.DATA_RESTRUCT[i].CURR;
        data.Loan[i]['@BalCreditPlat'] = String(data.DATA_RESTRUCT[i].NORM_BODY);
        data.Loan[i]['@BalCreditExPlat'] = String(data.DATA_RESTRUCT[i].OVER_BODY);
        data.Loan[i]['@BalPrcPlat'] = String(data.DATA_RESTRUCT[i].NORM_PROC);
        data.Loan[i]['@BalPrcExPlat'] = String(data.DATA_RESTRUCT[i].OVER_PROC);
        data.Loan[i]['@BalFeePlat'] = String(data.DATA_RESTRUCT[i].NORM_COM);
        data.Loan[i]['@BalFeeExPlat'] = String(data.DATA_RESTRUCT[i].OVER_COM);
        data.Loan[i]['@BalPenyPlat'] = String(data.DATA_RESTRUCT[i].FINE);
        data.Loan[i]['@BalPrcExPlatPR'] = String(data.RES_RS_OVER_PROC_FORGIVE[i]);
        data.Loan[i]['@BalFeeExPlatPR'] = String(data.RES_RS_OVER_COM_FORGIVE[i]);
        data.Loan[i]['@BalPenyPlatPR'] = String(data.RES_RS_FINE_FORGIVE[i]);
        data.Loan[i]['@BalPenyPlatSHTR'] = String(data.RES_RS_SHTR_FORGIVE[i]);
        data.Loan[i]['@Branch'] = data.DATA_RESTRUCT[i].BRANCH;
        data.Loan[i]['@Bank'] = data.DATA_RESTRUCT[i].BANK;
        data.Loan[i]['@gr'] = data.DATA_RESTRUCT[i].PRODTYPE;
        data.Loan[i]['@UpdateDate'] = new Date();
        data.Loan[i]['@FlassetOf'] = data.DATA_RESTRUCT[i].FLASSETOFF;
        if (data.DATA_RESTRUCT[i].COMPLEX == 'SYB') {
            data.Loan[i]['@RefContractId'] = data.DATA_RESTRUCT[i].REFERENCE.substring(data.DATA_RESTRUCT[i].REFERENCE.indexOf('@') + 1);
            data.Loan[i]['@BaseNumber'] = data.DATA_RESTRUCT[i].REFERENCE.substring(0,data.DATA_RESTRUCT[i].REFERENCE.indexOf('@'));
        }
        else {
            data.Loan[i]['@RefContractId'] = '';
        }
        data.Loan[i]['@PanPlatFlmn'] = data.DATA_RESTRUCT[i].PANPLATFLMN;
        data.Loan[i]['@PanPlatMfo'] = data.DATA_RESTRUCT[i].MFO;
        data.Loan[i]['@accA'] = data.DATA_RESTRUCT[i].ACC_A;
        data.Loan[i]['@accB'] = data.DATA_RESTRUCT[i].ACC_B;
        data.Loan[i]['@FlSold'] = data.DATA_RESTRUCT[i].FLSOLD;

    }
}

