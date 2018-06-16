"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameter_list_1 = require("./parameter_list");
const command_1 = require("./command");
const events_1 = require("events");
const blank_parameter_error_1 = require("./errors/blank_parameter_error");
const invalid_parameter_error_1 = require("./errors/invalid_parameter_error");
var scope_list = [];
class Scope extends events_1.EventEmitter {
    /**
     * Creates a new scope and sets a provided name to it.
     * @param name The name of the scope to be used for logging and identification.
     */
    constructor(name) {
        super();
        this.name = name;
        this._commands = [];
    }
    get commands() {
        return this._commands;
    }
    static get(name) {
        var result = scope_list.find(s => s.name == name);
        if (result) {
            return result;
        }
        else {
            var scope = new Scope(name);
            scope_list.push(scope);
            return scope;
        }
    }
    addCommand(name, parameters, handler) {
        var parameterListInstance = new parameter_list_1.ParameterList(parameters);
        var commandInstance = new command_1.Command(name, parameterListInstance, handler);
        this._commands.push(commandInstance);
    }
    async parse(source, input) {
        var words = input.split(' ');
        var command = this._commands.find(c => c.name == words[0]);
        if (!command) {
            this.emit('commandNotFound', source, input);
            return;
        }
        try {
            await command.run(source, words.slice(1).join(' '));
        }
        catch (error) {
            if (error instanceof blank_parameter_error_1.BlankParameterError ||
                error instanceof invalid_parameter_error_1.InvalidParameterError) {
                this.emit('parameterError', source, error, command, words.slice(1).join(' '));
            }
            else {
                this.emit('commandError', source, error, command, words.slice(1).join(' '));
                throw error;
            }
        }
    }
}
exports.Scope = Scope;
var parameter_error_1 = require("./errors/parameter_error");
exports.ParameterError = parameter_error_1.ParameterError;
var blank_parameter_error_2 = require("./errors/blank_parameter_error");
exports.BlankParameterError = blank_parameter_error_2.BlankParameterError;
var invalid_parameter_error_2 = require("./errors/invalid_parameter_error");
exports.InvalidParameterError = invalid_parameter_error_2.InvalidParameterError;
var command_2 = require("./command");
exports.Command = command_2.Command;
var parameter_list_2 = require("./parameter_list");
exports.ParameterList = parameter_list_2.ParameterList;
var parameter_1 = require("./parameter");
exports.Parameter = parameter_1.Parameter;
var type_parser_1 = require("./type_parser");
exports.TypeParser = type_parser_1.TypeParser;
