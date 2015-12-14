"use strict";

var ident = /^([a-z_]|-[a-z_-])[a-z\d_-]*$/;

export default function (options = {message: 'Invalid ClassName'}) {

    return function css$validator(value) {
        value = value || '';
        var parts = value.split(/\n/);
        for (var i = 0, l = parts.length; i < l; i++) {
            var part = parts[i];
            if (part == '' || part == null) continue;
            if (!ident.test(part)) {
                return {
                    message: options.message,
                    type: 'ERROR'
                }
            }
        }
    }

}