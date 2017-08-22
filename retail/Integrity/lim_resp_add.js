
var good_code = ['D010','D017','D021','D031','D039','D064','D068','D072','D087','D088', 'D200',
    'D201','D214','D217','D220','D225','D255','D267','D270','D284','D285','D287','D292','D293','D308'];
if (data["__conveyor_api_array__"] != undefined && data["__conveyor_api_array__"].length > 0 && data["__conveyor_api_array__"][0].res == "ok") {

    if (data.DATA_TRELCLIENTS_FACH_LIM24<Number(data["__conveyor_api_array__"][0].cashlim)){
        data.DATA_TRELCLIENTS_FACH_LIM24 = Math.max(Number(data["__conveyor_api_array__"][0].cashlim),data.DATA_TRELCLIENTS_FACH_LIM24);
        data.DATA_TRELCLIENTS_MAXPAY = Number(data["__conveyor_api_array__"][0].maxpay);
    }


    if (data.DATA_TRELCLIENTS_CODE == '' && data["__conveyor_api_array__"][0].N_KVIT != undefined ){
        data.DATA_TRELCLIENTS_CODE = data["__conveyor_api_array__"][0].N_KVIT;
        data.DATA_TRELCLIENTS_NEGAT = data["__conveyor_api_array__"][0].negat;
    }


}

if (good_code.indexOf(data.DATA_TRELCLIENTS_CODE) != -1) {
    data.DATA_TRELCLIENTS_NEGAT = 'N';
}



