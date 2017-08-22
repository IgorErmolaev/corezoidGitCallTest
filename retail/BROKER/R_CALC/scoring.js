// JavaScript Document
var score_bal = 319;

switch (data.PROD_CHAR_BANK) {
    case 'PB': score_bal +=0;   break;
    case 'AB': score_bal +=-49;   break;
    default:   score_bal +=0;   break;
}

switch(true)
{
    case (data.RES_AGE>=18 && data.RES_AGE<=22):  score_bal +=-27;    break;
    case (data.RES_AGE>=22 && data.RES_AGE<=25):  score_bal +=-18;    break;
    case (data.RES_AGE>=25 && data.RES_AGE<=30):  score_bal +=-9;     break;
    case (data.RES_AGE>=30 && data.RES_AGE<=40):  score_bal +=0;      break;
    case (data.RES_AGE>=40):                      score_bal +=9;      break;
    default:                                  score_bal +=0;      break;
}

switch (data.APP_CUST_GENDER) {
    case 'M': score_bal +=0;    break;
    case 'F': score_bal +=30;   break;
    default:  score_bal +=0;    break;
}

switch(true)
{
    case (data.RES_DEPOZIT_TOTAL == 0):                             score_bal +=-20;  break;
    case (data.RES_DEPOZIT_TOTAL>0 && data.RES_DEPOZIT_TOTAL<100):  score_bal +=0;    break;
    case (data.RES_DEPOZIT_TOTAL>=100):                             score_bal +=20;   break;
    default:                                                    score_bal +=0;    break;
}

switch(data.APP_MARITAL_MARITALCOND)
{
    case 'MARRIED':   score_bal +=31;   break;
    case 'WIDOW':     score_bal +=16;   break;
    case 'DIVORCED':  score_bal +=0;    break;
    case 'SINGLE':    score_bal +=-16;  break;
    default:         score_bal +=0;    break;
}

switch(true)
{
    case (data.APP_SOCSTATUS_CHILDNUMBER == 1):  score_bal +=0;  break;
    case (data.APP_SOCSTATUS_CHILDNUMBER == 2):  score_bal +=8;    break;
    case (data.APP_SOCSTATUS_CHILDNUMBER == 0 || data.APP_SOCSTATUS_CHILDNUMBER>=3 || data.APP_SOCSTATUS_CHILDNUMBER == -1): score_bal +=-8;   break;
    default:                                 score_bal +=0;    break;
}

if (data.APP_SOCSTATUS_EDUCATION == 'POS' || data.APP_SOCSTATUS_EDUCATION == 'SEC') {
    score_bal +=-45;
}
else {
    if (data.APP_SOCSTATUS_EDUCATION == 'UND') {
        score_bal +=-23;
    }
    else {
        if (data.APP_SOCSTATUS_EDUCATION == 'TEC') {
            score_bal +=0;
        }
        else {
            if (data.APP_SOCSTATUS_EDUCATION == 'HIG' || data.APP_SOCSTATUS_EDUCATION == 'TWO') {
                score_bal +=23;
            }
            else {
                score_bal +=0;
            }
        }
    }
}

switch(data.APP_EMPL_ACTIVITY)
{
    case 'TRADE':     score_bal +=-29;    break;
    case 'AGRICUL':   score_bal +=-29;    break;
    case 'BUILD':     score_bal +=-29;    break;
    case 'TRANSP':    score_bal +=-15;    break;
    case 'FOOD':      score_bal +=-15;    break;
    case 'SERV':      score_bal +=-15;    break;
    case 'METALL':    score_bal +=0;      break;
    case 'MECHAN':    score_bal +=0;      break;
    case 'MINING':    score_bal +=0;      break;
    case 'LOWYER':    score_bal +=0;      break;
    case 'REALEST':   score_bal +=0;      break;
    case 'TOURISM':   score_bal +=0;      break;
    case '':          score_bal +=0;      break;
    case 'ENERGY':    score_bal +=15;     break;
    case 'IT':        score_bal +=15;     break;
    case 'COMMUN':    score_bal +=15;     break;
    case 'MILIT':     score_bal +=15;     break;
    case 'EDUCAT':    score_bal +=29;     break;
    case 'MEDIC':     score_bal +=29;     break;
    case 'PUBLIC':    score_bal +=29;     break;
    case 'BANK':      score_bal +=29;     break;
    default:         score_bal +=0;      break;
}

if (data.APP_EMPL_SOCIALSTATUS == 'PARTWORK' || data.APP_EMPL_SOCIALSTATUS == 'SAILOR')
{
    score_bal +=-56;
}
else
{
    if (data.APP_EMPL_SOCIALSTATUS == 'DECREE' || data.APP_EMPL_SOCIALSTATUS == 'STUDENT' || data.APP_EMPL_SOCIALSTATUS =='UNEMP') {
        score_bal +=-28;
    }
    else {
        if (data.APP_EMPL_SOCIALSTATUS == 'FULLWORK') {
            score_bal +=0;
        }
        else {
            if (data.APP_EMPL_SOCIALSTATUS == 'WORKPENS' || data.APP_EMPL_SOCIALSTATUS == 'PENSION') {
                score_bal +=28;
            }
        }
    }
}

switch(true)
{
    case (data.APP_EMPL_TIMEEMPL>=0 && data.APP_EMPL_TIMEEMPL<36):    score_bal +=-15;    break;
    case (data.APP_EMPL_TIMEEMPL>=36 && data.APP_EMPL_TIMEEMPL<48):   score_bal +=0;    break;
    case (data.APP_EMPL_TIMEEMPL>=48 && data.APP_EMPL_TIMEEMPL<72):   score_bal +=15;     break;
    case (data.APP_EMPL_TIMEEMPL>=72 && data.APP_EMPL_TIMEEMPL<120):  score_bal +=30;      break;
    case (data.APP_EMPL_TIMEEMPL>=120):                               score_bal +=45;      break;
    default: score_bal +=0;      break;
}

if (data.APP_EMPL_ORGTYPE == 'BUSINESS' || data.APP_EMPL_ORGTYPE == 'PRIVATE') {
    score_bal +=-17;
}
else {
    if (data.APP_EMPL_ORGTYPE == 'INTERNAT' || data.APP_EMPL_ORGTYPE == 'STATE') {
        score_bal +=17;
    }
    else {
        score_bal +=0;
    }
}

switch (data.APP_ACT_ADDRESS_REG_EQUAL) {
    case 'Y':  score_bal +=0;    break;
    case 'N':  score_bal +=-33;    break;
    default:   score_bal +=-33;    break;
}

if (data.RES_DEBCARD_Z_SRED + data.RES_DEBCARD_P_SRED >=500) {
    score_bal +=20;
}
else {
    score_bal +=0;
}

data.RES_SCCARD_SCORE_1 = score_bal;