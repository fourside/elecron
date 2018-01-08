'use strict';

const exec = require('child_process').exec;
const browser = {
  start: function(executable, url) {
    exec(executable + " " + url, function(err, stdout, stderr) {
      if (err) {
        console.log(stderr);
        throw err;
      }
    });
  },
}

module.exports = browser;
