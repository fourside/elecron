'use strict';

import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import App from './App.vue';
import VeeValidate from 'vee-validate';
import path from 'path';

import { remote } from 'electron';
const timer = remote.require('./src/renderer/lib/timer');

Vue.use(VeeValidate);

new Vue({
  el: '#app',
  render: h => h(App)
})

const cronValidator = {
  getMessage(field, args) {
    return "value is not a valid format.";
  },
  validate(value) {
    return timer.isValid(value);
  }
};
VeeValidate.Validator.extend('cron', cronValidator);
