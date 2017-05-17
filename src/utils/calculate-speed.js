const { curry } = require('ramda');

module.exports = curry(
  (distance, duration) =>
    Math.round(distance / duration * 60)
);
