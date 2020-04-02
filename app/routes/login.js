import UnauthenticatedRouteRoute from 'example/routes/unauthenticated';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginRoute extends UnauthenticatedRouteRoute {
  @service notification;
  @service session;

  routeIfAlreadyAuthenticated = 'authenticated';

  @action
  willTransition(/* transition */) {
    this.notification.clearAllMessages();
  }
}
