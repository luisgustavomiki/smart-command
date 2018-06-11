import { expect } from 'chai';
import 'mocha';

import { Command } from '../lib/command';
import { ParameterList } from '../lib/parameter_list';
import { Scope } from '../lib';

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
});