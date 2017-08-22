/* if (data.Answer != undefined){
    if (data.Answer.ResultData.State['@code'] == 'rs:inwrk'){
        data.req_id = data.Answer['@req_id'];
    }
     else {
        data.req_id = 'error';
    }
 }
 else {
     data.req_id = 'error';
 }*/


// resString = 'Not valid http result json(<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Answer resultCode=\"ok\" req_type=\"PutRestruct\" req_id=\"Z167TPB8000021\" ext_sys=\"SPDR\" ext_id=\"160826W1156114GAJQVL3\">\n <ResultData>\n <State code=\"rs:inwrk\"/>\n </ResultData>\n</Answer>)';

if (data.resString != undefined && data.resString != ''){
    if (data.resString.indexOf('rs:inwrk')!= -1){
        if(data.resString.indexOf('req_id=')!= -1){
            data.req_id = data.resString.substr(data.resString.indexOf('req_id=')+8,14);
        }
        else {
            data.req_id = 'error';
        }
    }
    else {
        data.req_id = 'error';
    }
}
else {
    data.req_id = 'error';
}
