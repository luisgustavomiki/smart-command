"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameter_1 = require("./parameter");
class ParameterList {
    constructor(fields) {
        this._parameters = [];
        var keys = Object.keys(fields);
        var anyNonRequired = false;
        keys.forEach(k => {
            var p = new parameter_1.Parameter(k, fields[k]);
            if (p.required && anyNonRequired) {
                throw new Error('Required parameters must precede nonrequired and never the opposite.');
            }
            if (!p.required) {
                anyNonRequired = true;
            }
            this._parameters.push(p);
        });
    }
    get parameters() {
        return this._parameters;
    }
}
exports.ParameterList = ParameterList;
