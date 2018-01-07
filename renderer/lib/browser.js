'use strict';

const exec = require('child_process').exec;
const browser = {
  start: function(url) {
    // TODO
    exec("start microsoft-edge:" + url);
  },
}

module.exports = browser;
