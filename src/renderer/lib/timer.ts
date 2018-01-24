'use strict';

import { CronJob }  from 'cron';

const timer = {
  jobs : [],
  start: function(cronTime :string, cb :() => void) {
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
  isValid: function(cronTime :string) {
    try {
      const j = new CronJob(cronTime, () => {});
      j.stop();
      return true;
    } catch(ignore) {
      return false;
    }
  }
} as Timer;

interface Timer {
  jobs : CronJob[];
  start(cronTime :string, cb :() => void) :void;
  stop() :void
  isValid(cronTime :string) :boolean
}
export default timer;
