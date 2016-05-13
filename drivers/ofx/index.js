'use strict';

const h       = require('highland')
    , driver  = require('banking');

const wrapper = h.wrapCallback((statement, cb) => {
  driver.parseFile(statement, res => {
    const transactions = res.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
    return cb(null, transactions);
  });
});

module.exports = {
  stream(statement){
    return wrapper(statement).flatten();
  }
};