"use strict";

var ctx = require.context('.', false, /^(?!\.\/index\.js$).*\.jsx?$/);

module.exports = ctx.keys().reduce(function (ret, key) {
    var k =
    ret[key.replace(/^(\.\/)?(.+?)\.jsx?$/, '$2')] = ctx(key);
    return ret;
}, {});
