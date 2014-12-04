var assert = require("assert").ok,
  jhook = require("./index.js");

var math = function math() {

}

math.prototype.sum = function(x, y) {
    return x + y;
}


jhook(math);

math.hook("sum")

math.pre("sum", function(a, b, callback) {
    console.log("pre", arguments);
    callback(1, 1);
});

math.post("sum", function(a, b, callback) {
    console.log("post", arguments);
});


var m = new math();
console.log("result", m.sum(5, 5));