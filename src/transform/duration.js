const { invoker, curry, curryN, pipe, __ } = require('ramda');
const moment = require('moment');

const FORMAT = 'HH:mm';
const curriedMoment = curryN(2, moment);

/**
 * Calculates the duration of time, in minutes, between two strings
 * of the time format above.
 *
 * String -> String -> Number
 */
module.exports = curry(
  (start, end) =>
    pipe(
      curriedMoment(__, FORMAT),
      invoker(1, 'diff')(moment(start, FORMAT)),
      moment.duration,
      invoker(0, 'asMinutes')
    )(end)
);
