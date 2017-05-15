const { head, prop } = require('ramda');
const { pipeProgram } = require('../utils');
const { Program } = require('../types');

const extract = data =>
  pipeProgram(
    Program,
    prop('args'),
    head
  )(data);

module.exports = extract;
