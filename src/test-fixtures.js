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
  store: {
    minimal: {
      Dan: [
        {
          duration: 60,
          distance: 60,
          speed: 60
        }
      ]
    },
    example: {
      Dan: [
        {
          duration: 20,
          distance: 22,
          speed: 66
        },
        {
          duration: 30,
          distance: 17,
          speed: 34
        }
      ],
      Alex: [
        {
          duration: 75,
          distance: 42,
          speed: 34
        }
      ],
      Bob: []
    }
  },
  tcomb: {
    invalidValue: /\[tcomb\] Invalid value/
  },
  types: {
    array: ['foo', 'bar', 'baz'],
    object: { foo: 'foo', bar: 'bar', baz: 'baz' },
    string: 'foo',
    number: 2,
    boolean: false
  }
};
