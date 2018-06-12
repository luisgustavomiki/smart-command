import * as _ from "lodash";
import { TypeParser } from "./type_parser";

export class Parameter {
  public readonly parser: TypeParser;
  public readonly required: boolean = true;
  public readonly description?: string;

  constructor(public readonly name: string, configuration: any) {
    if(_.isString(configuration)) {
      var pp = TypeParser.getByName(configuration);
      if(!pp) {
        throw new Error('Type parser not found.');
      }
      this.parser = pp;
    } else {
      if(configuration.type) {
        var pp = TypeParser.getByName(configuration.type);
        if(!pp) {
          throw new Error('Type parser not found.');
        }
        this.parser = pp;
      } else {
        throw new Error('Type not found for parameter configuration.');
      }

      if (typeof configuration.required !== 'undefined') {
        this.required = !!configuration.required
      } else {
        this.required = true;
      }
      this.description = configuration.description;
    }
  }

  parse(bit: string) {
    return this.parser.parse(bit);
  }
}
