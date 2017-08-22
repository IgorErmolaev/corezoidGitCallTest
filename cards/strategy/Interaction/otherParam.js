

var props = Object.getOwnPropertyNames(data);
var resp = new Object();
for (var i=0;i<props.length; i++) {
    resp[props[i]] = data[props[i]];
}
data.output=resp ;