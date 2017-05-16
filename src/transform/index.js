const { T, always, cond, pipe, reduce, replace, test } = require('ramda');
const t = require('tcomb');
const processDriverCommand = require('./process-driver-command');

const driverRegexp = /^Driver /;
// const tripRegexp = /^Trip /;

const transform = data =>
  pipe(
    t.Array,
    reduce(
      (store, command) =>
        cond([
          [test(driverRegexp), pipe(
            replace(driverRegexp, ''),
            processDriverCommand(store)
          )],
          // [test(/^Trip/), processTripCommand(store)],
          [T, always(store)]
          // [T, (command) => {
          //   console.log(store);
          //   console.log(command);
          //   return store;
          // }]
        ])(command),
      {}
    )
  )(data);

module.exports = transform;
