/**
 * Created by user on 07.04.2017.
 */
data.req = {};
data.req.ekbIdSender = data.APP_CUST_ID;
data.req.paymentAccountA = data.PROD_APP_GIVENPAN;
data.req.currentLimit = data.RES_CRED_LIM;
data.req.requestLimit = data.PROD_CHAR_LIMITREQUESTED;

switch (data.pointType) {
    case 'IVR':
        a = 'ivr';
        break;
    case 'P24WEB':
        a = 'p24';
        break;
    case 'USER':
        a = 'limitpb';
        break;
    case 'WAVE':
    case 'P24WAVE':
        a = 'rabstol';
        break;
    case 'SENDER':
        a = 'SENDER';
        break;
    default :
        a = 'null';
}

data.req.channel = 'creditLitmit_'+a;
