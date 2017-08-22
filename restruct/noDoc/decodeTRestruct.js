data.DATA_RESTRUCT = new Array();

if (data.tRestruct != undefined){
    for(var i=0;i<data.tRestruct.length;i++){
        data.DATA_RESTRUCT.push({});
        data.DATA_RESTRUCT[i].REFERENCE = data.tRestruct[i].refcontractplat;
        data.DATA_RESTRUCT[i].PAN = data.tRestruct[i].panplat;
        data.DATA_RESTRUCT[i].RATE = data.tRestruct[i].rate;
        data.DATA_RESTRUCT[i].CURR = data.tRestruct[i].currencyplatiso;
        data.DATA_RESTRUCT[i].PRODTYPE = data.tRestruct[i].gr;
        data.DATA_RESTRUCT[i].FL_GD = data.tRestruct[i].fl_gd;
        data.DATA_RESTRUCT[i].CTYPE = data.tRestruct[i].contracttypeplat;
        data.DATA_RESTRUCT[i].BANK = data.tRestruct[i].bank;
        data.DATA_RESTRUCT[i].SUMREPEX = data.tRestruct[i].sumrepex;
        data.DATA_RESTRUCT[i].COMPLEX = data.tRestruct[i].contractpcplat;
        data.DATA_RESTRUCT[i].RATEFINE = data.tRestruct[i].ratefine;
        data.DATA_RESTRUCT[i].EXAGE = data.tRestruct[i].exage;
        data.DATA_RESTRUCT[i].BRANCH = data.tRestruct[i].branch;
        data.DATA_RESTRUCT[i].FLASSETOFF = data.tRestruct[i].flassetoff;
        data.DATA_RESTRUCT[i].PANPLATFLMN = data.tRestruct[i].panplatflmn;
        data.DATA_RESTRUCT[i].MFO = data.tRestruct[i].mfo;
        data.DATA_RESTRUCT[i].ACC_A = data.tRestruct[i].acc_a;
        data.DATA_RESTRUCT[i].ACC_B = data.tRestruct[i].acc_b;
        data.DATA_RESTRUCT[i].FLSOLD = data.tRestruct[i].flsold;
        data.PROD_CHAR_BRANCH = data.tRestruct[i].branchnew;
    }
}
