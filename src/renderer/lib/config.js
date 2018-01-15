'use strict';

const fs = require('fs');
const path = require('path');

const configPath = path.join('elecron.config.js');
const config = {
  read: function(cb) {
    return new Promise(function(resolve, reject) {
      fs.readFile(configPath, 'utf-8', (err, data) => {
        if (err) throw err;
        resolve(cb(data));
      });
    });
  },
  write: function(json) {
    fs.writeFile(configPath, JSON.stringify(json, null, '  '), (err) => {
      if (err) throw err;
    });
  },
}

module.exports = config;
