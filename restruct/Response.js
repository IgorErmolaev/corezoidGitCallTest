//------------------ base limit --------------------
var flagEq = 'N';
data.newCredArray = new Array();

if (data.getPromise!= undefined && data.getPromise[0].result == undefined && data.getPromise.length >0){
    flagEq = 'Y';

    for (var i=0; i<data.DATA_RESTRUCT.length; i++){
        data.newCredArray.push();
        data.newCredArray[i] = {};
        if (flagEq == 'Y') {
            for (var j = 0; j < data.getPromise.length; j++) {
                if (data.getPromise[j].refcontract.trim() != data.DATA_RESTRUCT[i].REFERENCE ) {
                    if (j == data.getPromise.length - 1 && flagEq == 'Y') {
                        flagEq = 'N';
                    }
                }
                else{
                    data.newCredArray[i].ref = data.getPromise[j].refcontract.trim();
                    data.newCredArray[i].avans = Math.abs(parseFloat(data.getPromise[j].avans));
                    data.newCredArray[i].cred = Math.abs(parseFloat(data.getPromise[j].cred));
                    data.newCredArray[i].difprc = Math.abs(parseFloat(data.getPromise[j].difprc));
                    data.newCredArray[i].difcom = Math.abs(parseFloat(data.getPromise[j].difcom));
                    data.newCredArray[i].diffine = Math.abs(parseFloat(data.getPromise[j].diffine));
                    break;
                }
            }
        }
        if (flagEq == 'N'){
            break;
        }
    }
    if (data.DATA_RESTRUCT.length != data.getPromise.length){
        flagEq = 'N';
    }

}
//-----------------------------------------------

data.flagClientPromise = flagEq;