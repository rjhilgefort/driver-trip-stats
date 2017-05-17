const { program, file, types } = require('../test-fixtures');
const extract = require('./index');

describe('extract', () => {
  test('accepts a well formed `program` and nothing else', () => {
    const harness = data =>
      expect(extract(data)).rejects.toBeDefined();
    return Promise.all([
      expect(extract(program.example)).toBeInstanceOf(Promise),
      harness({}),
      harness(types.array),
      harness(types.string)
    ]);
  });

  test('throws when file is missing', () =>
    expect(extract(program.missing)).rejects.toBeDefined()
  );

  test('returns an array of strings representing file', () =>
    expect(extract(program.example)).resolves.toEqual(file.example)
  );
});
