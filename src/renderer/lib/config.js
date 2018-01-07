'use strict';

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', '..', 'elecron.config.js');
const config = {
  read: function(cb) {
    fs.readFile(configPath, 'utf-8', (err, data) => {
      cb(data);
    });
  },
  write: function(json) {
    fs.writeFile(configPath, JSON.stringify(json, null, '  '), (err) => {
      if (err) throw err;
    });
  },
}

module.exports = config;
