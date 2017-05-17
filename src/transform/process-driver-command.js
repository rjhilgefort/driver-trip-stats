const { curry, pipe, trim, ifElse, has, __, concat, assoc, always } = require('ramda');
const t = require('tcomb');
const { echo } = require('../utils');

/**
 * Given an existing map, and a new driver to be added, this function
 * will add that driver to the map and return the map back to the caller.
 *
 * Object a -> String -> Object a
 */
module.exports = curry(
  (store, command) => {
    // TODO: Make type
    t.Object(store);
    t.String(command);

    return pipe(
      trim,
      ifElse(
        // Check for existing driver in store
        has(__, store),
        // Don't register existing driver, warn
        pipe(
          concat('Attempted to register driver multiple times: '),
          echo.warning,
          always(store)
        ),
        // Add new driver to store
        pipe(
          assoc(__, [], store)
        )
      )
    )(command);
  }
);
