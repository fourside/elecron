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
  methods: {
  }
})

config.read(function(data) {
  const json = JSON.parse(data);
  vm.settings = json.settings;
  timer.start(function() {
    browser.start(settings.url);
  });
});

