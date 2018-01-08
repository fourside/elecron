'use strict';

const path = require('path');
const { remote } = require('electron');

const timer = remote.require(path.join(__dirname, '/renderer/lib/timer'));
const browser = remote.require(path.join(__dirname, '/renderer/lib/browser'));
const config = remote.require(path.join(__dirname, '/renderer/lib/config'));

const vm = new Vue({
  el: '#app',
  data: {
    settings: {},
  },
  created: function() {
    this.read().then(this.run);
  },
  methods: {
    read: function() {
      return config.read(function(data) {
        const json = JSON.parse(data);
        vm.settings = json.settings;
      });
    },
    save: function() {
      timer.stop();
      const json = {
        settings: this.settings
      }
      config.write(json);
      this.run();
    },
    run: function() {
      timer.start(this.settings.cron, function() {
        browser.start(vm.settings.browserPath, vm.settings.url);
      });
    },
    reload: function() {
      timer.stop();
      this.read(this.run);
    }
  }
});


