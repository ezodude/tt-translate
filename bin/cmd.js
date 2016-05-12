#! /usr/bin/env node

'use strict';

const program       = require('commander')
    , chalk         = require('chalk');

program
.usage('[options] <statement.(ofx|pdf|csv)>')
.description('Part of the Tell Tally suite. Translates UK bank statements into a legible JSON format.')
.arguments('<file>')
.action((file) => {
  console.log('Hello World!');
})
.parse(process.argv);

if (!program.args.length) program.help();