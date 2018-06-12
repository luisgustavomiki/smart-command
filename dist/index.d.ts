/// <reference types="node" />
import { Command } from "./command";
import { EventEmitter } from "events";
export declare class Scope extends EventEmitter {
    readonly name: string;
    private _commands;
    /**
     * Creates a new scope and sets a provided name to it.
     * @param name The name of the scope to be used for logging and identification.
     */
    private constructor();
    readonly commands: Command[];
    static get(name: string): Scope;
    addCommand(name: string, parameters: any, handler: (source: any, ...args: any[]) => void): void;
    parse(source: any, input: string): void;
}
export { ParameterError } from "./errors/parameter_error";
export { BlankParameterError } from "./errors/blank_parameter_error";
export { InvalidParameterError } from "./errors/invalid_parameter_error";
export { Command } from "./command";
export { ParameterList } from "./parameter_list";
export { Parameter } from "./parameter";
export { TypeParser } from "./type_parser";
