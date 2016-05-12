'use strict';

const h         = require('highland')
    , stringify = require('highland-json').stringify;

module.exports = Translator;

function Translator(statement) {
  if (!(this instanceof Translator)) return new Translator(statement);
  this.parse(statement);
}

Translator.prototype.parse = function (statement) {
  return this;
};

Translator.prototype.streamJson = function () {
  const input = [
    { a : "b", b : "c" },
    { a : [1, 2, 3] },
    [ 1, 2, 3 ],
    [ { a : "b", b : "c" } ]
  ];

  return h(input).through(stringify);
};