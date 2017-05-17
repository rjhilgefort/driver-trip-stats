const { always, pipe, prop, join } = require('ramda');
const fixtures = require('../test-fixtures');
const processTripCommand = require('./process-trip-command');

describe('processTripCommand', () => {
  let store = {};

  beforeEach(() => {
    store = fixtures.store.minimal;
  });

  test('skips when driver is missing', () => {
    const missingDriver = 'Alex';
    const newTrip = `${missingDriver} 12:01 13:16 42.0`;
    expect(store).not.toHaveProperty(missingDriver);
    expect(
      pipe(
        always(newTrip),
        processTripCommand(store)
      )()
    ).toEqual(store);
  });

  describe('skips when average speed is an outlier', () => {
    const harness = (...args) => {
      const driver = 'Dan';
      const trip = join(' ', [driver, ...args]);
      expect(prop(driver, store)).toHaveLength(1);
      expect(
        pipe(
          always(trip),
          processTripCommand(store),
          prop(driver)
        )()
      ).toHaveLength(1);
    };

    test('too fast', () => {
      harness('12:00', '12:20', '42');
    });

    test('too slow', () => {
      harness('01:00', '18:23', '28.8');
    });
  });

  test('adds trip to store', () => {
    const driver = 'Dan';
    const trip = `${driver} 16:05 17:32 70`;
    expect(prop(driver, store)).toHaveLength(1);
    expect(
      pipe(
        always(trip),
        processTripCommand(store),
        prop(driver)
      )()
    ).toHaveLength(2);
  });
});
