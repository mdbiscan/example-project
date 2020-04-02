import Service from '@ember/service';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import url from 'example/types/url';
import userRole from 'example/types/user-role';

const ONBOARDING_TOKEN = 'onboarding_token';

export default class OnboardUserService extends Service {
  @service api;

  loadToken() {
    let params = new URLSearchParams(document.location.search);

    this.token = params.get(ONBOARDING_TOKEN) || this.token;
  }

  get token() {
    return localStorage.getItem(ONBOARDING_TOKEN);
  }

  set token(token) {
    // Test if token is present, or this will
    // save as the string 'null'
    if (isPresent(token)) {
      return localStorage.setItem(ONBOARDING_TOKEN, token);
    }
  }

  get headers() {
    return {
      'Authentication': this.token,
    };
  }

  get isViewOnlyUser() {
    return this.data && this.data.type === userRole.VIEW_ONLY || this.data.type === userRole.ADMIN;
  }

  get isClearedUser() {
    return this.data && this.data.type === userRole.CLEARED || this.data.type === userRole.ADMIN;
  }

  get status() {
    return this.data && this.data.onboardingStatus;
  }

  clearToken() {
    localStorage.removeItem(ONBOARDING_TOKEN);
  }

  async _send(url, data) {
    try {
      await this.api.post(url, data, this.headers)
    } catch (error) {
      throw Error(error);
    }
  }

  sendPassword(data) {
    return this._send(url.ONBOARD_USER_PASSWORD, data);
  }

  sendCredentials(data){
    return this._send(url.ONBOARD_USER_CREDENTIALS,data);
  }

  async load() {
    this.data = await this.api.get(url.ONBOARD_USER, this.headers);
  }
}
