const T = require("./test.js");

module.exports = (data) => {
    data.hello = "Hello World!";
    if (data.param == "test") {
        data = T.testFunc(data);
        // data = test.testFunc(data);
    } else if (data.param == "test2") {
        const test = require("./test2.js");
        data = test.test2(data);
    }
    return data;
};