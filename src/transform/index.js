const { T, always, cond, pipe, reduce, replace, test } = require('ramda');
const t = require('tcomb');
const processDriverCommand = require('./process-driver-command');
const processTripCommand = require('./process-trip-command');

const driverRegexp = /^Driver /;
const tripRegexp = /^Trip /;

/**
 * This modules purpose is to "transform" the data from it's initial state to whatever format
 * needed to be ingested into the target system. In this case, we're cleaning it and doing
 * some minor computation before considering it ready to be "loaded".
 */
const transform = data =>
  pipe(
    t.Array,
    reduce(
      (store, command) =>
        cond([
          [
            test(driverRegexp),
            pipe(
              replace(driverRegexp, ''),
              processDriverCommand(store)
            )
          ],
          [
            test(tripRegexp),
            pipe(
              replace(tripRegexp, ''),
              processTripCommand(store)
            )
          ],
          [T, always(store)]
        ])(command),
      {}
    )
  )(data);

module.exports = transform;
