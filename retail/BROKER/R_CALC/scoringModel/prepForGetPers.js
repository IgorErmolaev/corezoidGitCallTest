//------------------Vostok --------------
if (data.LOCAL_DONBASS == 'Y'){
      data.vost = 'VOSTOK';
  }
  else {
      data.vost = 'NOVOSTOK';
  }

  //----------------Risk_Prod-------------
  if (data.LOCAL_TYPE_PURPOSE == 'MOB' || data.LOCAL_TYPE_PURPOSE == 'DORS' || data.LOCAL_TYPE_PURPOSE == 'NOUTE' || data.LOCAL_TYPE_PURPOSE == 'WINDOW' || data.LOCAL_TYPE_PURPOSE == 'SMARTPHN') {
      data.riskProd = 'RiskProd';
  }
  else {
      data.riskProd = 'NoRiskProd';
  }

//----------------CORP_AB-------------

var corpAB = new Array("255","259","260","261","265","266");

if (corpAB.indexOf(data.PROD_CHAR_CORPORATION) != -1) {
    data.CORP_AB = 'Corp';
}
else {
    data.CORP_AB = 'NoCorp';
}

//------------- CORP_Coef---------------

var corp = new Array('229','230','237','232','200','233','255','259','260','261','265','266');

if (corp.indexOf(data.PROD_CHAR_CORPORATION) != -1) {
    data.CORP_Coef = 'Corp';
}
else {
    data.CORP_Coef = 'NoCorp';
}