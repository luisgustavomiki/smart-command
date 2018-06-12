"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const type_parser_1 = require("./type_parser");
class Parameter {
    constructor(name, configuration) {
        this.name = name;
        this.required = true;
        if (_.isString(configuration)) {
            var pp = type_parser_1.TypeParser.getByName(configuration);
            if (!pp) {
                throw new Error('Type parser not found.');
            }
            this.parser = pp;
        }
        else {
            if (configuration.type) {
                this.parser = configuration.type;
            }
            else {
                throw new Error('Type not found for parameter configuration.');
            }
            if (typeof configuration.required !== 'undefined') {
                this.required = !!configuration.required;
            }
            else {
                this.required = true;
            }
        }
    }
    parse(bit) {
        return this.parser.parse(bit);
    }
}
exports.Parameter = Parameter;
