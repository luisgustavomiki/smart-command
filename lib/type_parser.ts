import { BlankParameterError } from "./errors/blank_parameter";
import { InvalidParameterError } from "./errors/invalid_parameter";

var parsers_list: TypeParser[] = [];

export class TypeParser {
  private constructor(
    public readonly name: string,
    public readonly capturePattern: RegExp,
    public readonly parser: (bit: string) => any) {}

  /**
   * Runs the parser procedure on a provided string.
   * @param bit The string to be processed.
   */
  parse(bit: string) {
    return this.parser(bit);
  }

  /**
   * Creates a new parser to be used in the runtime.
   * @param name The name to be referred when fetched.
   * @param capturePattern The pattern to identify a parsable bit in a string.
   * @param parser The parser procedure to turn an extracted bit into an useable value.
   */
  static create(name: string, capturePattern: RegExp, parser: (bit: string) => any) {
    if(this.getByName(name)) {
      throw new Error('Parser with same name already is registered.');
    }
    parsers_list.push(new this(name, capturePattern, parser));
  }

  /**
   * Fetches a previously created parser by its name.
   * @param name The name of the parser to be returned.
   */
  static getByName(name: string) {
    return parsers_list.find(p => p.name == name);
  }

  /**
   * Defines the iterator.
   */
  static [Symbol.iterator]() {
    return parsers_list[Symbol.iterator]();
  }
}

TypeParser.create('Number', /[0-9]+/, (bit: string) => { 
  var bit = bit.trim();
  if(bit.length == 0) {
    throw new BlankParameterError('There is no number to parse.');
  }

  var i = parseFloat(bit);
  if(!isNaN(i) && isFinite(bit as any)) {
    throw new InvalidParameterError("Not a number.");
  }
  return i;
});

TypeParser.create('Word', /[^\s\\]+/, (bit: string) => {
  bit = bit.trim();
  if(bit.length == 0) {
    throw new BlankParameterError('There is no word to parse.');
  }
  return bit;
});

TypeParser.create('Phrase', /"(?:[^"\\]|\\.)*"/, (bit: string) => {
  bit = bit.trim();
  bit = bit.replace(/^"(.*)"$/, '$1');
  bit = bit.replace(/\\"/g, '');
  if(bit.length == 0) {
    throw new BlankParameterError('There is no word to parse.');
  }
  return bit;
});

// @ts-ignore
if (typeof mp !== 'undefined') {
  // @ts-ignore
  if (typeof mp.joaat !== 'undefined') {
    TypeParser.create('Player', /([^\s\\]+)/, (bit: string) => {
      bit = bit.trim();
      if(bit.length == 0) {
        throw new BlankParameterError('There is no word to parse.');
      }

      if(!isNaN(parseFloat(bit)) && isFinite(bit as any) && Number.isInteger(bit as any)) {
        // @ts-ignore
        return mp.players.at(parseInt(bit));
      } else {
        // @ts-ignore
        mp.players.forEach((player, id) => {
          if(player.name == bit) {
            return player;
          }
        });
      }
    });
  }
}
