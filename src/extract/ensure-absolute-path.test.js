const ensureAbsolutePath = require('./ensure-absolute-path');

describe('ensureAbsolutePath', () => {
  test('Returns the given absolute path when no action necessary', () => {
    const absolutePath = '/home/user/foo/project/data/example.txt';
    expect(
      ensureAbsolutePath(absolutePath)
    ).toEqual(absolutePath);
  });

  test('Forms an absolute path to the project root when given relative path', () => {
    expect(
      ensureAbsolutePath('./data/example.txt')
    ).toEqual('/Users/rjhilgefort/Projects/root/data/example.txt');
  });
});
