var typeZP = new Array('W','W_F','W_T','W_R');

data.LOCAL_DEBCARD_Z_SRED = new Array();
data.LOCAL_DEBCARD_P_SRED = new Array();
data.LOCAL_STUD_SRED_MAS = new Array();
data.LOCAL_PERSONAL_SRED_MAS = new Array();

function Datediff(days_diff ){
    var dateOpen = new Date(days_diff); // дата на входе
    var today = new Date();
    var diff = Math.abs(today - dateOpen);
    var one_day = 1000 * 60 * 60 * 24;
    var days = Math.round(diff / one_day);
    return days;
}


data.LOCAL_SALARY_AMOUNT = 0;
data.LOCAL_PENS_AMOUNT = 0;
data.LOCAL_STUD_AMOUNT = 0;
data.LOCAL_SALARY_LESS30 = 'N';
data.LOCAL_PENS_LESS30 = 'N';
data.LOCAL_STUD_LESS30 = 'N';

data.RES_DEBCARD_ZP = 'N';
data.RES_DEBCARD_PENS = 'N';
data.LOCAL_STUD_ACTIVE = 'N';
data.LOCAL_PERSONAL_ACTIVE = 'N';

data.RES_DEBCARD_Z_SRED = 0;
data.RES_DEBCARD_P_SRED = 0;
data.LOCAL_PERSONAL_SRED = 0;
data.LOCAL_STUD_SRED = 0;


var localIncome01, localIncome02, localIncome03, ddaySt;
if (data.DATA_DEBCARD != undefined) {
    for (var i=0; i<data.DATA_DEBCARD.length; i++){
        localIncome01 = 0;
        localIncome02 = 0;
        localIncome03 = 0;
        data.LOCAL_DEBCARD_Z_SRED.push(0);
        data.LOCAL_DEBCARD_P_SRED.push(0);
        data.LOCAL_STUD_SRED_MAS.push(0);
        data.LOCAL_PERSONAL_SRED_MAS.push(0);

        /*Сумма целового дохода / Ср. оборот по картам ;*/
        if (data.DATA_DEBCARD[i].PAN != undefined && data.DATA_DEBCARD[i].PAN.length>0){
            if (data.DATA_DEBCARD[i].BANK == 'PB'){
                localIncome01 = data.DATA_DEBCARD[i].Z01;
                localIncome02 = data.DATA_DEBCARD[i].Z02;
                localIncome03 = data.DATA_DEBCARD[i].Z03;
            }
            if (data.DATA_DEBCARD[i].BANK == 'AB'){
                localIncome01 = data.DATA_DEBCARD[i].C01;
                localIncome02 = data.DATA_DEBCARD[i].C02;
                localIncome03 = data.DATA_DEBCARD[i].C03;
            }
            ddaySt = Datediff(data.DATA_DEBCARD[i].DATE_START);

            if (data.DATA_DEBCARD[i].ACTIVE == 'Y' && typeZP.indexOf(data.DATA_DEBCARD[i].TYPE_CARD)!= -1){
                data.LOCAL_SALARY_AMOUNT += localIncome01;

                if (ddaySt <30 ){
                    data.LOCAL_SALARY_LESS30 = 'Y';
                }
                if (ddaySt>=90){
                    data.LOCAL_DEBCARD_Z_SRED[i] = (localIncome01 + localIncome02 + localIncome03)/3;
                }
                else {
                    data.LOCAL_DEBCARD_Z_SRED[i] = Math.max(localIncome01,localIncome02)
                }
                if (data.RES_DEBCARD_ZP_PAN == undefined) {
                    data.RES_DEBCARD_ZP_PAN = data.DATA_DEBCARD[i].PAN + ';';
                } else {
                    data.RES_DEBCARD_ZP_PAN = data.RES_DEBCARD_ZP_PAN + data.DATA_DEBCARD[i].PAN + ';';
                }
                data.RES_DEBCARD_ZP = 'Y';
            }

            if (data.DATA_DEBCARD[i].ACTIVE == 'Y' && data.DATA_DEBCARD[i].TYPE_CARD == 'L'){
                data.LOCAL_PENS_AMOUNT += localIncome01;
                if (ddaySt <30 ){
                    data.LOCAL_PENS_LESS30 = 'Y';
                }
                if (ddaySt >= 120){
                    data.LOCAL_DEBCARD_P_SRED[i] =(localIncome01 + localIncome02 + localIncome03)/3;
                }
                else {
                    if (ddaySt >= 90){
                        data.LOCAL_DEBCARD_P_SRED[i] =(localIncome01 + localIncome02 + localIncome03/3)/3;
                    }
                    else {
                        if (ddaySt >= 60){
                            data.LOCAL_DEBCARD_P_SRED[i] =(localIncome01 + localIncome02/3)/2;
                        }
                        else {
                            if (ddaySt >= 30) {
                                data.LOCAL_DEBCARD_P_SRED[i] = localIncome01 / 3;
                            }
                        }
                    }
                }
                if (data.RES_DEBCARD_PENS_PAN == undefined) {
                    data.RES_DEBCARD_PENS_PAN = data.DATA_DEBCARD[i].PAN + ';';
                } else {
                    data.RES_DEBCARD_PENS_PAN = data.RES_DEBCARD_PENS_PAN + data.DATA_DEBCARD[i].PAN + ';';
                }
                data.RES_DEBCARD_PENS = 'Y';
            }

            if (data.DATA_DEBCARD[i].ACTIVE == 'Y' && data.DATA_DEBCARD[i].TYPE_CARD == 'S'){
                data.LOCAL_STUD_AMOUNT += localIncome01;
                if (ddaySt <30 ){
                    data.LOCAL_STUD_LESS30 = 'Y';
                }
                data.LOCAL_STUD_SRED_MAS[i] = Math.min(localIncome01, (localIncome01 + localIncome02)/2, (localIncome01 +localIncome02 +localIncome03)/3);
                data.LOCAL_STUD_ACTIVE = 'Y';
            }

            if (data.DATA_DEBCARD[i].ACTIVE == 'Y' && data.DATA_DEBCARD[i].TYPE_CARD == 'P'){
                data.LOCAL_PERSONAL_SRED_MAS[i] = Math.min(localIncome01, (localIncome01 + localIncome02)/2, (localIncome01 +localIncome02 +localIncome03)/3);
                data.LOCAL_PERSONAL_ACTIVE = 'Y';
            }

            if (data.DATA_DEBCARD[i].BANK == 'AB'){
                data.LOCAL_DEBCARD_Z_SRED[i] = Math.min(5000, data.LOCAL_DEBCARD_Z_SRED[i]);
                data.LOCAL_DEBCARD_P_SRED[i] = Math.min(5000, data.LOCAL_DEBCARD_P_SRED[i]);
                data.LOCAL_STUD_SRED_MAS[i] = Math.min(5000, data.LOCAL_STUD_SRED_MAS[i]);
                data.LOCAL_PERSONAL_SRED_MAS[i] = Math.min(5000, data.LOCAL_PERSONAL_SRED_MAS[i]);
            }

        }
        data.RES_DEBCARD_Z_SRED += data.LOCAL_DEBCARD_Z_SRED[i];
        data.RES_DEBCARD_P_SRED += data.LOCAL_DEBCARD_P_SRED[i];
        data.LOCAL_PERSONAL_SRED += data.LOCAL_PERSONAL_SRED_MAS[i];
        data.LOCAL_STUD_SRED +=data.LOCAL_STUD_SRED_MAS[i] ;
    }
}

/*Сумма среднемесячной ЗП, Пенсии и общего баланса по депозитам*/
data.LOCAL_SUM_ZP_PENS_DEPOS = data.RES_DEBCARD_Z_SRED + data.RES_DEBCARD_P_SRED + data.RES_DEPOSIT_TOTAL;