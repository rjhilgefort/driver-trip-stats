const { apply, concat, identity, pipe, pipeP, unapply } = require('ramda');

/**
 * Similar to `pipe` and `pipeP`, but this method allows interpolation of
 * async and sync functions by preceding all the passed in functions with a
 * resolved promise. All functions must be unary (unlike the first argument
 * of it's sister functions).
 */
module.exports =
  pipe(
    unapply(identity),
    concat([a => Promise.resolve(a)]),
    apply(pipeP)
  );
