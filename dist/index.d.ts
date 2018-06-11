export declare class Scope {
    readonly name: string;
    private commands;
    /**
     * Creates a new scope and sets a provided name to it.
     * @param name The name of the scope to be used for logging and identification.
     */
    constructor(name: string);
    addCommand(name: string, parameters: any): void;
}
export declare class Command {
    readonly name: string;
    private parameters;
    /**
     *
     * @param name
     * @param parameters
     */
    constructor(name: string, parameters: ParameterList);
    parse(input: string): void;
}
export declare class ParameterList {
    readonly fields: any;
    constructor(fields: any);
}
export declare enum Types {
    Number = 0,
    Word = 1,
    Phrase = 2
}
