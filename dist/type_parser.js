"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blank_parameter_1 = require("./errors/blank_parameter");
const invalid_parameter_1 = require("./errors/invalid_parameter");
var parsers_list = [];
class TypeParser {
    constructor(name, capturePattern, parser) {
        this.name = name;
        this.capturePattern = capturePattern;
        this.parser = parser;
    }
    /**
     * Runs the parser procedure on a provided string.
     * @param bit The string to be processed.
     */
    parse(bit) {
        return this.parser(bit);
    }
    /**
     * Creates a new parser to be used in the runtime.
     * @param name The name to be referred when fetched.
     * @param capturePattern The pattern to identify a parsable bit in a string.
     * @param parser The parser procedure to turn an extracted bit into an useable value.
     */
    static create(name, capturePattern, parser) {
        if (this.getByName(name)) {
            throw new Error('Parser with same name already is registered.');
        }
        parsers_list.push(new this(name, capturePattern, parser));
    }
    /**
     * Fetches a previously created parser by its name.
     * @param name The name of the parser to be returned.
     */
    static getByName(name) {
        return parsers_list.find(p => p.name == name);
    }
    /**
     * Defines the iterator.
     */
    static [Symbol.iterator]() {
        return parsers_list[Symbol.iterator]();
    }
}
exports.TypeParser = TypeParser;
TypeParser.create('Number', /[0-9]+/, (bit) => {
    var bit = bit.trim();
    if (bit.length == 0) {
        throw new blank_parameter_1.BlankParameterError('There is no number to parse.');
    }
    var i = parseFloat(bit);
    if (!isNaN(i) && isFinite(bit)) {
        throw new invalid_parameter_1.InvalidParameterError("Not a number.");
    }
    return i;
});
TypeParser.create('Word', /[^\s\\]+/, (bit) => {
    bit = bit.trim();
    if (bit.length == 0) {
        throw new blank_parameter_1.BlankParameterError('There is no word to parse.');
    }
    return bit;
});
TypeParser.create('Phrase', /"(?:[^"\\]|\\.)*"/, (bit) => {
    bit = bit.trim();
    bit = bit.replace(/^"(.*)"$/, '$1');
    bit = bit.replace(/\\"/g, '');
    if (bit.length == 0) {
        throw new blank_parameter_1.BlankParameterError('There is no word to parse.');
    }
    return bit;
});
// @ts-ignore
if (typeof mp !== 'undefined') {
    // @ts-ignore
    if (typeof mp.joaat !== 'undefined') {
        TypeParser.create('Player', /([^\s\\]+)/, (bit) => {
            bit = bit.trim();
            if (bit.length == 0) {
                throw new blank_parameter_1.BlankParameterError('There is no word to parse.');
            }
            if (!isNaN(parseFloat(bit)) && isFinite(bit) && Number.isInteger(bit)) {
                // @ts-ignore
                return mp.players.at(parseInt(bit));
            }
            else {
                // @ts-ignore
                mp.players.forEach((player, id) => {
                    if (player.name == bit) {
                        return player;
                    }
                });
            }
        });
    }
}
