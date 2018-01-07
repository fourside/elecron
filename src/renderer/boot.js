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
    this.read();
    this.run();
  },
  methods: {
    read: function() {
      config.read(function(data) {
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
      timer.start(function() {
        browser.start(this.settings.url);
      });
    },
    stop: function() {
      timer.stop();
    },
    reload: function() {
      this.read();
      this.stop();
      this.run();
    }
  }
});



