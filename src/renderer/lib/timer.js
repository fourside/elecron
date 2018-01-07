'use strict';

const CronJob = require('cron').CronJob;
const timer = {
  job : null,
  start: function(cb) {
    this.job = new CronJob({
      cronTime: '0 0 9 * * 1-5',
      onTick: cb,
      start: true,
      timeZone: 'Asia/Tokyo'
    });
  },
  stop: function() {
    if (this.job) {
      this.job.stop();
    }
  }
}

module.exports = timer;
