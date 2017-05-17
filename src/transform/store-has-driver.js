const { prop, has, curry, pipe, __ } = require('ramda');

module.exports = curry(
  (store, trip) =>
    pipe(
      prop('driver'),
      has(__, store)
    )(trip)
);
