const { __, curryN, head, prop, split } = require('ramda');
const fs = require('mz/fs');
const { pipeProgram } = require('../utils');
const { Program } = require('../types');
const ensureAbsolutePath = require('./ensure-absolute-path');

const extract = data =>
  pipeProgram(
    Program,
    prop('args'),
    head,
    ensureAbsolutePath,
    curryN(2, fs.readFile)(__, 'utf8'),
    split('\n')
  )(data);

module.exports = extract;
