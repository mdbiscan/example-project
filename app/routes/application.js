import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default class ApplicationRoute extends Route.extend(ApplicationRouteMixin) {
  @service notification;

  routeAfterAuthentication = 'authenticated';

  @action
  willTransition(/* transition */) {
    let errors = this.notification.messages.filterBy('type', 'error');

    if (errors.length > 0) {
      this.notification.clearErrors()
    }
  }
}
