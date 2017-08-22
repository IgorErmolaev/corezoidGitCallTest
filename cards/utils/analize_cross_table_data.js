var fs = require('fs');
var json = fs.readFileSync(__dirname+'\\..\\resource\\test.json').toString();
var data = JSON.parse(json).data;


function compareStringNums(a, b) {
    return Number(a)-Number(b);
}

var x_limit_low = 0;
var y_limit_low = 0;
var x_limit_high = 0;
var y_limit_high = 0;

var y_list = Object.getOwnPropertyNames(data.matrix);

y_list.sort(compareStringNums);

for (var i=0;i<y_list.length; i++) {
    if (Number(y_list[i]) < data.bal_y && Number(y_list[i])>=y_limit_low) {
        y_limit_low = Number(y_list[i]);
    }
    if (data.bal_y>y_limit_high && y_limit_high<=y_limit_low) {
        y_limit_high = Number(y_list[i]);
    }
}

var x_list = Object.getOwnPropertyNames(data.matrix[y_limit_high]);

x_list.sort(compareStringNums);

for (var i=0;i<x_list.length; i++) {
    if (Number(x_list[i]) < data.bal_x && Number(x_list[i])>=x_limit_low) {
        x_limit_low = Number(x_list[i]);
    }
    if (data.bal_x>x_limit_high && x_limit_high<=x_limit_low) {
        x_limit_high = Number(x_list[i]);
    }
}

data.crossTableData = {};
data.crossTableData.coeff = data.matrix[y_limit_high][x_limit_high];
data.crossTableData.bal_scope = y_limit_low+":"+y_limit_high+";"+x_limit_low+":"+x_limit_high;