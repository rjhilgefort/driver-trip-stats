#!/usr/bin/env node

const program = require('commander');
// const fs = require('mz/fs');
const app = require('./app');

const APP_VERSION = require('../package.json').version;

program
  .version(APP_VERSION)
  .usage('[options] <file ...>')
  .parse(process.argv);

app(program);
