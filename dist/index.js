"use strict";
/*

var playerCommands = new Scope('player');
playerCommands.addCommnand('pay', {

});
*/
Object.defineProperty(exports, "__esModule", { value: true });
class Scope {
    /**
     * Creates a new scope and sets a provided name to it.
     * @param name The name of the scope to be used for logging and identification.
     */
    constructor(name) {
        this.name = name;
        this.commands = [];
    }
    addCommand(name, parameters) {
        var parameterListInstance = new ParameterList(parameters);
        var commandInstance = new Command(name, parameterListInstance);
    }
}
exports.Scope = Scope;
class Command {
    /**
     *
     * @param name
     * @param parameters
     */
    constructor(name, parameters) {
        this.name = name;
        this.parameters = parameters;
    }
    parse(input) {
    }
}
exports.Command = Command;
class ParameterList {
    constructor(fields) {
        this.fields = fields;
    }
}
exports.ParameterList = ParameterList;
var Types;
(function (Types) {
    Types[Types["Number"] = 0] = "Number";
    Types[Types["Word"] = 1] = "Word";
    Types[Types["Phrase"] = 2] = "Phrase";
})(Types = exports.Types || (exports.Types = {}));
