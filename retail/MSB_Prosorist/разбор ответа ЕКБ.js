function is_array (a) {
    return (typeof a == "object") && (a instanceof Array);
}

data.APP_CUST_ID =0;

if (data["doc"]["r"]["INF_NEW"] != undefined) {
    if (Array.isArray(data["doc"]["r"]["INF_NEW"]) == true) {
        data.APP_CUST_ID= data["doc"]["r"]["INF_NEW"][0]["@Id"];
    }
    else
    {
        data.APP_CUST_ID= data["doc"]["r"]["INF_NEW"]["@Id"];
    }
}

data.APP_CUST_ID = parseInt(data.APP_CUST_ID);




delete  data["doc"];