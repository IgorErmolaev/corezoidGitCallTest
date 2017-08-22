/**
 * Created by user on 29.11.2016.
 */
var cost = 0;

if (data.APP_EMPL_SOCIALSTATUS =="PENSION" || ["SETL_CITY","SETL_COUN","COUNTRY","PGT","SETTLEMENT","SMALL_VILLAGE","VILLAGE"].indexOf(data.APP_ACT_ADDRESS.SUBTOWN) > -1) {
    cost = 949;
}
else {
    if (data.APP_ACT_ADDRESS.ID_REGION == 'UA14155') {
        cost = 1500;
    }
    else {
        cost = 1218;
    }
}

data.RES_EXP_MIN_LIV_COSTS = cost;