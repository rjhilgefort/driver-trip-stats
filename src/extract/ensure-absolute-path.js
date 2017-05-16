const { complement, curryN, when } = require('ramda');
const path = require('path');
const appRoot = require('app-root-path').toString();


/**
 * Checks to see if a given path is absolute and ensures that it is by
 * joining with the application root.
 *
 * String -> String
 */
module.exports =
  when(
    complement(path.isAbsolute),
    curryN(2, path.join)(appRoot)
  );
