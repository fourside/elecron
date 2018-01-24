'use strict';

import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import App from './App.vue';
import VeeValidate from 'vee-validate';
import timer from './lib/timer';

const cronValidator = {
  getMessage() :string {
    return "value is not a valid format.";
  },
  validate(value :string) :boolean {
    return timer.isValid(value);
  }
};
VeeValidate.Validator.extend('cron', cronValidator);

Vue.use(VeeValidate);

new Vue({
  el: '#app',
  render: h => h(App)
});

