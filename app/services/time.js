import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class TimeService extends Service {
  @service currentUser;

  @tracked now = '00:00:00';

  get offset() {
    return moment.tz(moment(), this.userZoneName).format('Z');
  }

  get timezone() {
    return moment.tz(moment(), this.userZoneName).format('z');
  }

  get userZoneName() {
    if (this.currentUser.timezone && this.currentUser.timezone !== 'System') {
      return this.currentUser.timezone;
    } else {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
  }

  count() {
    let now = moment(new Date().toISOString());

    this.now = now.tz(this.userZoneName).format('HH:mm:ss');
  }

  start() {
    this._interval = setInterval(() => this.count(), 1000);
  }

  stop() {
    if (this._interval) {
      clearInterval(this._interval);

      this._interval = null;
    }
  }
}
