import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import timezones from 'example/types/timezones';
import moment from 'moment';

export default class AuthenticatedSettingsController extends Controller {
  @service notification;
  @service time;

  get isUpdateDisabled() {
    return !this.model.hasDirtyAttributes;
  }

  get timezoneOptions() {
    return timezones.map(value => {
      let label;
      if (value === 'System') {
        label = 'My Location';
      } else {
        let offset = moment.tz(moment(), value).format('Z');
        let timezone = moment.tz(moment(), value).format('z');

        label = `${timezone} (GMT${offset})`;
      }

      return {
        label,
        value,
      };
    });
  }

  @action
  async onUpdateSettings(event) {
    event.preventDefault();

    try {
      await this.model.save();

      this.notification.success('Your settings have been saved.');
    } catch (error) {
      this.notification.error(error);
    }
  }
}
