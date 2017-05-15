const t = require('tcomb');

module.exports = (error) => {
  t.union([t.String, t.Object])(error);
  throw error;
};
