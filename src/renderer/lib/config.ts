'use strict';

const fs = require('fs');
const path = require('path');
import Settings from './settings';

const configPath = path.join('elecron.config.js');
const config = {
  read: function() :string {
    return fs.readFileSync(configPath, 'utf-8');
  },
  write: function(json :Settings) {
    fs.writeFile(configPath, JSON.stringify(json, null, '  '), (err :any) => {
      if (err) throw err;
    });
  },
} as Config;

interface Config {
  read() :string;
  write(settings :Settings) :void;
}
export default config;
