/*DATA_TOTAL_CLIENT_REG*/
if (data['household'] != null){
    data['DATA_TOTAL_CLIENT_REG'] = data['household']['clnCnt'];
}
delete data['household'];

/*DATA_TOTAL_CLIENT_ACT*/
if (data['household'] != null){
    data['DATA_TOTAL_CLIENT_ACT'] = data['household']['clnCnt'];
}
delete data['household'];

/*eq*/
if (data['household'] != null){
    data['DATA_TOTAL_CLIENT_ACT'] = data['household']['clnCnt'];
    data['DATA_TOTAL_CLIENT_REG'] = data['household']['clnCnt'];
}
delete data['household'];