import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PasswordUpdateController extends Controller {
  @service notification;
  @service passwordManager;

  get isUpdateBtnEnabled() {
    return this.passwordManager.isValidPassword && this.passwordManager.isPasswordMatch;
  }

  @action
  onCheckPasswordMatch() {
    this.passwordManager.checkPasswordMatch();
  }

  @action
  async onCreatePassword(event) {
    event.preventDefault();

    try {
      await this.passwordManager.updatePassword();

      this.notification.success('Your password has been saved.');
      this.replaceRoute('login');
    } catch (e) {
      this.notification.error(e);
    }
  }
}
