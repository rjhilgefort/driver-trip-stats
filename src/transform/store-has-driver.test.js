const storeHasDriver = require('./store-has-driver');
const fixtures = require('../test-fixtures');

describe('storeHasDriver', () => {
  let store = {};

  beforeEach(() => {
    store = fixtures.store.minimal;
  });

  test('returns false when driver is missing', () => {
    const driver = 'Alex';
    const trip = { driver };
    expect(store).not.toHaveProperty(driver);
    expect(storeHasDriver(store, trip)).toEqual(false);
  });

  test('returns true when driver is present', () => {
    const driver = 'Dan';
    const trip = { driver };
    expect(store).toHaveProperty(driver);
    expect(storeHasDriver(store, trip)).toEqual(true);
  });
});
