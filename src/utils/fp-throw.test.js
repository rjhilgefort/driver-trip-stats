const t = require('tcomb');
const { tcomb } = require('../test-fixtures');
const fpThrow = require('./fp-throw');

describe('fpThrow', () => {
  test('exports a function', () => {
    t.Function(fpThrow);
  });

  describe('throws an error', () => {
    const harness = (data) => {
      expect(() => fpThrow(data)).toThrow(data);
    };

    test('when given a string', () => {
      harness('hi');
    });

    test('when given an object', () => {
      harness({ name: 'Name', message: 'A message' });
    });
  });

  test('rejects other types', () => {
    const harness = (data) => {
      expect(() => fpThrow(data)).toThrow(tcomb.invalidValue);
    };

    harness(2);
    harness(true);
    harness(['foo', 'bar']);
  });
});
