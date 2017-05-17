const duration = require('./duration');

describe('duration', () => {
  describe('returns correct duration', () => {
    test('within the same hour', () => {
      const expected = 45;
      expect(duration('12:00', '12:45')).toEqual(expected);
    });

    test('over multiple hours', () => {
      const expected = 8 * 60 + 45;
      expect(duration('01:00', '9:45')).toEqual(expected);
    });

    test('for the entire day', () => {
      const expected = 24 * 60 - 1;
      expect(duration('00:00', '23:59')).toEqual(expected);
    });
  });

  // NOTE: Requirements specified that the following would not occur,
  //       so no tests were written for...
  //       - end time before start time
  //       - times crossing the day barrier
  //       - assumption is that '00:00' will occur, while '24:00' will not.
});
