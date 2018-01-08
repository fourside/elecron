'use strict';

const { remote } = require('electron');
const timer = remote.require('./renderer/lib/timer');
const browser = remote.require('./renderer/lib/browser');
const config = remote.require('./renderer/lib/config');

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
      const json = {
        settings: this.settings
      }
      config.write(json);
    },
    run: function() {
      timer.start(this.settings.cron, function() {
        browser.start(this.settings.browserPath, this.settings.url);
      });
    },
    stop: function() {
      timer.stop();
    },
    reload: function() {
      this.stop();
      this.read(this.run);
    }
  }
});



