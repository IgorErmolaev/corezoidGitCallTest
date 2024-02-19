module.exports = (data) => {
    data.hello = "Hello World!";
    if (data.param == "test") {
        const test = require("./test.js");
        data = test.testFunc(data);
    } else if (data.param == "test2") {
        const test = require("./test2.js");
        data = test.test2(data);
    }
    return data;
};