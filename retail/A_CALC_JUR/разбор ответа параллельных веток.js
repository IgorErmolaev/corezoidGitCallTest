if (data.ki_resp != undefined) {

    data.BCH_CRED  = data.ki_resp.BCH_CRED ;

    delete data.ki_resp;
}

if (data.dat_resp != undefined) {

    data.DATA_OB  = data.dat_resp.DATA_OB ;
    data.RES_DEPOSIT  = data.dat_resp.RES_DEPOSIT ;
    data.RES_DEBCARD  = data.dat_resp.RES_DEBCARD ;

    delete data.dat_resp;
}


if (data.lim_resp != undefined) {

    data.RES_PREDICT  = data.lim_resp.RES_PREDICT ;

    delete data.lim_resp;
}

if (data.adr_resp != undefined) {

    data.APP_ACT_ADDRESS   = data.adr_resp.APP_ACT_ADDRESS  ;
    data.APP_REG_ADDRESS   = data.adr_resp.APP_REG_ADDRESS  ;

    delete data.adr_resp;
}

