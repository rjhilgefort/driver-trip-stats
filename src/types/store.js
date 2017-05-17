const t = require('tcomb');

/**
 * This defines the shape of the `store` for the driver/trip data
 *
 * TODO: Maps aren't supported by tcomb ¯\_(ツ)_/¯
 *       ref: https://github.com/gcanti/tcomb/issues/236
 */
module.exports = t.Object;
