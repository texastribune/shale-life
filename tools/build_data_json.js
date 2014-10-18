var fs = require('fs');
var marked = require('marked');
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
      aCell = aCell ? aCell.v : '';

      var cellNumber = cell.match(/\d+/)[0];

      var bCell = worksheet['B' + cellNumber];
      bCell = bCell ? bCell.v : '';

      var cCell = worksheet['C' + cellNumber];
      cCell = cCell ? cCell.v : '';


      if (cCell === 'markdown') {
        bCell = marked(bCell);
      }

      temp[aCell] = bCell;
    }
  }

  DATA[sheet] = temp;
});

fs.writeFileSync('data.json', JSON.stringify(DATA, null, 2));
