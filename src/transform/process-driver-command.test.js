const { always, pipe } = require('ramda');
const t = require('tcomb');
const fixtures = require('../test-fixtures');
const processDriverCommand = require('./process-driver-command');

describe('processDriverCommand', () => {
  let store = {};

  beforeEach(() => {
    store = fixtures.store.minimal;
  });

  test('exports a function', () => {
    t.Function(processDriverCommand);
  });

  test('doesn\'t register drivers multiple times, preserves existing', () => {
    const existingDriver = 'Dan';
    expect(store).toHaveProperty(existingDriver);
    expect(
      pipe(
        always(existingDriver),
        processDriverCommand(store)
      )()
    ).toEqual(store);
  });

  test('adds driver to store', () => {
    const newDriver = 'NewDriver';
    expect(store).not.toHaveProperty(newDriver);
    expect(
      pipe(
        always(newDriver),
        processDriverCommand(store)
      )()
    ).toHaveProperty(newDriver, []);
  });
});
