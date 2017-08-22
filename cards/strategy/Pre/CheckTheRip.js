
data['THE_RIP'] = 'N';
data['LOCAL_CRED_CARD_RIP'] = 'N';

if ((data['PROD_CHAR_BANK'] == 'PB' || data['PROD_CHAR_BANK'] == 'AB') && ((data['DATA_EMPL_BELON_BIS_EXECUTIVE'] == '49000000' || data['DATA_EMPL_BELON_BIS_EXECUTIVE'] == '51000000') || (data['DATA_EMPL_BELON_BIS_EXECUTIVE']!= undefined && data['DATA_EMPL_BELON_BIS_EXECUTIVE'].substr(0,7) == '4700000'))){
    data['THE_RIP'] = 'Y';
}

for (var i=0; i< data['DATA_CRED'].length; i++){
    if (data['LOCAL_CRED_CARD_RIP'] == 'N' && data['DATA_CRED'][i]['TYPE'] == 'CRC3' && data['RES_CRED_ACTIVE'] == 'Y' && data['DATA_CRED'][i]['KOD'] == 'O'){
        data['LOCAL_CRED_CARD_RIP'] = 'Y';
    }
}

data.nodeName = 'CheckTheRip';