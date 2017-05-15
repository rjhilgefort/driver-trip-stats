// const {   } = require('ramda');
const t = require('tcomb');
const app = require('./index');
const { cli } = require('../test-fixtures');


describe('`app`:', () => {
  describe('Interface', () => {
    test('exports a function', () => {
      t.Function(app);
    });

    test('returns a promise', () => {
      expect(
        app(cli.example)
      ).toBeInstanceOf(Promise);
    });
  });
});
