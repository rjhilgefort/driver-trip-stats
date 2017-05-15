const t = require('tcomb');

/**
 * This defines what is expected to be present on the `program` after
 * being processed by `commander`. As options are used, they should be
 * included here as well.
 */
module.exports =
  t.struct({
    args: t.Array
  }, 'Program');
