module.exports = {
  program: {
    example: {
      args: ['./data/example.txt']
    },
    missing: {
      args: ['./foo/bar.txt']
    }
  },
  file: {
    example: [
      'Driver Dan',
      'Driver Alex',
      'Driver Bob',
      'Trip Dan 07:15 07:45 17.3',
      'Trip Dan 06:12 06:32 21.8',
      'Trip Alex 12:01 13:16 42.0',
      ''
    ]
  },
  tcomb: {
    invalidValue: /\[tcomb\] Invalid value/
  },
  types: {
    array: ['foo', 'bar', 'baz'],
    string: 'foo'
  }
};
