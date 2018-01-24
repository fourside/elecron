<template>
<div id="app">
  <h1>Elecron</h1>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">
        <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
        Settings
      </h3>
    </div>
    <div class="panel-body">
      <form class="settings-form" @submit.prevent="">

        <div class="form-group settings-input" v-for="(cron, i) in conf.settings.cron">
            <label :for="'cron'+i" class="control-label">Cron {{ i }}</label>
          <div>
              <input type="text" class="form-control" :id="'cron'+i" :name="'cron'+i" v-model="conf.settings.cron[i]" v-validate="'required|cron'" :class="{'has-error': errors.has(`cron${i}`) }">
              <p v-show="errors.has('cron'+i)" class="help has-error">{{ errors.first('cron'+i) }}</p>
          </div>
        </div>

        <div class="form-group settings-input">
          <label for="url" class="control-label">URL</label>
          <div>
            <input type="text" class="form-control" id="url" name="url" v-model="conf.settings.url" v-validate="'required'" :class="{'has-error': errors.has('url') }">
            <p v-show="errors.has('url')" class="help has-error">{{ errors.first('url') }}</p>
          </div>
        </div>

        <div class="form-group settings-input">
          <label for="browserPath" class="control-label">Browser Path</label>
          <div>
            <input type="text" class="form-control" id="browserPath" name="browserPath" v-model="conf.settings.browserPath" v-validate="'required'" :class="{'has-error': errors.has('browserPath') }">
            <p v-show="errors.has('browserPath')" class="help has-error">{{ errors.first('browserPath') }}</p>
          </div>
        </div>
        <div class="form-group settings-button">
            <button type="button" class="btn btn-default" v-on:click="reload">Reload</button>
            <button type="button" class="btn btn-default" v-on:click="save" :disabled="! savable">Save</button>
            <button type="button" class="btn btn-default" v-on:click="run" :disabled="! runnable">Run</button>
        </div>
        <div class="interaction">
          <transition name="fade">
            <p>
              <span v-if="interaction">{{ interaction }}</span>
            </p>
          </transition>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script lang="ts">

import Vue from 'vue';
import { ErrorBag, ErrorField } from 'vee-validate';

import timer from  './lib/timer';
import browser from  './lib/browser';
import config from  './lib/config';
import Settings from './lib/settings';

interface Data {
    conf: Settings;
    interaction :string;
    errors: ErrorBag;
}
export default Vue.extend({
  data: function() :Data {
    return {
      conf: {},
      interaction: ""
    } as Data;
  },
  created: function() {
    this.read();
    this.cronRun();
  },
  methods: {
    read: function() {
      const conf = config.read();
      this.conf = JSON.parse(conf) as Settings;
    },
    save: function() {
      timer.stop();
      config.write(this.conf);
      this.cronRun();
      this.setInteraction("Saved!");
    },
    run: function() {
      browser.start(this.conf.settings.browserPath, this.conf.settings.url);
    },
    cronRun: function() {
      this.conf.settings.cron.forEach((cron :string) => {
        timer.start(cron, () => {
          this.run();
        });
      })
    },
    reload: function() {
      timer.stop();
      this.read();
      this.cronRun();
      this.$validator.reset();
      this.setInteraction("Reload!");
    },
    setInteraction: function(message :string) {
      this.interaction = message;
      setTimeout(() => {
        this.interaction = "";
      }, 2000);
    }
  },
  computed: {
    savable: function() :boolean {
      return this.errors.all().length === 0;
    },
    runnable: function() :boolean {
      const hasError = this.errors.items.some(function(err :ErrorField) {
        return err.field === 'url' || err.field === 'browserPath';
      });
      return !hasError;
    },
  }
});
</script>

<style>
#app {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}

.settings-input {
  display: flex;
}
.settings-input label {
  width: 15%;
  margin-top: auto;
  margin-bottom: auto;
}
.settings-input div {
  flex: 1;
}
.settings-input input.has-error {
  flex: 1;
  border: 1px solid #ff3860;
}
.settings-button {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 0;
}
.settings-button button {
  margin-left: 5px;
}
.interaction p {
  text-align: right;
  margin-bottom: 0;
  min-height: 24px;
}
.help {
  margin: 0;
}
.has-error {
  color: #ff3860;
}

.fade-leave-active {
  transition: opacity .5s;
}
.fade-leave-to {
  opacity: 0;
}
</style>
