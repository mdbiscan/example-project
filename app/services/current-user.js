import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { get } from '@ember/object';

export default class CurrentUserService extends Service {
  @service session;
  @service store;

  @tracked user;

  get settings() {
    return get(this.user, 'setting');
  }

  @computed('user.setting.timezone')
  get timezone() {
    return get(this.settings, 'timezone');
  }

  async load() {
    let id = this.session.data.authenticated.tokenData.sub;
    this.user = await this.store.findRecord('user', id);
  }
}
