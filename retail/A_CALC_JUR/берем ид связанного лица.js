
data.linkID = 0;


if (data.APP_LINK != undefined && data.ind<data.APP_LINK.length){
    data.linkID = data.APP_LINK[data.ind].CUST_ID;
    data.ind++;
}