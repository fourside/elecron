'use strict';

const CronJob = require('cron').CronJob;
const timer = {
  jobs : [],
  start: function(cronTime, cb) {
    const job = new CronJob({
      cronTime: cronTime,
      onTick: cb,
      start: true,
      timeZone: 'Asia/Tokyo'
    });
    this.jobs.push(job);
  },
  stop: function() {
    this.jobs.forEach(function(job) {
      job.stop();
    });
    this.jobs = [];
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
