#! /usr/bin/env node

'use strict';

const program   = require('commander')
    , chalk     = require('chalk')
    , fs        = require('fs')
    , path      = require('path')
    , h         = require('highland')
    , mkdirp    = require('mkdirp')
    , translate = require('../');

program
.usage('[options] <statement.(ofx|pdf|csv)>')
.description('Part of the Tell Tally suite. Translates UK bank statements into a legible JSON format.')
.arguments('<statement>')
.option('-o, --out <directory-path>', 'Optional output directory (defaults to \'translations\').')
.action( statement => {
  const outputDirectory = program.out || 'translations';
  mkdirp.sync(outputDirectory);

  const writeStream = h(fs.createWriteStream(path.join(outputDirectory, 'charges.json')));
  const translation = translate(statement);
  translation
  .stream()
  .doto(console.log)
  .pipe(fs.createWriteStream(path.join(outputDirectory, 'charges.json')))
  .on('error', (err) => {
    console.error('err', err);
  })
  .on('finish', () => {
    console.log('Charges ready!');
  });

})
.parse(process.argv);

if (!program.args.length) program.help();