import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedController extends Controller {
  @service notification;
  @service session;

  @action
  onLogout() {
    // Invalidates token and reloads
    // the window to /login
    this.session.invalidate();
  }
}
