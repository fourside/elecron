'use strict';

const CronJob = require('cron').CronJob;
const timer = {
  job : null,
  start: function(cronTime, cb) {
    this.job = new CronJob({
      cronTime: cronTime,
      onTick: cb,
      start: true,
      timeZone: 'Asia/Tokyo'
    });
  },
  stop: function() {
    if (this.job) {
      this.job.stop();
    }
  },
  isValid: function(cronTime) {
    try {
      const j = new CronJob(cronTime);
      j.stop();
      return true;
    } catch(ignore) {
      return false;
    }
  }
}

module.exports = timer;
