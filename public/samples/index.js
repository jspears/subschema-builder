"use strict";

var ctx = require.context('.', false, /^(?!\.\/index\.js$).*\.js?(on|x)?$/);

module.exports = ctx.keys().reduce(function (ret, key) {
    ret[key.replace(/^(\.\/)?(.+?)\.js(on|x)?$/, '$2')] = ctx(key);
    return ret;
}, {});
