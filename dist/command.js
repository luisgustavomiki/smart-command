"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blank_parameter_1 = require("./errors/blank_parameter");
class Command {
    constructor(name, parameterList, callback) {
        this.name = name;
        this.parameterList = parameterList;
        this.callback = callback;
    }
    run(source, text) {
        text = text.trim();
        var parsedParameters = {};
        this.parameterList.parameters.every(p => {
            var parser = p.parser;
            var result = text.match(parser.capturePattern);
            if (result) {
                var index = result.index || 0;
                if (index == 0) {
                    text = text.slice(result[0].length).trim();
                    parsedParameters[p.name] = p.parse(result[0]);
                    return true;
                }
                else {
                    // if theres a mismatch match and the 
                    // parameter is required, it basically 
                    // means "not found"
                    if (p.required) {
                        throw new blank_parameter_1.BlankParameterError("No match for required parameter.");
                    }
                    // Break because nonrequired parameters
                    // must be parsed in order or not at all
                    return false;
                }
            }
            else {
                // if there is no match for this parameter
                // and it is required, throw an error
                if (p.required) {
                    throw new blank_parameter_1.BlankParameterError("No match for required parameter.");
                }
                // if it is not required, break the parameter
                // parsing. it is a requirement for nonrequired
                // parameters to be parsed in order or not
                // at all
                return false;
            }
        });
        this.callback(source, parsedParameters);
    }
}
exports.Command = Command;
