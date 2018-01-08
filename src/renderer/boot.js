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
    this.read().then(this.cronRun);
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
      this.cronRun();
    },
    run: function() {
      browser.start(vm.settings.browserPath, vm.settings.url);
    },
    cronRun: function() {
      timer.start(this.settings.cron, function() {
        vm.run();
      });
    },
    reload: function() {
      timer.stop();
      this.read(this.cronRun);
    }
  }
});

