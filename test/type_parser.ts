import { expect } from 'chai';
import 'mocha';

import { TypeParser } from '../lib/type_parser';
import { TypeParsingError } from '../lib/errors/type_parsing_error';

describe('TypeParser Number', () => {
  it('should return all default TypeParsers', () => {
    expect(TypeParser.getByName('Number')).to.be.instanceof(TypeParser);
    expect(TypeParser.getByName('Word')).to.be.instanceof(TypeParser);
    expect(TypeParser.getByName('Phrase')).to.be.instanceof(TypeParser);
  });

  it('should parse Number correctly', () => {
    var tp = TypeParser.getByName('Number');
    if(tp) {
      var input = "10";
      var result = tp.parse(input);
      expect(result).to.be.eq(10);
      expect(result).to.be.a('number');
    }
  });

  it('should throw BlankParameterError trying to parse blank Number', () => {
    var tp = TypeParser.getByName('Number');
    if(tp) {
      var input = "";
      var call = tp.parse.bind(tp, input);
      expect(call).to.throw(TypeParsingError);
    }
  });

  it('should throw InvalidParameterError trying to parse invalid Number', () => {
    var tp = TypeParser.getByName('Number');
    if(tp) {
      var input = "dasdasdas";
      var call = tp.parse.bind(tp, input);
      expect(call).to.throw(TypeParsingError);
    }
  });
});

describe('TypeParser Word', () => {
  it('should parse Word correctly', () => {
    var tp = TypeParser.getByName('Word');
    if(tp) {
      var input = "alone";
      var result = tp.parse(input);
      expect(result).to.be.eq('alone');
    }
  });

  it('should throw BlankParameterError trying to parse blank Word', () => {
    var tp = TypeParser.getByName('Word');
    if(tp) {
      var input = "";
      var call = tp.parse.bind(tp, input);
      expect(call).to.throw(TypeParsingError);
    }
  });
});

describe('TypeParser Phrase', () => {
  it('should parse Phrase correctly', () => {
    var tp = TypeParser.getByName('Phrase');
    if(tp) {
      var input = `"The quick brown \\"fox\\" jumps over the lazy dog."`;
      var result = tp.parse(input);
      expect(result).to.be.eq('The quick brown "fox" jumps over the lazy dog.');
    }
  });
});
