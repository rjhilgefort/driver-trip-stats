const { tap } = require('ramda');
const { pipeProgram } = require('../utils');
const { Program } = require('../types');
const extract = require('../extract');
const transform = require('../transform');
const load = require('../load');
const { error, log, success } = require('../utils/echo');

// all side effects exist in this module
// bootstrapping module
const app = data =>
  pipeProgram(
    Program,
    tap(() => log('\n\n Extracting data...')),
    extract,
    tap(() => log('\n\n Transforming data...')),
    transform,
    tap(() => log('\n\n Printing results...')),
    load
  )(data)
    .then(
      success,
      error
    );

module.exports = app;
