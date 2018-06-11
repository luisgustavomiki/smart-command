"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameter_list_1 = require("./parameter_list");
const command_1 = require("./command");
/*

var playerCommands = new Scope('player');
playerCommands.addCommnand('ban', {
  target: 'Player',
  time: 'Integer',
  reason: { type: 'Phrase', required: false }
}. function(source: any, target: MpPlayer, time, reason) {
  var source_player = source as
});
*/
class Scope {
    /**
     * Creates a new scope and sets a provided name to it.
     * @param name The name of the scope to be used for logging and identification.
     */
    constructor(name) {
        this.name = name;
        this.commands = [];
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
            // handle error
            return;
        }
        try {
            command.run(source, words.slice(1).join(' '));
        }
        catch (error) {
        }
    }
}
exports.Scope = Scope;
