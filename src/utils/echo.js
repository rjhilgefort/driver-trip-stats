const { pipe, prop } = require('ramda');
const chalk = require('chalk');

const generator = chalkColor =>
  pipe(
    prop(chalkColor, chalk),
    // eslint-disable-next-line no-console
    console.log
  );

const error = generator('red');
const log = generator('blue');
const success = generator('green');
const warning = generator('yellow');

module.exports = {
  error,
  log,
  success,
  warning
};
