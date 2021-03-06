import { expect } from 'chai';
import 'mocha';

import { Command } from '../lib/command';
import { ParameterList } from '../lib/parameter_list';
import { Scope } from '../lib';
import { BlankParameterError } from '../lib/errors/blank_parameter_error';
import { InvalidParameterError } from '../lib/errors/invalid_parameter_error';

describe('Command', () => {
  it('should process correctly a single Number', () => {
    var scope = Scope.get('command');
    scope.addCommand('test', {number: 'Number'},  (source, parameters) => {
      expect(parameters.number).to.eq(10);
    });
    scope.parse(null, 'test 10');
  });

  it('should process correctly a Word followed by a Number', () => {
    var scope = Scope.get('command');
    scope.addCommand('test', {name: 'Word', number: 'Number'},  (source, parameters) => {
      expect(parameters.number).to.eq(10);
      expect(parameters.word).to.eq('miki');
    });
    scope.parse(null, 'test miki 10');
  });

  it('should process correctly a Word followed by a Number and then by a Phrase', () => {
    var scope = Scope.get('command');
    scope.addCommand('test', {name: 'Word', number: 'Number', money: 'Phrase'},  (source, parameters) => {
      expect(parameters.number).to.eq(20);
      expect(parameters.word).to.eq('moko');
      expect(parameters.money).to.eq('The quick brown "fox" jumps over the lazy dog.');
    });
    scope.parse(null, `test     moko     20      "The quick brown \\"fox\\" jumps over the lazy dog."`);
  });

  it('should process correctly a Word followed by a Number and then by a Phrase and finally by a String', () => {
    var scope = Scope.get('command');
    scope.addCommand('test', {name: 'Word', number: 'Number', money: 'Phrase', strang: 'String'},  (source, parameters) => {
      expect(parameters.number).to.eq(20);
      expect(parameters.word).to.eq('moko');
      expect(parameters.money).to.eq('The quick brown "fox" jumps over the lazy dog.');
      expect(parameters.strang).to.eq('teste teste teste teste');
    });
    scope.parse(null, `test     moko     20      "The quick brown \\"fox\\" jumps over the lazy dog." teste teste teste teste`);
  });

  it('should emit an event with BlankParameterError when Number is blank', () => {
    var scope = Scope.get('command1');
    scope.addCommand('test', {number: 'Number'},  (source, parameters) => {
      expect.fail();
    });
    scope.on('parameterError', (source, error: BlankParameterError, command: Command, raw: string) => {
      expect(error).to.be.a.instanceof(BlankParameterError);
      expect(error.parameter).to.eq('number');
      expect(command.name).to.eq('test');
    });
    scope.parse(null, 'test');
  });

  it('should emit an event with InvalidParameterError when Number is invalid', () => {
    var scope = Scope.get('command2');
    scope.addCommand('test', {number: 'Number'},  (source, parameters) => {
      expect.fail();
    });
    scope.on('parameterError', (source, error: InvalidParameterError, command: Command, raw: string) => {
      expect(error).to.be.a.instanceof(InvalidParameterError);
      expect(error.parameter).to.eq('number');
      expect(command.name).to.eq('test');
    });
    scope.parse(null, 'test dasdsa');
  });

  it('should run command handler when nonrequired field is not present', () => {
    var scope = Scope.get('command3');
    scope.addCommand('test', {number: {type: 'Number', required: false}},  (source, parameters) => {
      expect(parameters.number).to.be.undefined;
    });
    scope.parse(null, 'test');
  });

  it('should throw an error when async handler throws a custom error.', async () => {
    var scope = Scope.get('command4');
    scope.addCommand('test', {number: {type: 'Number', required: false}},  (source, parameters) => {
      throw new Error('test');
    });
    try{
      await scope.parse(null, 'test');
    } catch (error) {
      expect(error.message).to.be.eq('test');
    }
  });
});
