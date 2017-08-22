data.dataCredArray = [];
data.nPanOld = 'N';


if (data.wfPurse != undefined){
    if (data.wfPurse.wfPurseContractList != undefined && data.wfPurse.wfPurseContractList.wfPurseContract != undefined){
        for (var i=0; i<data.wfPurse.wfPurseContractList.wfPurseContract.length ; i++){
            if (data.wfPurse.wfPurseContractList.wfPurseContract[i].contractType.trim() == 'CARS' && data.wfPurse.wfPurseContractList.wfPurseContract[i].contractState.trim() == 'a'){
                data.dataCredArray.push(data.wfPurse.wfPurseContractList.wfPurseContract[i].can.trim());
            }
        }
        if (data.wfPurse.authCardList != undefined && data.wfPurse.authCardList.authCard != undefined && data.dataCredArray.length>0){
            for (var i=0;i<data.wfPurse.authCardList.authCard.length; i++){
                if (data.dataCredArray.indexOf(data.wfPurse.authCardList.authCard[i].pan.trim() + '980')!= -1 && data.wfPurse.authCardList.authCard[i].available >0){
                    data.nPanOld = data.wfPurse.authCardList.authCard[i].pan.trim();
                }
            }
            if (data.nPanOld == 'N'){
                data.nPanOld = data.dataCredArray[0].substring(0,data.dataCredArray[0].length-3);
            }
        }
    }
}