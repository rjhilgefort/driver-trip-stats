const tripFromCommand = require('./trip-from-command');

describe('tripFromCommand', () => {
  test('smoke test- expected use case', () => {
    const command = 'Alex 12:00 13:00 60.0';
    const expected = {
      driver: 'Alex',
      duration: 60,
      distance: 60,
      speed: 60
    };
    expect(tripFromCommand(command)).toEqual(expected);
  });

  // NOTE: Not handling various ways the string could be formatted incorrectly
  //       because it wasn't necessarily asked for and I was running out the allotted
  //       time I set out for myself to do this.
});
