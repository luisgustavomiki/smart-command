import { TypeParser } from "./type_parser";
export declare class Parameter {
    readonly name: string;
    readonly parser: TypeParser;
    readonly required: boolean;
    constructor(name: string, configuration: any);
    parse(bit: string): any;
}
