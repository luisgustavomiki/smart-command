/// <reference types="node" />
import { EventEmitter } from "events";
export declare class Scope extends EventEmitter {
    readonly name: string;
    private commands;
    /**
     * Creates a new scope and sets a provided name to it.
     * @param name The name of the scope to be used for logging and identification.
     */
    private constructor();
    static get(name: string): Scope;
    addCommand(name: string, parameters: any, handler: (source: any, ...args: any[]) => void): void;
    parse(source: any, input: string): void;
}
