data.rtdm_api_url="https://rtdm.it.loc/RTDMApi";

data.RES_BLOCK_CHAR_TYPE = new Array();
data.RES_BLOCK_CODE_COMNT = new Array();
data.RES_BLOCK_DATE = new Array();

var date_b1  = new Date();

var code_bad = new Array('A102','A101');

if (code_bad.indexOf(data.FinalCode) != -1) {
    date_b1.setDate(date_b1.getDate() + 30);
    data.RES_BLOCK_DATE.push(date_b1);
    data.RES_BLOCK_CHAR_TYPE.push('P2B');
    data.RES_BLOCK_CODE_COMNT.push('k001');
}