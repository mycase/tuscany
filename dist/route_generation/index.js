"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (path, requiredArguments) {
    var paramString = requiredArguments.map(function (arg) { return arg + ": RequiredArg, "; }).join('');
    path = path.replace('(.:format)', '');
    requiredArguments.forEach(function (arg) {
        path = path.replace(":" + arg, "${" + arg + "}");
    });
    return ("import { generateFormatAndQuery, RequiredArg } from 'tarr';\n\nfunction route(" + paramString + "formatOrQuery?: string | object, query?: object) {\n  let { formatString, queryString } = generateFormatAndQuery(formatOrQuery, query);\n  return `" + path + "${formatString}${queryString}`;\n}\n\nexport default route;\n");
});
