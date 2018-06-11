import * as _ from "lodash";
import { TypeParser } from "./type_parser";

export class Parameter {
  public readonly parser: TypeParser;
  public readonly required: boolean = true;

  constructor(public readonly name: string, configuration: any) {
    if(_.isString(configuration)) {
      var pp = TypeParser.getByName(configuration);
      if(!pp) {
        throw new Error('Type parser not found.');
      }
      this.parser = pp;
    } else {
      if(configuration.type) {
        this.parser = configuration.type;
      } else {
        throw new Error('Type not found for parameter configuration.');
      }

      if(configuration.required) {
        this.required = configuration.required;
      }
    }
  }

  parse(bit: string) {
    return this.parser.parse(bit);
  }
}
