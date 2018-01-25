'use strict';

const exec = require('child_process').exec;
const browser = {
  start: function(executable :string, url :string) {
    let exe = process.platform === 'win32' ? "\"" + executable + "\"" : executable;
    exec(exe + " " + url, function(err :any, stdout :string, stderr :string) {
      if (err) {
        console.log(err);
        console.log(stderr);
        //throw err;
      }
    });
  },
} as Browser;

interface Browser {
  start(executable :string, url :string) :void
}

export default browser;
