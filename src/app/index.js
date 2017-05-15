const { pipeProgram } = require('../utils');
const { Program } = require('../types');
const extract = require('../extract');
const transform = require('../transform');
const load = require('../load');
const { success, error } = require('./echo');

// all side effects exist in this module
// bootstrapping module
const app = data =>
  pipeProgram(
    Program,
    extract,
    transform,
    load
  )(data)
    .then(
      success,
      error
    );

module.exports = app;
