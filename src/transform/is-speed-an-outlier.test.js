const isSpeedAnOutlier = require('./is-speed-an-outlier');

describe('isSpeedAnOutlier', () => {
  const harness = (speed, expected) =>
    expect(isSpeedAnOutlier({ speed })).toEqual(expected);

  describe('returns true when speed is outside range', () => {
    test('less than 5', () => {
      harness(3, true);
    });
    test('greater than 100', () => {
      harness(500, true);
    });
  });

  describe('returns false when speed is valid', () => {
    test('inside range', () => {
      harness(50, false);
    });
    test('on boundaries', () => {
      harness(5, false);
      harness(100, false);
    });
  });
});
