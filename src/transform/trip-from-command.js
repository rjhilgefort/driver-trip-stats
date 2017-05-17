const { assoc, apply, pipe, trim, split, zipObj, applySpec, prop, props } = require('ramda');
const duration = require('./duration');
const { calculateSpeed } = require('../utils');

/**
 * Processes a "trip" command string into a "trip" data object
 *
 * String -> Object
 */
module.exports =
  pipe(
    trim,
    split(' '),
    zipObj(['driver', 'start', 'end', 'distance']),
    applySpec({
      driver: prop('driver'),
      distance: pipe(
        prop('distance'),
        parseFloat,
        Math.round
      ),
      duration: pipe(
        props(['start', 'end']),
        apply(duration)
      )
    }),
    t => assoc('speed', calculateSpeed(t.distance, t.duration), t)
  );
