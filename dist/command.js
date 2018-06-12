"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_parameter_error_1 = require("./errors/invalid_parameter_error");
const blank_parameter_error_1 = require("./errors/blank_parameter_error");
const type_parsing_error_1 = require("./errors/type_parsing_error");
class Command {
    constructor(name, parameterList, callback) {
        this.name = name;
        this.parameterList = parameterList;
        this.callback = callback;
    }
    run(source, text) {
        text = text.trim();
        var parsedParameters = {
            raw: text
        };
        this.parameterList.parameters.every(p => {
            var parser = p.parser;
            var result = text.match(parser.capturePattern);
            if (result) {
                var index = result.index || 0;
                if (index == 0) {
                    text = text.slice(result[0].length).trim();
                    try {
                        parsedParameters[p.name] = p.parse(result[0]);
                    }
                    catch (error) {
                        if (error instanceof type_parsing_error_1.TypeParsingError) {
                            throw new invalid_parameter_error_1.InvalidParameterError(error.message, p.name);
                        }
                        else {
                            throw error;
                        }
                    }
                    return true;
                }
                else {
                    // if theres a mismatch match and the 
                    // parameter is required, it basically 
                    // means "not found"
                    if (p.required) {
                        throw new blank_parameter_error_1.BlankParameterError("No match for required parameter.", p.name);
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
                    if (text.length) {
                        throw new invalid_parameter_error_1.InvalidParameterError("No match for required parameter.", p.name);
                    }
                    else {
                        throw new blank_parameter_error_1.BlankParameterError("No match for required parameter.", p.name);
                    }
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
