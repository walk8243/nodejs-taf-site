fs      = require('fs'),
myFunc  = require('./func.js'),
error   = require('./error.js');

var libFiles = [];
myFunc.readDir('./ldib', libFiles);
console.log(libFiles);
