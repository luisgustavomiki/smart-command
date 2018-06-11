export declare class TypeParser {
    readonly name: string;
    readonly capturePattern: RegExp;
    readonly parser: (bit: string) => any;
    private constructor();
    /**
     * Runs the parser procedure on a provided string.
     * @param bit The string to be processed.
     */
    parse(bit: string): any;
    /**
     * Creates a new parser to be used in the runtime.
     * @param name The name to be referred when fetched.
     * @param capturePattern The pattern to identify a parsable bit in a string.
     * @param parser The parser procedure to turn an extracted bit into an useable value.
     */
    static create(name: string, capturePattern: RegExp, parser: (bit: string) => any): void;
    /**
     * Fetches a previously created parser by its name.
     * @param name The name of the parser to be returned.
     */
    static getByName(name: string): TypeParser | undefined;
    /**
     * Defines the iterator.
     */
    static [Symbol.iterator](): IterableIterator<TypeParser>;
}
