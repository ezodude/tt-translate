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
    // .doto(tran => console.log(JSON.stringify(tran)))
    // .through(chargeParser)
    .through(charges)
    .doto(tran => console.log(JSON.stringify(tran)))
    .stopOnError(e => console.error('Err', e))
    .done(() => console.log('DONE!'));
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