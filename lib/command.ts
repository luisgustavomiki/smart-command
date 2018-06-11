import { ParameterList } from "./parameter_list";

export class Command {
  constructor(public readonly name: string, private parameters: ParameterList, private callback: (source: any, ...args: any[]) => void) {}

  parse(source: any, parameters: string) {
    
  }
}

