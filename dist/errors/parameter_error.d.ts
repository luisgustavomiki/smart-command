export declare class ParameterError extends Error {
    readonly message: string;
    readonly parameter: string;
    constructor(message: string, parameter: string);
}
