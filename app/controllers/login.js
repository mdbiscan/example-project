import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import { validateEmail } from 'example/utils/input-validators';

export default class ApplicationController extends Controller {
  @service session;
  @service currentUser;
  @service notification;

  @tracked email = '';
  @tracked emailError = false;
  @tracked password = '';

  get isLoginDisabled() {
    return !this.isValidEmail ||
      isEmpty(this.email) ||
      isEmpty(this.password);
  }

  get isValidEmail() {
    return validateEmail(this.email);
  }

  @action
  onValidateEmail() {
    this.emailError = !this.isValidEmail;
  }

  @action
  async onLogin(event) {
    event.preventDefault();

    let data = {
      user: {
        email: this.email,
        password: this.password,
      },
    };

    try {
      await this.session.authenticate('authenticator:jwt', data);

      this.email = '';
      this.password = '';
    } catch(error) {
      this.notification.error(error.errors || error);
    }
  }
}
