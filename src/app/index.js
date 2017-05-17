const { always, pipe, ifElse, concat, tap, map } = require('ramda');
const { pipeProgram } = require('../utils');
const { Program } = require('../types');
const extract = require('../extract');
const transform = require('../transform');
const load = require('../load');
const { error, log, success } = require('../utils/echo');

/**
 * This module is meant to be the bootstrapping module for the other modules, which
 * have more specialized tasks. The original aim was to keep all side-effects to this
 * module (all console logs), but some side-effects exist for convenient error reporting
 * in the other modules.
 */
const app = data =>
  pipeProgram(
    Program,
    tap(() => log('\nExtracting data...')),
    extract,
    tap(() => log('\nTransforming data...')),
    transform,
    tap(() => log('\nLoading results...')),
    load
  )(data)
    .then(
      map(
        ({ driver, distance, speed }) =>
          pipe(
            ifElse(
              isNaN,
              always(''),
              always(` @ ${speed} mph`)
            ),
            concat(`${driver}: ${distance} miles`),
            success
          )(speed)
      ),
      error
    );

module.exports = app;
