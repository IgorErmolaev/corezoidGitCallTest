if (data.DATA_EMPL_PROB_LDAP_MANAGER == null ) {data.DATA_EMPL_PROB_LDAP_MANAGER = 2;}
if (data.DATA_EMPL_PROB_LDAP_EXECUTIVE == null ) {data.DATA_EMPL_PROB_LDAP_EXECUTIVE = 2;}

if (data.DATA_EMPL_PROB_LDAP_EXECUTIVE == 1 ){
    if (data.DATA_EMPL_PROB_LDAP_MANAGER == 1 ) {
        data.RES_LIMIT_TYPE_MATRIX = 2;
    }
    else {
        data.RES_LIMIT_TYPE_MATRIX = 1;
    }
}
else {
    data.RES_LIMIT_TYPE_MATRIX = 1;
}

if (data.PROD_CHAR_BANK == 'PB'){
    if (data.THE_RIP == 'Y'){
        if (data.PROD_RIP_TYPE == 1 || data.PROD_RIP_TYPE == 4 ){
            data.MATRIX_NAME = 'MATRIX_CONF_RIP_SYS_PB';
        }
        else {
            data.MATRIX_NAME = 'MATRIX_CONF_RIP_NOSYS_PB';
        }
    }
    else {
        data.MATRIX_NAME = 'MATRIX_CONF_PB';
    }
}

if (data.PROD_CHAR_BANK == 'AB' || data.THE_RIP == 'Y'){
  /*  if (data.THE_RIP == 'Y'){
        if (data.PROD_RIP_TYPE == 1 || data.PROD_RIP_TYPE == 4 ){
            data.MATRIX_NAME = 'MATRIX_CONF_RIP_SYS_AB';
        }
        else {
            data.MATRIX_NAME = 'MATRIX_CONF_RIP_NOSYS_AB';
        }
    }
    else {*/
        data.MATRIX_NAME = 'MATRIX_CONF_AB';
    /*}*/
}

data.nodeName = 'EmployeeProbTypeMatrix';