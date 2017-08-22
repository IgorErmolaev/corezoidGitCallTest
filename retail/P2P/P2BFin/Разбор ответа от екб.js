if (data["doc"]["r"]["INF_NEW"] != undefined) {
    data.INN = data["doc"]["r"]["INF_NEW"]["@OKPO"]
    if (data["doc"]["r"]["INF_NEW"]["CONT_INF"] != undefined){
        if (Array.isArray(data["doc"]["r"]["INF_NEW"]["CONT_INF"]) == true)
        {
            for (var i=0; i<data["doc"]["r"]["INF_NEW"]["CONT_INF"].length; i++) {
                if (data["doc"]["r"]["INF_NEW"]["CONT_INF"][i]["@GroupMain"] == 'Y') {
                    data.phone = data["doc"]["r"]["INF_NEW"]["CONT_INF"][i]["@Number"]
                }
            }
        }
        else
        {
            if (data["doc"]["r"]["INF_NEW"]["CONT_INF"]["@GroupMain"] == 'Y') {
                data.phone = data["doc"]["r"]["INF_NEW"]["CONT_INF"]["@Number"]
            }
        }
    }
}