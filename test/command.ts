import { expect } from 'chai';
import 'mocha';
import { Command } from '../lib/command';
import { ParameterList } from '../lib/parameter_list';

describe('Command', () => {
  it('should process correctly a single Number', () => {
    var parameterList = new ParameterList({number: 'Number'});
    var command = new Command('test', parameterList, (source, parameters) => {
      expect(parameters.number).to.eq(10);
    });
    command.run('test', '10');
  });

  it('should process correctly a Word followed by a Number', () => {
    var parameterList = new ParameterList({word: 'Word', number: 'Number'});
    var command = new Command('test', parameterList, (source, parameters) => {
      expect(parameters.number).to.eq(10);
      expect(parameters.word).to.eq('miki');
    });
    command.run('test', 'miki 10');
  });

  it('should process correctly a Word followed by a Number and then by a Phrase', () => {
    var parameterList = new ParameterList({word: 'Word', number: 'Number', money: 'Phrase'});
    var command = new Command('test', parameterList, (source, parameters) => {
      expect(parameters.number).to.eq(20);
      expect(parameters.word).to.eq('moko');
      expect(parameters.money).to.eq('The quick brown "fox" jumps over the lazy dog.');
    });
    command.run('test', `moko     20      "The quick brown \\"fox\\" jumps over the lazy dog."`);
  });
});