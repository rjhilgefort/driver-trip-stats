const { pipe } = require('ramda');
const chalk = require('chalk');

const success =
  pipe(
    chalk.green,
    console.log
  );

const error =
  pipe(
    chalk.red,
    console.log
  );

module.exports = {
  success,
  error
};
