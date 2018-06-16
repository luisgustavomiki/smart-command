import { ParameterList } from "./parameter_list";
export declare class Command {
    readonly name: string;
    readonly parameterList: ParameterList;
    private callback;
    constructor(name: string, parameterList: ParameterList, callback: (source: any, parameters: any) => void);
    run(source: any, text: string): Promise<void>;
}
