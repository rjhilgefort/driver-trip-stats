const { prop, pipe, either, gt, lt, __ } = require('ramda');

module.exports =
  pipe(
    prop('speed'),
    either(
      lt(__, 5),
      gt(__, 100)
    )
  );
