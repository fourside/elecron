'use strict';

const { remote } = require('electron');
const timer = remote.require('./renderer/lib/timer');
const browser = remote.require('./renderer/lib/browser');
const config = remote.require('./renderer/lib/config');

const url = 'file://' + __dirname + '/index.html';
timer.start(function() {
  browser.start(url);
});

config.read(function(data) {
  console.log(data);
});
