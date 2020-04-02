import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import { validateEmail } from 'example/utils/input-validators';
import url from 'example/types/url';

export default class ApplicationController extends Controller {
  @service api;
  @service notification;
  @service session;

  @tracked email = '';
  @tracked emailError = false;
  @tracked isResetSentSuccess = false;

  get isResetDisabled() {
    return !this.isValidEmail || isEmpty(this.email);
  }

  get isValidEmail() {
    return validateEmail(this.email);
  }

  @action
  onValidateEmail() {
    return this.emailError = !this.isValidEmail;
  }

  @action
  async onReset(event) {
    event.preventDefault();

    let data = {
      user: {
        email: this.email,
      },
    };

    try {
      await this.api.post(url.USER_PASSWORD, data);

      this.email = '';
      this.isResetSentSuccess = true;
    } catch(error) {
      this.notification.error(error.errors || error);
    }
  }
}
