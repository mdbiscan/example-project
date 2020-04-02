import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';

import {
  validatePhoneNumber,
} from 'example/utils/input-validators';

export default class OnboardAddCredentialsController extends Controller {
  @service notification;
  @service onboarding;

  @tracked firstName;
  @tracked lastName;
  @tracked workPhone;
  @tracked workPhoneError = false;

  get isSubmitDisabled() {
    return !this.isValidWorkPhone ||
      isEmpty(this.firstName) ||
      isEmpty(this.lastName) ||
      isEmpty(this.workPhone);
  }

  get isValidWorkPhone() {
    return validatePhoneNumber(this.workPhone);
  }

  @action
  onValidatePhoneNumber() {
    this.workPhoneError = !this.isValidWorkPhone;
  }

  @action
  async onUpdateCredentials(event) {
    event.preventDefault();

    try {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        workPhone: this.workPhone,
      };

      await this.onboarding.sendCredentials(data);

      this.onboarding.clearToken();
      this.notification.success('Your information has been updated.');
      this.transitionToRoute('onboard.complete');
    } catch (e) {
      this.notification.error(e);
    }
  }
}
