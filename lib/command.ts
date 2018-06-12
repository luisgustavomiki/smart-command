import { ParameterList } from "./parameter_list";
import { InvalidParameterError } from "./errors/invalid_parameter_error";
import { BlankParameterError } from "./errors/blank_parameter_error";
import { TypeParsingError } from "./errors/type_parsing_error";

export class Command {
  constructor(public readonly name: string, private parameterList: ParameterList, private callback: (source: any, parameters: any) => void) {}
  
  run(source: any, text: string) {
    text = text.trim();
    var parsedParameters: any = {
      raw: text
    }; 
    
    this.parameterList.parameters.every(p => {
      var parser = p.parser;
      var result = text.match(parser.capturePattern);
      if(result) {
        var index = result.index || 0;
        
        if(index == 0) {
          text = text.slice(result[0].length).trim();
          try {
            parsedParameters[p.name] = p.parse(result[0]);
          } catch (error) {
            if(error instanceof TypeParsingError) {
              throw new InvalidParameterError(error.message, p.name);
            } else {
              throw error;
            }
          }
          return true;
        } else {
          // if theres a mismatch match and the 
          // parameter is required, it basically 
          // means "not found"
          if(p.required) {
            throw new BlankParameterError("No match for required parameter.", p.name);
          }
          // Break because nonrequired parameters
          // must be parsed in order or not at all
          return false;
        }
      } else {
        // if there is no match for this parameter
        // and it is required, throw an error
        if(p.required) {
          throw new BlankParameterError("No match for required parameter.", p.name);
        }
        // if it is not required, break the parameter
        // parsing. it is a requirement for nonrequired
        // parameters to be parsed in order or not
        // at all
        return false;
      }
    });
    this.callback(source, parsedParameters);
  }
}

