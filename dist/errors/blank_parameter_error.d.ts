import { ParameterError } from "./parameter_error";
export declare class BlankParameterError extends ParameterError {
    readonly message: string;
    readonly parameter: string;
    constructor(message: string, parameter: string);
}
