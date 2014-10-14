var fs = require('fs');
var XLSX = require('xlsx');

var SHEETS = [
  'META',
  'LANDING',
  'ABOUT',
  'SUPPORTERS',
  'LOVING_COUNTY',
  'COTTON_FARMERS',
  'RESPONDERS',
  'EAGLE_FORD_ACCIDENTS',
  'KARNES',
  'FOOTBALL',
  'BUSES',
  'CHALLENGE',
  'OPPORTUNITY',
  'AIR_QUALITY',
  'COUNTING_HEADS',
  'PRISONS',
  'MAN_CAMPS',
  'CROP_DUSTER',
  'BIG_LAKE'
];

var DATA = {};

var workbook = XLSX.readFile('data.xlsx');

SHEETS.forEach(function(sheet) {
  'use strict';

  var worksheet = workbook.Sheets[sheet];

  var temp = {};

  for (var cell in worksheet) {
    if (cell[0] === '!') { continue; }
    if (cell[0] === 'A') {
      var aCell = worksheet[cell];
      var bCell = worksheet['B' + cell.match(/\d+/)[0]];

      temp[aCell.v] = bCell ? bCell.v : '';
    }
  }

  DATA[sheet] = temp;
});

fs.writeFileSync('data.json', JSON.stringify(DATA, null, 2));
