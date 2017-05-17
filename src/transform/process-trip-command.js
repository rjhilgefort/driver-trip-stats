const {
  T, prop, concat, assoc, __, complement, either, always, curry, pipe, cond, isEmpty
} = require('ramda');
const t = require('tcomb');
const { echo } = require('../utils');
const tripFromCommand = require('./trip-from-command');
const storeHasDriver = require('./store-has-driver');
const isSpeedAnOutlier = require('./is-speed-an-outlier');

const echoSkipped = (reason, command) =>
  echo.warning(`Trip skipped because ${reason} \n--> ${command}`);

/**
 * Given an existing map, and a new driver to be added, this function
 * will add that driver to the map and return the map back to the caller.
 *
 * Object a -> String -> Object a
 */
module.exports = curry(
  (store, command) => {
    t.Object(store);
    t.String(command);

    return pipe(
      tripFromCommand,
      cond([
        // Handle empty store or missing driver
        [
          either(
            isEmpty,
            complement(storeHasDriver(store))
          ),
          pipe(
            ({ driver }) => echoSkipped(`driver not found (${driver})`, command),
            always(store)
          )
        ],
        // Handle outlier data
        [
          isSpeedAnOutlier,
          pipe(
            ({ speed }) => echoSkipped(`speed was an outlier (${speed} mph)`, command),
            always(store)
          )
        ],
        // Add new trip to driver data
        [
          T,
          ({ driver, duration, distance, speed }) =>
            pipe(
              prop(driver),
              concat([{ duration, distance, speed }]),
              assoc(driver, __, store)
            )(store)
        ]
      ])
    )(command);
  }
);
