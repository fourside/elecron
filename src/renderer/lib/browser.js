'use strict';

const exec = require('child_process').exec;
const browser = {
  start: function(executable, url) {
    let exe = process.platform === 'win32' ? "\"" + executable + "\"" : executable;
    exec(exe + " " + url, function(err, stdout, stderr) {
      if (err) {
        console.log(err);
        console.log(stderr);
        //throw err;
      }
    });
  },
}

module.exports = browser;
