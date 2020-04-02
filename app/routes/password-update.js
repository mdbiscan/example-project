import UnauthenticatedRouteRoute from 'example/routes/unauthenticated';
import { inject as service } from '@ember/service';

export default class PasswordUpdateRoute extends UnauthenticatedRouteRoute {
  @service passwordManager;
  @service notification;

  model() {
    this.passwordManager.loadToken();
  }

  redirect() {
    if (!this.passwordManager.token) {
      this.notification.info('We could not find your reset password token.');
      this.transitionTo('login');
    }
  }
}
