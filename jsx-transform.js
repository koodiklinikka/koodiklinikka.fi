'use strict';

var through = require('through2');
var jsx = require('jsx-transform');

module.exports = function(file) {
  return through(function (buf, enc, next) {
    this.push(jsx.transform(buf.toString('utf8'), {
      ignoreDocblock: true,
      jsx: 'h'
    }));
    next();
  });
};
