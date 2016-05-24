'use strict';

const h         = require('highland')
    , stringify = require('highland-json').stringify
    , ofxStream = require('./drivers/default').stream
    , charges   = require('./charges');

module.exports = Translator;

function Translator(statement) {
  if (!(this instanceof Translator)) return new Translator(statement);
  this.parse(statement);
}

Translator.prototype.parse = function (statement) {
  this.transactions =
    ofxStream(statement)
    .through(charges)
    .stopOnError(e => console.error('Err', e));
  return this;
};

Translator.prototype.stream = function () {
  return h(this.transactions).through(stringify);
};