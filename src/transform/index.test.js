const { pipe } = require('ramda');
const { Store } = require('../types');
const { file, tcomb, types } = require('../test-fixtures');
const transform = require('./index');

describe('transform', () => {
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

  test('returns a `Store`', () => {
    expect(
      pipe(
        transform,
        Store
      )(file.example)
    ).toBeDefined();
  });
});
