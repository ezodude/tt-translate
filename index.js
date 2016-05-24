'use strict';

const h         = require('highland')
    , stringify = require('highland-json').stringify
    , _         = require('lodash')
    , moment    = require('moment')
    , money     = require("money-math")
    , ofxStream = require('./drivers/default').stream;

const Parser = function(){};

Parser.CHARGE_TYPES = ['debit', 'pos', 'directdebit', 'atm', 'xfer'];

Parser.prototype.baseline = function(c){
  const memo = _.isString(c.MEMO) ? ` ${c.MEMO}` : '';
  const source = `${c.NAME}${memo}`;
  const value = Number.parseFloat(c.TRNAMT, 10);
  const normalised = money.floatToAmount(value < 0 ? (-1 * value) : value);

  return {
    date: moment.utc(c.DTPOSTED).toISOString(),
    type: c.TRNTYPE.toLowerCase(),
    source: source,
    value: normalised
  }
};

Parser.prototype.chargesOnly = function(c) {
  return _.includes(Parser.CHARGE_TYPES, c.type)
};

Parser.prototype.pipeline = function(){
  return h.pipeline(
    h.map(this.baseline),
    h.filter(this.chargesOnly)
  );
};

const chargeParser = new Parser().pipeline();

module.exports = Translator;

function Translator(statement) {
  if (!(this instanceof Translator)) return new Translator(statement);
  this.parse(statement);
}

Translator.prototype.parse = function (statement) {
  this.transactions =
    ofxStream(statement)
    // .doto(tran => console.log(JSON.stringify(tran)))
    .through(chargeParser)
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