import { ParameterList } from "./parameter_list";
import { Command } from "./command";
import { EventEmitter } from "events";
import { BlankParameterError } from "./errors/blank_parameter_error";
import { InvalidParameterError } from "./errors/invalid_parameter_error";

var scope_list: Scope[] = [];

export class Scope extends EventEmitter {
  private commands: Command[] = [];
  /**
   * Creates a new scope and sets a provided name to it.
   * @param name The name of the scope to be used for logging and identification.
   */
  private constructor(public readonly name: string) {
    super();
  }

  static get(name: string) {
    var result = scope_list.find(s => s.name == name);
    if(result) {
      return result;
    } else {
      var scope = new Scope(name);
      scope_list.push(scope);
      return scope;
    }
  }

  public addCommand(name: string, parameters: any, handler: (source: any, ...args: any[]) => void) {
    var parameterListInstance = new ParameterList(parameters);
    var commandInstance = new Command(name, parameterListInstance, handler);
    this.commands.push(commandInstance);
  }

  public parse(source: any, input: string) {
    var words = input.split(' ');
    var command = this.commands.find(c => c.name == words[0]);

    if(!command) {
      this.emit('commandNotFound', source, input);
      return;
    }

    try {
      command.run(source, words.slice(1).join(' '));
    } catch(error) {
      if(error instanceof BlankParameterError ||
        error instanceof InvalidParameterError) {
        this.emit('parameterError', source, error, command, words.slice(1).join(' '));
      } else {
        throw error;
      }
    }
  }
}
