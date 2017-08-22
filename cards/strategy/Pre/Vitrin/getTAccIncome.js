
if (data["tAccIncome"] != null) {
    data['DATA_OB_ALL'] = data["tAccIncome"]['obAll'];
    data['DATA_OB_BALL_ITOG'] = data["tAccIncome"]['ballItog'];
    data['DATA_OB_CNTCONTR']= data["tAccIncome"]['cntContr'];
    delete data["tAccIncome"];
}
