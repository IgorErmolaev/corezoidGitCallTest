// JavaScript Document

var score_bal = 0;

switch(data.APP_MARITAL_MARITALCOND_EXT)
{
    case 'MARRIED':   score_bal +=23.08;  break;
    case 'CIVILMER':  score_bal +=23.08;  break;
    case 'SINGLE':    score_bal +=18.73;  break;
    case 'DIVORCED':  score_bal +=0;      break;
    default:         score_bal +=0;      break;
}

switch(true)
{
    case (data.LOCAL_EXP>=0  && data.LOCAL_EXP<=8):     score_bal +=0;      break;
    case (data.LOCAL_EXP>=9  && data.LOCAL_EXP<=29):    score_bal +=3.04;   break;
    case (data.LOCAL_EXP>=30 && data.LOCAL_EXP<=79):    score_bal +=8.4;    break;
    case (data.LOCAL_EXP>=80 && data.LOCAL_EXP<=179):   score_bal +=18.15;  break;
    case (data.LOCAL_EXP>=180):                         score_bal +=24.5;   break;
    default:                                           score_bal +=0;      break;
}

switch(true)
{
    case (data.LOCAL_SCOR_ACTIVE_CREDITS<=1): score_bal +=27.69;  break;
    case (data.LOCAL_SCOR_ACTIVE_CREDITS==2): score_bal +=34.21;  break;
    case (data.LOCAL_SCOR_ACTIVE_CREDITS==3): score_bal +=0;      break;
    default:                                 score_bal +=0;      break;
}

switch(true)
{
    case (data.BCH_CRED_COUNT_ACT_FOREIGN==0): score_bal +=21.34;  break;
    case (data.BCH_CRED_COUNT_ACT_FOREIGN>=1 && data.BCH_CRED_COUNT_ACT_FOREIGN<=3): score_bal +=12.13;  break;
    case (data.BCH_CRED_COUNT_ACT_FOREIGN>3):   score_bal +=0;      break;
    default:                                  score_bal +=0;      break;
}

if (data.PROD_SCHEME_LOANPURPOSE == 'A+' || data.PROD_SCHEME_LOANPURPOSE == 'A-') {
    score_bal +=13.89;
}
else {
    score_bal +=0;
}

switch (true)
{
    case (data.LOCAL_SCOR_INCOME>=0 && data.LOCAL_SCOR_INCOME<=2999):     score_bal +=0;      break;
    case (data.LOCAL_SCOR_INCOME>=3000 && data.LOCAL_SCOR_INCOME<=6499):  score_bal +=7.23;   break;
    case (data.LOCAL_SCOR_INCOME>=6500 && data.LOCAL_SCOR_INCOME<=8999):  score_bal +=10.11;  break;
    case (data.LOCAL_SCOR_INCOME>=9000):                                  score_bal +=4.77;   break;
    default:                                                          score_bal +=0;      break;
}

switch (true)
{
    case (data.RES_PTI_PRC>=0  && data.RES_PTI_PRC<=11):  score_bal +=0;      break;
    case (data.RES_PTI_PRC>=12 && data.RES_PTI_PRC<=25):  score_bal +=6.44;   break;
    case (data.RES_PTI_PRC>=26):                          score_bal +=14.11;  break;
    default:                                          score_bal +=0;      break;
}

switch(true)
{
    case (data.RES_AGE>=18 && data.RES_AGE<=30):  score_bal +=0;     break;
    case (data.RES_AGE>=31 && data.RES_AGE<=40):  score_bal +=3.32;  break;
    case (data.RES_AGE>=41 && data.RES_AGE<=55):  score_bal +=7.49;  break;
    case (data.RES_AGE>=56):                      score_bal +=21.03; break;
    default:                                  score_bal +=0;     break;
}

switch (true)
{
    case (data.LOCAL_SCOR_COUNT_PROS>=0 && data.LOCAL_SCOR_COUNT_PROS<=2):  score_bal +=21.34;  break;
    case (data.LOCAL_SCOR_COUNT_PROS>=3 && data.LOCAL_SCOR_COUNT_PROS<=5):  score_bal +=7.49;   break;
    case (data.LOCAL_SCOR_COUNT_PROS>=6):                                   score_bal +=0;      break;
    default:                                                            score_bal +=0;      break;
}

switch (true)
{
    case (data.RES_DEPOZIT_TOTAL==0):                                 score_bal +=0;      break;
    case (data.RES_DEPOZIT_TOTAL>=1 && data.RES_DEPOZIT_TOTAL<=100):  score_bal +=17.22;  break;
    case (data.RES_DEPOZIT_TOTAL>=101):                               score_bal +=27.42;  break;
    default:                                                      score_bal +=0;      break;
}

switch (true)
{
    case (data.APP_PROPERTY_CAR_VALUE_EXT>=0 && data.APP_PROPERTY_CAR_VALUE_EXT<60000):       score_bal +=0;     break;
    case (data.APP_PROPERTY_CAR_VALUE_EXT>=60000 && data.APP_PROPERTY_CAR_VALUE_EXT<120000):  score_bal +=4.97;  break;
    case (data.APP_PROPERTY_CAR_VALUE_EXT>=120000):                                           score_bal +=1.15;  break;
    default:                                                                              score_bal +=0;     break;
}


if (data.APP_EMPL_SOCIALSTATUS_EXT == 'FULLWORK' || data.APP_EMPL_SOCIALSTATUS_EXT == 'PARTWORK' || data.APP_EMPL_SOCIALSTATUS_EXT == 'DECREE' || data.APP_EMPL_SOCIALSTATUS_EXT == 'SAILOR')
{
    score_bal +=10.48;
}
else
{
    if (data.APP_EMPL_SOCIALSTATUS_EXT == 'PENSION' || data.APP_EMPL_SOCIALSTATUS_EXT == 'WORKPENS' || data.APP_EMPL_SOCIALSTATUS_EXT =='STUDENT') {
        score_bal +=4.24;
    }
    else {
        score_bal +=0;
    }
}

switch(data.PROD_APP_EMPLOYEE)
{
    case 'Y':   score_bal +=39.75;  break;
    case 'N':   score_bal +=0;      break;
    default:   score_bal +=0;      break;
}

switch(data.LOCAL_SCOR_CLOSE_CRED)
{
    case 'Y':   score_bal +=8.76;   break;
    case 'N':   score_bal +=0;      break;
    default:   score_bal +=0;      break;
}

switch(data.LOCAL_SCOR_BLCL)
{
    case 'Y':   score_bal +=0;   break;
    case 'N':   score_bal +=14.23;      break;
    default:   score_bal +=0;      break;
}


if (data.APP_EMPL_ACTIVITY == 'METALL' || data.APP_EMPL_ACTIVITY == 'COMMUN' || data.APP_EMPL_ACTIVITY =='MECHAN' || data.APP_EMPL_ACTIVITY =='AGRICUL' || data.APP_EMPL_ACTIVITY =='TRADE' || data.APP_EMPL_ACTIVITY == undefined)
{
    score_bal +=0;
}
else {
    if (data.APP_EMPL_ACTIVITY == 'FOOD' || data.APP_EMPL_ACTIVITY == 'EDUCAT' || data.APP_EMPL_ACTIVITY =='TRANSP') {
        score_bal +=17.05;
    }
    else {
        score_bal +=22.69;
    }
}

data.RES_SCCARD_SCORE_1 = score_bal;