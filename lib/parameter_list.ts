import { Parameter } from "./parameter";

export class ParameterList {
  private _parameters: Parameter[] = [];

  constructor(fields: any) {
    var keys = Object.keys(fields);
    var anyNonRequired = false;
    keys.forEach(k => {
      var p = new Parameter(k, fields[k]);

      if(p.required && anyNonRequired) {
        throw new Error('Required parameters must precede nonrequired and never the opposite.');
      }
      if(!p.required) {
        anyNonRequired = true;
      }
      this._parameters.push(p);
    });
  }

  get parameters() {
    return this._parameters;
  }
}

