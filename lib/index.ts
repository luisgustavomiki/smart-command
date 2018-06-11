import { ParameterList } from "./parameter_list";
import { Command } from "./command";


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

export class Scope {
  private commands: Command[] = [];
  /**
   * Creates a new scope and sets a provided name to it.
   * @param name The name of the scope to be used for logging and identification.
   */
  constructor(public readonly name: string) {}

  public addCommand(name: string, parameters: any, handler: (source: any, ...args: any[]) => void) {
    var parameterListInstance = new ParameterList(parameters);
    var commandInstance = new Command(name, parameterListInstance, handler);
    this.commands.push(commandInstance);
  }

  public parse(source: any, input: string) {
    var words = input.split(' ');
    var command = this.commands.find(c => c.name == words[0]);

    if(!command) {
      // handle error
      return;
    }

    try {
      command.run(source, words.slice(1).join(' '));
    } catch(error) {
      
    }
  }
}
