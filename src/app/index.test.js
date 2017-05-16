const t = require('tcomb');
const app = require('./index');
const { program } = require('../test-fixtures');

describe('app', () => {
  test('exports a function', () => {
    t.Function(app);
  });

  test('returns a promise', () => {
    expect(app(program.example)).toBeInstanceOf(Promise);
  });
});
