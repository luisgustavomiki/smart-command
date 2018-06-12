"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameter_list_1 = require("./parameter_list");
const command_1 = require("./command");
const events_1 = require("events");
var scope_list = [];
class Scope extends events_1.EventEmitter {
    /**
     * Creates a new scope and sets a provided name to it.
     * @param name The name of the scope to be used for logging and identification.
     */
    constructor(name) {
        super();
        this.name = name;
        this.commands = [];
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
        this.commands.push(commandInstance);
    }
    parse(source, input) {
        var words = input.split(' ');
        var command = this.commands.find(c => c.name == words[0]);
        if (!command) {
            this.emit('commandNotFound', input);
            return;
        }
        try {
            command.run(source, words.slice(1).join(' '));
        }
        catch (error) {
            this.emit('commandError', error, command.name, words.slice(1).join(' '));
        }
    }
}
exports.Scope = Scope;
