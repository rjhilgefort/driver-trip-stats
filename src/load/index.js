const { sort, descend, prop, toPairs, evolve, add, map, reduce, pipe } = require('ramda');
const { Store } = require('../types');
const { calculateSpeed } = require('../utils');

/**
 * This module would normally "load" the transformed data into the target system. I fudged
 * the purity of this step and formatted the data into the state it needs to be to be presented
 * to the user (stdout).
 *
 * TODO: Break these steps to smaller methods that can be tested more easily. Please forgive
 *       the lack of polish and testing in this module. Hopefully you get an idea of the testing
 *       that would have been done by looking at the tests in other modules.
 */
const load = data =>
  pipe(
    Store,
    // Map, then reduce over all the drivers and their trips, summing their trips
    map(
      reduce(
        (result, { distance, duration }) =>
          evolve({
            distance: add(distance),
            duration: add(duration)
          })(result),
        {
          distance: 0,
          duration: 0
        }
      )
    ),
    toPairs,
    // Pull driver into object and calculate speed
    map(([driver, { distance, duration }]) => (
      {
        driver,
        distance,
        speed: calculateSpeed(distance, duration)
      }
    )),
    sort(descend(prop('distance')))
  )(data);

module.exports = load;
