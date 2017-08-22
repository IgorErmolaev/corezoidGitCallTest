
var actionWave = new Array('RESTCLDECISION','RESTFINDBR','RESTOPENACCP48','PRODUCTBEFORE','RESTCARDREAD','RESTCASHCARD','RESTMONITORACC','RESTCONTRP48','RESTSYBRIGE','RESTSYBRIGERES');

data.activeWaveRef = 'N';

if (data.history != undefined){
    for(var i=0; i<data.history.length; i++){
        if (actionWave.indexOf(data.history[i].action) != -1 && data.history[i].state == 'AN'){
            data.activeWaveRef = 'Y';
            break;
        }
    }
}
else {
    data.stateApp = 'error';
}