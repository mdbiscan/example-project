import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class AuthenticatedRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service currentUser;
  @service menu;
  @service notification;
  @service time;

  async model() {
    if (!this.currentUser.user) {
      try {
        await this.currentUser.load();
      } catch (error) {
        this.notification.error(error)
      }
    }
  }

  @action
  willTransition(/* transition */) {
    this.menu.close();
  }

  @action
  activate() {
    this.time.start();
  }

  @action
  deactivate() {
    this.menu.close();
    this.time.stop();
  }
}
