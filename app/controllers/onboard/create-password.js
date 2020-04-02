import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OnboardCreatePasswordController extends Controller {
  @service notification;
  @service onboarding;
  @service passwordManager;

  @tracked hasAcceptedTerms = false;
  @tracked showUserAgreement = false;

  get isUpdateBtnEnabled() {
    return (
      this.passwordManager.isValidPassword &&
      this.passwordManager.isPasswordMatch &&
      this.hasAcceptedTerms
    );
  }

  @action
  onCheckPasswordMatch() {
    this.passwordManager.checkPasswordMatch();
  }

  @action
  async onCreatePassword(event) {
    event.preventDefault();

    try {
      let data = {
        password: this.passwordManager.password,
        confirm_password: this.passwordManager.passwordConfirmation,
      };

      await this.onboarding.sendPassword(data);

      this.notification.success('Your password has been saved.');
      this.replaceRoute('onboard.add-credentials');
    } catch (e) {
      this.notification.error(e);
    }
  }

  @action
  onToggleUserAgreement(bool) {
    this.showUserAgreement = bool;
  }
}
