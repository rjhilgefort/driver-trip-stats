const { always, pipe } = require('ramda');
const t = require('tcomb');
const fixtures = require('../test-fixtures');
const load = require('./index');

describe('load', () => {
  let store = {};

  beforeEach(() => {
    store = fixtures.store.example;
  });

  test('accepts a `Store`', () => {
    expect(load(store)).toBeDefined();
  });

  test('rejects other types', () => {
    const harness = (data) => {
      expect(() => load(data)).toThrow(fixtures.tcomb.invalidValue);
    };
    harness(fixtures.types.string);
    harness(fixtures.types.number);
    harness(fixtures.types.boolean);
  });

  test('returns an array', () => {
    expect(
      pipe(
        always(store),
        load,
        t.Array
      )()
    ).toBeDefined();
  });
});
