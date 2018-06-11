import { ParameterList } from "./parameter_list";
export interface CommandParameters {
    name: string;
    value: any;
}
export declare class Command {
    readonly name: string;
    private parameterList;
    private callback;
    constructor(name: string, parameterList: ParameterList, callback: (source: any, parameters: CommandParameters[]) => void);
    run(source: any, text: string): void;
}
