import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedSettingsRoute extends Route {
  @service currentUser;

  async model() {
    return await this.currentUser.settings;
  }

  @action
  willTransition() {
    if (this.context && this.context.hasDirtyAttributes) {
      this.context.rollbackAttributes();
    }
  }
}
