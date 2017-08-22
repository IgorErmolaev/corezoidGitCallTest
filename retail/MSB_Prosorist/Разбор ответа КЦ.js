
data.limitKC = 0;
if (data.limit_final_kc != undefined){
    data.limitKC = parseFloat(data.limit_final_kc);
}

var props = Object.getOwnPropertyNames(data);
var resp = new Object();
for (var i=0;i<props.length; i++) {
    resp[props[i]] = data[props[i]];
}
data.output=resp ;