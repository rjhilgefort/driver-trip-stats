const { pipe } = require('ramda');
const t = require('tcomb');
const { file, tcomb, types } = require('../test-fixtures');
const transform = require('./index');

describe('transform', () => {
  test('exports a function', () => {
    t.Function(transform);
  });

  test('accepts an array', () => {
    expect(transform([])).toBeTruthy();
  });

  test('rejects other types', () => {
    const harness = (data) => {
      expect(() => transform(data)).toThrow(tcomb.invalidValue);
    };
    harness(types.object);
    harness(types.string);
    harness(types.number);
    harness(types.boolean);
  });

  test('returns an object', () => {
    expect(
      pipe(
        transform,
        t.Object
      )(file.example)
    ).toBeDefined();
  });
});
