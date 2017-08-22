var CharType= new Array('CRSTMGPB1','CARDSET','REISSUE','UNIPACK','UNIPACKSAS','ONLINEANKETA');

if (CharType.indexOf(data['PROD_CHAR_TYPE']) != -1 && data['LOCAL_CARD_UPGRADE_CCY'] == data['PROD_SCHEME_CCY_LOAN'] && data['DATA_CARD_UPGRADE_REFCONTRAC'] != null && data['DATA_CARD_UPGRADE_LIMIT'] >0 && data['PROD_TRANSUT'] == 'U'){
    data['RES_TYPE_CUST'] = 'NEW_INTERN';
}
data.nodeName = 'TypeClient_getTypeUpgrade';