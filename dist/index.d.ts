export declare class Scope {
    readonly name: string;
    private commands;
    /**
     * Creates a new scope and sets a provided name to it.
     * @param name The name of the scope to be used for logging and identification.
     */
    constructor(name: string);
    addCommand(name: string, parameters: any, handler: (source: any, ...args: any[]) => void): void;
    parse(source: any, input: string): void;
}
