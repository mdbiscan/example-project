import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import url from 'example/types/url';
import {
  validateLength,
} from 'example/utils/input-validators';

const RESET_PASSWORD_TOKEN = 'reset_password_token';

export default class PasswordService extends Service {
  @service api;

  @tracked passwordConfirmation = '';
  @tracked passwordConfirmationError = false;
  @tracked passwordConfirmationSuccess = false;
  @tracked password = '';
  @tracked passwordError = false;

  get passwordConfirmationMessage() {
    if (this.passwordConfirmationError) {
      return 'Passwords do not match.';
    } else if (this.passwordConfirmationSuccess) {
      return 'Passwords match.';
    } else {
      return null;
    }
  }

  get hasMinimumCharacters() {
    return validateLength(this.password, 10);
  }

  get isPasswordMatch() {
    return this.password && this.password === this.passwordConfirmation;
  }

  get isValidPassword() {
    return this.hasMinimumCharacters;
  }

  checkPasswordMatch() {
    if (this.passwordConfirmation) {
      this.passwordConfirmationError = !this.isPasswordMatch;
      this.passwordConfirmationSuccess = this.isPasswordMatch;
    } else {
      this.passwordConfirmationError = false;
      this.passwordConfirmationSuccess = false;
    }
  }

  loadToken() {
    let params = new URLSearchParams(document.location.search);
    let token = params.get(RESET_PASSWORD_TOKEN);

    if (token) {
      this.token = token;
    }
  }

  async updatePassword() {
    try {
      let data = {
        user: {
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
          resetPasswordToken: this.token,
        },
      };

      await this.api.put(url.USER_PASSWORD, data);
    } catch (error) {
      // TODO: below error message is temporary only, once we have error/errors property in response, we will remove it.
      // PR #42
      throw Error('Your password could not be reset.');
    }
  }
}
