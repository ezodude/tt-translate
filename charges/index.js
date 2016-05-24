'use strict';

const h         = require('highland')
    , _         = require('lodash')
    , moment    = require('moment')
    , money     = require("money-math");

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

module.exports = new Parser().pipeline();